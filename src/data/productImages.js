// Static product images, keyed by SKU — no Supabase/product_images table
// involved for these products. Each SKU maps to an array of image URLs;
// the first one is used as the primary/card image. To add more images for
// a product later (e.g. 2-3 per brand), just push more URLs into that
// SKU's array — no DB migration needed.
//
// These replace the old `picsum.photos/seed/...` images (random, unrelated
// photos) with real, on-topic photos for each category.

export const PRODUCT_IMAGES = {
  // ---------------- MOBILES ----------------
  'NC-MB-001': ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900&q=80'],
  'NC-MB-002': ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&q=80'],
  'NC-MB-003': ['https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=900&q=80'],
  'NC-MB-004': ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=80'],
  'NC-MB-005': ['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900&q=80'],
  'NC-MB-006': ['https://images.unsplash.com/photo-1571867424488-4565932edb41?w=900&q=80'],
  'NC-MB-007': ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900&q=80'],
  'NC-MB-008': ['https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=900&q=80'],

  // ---------------- BEAUTY ----------------
  'NC-BT-001': ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80'],
  'NC-BT-002': ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80'],
  'NC-BT-003': ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80'],
  'NC-BT-004': ['https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=900&q=80'],
  'NC-BT-005': ['https://images.unsplash.com/photo-1571875257727-256c39da42af?w=900&q=80'],
  'NC-BT-006': ['https://images.unsplash.com/photo-1585652757173-57de5be9a4a5?w=900&q=80'],
  'NC-BT-007': ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80'],
  'NC-BT-008': ['https://images.unsplash.com/photo-1614806687792-9331926bd8a8?w=900&q=80'],

  // ---------------- APPLIANCES ----------------
  'NC-APL-101': ['https://images.unsplash.com/photo-1581275299192-3c47b0c89e26?w=900&q=80'],
  'NC-APL-102': ['https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=900&q=80'],
  'NC-APL-103': ['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=80'],
  'NC-APL-104': ['https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=80'],
  'NC-APL-105': ['https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80'],
  'NC-APL-106': ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80'],
  'NC-APL-107': ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&q=80'],

  // ---------------- TOYS & GAMES ----------------
  'NC-TG-001': ['https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=900&q=80'],
  'NC-TG-002': ['https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=80'],
  'NC-TG-003': ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=80'],
  'NC-TG-004': ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=900&q=80'],
  'NC-TG-005': ['https://images.unsplash.com/photo-1587731556726-069be43e9551?w=900&q=80'],
  'NC-TG-006': ['https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=900&q=80'],
  'NC-TG-007': ['https://images.unsplash.com/photo-1602524818751-1d0d12b94b94?w=900&q=80'],

  // ---------------- FOOD & HOUSEHOLD ----------------
  'NC-FH-001': ['https://images.unsplash.com/photo-1543168256-418811576931?w=900&q=80'],
  'NC-FH-002': ['https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=900&q=80'],
  'NC-FH-003': ['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=80'],
  'NC-FH-004': ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80'],
  'NC-FH-005': ['https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=900&q=80'],
  'NC-FH-006': ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80'],

  // ---------------- AUTO ACCESSORIES ----------------
  'NC-AA-001': ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80'],
  'NC-AA-002': ['https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=900&q=80'],
  'NC-AA-003': ['https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80'],
  'NC-AA-004': ['https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=900&q=80'],
  'NC-AA-005': ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=900&q=80'],
  'NC-AA-006': ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80'],

  // ---------------- TWO WHEELERS ----------------
  'NC-TW-001': ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&q=80'],
  'NC-TW-002': ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80'],
  'NC-TW-003': ['https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=80'],
  'NC-TW-004': ['https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=900&q=80'],
  'NC-TW-005': ['https://images.unsplash.com/photo-1601361159752-7e8a6e8b8a7d?w=900&q=80'],
  'NC-TW-006': ['https://images.unsplash.com/photo-1609778269201-86fb50b3bc55?w=900&q=80'],

  // ---------------- SPORTS & OUTDOORS ----------------
  'NC-SP-001': ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80'],
  'NC-SP-002': ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80'],
  'NC-SP-003': ['https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80'],
  'NC-SP-004': ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80'],
  'NC-SP-005': ['https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80'],
  'NC-SP-006': ['https://images.unsplash.com/photo-1576678927484-cc907957088c?w=900&q=80'],
  'NC-SP-007': ['https://images.unsplash.com/photo-1591741535018-d042766c62eb?w=900&q=80'],

  // ---------------- BOOKS & STATIONERY ----------------
  'NC-BS-001': ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80'],
  'NC-BS-002': ['https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80'],
  'NC-BS-003': ['https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&q=80'],
  'NC-BS-004': ['https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=900&q=80'],
  'NC-BS-005': ['https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=80'],
  'NC-BS-006': ['https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=900&q=80'],

  // ---------------- FURNITURE ----------------
  'NC-FN-001': ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80'],
  'NC-FN-002': ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80'],
  'NC-FN-003': ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=900&q=80'],
  'NC-FN-004': ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80'],
  'NC-FN-005': ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80'],
  'NC-FN-006': ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80'],
}

// Returns the image URL array for a SKU, or an empty array if this
// product isn't in the static override list (e.g. your original 6
// categories — Electronics, Apparel, Home & Living, Accessories, Fitness,
// Office — which already have real, correct images from Supabase and
// don't need overriding).
export function getStaticProductImages(sku) {
  return PRODUCT_IMAGES[sku] || []
}