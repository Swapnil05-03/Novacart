// Shared per-category content — images, descriptions, themed copy, and
// sub-category tile lists. Used by both the homepage CategoryShowcase
// (sliders, deal sections) and the /products listing page banner, so
// both surfaces stay visually consistent without duplicating this data.

// Compact per-category definitions — each gets its own theme color, a pool
// of stock images, a handful of headline/subtitle pairs, and a tile list.
// expandSlides() below turns each definition into 5-6 full slide objects so
// every category gets a richer carousel without hand-writing ~90 objects.

// --- Furniture: locally-hosted images, one dedicated folder per homepage
// section, so each section can be swapped independently by replacing files
// in src/assets/images/categories/furniture/<section>/ — no code changes
// needed. Other categories still use the shared Unsplash image pool below
// until they get the same treatment.
import furnitureSliderSofas from '@/assets/images/categories/furniture/slider/Sofas.avif'
import furnitureSliderBeds from '@/assets/images/categories/furniture/slider/Beds.webp'
import furnitureSliderDesksAndChairs from '@/assets/images/categories/furniture/slider/DesksAndChairs.jpg'
import furnitureSliderFurnishEveryRooms from '@/assets/images/categories/furniture/slider/FurnishEveryRooms.webp'
import furnitureSliderYourSpaceYourStyle from '@/assets/images/categories/furniture/slider/YourSpaceYourStyle.webp'

import sbcBarStools from '@/assets/images/categories/furniture/shopBycategory/Bar Stools.jpg'
import sbcBeanBags from '@/assets/images/categories/furniture/shopBycategory/Bean Bags.jpg'
import sbcBeds from '@/assets/images/categories/furniture/shopBycategory/Beds.webp'
import sbcBookshelves from '@/assets/images/categories/furniture/shopBycategory/Bookshelves.webp'
import sbcCoffeeTables from '@/assets/images/categories/furniture/shopBycategory/Coffee Tables.jpg'
import sbcDesksChairs from '@/assets/images/categories/furniture/shopBycategory/Desks & Chairs.jpg'
import sbcDiningSets from '@/assets/images/categories/furniture/shopBycategory/Dining Sets.jpg'
import sbcKidsFurniture from '@/assets/images/categories/furniture/shopBycategory/Kids Furniture.jpg'
import sbcOutdoorFurniture from '@/assets/images/categories/furniture/shopBycategory/Outdoor Furniture.jpg'
import sbcRecliners from '@/assets/images/categories/furniture/shopBycategory/Recliners.jpg'
import sbcShoeRacks from '@/assets/images/categories/furniture/shopBycategory/Shoe Racks.jpg'
import sbcSofas from '@/assets/images/categories/furniture/shopBycategory/Sofas.avif'
import sbcStorageUnits from '@/assets/images/categories/furniture/shopBycategory/Storage Units.webp'
import sbcTvUnits from '@/assets/images/categories/furniture/shopBycategory/TV Units.jpg'
import sbcWardrobes from '@/assets/images/categories/furniture/shopBycategory/Wardrobes.jpg'

import bannerFurnishAndSave from '@/assets/images/categories/furniture/banners/Furnish and Save.jpg'
import bannerDeskSetup from '@/assets/images/categories/furniture/banners/Desk Setup.jpg'

import dealsSofa from '@/assets/images/categories/furniture/furnishYourHomeDeals/3SeaterFabricSofa.jpg'
import dealsBookshelf from '@/assets/images/categories/furniture/furnishYourHomeDeals/Four Tier book shelf.webp'
import dealsPatioChair from '@/assets/images/categories/furniture/furnishYourHomeDeals/Outdoor patio chair.jpg'
import dealsBed from '@/assets/images/categories/furniture/furnishYourHomeDeals/Queen size bed.jpg'
import dealsStudyDesk from '@/assets/images/categories/furniture/furnishYourHomeDeals/Study desk and chairs.avif'
import dealsTvUnit from '@/assets/images/categories/furniture/furnishYourHomeDeals/TV entertainment unit.jpg'

import spotlightBarStools from '@/assets/images/categories/furniture/designerSpotlights/bar stools.jpg'
import spotlightBeanBags from '@/assets/images/categories/furniture/designerSpotlights/bean bags.jpg'
import spotlightBeds from '@/assets/images/categories/furniture/designerSpotlights/beds.jpg'
import spotlightBookshelves from '@/assets/images/categories/furniture/designerSpotlights/bookshelves.jpg'
import spotlightCoffeeTables from '@/assets/images/categories/furniture/designerSpotlights/coffee tables.jpg'
import spotlightDesksAndChairs from '@/assets/images/categories/furniture/designerSpotlights/desks and chairs.jpg'
import spotlightDiningSets from '@/assets/images/categories/furniture/designerSpotlights/dining sets.jpg'
import spotlightKids from '@/assets/images/categories/furniture/designerSpotlights/Kids.jpg'
import spotlightOutdoorFurniture from '@/assets/images/categories/furniture/designerSpotlights/outdoor furniture.jpg'
import spotlightRecliners from '@/assets/images/categories/furniture/designerSpotlights/recliners.jpg'
import spotlightShoeRacks from '@/assets/images/categories/furniture/designerSpotlights/shoe racks.jpg'
import spotlightSofas from '@/assets/images/categories/furniture/designerSpotlights/sofas.jpg'
import spotlightStorageUnits from '@/assets/images/categories/furniture/designerSpotlights/storage units.jpg'
import spotlightTvUnits from '@/assets/images/categories/furniture/designerSpotlights/tv units.jpg'
import spotlightWardrobes from '@/assets/images/categories/furniture/designerSpotlights/wardrobes.jpg'

