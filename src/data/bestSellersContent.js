import bestBedsheet from '@/assets/images/hero/bestSellers/bedsheet.webp'
import bestBottle from '@/assets/images/hero/bestSellers/bottle.jpg'
import bestFacewash from '@/assets/images/hero/bestSellers/facewash.avif'
import bestFreshener from '@/assets/images/hero/bestSellers/freshener.jpg'
import bestMouse from '@/assets/images/hero/bestSellers/mouse.jpg'
import bestNotebook from '@/assets/images/hero/bestSellers/notebook.webp'
import bestRacket from '@/assets/images/hero/bestSellers/racket.jpg'
import bestShirt from '@/assets/images/hero/bestSellers/shirt.webp'

// Static "Best Sellers" row — bypasses Supabase entirely so this section
// always shows exactly these curated items, unaffected by database
// seed/test data or category-diversify caps.
//
// Each product also carries a small `reviews` array of sample reviews so
// the Reviews tab (rating breakdown + review list) isn't empty — these
// are demo/placeholder reviews, not real customer feedback, since these
// products bypass Supabase entirely and have no real review records.
export const BEST_SELLER_PRODUCTS = [
  {
    id: 'best-bottle',
    name: 'Stainless Steel Water Bottle',
    price: 399,
    compare_at_price: 599,
    stock: 80,
    category: { name: 'Fitness' },
    is_best_seller: true,
    average_rating: 4.7,
    review_count: 245,
    sku: 'NC-FT-BOTTLE-01',
    description:
      "Stay hydrated on the go with this Stainless Steel Water Bottle, built with double-wall vacuum insulation to keep drinks cold for 24 hours or hot for 12.\n\n• Double-wall vacuum insulation\n• Keeps drinks cold 24h / hot 12h\n• Leak-proof, BPA-free design\n• Durable 18/8 stainless steel",
    specifications: {
      Capacity: '750 ml',
      Material: '18/8 Stainless Steel',
      Insulation: 'Double-Wall Vacuum',
      'BPA Free': 'Yes',
    },
    features: ['24-Hour Cold Retention', 'Leak-proof', 'BPA Free', 'Durable Steel Build'],
    reviews: [
      {
        id: 'rev-bottle-1',
        rating: 5,
        comment: 'Keeps water cold the entire day, even left in a hot car. Zero leaks so far.',
        created_at: '2026-07-23',
        profiles: { full_name: 'Kavya Reddy' },
      },
      {
        id: 'rev-bottle-2',
        rating: 5,
        comment: 'Solid build quality, doesn\u2019t dent easily. Great for gym and travel.',
        created_at: '2026-07-04',
        profiles: { full_name: 'Aditya Kulkarni' },
      },
      {
        id: 'rev-bottle-3',
        rating: 4,
        comment: 'Does what it promises. Slightly heavier than plastic bottles but worth it for the insulation.',
        created_at: '2026-06-16',
        profiles: { full_name: 'Tanya Bhatt' },
      },
    ],
    images: [{ id: 'img-bottle', url: bestBottle, is_primary: true }],
  },
  {
    id: 'best-mouse',
    name: 'Wireless Mouse',
    price: 599,
    compare_at_price: 899,
    stock: 70,
    category: { name: 'Electronics' },
    is_best_seller: true,
    average_rating: 4.5,
    review_count: 189,
    sku: 'NC-EL-MOUSE-01',
    description:
      "Boost your productivity with this Wireless Mouse, featuring a precise optical sensor, silent clicks, and a comfortable ergonomic shape for all-day use.\n\n• 2.4GHz wireless connectivity\n• Silent click technology\n• Ergonomic, comfortable grip\n• Up to 12 months battery life",
    specifications: {
      Connectivity: '2.4GHz Wireless',
      DPI: 'Up to 1600',
      'Battery Life': 'Up to 12 Months',
      Buttons: '3',
    },
    features: ['Silent Clicks', 'Ergonomic Design', '12-Month Battery', 'Precise Tracking'],
    reviews: [
      {
        id: 'rev-mouse-1',
        rating: 5,
        comment: 'Silent clicks are great for office use. No lag even at a distance from the receiver.',
        created_at: '2026-07-19',
        profiles: { full_name: 'Rohan Mehta' },
      },
      {
        id: 'rev-mouse-2',
        rating: 4,
        comment: 'Comfortable grip for long work sessions. Battery life is as advertised.',
        created_at: '2026-07-01',
        profiles: { full_name: 'Sneha Iyer' },
      },
      {
        id: 'rev-mouse-3',
        rating: 5,
        comment: 'Great budget mouse, tracking is accurate on most surfaces.',
        created_at: '2026-06-13',
        profiles: { full_name: 'Manish Tiwari' },
      },
    ],
    images: [{ id: 'img-mouse', url: bestMouse, is_primary: true }],
  },
  {
    id: 'best-bedsheet',
    name: 'Cotton Bedsheet Set',
    price: 899,
    compare_at_price: 1299,
    stock: 45,
    category: { name: 'Home & Living' },
    is_best_seller: true,
    average_rating: 4.6,
    review_count: 132,
    sku: 'NC-HL-BEDSHEET-01',
    description:
      "Upgrade your bedroom with this Cotton Bedsheet Set, woven from breathable 100% cotton for a soft, comfortable night's sleep. Includes fitted sheet, flat sheet, and pillow covers.\n\n• 100% pure cotton, breathable fabric\n• Set includes 1 bedsheet + 2 pillow covers\n• Fade-resistant printed design\n• Fits mattresses up to 10 inches",
    specifications: {
      Material: '100% Cotton',
      'Thread Count': '210 TC',
      'Set Includes': '1 Bedsheet + 2 Pillow Covers',
      Size: 'Queen (90x100 in)',
    },
    features: ['100% Cotton', 'Fade Resistant', 'Breathable Fabric', 'Complete Set'],
    reviews: [
      {
        id: 'rev-bedsheet-1',
        rating: 5,
        comment: 'Fabric feels soft and breathable, colors haven\u2019t faded even after several washes.',
        created_at: '2026-07-17',
        profiles: { full_name: 'Divya Menon' },
      },
      {
        id: 'rev-bedsheet-2',
        rating: 4,
        comment: 'Fits my mattress well and the pillow covers match nicely. Good quality for the price.',
        created_at: '2026-06-30',
        profiles: { full_name: 'Ritika Bose' },
      },
      {
        id: 'rev-bedsheet-3',
        rating: 5,
        comment: 'Very comfortable to sleep on, feels premium. Will buy more colors.',
        created_at: '2026-06-11',
        profiles: { full_name: 'Meera Pillai' },
      },
    ],
    images: [{ id: 'img-bedsheet', url: bestBedsheet, is_primary: true }],
  },
  {
    id: 'best-shirt',
    name: "Men's Formal Shirt",
    price: 999,
    compare_at_price: 1499,
    stock: 55,
    category: { name: 'Apparel' },
    is_best_seller: true,
    average_rating: 4.4,
    review_count: 98,
    sku: 'NC-AP-SHIRT-01',
    description:
      "Look sharp for any occasion with this Men's Formal Shirt, tailored from wrinkle-resistant cotton blend fabric for a crisp, professional look all day long.\n\n• Wrinkle-resistant cotton blend\n• Slim, tailored fit\n• Easy-iron fabric\n• Ideal for office & formal events",
    specifications: {
      Material: 'Cotton Blend',
      Fit: 'Slim Fit',
      Sleeve: 'Full Sleeve',
      Sizes: 'S, M, L, XL, XXL',
    },
    features: ['Wrinkle Resistant', 'Slim Fit', 'Easy Iron', 'Office Ready'],
    reviews: [
      {
        id: 'rev-shirt-1',
        rating: 4,
        comment: 'Fits true to size, fabric doesn\u2019t wrinkle much through a full work day.',
        created_at: '2026-07-14',
        profiles: { full_name: 'Siddharth Rao' },
      },
      {
        id: 'rev-shirt-2',
        rating: 5,
        comment: 'Great for office wear, looks sharp and the stitching quality is solid.',
        created_at: '2026-06-28',
        profiles: { full_name: 'Karan Malhotra' },
      },
      {
        id: 'rev-shirt-3',
        rating: 4,
        comment: 'Good shirt overall, color is slightly different from the listing photos.',
        created_at: '2026-06-07',
        profiles: { full_name: 'Vikram Rao' },
      },
    ],
    images: [{ id: 'img-shirt', url: bestShirt, is_primary: true }],
  },
  {
    id: 'best-facewash',
    name: 'Face Wash for Oily Skin',
    price: 249,
    compare_at_price: 349,
    stock: 90,
    category: { name: 'Beauty' },
    is_best_seller: true,
    average_rating: 4.5,
    review_count: 210,
    sku: 'NC-BT-FACEWASH-01',
    description:
      "Control excess oil and shine with this Face Wash for Oily Skin, formulated with Salicylic Acid and Tea Tree extract to gently cleanse without over-drying.\n\n• Salicylic Acid for deep pore cleansing\n• Tea Tree extract controls excess oil\n• Soap-free, gentle formula\n• Suitable for daily use",
    specifications: {
      Volume: '100 ml',
      'Key Ingredients': 'Salicylic Acid, Tea Tree Extract',
      'Skin Type': 'Oily / Acne-Prone',
      'Soap Free': 'Yes',
    },
    features: ['Controls Excess Oil', 'Soap Free', 'Deep Pore Cleansing', 'Dermatologically Tested'],
    reviews: [
      {
        id: 'rev-facewash-1',
        rating: 5,
        comment: 'Noticed less oiliness within a week. Doesn\u2019t dry out my skin like other face washes.',
        created_at: '2026-07-20',
        profiles: { full_name: 'Isha Kapoor' },
      },
      {
        id: 'rev-facewash-2',
        rating: 4,
        comment: 'Gentle formula, good for daily use. Helped reduce a few breakouts too.',
        created_at: '2026-07-02',
        profiles: { full_name: 'Simran Kaur' },
      },
      {
        id: 'rev-facewash-3',
        rating: 5,
        comment: 'My skin feels fresh and matte through the day now. Repurchasing for sure.',
        created_at: '2026-06-15',
        profiles: { full_name: 'Ananya Das' },
      },
    ],
    images: [{ id: 'img-facewash', url: bestFacewash, is_primary: true }],
  },
  {
    id: 'best-notebook',
    name: 'Notebook & Pen Combo',
    price: 199,
    compare_at_price: 299,
    stock: 100,
    category: { name: 'Books & Stationery' },
    is_best_seller: true,
    average_rating: 4.6,
    review_count: 76,
    sku: 'NC-BS-NOTEBOOK-01',
    description:
      "Stay organized with this Notebook & Pen Combo, featuring a durable hardbound notebook with smooth, bleed-resistant pages and a matching smooth-writing pen.\n\n• 200-page hardbound notebook\n• Smooth, bleed-resistant paper\n• Includes matching gel pen\n• Compact size for on-the-go use",
    specifications: {
      Pages: '200',
      Binding: 'Hardbound',
      'Paper GSM': '80 GSM',
      Includes: '1 Notebook + 1 Gel Pen',
    },
    features: ['Bleed Resistant Paper', 'Hardbound Cover', 'Includes Pen', 'Compact Size'],
    reviews: [
      {
        id: 'rev-notebook-1',
        rating: 5,
        comment: 'Paper quality is great, no bleed-through even with gel pens. Cover feels sturdy.',
        created_at: '2026-07-10',
        profiles: { full_name: 'Neha Joshi' },
      },
      {
        id: 'rev-notebook-2',
        rating: 4,
        comment: 'Good value combo, the included pen writes smoothly too.',
        created_at: '2026-06-24',
        profiles: { full_name: 'Arjun Nair' },
      },
      {
        id: 'rev-notebook-3',
        rating: 5,
        comment: 'Perfect size for my bag, using it for daily journaling.',
        created_at: '2026-06-05',
        profiles: { full_name: 'Pooja Singh' },
      },
    ],
    images: [{ id: 'img-notebook', url: bestNotebook, is_primary: true }],
  },
  {
    id: 'best-freshener',
    name: 'Car Air Freshener',
    price: 149,
    compare_at_price: 249,
    stock: 120,
    category: { name: 'Auto Accessories' },
    is_best_seller: true,
    average_rating: 4.3,
    review_count: 58,
    sku: 'NC-AA-FRESHENER-01',
    description:
      "Keep your car smelling fresh with this long-lasting Car Air Freshener, offering a subtle, pleasant fragrance that lasts for weeks without being overpowering.\n\n• Long-lasting fragrance, up to 30 days\n• Adjustable scent intensity vent clip\n• Compact and easy to install\n• Non-toxic, alcohol-free formula",
    specifications: {
      'Lasts Up To': '30 Days',
      Fragrance: 'Ocean Breeze',
      'Mount Type': 'Vent Clip',
      'Alcohol Free': 'Yes',
    },
    features: ['Long Lasting', 'Adjustable Intensity', 'Easy Install', 'Alcohol Free'],
    reviews: [
      {
        id: 'rev-freshener-1',
        rating: 4,
        comment: 'Fragrance is subtle, not overpowering like some others I\u2019ve tried. Lasts a few weeks.',
        created_at: '2026-07-07',
        profiles: { full_name: 'Rahul Gupta' },
      },
      {
        id: 'rev-freshener-2',
        rating: 4,
        comment: 'Easy to clip on the vent, intensity is adjustable which is nice.',
        created_at: '2026-06-19',
        profiles: { full_name: 'Yash Patel' },
      },
      {
        id: 'rev-freshener-3',
        rating: 5,
        comment: 'Good scent, not too strong for a small car. Will buy again.',
        created_at: '2026-06-01',
        profiles: { full_name: 'Nikhil Chawla' },
      },
    ],
    images: [{ id: 'img-freshener', url: bestFreshener, is_primary: true }],
  },
  {
    id: 'best-racket',
    name: 'Badminton Racket Set',
    price: 799,
    compare_at_price: 1099,
    stock: 35,
    category: { name: 'Sports & Outdoors' },
    is_best_seller: true,
    average_rating: 4.7,
    review_count: 121,
    sku: 'NC-SP-RACKET-01',
    description:
      "Get in the game with this Badminton Racket Set, featuring lightweight aluminum rackets with high-tension strings for powerful, accurate shots. Includes carry bag and shuttlecocks.\n\n• Lightweight aluminum frame rackets\n• High-tension strings for control\n• Set of 2 rackets + 2 shuttlecocks\n• Includes carry bag",
    specifications: {
      'Set Includes': '2 Rackets, 2 Shuttlecocks, Carry Bag',
      Frame: 'Aluminum Alloy',
      Weight: '~95g per racket',
      'String Tension': '18-20 lbs',
    },
    features: ['Lightweight Frame', 'High-tension Strings', 'Carry Bag Included', 'Set of 2'],
    reviews: [
      {
        id: 'rev-racket-1',
        rating: 5,
        comment: 'Great set for casual play with friends. Rackets feel light and well balanced.',
        created_at: '2026-07-25',
        profiles: { full_name: 'Aman Verma' },
      },
      {
        id: 'rev-racket-2',
        rating: 4,
        comment: 'Good quality for the price, carry bag is a nice addition.',
        created_at: '2026-07-05',
        profiles: { full_name: 'Varun Chopra' },
      },
      {
        id: 'rev-racket-3',
        rating: 5,
        comment: 'Strings held up well after multiple sessions. Happy with this purchase.',
        created_at: '2026-06-17',
        profiles: { full_name: 'Kavya Reddy' },
      },
    ],
    images: [{ id: 'img-racket', url: bestRacket, is_primary: true }],
  },
]