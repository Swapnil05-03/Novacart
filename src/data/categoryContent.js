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

import brandDurian from '@/assets/images/categories/furniture/featuredBrands/durian.avif'
import brandFabindia from '@/assets/images/categories/furniture/featuredBrands/fabindia.avif'
import brandFendiCasa from '@/assets/images/categories/furniture/featuredBrands/fendi-casa.jpg'
import brandGodrejInterio from '@/assets/images/categories/furniture/featuredBrands/godrej-interio.webp'
import brandHausLuxuriant from '@/assets/images/categories/furniture/featuredBrands/haus-luxuriant.jpg'
import brandHermanMiller from '@/assets/images/categories/furniture/featuredBrands/herman-millar.jpg'
import brandIkea from '@/assets/images/categories/furniture/featuredBrands/Ikea.webp'
import brandKartell from '@/assets/images/categories/furniture/featuredBrands/kartell.jpg'
import brandNilkamal from '@/assets/images/categories/furniture/featuredBrands/Nilkamal.webp'
import brandPepperfry from '@/assets/images/categories/furniture/featuredBrands/pepperfry.jpg'
import brandRocheBobois from '@/assets/images/categories/furniture/featuredBrands/roche bobois.jpg'
import brandSteelcase from '@/assets/images/categories/furniture/featuredBrands/steelcase.jpg'
import brandUrbanLadder from '@/assets/images/categories/furniture/featuredBrands/Urban-ladder.webp'
import brandWakefit from '@/assets/images/categories/furniture/featuredBrands/wakefit.jpg'
import brandWoodenStreet from '@/assets/images/categories/furniture/featuredBrands/wooden-furniture.jpg'

// --- Two Wheelers: locally-hosted images, same per-section folder pattern as furniture.
import twBannerScooterSale from '@/assets/images/categories/twoWheelers/banners/scooter-sale.webp'
import twBannerCruiserCollection from '@/assets/images/categories/twoWheelers/banners/cruiser-collection.webp'

import twSliderSportsBikes from '@/assets/images/categories/twoWheelers/slider/sports bikes.jpg'
import twSliderCruisers from '@/assets/images/categories/twoWheelers/slider/cruisers.avif'
import twSliderAdventureBikes from '@/assets/images/categories/twoWheelers/slider/adventure bikes.webp'
import twSliderElectricScooters from '@/assets/images/categories/twoWheelers/slider/electric scooters.avif'
import twSliderFuelEfficient from '@/assets/images/categories/twoWheelers/slider/fuel efficient.avif'

import twSbcSportsBikes from '@/assets/images/categories/twoWheelers/shopByCategory/sports-bikes.jpg'
import twSbcCruiserBikes from '@/assets/images/categories/twoWheelers/shopByCategory/cruiser.jpg'
import twSbcAdventureBikes from '@/assets/images/categories/twoWheelers/shopByCategory/adventure.jpg'
import twSbcCommuterBikes from '@/assets/images/categories/twoWheelers/shopByCategory/commuter-bikes.webp'
import twSbcElectricScooters from '@/assets/images/categories/twoWheelers/shopByCategory/elctric-scooters.jpg'
import twSbcScooters from '@/assets/images/categories/twoWheelers/shopByCategory/scooters.png'
import twSbcMopeds from '@/assets/images/categories/twoWheelers/shopByCategory/mopeds.avif'
import twSbcOffRoadBikes from '@/assets/images/categories/twoWheelers/shopByCategory/off road.jpg'
import twSbcCafeRacers from '@/assets/images/categories/twoWheelers/shopByCategory/cafe-racers.jpg'
import twSbcElectricBikes from '@/assets/images/categories/twoWheelers/shopByCategory/electric-bikes.avif'
import twSbcTouringBikes from '@/assets/images/categories/twoWheelers/shopByCategory/touring-bikes.jpg'
import twSbcNakedBikes from '@/assets/images/categories/twoWheelers/shopByCategory/naked-bikes.jpg'
import twSbcRetroClassicBikes from '@/assets/images/categories/twoWheelers/shopByCategory/retro-classic.jpg'
import twSbcSportsScooters from '@/assets/images/categories/twoWheelers/shopByCategory/sports-scooters.jpg'
import twSbcKidsBikes from '@/assets/images/categories/twoWheelers/shopByCategory/kids-bike.jpg'

import twSpotlightSportsBikes from '@/assets/images/categories/twoWheelers/newLaunches/sports-bikes.jpg'
import twSpotlightCruiserBikes from '@/assets/images/categories/twoWheelers/newLaunches/cruiser.jpg'
import twSpotlightAdventureBikes from '@/assets/images/categories/twoWheelers/newLaunches/adventure.jpg'
import twSpotlightCommuterBikes from '@/assets/images/categories/twoWheelers/newLaunches/commuter.jpg'
import twSpotlightElectricScooters from '@/assets/images/categories/twoWheelers/newLaunches/electric-scooters.jpg'
import twSpotlightScooters from '@/assets/images/categories/twoWheelers/newLaunches/scooters.jpg'
import twSpotlightMopeds from '@/assets/images/categories/twoWheelers/newLaunches/mopeds.jpg'
import twSpotlightOffRoadBikes from '@/assets/images/categories/twoWheelers/newLaunches/off-road.jpg'
import twSpotlightCafeRacers from '@/assets/images/categories/twoWheelers/newLaunches/cafe-racers.jpg'
import twSpotlightElectricBikes from '@/assets/images/categories/twoWheelers/newLaunches/electric-bikes.jpg'
import twSpotlightTouringBikes from '@/assets/images/categories/twoWheelers/newLaunches/touring.jpg'
import twSpotlightNakedBikes from '@/assets/images/categories/twoWheelers/newLaunches/naked.jpg'
import twSpotlightRetroClassicBikes from '@/assets/images/categories/twoWheelers/newLaunches/retro.jpg'
import twSpotlightSportsScooters from '@/assets/images/categories/twoWheelers/newLaunches/sports.jpg'
import twSpotlightKidsBikes from '@/assets/images/categories/twoWheelers/newLaunches/kids.jpg'

import twBrandHeroSplendor from '@/assets/images/categories/twoWheelers/featuredBrands/hero splender.avif'
import twBrandRoyalEnfieldHunter from '@/assets/images/categories/twoWheelers/featuredBrands/royal enfield.avif'
import twBrandBajajPulsar from '@/assets/images/categories/twoWheelers/featuredBrands/bajaj.avif'
import twBrandTvsApache from '@/assets/images/categories/twoWheelers/featuredBrands/tvs apache.avif'
import twBrandHondaActiva from '@/assets/images/categories/twoWheelers/featuredBrands/honda activa.jpg'
import twBrandYamahaFz from '@/assets/images/categories/twoWheelers/featuredBrands/yamaha-fz.jpg'
import twBrandKtmDuke from '@/assets/images/categories/twoWheelers/featuredBrands/ktm.jpg'
import twBrandSuzukiAccess from '@/assets/images/categories/twoWheelers/featuredBrands/suzuki.jpg'
import twBrandHeroGlamour from '@/assets/images/categories/twoWheelers/featuredBrands/hero-glamour.jpg'
import twBrandBajajAvenger from '@/assets/images/categories/twoWheelers/featuredBrands/bajaj-avenger.jpg'
import twBrandRoyalEnfieldClassic from '@/assets/images/categories/twoWheelers/featuredBrands/royal-enfield-classic.jpg'
import twBrandTvsNtorq from '@/assets/images/categories/twoWheelers/featuredBrands/tvs ntorque.webp'
import twBrandHondaShine from '@/assets/images/categories/twoWheelers/featuredBrands/honda-shine.jpg'
import twBrandYamahaR15 from '@/assets/images/categories/twoWheelers/featuredBrands/yamaha-r15.jpg'
import twBrandSuzukiGixxer from '@/assets/images/categories/twoWheelers/featuredBrands/suzuki-gixxer.jpg'

import twDealsHunter350 from '@/assets/images/categories/twoWheelers/riderDeals/hunter 350.webp'
import twDealsTvsIqube from '@/assets/images/categories/twoWheelers/riderDeals/tvs iQube.jpg'
import twDealsBajajAvenger from '@/assets/images/categories/twoWheelers/riderDeals/bajaj avenger.jpg'
import twDealsHondaActiva from '@/assets/images/categories/twoWheelers/riderDeals/honda activa.png'
import twDealsYamahaFz from '@/assets/images/categories/twoWheelers/riderDeals/yamaha-fz.jpg'
import twDealsKtmDuke390 from '@/assets/images/categories/twoWheelers/riderDeals/ktm-duke-390.jpg'

// --- Toys & Games: locally-hosted images, same per-section folder pattern.
import toysBannerBoardGames from '@/assets/images/categories/toysAndGames/banners/boardgames.webp'
import toysBannerToysSale from '@/assets/images/categories/toysAndGames/banners/toys-sale.png'

import toysSliderOne from '@/assets/images/categories/toysAndGames/slider/slider1.webp'
import toysSliderTwo from '@/assets/images/categories/toysAndGames//slider/slider2.jpg'
import toysSliderThree from '@/assets/images/categories/toysAndGames/slider/slider3.webp'
import toysSliderFour from '@/assets/images/categories/toysAndGames/slider/slider4.jpg'
import toysSliderFive from '@/assets/images/categories/toysAndGames/slider/slider5.jpg'

import toysSbcAction from '@/assets/images/categories/toysAndGames/shopByCategory/action.webp'
import toysSbcArtCraft from '@/assets/images/categories/toysAndGames/shopByCategory/art-and-craft.jpg'
import toysSbcBoardGames from '@/assets/images/categories/toysAndGames/shopByCategory/board-games.jpg'
import toysSbcBuildingBlocks from '@/assets/images/categories/toysAndGames/shopByCategory/building-blocks.jpg'
import toysSbcCardGames from '@/assets/images/categories/toysAndGames/shopByCategory/card-games.jpg'
import toysSbcDolls from '@/assets/images/categories/toysAndGames/shopByCategory/dolls.webp'
import toysSbcEducational from '@/assets/images/categories/toysAndGames/shopByCategory/educational.avif'
import toysSbcMusicalToys from '@/assets/images/categories/toysAndGames/shopByCategory/musical-toys.jpg'
import toysSbcOutdoorGames from '@/assets/images/categories/toysAndGames/shopByCategory/outdoor-games.webp'
import toysSbcPlayDoh from '@/assets/images/categories/toysAndGames/shopByCategory/play-doh.jpg'
import toysSbcPuzzles from '@/assets/images/categories/toysAndGames/shopByCategory/puzzles.jpg'
import toysSbcRcCars from '@/assets/images/categories/toysAndGames/shopByCategory/rc-cars.jpg'
import toysSbcRideOns from '@/assets/images/categories/toysAndGames/shopByCategory/ride-ons.jpg'
import toysSbcScienceKit from '@/assets/images/categories/toysAndGames/shopByCategory/science kit.jpg'
import toysSbcSoftToys from '@/assets/images/categories/toysAndGames/shopByCategory/soft-toys.jpg'

import toysSpotlightAction from '@/assets/images/categories/toysAndGames/newArrivals/action.jpg'
import toysSpotlightArtsAndCrafts from '@/assets/images/categories/toysAndGames/newArrivals/artsAndCrafts.jpg'
import toysSpotlightBoardGames from '@/assets/images/categories/toysAndGames/newArrivals/board-games.jpg'
import toysSpotlightBuildingBlocks from '@/assets/images/categories/toysAndGames/newArrivals/buildingBlocks.jpg'
import toysSpotlightCard from '@/assets/images/categories/toysAndGames/newArrivals/card.jpg'
import toysSpotlightDolls from '@/assets/images/categories/toysAndGames/newArrivals/dolls.jpg'
import toysSpotlightEducational from '@/assets/images/categories/toysAndGames/newArrivals/educational.jpg'
import toysSpotlightMusical from '@/assets/images/categories/toysAndGames/newArrivals/musical.jpg'
import toysSpotlightOutdoor from '@/assets/images/categories/toysAndGames/newArrivals/outdoor.jpg'
import toysSpotlightPlaydoh from '@/assets/images/categories/toysAndGames/newArrivals/playdoh.webp'
import toysSpotlightPuzzles from '@/assets/images/categories/toysAndGames/newArrivals/puzzles.jpg'
import toysSpotlightRC from '@/assets/images/categories/toysAndGames/newArrivals/RC.jpg'
import toysSpotlightRideOns from '@/assets/images/categories/toysAndGames/newArrivals/ride-ons.jpg'
import toysSpotlightScienceKit from '@/assets/images/categories/toysAndGames/newArrivals/science-kit.jpg'
import toysSpotlightSoftToys from '@/assets/images/categories/toysAndGames/newArrivals/soft toys.jpg'

import toysBrandBarbie from '@/assets/images/categories/toysAndGames/featuredBrands/barbie.jpg'
import toysBrandChicco from '@/assets/images/categories/toysAndGames/featuredBrands/chicco.jpg'
import toysBrandCrayola from '@/assets/images/categories/toysAndGames/featuredBrands/crayola.jpg'
import toysBrandDisney from '@/assets/images/categories/toysAndGames/featuredBrands/disney.jpg'
import toysBrandFisherPrice from '@/assets/images/categories/toysAndGames/featuredBrands/fisher-price.jpg'
import toysBrandFunskool from '@/assets/images/categories/toysAndGames/featuredBrands/funskool.png'
import toysBrandHamleys from '@/assets/images/categories/toysAndGames/featuredBrands/hamleys.avif'
import toysBrandHasbro from '@/assets/images/categories/toysAndGames/featuredBrands/hasbro.jpg'
import toysBrandHotWheels from '@/assets/images/categories/toysAndGames/featuredBrands/hot-wheels.jpg'
import toysBrandLego from '@/assets/images/categories/toysAndGames/featuredBrands/lego.jpg'
import toysBrandMattel from '@/assets/images/categories/toysAndGames/featuredBrands/mattel.jpg'
import toysBrandMonopoly from '@/assets/images/categories/toysAndGames/featuredBrands/monopoly.jpg'
import toysBrandNerf from '@/assets/images/categories/toysAndGames/featuredBrands/nerf.jpg'
import toysBrandPlaydoh from '@/assets/images/categories/toysAndGames/featuredBrands/playdoh.jpg'
import toysBrandVtech from '@/assets/images/categories/toysAndGames/featuredBrands/vtech.jpg'

import toysDeals500Pieces from '@/assets/images/categories/toysAndGames/playtimeDeals/500pieces.jpg'
import toysDealsFamily from '@/assets/images/categories/toysAndGames/playtimeDeals/family.jpg'
import toysDealsArtCraft from '@/assets/images/categories/toysAndGames/playtimeDeals/kids-art-and-craft.jpg'
import toysDealsOffRoad from '@/assets/images/categories/toysAndGames/playtimeDeals/off-road.jpg'
import toysDealsPlush from '@/assets/images/categories/toysAndGames/playtimeDeals/plush.webp'
import toysDealsSuperhero from '@/assets/images/categories/toysAndGames/playtimeDeals/superhero.jpg'

// --- Sports & Outdoors: locally-hosted images, same per-section folder pattern.
import sportsBannerOne from '@/assets/images/categories/sportsAndOutdoors/banners/banner1.webp'
import sportsBannerTwo from '@/assets/images/categories/sportsAndOutdoors/banners/banner2.webp'

import sportsSliderOne from '@/assets/images/categories/sportsAndOutdoors/slider/slider1.webp'
import sportsSliderTwo from '@/assets/images/categories/sportsAndOutdoors/slider/slider2.jpg'
import sportsSliderThree from '@/assets/images/categories/sportsAndOutdoors/slider/slider3.jpg'
import sportsSliderFour from '@/assets/images/categories/sportsAndOutdoors/slider/slider4.jpg'
import sportsSliderFive from '@/assets/images/categories/sportsAndOutdoors/slider/slider5.webp'

