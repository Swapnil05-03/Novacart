import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Minus, Send, RotateCcw } from "lucide-react";
import { novaAIService } from "@/services/novaAIService";
import { productService } from "@/services/productService";
import { classNames } from "@/utils/helpers";
import NovaProductCard from "@/components/ai/NovaProductCard";

const QUICK_SUGGESTIONS = [
  {
    emoji: "🎧",
    label: "Find headphones under ₹2000",
    query: "Find headphones under ₹2000",
  },
  {
    emoji: "💻",
    label: "Best laptop for college",
    query: "Best laptop for college",
  },
  {
    emoji: "🎁",
    label: "Find a gift under ₹1500",
    query: "Find a gift under ₹1500",
  },
  {
    emoji: "📱",
    label: "Compare products",
    query: "Help me compare a couple of products",
  },
  {
    emoji: "🔥",
    label: "Show me the best deals",
    query: "Show me the best deals",
  },
];

let messageIdCounter = 0;
function nextId() {
  messageIdCounter += 1;
  return `nova-msg-${Date.now()}-${messageIdCounter}`;
}

function ThinkingBubble() {
  return (
    <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-ink-100 dark:bg-ink-800 px-4 py-3 w-fit">
      <span className="text-xs text-ink-500 dark:text-ink-400">
        Nova AI is thinking
      </span>
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-ink-400 dark:bg-ink-500 animate-bounce"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </span>
    </div>
  );
}

export default function NovaAIWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    if (open && !minimized) scrollToBottom();
  }, [messages, loading, open, minimized, scrollToBottom]);

  const buildHistory = useCallback((allMessages) => {
    return allMessages
      .filter(
        (m) => m.role === "user" || (m.role === "assistant" && !m.isError),
      )
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.text }));
  }, []);

  const runQuery = useCallback(
    async (query) => {
      const trimmed = query.trim();
      if (!trimmed || loading) return;

      const userMessage = { id: nextId(), role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const history = buildHistory(messages);
        const result = await novaAIService.sendMessage(trimmed, history);

        let productCards = [];
        if (result.products.length > 0) {
          const ids = result.products.map((p) => p.id);
          const fullProducts = await productService.getProductsByIds(ids);
          const byId = new Map(fullProducts.map((p) => [p.id, p]));
          productCards = result.products
            .map((p) =>
              byId.has(p.id)
                ? { product: byId.get(p.id), reason: p.reason }
                : null,
            )
            .filter(Boolean);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            text: result.message,
            products: productCards,
            suggestions: result.suggestions,
          },
        ]);
      } catch (err) {
        console.error("Nova AI request failed", err);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            text: "Sorry, I'm having trouble right now. Please try again.",
            isError: true,
            products: [],
            suggestions: [],
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, buildHistory],
  );

  const handleClearChat = () => {
    setMessages([]);
    setInput("");
  };

  const handleSend = () => runQuery(input);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="nova-fab"
            type="button"
            onClick={handleOpen}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Ask Nova AI"
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-card-hover hover:shadow-2xl transition-shadow sm:bottom-6 sm:right-6"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            Ask Nova AI
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nova-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={classNames(
              "fixed z-50 flex flex-col overflow-hidden border border-ink-100 dark:border-ink-800",
              "bg-surface dark:bg-surface-dark shadow-2xl",
              "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:rounded-2xl",
              "sm:w-[400px] sm:max-w-[calc(100vw-3rem)]",
              minimized
                ? "sm:h-auto"
                : "sm:h-[640px] sm:max-h-[calc(100vh-6rem)]",
            )}
            role="dialog"
            aria-label="Nova AI shopping assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-ink-100 dark:border-ink-800 bg-elevated dark:bg-elevated-dark px-4 py-3.5 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white">
                  <Sparkles className="h-4.5 w-4.5" strokeWidth={2.25} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-50 leading-tight">
                    Nova AI
                  </p>
                  <p className="text-xs text-ink-500 dark:text-ink-400 leading-tight truncate">
                    Your personal shopping assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    aria-label="Clear chat"
                    title="Clear chat"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMinimized((m) => !m)}
                  aria-label={minimized ? "Expand chat" : "Minimize chat"}
                  className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4"
                >
                  {messages.length === 0 && (
                    <div className="animate-fade-in">
                      <div className="rounded-2xl rounded-bl-sm bg-ink-100 dark:bg-ink-800 px-4 py-3 text-sm text-ink-800 dark:text-ink-100 w-fit max-w-[90%]">
                        <p className="font-medium">Hi! I&apos;m Nova AI 👋</p>
                        <p className="mt-1 text-ink-600 dark:text-ink-300">
                          I can help you find the right products, compare items,
                          and make better shopping decisions.
                        </p>
                      </div>

                      <div className="mt-3 flex flex-col items-start gap-2">
                        {QUICK_SUGGESTIONS.map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => runQuery(s.query)}
                            className="rounded-xl border border-ink-200 dark:border-ink-700 bg-elevated dark:bg-elevated-dark px-3.5 py-2 text-sm text-ink-700 dark:text-ink-200 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                          >
                            <span className="mr-1.5">{s.emoji}</span>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={classNames(
                        "flex flex-col",
                        m.role === "user" ? "items-end" : "items-start",
                      )}
                    >
                      {m.role === "user" ? (
                        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-500 px-4 py-2.5 text-sm text-white">
                          {m.text}
                        </div>
                      ) : (
                        <div className="flex w-full flex-col items-start gap-2.5">
                          <div
                            className={classNames(
                              "max-w-[90%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm",
                              m.isError
                                ? "bg-danger-50 dark:bg-danger-500/10 text-danger-600 dark:text-danger-500"
                                : "bg-ink-100 dark:bg-ink-800 text-ink-800 dark:text-ink-100",
                            )}
                          >
                            {m.text}
                          </div>

                          {m.products?.length > 0 && (
                            <div className="w-full space-y-2">
                              {m.products.map(({ product, reason }) => (
                                <NovaProductCard
                                  key={product.id}
                                  product={product}
                                  reason={reason}
                                />
                              ))}
                            </div>
                          )}

                          {m.suggestions?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {m.suggestions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => runQuery(s)}
                                  className="rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 px-3 py-1.5 text-xs font-medium text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && <ThinkingBubble />}
                </div>

                {/* Input */}
                <div className="shrink-0 border-t border-ink-100 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-3">
                  <div className="flex items-end gap-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-surface dark:bg-surface-dark px-3 py-2 focus-within:border-brand-400 transition-colors">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      placeholder="Ask Nova AI anything about products..."
                      className="flex-1 resize-none bg-transparent text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 focus:outline-none max-h-24"
                    />
                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={!input.trim() || loading}
                      aria-label="Send message"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white transition-opacity hover:bg-brand-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
