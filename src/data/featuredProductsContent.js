import productAC from '@/assets/images/hero/featuredProducts/1.5tonAC.jpg'
import productArmor from '@/assets/images/hero/featuredProducts/armor.jpg'
import productBlocks from '@/assets/images/hero/featuredProducts/building-blocks.jpg'
import productKit from '@/assets/images/hero/featuredProducts/kit.jpg'
import productNova from '@/assets/images/hero/featuredProducts/nova.jpg'
import productSerum from '@/assets/images/hero/featuredProducts/serum.jpg'
import productSpray from '@/assets/images/hero/featuredProducts/spray.jpg'
import productYogaMat from '@/assets/images/hero/featuredProducts/yoga-mat.jpg'

// Static "Featured Products" row — bypasses Supabase entirely so this
// section always shows exactly these curated items, unaffected by
// database seed/test data, storage cleanup, or category-diversify caps.
//
// Each product also carries a small `reviews` array of sample reviews so
// the Reviews tab (rating breakdown + review list) isn't empty — these
// are demo/placeholder reviews, not real customer feedback, since these
// products bypass Supabase entirely and have no real review records.
export const FEATURED_PRODUCTS = [
  {
    id: 'featured-ac',
    name: '1.5 Ton Inverter Split AC',
    price: 32999,
    compare_at_price: 42999,
    stock: 18,
    category: { name: 'Appliances' },
    average_rating: 4.6,
    review_count: 128,
    sku: 'NC-APL-AC-01',
    description:
      "Beat the heat with our 1.5 Ton Inverter Split AC, engineered for fast cooling and energy efficiency. With a 5-star inverter compressor, it delivers powerful performance while keeping your electricity bills low.\n\n• 5-star inverter compressor for energy savings\n• Fast cooling with dual-swing airflow\n• Anti-bacterial dust filter\n• Low noise operation for peaceful sleep",
    specifications: {
      Capacity: '1.5 Ton',
      'Energy Rating': '5 Star',
      Compressor: 'Inverter',
      'Cooling Capacity': '5100 W',
      Refrigerant: 'R32',
      Warranty: '1 Year Comprehensive + 10 Years on Compressor',
    },
    features: ['5 Star Energy Rating', 'Fast Cooling', 'Anti-bacterial Filter', 'Low Noise Operation'],
    reviews: [
      {
        id: 'rev-ac-1',
        rating: 5,
        comment: 'Cools the room super fast and the noise level is barely noticeable at night. Great buy for the price.',
        created_at: '2026-07-18',
        profiles: { full_name: 'Aman Verma' },
      },
      {
        id: 'rev-ac-2',
        rating: 4,
        comment: 'Works well, installation took a bit longer than expected but the cooling performance is excellent.',
        created_at: '2026-07-05',
        profiles: { full_name: 'Priya Sharma' },
      },
      {
        id: 'rev-ac-3',
        rating: 5,
        comment: 'Electricity bill has noticeably gone down since switching to this inverter AC. Highly recommend.',
        created_at: '2026-06-22',
        profiles: { full_name: 'Rohan Mehta' },
      },
    ],
    images: [{ id: 'img-ac', url: productAC, is_primary: true }],
  },
  {
    id: 'featured-armor',
    name: 'Riding Jacket with Armor',
    price: 3499,
    compare_at_price: 4499,
    stock: 25,
    category: { name: 'Two Wheelers' },
    average_rating: 4.5,
    review_count: 64,
    sku: 'NC-TW-ARMOR-01',
    description:
      "Stay protected and ride in confidence with our premium Riding Jacket with Armor. Designed for high performance and maximum safety, it features impact-resistant armor on the shoulder, elbows, and back along with a breathable mesh fabric for all-day comfort.\n\n• High impact protection\n• Breathable mesh for ventilation\n• Adjustable straps for perfect fit\n• Ideal for all weather conditions",
    specifications: {
      Material: 'Polyester Mesh + EVA Armor',
      Armor: 'Shoulder, Elbow, Back, Chest',
      Fit: 'Adjustable',
      Closure: 'Zipper',
      Color: 'Black with Red',
      Weight: '1.8 kg (Approx.)',
      Care: 'Hand Wash Only',
    },
    features: ['CE Approved Armor', 'Breathable Material', 'Water Resistant', 'Adjustable Fit'],
    reviews: [
      {
        id: 'rev-armor-1',
        rating: 5,
        comment: 'Excellent build quality and fits perfectly. Very comfortable for long rides.',
        created_at: '2026-07-26',
        profiles: { full_name: 'Aman Verma' },
      },
      {
        id: 'rev-armor-2',
        rating: 4,
        comment: 'Good protection and breathable even in summer. Sizing runs slightly large, order one size down.',
        created_at: '2026-07-10',
        profiles: { full_name: 'Karan Malhotra' },
      },
      {
        id: 'rev-armor-3',
        rating: 5,
        comment: 'Saved me from a bad fall last month. Armor held up perfectly and I walked away with barely a scratch.',
        created_at: '2026-06-30',
        profiles: { full_name: 'Vikram Rao' },
      },
    ],
    images: [{ id: 'img-armor', url: productArmor, is_primary: true }],
  },
  {
    id: 'featured-blocks',
    name: 'Building Blocks Set — 500 Pieces',
    price: 999,
    compare_at_price: 1399,
    stock: 40,
    category: { name: 'Toys & Games' },
    average_rating: 4.7,
    review_count: 210,
    sku: 'NC-TG-BLOCKS-01',
    description:
      "Spark imagination and creativity with this 500-piece Building Blocks Set. Compatible with most major building block brands, it's perfect for hours of screen-free, hands-on play.\n\n• 500 colorful interlocking pieces\n• Compatible with major building block brands\n• Encourages creativity and motor skills\n• Comes with a reusable storage box",
    specifications: {
      Pieces: '500',
      Material: 'Non-toxic ABS Plastic',
      'Age Group': '4+ Years',
      'Box Includes': 'Storage Box, Instruction Booklet',
    },
    features: ['Non-toxic Material', 'Compatible Design', 'Storage Box Included', 'Boosts Creativity'],
    reviews: [
      {
        id: 'rev-blocks-1',
        rating: 5,
        comment: 'My daughter loves this set, keeps her engaged for hours. Blocks are compatible with our existing collection.',
        created_at: '2026-07-20',
        profiles: { full_name: 'Neha Joshi' },
      },
      {
        id: 'rev-blocks-2',
        rating: 5,
        comment: 'Great quality pieces, no sharp edges, and the storage box is a nice touch for cleanup.',
        created_at: '2026-07-02',
        profiles: { full_name: 'Arjun Nair' },
      },
      {
        id: 'rev-blocks-3',
        rating: 4,
        comment: 'Good value for the number of pieces. Instruction booklet could have more build ideas.',
        created_at: '2026-06-15',
        profiles: { full_name: 'Pooja Singh' },
      },
    ],
    images: [{ id: 'img-blocks', url: productBlocks, is_primary: true }],
  },
  {
    id: 'featured-kit',
    name: 'Microfiber Car Cleaning Kit',
    price: 899,
    compare_at_price: 1199,
    stock: 32,
    category: { name: 'Auto Accessories' },
    average_rating: 4.4,
    review_count: 89,
    sku: 'NC-AA-KIT-01',
    description:
      "Keep your car spotless with this complete Microfiber Car Cleaning Kit. Includes everything you need for a professional-grade wash and shine, without scratching your paint.\n\n• Ultra-soft microfiber cloths for scratch-free cleaning\n• Includes wash mitt, drying towel & wheel brush\n• Highly absorbent — dries cars faster\n• Reusable and machine washable",
    specifications: {
      'Kit Includes': 'Wash Mitt, Drying Towel, Wheel Brush, 2 Microfiber Cloths',
      Material: 'Microfiber',
      Washable: 'Yes, Machine Washable',
      'Suitable For': 'All Car Types',
    },
    features: ['Scratch-free Cleaning', 'Highly Absorbent', 'Reusable', 'Complete Kit'],
    reviews: [
      {
        id: 'rev-kit-1',
        rating: 4,
        comment: 'Good kit for the price, the drying towel is very absorbent. Wheel brush bristles are a bit soft.',
        created_at: '2026-07-14',
        profiles: { full_name: 'Rahul Gupta' },
      },
      {
        id: 'rev-kit-2',
        rating: 5,
        comment: 'No more scratches on my paint since I started using these microfiber cloths. Worth it.',
        created_at: '2026-06-28',
        profiles: { full_name: 'Divya Menon' },
      },
      {
        id: 'rev-kit-3',
        rating: 4,
        comment: 'Everything you need in one kit. Washes and dries easily for reuse.',
        created_at: '2026-06-10',
        profiles: { full_name: 'Siddharth Rao' },
      },
    ],
    images: [{ id: 'img-kit', url: productKit, is_primary: true }],
  },
  {
    id: 'featured-nova',
    name: 'Nova X12 5G Smartphone',
    price: 17999,
    compare_at_price: 21999,
    stock: 45,
    category: { name: 'Mobiles' },
    average_rating: 4.5,
    review_count: 312,
    sku: 'NC-MB-NOVA-01',
    description:
      "Experience blazing-fast connectivity with the Nova X12 5G. Featuring a stunning AMOLED display, a powerful processor, and an all-day battery, it's built for work and play.\n\n• 5G connectivity for ultra-fast internet\n• 6.5\" AMOLED display with 120Hz refresh rate\n• 5000mAh battery with fast charging\n• Triple rear camera setup",
    specifications: {
      Display: '6.5" AMOLED, 120Hz',
      RAM: '8 GB',
      Storage: '128 GB',
      Battery: '5000 mAh',
      Camera: '50MP + 8MP + 2MP',
      Network: '5G',
    },
    features: ['5G Ready', 'AMOLED Display', 'Fast Charging', 'Triple Camera'],
    reviews: [
      {
        id: 'rev-nova-1',
        rating: 5,
        comment: 'Display is gorgeous and 5G speeds are genuinely fast in my area. Battery easily lasts a full day.',
        created_at: '2026-07-22',
        profiles: { full_name: 'Ananya Das' },
      },
      {
        id: 'rev-nova-2',
        rating: 4,
        comment: 'Great phone overall, camera does well in daylight but low-light shots could be better.',
        created_at: '2026-07-08',
        profiles: { full_name: 'Manish Tiwari' },
      },
      {
        id: 'rev-nova-3',
        rating: 5,
        comment: 'Fast charging is a lifesaver, goes from low to full in under an hour. Very happy with this purchase.',
        created_at: '2026-06-25',
        profiles: { full_name: 'Ritika Bose' },
      },
    ],
    images: [{ id: 'img-nova', url: productNova, is_primary: true }],
  },
  {
    id: 'featured-serum',
    name: 'Vitamin C Brightening Serum',
    price: 599,
    compare_at_price: 799,
    stock: 60,
    category: { name: 'Beauty' },
    average_rating: 4.6,
    review_count: 175,
    sku: 'NC-BT-SERUM-01',
    description:
      "Reveal brighter, more radiant skin with our Vitamin C Brightening Serum. Formulated with 10% Vitamin C and Hyaluronic Acid, it fades dark spots while deeply hydrating your skin.\n\n• 10% Vitamin C for visible brightening\n• Hyaluronic Acid for deep hydration\n• Reduces dark spots and dullness\n• Suitable for all skin types",
    specifications: {
      Volume: '30 ml',
      'Key Ingredients': 'Vitamin C, Hyaluronic Acid',
      'Skin Type': 'All Skin Types',
      'Cruelty Free': 'Yes',
    },
    features: ['10% Vitamin C', 'Deeply Hydrating', 'Cruelty Free', 'Dermatologically Tested'],
    reviews: [
      {
        id: 'rev-serum-1',
        rating: 5,
        comment: 'Noticed brighter skin within two weeks of daily use. Absorbs quickly and doesn\u2019t feel sticky.',
        created_at: '2026-07-24',
        profiles: { full_name: 'Isha Kapoor' },
      },
      {
        id: 'rev-serum-2',
        rating: 4,
        comment: 'Good hydration and my dark spots have faded slightly. A little goes a long way.',
        created_at: '2026-07-09',
        profiles: { full_name: 'Simran Kaur' },
      },
      {
        id: 'rev-serum-3',
        rating: 5,
        comment: 'My go-to serum now. Gentle on sensitive skin and gives a nice glow.',
        created_at: '2026-06-27',
        profiles: { full_name: 'Meera Pillai' },
      },
    ],
    images: [{ id: 'img-serum', url: productSerum, is_primary: true }],
  },
  {
    id: 'featured-spray',
    name: 'Multi-Surface Cleaning Spray, 3 Pack',
    price: 349,
    compare_at_price: 449,
    stock: 70,
    category: { name: 'Food & Household' },
    average_rating: 4.3,
    review_count: 52,
    sku: 'NC-FH-SPRAY-01',
    description:
      "Tackle everyday messes with our Multi-Surface Cleaning Spray, effective on kitchen counters, glass, and more. This pack of 3 keeps your home sparkling clean and germ-free.\n\n• Kills 99.9% of germs and bacteria\n• Safe on multiple surfaces\n• Fresh, non-overpowering fragrance\n• Pack of 3 — great value",
    specifications: {
      'Pack Size': '3 x 500 ml',
      Fragrance: 'Fresh Citrus',
      'Surface Type': 'Multi-Surface',
      'Kills Germs': '99.9%',
    },
    features: ['Kills 99.9% Germs', 'Multi-Surface Use', 'Fresh Fragrance', 'Value Pack of 3'],
    reviews: [
      {
        id: 'rev-spray-1',
        rating: 4,
        comment: 'Works well on kitchen counters and glass. Smell is pleasant, not too strong.',
        created_at: '2026-07-16',
        profiles: { full_name: 'Yash Patel' },
      },
      {
        id: 'rev-spray-2',
        rating: 5,
        comment: 'Great value getting 3 bottles together. Cuts through grease easily.',
        created_at: '2026-06-30',
        profiles: { full_name: 'Nikhil Chawla' },
      },
      {
        id: 'rev-spray-3',
        rating: 4,
        comment: 'Does the job on most surfaces, will repurchase when we run out.',
        created_at: '2026-06-12',
        profiles: { full_name: 'Tanya Bhatt' },
      },
    ],
    images: [{ id: 'img-spray', url: productSpray, is_primary: true }],
  },
  {
    id: 'featured-yoga',
    name: 'Non-Slip Yoga Mat, 6mm',
    price: 799,
    compare_at_price: 999,
    stock: 38,
    category: { name: 'Sports & Outdoors' },
    average_rating: 4.7,
    review_count: 143,
    sku: 'NC-SP-YOGA-01',
    description:
      "Elevate your practice with this Non-Slip Yoga Mat, offering superior cushioning and grip for yoga, pilates, and floor workouts. Lightweight and easy to carry wherever you go.\n\n• 6mm extra-thick cushioning for joint support\n• Non-slip textured surface\n• Lightweight and easy to carry\n• Free carry strap included",
    specifications: {
      Thickness: '6 mm',
      Material: 'NBR Foam',
      Dimensions: '183 cm x 61 cm',
      'Carry Strap': 'Included',
    },
    features: ['Extra Cushioning', 'Non-slip Grip', 'Lightweight', 'Carry Strap Included'],
    reviews: [
      {
        id: 'rev-yoga-1',
        rating: 5,
        comment: 'Great cushioning for my knees during floor exercises. Grip is excellent even when sweaty.',
        created_at: '2026-07-19',
        profiles: { full_name: 'Kavya Reddy' },
      },
      {
        id: 'rev-yoga-2',
        rating: 5,
        comment: 'Thick and comfortable, carry strap makes it easy to bring to the studio.',
        created_at: '2026-07-01',
        profiles: { full_name: 'Varun Chopra' },
      },
      {
        id: 'rev-yoga-3',
        rating: 4,
        comment: 'Good quality mat, slight smell when new but it faded after airing out for a day.',
        created_at: '2026-06-14',
        profiles: { full_name: 'Sneha Iyer' },
      },
    ],
    images: [{ id: 'img-yoga', url: productYogaMat, is_primary: true }],
  },
]