import sportsSbcBadminton from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/badminton1.jpg'
import sportsSbcBasketball from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/basketball1.jpg'
import sportsSbcCamping from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/camping1.jpg'
import sportsSbcCricket from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/cricket1.jpg'
import sportsSbcCycling from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/cycling1.jpg'
import sportsSbcFishing from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/fishing1.jpg'
import sportsSbcFootball from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/football1.jpg'
import sportsSbcHockey from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/hockey1.jpg'
import sportsSbcSkating from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/skating1.jpg'
import sportsSbcSkiing from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/skiing1.jpg'
import sportsSbcSwimming from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/swimming1.jpg'
import sportsSbcTableTennis from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/table-tennis1.jpg'
import sportsSbcTennis from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/tennis1.jpg'
import sportsSbcTrekking from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/trekking1.jpg'
import sportsSbcVolleyball from '@/assets/images/categories/sportsAndOutdoors/shopByCategory/volleyball1.jpg'

import sportsSpotlightBadminton from '@/assets/images/categories/sportsAndOutdoors/championsChoice/badminton2.jpg'
import sportsSpotlightBasketball from '@/assets/images/categories/sportsAndOutdoors/championsChoice/basketball2.jpg'
import sportsSpotlightCamping from '@/assets/images/categories/sportsAndOutdoors/championsChoice/camping2.jpg'
import sportsSpotlightCricket from '@/assets/images/categories/sportsAndOutdoors/championsChoice/cricket2.jpg'
import sportsSpotlightCycling from '@/assets/images/categories/sportsAndOutdoors/championsChoice/cycling2.jpg'
import sportsSpotlightFishing from '@/assets/images/categories/sportsAndOutdoors/championsChoice/fishing2.jpg'
import sportsSpotlightFootball from '@/assets/images/categories/sportsAndOutdoors/championsChoice/football2.jpg'
import sportsSpotlightHockey from '@/assets/images/categories/sportsAndOutdoors/championsChoice/hockey2.jpg'
import sportsSpotlightSkating from '@/assets/images/categories/sportsAndOutdoors/championsChoice/skating2.webp'
import sportsSpotlightSkiing from '@/assets/images/categories/sportsAndOutdoors/championsChoice/skiing2.jpg'
import sportsSpotlightSwimming from '@/assets/images/categories/sportsAndOutdoors/championsChoice/swimming2.webp'
import sportsSpotlightTableTennis from '@/assets/images/categories/sportsAndOutdoors/championsChoice/table-tennis2.webp'
import sportsSpotlightTennis from '@/assets/images/categories/sportsAndOutdoors/championsChoice/tennis2.webp'
import sportsSpotlightTrekking from '@/assets/images/categories/sportsAndOutdoors/championsChoice/trekking2.jpg'
import sportsSpotlightVolleyball from '@/assets/images/categories/sportsAndOutdoors/championsChoice/volleyball2.jpg'

import sportsBrandDunlop from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/dunlop.jpg'
import sportsBrandForclaz from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/forclaz.jpg'
import sportsBrandHead from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/head.jpg'
import sportsBrandKookaburra from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/kookaburra.jpg'
import sportsBrandLiNing from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/li-ning.jpg'
import sportsBrandMolten from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/molten.jpg'
import sportsBrandMrf from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/mrf.jpg'
import sportsBrandNivia from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/nivia.jpg'
import sportsBrandNorthFace from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/north-face.jpg'
import sportsBrandQuechua from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/quechua.jpg'
import sportsBrandRival from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/rival.jpg'
import sportsBrandSg from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/sg.webp'
import sportsBrandSpalding from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/spalding.webp'
import sportsBrandWildcraft from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/wildcraft.jpg'
import sportsBrandYonex from '@/assets/images/categories/sportsAndOutdoors/FeaturedBrands/yonex.jpg'

import sportsDealsBadminton from '@/assets/images/categories/sportsAndOutdoors/GameDayDeals/badminton.webp'
import sportsDealsBasketball from '@/assets/images/categories/sportsAndOutdoors/GameDayDeals/basketball.jpg'
import sportsDealsCampingTent from '@/assets/images/categories/sportsAndOutdoors/GameDayDeals/camping-tent.webp'
import sportsDealsHelmet from '@/assets/images/categories/sportsAndOutdoors/GameDayDeals/helmet.jpg'
import sportsDealsFootball from '@/assets/images/categories/sportsAndOutdoors/GameDayDeals/official-football.png'
import sportsDealsCricketKit from '@/assets/images/categories/sportsAndOutdoors/GameDayDeals/professional-cricket-kit.jpg'

// --- Office: locally-hosted images, same per-section folder pattern.
import officeBannerOne from '@/assets/images/categories/office/banners/banner1.webp'
import officeBannerTwo from '@/assets/images/categories/office/banners/banner2.webp'

import officeSliderOne from '@/assets/images/categories/office/slider/slider1.webp'
import officeSliderTwo from '@/assets/images/categories/office/slider/slider2.webp'
import officeSliderThree from '@/assets/images/categories/office/slider/slider3.avif'
import officeSliderFour from '@/assets/images/categories/office/slider/slider4.jpg'
import officeSliderFive from '@/assets/images/categories/office/slider/slider5.jpg'

import officeSbcErgonomic from '@/assets/images/categories/office/shopByCategory/ergonomic1.webp'
import officeSbcExecutive from '@/assets/images/categories/office/shopByCategory/executive1.jpg'
import officeSbcDesk from '@/assets/images/categories/office/shopByCategory/desk1.jpg'
import officeSbcStanding from '@/assets/images/categories/office/shopByCategory/standing1.jpg'
import officeSbcFiling from '@/assets/images/categories/office/shopByCategory/filing1.jpg'
import officeSbcBookshelves from '@/assets/images/categories/office/shopByCategory/bookshelves1.jpg'
import officeSbcWhiteboard from '@/assets/images/categories/office/shopByCategory/white1.jpg'
import officeSbcOffice from '@/assets/images/categories/office/shopByCategory/office1.jpg'
import officeSbcMonitor from '@/assets/images/categories/office/shopByCategory/monitor1.jpg'
import officeSbcLaptop from '@/assets/images/categories/office/shopByCategory/laptop1.jpg'
import officeSbcFootrests from '@/assets/images/categories/office/shopByCategory/footrests1.jpg'
import officeSbcLamps from '@/assets/images/categories/office/shopByCategory/lamps1.jpg'
import officeSbcCable from '@/assets/images/categories/office/shopByCategory/cable1.jpg'
import officeSbcPen from '@/assets/images/categories/office/shopByCategory/pen1.jpg'
import officeSbcTrays from '@/assets/images/categories/office/shopByCategory/trays1.jpg'

import officeSpotlightErgonomic from '@/assets/images/categories/office/workspaceUpgrade/ergonomic2.jpg'
import officeSpotlightExecutive from '@/assets/images/categories/office/workspaceUpgrade/executive2.jpg'
import officeSpotlightDesk from '@/assets/images/categories/office/workspaceUpgrade/desk2.jpg'
import officeSpotlightStanding from '@/assets/images/categories/office/workspaceUpgrade/standing2.jpg'
import officeSpotlightFiling from '@/assets/images/categories/office/workspaceUpgrade/filing2.jpg'
import officeSpotlightBookshelves from '@/assets/images/categories/office/workspaceUpgrade/bookshelves2.jpg'
import officeSpotlightWhiteboard from '@/assets/images/categories/office/workspaceUpgrade/white2.jpg'
import officeSpotlightOffice from '@/assets/images/categories/office/workspaceUpgrade/office2.jpg'
import officeSpotlightMonitor from '@/assets/images/categories/office/workspaceUpgrade/monitor2.jpg'
import officeSpotlightLaptop from '@/assets/images/categories/office/workspaceUpgrade/laptop2.jpg'
import officeSpotlightFootrests from '@/assets/images/categories/office/workspaceUpgrade/footrests2.jpg'
import officeSpotlightLamps from '@/assets/images/categories/office/workspaceUpgrade/lamps2.jpg'
import officeSpotlightCable from '@/assets/images/categories/office/workspaceUpgrade/cable2.jpg'
import officeSpotlightPen from '@/assets/images/categories/office/workspaceUpgrade/pen2.jpg'
import officeSpotlightTrays from '@/assets/images/categories/office/workspaceUpgrade/trays2.jpg'

import officeBrandAdarsh from '@/assets/images/categories/office/featuredBrands/adarsh.jpg'
import officeBrandBantex from '@/assets/images/categories/office/featuredBrands/bantex.jpg'
import officeBrandBluebell from '@/assets/images/categories/office/featuredBrands/bluebell.jpg'
import officeBrandDeli from '@/assets/images/categories/office/featuredBrands/deli.jpg'
import officeBrandDurian from '@/assets/images/categories/office/featuredBrands/durian.jpg'
import officeBrandFeatherlite from '@/assets/images/categories/office/featuredBrands/featherlite.jpg'
import officeBrandFellowes from '@/assets/images/categories/office/featuredBrands/fellowes.jpg'
import officeBrandGodrej from '@/assets/images/categories/office/featuredBrands/godrej.jpg'
import officeBrandNilkamalStorage from '@/assets/images/categories/office/featuredBrands/nilkamal-storage.jpg'
import officeBrandNilkamal from '@/assets/images/categories/office/featuredBrands/nilkamal.jpg'
import officeBrandSolo from '@/assets/images/categories/office/featuredBrands/solo.jpg'
import officeBrandSpacewood from '@/assets/images/categories/office/featuredBrands/spacewood.jpg'
import officeBrandSteelcase from '@/assets/images/categories/office/featuredBrands/steelcase.webp'
import officeBrandSundaram from '@/assets/images/categories/office/featuredBrands/sundaram.jpg'
import officeBrandVj from '@/assets/images/categories/office/featuredBrands/vj.jpg'

import officeDealsAdjustable from '@/assets/images/categories/office/workspaceDeals/adjustable.jpg'
import officeDealsCableManagement from '@/assets/images/categories/office/workspaceDeals/cable-management.webp'
import officeDealsErgonomic from '@/assets/images/categories/office/workspaceDeals/ergonomic.jpg'
import officeDealsLedDesk from '@/assets/images/categories/office/workspaceDeals/led-desk.jpg'
import officeDealsWhiteboard from '@/assets/images/categories/office/workspaceDeals/whiteboard.jpg'
import officeDealsWirelessKm from '@/assets/images/categories/office/workspaceDeals/wireless-km.jpg'

// --- Mobiles: locally-hosted images, same per-section folder pattern.
import mobilesBannerOne from '@/assets/images/categories/mobiles/banners/banner1.jpg'
import mobilesBannerTwo from '@/assets/images/categories/mobiles/banners/banner2.jpeg'

import mobilesSliderOne from '@/assets/images/categories/mobiles/slider/slider1.webp'
import mobilesSliderTwo from '@/assets/images/categories/mobiles/slider/slider2.webp'
import mobilesSliderThree from '@/assets/images/categories/mobiles/slider/slider3.webp'
import mobilesSliderFour from '@/assets/images/categories/mobiles/slider/slider4.jpg'
import mobilesSliderFive from '@/assets/images/categories/mobiles/slider/slider5.jpg'

import mobilesSbcIphone from '@/assets/images/categories/mobiles/shopByCategory/iphone1.avif'
import mobilesSbcGalaxy from '@/assets/images/categories/mobiles/shopByCategory/galaxy1.jpg'
import mobilesSbcOppo from '@/assets/images/categories/mobiles/shopByCategory/oppo.jpg'
import mobilesSbcPoco from '@/assets/images/categories/mobiles/shopByCategory/poco1.jpg'
import mobilesSbcRedmi from '@/assets/images/categories/mobiles/shopByCategory/redmi1.jpg'
import mobilesSbcInfinix from '@/assets/images/categories/mobiles/shopByCategory/infinix1.jpg'
import mobilesSbcNothing from '@/assets/images/categories/mobiles/shopByCategory/nothing1.jpg'
import mobilesSbcPixel from '@/assets/images/categories/mobiles/shopByCategory/pixel1.jpg'
import mobilesSbcOneplus from '@/assets/images/categories/mobiles/shopByCategory/oneplus1.jpg'
import mobilesSbcVivo from '@/assets/images/categories/mobiles/shopByCategory/vivo1.jpg'
import mobilesSbcRealme from '@/assets/images/categories/mobiles/shopByCategory/realme1.jpg'
import mobilesSbcPhoneCases from '@/assets/images/categories/mobiles/shopByCategory/phonecase1.jpg'
import mobilesSbcChargers from '@/assets/images/categories/mobiles/shopByCategory/chargers1.jpg'
import mobilesSbcEarphones from '@/assets/images/categories/mobiles/shopByCategory/earphones1.jpg'
import mobilesSbcScreenGuards from '@/assets/images/categories/mobiles/shopByCategory/screen-guards1.jpg'

import mobilesSpotlightIphone from '@/assets/images/categories/mobiles/newLaunches/iphone2.jpg'
import mobilesSpotlightGalaxy from '@/assets/images/categories/mobiles/newLaunches/galaxy2.jpg'
import mobilesSpotlightOppo from '@/assets/images/categories/mobiles/newLaunches/oppo2.jpg'
import mobilesSpotlightPoco from '@/assets/images/categories/mobiles/newLaunches/poco2.jpg'
import mobilesSpotlightRedmi from '@/assets/images/categories/mobiles/newLaunches/redmi2.jpg'
import mobilesSpotlightInfinix from '@/assets/images/categories/mobiles/newLaunches/infinix2.jpg'
import mobilesSpotlightNothing from '@/assets/images/categories/mobiles/newLaunches/nothing2.jpg'
import mobilesSpotlightPixel from '@/assets/images/categories/mobiles/newLaunches/pixel2.jpg'
import mobilesSpotlightOneplus from '@/assets/images/categories/mobiles/newLaunches/oneplus2.jpg'
import mobilesSpotlightVivo from '@/assets/images/categories/mobiles/newLaunches/vivo2.jpg'
import mobilesSpotlightRealme from '@/assets/images/categories/mobiles/newLaunches/realme2.jpg'
import mobilesSpotlightPhoneCases from '@/assets/images/categories/mobiles/newLaunches/phonecase2.jpg'
import mobilesSpotlightChargers from '@/assets/images/categories/mobiles/newLaunches/chargers2.jpg'
import mobilesSpotlightEarphones from '@/assets/images/categories/mobiles/newLaunches/earphones2.jpg'
import mobilesSpotlightScreenGuards from '@/assets/images/categories/mobiles/newLaunches/screen-guards2.jpg'

import mobilesBrandIphone from '@/assets/images/categories/mobiles/featuredBrands/iphone.jpg'
import mobilesBrandGalaxy from '@/assets/images/categories/mobiles/featuredBrands/galaxy.webp'
import mobilesBrandOppo from '@/assets/images/categories/mobiles/featuredBrands/oppo.jpg'
import mobilesBrandPoco from '@/assets/images/categories/mobiles/featuredBrands/poco.jpg'
import mobilesBrandRedmi from '@/assets/images/categories/mobiles/featuredBrands/redmi.jpg'
import mobilesBrandInfinix from '@/assets/images/categories/mobiles/featuredBrands/infinix.jpg'
import mobilesBrandNothing from '@/assets/images/categories/mobiles/featuredBrands/nothing.jpg'
import mobilesBrandPixel from '@/assets/images/categories/mobiles/featuredBrands/pixel.jpg'
import mobilesBrandOneplus from '@/assets/images/categories/mobiles/featuredBrands/oneplus.jpg'
import mobilesBrandVivo from '@/assets/images/categories/mobiles/featuredBrands/vivo.jpg'
import mobilesBrandRealme from '@/assets/images/categories/mobiles/featuredBrands/realme.jpg'
import mobilesBrandMoto from '@/assets/images/categories/mobiles/featuredBrands/moto.jpg'
import mobilesBrandHonor from '@/assets/images/categories/mobiles/featuredBrands/honor.webp'
import mobilesBrandIqoo from '@/assets/images/categories/mobiles/featuredBrands/iqoo.jpg'
import mobilesBrandTecno from '@/assets/images/categories/mobiles/featuredBrands/techno.jpg'

