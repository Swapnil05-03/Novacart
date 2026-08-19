import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'

/**
 * Premium right-side visual panel used only on the Login screen.
 * Purely presentational — no auth logic lives here.
 */
export default function LoginVisualPanel() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-ink-950 px-10 py-12">
      {/* Ambient gradient glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 15%, rgba(91,95,239,0.35), transparent 42%), radial-gradient(circle at 85% 20%, rgba(155,92,246,0.22), transparent 45%), radial-gradient(circle at 75% 85%, rgba(91,95,239,0.20), transparent 45%)',
        }}
      />
      {/* Faint grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:44px_44px]" />
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_35%,rgba(11,11,15,0.7)_100%)]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* 3D-style shopping bag visual */}
        <div className="relative mb-8 flex h-72 w-72 items-center justify-center">
          <div className="absolute h-52 w-52 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="absolute h-72 w-72 animate-[spin_16s_linear_infinite] rounded-full border border-white/[0.06]" />
          <ShoppingBagArt className="relative h-64 w-64 drop-shadow-[0_20px_45px_rgba(91,95,239,0.4)]" />
          <span className="absolute right-1 top-8 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_2px_rgba(245,166,35,0.7)]" />
          <span className="absolute left-0 bottom-12 h-1.5 w-1.5 rounded-full bg-brand-300 shadow-[0_0_10px_2px_rgba(123,129,249,0.7)]" />
        </div>

        <p className="price-mono text-6xl font-bold tracking-tight text-white">₹0.00</p>
        <p className="mt-3 max-w-[19rem] text-sm leading-relaxed text-ink-400">
          to start. Free returns, every order, every time.
        </p>

        {/* Testimonial card */}
        <div className="mt-10 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 text-left shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="mb-3 text-brand-400">
            <path
              d="M0 16V9.5C0 4.25 3.2 1 8 0l1.2 2.4C6.4 3.4 5 5.1 5 7h4v9H0Zm12 0V9.5c0-5.25 3.2-8.5 8-9.5l1.2 2.4c-2.8 1-4.2 2.7-4.2 4.6h4v9h-9Z"
              fill="currentColor"
            />
          </svg>
          <p className="text-lg font-medium leading-snug text-white">
            Checkout took less time than making coffee.
          </p>
          <p className="mt-3 text-sm text-ink-500">— a NovaCart customer</p>
        </div>

        {/* Benefits */}
        <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2">
          <Benefit icon={<Truck className="h-4 w-4" />} title="Free Shipping" subtitle="On orders over $499" />
          <Benefit icon={<RotateCcw className="h-4 w-4" />} title="Free Returns" subtitle="30-day return policy" />
          <Benefit icon={<ShieldCheck className="h-4 w-4" />} title="Secure Checkout" subtitle="100% protected payments" />
        </div>
      </div>
    </div>
  )
}

function Benefit({ icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-4 text-center transition-colors hover:bg-white/[0.05]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">
        {icon}
      </div>
      <p className="text-xs font-semibold text-white">{title}</p>
      <p className="text-[11px] leading-tight text-ink-500">{subtitle}</p>
    </div>
  )
}