import brandAmberlight from '@/assets/images/categories/furniture/featuredBrands/Amberlight.jpg'
import brandAurelle from '@/assets/images/categories/furniture/featuredBrands/Aurelle.jpg'
import brandBirchline from '@/assets/images/categories/furniture/featuredBrands/birchline.jpg'
import brandCascade from '@/assets/images/categories/furniture/featuredBrands/cascade.jpg'
import brandCobaltCo from '@/assets/images/categories/furniture/featuredBrands/cobalt co.jpg'
import brandDriftwood from '@/assets/images/categories/furniture/featuredBrands/driftwood.jpg'
import brandFernway from '@/assets/images/categories/furniture/featuredBrands/fernway.webp'
import brandHalcyon from '@/assets/images/categories/furniture/featuredBrands/halcyon.jpg'
import brandMeridian from '@/assets/images/categories/furniture/featuredBrands/meridian.jpg'
import brandNorthWind from '@/assets/images/categories/furniture/featuredBrands/NorthWind.jpg'
import brandSolace from '@/assets/images/categories/furniture/featuredBrands/solace.jpg'
import brandStonewell from '@/assets/images/categories/furniture/featuredBrands/stonewell.jpg'
import brandVerdeCo from '@/assets/images/categories/furniture/featuredBrands/verde co.jpg'
import brandWildgrove from '@/assets/images/categories/furniture/featuredBrands/wildgrove.jpg'