import mobilesDeals128gb from '@/assets/images/categories/mobiles/bestDeals/128gb.jpg'
import mobilesDealsAmoled from '@/assets/images/categories/mobiles/bestDeals/amoled.avif'
import mobilesDealsEarbuds from '@/assets/images/categories/mobiles/bestDeals/earbuds.jpg'
import mobilesDealsPowerBank from '@/assets/images/categories/mobiles/bestDeals/power-bank.jpg'
import mobilesDealsProMax from '@/assets/images/categories/mobiles/bestDeals/pro-max.jpg'
import mobilesDealsScreenGuard from '@/assets/images/categories/mobiles/bestDeals/screen-guard.jpg'

// --- Home & Living: locally-hosted images, same per-section folder pattern.
import homeBannerOne from '@/assets/images/categories/homeandLiving/banners/banner1.webp'
import homeBannerTwo from '@/assets/images/categories/homeandLiving/banners/banner2.webp'

import homeSliderOne from '@/assets/images/categories/homeandLiving/slider/slider1.jpg'
import homeSliderTwo from '@/assets/images/categories/homeandLiving/slider/slider2.jpg'
import homeSliderThree from '@/assets/images/categories/homeandLiving/slider/slider3.jpg'
import homeSliderFour from '@/assets/images/categories/homeandLiving/slider/slider4.png'
import homeSliderFive from '@/assets/images/categories/homeandLiving/slider/slider5.jpg'

import homeSbcCushion from '@/assets/images/categories/homeandLiving/shopByCategory/cushion1.jpg'
import homeSbcVases from '@/assets/images/categories/homeandLiving/shopByCategory/vases1.jpg'
import homeSbcStorage from '@/assets/images/categories/homeandLiving/shopByCategory/storage1.jpg'
import homeSbcLighting from '@/assets/images/categories/homeandLiving/shopByCategory/lighting1.jpg'
import homeSbcWallDecor from '@/assets/images/categories/homeandLiving/shopByCategory/walldecor1.jpg'
import homeSbcRugs from '@/assets/images/categories/homeandLiving/shopByCategory/rugs1.jpg'
import homeSbcCurtains from '@/assets/images/categories/homeandLiving/shopByCategory/curtains1.jpg'
import homeSbcKitchen from '@/assets/images/categories/homeandLiving/shopByCategory/kitchen1.jpg'
import homeSbcBedsheets from '@/assets/images/categories/homeandLiving/shopByCategory/bedsheets1.jpg'
import homeSbcMirror from '@/assets/images/categories/homeandLiving/shopByCategory/mirror1.jpg'
import homeSbcClock from '@/assets/images/categories/homeandLiving/shopByCategory/clock1.jpg'
import homeSbcPlanter from '@/assets/images/categories/homeandLiving/shopByCategory/planter1.jpg'
import homeSbcPhotoframe from '@/assets/images/categories/homeandLiving/shopByCategory/photoframe1.jpg'
import homeSbcDoormats from '@/assets/images/categories/homeandLiving/shopByCategory/doormats1.jpg'
import homeSbcShowerCurtains from '@/assets/images/categories/homeandLiving/shopByCategory/shower-curtains1.jpg'

import homeSpotlightCushion from '@/assets/images/categories/homeandLiving/designerPics/cushion2.jpg'
import homeSpotlightVases from '@/assets/images/categories/homeandLiving/designerPics/vases2.jpg'
import homeSpotlightStorage from '@/assets/images/categories/homeandLiving/designerPics/storage2.jpg'
import homeSpotlightLighting from '@/assets/images/categories/homeandLiving/designerPics/lighting2.jpg'
import homeSpotlightWallDecor from '@/assets/images/categories/homeandLiving/designerPics/walldecor2.jpg'
import homeSpotlightRugs from '@/assets/images/categories/homeandLiving/designerPics/rugs2.jpg'
import homeSpotlightCurtains from '@/assets/images/categories/homeandLiving/designerPics/curtains2.jpg'
import homeSpotlightKitchen from '@/assets/images/categories/homeandLiving/designerPics/kitchen2.jpg'
import homeSpotlightBedsheets from '@/assets/images/categories/homeandLiving/designerPics/bedsheets2.jpg'
import homeSpotlightMirror from '@/assets/images/categories/homeandLiving/designerPics/mirror2.jpg'
import homeSpotlightClock from '@/assets/images/categories/homeandLiving/designerPics/clock2.jpg'
import homeSpotlightPlanter from '@/assets/images/categories/homeandLiving/designerPics/planter2.jpg'
import homeSpotlightPhotoframe from '@/assets/images/categories/homeandLiving/designerPics/photoframe2.jpg'
import homeSpotlightDoormats from '@/assets/images/categories/homeandLiving/designerPics/doormats2.jpg'
import homeSpotlightShowerCurtains from '@/assets/images/categories/homeandLiving/designerPics/shower-curtains2.jpg'

import homeBrandIkea from '@/assets/images/categories/homeandLiving/featuredBrands/ikea.jpg'
import homeBrandUrbanLadder from '@/assets/images/categories/homeandLiving/featuredBrands/urban-ladder.jpg'
import homeBrandPepperfry from '@/assets/images/categories/homeandLiving/featuredBrands/pepperfry.webp'
import homeBrandHomeCentre from '@/assets/images/categories/homeandLiving/featuredBrands/homecentre.jpg'
import homeBrandFabindia from '@/assets/images/categories/homeandLiving/featuredBrands/fabindia.webp'
import homeBrandBombay from '@/assets/images/categories/homeandLiving/featuredBrands/bombay.jpg'
import homeBrandSpaces from '@/assets/images/categories/homeandLiving/featuredBrands/spaces.jpg'
import homeBrandPortico from '@/assets/images/categories/homeandLiving/featuredBrands/portico.jpg'
import homeBrandWakefit from '@/assets/images/categories/homeandLiving/featuredBrands/wakefit.avif'
import homeBrandChumbak from '@/assets/images/categories/homeandLiving/featuredBrands/chumbak.jpg'
import homeBrandCraft from '@/assets/images/categories/homeandLiving/featuredBrands/craft.jpg'
import homeBrandDecor from '@/assets/images/categories/homeandLiving/featuredBrands/decor.jpg'
import homeBrandPhilips from '@/assets/images/categories/homeandLiving/featuredBrands/philips.avif'
import homeBrandSaral from '@/assets/images/categories/homeandLiving/featuredBrands/saral.jpg'
import homeBrandVenus from '@/assets/images/categories/homeandLiving/featuredBrands/venus.jpg'

import homeDealsCushion from '@/assets/images/categories/homeandLiving/homeRefreshDeals/cushion.jpg'
import homeDealsCeramic from '@/assets/images/categories/homeandLiving/homeRefreshDeals/ceramic.jpg'
import homeDealsUnderbed from '@/assets/images/categories/homeandLiving/homeRefreshDeals/underbed.jpg'
import homeDealsLight from '@/assets/images/categories/homeandLiving/homeRefreshDeals/light.webp'
import homeDealsHandwoven from '@/assets/images/categories/homeandLiving/homeRefreshDeals/handwoven.webp'
import homeDealsBedsheet from '@/assets/images/categories/homeandLiving/homeRefreshDeals/bedsheet.webp'

// --- Food & Household: locally-hosted images, same per-section folder pattern.
import foodBannerOne from '@/assets/images/categories/foodAndHousehold/banners/banner1.png'
import foodBannerTwo from '@/assets/images/categories/foodAndHousehold/banners/banner2.png'

import foodSliderOne from '@/assets/images/categories/foodAndHousehold/slider/slider1.jpg'
import foodSliderTwo from '@/assets/images/categories/foodAndHousehold/slider/slider2.webp'
import foodSliderThree from '@/assets/images/categories/foodAndHousehold/slider/slider3.png'
import foodSliderFour from '@/assets/images/categories/foodAndHousehold/slider/slider4.jpg'
import foodSliderFive from '@/assets/images/categories/foodAndHousehold/slider/slider5.png'

import foodSbcSnacks from '@/assets/images/categories/foodAndHousehold/shopByCategory/snacks1.jpg'
import foodSbcBeverages from '@/assets/images/categories/foodAndHousehold/shopByCategory/beverage1.webp'
import foodSbcCleaning from '@/assets/images/categories/foodAndHousehold/shopByCategory/cleaning1.jpg'
import foodSbcToiletries from '@/assets/images/categories/foodAndHousehold/shopByCategory/toiletries.jpg'
import foodSbcBabyCare from '@/assets/images/categories/foodAndHousehold/shopByCategory/babycare1.jpg'
import foodSbcPets from '@/assets/images/categories/foodAndHousehold/shopByCategory/pets1.webp'
import foodSbcKitchen from '@/assets/images/categories/foodAndHousehold/shopByCategory/kitchen1.jpg'
import foodSbcStorage from '@/assets/images/categories/foodAndHousehold/shopByCategory/storage1.jpg'
import foodSbcBreakfast from '@/assets/images/categories/foodAndHousehold/shopByCategory/breakfast1.jpg'
import foodSbcSpices from '@/assets/images/categories/foodAndHousehold/shopByCategory/spices1.webp'
import foodSbcDairy from '@/assets/images/categories/foodAndHousehold/shopByCategory/dairy1.jpg'
import foodSbcLaundry from '@/assets/images/categories/foodAndHousehold/shopByCategory/laundary1.jpg'
import foodSbcPaper from '@/assets/images/categories/foodAndHousehold/shopByCategory/paper1.jpg'
import foodSbcAir from '@/assets/images/categories/foodAndHousehold/shopByCategory/air1.jpg'
import foodSbcDisposable from '@/assets/images/categories/foodAndHousehold/shopByCategory/disposable1.jpg'

import foodSpotlightSnacks from '@/assets/images/categories/foodAndHousehold/everydayPics/snacks2.avif'
import foodSpotlightBeverages from '@/assets/images/categories/foodAndHousehold/everydayPics/beverage2.webp'
import foodSpotlightCleaning from '@/assets/images/categories/foodAndHousehold/everydayPics/cleaning2.jpg'
import foodSpotlightToiletries from '@/assets/images/categories/foodAndHousehold/everydayPics/toiletries2.jpg'
import foodSpotlightBabyCare from '@/assets/images/categories/foodAndHousehold/everydayPics/babycare2.jpg'
import foodSpotlightPets from '@/assets/images/categories/foodAndHousehold/everydayPics/pets2.jpg'
import foodSpotlightKitchen from '@/assets/images/categories/foodAndHousehold/everydayPics/kitchen2.jpg'
import foodSpotlightStorage from '@/assets/images/categories/foodAndHousehold/everydayPics/storage2.jpg'
import foodSpotlightBreakfast from '@/assets/images/categories/foodAndHousehold/everydayPics/breakfast2.jpg'
import foodSpotlightSpices from '@/assets/images/categories/foodAndHousehold/everydayPics/spices2.jpg'
import foodSpotlightDairy from '@/assets/images/categories/foodAndHousehold/everydayPics/dairy2.jpg'
import foodSpotlightLaundry from '@/assets/images/categories/foodAndHousehold/everydayPics/laundary2.webp'
import foodSpotlightPaper from '@/assets/images/categories/foodAndHousehold/everydayPics/paper2.jpg'
import foodSpotlightAir from '@/assets/images/categories/foodAndHousehold/everydayPics/air2.jpg'
import foodSpotlightDisposable from '@/assets/images/categories/foodAndHousehold/everydayPics/disposable2.jpg'

import foodBrandNestle from '@/assets/images/categories/foodAndHousehold/featuredBrands/nestle.png'
import foodBrandTata from '@/assets/images/categories/foodAndHousehold/featuredBrands/tata.webp'
import foodBrandItc from '@/assets/images/categories/foodAndHousehold/featuredBrands/itc.jpg'
import foodBrandAmul from '@/assets/images/categories/foodAndHousehold/featuredBrands/amul.jpg'
import foodBrandBritannia from '@/assets/images/categories/foodAndHousehold/featuredBrands/britannia.jpg'
import foodBrandColgate from '@/assets/images/categories/foodAndHousehold/featuredBrands/colgate.jpg'
import foodBrandDettol from '@/assets/images/categories/foodAndHousehold/featuredBrands/dettol.avif'
import foodBrandSurfExcel from '@/assets/images/categories/foodAndHousehold/featuredBrands/surfexcel.jpg'
import foodBrandVim from '@/assets/images/categories/foodAndHousehold/featuredBrands/vim.webp'
import foodBrandHarpic from '@/assets/images/categories/foodAndHousehold/featuredBrands/harpic.jpg'
import foodBrandLizol from '@/assets/images/categories/foodAndHousehold/featuredBrands/lizol.jpg'
import foodBrandParle from '@/assets/images/categories/foodAndHousehold/featuredBrands/parle.jpg'
import foodBrandHaldiram from '@/assets/images/categories/foodAndHousehold/featuredBrands/haldiram.jpg'
import foodBrandPatanjali from '@/assets/images/categories/foodAndHousehold/featuredBrands/patanjali.jpg'
import foodBrandFortune from '@/assets/images/categories/foodAndHousehold/featuredBrands/fortune.jpg'

import foodDealsSnacks from '@/assets/images/categories/foodAndHousehold/pantryDeals/snacks.jpg'
import foodDealsCleaner from '@/assets/images/categories/foodAndHousehold/pantryDeals/cleaner.webp'
import foodDealsHerbal from '@/assets/images/categories/foodAndHousehold/pantryDeals/herbal.jpg'
import foodDealsBabyCare from '@/assets/images/categories/foodAndHousehold/pantryDeals/babycare.jpg'
import foodDealsBasmati from '@/assets/images/categories/foodAndHousehold/pantryDeals/basmati.jpg'
import foodDealsDishwashing from '@/assets/images/categories/foodAndHousehold/pantryDeals/dishwashing.jpg'

// --- Fitness: locally-hosted images, same per-section folder pattern.
import fitnessBannerOne from '@/assets/images/categories/fitness/banners/banner1.jpg'
import fitnessBannerTwo from '@/assets/images/categories/fitness/banners/banner2.jpg'

import fitnessSliderOne from '@/assets/images/categories/fitness/slider/slider1.avif'
import fitnessSliderTwo from '@/assets/images/categories/fitness/slider/slider2.jpg'
import fitnessSliderThree from '@/assets/images/categories/fitness/slider/slider3.jpg'
import fitnessSliderFour from '@/assets/images/categories/fitness/slider/slider4.jpg'
import fitnessSliderFive from '@/assets/images/categories/fitness/slider/slider5.jpg'

import fitnessSbcWaterBottle from '@/assets/images/categories/fitness/shopByCategory/water-bottle1.jpg'
import fitnessSbcYogaMats from '@/assets/images/categories/fitness/shopByCategory/yoga-mats1.jpg'
import fitnessSbcBands from '@/assets/images/categories/fitness/shopByCategory/bands1.jpg'
import fitnessSbcDumbbells from '@/assets/images/categories/fitness/shopByCategory/dumbbells1.jpg'
import fitnessSbcRollers from '@/assets/images/categories/fitness/shopByCategory/rollers1.jpg'
import fitnessSbcGymbags from '@/assets/images/categories/fitness/shopByCategory/gymbags1.webp'
import fitnessSbcRopes from '@/assets/images/categories/fitness/shopByCategory/ropes1.webp'
import fitnessSbcTrackers from '@/assets/images/categories/fitness/shopByCategory/trackers1.jpg'
import fitnessSbcTreadmills from '@/assets/images/categories/fitness/shopByCategory/treadmills1.jpg'
import fitnessSbcKettlebells from '@/assets/images/categories/fitness/shopByCategory/kettlebells1.jpg'
import fitnessSbcPullup from '@/assets/images/categories/fitness/shopByCategory/pullup1.webp'
import fitnessSbcGuns from '@/assets/images/categories/fitness/shopByCategory/guns1.jpg'
import fitnessSbcShakers from '@/assets/images/categories/fitness/shopByCategory/shakers1.jpg'
import fitnessSbcAbRollers from '@/assets/images/categories/fitness/shopByCategory/ab-rollers1.jpg'
import fitnessSbcGloves from '@/assets/images/categories/fitness/shopByCategory/gloves1.jpg'

