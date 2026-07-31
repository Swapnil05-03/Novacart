import trendingBag from '@/assets/images/hero/trendingNow/bag.jpg'
import trendingBand from '@/assets/images/hero/trendingNow/band.png'
import trendingCandle from '@/assets/images/hero/trendingNow/candle.webp'
import trendingEarbuds from '@/assets/images/hero/trendingNow/earbuds.webp'
import trendingHoodie from '@/assets/images/hero/trendingNow/hoodie.webp'
import trendingLamp from '@/assets/images/hero/trendingNow/lamp.jpg'
import trendingMug from '@/assets/images/hero/trendingNow/mug.webp'
import trendingPuzzle from '@/assets/images/hero/trendingNow/puzzle.jpg'

// Static "Trending Now" row — bypasses Supabase entirely so this section
// always shows exactly these curated items, unaffected by database
// seed/test data or category-diversify caps.
//
// Each product also carries a small `reviews` array of sample reviews so
// the Reviews tab (rating breakdown + review list) isn't empty — these
// are demo/placeholder reviews, not real customer feedback, since these
// products bypass Supabase entirely and have no real review records.
export const TRENDING_PRODUCTS = [
  {
    id: 'trending-earbuds',
    name: 'Wireless Bluetooth Earbuds',
    price: 1499,
    compare_at_price: 2199,
    stock: 55,
    category: { name: 'Electronics' },
    is_trending: true,
    average_rating: 4.5,
    review_count: 201,
    sku: 'NC-EL-EARBUDS-01',
    description:
      "Immerse yourself in rich, clear sound with these Wireless Bluetooth Earbuds. Featuring active noise cancellation and up to 24 hours of battery life with the charging case, they're perfect for music, calls, and workouts.\n\n• Active Noise Cancellation (ANC)\n• Up to 24 hours total battery life\n• IPX5 sweat and water resistant\n• Touch controls for easy access",
    specifications: {
      'Battery Life': '6 hrs (Earbuds) + 18 hrs (Case)',
      Connectivity: 'Bluetooth 5.3',
      'Water Resistance': 'IPX5',
      ANC: 'Yes',
    },
    features: ['Active Noise Cancellation', 'Sweat Resistant', 'Touch Controls', '24-Hour Playtime'],
    reviews: [
      {
        id: 'rev-earbuds-1',
        rating: 5,
        comment: 'ANC works surprisingly well for this price range. Great for daily commute and workouts.',
        created_at: '2026-07-21',
        profiles: { full_name: 'Aditya Kulkarni' },
      },
      {
        id: 'rev-earbuds-2',
        rating: 4,
        comment: 'Sound quality is solid, touch controls take a day or two to get used to.',
        created_at: '2026-07-06',
        profiles: { full_name: 'Isha Kapoor' },
      },
      {
        id: 'rev-earbuds-3',
        rating: 5,
        comment: 'Battery life is as advertised, easily lasts me through a full work day with the case.',
        created_at: '2026-06-19',
        profiles: { full_name: 'Rohan Mehta' },
      },
    ],
    images: [{ id: 'img-earbuds', url: trendingEarbuds, is_primary: true }],
  },
  {
    id: 'trending-hoodie',
    name: 'Oversized Cotton Hoodie',
    price: 899,
    compare_at_price: 1299,
    stock: 40,
    category: { name: 'Apparel' },
    is_trending: true,
    average_rating: 4.4,
    review_count: 87,
    sku: 'NC-AP-HOODIE-01',
    description:
      "Stay cozy in style with this Oversized Cotton Hoodie, made from soft, breathable cotton fleece. Perfect for layering during cooler months or lounging at home.\n\n• 100% breathable cotton fleece\n• Relaxed, oversized fit\n• Ribbed cuffs and hem for a snug fit\n• Kangaroo pocket for essentials",
    specifications: {
      Material: '100% Cotton Fleece',
      Fit: 'Oversized',
      Care: 'Machine Wash Cold',
      Sizes: 'S, M, L, XL, XXL',
    },
    features: ['Breathable Cotton', 'Oversized Fit', 'Kangaroo Pocket', 'Machine Washable'],
    reviews: [
      {
        id: 'rev-hoodie-1',
        rating: 4,
        comment: 'Super comfortable and true to the oversized fit shown in photos. Fabric feels premium.',
        created_at: '2026-07-17',
        profiles: { full_name: 'Karan Malhotra' },
      },
      {
        id: 'rev-hoodie-2',
        rating: 5,
        comment: 'Perfect for lounging around, doesn\u2019t shrink after wash. Ordered a second one.',
        created_at: '2026-07-03',
        profiles: { full_name: 'Tanya Bhatt' },
      },
      {
        id: 'rev-hoodie-3',
        rating: 4,
        comment: 'Good quality for the price, color slightly different from the pictures but still nice.',
        created_at: '2026-06-20',
        profiles: { full_name: 'Nikhil Chawla' },
      },
    ],
    images: [{ id: 'img-hoodie', url: trendingHoodie, is_primary: true }],
  },
  {
    id: 'trending-band',
    name: 'Smart Fitness Band',
    price: 1999,
    compare_at_price: 2599,
    stock: 30,
    category: { name: 'Fitness' },
    is_trending: true,
    average_rating: 4.3,
    review_count: 156,
    sku: 'NC-FT-BAND-01',
    description:
      "Track your health goals with this Smart Fitness Band, featuring heart rate monitoring, sleep tracking, and 14+ workout modes — all in a sleek, lightweight design.\n\n• 24/7 heart rate & SpO2 monitoring\n• 14+ workout modes\n• Up to 10-day battery life\n• Water resistant up to 50m",
    specifications: {
      Display: '1.1" AMOLED',
      'Battery Life': 'Up to 10 Days',
      'Water Resistance': '5 ATM (50m)',
      Sensors: 'Heart Rate, SpO2, Accelerometer',
    },
    features: ['Heart Rate Monitoring', '10-Day Battery', 'Water Resistant', '14+ Workout Modes'],
    reviews: [
      {
        id: 'rev-band-1',
        rating: 4,
        comment: 'Battery genuinely lasts around 9-10 days for me. Heart rate readings seem accurate.',
        created_at: '2026-07-15',
        profiles: { full_name: 'Vikram Rao' },
      },
      {
        id: 'rev-band-2',
        rating: 5,
        comment: 'Sleep tracking is surprisingly detailed for this price point. Very happy with it.',
        created_at: '2026-06-29',
        profiles: { full_name: 'Ananya Das' },
      },
      {
        id: 'rev-band-3',
        rating: 3,
        comment: 'Does the job but the companion app could use some improvements.',
        created_at: '2026-06-11',
        profiles: { full_name: 'Manish Tiwari' },
      },
    ],
    images: [{ id: 'img-band', url: trendingBand, is_primary: true }],
  },
  {
    id: 'trending-mug',
    name: 'Ceramic Coffee Mug Set',
    price: 449,
    compare_at_price: 599,
    stock: 65,
    category: { name: 'Home & Living' },
    is_trending: true,
    average_rating: 4.6,
    review_count: 92,
    sku: 'NC-HL-MUG-01',
    description:
      "Enjoy your morning coffee in style with this Ceramic Coffee Mug Set. Crafted from durable, glossy ceramic, these mugs are microwave and dishwasher safe for everyday use.\n\n• Set of 4 premium ceramic mugs\n• Microwave and dishwasher safe\n• Comfortable handle grip\n• Chip-resistant glaze finish",
    specifications: {
      'Set Includes': '4 Mugs',
      Capacity: '350 ml each',
      Material: 'Ceramic',
      'Dishwasher Safe': 'Yes',
    },
    features: ['Microwave Safe', 'Dishwasher Safe', 'Chip Resistant', 'Set of 4'],
    reviews: [
      {
        id: 'rev-mug-1',
        rating: 5,
        comment: 'Lovely finish and sturdy handles. Have used them in the dishwasher many times, no chips yet.',
        created_at: '2026-07-13',
        profiles: { full_name: 'Ritika Bose' },
      },
      {
        id: 'rev-mug-2',
        rating: 4,
        comment: 'Good size for coffee, packaging was secure so nothing broke in transit.',
        created_at: '2026-06-26',
        profiles: { full_name: 'Siddharth Rao' },
      },
      {
        id: 'rev-mug-3',
        rating: 5,
        comment: 'Bought as a gift, looked premium and my mom loved the set.',
        created_at: '2026-06-08',
        profiles: { full_name: 'Divya Menon' },
      },
    ],
    images: [{ id: 'img-mug', url: trendingMug, is_primary: true }],
  },
  {
    id: 'trending-bag',
    name: 'Leather Crossbody Sling Bag',
    price: 1299,
    compare_at_price: 1799,
    stock: 22,
    category: { name: 'Accessories' },
    is_trending: true,
    average_rating: 4.5,
    review_count: 74,
    sku: 'NC-AC-BAG-01',
    description:
      "Carry your essentials in style with this Leather Crossbody Sling Bag. Featuring a sleek silhouette and multiple compartments, it's the perfect blend of function and fashion.\n\n• Genuine leather construction\n• Multiple compartments for organization\n• Adjustable crossbody strap\n• Compact yet spacious design",
    specifications: {
      Material: 'Genuine Leather',
      'Strap Type': 'Adjustable Crossbody',
      Compartments: '3',
      Dimensions: '22 x 16 x 7 cm',
    },
    features: ['Genuine Leather', 'Adjustable Strap', 'Multiple Compartments', 'Compact Design'],
    reviews: [
      {
        id: 'rev-bag-1',
        rating: 5,
        comment: 'Leather quality feels genuine and premium. Fits my phone, wallet and keys comfortably.',
        created_at: '2026-07-11',
        profiles: { full_name: 'Meera Pillai' },
      },
      {
        id: 'rev-bag-2',
        rating: 4,
        comment: 'Compact but surprisingly holds a lot. Strap is adjustable and comfortable.',
        created_at: '2026-06-24',
        profiles: { full_name: 'Simran Kaur' },
      },
      {
        id: 'rev-bag-3',
        rating: 5,
        comment: 'Great everyday bag, compliments received already. Worth the price.',
        created_at: '2026-06-05',
        profiles: { full_name: 'Kavya Reddy' },
      },
    ],
    images: [{ id: 'img-bag', url: trendingBag, is_primary: true }],
  },
  {
    id: 'trending-lamp',
    name: 'LED Desk Lamp',
    price: 799,
    compare_at_price: 1099,
    stock: 48,
    category: { name: 'Office' },
    is_trending: true,
    average_rating: 4.4,
    review_count: 61,
    sku: 'NC-OF-LAMP-01',
    description:
      "Brighten your workspace with this LED Desk Lamp, offering adjustable brightness and color temperature to reduce eye strain during long work or study sessions.\n\n• 5 brightness levels & 3 color modes\n• Flicker-free, eye-caring LED\n• Flexible gooseneck design\n• USB rechargeable",
    specifications: {
      'Brightness Levels': '5',
      'Color Modes': '3',
      Power: 'USB Rechargeable',
      Lifespan: '25,000 Hours',
    },
    features: ['Eye-caring LED', 'Adjustable Brightness', 'Flexible Design', 'USB Rechargeable'],
    reviews: [
      {
        id: 'rev-lamp-1',
        rating: 4,
        comment: 'No flickering even at low brightness, great for late-night reading.',
        created_at: '2026-07-09',
        profiles: { full_name: 'Yash Patel' },
      },
      {
        id: 'rev-lamp-2',
        rating: 5,
        comment: 'Gooseneck holds position well and the warm light mode is easy on the eyes.',
        created_at: '2026-06-22',
        profiles: { full_name: 'Neha Joshi' },
      },
      {
        id: 'rev-lamp-3',
        rating: 4,
        comment: 'USB rechargeable is convenient, lasts a couple of days on a single charge for my usage.',
        created_at: '2026-06-04',
        profiles: { full_name: 'Arjun Nair' },
      },
    ],
    images: [{ id: 'img-lamp', url: trendingLamp, is_primary: true }],
  },
  {
    id: 'trending-candle',
    name: 'Scented Candle Gift Set',
    price: 649,
    compare_at_price: 899,
    stock: 50,
    category: { name: 'Home & Living' },
    is_trending: true,
    average_rating: 4.7,
    review_count: 108,
    sku: 'NC-HL-CANDLE-01',
    description:
      "Set the mood with this Scented Candle Gift Set, featuring long-lasting, hand-poured soy candles in relaxing fragrances — perfect for gifting or self-care.\n\n• Set of 3 hand-poured soy candles\n• Up to 20 hours burn time each\n• Relaxing, long-lasting fragrances\n• Elegant gift-ready packaging",
    specifications: {
      'Set Includes': '3 Candles',
      'Burn Time': '~20 hrs each',
      Wax: 'Soy Wax',
      Fragrance: 'Lavender, Vanilla, Sandalwood',
    },
    features: ['Long Burn Time', 'Soy Wax', 'Gift-ready Packaging', 'Relaxing Fragrances'],
    reviews: [
      {
        id: 'rev-candle-1',
        rating: 5,
        comment: 'Fragrances are subtle, not overpowering. The lavender one is my favorite for evenings.',
        created_at: '2026-07-12',
        profiles: { full_name: 'Pooja Singh' },
      },
      {
        id: 'rev-candle-2',
        rating: 5,
        comment: 'Bought this as a gift, the packaging looked lovely and premium.',
        created_at: '2026-06-27',
        profiles: { full_name: 'Isha Kapoor' },
      },
      {
        id: 'rev-candle-3',
        rating: 4,
        comment: 'Burns evenly and lasts a good while. Would buy again for gifting.',
        created_at: '2026-06-09',
        profiles: { full_name: 'Rahul Gupta' },
      },
    ],
    images: [{ id: 'img-candle', url: trendingCandle, is_primary: true }],
  },
  {
    id: 'trending-puzzle',
    name: 'Kids Puzzle Game Set',
    price: 549,
    compare_at_price: 749,
    stock: 60,
    category: { name: 'Toys & Games' },
    is_trending: true,
    average_rating: 4.6,
    review_count: 135,
    sku: 'NC-TG-PUZZLE-01',
    description:
      "Keep young minds engaged with this Kids Puzzle Game Set, designed to boost problem-solving skills and hand-eye coordination through fun, colorful puzzles.\n\n• Set of 4 puzzles with varying difficulty\n• Boosts problem-solving & motor skills\n• Made from sturdy, non-toxic material\n• Compact storage box included",
    specifications: {
      'Set Includes': '4 Puzzles',
      'Age Group': '3+ Years',
      Material: 'Non-toxic Cardboard',
      'Piece Count': '20-48 pieces',
    },
    features: ['Boosts Problem Solving', 'Non-toxic Material', 'Storage Box Included', 'Multiple Difficulty Levels'],
    reviews: [
      {
        id: 'rev-puzzle-1',
        rating: 5,
        comment: 'Great range of difficulty levels, keeps my kid engaged without getting frustrated.',
        created_at: '2026-07-08',
        profiles: { full_name: 'Sneha Iyer' },
      },
      {
        id: 'rev-puzzle-2',
        rating: 4,
        comment: 'Sturdy pieces that survive rough handling. Storage box is a nice bonus.',
        created_at: '2026-06-21',
        profiles: { full_name: 'Varun Chopra' },
      },
      {
        id: 'rev-puzzle-3',
        rating: 5,
        comment: 'Good educational value, my son is learning shapes and patterns while having fun.',
        created_at: '2026-06-02',
        profiles: { full_name: 'Priya Sharma' },
      },
    ],
    images: [{ id: 'img-puzzle', url: trendingPuzzle, is_primary: true }],
  },
]