const CATEGORY_DEFINITIONS = {
  fashion: {
    images: [
      'https://images.unsplash.com/photo-1610189844303-227b6d2854ab?w=900&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=900&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&q=80',
      'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80',
      'https://images.unsplash.com/photo-1542060748-10c28b62716f?w=900&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=900&q=80',
      'https://picsum.photos/seed/1000/900/900',
    ],
    headlines: [
      ['Twirl into', 'traditions.'],
      ['Welcome', 'Spring Summer.'],
      ['New launches,', 'every week.'],
      ['Layer up for', 'the season.'],
      ['Style that', 'speaks for you.'],
    ],
    discounts: [65, 40, 30, 50, 35],
    description: 'Curated styles for every season, from everyday basics to statement pieces.',
    dealsLabel: 'Limited Time Deals',
    spotlightLabel: 'Style Spotlights',
    promos: [
      { title: 'Summer Style Sale', subtitle: 'Up to 50% off on tops & dresses', ctaLabel: 'Shop Now' },
      { title: 'Footwear Edit', subtitle: 'Starting at $29', ctaLabel: 'Explore Now' },
    ],
    tiles: ['T-Shirts', 'Jeans', 'Sports Shoes', 'Watches', "Kids' Clothing", 'Luggage', 'Kurtas', 'Summer Wear', 'Dresses', 'Formal Wear', 'Ethnic Wear', 'Innerwear', 'Sleepwear', 'Maternity Wear', 'Winter Wear'],
  },
  mobiles: {
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&q=80',
      'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=900&q=80',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900&q=80',
      'https://images.unsplash.com/photo-1571867424488-4565932edb41?w=900&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900&q=80',
      'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=900&q=80',
      'https://picsum.photos/seed/1001/900/900',
      'https://picsum.photos/seed/1002/900/900',
      'https://picsum.photos/seed/1003/900/900',
      'https://images.unsplash.com/photo-1592286927505-1def25115481?w=900&q=80',
      'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=900&q=80',
    ],
    headlines: [
      ['Latest 5G', 'smartphones.'],
      ['Flagship', 'camera phones.'],
      ['Best triple', 'camera, period.'],
      ['Slimmest phone', 'we have made.'],
      ['Power that', 'lasts all day.'],
    ],
    discounts: [20, 15, 10, 25, 18],
    description: 'The latest smartphones with flagship cameras, fast charging, and all-day battery.',
    dealsLabel: "Today's Best Deals",
    spotlightLabel: 'New Launches',
    promos: [
      { title: 'Trade-In Bonus', subtitle: 'Get up to $200 extra on exchange', ctaLabel: 'Trade Now' },
      { title: 'Premium Accessories', subtitle: 'Cases, chargers & more', ctaLabel: 'Explore Now' },
    ],
    tiles: ['iPhone', 'Galaxy', 'OPPO', 'POCO', 'Redmi', 'Infinix', 'Nothing', 'Pixel', 'OnePlus', 'Vivo', 'Realme', 'Phone Cases', 'Chargers', 'Earphones', 'Screen Guards'],
  },
  beauty: {
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80',
      'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=900&q=80',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=900&q=80',
      'https://images.unsplash.com/photo-1585652757173-57de5be9a4a5?w=900&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80',
      'https://images.unsplash.com/photo-1614806687792-9331926bd8a8?w=900&q=80',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35bc9430c0?w=900&q=80',
      'https://picsum.photos/seed/1004/900/900',
      'https://picsum.photos/seed/1005/900/900',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80',
      'https://images.unsplash.com/photo-1607602132700-068258431c6e?w=900&q=80',
    ],
    headlines: [
      ['Skincare', 'essentials.'],
      ['Makeup', 'must-haves.'],
      ['Haircare,', 'reinvented.'],
      ['Fragrance for', 'every mood.'],
      ['Sun care', 'essentials.'],
    ],
    discounts: [40, 35, 30, 25],
    description: 'Skincare, makeup, and grooming essentials trusted by thousands of happy customers.',
    dealsLabel: 'Limited Time Deals',
    spotlightLabel: 'Red Carpet Debuts',
    promos: [
      { title: 'Summer Beauty Sale', subtitle: 'Up to 50% off on Skincare & Makeup', ctaLabel: 'Shop Now' },
      { title: 'Premium Fragrances', subtitle: 'Starting at $29', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', "Men's Grooming", 'Wellness', 'Bath & Body', 'Tools & Brushes', 'Sunscreen', 'Lip Care', 'Nail Care', 'Hair Color', 'Face Masks', 'Body Lotion', 'Deodorants'],
  },
  electronics: {
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=900&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&q=80',
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=900&q=80',
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=900&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eabd?w=900&q=80',
      'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=900&q=80',
      'https://picsum.photos/seed/1006/900/900',
      'https://picsum.photos/seed/1007/900/900',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80',
    ],
    headlines: [
      ['Audio gear,', 'up to 75% off.'],
      ['Laptops &', 'more.'],
      ['Next-level', 'performance.'],
      ['Smartwatches', 'for every day.'],
      ['Cameras that', 'capture it all.'],
    ],
    discounts: [75, 30, 40, 20, 22],
    description: 'Premium audio, computing, and smart devices built for everyday performance.',
    dealsLabel: 'Top Tech Deals',
    spotlightLabel: 'Trending Gadgets',
    promos: [
      { title: 'Audio Week Sale', subtitle: 'Up to 60% off on headphones', ctaLabel: 'Shop Now' },
      { title: 'Smart Home Picks', subtitle: 'Starting at $19', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Headphones', 'Laptops', 'Smartwatches', 'Speakers', 'Cameras', 'Power Banks', 'Smart Home', 'Gaming Gear', 'Tablets', 'Monitors', 'Printers', 'Routers', 'External Drives', 'Webcams', 'Drones'],
  },
  home: {
    images: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&q=80',
      'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=900&q=80',
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=900&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80',
      'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=900&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
      'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80',
      'https://picsum.photos/seed/1008/900/900',
      'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=900&q=80',
      'https://picsum.photos/seed/1009/900/900',
    ],
    headlines: [
      ['Revamp your', 'space in style.'],
      ['Lighting that', 'sets the mood.'],
      ['Storage made', 'simple.'],
      ['A home you', 'love coming back to.'],
      ['Bedroom', 'refresh.'],
    ],
    description: 'Thoughtfully designed pieces that make every room feel like home.',
    dealsLabel: 'Home Refresh Deals',
    spotlightLabel: 'Designer Picks',
    promos: [
      { title: 'Home Refresh Sale', subtitle: 'Up to 45% off on decor', ctaLabel: 'Shop Now' },
      { title: 'Lighting Collection', subtitle: 'Starting at $24', ctaLabel: 'Explore Now' },
    ],
    discounts: [35, 28, 20, 30, 38],
    tiles: ['Cushion Covers', 'Figurines & Vases', 'Storage', 'Lighting', 'Wall Decor', 'Rugs', 'Curtains', 'Kitchen Linen', 'Bedsheets', 'Mirrors', 'Clocks', 'Planters', 'Photo Frames', 'Door Mats', 'Shower Curtains'],
  },
  appliances: {
    images: [
      'https://images.unsplash.com/photo-1581275299192-3c47b0c89e26?w=900&q=80',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=900&q=80',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=80',
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=80',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&q=80',
      'https://images.unsplash.com/photo-1556910638-6cc99a306a1b?w=900&q=80',
      'https://picsum.photos/seed/1010/900/900',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=900&q=80',
      'https://images.unsplash.com/photo-1574179629137-14ccc4ba9ea9?w=900&q=80',
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=900&q=80',
      'https://images.unsplash.com/photo-1556909190-5a9e1a0d3b3c?w=900&q=80',
      'https://picsum.photos/seed/1011/900/900',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=900&q=80',
    ],
    headlines: [
      ['Appliances for', 'your home.'],
      ['Kitchen', 'upgrades.'],
      ['Refrigerators,', 'reimagined.'],
      ['Laundry day,', 'made easy.'],
      ['Smart kitchen', 'upgrades.'],
    ],
    discounts: [55, 40, 30, 25],
    description: 'Reliable appliances that make everyday tasks faster and easier.',
    dealsLabel: 'Appliance Deals',
    spotlightLabel: 'Top Rated Picks',
    promos: [
      { title: 'Kitchen Upgrade Sale', subtitle: 'Up to 55% off on appliances', ctaLabel: 'Shop Now' },
      { title: 'Cooling Essentials', subtitle: 'Starting at $99', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Air Conditioners', 'Refrigerators', 'Microwaves', 'Washing Machines', 'Water Purifiers', 'Mixers & Grinders', 'Vacuum Cleaners', 'Geysers', 'Dishwashers', 'Air Purifiers', 'Toasters', 'Electric Kettles', 'Induction Cooktops', 'Coffee Makers', 'Ceiling Fans'],
  },
  'toys & games': {
    images: [
      'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=900&q=80',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=80',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=900&q=80',
      'https://images.unsplash.com/photo-1587731556726-069be43e9551?w=900&q=80',
      'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=900&q=80',
      'https://images.unsplash.com/photo-1602524818751-1d0d12b94b94?w=900&q=80',
      'https://images.unsplash.com/photo-1499914485622-a88fac536970?w=900&q=80',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=80',
      'https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=900&q=80',
      'https://images.unsplash.com/photo-1560859251-d563a49c5e4b?w=900&q=80',
      'https://images.unsplash.com/photo-1560859251-d563a49c5e4c?w=900&q=80',
      'https://images.unsplash.com/photo-1560343787-b83fb1a98a7a?w=900&q=80',
      'https://images.unsplash.com/photo-1599623560574-39d485eaa7eb?w=900&q=80',
      'https://picsum.photos/seed/1012/900/900',
    ],
    headlines: [
      ['Playtime', 'favorites.'],
      ['Building sets', 'for young minds.'],
      ['Game night,', 'sorted.'],
      ['Outdoor play', 'adventures.'],
      ['Creative kits', 'for young minds.'],
    ],
    discounts: [50, 35, 30],
    description: 'Safe, fun, and educational toys for every age and interest.',
    dealsLabel: 'Playtime Deals',
    spotlightLabel: 'New Arrivals',
    promos: [
      { title: 'Playtime Sale', subtitle: 'Up to 50% off on toys', ctaLabel: 'Shop Now' },
      { title: 'Board Game Picks', subtitle: 'Starting at $14', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Action Figures', 'Board Games', 'RC Cars', 'Soft Toys', 'Building Blocks', 'Puzzles', 'Outdoor Play', 'Educational Toys', 'Dolls', 'Art & Craft Kits', 'Musical Toys', 'Card Games', 'Ride-Ons', 'Science Kits', 'Party Supplies'],
  },
  'food & household': {
    images: [
      'https://images.unsplash.com/photo-1543168256-418811576931?w=900&q=80',
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=900&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80',
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=900&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80',
      'https://images.unsplash.com/photo-1601598851547-4137b04ffab0?w=900&q=80',
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=900&q=80',
      'https://picsum.photos/seed/1013/900/900',
      'https://picsum.photos/seed/1014/900/900',
      'https://picsum.photos/seed/1015/900/900',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&q=80',
      'https://picsum.photos/seed/1016/900/900',
      'https://picsum.photos/seed/1017/900/900',
      'https://images.unsplash.com/photo-1584736286279-90c4a5e44a91?w=900&q=80',
    ],
    headlines: [
      ['Pantry', 'staples.'],
      ['Cleaning made', 'simple.'],
      ['Everyday', 'essentials.'],
      ['Fresh pantry', 'staples.'],
      ['Home care', 'essentials.'],
    ],
    discounts: [20, 30, 15],
    description: 'Everyday groceries and household essentials, delivered with care.',
    dealsLabel: 'Pantry Deals',
    spotlightLabel: 'Everyday Picks',
    promos: [
      { title: 'Pantry Refill Sale', subtitle: 'Up to 30% off groceries', ctaLabel: 'Shop Now' },
      { title: 'Cleaning Essentials', subtitle: 'Starting at $5', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Snacks', 'Beverages', 'Cleaning Supplies', 'Personal Care', 'Baby Care', 'Pet Supplies', 'Kitchen Essentials', 'Storage Containers', 'Breakfast Cereals', 'Spices & Masalas', 'Dairy & Bakery', 'Laundry Care', 'Paper Products', 'Air Fresheners', 'Disposables'],
  },
  'auto accessories': {
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
      'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=900&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80',
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=900&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=900&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80',
      'https://images.unsplash.com/photo-1486326658115-04ba8542b16d?w=900&q=80',
      'https://images.unsplash.com/photo-1568844293986-8d6ab9c91c40?w=900&q=80',
      'https://picsum.photos/seed/1018/900/900',
      'https://picsum.photos/seed/1019/900/900',
      'https://picsum.photos/seed/1020/900/900',
      'https://picsum.photos/seed/1021/900/900',
      'https://picsum.photos/seed/1022/900/900',
      'https://picsum.photos/seed/1023/900/900',
      'https://picsum.photos/seed/1024/900/900',
    ],
    headlines: [
      ['Car care', 'essentials.'],
      ['Tyre & rim', 'care, sorted.'],
      ['Helmets built', 'for safety.'],
      ['Dashboard', 'upgrades.'],
      ['Ride in', 'style.'],
    ],
    discounts: [60, 40, 35],
    description: 'Keep your ride looking sharp and running smoothly, mile after mile.',
    dealsLabel: 'Garage Deals',
    spotlightLabel: 'Top Rated Gear',
    promos: [
      { title: 'Car Care Sale', subtitle: 'Up to 60% off accessories', ctaLabel: 'Shop Now' },
      { title: 'Helmet Collection', subtitle: 'Starting at $39', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Cleaning Accessories', 'Tyre & Rim Care', 'Helmets', 'Vacuum Cleaners', 'Car Covers', 'Seat Covers', 'Dashboard Accessories', 'Air Fresheners', 'Car Chargers', 'Floor Mats', 'Car Perfumes', 'Steering Covers', 'Tool Kits', 'Jump Starters', 'Dash Cams'],
  },
  'two wheelers': {
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=80',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=900&q=80',
      'https://images.unsplash.com/photo-1601361159752-7e8a6e8b8a7d?w=900&q=80',
      'https://images.unsplash.com/photo-1609778269201-86fb50b3bc55?w=900&q=80',
      'https://images.unsplash.com/photo-1591637333472-23bf1b6b8ee0?w=900&q=80',
      'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=900&q=80',
      'https://picsum.photos/seed/1025/900/900',
      'https://picsum.photos/seed/1026/900/900',
      'https://picsum.photos/seed/1027/900/900',
      'https://picsum.photos/seed/1028/900/900',
      'https://picsum.photos/seed/1029/900/900',
      'https://picsum.photos/seed/1030/900/900',
      'https://picsum.photos/seed/1031/900/900',
    ],
    headlines: [
      ['Riding gear,', 'gear up and go.'],
      ['Helmets that', 'protect in style.'],
      ['Bike', 'accessories.'],
      ['Ride safe,', 'ride far.'],
      ['Gear up', 'for adventure.'],
    ],
    discounts: [30, 25, 20],
    description: 'Gear and accessories built for riders who never compromise on safety.',
    dealsLabel: 'Rider Deals',
    spotlightLabel: 'Gear Spotlights',
    promos: [
      { title: 'Rider Gear Sale', subtitle: 'Up to 40% off riding gear', ctaLabel: 'Shop Now' },
      { title: 'Helmet Edit', subtitle: 'Starting at $49', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Helmets', 'Riding Jackets', 'Bike Accessories', 'Scooters', 'Riding Gloves', 'Bike Covers', 'Saddle Bags', 'Tyres', 'Riding Boots', 'Bike Locks', 'Mobile Holders', 'Knee Guards', 'Bike Lights', 'Seat Covers', 'Mirrors'],
  },
  'sports & outdoors': {
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=900&q=80',
      'https://images.unsplash.com/photo-1591741535018-d042766c62eb?w=900&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90df5b1a44?w=900&q=80',
      'https://picsum.photos/seed/1032/900/900',
      'https://picsum.photos/seed/1033/900/900',
      'https://picsum.photos/seed/1034/900/900',
      'https://picsum.photos/seed/1035/900/900',
      'https://picsum.photos/seed/1036/900/900',
      'https://picsum.photos/seed/1037/900/900',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80',
    ],
    headlines: [
      ['Gear up for', 'fitness.'],
      ['New season,', 'new gear.'],
      ['Outdoor', 'essentials.'],
      ['Weekend', 'warrior gear.'],
      ['Push your', 'limits.'],
    ],
    discounts: [35, 28, 22],
    description: 'Equipment and apparel for every workout, trail, and weekend adventure.',
    dealsLabel: 'Gear Up Deals',
    spotlightLabel: 'Athlete Picks',
    promos: [
      { title: 'Fitness Gear Sale', subtitle: 'Up to 35% off equipment', ctaLabel: 'Shop Now' },
      { title: 'Outdoor Essentials', subtitle: 'Starting at $19', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Yoga Mats', 'Water Bottles', 'Resistance Bands', 'Outdoor Gear', 'Camping Equipment', 'Cycling Gear', 'Team Sports', 'Trekking Gear', 'Swimming Gear', 'Tennis & Badminton', 'Cricket Gear', 'Fitness Trackers', 'Skating Gear', 'Fishing Gear', 'Backpacks'],
  },
  'books & stationery': {
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80',
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&q=80',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=900&q=80',
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=80',
      'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=900&q=80',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80',
      'https://picsum.photos/seed/1038/900/900',
      'https://picsum.photos/seed/1039/900/900',
      'https://picsum.photos/seed/1040/900/900',
      'https://picsum.photos/seed/1041/900/900',
      'https://picsum.photos/seed/1042/900/900',
      'https://picsum.photos/seed/1043/900/900',
      'https://images.unsplash.com/photo-1568667256549-094345857637?w=900&q=80',
    ],
    headlines: [
      ['Refill your', 'shelf.'],
      ['Notebooks for', 'every idea.'],
      ['Bestsellers', 'and more.'],
      ['Ideas start', 'on paper.'],
      ['Read more,', 'learn more.'],
    ],
    discounts: [25, 20, 15],
    description: 'Stories to get lost in and tools to bring your ideas to life.',
    dealsLabel: 'Reader Deals',
    spotlightLabel: 'New Releases',
    promos: [
      { title: 'Reader Sale', subtitle: 'Up to 30% off bestsellers', ctaLabel: 'Shop Now' },
      { title: 'Stationery Edit', subtitle: 'Starting at $4', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Fiction', 'Notebooks', 'Pens & Pencils', "Kids' Books", 'Non-Fiction', 'Art Supplies', 'Planners', 'Comics & Manga', 'Academic Books', 'Self-Help', 'Sticky Notes', 'Highlighters', 'File Organizers', 'Greeting Cards', 'Calculators'],
  },
  furniture: {
    // Locally-hosted images, one folder per homepage section. Replace the
    // files in src/assets/images/categories/furniture/<section>/ to change
    // what shows up — no code changes needed.
    images: [
      // Fallback pool only — used if a specific section image is ever
      // missing. Kept as the old Unsplash pool for safety.
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
      'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=900&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80',
      'https://picsum.photos/seed/1044/900/900',
      'https://picsum.photos/seed/1045/900/900',
      'https://picsum.photos/seed/1046/900/900',
      'https://picsum.photos/seed/1047/900/900',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=900&q=80',
      'https://picsum.photos/seed/1048/900/900',
      'https://images.unsplash.com/photo-1616627561839-074385245ff6?w=900&q=80',
    ],
    // Hero slider — 5 slides, order matches headlines below (Sofas, Beds,
    // Desks & Chairs, Furnish every room, Your space your style)
    sliderImages: [
      furnitureSliderSofas,
      furnitureSliderBeds,
      furnitureSliderDesksAndChairs,
      furnitureSliderFurnishEveryRooms,
      furnitureSliderYourSpaceYourStyle,
    ],
    // "Shop by Category" tile row — keyed by tile name
    shopByCategoryImages: {
      Sofas: sbcSofas,
      Beds: sbcBeds,
      'Desks & Chairs': sbcDesksChairs,
      'Storage Units': sbcStorageUnits,
      'Dining Sets': sbcDiningSets,
      Bookshelves: sbcBookshelves,
      'TV Units': sbcTvUnits,
      'Outdoor Furniture': sbcOutdoorFurniture,
      Wardrobes: sbcWardrobes,
      Recliners: sbcRecliners,
      'Coffee Tables': sbcCoffeeTables,
      'Bean Bags': sbcBeanBags,
      'Shoe Racks': sbcShoeRacks,
      'Bar Stools': sbcBarStools,
      'Kids Furniture': sbcKidsFurniture,
    },
    // The 2 promo banners — order matches promos below (Furnish & Save, Desk Setup Picks)
    promoImages: [bannerFurnishAndSave, bannerDeskSetup],
    // "Furnish Your Home Deals" row — a small curated list of specific
    // deal items (distinct from the 15 sub-category tiles), matching what
    // was actually uploaded for this section.
    dealsItems: [
      { label: '3-Seater Fabric Sofa', image: dealsSofa },
      { label: 'Four-Tier Bookshelf', image: dealsBookshelf },
      { label: 'Outdoor Patio Chair', image: dealsPatioChair },
      { label: 'Queen Size Bed', image: dealsBed },
      { label: 'Study Desk & Chair', image: dealsStudyDesk },
      { label: 'TV Entertainment Unit', image: dealsTvUnit },
    ],
    // "Designer Spotlights" row — keyed by tile name
    spotlightImages: {
      Sofas: spotlightSofas,
      Beds: spotlightBeds,
      'Desks & Chairs': spotlightDesksAndChairs,
      'Storage Units': spotlightStorageUnits,
      'Dining Sets': spotlightDiningSets,
      Bookshelves: spotlightBookshelves,
      'TV Units': spotlightTvUnits,
      'Outdoor Furniture': spotlightOutdoorFurniture,
      Wardrobes: spotlightWardrobes,
      Recliners: spotlightRecliners,
      'Coffee Tables': spotlightCoffeeTables,
      'Bean Bags': spotlightBeanBags,
      'Shoe Racks': spotlightShoeRacks,
      'Bar Stools': spotlightBarStools,
      'Kids Furniture': spotlightKids,
    },
    // "Featured Brands" row — keyed by BRAND name (not tile name), since
    // this row shows placeholder store fronts rather than sub-categories.
    // 'Lumio' and 'Tidemark' weren't uploaded, so they fall back to the
    // shared image pool automatically.
    brandImages: {
      Northwind: brandNorthWind,
      Aurelle: brandAurelle,
      'Cascade Co.': brandCascade,
      'Verde & Co': brandVerdeCo,
      Halcyon: brandHalcyon,
      Driftwood: brandDriftwood,
      Solace: brandSolace,
      Meridian: brandMeridian,
      Birchline: brandBirchline,
      Amberlight: brandAmberlight,
      Stonewell: brandStonewell,
      Fernway: brandFernway,
      'Cobalt & Co': brandCobaltCo,
      Wildgrove: brandWildgrove,
    },
    headlines: [
      ['Sofas built', 'for comfort.'],
      ['Beds for', 'better sleep.'],
      ['Desks & chairs', 'for focused work.'],
      ['Furnish every', 'room.'],
      ['Your space,', 'your style.'],
    ],
    discounts: [45, 35, 30, 25],
    description: 'Furniture that balances comfort, durability, and everyday style.',
    dealsLabel: 'Furnish Your Home Deals',
    spotlightLabel: 'Designer Spotlights',
    promos: [
      { title: 'Furnish & Save', subtitle: 'Up to 45% off furniture', ctaLabel: 'Shop Now' },
      { title: 'Desk Setup Picks', subtitle: 'Starting at $79', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Sofas', 'Beds', 'Desks & Chairs', 'Storage Units', 'Dining Sets', 'Bookshelves', 'TV Units', 'Outdoor Furniture', 'Wardrobes', 'Recliners', 'Coffee Tables', 'Bean Bags', 'Shoe Racks', 'Bar Stools', 'Kids Furniture'],
  },
  accessories: {
    images: [
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=900&q=80',
      'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=900&q=80',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=80',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=80',
      'https://images.unsplash.com/photo-1509941943102-10c232535736?w=900&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&q=80',
      'https://picsum.photos/seed/1049/900/900',
      'https://picsum.photos/seed/1050/900/900',
      'https://picsum.photos/seed/1051/900/900',
      'https://picsum.photos/seed/1052/900/900',
      'https://picsum.photos/seed/1053/900/900',
      'https://picsum.photos/seed/1054/900/900',
      'https://picsum.photos/seed/1055/900/900',
    ],
    headlines: [
      ['Small details,', 'big difference.'],
      ['Carry it', 'well.'],
      ['Watches built', 'to last.'],
      ['Finish the', 'look.'],
      ['Style that', 'speaks volumes.'],
    ],
    discounts: [40, 30, 25, 35],
    description: 'Bags, watches, and the small details that finish every outfit.',
    dealsLabel: 'Accessory Deals',
    spotlightLabel: 'Editor Picks',
    promos: [
      { title: 'Accessory Sale', subtitle: 'Up to 40% off bags & watches', ctaLabel: 'Shop Now' },
      { title: 'Sunglasses Edit', subtitle: 'Starting at $24', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Bags', 'Watches', 'Wallets', 'Belts', 'Sunglasses', 'Jewelry', 'Hats & Caps', 'Scarves', 'Hair Accessories', 'Ties & Cufflinks', 'Keychains', 'Phone Accessories', 'Umbrellas', 'Gloves', 'Brooches & Pins'],
  },
  apparel: {
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&q=80',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=80',
      'https://picsum.photos/seed/1056/900/900',
      'https://picsum.photos/seed/1057/900/900',
      'https://picsum.photos/seed/1058/900/900',
      'https://picsum.photos/seed/1059/900/900',
      'https://picsum.photos/seed/1060/900/900',
      'https://picsum.photos/seed/1061/900/900',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=80',
    ],
    headlines: [
      ['Everyday', 'essentials.'],
      ['Layers for', 'every season.'],
      ['Considered', 'basics.'],
      ['Fits that', 'just work.'],
      ['Dress for', 'every occasion.'],
    ],
    discounts: [35, 30, 25, 40],
    description: 'Heavyweight basics and considered layers, built to wear in, not out.',
    dealsLabel: 'Wardrobe Deals',
    spotlightLabel: 'New This Week',
    promos: [
      { title: 'Wardrobe Sale', subtitle: 'Up to 35% off basics', ctaLabel: 'Shop Now' },
      { title: 'Outerwear Picks', subtitle: 'Starting at $39', ctaLabel: 'Explore Now' },
    ],
    tiles: ['T-Shirts', 'Hoodies', 'Jackets', 'Pants', 'Outerwear', 'Sweaters', 'Shorts', 'Activewear', 'Polo Shirts', 'Denim', 'Blazers', 'Track Pants', 'Vests', 'Thermal Wear', 'Loungewear'],
  },
  fitness: {
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=900&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80',
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=900&q=80',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=900&q=80',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80',
      'https://picsum.photos/seed/1062/900/900',
      'https://picsum.photos/seed/1063/900/900',
      'https://picsum.photos/seed/1064/900/900',
      'https://picsum.photos/seed/1065/900/900',
      'https://picsum.photos/seed/1066/900/900',
      'https://picsum.photos/seed/1067/900/900',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&q=80',
    ],
    headlines: [
      ['Show up,', 'every day.'],
      ['Gear for the', 'grind.'],
      ['Recovery', 'matters too.'],
      ['Train', 'anywhere.'],
      ['Stronger', 'every day.'],
    ],
    discounts: [30, 25, 20, 35],
    description: 'Equipment built for consistency — at home, at the gym, or on the trail.',
    dealsLabel: 'Training Deals',
    spotlightLabel: 'Athlete Favorites',
    promos: [
      { title: 'Training Gear Sale', subtitle: 'Up to 30% off equipment', ctaLabel: 'Shop Now' },
      { title: 'Recovery Picks', subtitle: 'Starting at $14', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Water Bottles', 'Yoga Mats', 'Resistance Bands', 'Dumbbells', 'Foam Rollers', 'Gym Bags', 'Jump Ropes', 'Fitness Trackers', 'Treadmills', 'Kettlebells', 'Pull-Up Bars', 'Massage Guns', 'Protein Shakers', 'Ab Rollers', 'Gym Gloves'],
  },
  office: {
    images: [
      'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=900&q=80',
      'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=900&q=80',
      'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=900&q=80',
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&q=80',
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&q=80',
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=900&q=80',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&q=80',
      'https://picsum.photos/seed/1068/900/900',
      'https://picsum.photos/seed/1069/900/900',
      'https://picsum.photos/seed/1070/900/900',
      'https://picsum.photos/seed/1071/900/900',
      'https://picsum.photos/seed/1072/900/900',
      'https://picsum.photos/seed/1073/900/900',
      'https://picsum.photos/seed/1074/900/900',
    ],
    headlines: [
      ['Tools for', 'focused work.'],
      ['A desk that', 'works for you.'],
      ['Write it', 'down.'],
      ['Built for', 'long days.'],
      ['Work smarter,', 'not harder.'],
    ],
    discounts: [25, 30, 20, 35],
    description: 'Desk setups, notebooks, and the small tools that keep focused work flowing.',
    dealsLabel: 'Workspace Deals',
    spotlightLabel: 'Desk Setup Picks',
    promos: [
      { title: 'Workspace Sale', subtitle: 'Up to 35% off desk setups', ctaLabel: 'Shop Now' },
      { title: 'Stationery Picks', subtitle: 'Starting at $6', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Notebooks', 'Desk Organizers', 'Keyboards', 'Pens', 'Lighting', 'Monitor Stands', 'Cable Organizers', 'Desk Mats', 'Office Chairs', 'Whiteboards', 'Staplers', 'File Folders', 'Sticky Notes', 'Desk Calendars', 'Laptop Stands'],
  },
}

const DEFAULT_DEFINITION = {
  images: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&q=80',
  ],
  headlines: [
    ['Explore the', 'collection.'],
    ['Curated picks,', 'every day.'],
  ],
  discounts: [20, 15],
  description: 'Quality picks across every category, chosen with care.',
  dealsLabel: 'Limited Time Deals',
  spotlightLabel: 'Top Picks',
  promos: [
    { title: 'Seasonal Sale', subtitle: 'Up to 40% off', ctaLabel: 'Shop Now' },
    { title: 'New Arrivals', subtitle: 'Just landed', ctaLabel: 'Explore Now' },
  ],
  tiles: ['Best Sellers', 'New Arrivals', 'Top Rated', 'On Sale', 'Most Popular', 'Editor Picks', 'Just Restocked', 'Customer Favorites'],
}

function getDefinitionForCategory(name = '') {
  return CATEGORY_DEFINITIONS[name.toLowerCase()] || DEFAULT_DEFINITION
}

export { CATEGORY_DEFINITIONS, DEFAULT_DEFINITION, getDefinitionForCategory }