import fitnessSpotlightWaterBottle from '@/assets/images/categories/fitness/athleteFavourites/water-bottle2.jpg'
import fitnessSpotlightYogaMats from '@/assets/images/categories/fitness/athleteFavourites/yoga-mats2.jpg'
import fitnessSpotlightBands from '@/assets/images/categories/fitness/athleteFavourites/bands2.webp'
import fitnessSpotlightDumbbells from '@/assets/images/categories/fitness/athleteFavourites/dumbells2.jpg'
import fitnessSpotlightRollers from '@/assets/images/categories/fitness/athleteFavourites/rollers2.jpg'
import fitnessSpotlightGymbags from '@/assets/images/categories/fitness/athleteFavourites/gymbags2.jpg'
import fitnessSpotlightRopes from '@/assets/images/categories/fitness/athleteFavourites/ropes2.jpg'
import fitnessSpotlightTrackers from '@/assets/images/categories/fitness/athleteFavourites/trackers2.jpg'
import fitnessSpotlightTreadmills from '@/assets/images/categories/fitness/athleteFavourites/treadmills2.jpg'
import fitnessSpotlightKettlebells from '@/assets/images/categories/fitness/athleteFavourites/kettlebells2.jpg'
import fitnessSpotlightPullup from '@/assets/images/categories/fitness/athleteFavourites/pullup2.jpg'
import fitnessSpotlightGuns from '@/assets/images/categories/fitness/athleteFavourites/guns2.jpg'
import fitnessSpotlightShakers from '@/assets/images/categories/fitness/athleteFavourites/shakers2.jpg'
import fitnessSpotlightAbRollers from '@/assets/images/categories/fitness/athleteFavourites/ab-rollers2.jpg'
import fitnessSpotlightGloves from '@/assets/images/categories/fitness/athleteFavourites/gloves2.jpg'

import fitnessBrandHrx from '@/assets/images/categories/fitness/featuredBrands/hrx.png'
import fitnessBrandCultsport from '@/assets/images/categories/fitness/featuredBrands/cultsport.png'
import fitnessBrandBoldfit from '@/assets/images/categories/fitness/featuredBrands/boldfit.webp'
import fitnessBrandDomyos from '@/assets/images/categories/fitness/featuredBrands/domyos.jpg'
import fitnessBrandKore from '@/assets/images/categories/fitness/featuredBrands/kore.jpg'
import fitnessBrandEverlast from '@/assets/images/categories/fitness/featuredBrands/everlast.jpg'
import fitnessBrandAurion from '@/assets/images/categories/fitness/featuredBrands/aurion.jpg'
import fitnessBrandStrauss from '@/assets/images/categories/fitness/featuredBrands/strauss.jpg'
import fitnessBrandFitkit from '@/assets/images/categories/fitness/featuredBrands/fitkit.webp'
import fitnessBrandGofit from '@/assets/images/categories/fitness/featuredBrands/gofit.jpg'
import fitnessBrandDecathlon from '@/assets/images/categories/fitness/featuredBrands/decathlon.jpg'
import fitnessBrandReebok from '@/assets/images/categories/fitness/featuredBrands/reebok.jpg'
import fitnessBrandUnderArmour from '@/assets/images/categories/fitness/featuredBrands/under-armour.jpg'
import fitnessBrandCosco from '@/assets/images/categories/fitness/featuredBrands/cosco.jpg'
import fitnessBrandNivia from '@/assets/images/categories/fitness/featuredBrands/nivia.jpg'

import fitnessDealsDumbbell from '@/assets/images/categories/fitness/trainingDeals/dumbbell.jpg'
import fitnessDealsFoamRoller from '@/assets/images/categories/fitness/trainingDeals/foam-roller.jpg'
import fitnessDealsFoldable from '@/assets/images/categories/fitness/trainingDeals/foldable.webp'
import fitnessDealsIron from '@/assets/images/categories/fitness/trainingDeals/iron.jpg'
import fitnessDealsFitness from '@/assets/images/categories/fitness/trainingDeals/fitness.webp'
import fitnessDealsBag from '@/assets/images/categories/fitness/trainingDeals/bag.jpg'

// --- Electronics: locally-hosted images, same per-section folder pattern.
import electronicsBannerOne from '@/assets/images/categories/electronics/banners/banner1.jpg'
import electronicsBannerTwo from '@/assets/images/categories/electronics/banners/banner2.webp'

import electronicsSliderOne from '@/assets/images/categories/electronics/slider/slider1.jpg'
import electronicsSliderTwo from '@/assets/images/categories/electronics/slider/slider2.webp'
import electronicsSliderThree from '@/assets/images/categories/electronics/slider/slider3.png'
import electronicsSliderFour from '@/assets/images/categories/electronics/slider/slider4.jpg'
import electronicsSliderFive from '@/assets/images/categories/electronics/slider/slider5.png'

import electronicsSbcHeadphones from '@/assets/images/categories/electronics/shopByCategory/headphone1.jpg'
import electronicsSbcLaptops from '@/assets/images/categories/electronics/shopByCategory/laptop1.jpg'
import electronicsSbcSmartwatches from '@/assets/images/categories/electronics/shopByCategory/watch1.jpg'
import electronicsSbcSpeakers from '@/assets/images/categories/electronics/shopByCategory/speaker1.jpg'
import electronicsSbcCameras from '@/assets/images/categories/electronics/shopByCategory/camera1.jpg'
import electronicsSbcPowerBanks from '@/assets/images/categories/electronics/shopByCategory/powerbank1.jpg'
import electronicsSbcSecurityCameras from '@/assets/images/categories/electronics/shopByCategory/security1.jpg'
import electronicsSbcGamingGear from '@/assets/images/categories/electronics/shopByCategory/gaming1.jpg'
import electronicsSbcTablets from '@/assets/images/categories/electronics/shopByCategory/tablets1.jpg'
import electronicsSbcMonitors from '@/assets/images/categories/electronics/shopByCategory/monitor1.jpg'
import electronicsSbcPrinters from '@/assets/images/categories/electronics/shopByCategory/printer1.jpg'
import electronicsSbcRouters from '@/assets/images/categories/electronics/shopByCategory/router1.jpg'
import electronicsSbcExternalDrives from '@/assets/images/categories/electronics/shopByCategory/drive1.jpg'
import electronicsSbcWebcams from '@/assets/images/categories/electronics/shopByCategory/webcams1.jpg'
import electronicsSbcDrones from '@/assets/images/categories/electronics/shopByCategory/drones1.jpg'

import electronicsSpotlightHeadphones from '@/assets/images/categories/electronics/trendingGadgets/headphone2.jpg'
import electronicsSpotlightLaptops from '@/assets/images/categories/electronics/trendingGadgets/laptop2.jpg'
import electronicsSpotlightSmartwatches from '@/assets/images/categories/electronics/trendingGadgets/watch2.jpg'
import electronicsSpotlightSpeakers from '@/assets/images/categories/electronics/trendingGadgets/speaker2.jpg'
import electronicsSpotlightCameras from '@/assets/images/categories/electronics/trendingGadgets/camera2.jpg'
import electronicsSpotlightPowerBanks from '@/assets/images/categories/electronics/trendingGadgets/powerbank2.jpg'
import electronicsSpotlightSecurityCameras from '@/assets/images/categories/electronics/trendingGadgets/security2.jpg'
import electronicsSpotlightGamingGear from '@/assets/images/categories/electronics/trendingGadgets/gaming2.jpg'
import electronicsSpotlightTablets from '@/assets/images/categories/electronics/trendingGadgets/tablets2.jpg'
import electronicsSpotlightMonitors from '@/assets/images/categories/electronics/trendingGadgets/monitor2.jpg'
import electronicsSpotlightPrinters from '@/assets/images/categories/electronics/trendingGadgets/printer2.jpg'
import electronicsSpotlightRouters from '@/assets/images/categories/electronics/trendingGadgets/router2.jpg'
import electronicsSpotlightExternalDrives from '@/assets/images/categories/electronics/trendingGadgets/drive2.jpg'
import electronicsSpotlightWebcams from '@/assets/images/categories/electronics/trendingGadgets/webcams2.jpg'
import electronicsSpotlightDrones from '@/assets/images/categories/electronics/trendingGadgets/drones2.jpg'

import electronicsBrandSony from '@/assets/images/categories/electronics/featuredBrands/sony.jpg'
import electronicsBrandJbl from '@/assets/images/categories/electronics/featuredBrands/jbl.jpg'
import electronicsBrandBose from '@/assets/images/categories/electronics/featuredBrands/bose.jpg'
import electronicsBrandBoat from '@/assets/images/categories/electronics/featuredBrands/boat.jpg'
import electronicsBrandDell from '@/assets/images/categories/electronics/featuredBrands/dell.jpg'
import electronicsBrandHp from '@/assets/images/categories/electronics/featuredBrands/hp.jpg'
import electronicsBrandLenovo from '@/assets/images/categories/electronics/featuredBrands/lenovo.jpg'
import electronicsBrandApple from '@/assets/images/categories/electronics/featuredBrands/apple.jpg'
import electronicsBrandSennheiser from '@/assets/images/categories/electronics/featuredBrands/sennheiser.jpg'
import electronicsBrandLogitech from '@/assets/images/categories/electronics/featuredBrands/logitech.jpg'
import electronicsBrandAsus from '@/assets/images/categories/electronics/featuredBrands/asus.jpg'
import electronicsBrandAcer from '@/assets/images/categories/electronics/featuredBrands/acer.png'
import electronicsBrandCanon from '@/assets/images/categories/electronics/featuredBrands/canon.jpg'
import electronicsBrandNikon from '@/assets/images/categories/electronics/featuredBrands/nikon.jpg'
import electronicsBrandGopro from '@/assets/images/categories/electronics/featuredBrands/gopro.jpg'

import electronicsDealsHeadphones from '@/assets/images/categories/electronics/topTechDeals/headphones.jpg'
import electronicsDealsLaptop from '@/assets/images/categories/electronics/topTechDeals/laptop.jpg'
import electronicsDealsSpeaker from '@/assets/images/categories/electronics/topTechDeals/speaker.jpg'
import electronicsDealsWatch from '@/assets/images/categories/electronics/topTechDeals/watch.jpg'
import electronicsDealsCamera from '@/assets/images/categories/electronics/topTechDeals/camera.jpg'
import electronicsDealsPowerbank from '@/assets/images/categories/electronics/topTechDeals/powerbank.jpg'

// --- Books & Stationery: locally-hosted images, same per-section folder pattern.
import booksBannerOne from '@/assets/images/categories/booksAndStationary/banners/banner1.avif'
import booksBannerTwo from '@/assets/images/categories/booksAndStationary/banners/banner2.jpg'

import booksSliderOne from '@/assets/images/categories/booksAndStationary/slider/slider1.avif'
import booksSliderTwo from '@/assets/images/categories/booksAndStationary/slider/slider2.jpg'
import booksSliderThree from '@/assets/images/categories/booksAndStationary/slider/slider3.webp'
import booksSliderFour from '@/assets/images/categories/booksAndStationary/slider/slider4.webp'
import booksSliderFive from '@/assets/images/categories/booksAndStationary/slider/slider5.webp'

import booksSbcFiction from '@/assets/images/categories/booksAndStationary/shopByCategory/fiction1.jpg'
import booksSbcNotebooks from '@/assets/images/categories/booksAndStationary/shopByCategory/notebooks1.jpg'
import booksSbcPensPencils from '@/assets/images/categories/booksAndStationary/shopByCategory/pens-pencils1.jpg'
import booksSbcKids from '@/assets/images/categories/booksAndStationary/shopByCategory/kids1.jpg'
import booksSbcNonFiction from '@/assets/images/categories/booksAndStationary/shopByCategory/non-fiction1.jpg'
import booksSbcArt from '@/assets/images/categories/booksAndStationary/shopByCategory/art1.jpg'
import booksSbcPlanner from '@/assets/images/categories/booksAndStationary/shopByCategory/planner1.jpg'
import booksSbcManga from '@/assets/images/categories/booksAndStationary/shopByCategory/manga1.webp'
import booksSbcBookmark from '@/assets/images/categories/booksAndStationary/shopByCategory/bookmark1.jpg'
import booksSbcDiary from '@/assets/images/categories/booksAndStationary/shopByCategory/diary1.jpg'
import booksSbcSticky from '@/assets/images/categories/booksAndStationary/shopByCategory/sticky1.jpg'
import booksSbcHighlighters from '@/assets/images/categories/booksAndStationary/shopByCategory/highlighters1.jpg'
import booksSbcOrganizer from '@/assets/images/categories/booksAndStationary/shopByCategory/organizer1.jpg'
import booksSbcCard from '@/assets/images/categories/booksAndStationary/shopByCategory/card1.jpg'
import booksSbcCalci from '@/assets/images/categories/booksAndStationary/shopByCategory/calci1.jpg'

import booksSpotlightFiction from '@/assets/images/categories/booksAndStationary/newReleases/fiction2.webp'
import booksSpotlightNotebooks from '@/assets/images/categories/booksAndStationary/newReleases/notebooks2.jpg'
import booksSpotlightPensPencils from '@/assets/images/categories/booksAndStationary/newReleases/pens-pencils2.jpg'
import booksSpotlightKids from '@/assets/images/categories/booksAndStationary/newReleases/kids2.jpg'
import booksSpotlightNonFiction from '@/assets/images/categories/booksAndStationary/newReleases/non-fiction2.jpg'
import booksSpotlightArt from '@/assets/images/categories/booksAndStationary/newReleases/art2.jpg'
import booksSpotlightPlanner from '@/assets/images/categories/booksAndStationary/newReleases/planner2.jpg'
import booksSpotlightManga from '@/assets/images/categories/booksAndStationary/newReleases/manga2.jpg'
import booksSpotlightBookmark from '@/assets/images/categories/booksAndStationary/newReleases/bookmark2.webp'
import booksSpotlightDiary from '@/assets/images/categories/booksAndStationary/newReleases/diary2.jpg'
import booksSpotlightSticky from '@/assets/images/categories/booksAndStationary/newReleases/sticky2.jpg'
import booksSpotlightHighlighters from '@/assets/images/categories/booksAndStationary/newReleases/highlighters2.jpg'
import booksSpotlightOrganizer from '@/assets/images/categories/booksAndStationary/newReleases/organizer2.jpg'
import booksSpotlightCard from '@/assets/images/categories/booksAndStationary/newReleases/card2.jpg'
import booksSpotlightCalci from '@/assets/images/categories/booksAndStationary/newReleases/calci2.jpg'

import booksBrandPenguin from '@/assets/images/categories/booksAndStationary/featuredBrands/penguin.jpg'
import booksBrandHarper from '@/assets/images/categories/booksAndStationary/featuredBrands/harper.avif'
import booksBrandClassmate from '@/assets/images/categories/booksAndStationary/featuredBrands/classmate.jpg'
import booksBrandCamlin from '@/assets/images/categories/booksAndStationary/featuredBrands/camlin.jpg'
import booksBrandParker from '@/assets/images/categories/booksAndStationary/featuredBrands/parker.jpg'
import booksBrandFaber from '@/assets/images/categories/booksAndStationary/featuredBrands/faber.jpg'
import booksBrandStaedtler from '@/assets/images/categories/booksAndStationary/featuredBrands/staedtler.jpg'
import booksBrandAmar from '@/assets/images/categories/booksAndStationary/featuredBrands/amar.jpg'
import booksBrandScholastic from '@/assets/images/categories/booksAndStationary/featuredBrands/scholastic.png'
import booksBrandOxford from '@/assets/images/categories/booksAndStationary/featuredBrands/oxford.jpg'
import booksBrandNatraj from '@/assets/images/categories/booksAndStationary/featuredBrands/natraj.jpg'
import booksBrandDoms from '@/assets/images/categories/booksAndStationary/featuredBrands/doms.jpg'
import booksBrandReynolds from '@/assets/images/categories/booksAndStationary/featuredBrands/reynolds.jpg'
import booksBrandCello from '@/assets/images/categories/booksAndStationary/featuredBrands/cello.jpg'
import booksBrandNavneet from '@/assets/images/categories/booksAndStationary/featuredBrands/navneet.webp'

