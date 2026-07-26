import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants";
import promoOrderImage from "@/assets/images/hero/banners/banner1.png";
import promoShippingImage from "@/assets/images/hero/banners/banner2.png";

export default function PromoBanner() {
  return (
    <section className="container-page py-4">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Brand gradient card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4 }}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-900 min-h-[280px] shadow-card"
        >
          {/* Background image, right-aligned, fading into the gradient */}
          <img
            src={promoOrderImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[85%_center] opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-700 from-20% via-brand-700/60 via-45% to-transparent" />
          jsx
          <div className="relative z-10 h-full flex flex-col justify-center p-8 sm:p-10 max-w-[70%]">
            <span className="h-0.5 w-8 bg-white/60 mb-3" />
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
              Limited time
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              20% off
              <br />
              your first order
            </h3>
            <p className="text-sm text-white/80 mt-2">
              Use code{" "}
              <span className="font-semibold text-white">WELCOME20</span> at
              checkout
            </p>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 mt-5 w-fit transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              Shop collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Dark card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 min-h-[280px] shadow-card"
        >
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />

          {/* Background image, right-aligned, fading into the dark bg */}
          <img
            src={promoShippingImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[80%_center] opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 from-20% via-ink-950/60 via-45% to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-center p-8 sm:p-10 max-w-[70%]">
            <span className="h-0.5 w-8 bg-amber-400 mb-3" />
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Free shipping
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              On every order
              <br />
              over $100
            </h3>
            <p className="text-sm text-ink-300 mt-2">
              No fine print, no surprise fees
            </p>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-ink-950 mt-5 w-fit transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              Start shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
