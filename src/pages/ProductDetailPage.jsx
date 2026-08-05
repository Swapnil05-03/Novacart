import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  CheckCircle2,
  Wind,
  Droplet,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatCurrency, calculateDiscount, classNames } from "@/utils/helpers";
import { ROUTES } from "@/constants";
import ProductGallery from "@/components/product/ProductGallery";
import { ReviewList, ReviewForm } from "@/components/product/Reviews";
import ProductCard from "@/components/product/ProductCard";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";
import { PackageX } from "lucide-react";
import { getStaticProductImages } from "@/data/productImages";
import { getDefinitionForCategory } from "@/data/categoryContent";
import { getStaticProductById } from "@/data/staticProducts";

// Picks a reasonable icon for a feature badge based on its label text.
// Falls back to a generic checkmark if nothing matches.
function getFeatureIcon(label = "") {
  const text = label.toLowerCase();
  if (text.includes("water") || text.includes("resist")) return Droplet;
  if (text.includes("breath") || text.includes("air") || text.includes("mesh")) return Wind;
  if (text.includes("adjust") || text.includes("fit")) return SlidersHorizontal;
  if (
    text.includes("secure") ||
    text.includes("protect") ||
    text.includes("approved") ||
    text.includes("safety") ||
    text.includes("armor") ||
    text.includes("certified")
  )
    return ShieldCheck;
  return CheckCircle2;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setQuantity(1);

    // Static homepage rows (Featured/Trending/Best Sellers) use fake IDs
    // like 'featured-ac' that don't exist in Supabase. Check here first —
    // if found, skip the DB call entirely. Everything else (category page,
    // search, filters) still has real Supabase UUIDs and goes through the
    // normal DB fetch below, unaffected.
    const staticProduct = getStaticProductById(id);
    if (staticProduct) {
      setProduct(staticProduct);
      addProduct(staticProduct.id);
      setRelated([]);
      setLoading(false);
      return () => {
        isMounted = false;
      };
    }

    productService
      .getProductById(id)
      .then((data) => {
        if (!isMounted) return;
        setProduct(data);
        addProduct(data.id);
        return productService.getRelatedProducts(data.category_id, data.id);
      })
      .then((rel) => isMounted && setRelated(rel || []))
      .catch((err) => console.error("Failed to load product", err))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const refreshReviews = () => {
    productService.getProductById(id).then(setProduct).catch(console.error);
  };

  if (loading) return <PageLoader />;

  if (!product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={PackageX}
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          action={
            <Link to={ROUTES.PRODUCTS}>
              <Button variant="brand">Browse products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  // Same priority order as ProductCard: curated subcategory image first
  // (so the detail page shows the same real photo as the grid/browse
  // card), then a static per-SKU image, then whatever Supabase provided.
  const categoryDefinition = getDefinitionForCategory(product.category?.name);
  const subcategoryImage = product.subcategory
    ? categoryDefinition.shopByCategoryImages?.[product.subcategory]
    : null;
  const staticImages = getStaticProductImages(product.sku);
  const galleryImages = subcategoryImage
    ? [{ id: 'subcategory-image', url: subcategoryImage, is_primary: true, alt_text: product.name }]
    : staticImages.length > 0
      ? staticImages.map((url, i) => ({
          id: `static-${i}`,
          url,
          is_primary: i === 0,
          alt_text: product.name,
        }))
      : product.images;

  const discount = calculateDiscount(product.price, product.compare_at_price);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate(ROUTES.CHECKOUT);
  };

  // Rating breakdown (5★ down to 1★) — only computable when individual
  // review records are available (product.reviews). Static products only
  // carry an aggregate average_rating/review_count, so the bars are
  // skipped for those rather than showing fabricated numbers.
  const reviewRecords = product.reviews || [];
  const hasDetailedReviews = reviewRecords.length > 0;
  const starCounts = [0, 0, 0, 0, 0]; // index 0 = 1★ ... index 4 = 5★
  reviewRecords.forEach((r) => {
    const idx = Math.round(r.rating) - 1;
    if (idx >= 0 && idx < 5) starCounts[idx] += 1;
  });

  return (
    <div className="container-page py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link
          to={ROUTES.HOME}
          className="hover:text-ink-700 dark:hover:text-ink-200"
        >
          Home
        </Link>
        <span>/</span>
        <Link
          to={ROUTES.PRODUCTS}
          className="hover:text-ink-700 dark:hover:text-ink-200"
        >
          Products
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              to={`${ROUTES.PRODUCTS}?category=${product.category.id}`}
              className="hover:text-ink-700 dark:hover:text-ink-200"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-ink-600 dark:text-ink-300 truncate max-w-[220px]">
          {product.name}
        </span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <ProductGallery
          images={galleryImages}
          productName={product.name}
          discount={discount}
          wishlisted={wishlisted}
          onToggleWishlist={() => toggleWishlist(product)}
        />

        <div>
          {product.category && (
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400 mb-2">
              {product.category.name}
            </p>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <Rating value={product.average_rating} size="md" showValue />
            <span className="text-sm text-ink-400">
              ({product.review_count} reviews)
            </span>
            {product.recent_purchases > 0 && (
              <span className="text-sm text-ink-400">
                · {product.recent_purchases}+ bought in past month
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="price-mono text-3xl font-bold text-ink-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {discount > 0 && (
              <>
                <span className="price-mono text-lg text-ink-400 line-through">
                  {formatCurrency(product.compare_at_price)}
                </span>
                <Badge variant="amber">Save {discount}%</Badge>
              </>
            )}
          </div>

          {/* Feature badges — only rendered when the product actually
              has a `features` list; nothing is fabricated. */}
          {Array.isArray(product.features) && product.features.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {product.features.map((feature) => {
                const Icon = getFeatureIcon(feature);
                return (
                  <div
                    key={feature}
                    className="flex flex-col items-center text-center gap-1.5 rounded-xl border border-ink-200 dark:border-ink-800 p-3"
                  >
                    <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} />
                    <span className="text-xs text-ink-600 dark:text-ink-300 leading-snug">
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-5 text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-5">
            {outOfStock ? (
              <Badge variant="danger">Out of stock</Badge>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-success-600">
                <Check className="h-4 w-4" /> In stock — {product.stock}{" "}
                available
              </span>
            )}
          </div>

          {!outOfStock && (
            <div className="flex items-center gap-4 mt-6">
              <div className="inline-flex items-center rounded-xl border border-ink-200 dark:border-ink-700">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 rounded-l-xl transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="flex h-11 w-11 items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 rounded-r-xl transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                variant="brand"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingBag className="h-4 w-4" />}
                onClick={() => addToCart(product, quantity)}
              >
                Add to cart
              </Button>
            </div>
          )}

          {!outOfStock && (
            <Button
              variant="outline"
              size="lg"
              className="w-full mt-3"
              onClick={handleBuyNow}
            >
              Buy now
            </Button>
          )}

          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              leftIcon={
                <Heart
                  className={classNames(
                    "h-4 w-4",
                    wishlisted && "fill-brand-500 text-brand-500",
                  )}
                />
              }
              onClick={() => toggleWishlist(product)}
            >
              {wishlisted ? "Saved" : "Save for later"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              aria-label="Share product"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-ink-200 dark:border-ink-800">
            <Feature icon={Truck} text="Free shipping over $100" />
            <Feature icon={RotateCcw} text="30-day easy returns" />
            <Feature icon={ShieldCheck} text="Secure checkout" />
          </div>
        </div>
      </div>

      {/* Tabs: Description / Specs / Reviews */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-ink-200 dark:border-ink-800">
          {[
            { key: "description", label: "Description" },
            { key: "specifications", label: "Specifications" },
            { key: "reviews", label: `Reviews (${product.review_count})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={classNames(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px",
                activeTab === tab.key
                  ? "border-brand-500 text-brand-600 dark:text-brand-400"
                  : "border-transparent text-ink-500 hover:text-ink-800 dark:hover:text-ink-200",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl">
          {activeTab === "description" && (
            <div>
              {(() => {
                const lines = (product.description || "").split("\n").filter(Boolean);
                const paragraph = lines.filter((l) => !l.trim().startsWith("•")).join(" ");
                const bullets = lines
                  .filter((l) => l.trim().startsWith("•"))
                  .map((l) => l.replace(/^•\s*/, ""));

                return (
                  <>
                    {paragraph && (
                      <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed whitespace-pre-line">
                        {paragraph}
                      </p>
                    )}

                    {bullets.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                        {bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-3 rounded-xl border border-ink-200 dark:border-ink-800 p-4"
                          >
                            <Check className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-ink-700 dark:text-ink-200">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}

              <FAQSection />
            </div>
          )}
          {activeTab === "specifications" && (
            <dl className="divide-y divide-ink-100 dark:divide-ink-800">
              {[
                ...(product.specifications
                  ? Object.entries(product.specifications)
                  : []),
                ["SKU", product.sku || "—"],
                ["Category", product.category?.name || "—"],
                ["Stock", `${product.stock} units`],
              ].map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 text-sm">
                  <dt className="text-ink-500">{key}</dt>
                  <dd className="font-medium text-ink-900 dark:text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-8 rounded-2xl border border-ink-200 dark:border-ink-800 p-6">
                <div className="flex flex-col items-center justify-center sm:w-40 shrink-0">
                  <p className="text-4xl font-bold text-ink-900 dark:text-white">
                    {product.average_rating?.toFixed(1) ?? "—"}
                  </p>
                  <Rating value={product.average_rating} size="sm" />
                  <p className="text-xs text-ink-400 mt-1 text-center">
                    Based on {product.review_count} reviews
                  </p>
                </div>

                {hasDetailedReviews ? (
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = starCounts[star - 1];
                      const percent =
                        reviewRecords.length > 0
                          ? Math.round((count / reviewRecords.length) * 100)
                          : 0;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-ink-500 w-10 shrink-0">
                            {star} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          </span>
                          <div className="flex-1 h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-xs text-ink-400 w-8 text-right shrink-0">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center">
                    <p className="text-sm text-ink-400">
                      Detailed rating breakdown isn't available for this product yet.
                    </p>
                  </div>
                )}
              </div>

              <ReviewForm productId={product.id} onSubmitted={refreshReviews} />
              <ReviewList reviews={product.reviews} />
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Feature({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <Icon className="h-5 w-5 text-ink-400" strokeWidth={1.5} />
      <span className="text-xs text-ink-500 dark:text-ink-400">{text}</span>
    </div>
  );
}

// Generic, product-agnostic FAQ shown at the bottom of the Description
// tab — fills the empty space below shorter descriptions with content
// that's genuinely useful and applies to every product, regardless of
// category (unlike category-specific info like "how to use").
const FAQ_ITEMS = [
  {
    question: "What are the delivery options?",
    answer:
      "We offer standard delivery (3-5 business days) and express delivery (1-2 business days) at checkout. Delivery times may vary based on your location and product availability.",
  },
  {
    question: "What is the return policy?",
    answer:
      "You can return this item within 30 days of delivery for a full refund, as long as it's unused and in its original packaging. Refunds are processed within 5-7 business days of us receiving the return.",
  },
  {
    question: "Is this product covered under warranty?",
    answer:
      "Yes, this product comes with a standard manufacturer warranty against defects. Please check the product's specifications tab for exact warranty duration and terms.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Our customer support team is available via chat and email for any questions about your order, this product, or general assistance. You can reach us from the Contact page in the footer.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mt-10 pt-8 border-t border-ink-200 dark:border-ink-800">
      <h3 className="text-base font-semibold text-ink-900 dark:text-white mb-4">
        Frequently asked questions
      </h3>
      <div className="divide-y divide-ink-100 dark:divide-ink-800 rounded-xl border border-ink-200 dark:border-ink-800">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left"
              >
                <span className="text-sm font-medium text-ink-800 dark:text-ink-100">
                  {item.question}
                </span>
                <Plus
                  className={classNames(
                    "h-4 w-4 text-ink-400 shrink-0 transition-transform duration-200",
                    isOpen && "rotate-45"
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 -mt-1">
                  <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}