import booksDealsFiction from '@/assets/images/categories/booksAndStationary/readerDeals/fiction.jpg'
import booksDealsNotebook from '@/assets/images/categories/booksAndStationary/readerDeals/notebook.jpg'
import booksDealsPen from '@/assets/images/categories/booksAndStationary/readerDeals/pen.jpg'
import booksDealsStorybook from '@/assets/images/categories/booksAndStationary/readerDeals/storybook.webp'
import booksDealsDailyPlanner from '@/assets/images/categories/booksAndStationary/readerDeals/daily-planner.jpg'
import booksDealsWatercolor from '@/assets/images/categories/booksAndStationary/readerDeals/watercolor.webp'

const CATEGORY_DEFINITIONS = {
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
    sliderImages: [
      mobilesSliderOne,
      mobilesSliderTwo,
      mobilesSliderThree,
      mobilesSliderFour,
      mobilesSliderFive,
    ],
    shopByCategoryImages: {
      iPhone: mobilesSbcIphone,
      Galaxy: mobilesSbcGalaxy,
      OPPO: mobilesSbcOppo,
      POCO: mobilesSbcPoco,
      Redmi: mobilesSbcRedmi,
      Infinix: mobilesSbcInfinix,
      Nothing: mobilesSbcNothing,
      Pixel: mobilesSbcPixel,
      OnePlus: mobilesSbcOneplus,
      Vivo: mobilesSbcVivo,
      Realme: mobilesSbcRealme,
      'Phone Cases': mobilesSbcPhoneCases,
      Chargers: mobilesSbcChargers,
      Earphones: mobilesSbcEarphones,
      'Screen Guards': mobilesSbcScreenGuards,
    },
    spotlightImages: {
      iPhone: mobilesSpotlightIphone,
      Galaxy: mobilesSpotlightGalaxy,
      OPPO: mobilesSpotlightOppo,
      POCO: mobilesSpotlightPoco,
      Redmi: mobilesSpotlightRedmi,
      Infinix: mobilesSpotlightInfinix,
      Nothing: mobilesSpotlightNothing,
      Pixel: mobilesSpotlightPixel,
      OnePlus: mobilesSpotlightOneplus,
      Vivo: mobilesSpotlightVivo,
      Realme: mobilesSpotlightRealme,
      'Phone Cases': mobilesSpotlightPhoneCases,
      Chargers: mobilesSpotlightChargers,
      Earphones: mobilesSpotlightEarphones,
      'Screen Guards': mobilesSpotlightScreenGuards,
    },
    brandImages: {
      iPhone: mobilesBrandIphone,
      'Samsung Galaxy': mobilesBrandGalaxy,
      OPPO: mobilesBrandOppo,
      POCO: mobilesBrandPoco,
      'Xiaomi Redmi': mobilesBrandRedmi,
      Infinix: mobilesBrandInfinix,
      Nothing: mobilesBrandNothing,
      'Google Pixel': mobilesBrandPixel,
      OnePlus: mobilesBrandOneplus,
      Vivo: mobilesBrandVivo,
      Realme: mobilesBrandRealme,
      Motorola: mobilesBrandMoto,
      Honor: mobilesBrandHonor,
      iQOO: mobilesBrandIqoo,
      Tecno: mobilesBrandTecno,
    },
    promoImages: [mobilesBannerOne, mobilesBannerTwo],
    dealsItems: [
      { label: '128GB 5G Smartphone', image: mobilesDeals128gb },
      { label: 'AMOLED Display Phone', image: mobilesDealsAmoled },
      { label: 'Wireless Earbuds', image: mobilesDealsEarbuds },
      { label: 'Fast-Charging Power Bank', image: mobilesDealsPowerBank },
      { label: 'Pro Max Camera Phone', image: mobilesDealsProMax },
      { label: 'Tempered Glass Screen Guard', image: mobilesDealsScreenGuard },
    ],
    headlines: [
      ['Latest 5G', 'smartphones.'],
      ['Flagship', 'camera phones.'],
      ['Best triple', 'camera, period.'],
      ['Slimmest phone', 'we have made.'],
      ['Power that', 'lasts all day.'],
    ],
    descriptions: [
      'The newest 5G smartphones with faster networks and smoother performance.',
      'Flagship phones with pro-grade cameras built for stunning shots.',
      'Triple-camera systems that capture crisp detail in any light.',
      'Our slimmest, lightest design yet without compromising on power.',
      'Big batteries and smart charging that keep you going all day.',
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
    brands: ['iPhone', 'Samsung Galaxy', 'OPPO', 'Vivo', 'OnePlus', 'Xiaomi Redmi', 'Realme', 'Nothing', 'Google Pixel', 'Infinix', 'POCO', 'Motorola', 'Honor', 'iQOO', 'Tecno'],
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
    dealsItems: [
      { label: "Men's Beard Grooming Kit", image: 'https://images.unsplash.com/photo-1585652757173-57de5be9a4a5?w=900&q=80' },
      { label: "Women's Matte Liquid Lipstick Set", image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80' },
      { label: "Men's Face Wash & Sunscreen Combo", image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=900&q=80' },
      { label: "Women's Vitamin C Serum", image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80' },
      { label: "Men's Deodorant & Perfume Set", image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=900&q=80' },
      { label: "Women's Keratin Hair Spa Kit", image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80' },
    ],
    headlines: [
      ["Beard & shave,", 'sorted.'],
      ["Women's makeup,", 'must-haves.'],
      ["Men's skincare,", 'daily routine.'],
      ["Women's haircare,", 'reinvented.'],
      ['Fragrance for', 'every mood.'],
    ],
    descriptions: [
      'Trimmers, razors, and beard oils for a sharp, well-groomed look.',
      "Women's makeup must-haves for a flawless look, day or night.",
      "Men's skincare basics, simplified for a daily routine.",
      "Women's haircare formulas reinvented for stronger, healthier-looking hair.",
      'Signature scents for every mood and every occasion.',
    ],
    discounts: [40, 35, 30, 25, 20],
    description: 'Skincare, makeup, and grooming essentials trusted by thousands of happy customers.',
    dealsLabel: 'Limited Time Deals',
    spotlightLabel: 'Red Carpet Debuts',
    promos: [
      { title: 'Summer Beauty Sale', subtitle: 'Up to 50% off on Skincare & Makeup', ctaLabel: 'Shop Now' },
      { title: 'Premium Fragrances', subtitle: 'Starting at $29', ctaLabel: 'Explore Now' },
    ],
    tileGroups: [
      {
        label: 'Men',
        tiles: ["Men's Grooming", 'Beard Care', 'Shaving', 'Face Wash', 'Deodorants', 'Hair Styling', 'Body Wash', 'Sunscreen', 'Trimmers', 'Body Lotion', 'Perfume', 'Hair Color', 'Skincare', 'Talc & Powder', 'Wellness'],
      },
      {
        label: 'Women',
        tiles: ['Makeup', 'Skincare', 'Haircare', 'Fragrance', 'Bath & Body', 'Tools & Brushes', 'Lip Care', 'Nail Care', 'Face Masks', 'Hair Color', 'Body Lotion', 'Deodorants', 'Sunscreen', 'Hair Removal', 'Wellness'],
      },
    ],
    tiles: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', "Men's Grooming", 'Wellness', 'Bath & Body', 'Tools & Brushes', 'Sunscreen', 'Lip Care', 'Nail Care', 'Hair Color', 'Face Masks', 'Body Lotion', 'Deodorants'],
    brands: ['Lakmé', 'Maybelline', "L'Oréal", 'Nykaa', 'MAC', 'Dove', 'Nivea', "Pond's", 'Garnier', 'The Body Shop', 'Himalaya', 'Biotique', 'Mamaearth', 'WOW Skin Science', 'Neutrogena'],
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
    sliderImages: [
      electronicsSliderOne,
      electronicsSliderTwo,
      electronicsSliderThree,
      electronicsSliderFour,
      electronicsSliderFive,
    ],
    shopByCategoryImages: {
      Headphones: electronicsSbcHeadphones,
      Laptops: electronicsSbcLaptops,
      Smartwatches: electronicsSbcSmartwatches,
      Speakers: electronicsSbcSpeakers,
      Cameras: electronicsSbcCameras,
      'Power Banks': electronicsSbcPowerBanks,
      'Security Cameras': electronicsSbcSecurityCameras,
      'Gaming Gear': electronicsSbcGamingGear,
      Tablets: electronicsSbcTablets,
      Monitors: electronicsSbcMonitors,
      Printers: electronicsSbcPrinters,
      Routers: electronicsSbcRouters,
      'External Drives': electronicsSbcExternalDrives,
      Webcams: electronicsSbcWebcams,
      Drones: electronicsSbcDrones,
    },
    spotlightImages: {
      Headphones: electronicsSpotlightHeadphones,
      Laptops: electronicsSpotlightLaptops,
      Smartwatches: electronicsSpotlightSmartwatches,
      Speakers: electronicsSpotlightSpeakers,
      Cameras: electronicsSpotlightCameras,
      'Power Banks': electronicsSpotlightPowerBanks,
      'Security Cameras': electronicsSpotlightSecurityCameras,
      'Gaming Gear': electronicsSpotlightGamingGear,
      Tablets: electronicsSpotlightTablets,
      Monitors: electronicsSpotlightMonitors,
      Printers: electronicsSpotlightPrinters,
      Routers: electronicsSpotlightRouters,
      'External Drives': electronicsSpotlightExternalDrives,
      Webcams: electronicsSpotlightWebcams,
      Drones: electronicsSpotlightDrones,
    },
    brandImages: {
      Sony: electronicsBrandSony,
      JBL: electronicsBrandJbl,
      Bose: electronicsBrandBose,
      boAt: electronicsBrandBoat,
      Dell: electronicsBrandDell,
      HP: electronicsBrandHp,
      Lenovo: electronicsBrandLenovo,
      Apple: electronicsBrandApple,
      Sennheiser: electronicsBrandSennheiser,
      Logitech: electronicsBrandLogitech,
      ASUS: electronicsBrandAsus,
      Acer: electronicsBrandAcer,
      Canon: electronicsBrandCanon,
      Nikon: electronicsBrandNikon,
      GoPro: electronicsBrandGopro,
    },
    promoImages: [electronicsBannerOne, electronicsBannerTwo],
    dealsItems: [
      { label: 'Noise-Cancelling Headphones', image: electronicsDealsHeadphones },
      { label: '15.6" Slim Laptop', image: electronicsDealsLaptop },
      { label: 'Bluetooth Party Speaker', image: electronicsDealsSpeaker },
      { label: 'Smartwatch with GPS', image: electronicsDealsWatch },
      { label: 'Mirrorless Camera Kit', image: electronicsDealsCamera },
      { label: '10000mAh Power Bank', image: electronicsDealsPowerbank },
    ],
    headlines: [
      ['Audio gear,', 'up to 75% off.'],
      ['Laptops &', 'more.'],
      ['Tablets for', 'work & play.'],
      ['Smartwatches', 'for every day.'],
      ['Cameras that', 'capture it all.'],
    ],
    descriptions: [
      'Headphones and speakers with deep discounts on top brands.',
      'Laptops and computing gear built for work, study, and play.',
      'Tablets that adapt to whatever you need — work, study, or entertainment.',
      'Smartwatches that keep you connected and on track every day.',
      'Cameras built to capture every detail, in any setting.',
    ],
    discounts: [75, 30, 40, 20, 22],
    description: 'Premium audio, computing, and smart devices built for everyday performance.',
    dealsLabel: 'Top Tech Deals',
    spotlightLabel: 'Trending Gadgets',
    promos: [
      { title: 'Audio Week Sale', subtitle: 'Up to 60% off on headphones', ctaLabel: 'Shop Now' },
      { title: 'Smart Home Picks', subtitle: 'Starting at $19', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Headphones', 'Laptops', 'Smartwatches', 'Speakers', 'Cameras', 'Power Banks', 'Security Cameras', 'Gaming Gear', 'Tablets', 'Monitors', 'Printers', 'Routers', 'External Drives', 'Webcams', 'Drones'],
    brands: ['Sony', 'JBL', 'Bose', 'boAt', 'Dell', 'HP', 'Lenovo', 'Apple', 'Sennheiser', 'Logitech', 'ASUS', 'Acer', 'Canon', 'Nikon', 'GoPro'],
  },
  'home & living': {
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
    sliderImages: [
      homeSliderOne,
      homeSliderTwo,
      homeSliderThree,
      homeSliderFour,
      homeSliderFive,
    ],
    shopByCategoryImages: {
      'Cushion Covers': homeSbcCushion,
      'Figurines & Vases': homeSbcVases,
      Storage: homeSbcStorage,
      Lighting: homeSbcLighting,
      'Wall Decor': homeSbcWallDecor,
      Rugs: homeSbcRugs,
      Curtains: homeSbcCurtains,
      'Kitchen Linen': homeSbcKitchen,
      Bedsheets: homeSbcBedsheets,
      Mirrors: homeSbcMirror,
      Clocks: homeSbcClock,
      Planters: homeSbcPlanter,
      'Photo Frames': homeSbcPhotoframe,
      'Door Mats': homeSbcDoormats,
      'Shower Curtains': homeSbcShowerCurtains,
    },
    spotlightImages: {
      'Cushion Covers': homeSpotlightCushion,
      'Figurines & Vases': homeSpotlightVases,
      Storage: homeSpotlightStorage,
      Lighting: homeSpotlightLighting,
      'Wall Decor': homeSpotlightWallDecor,
      Rugs: homeSpotlightRugs,
      Curtains: homeSpotlightCurtains,
      'Kitchen Linen': homeSpotlightKitchen,
      Bedsheets: homeSpotlightBedsheets,
      Mirrors: homeSpotlightMirror,
      Clocks: homeSpotlightClock,
      Planters: homeSpotlightPlanter,
      'Photo Frames': homeSpotlightPhotoframe,
      'Door Mats': homeSpotlightDoormats,
      'Shower Curtains': homeSpotlightShowerCurtains,
    },
    brandImages: {
      IKEA: homeBrandIkea,
      'Urban Ladder': homeBrandUrbanLadder,
      Pepperfry: homeBrandPepperfry,
      'Home Centre': homeBrandHomeCentre,
      Fabindia: homeBrandFabindia,
      'Bombay Dyeing': homeBrandBombay,
      Spaces: homeBrandSpaces,
      Portico: homeBrandPortico,
      Wakefit: homeBrandWakefit,
      Chumbak: homeBrandChumbak,
      CraftMaestros: homeBrandCraft,
      Decor: homeBrandDecor,
      Philips: homeBrandPhilips,
      'Saral Home': homeBrandSaral,
      'Venus Mirror': homeBrandVenus,
    },
    promoImages: [homeBannerOne, homeBannerTwo],
    dealsItems: [
      { label: 'Embroidered Cushion Cover Set', image: homeDealsCushion },
      { label: 'Ceramic Vase Duo', image: homeDealsCeramic },
      { label: 'Under-Bed Storage Box', image: homeDealsUnderbed },
      { label: 'Pendant Ceiling Light', image: homeDealsLight },
      { label: 'Handwoven Wall Tapestry', image: homeDealsHandwoven },
      { label: 'Cotton Bedsheet Set', image: homeDealsBedsheet },
    ],
    headlines: [
      ['Revamp your', 'space in style.'],
      ['Lighting that', 'sets the mood.'],
      ['Storage made', 'simple.'],
      ['Soft touches,', 'cozy corners.'],
      ['Bedroom', 'refresh.'],
    ],
    descriptions: [
      'Decor pieces that give any room an instant style upgrade.',
      'Lighting fixtures that set the mood for every moment.',
      'Smart storage solutions that keep clutter out of sight.',
      'Rugs, cushions, and curtains that add warmth to any room.',
      'Bedroom essentials for a calmer, more restful space.',
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
    brands: ['IKEA', 'Urban Ladder', 'Pepperfry', 'Home Centre', 'Fabindia', 'Bombay Dyeing', 'Spaces', "D'décor", 'Portico', 'Wakefit', 'Chumbak', 'Philips', 'Venus Mirror', 'Saral Home', 'CraftMaestros'],
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
    dealsItems: [
      { label: '1.5 Ton Split AC', image: 'https://images.unsplash.com/photo-1581275299192-3c47b0c89e26?w=900&q=80' },
      { label: 'Double-Door Refrigerator', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=900&q=80' },
      { label: '25L Convection Microwave', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=80' },
      { label: 'Front-Load Washing Machine', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=80' },
      { label: 'RO+UV Water Purifier', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80' },
      { label: 'Robotic Vacuum Cleaner', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80' },
    ],
    headlines: [
      ['Appliances for', 'your home.'],
      ['Kitchen', 'upgrades.'],
      ['Refrigerators,', 'reimagined.'],
      ['Laundry day,', 'made easy.'],
      ['Smart kitchen', 'upgrades.'],
    ],
    descriptions: [
      'Reliable appliances for every room in your home.',
      'Kitchen upgrades that make cooking faster and easier.',
      'Refrigerators reimagined with smarter cooling and storage.',
      'Washing machines and dryers that make laundry day effortless.',
      'Smart kitchen gadgets that save you time on every task.',
    ],
    discounts: [55, 40, 30, 25, 20],
    description: 'Reliable appliances that make everyday tasks faster and easier.',
    dealsLabel: 'Appliance Deals',
    spotlightLabel: 'Top Rated Picks',
    promos: [
      { title: 'Kitchen Upgrade Sale', subtitle: 'Up to 55% off on appliances', ctaLabel: 'Shop Now' },
      { title: 'Cooling Essentials', subtitle: 'Starting at $99', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Air Conditioners', 'Refrigerators', 'Microwaves', 'Washing Machines', 'Water Purifiers', 'Mixers & Grinders', 'Vacuum Cleaners', 'Geysers', 'Dishwashers', 'Air Purifiers', 'Toasters', 'Electric Kettles', 'Induction Cooktops', 'Coffee Makers', 'Ceiling Fans'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'Bosch', 'IFB', 'Voltas', 'Haier', 'Panasonic', 'Godrej', 'Philips', 'Hitachi', 'Daikin', 'Havells', 'Bajaj', 'Prestige'],
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
    sliderImages: [
      toysSliderOne,
      toysSliderTwo,
      toysSliderThree,
      toysSliderFour,
      toysSliderFive,
    ],
    shopByCategoryImages: {
      'Action Figures': toysSbcAction,
      'Board Games': toysSbcBoardGames,
      'RC Cars': toysSbcRcCars,
      'Soft Toys': toysSbcSoftToys,
      'Building Blocks': toysSbcBuildingBlocks,
      Puzzles: toysSbcPuzzles,
      'Outdoor Play': toysSbcOutdoorGames,
      'Educational Toys': toysSbcEducational,
      Dolls: toysSbcDolls,
      'Art & Craft Kits': toysSbcArtCraft,
      'Musical Toys': toysSbcMusicalToys,
      'Card Games': toysSbcCardGames,
      'Ride-Ons': toysSbcRideOns,
      'Science Kits': toysSbcScienceKit,
      'Play Dough': toysSbcPlayDoh,
    },
    spotlightImages: {
      'Action Figures': toysSpotlightAction,
      'Board Games': toysSpotlightBoardGames,
      'RC Cars': toysSpotlightRC,
      'Soft Toys': toysSpotlightSoftToys,
      'Building Blocks': toysSpotlightBuildingBlocks,
      Puzzles: toysSpotlightPuzzles,
      'Outdoor Play': toysSpotlightOutdoor,
      'Educational Toys': toysSpotlightEducational,
      Dolls: toysSpotlightDolls,
      'Art & Craft Kits': toysSpotlightArtsAndCrafts,
      'Musical Toys': toysSpotlightMusical,
      'Card Games': toysSpotlightCard,
      'Ride-Ons': toysSpotlightRideOns,
      'Science Kits': toysSpotlightScienceKit,
      'Play Dough': toysSpotlightPlaydoh,
    },
    brandImages: {
      LEGO: toysBrandLego,
      Hasbro: toysBrandHasbro,
      Mattel: toysBrandMattel,
      'Fisher-Price': toysBrandFisherPrice,
      'Hot Wheels': toysBrandHotWheels,
      Barbie: toysBrandBarbie,
      Funskool: toysBrandFunskool,
      NERF: toysBrandNerf,
      Hamleys: toysBrandHamleys,
      Chicco: toysBrandChicco,
      VTech: toysBrandVtech,
      'Play-Doh': toysBrandPlaydoh,
      Monopoly: toysBrandMonopoly,
      Crayola: toysBrandCrayola,
      Disney: toysBrandDisney,
    },
    promoImages: [toysBannerToysSale, toysBannerBoardGames],
    dealsItems: [
      { label: '500-Piece Building Blocks Kit', image: toysDeals500Pieces },
      { label: 'Family Board Game Bundle', image: toysDealsFamily },
      { label: 'Kids Art & Craft Kit', image: toysDealsArtCraft },
      { label: 'Remote-Control Off-Road Truck', image: toysDealsOffRoad },
      { label: 'Plush Teddy Bear Large', image: toysDealsPlush },
      { label: 'Superhero Action Figure Set', image: toysDealsSuperhero },
    ],
    headlines: [
      ['Playtime', 'favorites.'],
      ['Building sets', 'for young minds.'],
      ['Game night,', 'sorted.'],
      ['Outdoor play', 'adventures.'],
      ['Creative kits', 'for young minds.'],
    ],
    descriptions: [
      'Beloved playtime favorites for hours of fun.',
      'Building sets that spark imagination and problem-solving.',
      'Board and card games that make every game night memorable.',
      'Outdoor toys built for active, adventurous play.',
      'Art and craft kits that nurture young, creative minds.',
    ],
    discounts: [50, 35, 30, 40, 25],
    description: 'Safe, fun, and educational toys for every age and interest.',
    dealsLabel: 'Playtime Deals',
    spotlightLabel: 'New Arrivals',
    promos: [
      { title: 'Playtime Sale', subtitle: 'Up to 50% off on toys', ctaLabel: 'Shop Now' },
      { title: 'Board Game Picks', subtitle: 'Starting at ₹200', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Action Figures', 'Board Games', 'RC Cars', 'Soft Toys', 'Building Blocks', 'Puzzles', 'Outdoor Play', 'Educational Toys', 'Dolls', 'Art & Craft Kits', 'Musical Toys', 'Card Games', 'Ride-Ons', 'Science Kits', 'Play Dough'],
    brands: ['LEGO', 'Hasbro', 'Mattel', 'Fisher-Price', 'Hot Wheels', 'Barbie', 'Funskool', 'NERF', 'Hamleys', 'Chicco', 'VTech', 'Play-Doh', 'Monopoly', 'Crayola', 'Disney'],
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
    sliderImages: [
      foodSliderOne,
      foodSliderTwo,
      foodSliderThree,
      foodSliderFour,
      foodSliderFive,
    ],
    shopByCategoryImages: {
      Snacks: foodSbcSnacks,
      Beverages: foodSbcBeverages,
      'Cleaning Supplies': foodSbcCleaning,
      Toiletries: foodSbcToiletries,
      'Baby Care': foodSbcBabyCare,
      'Pet Supplies': foodSbcPets,
      'Kitchen Essentials': foodSbcKitchen,
      'Storage Containers': foodSbcStorage,
      'Breakfast Cereals': foodSbcBreakfast,
      'Spices & Masalas': foodSbcSpices,
      'Dairy & Bakery': foodSbcDairy,
      'Laundry Care': foodSbcLaundry,
      'Paper Products': foodSbcPaper,
      'Air Fresheners': foodSbcAir,
      Disposables: foodSbcDisposable,
    },
    spotlightImages: {
      Snacks: foodSpotlightSnacks,
      Beverages: foodSpotlightBeverages,
      'Cleaning Supplies': foodSpotlightCleaning,
      Toiletries: foodSpotlightToiletries,
      'Baby Care': foodSpotlightBabyCare,
      'Pet Supplies': foodSpotlightPets,
      'Kitchen Essentials': foodSpotlightKitchen,
      'Storage Containers': foodSpotlightStorage,
      'Breakfast Cereals': foodSpotlightBreakfast,
      'Spices & Masalas': foodSpotlightSpices,
      'Dairy & Bakery': foodSpotlightDairy,
      'Laundry Care': foodSpotlightLaundry,
      'Paper Products': foodSpotlightPaper,
      'Air Fresheners': foodSpotlightAir,
      Disposables: foodSpotlightDisposable,
    },
    brandImages: {
      'Nestlé': foodBrandNestle,
      Tata: foodBrandTata,
      ITC: foodBrandItc,
      Amul: foodBrandAmul,
      Britannia: foodBrandBritannia,
      Colgate: foodBrandColgate,
      Dettol: foodBrandDettol,
      'Surf Excel': foodBrandSurfExcel,
      Vim: foodBrandVim,
      Harpic: foodBrandHarpic,
      Lizol: foodBrandLizol,
      Parle: foodBrandParle,
      "Haldiram's": foodBrandHaldiram,
      Patanjali: foodBrandPatanjali,
      Fortune: foodBrandFortune,
    },
    promoImages: [foodBannerOne, foodBannerTwo],
    dealsItems: [
      { label: 'Assorted Snacks Combo Pack', image: foodDealsSnacks },
      { label: 'Multi-Surface Cleaner Pack', image: foodDealsCleaner },
      { label: 'Herbal Shampoo Combo', image: foodDealsHerbal },
      { label: 'Baby Care Essentials Kit', image: foodDealsBabyCare },
      { label: 'Premium Basmati Rice 5kg', image: foodDealsBasmati },
      { label: 'Dishwashing Liquid Combo', image: foodDealsDishwashing },
    ],
    headlines: [
      ['Pantry', 'staples.'],
      ['Cleaning made', 'simple.'],
      ['Everyday', 'essentials.'],
      ['Baby & personal', 'care.'],
      ['Fresh from the', 'dairy & bakery.'],
    ],
    descriptions: [
      'Pantry staples to keep your kitchen always stocked.',
      'Cleaning supplies that make tidying up simple and quick.',
      'Everyday essentials for the whole household, delivered with care.',
      'Baby care and personal essentials, chosen with extra care.',
      'Fresh dairy and bakery picks delivered straight to your door.',
    ],
    discounts: [20, 30, 15, 25, 18],
    description: 'Everyday groceries and household essentials, delivered with care.',
    dealsLabel: 'Pantry Deals',
    spotlightLabel: 'Everyday Picks',
    promos: [
      { title: 'Pantry Refill Sale', subtitle: 'Up to 30% off groceries', ctaLabel: 'Shop Now' },
      { title: 'Cleaning Essentials', subtitle: 'Starting at $5', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Snacks', 'Beverages', 'Cleaning Supplies', 'Toiletries', 'Baby Care', 'Pet Supplies', 'Kitchen Essentials', 'Storage Containers', 'Breakfast Cereals', 'Spices & Masalas', 'Dairy & Bakery', 'Laundry Care', 'Paper Products', 'Air Fresheners', 'Disposables'],
    brands: ['Nestlé', 'Tata', 'ITC', 'Amul', 'Britannia', 'Colgate', 'Dettol', 'Surf Excel', 'Vim', 'Harpic', 'Lizol', 'Parle', "Haldiram's", 'Patanjali', 'Fortune'],
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
    dealsItems: [
      { label: 'Microfiber Car Wash Kit', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80' },
      { label: 'Alloy Wheel Cleaner Spray', image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=900&q=80' },
      { label: 'Full-Face Riding Helmet', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80' },
      { label: 'Robotic Car Vacuum Cleaner', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=900&q=80' },
      { label: 'Waterproof Car Body Cover', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=900&q=80' },
      { label: 'Dashboard Mobile Holder', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80' },
    ],
    headlines: [
      ['Car care', 'essentials.'],
      ['Tyre & rim', 'care, sorted.'],
      ['Helmets built', 'for safety.'],
      ['Dashboard', 'upgrades.'],
      ['Ride in', 'style.'],
    ],
    descriptions: [
      'Car care essentials that keep your ride looking its best.',
      'Tyre and rim care products for a smoother, safer drive.',
      'Helmets engineered with safety as the top priority.',
      'Dashboard accessories that upgrade comfort and convenience.',
      'Styling accessories that help your ride stand out.',
    ],
    discounts: [60, 40, 35, 30, 25],
    description: 'Keep your ride looking sharp and running smoothly, mile after mile.',
    dealsLabel: 'Garage Deals',
    spotlightLabel: 'Top Rated Gear',
    promos: [
      { title: 'Car Care Sale', subtitle: 'Up to 60% off accessories', ctaLabel: 'Shop Now' },
      { title: 'Helmet Collection', subtitle: 'Starting at $39', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Snacks', 'Beverages', 'Cleaning Supplies', 'Toiletries', 'Baby Care', 'Pet Supplies', 'Kitchen Essentials', 'Storage Containers', 'Breakfast Cereals', 'Spices & Masalas', 'Dairy & Bakery', 'Laundry Care', 'Paper Products', 'Air Fresheners', 'Disposables'],
    brands: ['3M', 'Bosch', 'Michelin', "Meguiar's", 'Armor All', 'Philips', 'CEAT', 'MRF', 'Apollo Tyres', 'Steelbird', 'Vega', 'Studds', 'Motul', 'Castrol', 'Goodyear'],
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

    sliderImages: [
      twSliderSportsBikes,
      twSliderCruisers,
      twSliderAdventureBikes,
      twSliderElectricScooters,
      twSliderFuelEfficient,
    ],
    shopByCategoryImages: {
      'Sports Bikes': twSbcSportsBikes,
      'Cruiser Bikes': twSbcCruiserBikes,
      'Adventure Bikes': twSbcAdventureBikes,
      'Commuter Bikes': twSbcCommuterBikes,
      'Electric Scooters': twSbcElectricScooters,
      Scooters: twSbcScooters,
      Mopeds: twSbcMopeds,
      'Off-Road Bikes': twSbcOffRoadBikes,
      'Café Racers': twSbcCafeRacers,
      'Electric Bikes': twSbcElectricBikes,
      'Touring Bikes': twSbcTouringBikes,
      'Naked Bikes': twSbcNakedBikes,
      'Retro & Classic Bikes': twSbcRetroClassicBikes,
      'Sports Scooters': twSbcSportsScooters,
      'Kids Bikes': twSbcKidsBikes,
    },
    spotlightImages: {
      'Sports Bikes': twSpotlightSportsBikes,
      'Cruiser Bikes': twSpotlightCruiserBikes,
      'Adventure Bikes': twSpotlightAdventureBikes,
      'Commuter Bikes': twSpotlightCommuterBikes,
      'Electric Scooters': twSpotlightElectricScooters,
      Scooters: twSpotlightScooters,
      Mopeds: twSpotlightMopeds,
      'Off-Road Bikes': twSpotlightOffRoadBikes,
      'Café Racers': twSpotlightCafeRacers,
      'Electric Bikes': twSpotlightElectricBikes,
      'Touring Bikes': twSpotlightTouringBikes,
      'Naked Bikes': twSpotlightNakedBikes,
      'Retro & Classic Bikes': twSpotlightRetroClassicBikes,
      'Sports Scooters': twSpotlightSportsScooters,
      'Kids Bikes': twSpotlightKidsBikes,
    },
    brandImages: {
      'Hero Splendor': twBrandHeroSplendor,
      'Royal Enfield Hunter': twBrandRoyalEnfieldHunter,
      'Bajaj Pulsar': twBrandBajajPulsar,
      'TVS Apache': twBrandTvsApache,
      'Honda Activa': twBrandHondaActiva,
      'Yamaha FZ': twBrandYamahaFz,
      'KTM Duke': twBrandKtmDuke,
      'Suzuki Access': twBrandSuzukiAccess,
      'Hero Glamour': twBrandHeroGlamour,
      'Bajaj Avenger': twBrandBajajAvenger,
      'Royal Enfield Classic': twBrandRoyalEnfieldClassic,
      'TVS Ntorq': twBrandTvsNtorq,
      'Honda Shine': twBrandHondaShine,
      'Yamaha R15': twBrandYamahaR15,
      'Suzuki Gixxer': twBrandSuzukiGixxer,
    },
    promoImages: [twBannerScooterSale, twBannerCruiserCollection],

    // Curated "Rider Deals" row — a specific mix of bikes/scooters and
    // gear (distinct from the 15 sub-category tiles), so this section
    // always shows a real two-wheelers mix instead of falling back to
    // whatever happens to exist in the product DB for this category.
    dealsItems: [
      { label: 'Royal Enfield Hunter 350', image: twDealsHunter350 },
      { label: 'TVS iQube Electric', image: twDealsTvsIqube },
      { label: 'Bajaj Avenger Cruiser', image: twDealsBajajAvenger },
      { label: 'Honda Activa 6G', image: twDealsHondaActiva },
      { label: 'Yamaha FZ Street Bike', image: twDealsYamahaFz },
      { label: 'KTM Duke 390 Adventure', image: twDealsKtmDuke390 },
    ],
    headlines: [
      ['Sports bikes,', 'built for speed.'],
      ['Cruisers for', 'the open road.'],
      ['Adventure bikes,', 'ready for anything.'],
      ['Electric scooters,', 'the smart way to ride.'],
      ['City rides,', 'made smooth.'],
    ],
    descriptions: [
      'High-performance sports bikes engineered for speed, control, and adrenaline.',
      'Comfortable, powerful cruisers built for long, relaxed rides.',
      'Rugged adventure bikes ready to take you off the beaten path.',
      'Eco-friendly electric scooters that make city commutes effortless.',
      'Smooth, fuel-efficient rides built for everyday city commutes.',
    ],
    discounts: [30, 25, 20, 35, 22],
    description: 'Bikes and scooters built for every kind of rider and road.',
    dealsLabel: 'Rider Deals',
    spotlightLabel: 'New Launches',
    promos: [
      { title: 'Scooter Sale', subtitle: 'Up to 30% off electric scooters', ctaLabel: 'Shop Now' },
      { title: 'Cruiser Collection', subtitle: 'Starting at ₹1,12,000', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Sports Bikes', 'Cruiser Bikes', 'Adventure Bikes', 'Commuter Bikes', 'Electric Scooters', 'Scooters', 'Mopeds', 'Off-Road Bikes', 'Café Racers', 'Electric Bikes', 'Touring Bikes', 'Naked Bikes', 'Retro & Classic Bikes', 'Sports Scooters', 'Kids Bikes'],
    brands: ['Hero Splendor', 'Royal Enfield Hunter', 'Bajaj Pulsar', 'TVS Apache', 'Honda Activa', 'Yamaha FZ', 'KTM Duke', 'Suzuki Access', 'Hero Glamour', 'Bajaj Avenger', 'Royal Enfield Classic', 'TVS Ntorq', 'Honda Shine', 'Yamaha R15', 'Suzuki Gixxer'],
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
    sliderImages: [
      sportsSliderOne,
      sportsSliderTwo,
      sportsSliderThree,
      sportsSliderFour,
      sportsSliderFive,
    ],
    shopByCategoryImages: {
      'Cricket Gear': sportsSbcCricket,
      Badminton: sportsSbcBadminton,
      Football: sportsSbcFootball,
      Tennis: sportsSbcTennis,
      'Table Tennis': sportsSbcTableTennis,
      Basketball: sportsSbcBasketball,
      Volleyball: sportsSbcVolleyball,
      'Camping Equipment': sportsSbcCamping,
      'Trekking Gear': sportsSbcTrekking,
      'Cycling Gear': sportsSbcCycling,
      'Swimming Gear': sportsSbcSwimming,
      'Skating Gear': sportsSbcSkating,
      'Fishing Gear': sportsSbcFishing,
      Hockey: sportsSbcHockey,
      Skiing: sportsSbcSkiing,
    },
    spotlightImages: {
      'Cricket Gear': sportsSpotlightCricket,
      Badminton: sportsSpotlightBadminton,
      Football: sportsSpotlightFootball,
      Tennis: sportsSpotlightTennis,
      'Table Tennis': sportsSpotlightTableTennis,
      Basketball: sportsSpotlightBasketball,
      Volleyball: sportsSpotlightVolleyball,
      'Camping Equipment': sportsSpotlightCamping,
      'Trekking Gear': sportsSpotlightTrekking,
      'Cycling Gear': sportsSpotlightCycling,
      'Swimming Gear': sportsSpotlightSwimming,
      'Skating Gear': sportsSpotlightSkating,
      'Fishing Gear': sportsSpotlightFishing,
      Hockey: sportsSpotlightHockey,
      Skiing: sportsSpotlightSkiing,
    },
    brandImages: {
      Dunlop: sportsBrandDunlop,
      Forclaz: sportsBrandForclaz,
      Head: sportsBrandHead,
      Kookaburra: sportsBrandKookaburra,
      'Li-Ning': sportsBrandLiNing,
      Molten: sportsBrandMolten,
      MRF: sportsBrandMrf,
      Nivia: sportsBrandNivia,
      'The North Face': sportsBrandNorthFace,
      Quechua: sportsBrandQuechua,
      Rival: sportsBrandRival,
      SG: sportsBrandSg,
      Spalding: sportsBrandSpalding,
      Wildcraft: sportsBrandWildcraft,
      Yonex: sportsBrandYonex,
    },
    promoImages: [sportsBannerOne, sportsBannerTwo],
    dealsItems: [
      { label: 'Professional Cricket Kit Bag', image: sportsDealsCricketKit },
      { label: 'Badminton Racket Pair with Shuttlecocks', image: sportsDealsBadminton },
      { label: 'Official Size Football', image: sportsDealsFootball },
      { label: '4-Person Camping Tent', image: sportsDealsCampingTent },
      { label: 'Mountain Cycling Helmet', image: sportsDealsHelmet },
      { label: 'Basketball with Pump', image: sportsDealsBasketball },
    ],
    headlines: [
      ['Cricket gear,', 'match ready.'],
      ['Badminton &', 'racket sports.'],
      ['Table tennis', 'excellence.'],
      ['Team sports,', 'game on.'],
      ['Cycling &', 'trekking essentials.'],
    ],
    descriptions: [
      'Bats, balls, and kits for every cricket match, from the backyard to the pitch.',
      'Rackets and shuttlecocks for badminton, tennis, and table tennis.',
      'Premium paddles, balls, and accessories designed for precision, speed, and every winning rally.',
      'Footballs, basketballs, and volleyballs for game day with friends.',
      'Cycles, helmets, and trekking gear for the open trail.',
    ],
    discounts: [30, 25, 20, 35, 22],
    description: 'Everything for cricket, badminton, football, and your next outdoor adventure.',
    dealsLabel: 'Game Day Deals',
    spotlightLabel: "Champion's Choice",
    promos: [
      { title: 'Cricket Season Sale', subtitle: 'Up to 30% off cricket gear', ctaLabel: 'Shop Now' },
      { title: 'Trekking Gear Sale', subtitle: 'Starting at $19', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Cricket Gear', 'Badminton', 'Football', 'Tennis', 'Table Tennis', 'Basketball', 'Volleyball', 'Camping Equipment', 'Trekking Gear', 'Cycling Gear', 'Swimming Gear', 'Skating Gear', 'Fishing Gear', 'Hockey', 'Skiing'],
    brands: ['SG', 'Kookaburra', 'MRF', 'Li-Ning', 'Yonex', 'Nivia', 'Molten', 'Spalding', 'Head', 'Rival', 'Quechua', 'The North Face', 'Wildcraft', 'Dunlop', 'Forclaz'],
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
    sliderImages: [
      booksSliderOne,
      booksSliderTwo,
      booksSliderThree,
      booksSliderFour,
      booksSliderFive,
    ],
    shopByCategoryImages: {
      Fiction: booksSbcFiction,
      Notebooks: booksSbcNotebooks,
      'Pens & Pencils': booksSbcPensPencils,
      "Kids' Books": booksSbcKids,
      'Non-Fiction': booksSbcNonFiction,
      'Art Supplies': booksSbcArt,
      Planners: booksSbcPlanner,
      'Comics & Manga': booksSbcManga,
      Bookmarks: booksSbcBookmark,
      Diaries: booksSbcDiary,
      'Sticky Notes': booksSbcSticky,
      Highlighters: booksSbcHighlighters,
      'File Organizers': booksSbcOrganizer,
      'Greeting Cards': booksSbcCard,
      Calculators: booksSbcCalci,
    },
    spotlightImages: {
      Fiction: booksSpotlightFiction,
      Notebooks: booksSpotlightNotebooks,
      'Pens & Pencils': booksSpotlightPensPencils,
      "Kids' Books": booksSpotlightKids,
      'Non-Fiction': booksSpotlightNonFiction,
      'Art Supplies': booksSpotlightArt,
      Planners: booksSpotlightPlanner,
      'Comics & Manga': booksSpotlightManga,
      Bookmarks: booksSpotlightBookmark,
      Diaries: booksSpotlightDiary,
      'Sticky Notes': booksSpotlightSticky,
      Highlighters: booksSpotlightHighlighters,
      'File Organizers': booksSpotlightOrganizer,
      'Greeting Cards': booksSpotlightCard,
      Calculators: booksSpotlightCalci,
    },
    brandImages: {
      Penguin: booksBrandPenguin,
      HarperCollins: booksBrandHarper,
      Classmate: booksBrandClassmate,
      Camlin: booksBrandCamlin,
      Parker: booksBrandParker,
      'Faber-Castell': booksBrandFaber,
      Staedtler: booksBrandStaedtler,
      'Amar Chitra Katha': booksBrandAmar,
      Scholastic: booksBrandScholastic,
      Oxford: booksBrandOxford,
      Natraj: booksBrandNatraj,
      Doms: booksBrandDoms,
      Reynolds: booksBrandReynolds,
      Cello: booksBrandCello,
      Navneet: booksBrandNavneet,
    },
    promoImages: [booksBannerOne, booksBannerTwo],
    dealsItems: [
      { label: 'Bestselling Fiction Bundle', image: booksDealsFiction },
      { label: 'Hardcover Ruled Notebook Set', image: booksDealsNotebook },
      { label: 'Premium Gel Pen Pack', image: booksDealsPen },
      { label: 'Illustrated Kids Storybook Set', image: booksDealsStorybook },
      { label: 'Daily Planner & Journal', image: booksDealsDailyPlanner },
      { label: 'Watercolor Art Supply Kit', image: booksDealsWatercolor },
    ],
    headlines: [
      ['Fiction that', 'pulls you in.'],
      ['Notebooks for', 'every idea.'],
      ['Pens that', 'write smooth.'],
      ["Kids' books,", 'story time.'],
      ['Art supplies,', 'get creative.'],
    ],
    descriptions: [
      'Fiction and bestsellers that pull you into a whole new world.',
      'Notebooks and journals ready for whatever idea comes next.',
      'Pens and pencils built for smooth, comfortable writing.',
      "Illustrated storybooks that make story time a favorite part of the day.",
      'Art and craft supplies that bring every creative idea to life.',
    ],
    discounts: [25, 20, 15, 30, 18],
    description: 'Stories to get lost in and tools to bring your ideas to life.',
    dealsLabel: 'Reader Deals',
    spotlightLabel: 'New Releases',
    promos: [
      { title: 'Reader Sale', subtitle: 'Up to 30% off bestsellers', ctaLabel: 'Shop Now' },
      { title: 'Stationery Edit', subtitle: 'Starting at $4', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Fiction', 'Notebooks', 'Pens & Pencils', "Kid's Books", 'Non-Fiction', 'Art Supplies', 'Planners', 'Comics & Manga', 'Book Marks', 'Diary', 'Sticky Notes', 'Highlighters', 'File Organizers', 'Greeting Cards', 'Calculators'],
    brands: ['Penguin', 'HarperCollins', 'Classmate', 'Camlin', 'Parker', 'Faber-Castell', 'Staedtler', 'Amar Chitra Katha', 'Scholastic', 'Oxford', 'Natraj', 'Doms', 'Reynolds', 'Cello', 'Navneet'],
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
    // "Featured Brands" row — keyed by real furniture-retailer brand name,
    // each mapped to its actual locally-hosted logo/storefront image from
    // src/assets/images/categories/furniture/featuredBrands/.
    brandImages: {
      Durian: brandDurian,
      Fabindia: brandFabindia,
      'Fendi Casa': brandFendiCasa,
      'Godrej Interio': brandGodrejInterio,
      'Haus Luxuriant': brandHausLuxuriant,
      'Herman Miller': brandHermanMiller,
      IKEA: brandIkea,
      Kartell: brandKartell,
      Nilkamal: brandNilkamal,
      Pepperfry: brandPepperfry,
      'Roche Bobois': brandRocheBobois,
      Steelcase: brandSteelcase,
      'Urban Ladder': brandUrbanLadder,
      Wakefit: brandWakefit,
      'Wooden Street': brandWoodenStreet,
    },
    headlines: [
      ['Sofas built', 'for comfort.'],
      ['Beds for', 'better sleep.'],
      ['Desks & chairs', 'for focused work.'],
      ['Furnish every', 'room.'],
      ['Your space,', 'your style.'],
    ],
    descriptions: [
      'Plush, durable sofas designed to be the centerpiece of your living room.',
      'Sturdy bed frames and headboards built for restful, uninterrupted sleep.',
      'Ergonomic desks and chairs that keep you comfortable through long work days.',
      'Everything you need to furnish every room, from the living room to the study.',
      'Furniture that reflects your taste, tailored to fit your space perfectly.',
    ],
    discounts: [45, 35, 30, 25, 20],
    description: 'Furniture that balances comfort, durability, and everyday style.',
    dealsLabel: 'Furnish Your Home Deals',
    spotlightLabel: 'Designer Spotlights',
    promos: [
      { title: 'Furnish & Save', subtitle: 'Up to 45% off furniture', ctaLabel: 'Shop Now' },
      { title: 'Desk Setup Picks', subtitle: 'Starting at $79', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Sofas', 'Beds', 'Desks & Chairs', 'Storage Units', 'Dining Sets', 'Bookshelves', 'TV Units', 'Outdoor Furniture', 'Wardrobes', 'Recliners', 'Coffee Tables', 'Bean Bags', 'Shoe Racks', 'Bar Stools', 'Kids Furniture'],
    brands: ['Durian', 'Fabindia', 'Fendi Casa', 'Godrej Interio', 'Haus Luxuriant', 'Herman Miller', 'IKEA', 'Kartell', 'Nilkamal', 'Pepperfry', 'Roche Bobois', 'Steelcase', 'Urban Ladder', 'Wakefit', 'Wooden Street'],
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
    dealsItems: [
      { label: "Men's Chronograph Wrist Watch", image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=900&q=80' },
      { label: "Women's Layered Statement Necklace", image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=80' },
      { label: "Men's Bifold Leather Wallet", image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=80' },
      { label: "Women's Structured Handbag", image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=900&q=80' },
      { label: "Men's Polarized Aviator Sunglasses", image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&q=80' },
      { label: "Women's Pearl Drop Earrings", image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&q=80' },
    ],
    headlines: [
      ["Men's watches,", 'built to last.'],
      ["Women's jewelry,", 'new arrivals.'],
      ["Men's essentials,", 'wallets & belts.'],
      ["Women's bags,", 'for every day.'],
      ['Finish the', 'look.'],
    ],
    descriptions: [
      "Men's watches built with craftsmanship that lasts for years.",
      "Women's jewelry with fresh statement pieces added every season.",
      "Men's everyday essentials — wallets, belts, and more.",
      "Women's bags built to carry your everyday essentials in style.",
      'Small accessories that make a big difference to any outfit.',
    ],
    discounts: [40, 30, 25, 35, 20],
    description: 'Bags, watches, and the small details that finish every outfit.',
    dealsLabel: 'Accessory Deals',
    spotlightLabel: 'Editor Picks',
    promos: [
      { title: 'Accessory Sale', subtitle: 'Up to 40% off bags & watches', ctaLabel: 'Shop Now' },
      { title: 'Sunglasses Edit', subtitle: 'Starting at $24', ctaLabel: 'Explore Now' },
    ],
    tileGroups: [
      {
        label: 'Men',
        tiles: ['Watches', 'Wallets', 'Belts', 'Sunglasses', 'Ties & Cufflinks', 'Cufflinks & Tie Pins', 'Caps', 'Bags', 'Keychains', 'Phone Accessories', 'Bracelets', 'Rings', 'Gloves', 'Umbrellas', 'Card Holders'],
      },
      {
        label: 'Women',
        tiles: ['Handbags', 'Jewelry', 'Sunglasses', 'Scarves', 'Hair Accessories', 'Watches', 'Belts', 'Clutches', 'Brooches & Pins', 'Hair Clips', 'Bracelets', 'Earrings', 'Necklaces', 'Anklets', 'Umbrellas'],
      },
    ],
    tiles: ['Bags', 'Watches', 'Wallets', 'Belts', 'Sunglasses', 'Jewelry', 'Hats & Caps', 'Scarves', 'Hair Accessories', 'Ties & Cufflinks', 'Keychains', 'Phone Accessories', 'Umbrellas', 'Gloves', 'Brooches & Pins'],
    brands: ['Fossil', 'Titan', 'Ray-Ban', 'Fastrack', 'Casio', 'Michael Kors', 'Tommy Hilfiger', 'Wildcraft', 'American Tourister', 'Skybags', 'Da Milano', 'Baggit', 'Woodland', 'Timex', 'Guess'],
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
    // Curated deals — a deliberate Men's/Women's mix so the "Wardrobe
    // Deals" row itself shows both, not just a unisex/men-leaning set.
    dealsItems: [
      { label: "Men's Oversized Cotton Hoodie", image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80' },
      { label: "Women's Wrap Midi Dress", image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80' },
      { label: "Men's Slim-Fit Chinos", image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80' },
      { label: "Women's Ribbed Knit Sweater", image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80' },
      { label: "Men's Quilted Bomber Jacket", image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&q=80' },
      { label: "Women's High-Rise Denim Jeans", image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&q=80' },
    ],
    headlines: [
      ["Men's wear,", 'everyday essentials.'],
      ["Women's edit,", 'new this season.'],
      ["Men's layers", 'for every season.'],
      ["Women's dresses", 'for every occasion.'],
      ['Fits that', 'just work.'],
    ],
    descriptions: [
      "Men's wardrobe essentials you will reach for every single day.",
      "Women's styles refreshed with new arrivals every season.",
      "Men's jackets and layers built to keep you comfortable through every season.",
      "Women's dresses that take you from casual days to dressed-up nights.",
      'Considered basics and fits that just work, for everyone.',
    ],
    discounts: [35, 30, 25, 40, 20],
    description: "Men's and women's wardrobe essentials, considered layers, built to wear in, not out.",
    dealsLabel: 'Wardrobe Deals',
    spotlightLabel: 'New This Week',
    promos: [
      { title: "Men's Wardrobe Sale", subtitle: 'Up to 35% off basics', ctaLabel: 'Shop Now' },
      { title: "Women's Outerwear Picks", subtitle: 'Starting at $39', ctaLabel: 'Explore Now' },
    ],
    // "Shop by Category" now renders as two distinct grouped rows — one
    // purely Men's sub-categories, one purely Women's — instead of a single
    // mixed row. Each list is ordered naturally for its own department, not
    // mirrored 1:1 against the other, so it doesn't read as a mechanical
    // alternating pattern.
    tileGroups: [
      {
        label: 'Men',
        tiles: ["T-Shirts", 'Jeans', 'Formal Shirts', 'Hoodies', 'Track Pants', 'Ethnic Wear', 'Blazers', 'Shorts', 'Activewear', 'Innerwear', 'Thermal Wear', 'Loungewear', 'Polo Shirts', 'Jackets', 'Vests'],
      },
      {
        label: 'Women',
        tiles: ['Tops', 'Dresses', 'Sweaters', 'Ethnic Wear', 'Skirts', 'Jumpsuits', 'Leggings', 'Co-ord Sets', 'Sarees', 'Kurtis', 'Nightwear', 'Blazers', 'Activewear', 'Innerwear', 'Jackets'],
      },
    ],
    // Flat combined list — still used by other sections on this page
    // (Trending, Featured Brands) that expect a single tile list.
    tiles: [
      "T-Shirts", 'Jeans', 'Formal Shirts', 'Hoodies', 'Track Pants', 'Ethnic Wear', 'Blazers', 'Shorts', 'Activewear', 'Innerwear', 'Thermal Wear', 'Loungewear', 'Polo Shirts', 'Jackets', 'Vests',
      'Tops', 'Dresses', 'Sweaters', 'Skirts', 'Jumpsuits', 'Leggings', 'Co-ord Sets', 'Sarees', 'Kurtis', 'Nightwear',
    ],
    brands: ["Levi's", 'Nike', 'Adidas', 'Puma', 'H&M', 'Zara', 'Uniqlo', 'Gap', 'US Polo Assn', 'Jack & Jones', 'Pepe Jeans', 'Wrangler', 'Lee', 'Superdry', 'Roadster'],
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
    sliderImages: [
      fitnessSliderOne,
      fitnessSliderTwo,
      fitnessSliderThree,
      fitnessSliderFour,
      fitnessSliderFive,
    ],
    shopByCategoryImages: {
      'Water Bottles': fitnessSbcWaterBottle,
      'Yoga Mats': fitnessSbcYogaMats,
      'Resistance Bands': fitnessSbcBands,
      Dumbbells: fitnessSbcDumbbells,
      'Foam Rollers': fitnessSbcRollers,
      'Gym Bags': fitnessSbcGymbags,
      'Jump Ropes': fitnessSbcRopes,
      'Fitness Trackers': fitnessSbcTrackers,
      Treadmills: fitnessSbcTreadmills,
      Kettlebells: fitnessSbcKettlebells,
      'Pull-Up Bars': fitnessSbcPullup,
      'Massage Guns': fitnessSbcGuns,
      'Protein Shakers': fitnessSbcShakers,
      'Ab Rollers': fitnessSbcAbRollers,
      'Gym Gloves': fitnessSbcGloves,
    },
    spotlightImages: {
      'Water Bottles': fitnessSpotlightWaterBottle,
      'Yoga Mats': fitnessSpotlightYogaMats,
      'Resistance Bands': fitnessSpotlightBands,
      Dumbbells: fitnessSpotlightDumbbells,
      'Foam Rollers': fitnessSpotlightRollers,
      'Gym Bags': fitnessSpotlightGymbags,
      'Jump Ropes': fitnessSpotlightRopes,
      'Fitness Trackers': fitnessSpotlightTrackers,
      Treadmills: fitnessSpotlightTreadmills,
      Kettlebells: fitnessSpotlightKettlebells,
      'Pull-Up Bars': fitnessSpotlightPullup,
      'Massage Guns': fitnessSpotlightGuns,
      'Protein Shakers': fitnessSpotlightShakers,
      'Ab Rollers': fitnessSpotlightAbRollers,
      'Gym Gloves': fitnessSpotlightGloves,
    },
    brandImages: {
      HRX: fitnessBrandHrx,
      Cultsport: fitnessBrandCultsport,
      Boldfit: fitnessBrandBoldfit,
      Domyos: fitnessBrandDomyos,
      Kore: fitnessBrandKore,
      Everlast: fitnessBrandEverlast,
      Aurion: fitnessBrandAurion,
      Strauss: fitnessBrandStrauss,
      Fitkit: fitnessBrandFitkit,
      GoFit: fitnessBrandGofit,
      Decathlon: fitnessBrandDecathlon,
      Reebok: fitnessBrandReebok,
      'Under Armour': fitnessBrandUnderArmour,
      Cosco: fitnessBrandCosco,
      Nivia: fitnessBrandNivia,
    },
    promoImages: [fitnessBannerOne, fitnessBannerTwo],
    headlines: [
      ['Show up,', 'every day.'],
      ['Gear for the', 'grind.'],
      ['Recovery', 'matters too.'],
      ['Train', 'anywhere.'],
      ['Track every', 'rep & mile.'],
    ],
    descriptions: [
      'Gear that helps you show up and stay consistent every day.',
      'Equipment built to keep up with the daily grind.',
      'Recovery tools that help your body rest and rebuild.',
      'Portable gear that lets you train anywhere, anytime.',
      'Fitness trackers and smartwatches that measure every rep and mile.',
    ],
    dealsItems: [
      { label: 'Adjustable Dumbbell Set', image: fitnessDealsDumbbell },
      { label: 'Foam Roller Recovery Kit', image: fitnessDealsFoamRoller },
      { label: 'Foldable Treadmill', image: fitnessDealsFoldable },
      { label: 'Cast Iron Kettlebell', image: fitnessDealsIron },
      { label: 'Fitness Tracker Band', image: fitnessDealsFitness },
      { label: 'Gym Duffel Bag', image: fitnessDealsBag },
    ],
    discounts: [30, 25, 20, 35, 18],
    description: 'Equipment built for consistency — at home, at the gym, or on the trail.',
    dealsLabel: 'Training Deals',
    spotlightLabel: 'Athlete Favorites',
    promos: [
      { title: 'Training Gear Sale', subtitle: 'Up to 30% off equipment', ctaLabel: 'Shop Now' },
      { title: 'Recovery Essentials', subtitle: 'Starting at $14', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Water Bottles', 'Yoga Mats', 'Resistance Bands', 'Dumbbells', 'Foam Rollers', 'Gym Bags', 'Jump Ropes', 'Fitness Trackers', 'Treadmills', 'Kettlebells', 'Pull-Up Bars', 'Massage Guns', 'Protein Shakers', 'Ab Rollers', 'Gym Gloves'],
    brands: ['HRX', 'Cultsport', 'Boldfit', 'Domyos', 'Kore', 'Everlast', 'Aurion', 'Strauss', 'Fitkit', 'GoFit', 'Decathlon', 'Cosco', 'Reebok', 'Under Armour', 'Nivia'],
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
    sliderImages: [
      officeSliderOne,
      officeSliderTwo,
      officeSliderThree,
      officeSliderFour,
      officeSliderFive,
    ],
    shopByCategoryImages: {
      'Ergonomic Chairs': officeSbcErgonomic,
      'Executive Chairs': officeSbcExecutive,
      'Office Desks': officeSbcDesk,
      'Standing Desks': officeSbcStanding,
      'Filing Cabinets': officeSbcFiling,
      Bookshelves: officeSbcBookshelves,
      Whiteboards: officeSbcWhiteboard,
      'Desk Organizers': officeSbcOffice,
      'Monitor Stands': officeSbcMonitor,
      'Laptop Stands': officeSbcLaptop,
      Footrests: officeSbcFootrests,
      'Desk Lamps': officeSbcLamps,
      'Cable Management Boxes': officeSbcCable,
      'Pen Holders': officeSbcPen,
      'Document Trays': officeSbcTrays,
    },
    spotlightImages: {
      'Ergonomic Chairs': officeSpotlightErgonomic,
      'Executive Chairs': officeSpotlightExecutive,
      'Office Desks': officeSpotlightDesk,
      'Standing Desks': officeSpotlightStanding,
      'Filing Cabinets': officeSpotlightFiling,
      Bookshelves: officeSpotlightBookshelves,
      Whiteboards: officeSpotlightWhiteboard,
      'Desk Organizers': officeSpotlightOffice,
      'Monitor Stands': officeSpotlightMonitor,
      'Laptop Stands': officeSpotlightLaptop,
      Footrests: officeSpotlightFootrests,
      'Desk Lamps': officeSpotlightLamps,
      'Cable Management Boxes': officeSpotlightCable,
      'Pen Holders': officeSpotlightPen,
      'Document Trays': officeSpotlightTrays,
    },
    brandImages: {
      Adarsh: officeBrandAdarsh,
      Bantex: officeBrandBantex,
      Bluebell: officeBrandBluebell,
      Deli: officeBrandDeli,
      Durian: officeBrandDurian,
      Featherlite: officeBrandFeatherlite,
      Fellowes: officeBrandFellowes,
      'Godrej Interio': officeBrandGodrej,
      'Nilkamal Storage': officeBrandNilkamalStorage,
      Nilkamal: officeBrandNilkamal,
      Solo: officeBrandSolo,
      Spacewood: officeBrandSpacewood,
      Steelcase: officeBrandSteelcase,
      Sundaram: officeBrandSundaram,
      'VJ Interior': officeBrandVj,
    },
    promoImages: [officeBannerOne, officeBannerTwo],
    dealsItems: [
      { label: 'Adjustable Monitor Arm', image: officeDealsAdjustable },
      { label: 'Cable Management Box', image: officeDealsCableManagement },
      { label: 'Ergonomic Mesh Office Chair', image: officeDealsErgonomic },
      { label: 'LED Desk Lamp', image: officeDealsLedDesk },
      { label: 'Magnetic Whiteboard', image: officeDealsWhiteboard },
      { label: 'Wireless Keyboard & Mouse Combo', image: officeDealsWirelessKm },
    ],
    headlines: [
      ['Chairs built', 'for long days.'],
      ['Desks that', 'mean business.'],
      ['Storage that', 'stays organized.'],
      ['Boards for', 'better ideas.'],
      ['Small tools,', 'big difference.'],
    ],
    descriptions: [
      'Ergonomic and executive chairs designed to support you through every long workday.',
      'Office and standing desks built for a setup that actually works for you.',
      'Filing cabinets and bookshelves that keep your workspace clutter-free and organized.',
      'Whiteboards and desk organizers that help every idea and item find its place.',
      'Desk lamps, stands, and holders — the small essentials that complete a great setup.',
    ],
    discounts: [25, 30, 20, 35, 15],
    description: 'Desk setups, notebooks, and the small tools that keep focused work flowing.',
    dealsLabel: 'Workspace Deals',
    spotlightLabel: 'Workspace Upgrade Picks',
    promos: [
      { title: 'Ergonomic Chair Sale', subtitle: 'Up to 35% off office chairs', ctaLabel: 'Shop Now' },
      { title: 'Desk Setup Essentials', subtitle: 'Starting at $29', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Ergonomic Chairs', 'Executive Chairs', 'Office Desks', 'Standing Desks', 'Filing Cabinets', 'Bookshelves', 'Whiteboards', 'Desk Organizers', 'Monitor Stands', 'Laptop Stands', 'Footrests', 'Desk Lamps', 'Cable Management Boxes', 'Pen Holders', 'Document Trays'],
    brands: ['Godrej Interio', 'Featherlite', 'Nilkamal', 'Steelcase', 'Durian', 'Spacewood', 'VJ Interior', 'Bluebell', 'Adarsh', 'Solo', 'Bantex', 'Sundaram', 'Nilkamal Storage', 'Fellowes', 'Deli'],
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
  descriptions: [
    'Explore a broad collection curated with care.',
    'New curated picks added every day.',
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