function ShoppingBagArt({ className }) {
  return (
    <svg viewBox="0 0 240 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bagFront" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#2B2E45" />
          <stop offset="35%" stopColor="#181A2B" />
          <stop offset="100%" stopColor="#0A0B14" />
        </linearGradient>
        <linearGradient id="bagSide" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#14152400" stopOpacity="0" />
          <stop offset="0%" stopColor="#191B2E" />
          <stop offset="100%" stopColor="#050509" />
        </linearGradient>
        <linearGradient id="waveGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B5FEF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#9B5CF6" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="waveGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5B5FEF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="bagSheen" cx="28%" cy="15%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3D57" />
          <stop offset="100%" stopColor="#14151F" />
        </linearGradient>
        <linearGradient id="tagGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20222F" />
          <stop offset="100%" stopColor="#0B0C13" />
        </linearGradient>
        <clipPath id="frontClip">
          <path d="M52 122 L166 122 L174 234 C174.4 240 169.6 244 163.5 244 L54.5 244 C48.4 244 43.6 240 44 234 Z" />
        </clipPath>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="112" cy="250" rx="66" ry="8" fill="black" opacity="0.45" />

      {/* side face (3D depth, visible right edge) */}
      <path d="M166 122 L200 132 L206 240 C206.4 245 202 249 197 249 L177 249 L166 122 Z" fill="url(#bagSide)" />
      <path d="M166 122 L200 132 L206 240 C206.4 245 202 249 197 249 L177 249 L166 122 Z" fill="url(#bagSheen)" opacity="0.4" />

      {/* front face */}
      <path
        d="M52 122 L166 122 L174 234 C174.4 240 169.6 244 163.5 244 L54.5 244 C48.4 244 43.6 240 44 234 Z"
        fill="url(#bagFront)"
      />

      {/* purple/blue wave accents across the lower bag */}
      <g clipPath="url(#frontClip)">
        <path d="M20 205 C70 185 100 225 150 200 C175 188 190 205 200 195 L200 260 L20 260 Z" fill="url(#waveGrad1)" opacity="0.55" />
        <path d="M20 225 C60 212 110 245 160 218 C180 207 195 218 205 210 L205 260 L20 260 Z" fill="url(#waveGrad2)" opacity="0.5" />
      </g>

      {/* gusset fold line */}
      <path d="M166 122 L177 244" stroke="#000000" strokeWidth="1.4" opacity="0.5" />

      {/* body sheen overlay for glossy premium feel */}
      <path
        d="M52 122 L166 122 L174 234 C174.4 240 169.6 244 163.5 244 L54.5 244 C48.4 244 43.6 240 44 234 Z"
        fill="url(#bagSheen)"
      />

      {/* rope handles with braided look (double stroke) */}
      <path
        d="M78 124V96c0-24 15-42 36-42s36 18 36 42v28"
        fill="none"
        stroke="url(#ropeGrad)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M78 124V96c0-24 15-42 36-42s36 18 36 42v28"
        fill="none"
        stroke="#565A78"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />

      {/* grommets where handles meet the bag */}
      <circle cx="78" cy="122" r="5.5" fill="#0A0B14" stroke="#4B4F6B" strokeWidth="1.4" />
      <circle cx="150" cy="122" r="5.5" fill="#0A0B14" stroke="#4B4F6B" strokeWidth="1.4" />

      {/* hanging gift tag */}
      <path d="M150 122 C154 128 158 132 162 136" fill="none" stroke="#565A78" strokeWidth="1.3" />
      <g transform="translate(154,136) rotate(8)">
        <rect x="0" y="0" width="30" height="38" rx="6" fill="url(#tagGrad)" stroke="#6B70E8" strokeOpacity="0.6" strokeWidth="1.3" />
        <circle cx="15" cy="8" r="2" fill="none" stroke="#8A8FB0" strokeWidth="1.2" />
        <text x="15" y="27" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="800" fontSize="15" fill="#E8E9FF">N</text>
      </g>

      {/* logo mark: white rounded square with N */}
      <rect x="87" y="136" width="42" height="42" rx="12" fill="#F5F6FF" />
      <text x="108" y="166" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="800" fontSize="26" fill="#0A0B14">
        N
      </text>

      {/* wordmark + tagline */}
      <text x="108" y="199" textAnchor="middle" fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif" fontWeight="800" fontSize="15" fill="#F5F6FF">
        NovaCart
      </text>
      <text x="108" y="211" textAnchor="middle" fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif" fontWeight="400" fontSize="6" fill="#A9ACC8">
        Shop Smarter. Live Better.
      </text>
    </svg>
  )
}