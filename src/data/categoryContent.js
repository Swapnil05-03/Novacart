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
    dealsItems: [
      { label: '128GB 5G Smartphone', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900&q=80' },
      { label: 'Pro Max Camera Phone', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&q=80' },
      { label: 'AMOLED Display Phone', image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=900&q=80' },
      { label: 'Fast-Charging Power Bank', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=80' },
      { label: 'Wireless Earbuds', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900&q=80' },
      { label: 'Tempered Glass Screen Guard', image: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?w=900&q=80' },
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
      ["Men's grooming,", 'made simple.'],
      ["Women's makeup,", 'must-haves.'],
      ["Men's skincare,", 'daily routine.'],
      ["Women's haircare,", 'reinvented.'],
      ['Fragrance for', 'every mood.'],
    ],
    descriptions: [
      "Men's grooming essentials for a routine that actually works.",
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
    dealsItems: [
      { label: 'Noise-Cancelling Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80' },
      { label: '15.6" Slim Laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80' },
      { label: 'Bluetooth Party Speaker', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80' },
      { label: 'Smartwatch with GPS', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=900&q=80' },
      { label: 'Mirrorless Camera Kit', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&q=80' },
      { label: '10000mAh Power Bank', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80' },
    ],
    headlines: [
      ['Audio gear,', 'up to 75% off.'],
      ['Laptops &', 'more.'],
      ['Next-level', 'performance.'],
      ['Smartwatches', 'for every day.'],
      ['Cameras that', 'capture it all.'],
    ],
    descriptions: [
      'Headphones and speakers with deep discounts on top brands.',
      'Laptops and computing gear built for work, study, and play.',
      'Devices engineered for next-level speed and performance.',
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
    tiles: ['Headphones', 'Laptops', 'Smartwatches', 'Speakers', 'Cameras', 'Power Banks', 'Smart Home', 'Gaming Gear', 'Tablets', 'Monitors', 'Printers', 'Routers', 'External Drives', 'Webcams', 'Drones'],
    brands: ['Sony', 'JBL', 'Bose', 'boAt', 'Samsung', 'LG', 'Dell', 'HP', 'Lenovo', 'Apple', 'Sennheiser', 'Logitech', 'ASUS', 'Acer', 'Canon'],
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
    dealsItems: [
      { label: 'Embroidered Cushion Cover Set', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&q=80' },
      { label: 'Ceramic Vase Duo', image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=900&q=80' },
      { label: 'Under-Bed Storage Box', image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=900&q=80' },
      { label: 'Pendant Ceiling Light', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80' },
      { label: 'Handwoven Wall Tapestry', image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=900&q=80' },
      { label: 'Cotton Bedsheet Set', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80' },
    ],
    headlines: [
      ['Revamp your', 'space in style.'],
      ['Lighting that', 'sets the mood.'],
      ['Storage made', 'simple.'],
      ['A home you', 'love coming back to.'],
      ['Bedroom', 'refresh.'],
    ],
    descriptions: [
      'Decor pieces that give any room an instant style upgrade.',
      'Lighting fixtures that set the mood for every moment.',
      'Smart storage solutions that keep clutter out of sight.',
      'Small touches that make a house feel like home.',
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
    brands: ['IKEA', 'Urban Ladder', 'Pepperfry', 'Home Centre', 'Fabindia', 'Bombay Dyeing', 'Spaces', "D'décor", 'Portico', 'Wakefit', 'Nilkamal', 'Home Town', 'Evok', 'Godrej Interio', 'Durian'],
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
    dealsItems: [
      { label: 'Assorted Snacks Combo Pack', image: 'https://images.unsplash.com/photo-1543168256-418811576931?w=900&q=80' },
      { label: 'Multi-Surface Cleaner Pack', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=900&q=80' },
      { label: 'Herbal Shampoo Combo', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=80' },
      { label: 'Baby Care Essentials Kit', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80' },
      { label: 'Premium Basmati Rice 5kg', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=900&q=80' },
      { label: 'Dishwashing Liquid Combo', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80' },
    ],
    headlines: [
      ['Pantry', 'staples.'],
      ['Cleaning made', 'simple.'],
      ['Everyday', 'essentials.'],
      ['Fresh pantry', 'staples.'],
      ['Home care', 'essentials.'],
    ],
    descriptions: [
      'Pantry staples to keep your kitchen always stocked.',
      'Cleaning supplies that make tidying up simple and quick.',
      'Everyday essentials for the whole household, delivered with care.',
      'Fresh groceries and staples for your kitchen shelf.',
      'Home care essentials that keep every corner spotless.',
    ],
    discounts: [20, 30, 15, 25, 18],
    description: 'Everyday groceries and household essentials, delivered with care.',
    dealsLabel: 'Pantry Deals',
    spotlightLabel: 'Everyday Picks',
    promos: [
      { title: 'Pantry Refill Sale', subtitle: 'Up to 30% off groceries', ctaLabel: 'Shop Now' },
      { title: 'Cleaning Essentials', subtitle: 'Starting at $5', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Snacks', 'Beverages', 'Cleaning Supplies', 'Personal Care', 'Baby Care', 'Pet Supplies', 'Kitchen Essentials', 'Storage Containers', 'Breakfast Cereals', 'Spices & Masalas', 'Dairy & Bakery', 'Laundry Care', 'Paper Products', 'Air Fresheners', 'Disposables'],
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
    tiles: ['Cleaning Accessories', 'Tyre & Rim Care', 'Helmets', 'Vacuum Cleaners', 'Car Covers', 'Seat Covers', 'Dashboard Accessories', 'Air Fresheners', 'Car Chargers', 'Floor Mats', 'Car Perfumes', 'Steering Covers', 'Tool Kits', 'Jump Starters', 'Dash Cams'],
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
    dealsItems: [
      { label: 'Bestselling Fiction Bundle', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80' },
      { label: 'Hardcover Ruled Notebook Set', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80' },
      { label: 'Premium Gel Pen Pack', image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&q=80' },
      { label: 'Illustrated Kids Storybook Set', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=900&q=80' },
      { label: 'Daily Planner & Journal', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=80' },
      { label: 'Watercolor Art Supply Kit', image: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=900&q=80' },
    ],
    headlines: [
      ['Refill your', 'shelf.'],
      ['Notebooks for', 'every idea.'],
      ['Bestsellers', 'and more.'],
      ['Ideas start', 'on paper.'],
      ['Read more,', 'learn more.'],
    ],
    descriptions: [
      'Fresh titles to refill your shelf with new stories.',
      'Notebooks and journals ready for whatever idea comes next.',
      'Bestsellers and reader favorites, all in one place.',
      'Stationery essentials where every great idea begins.',
      'Books that help you read more and learn more.',
    ],
    discounts: [25, 20, 15, 30, 18],
    description: 'Stories to get lost in and tools to bring your ideas to life.',
    dealsLabel: 'Reader Deals',
    spotlightLabel: 'New Releases',
    promos: [
      { title: 'Reader Sale', subtitle: 'Up to 30% off bestsellers', ctaLabel: 'Shop Now' },
      { title: 'Stationery Edit', subtitle: 'Starting at $4', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Fiction', 'Notebooks', 'Pens & Pencils', "Kids' Books", 'Non-Fiction', 'Art Supplies', 'Planners', 'Comics & Manga', 'Academic Books', 'Self-Help', 'Sticky Notes', 'Highlighters', 'File Organizers', 'Greeting Cards', 'Calculators'],
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
    dealsItems: [
      { label: 'Adjustable Dumbbell Set', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80' },
      { label: 'Foam Roller Recovery Kit', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80' },
      { label: 'Foldable Treadmill', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80' },
      { label: 'Cast Iron Kettlebell', image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=900&q=80' },
      { label: 'Fitness Tracker Band', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80' },
      { label: 'Gym Duffel Bag', image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=900&q=80' },
    ],
    headlines: [
      ['Show up,', 'every day.'],
      ['Gear for the', 'grind.'],
      ['Recovery', 'matters too.'],
      ['Train', 'anywhere.'],
      ['Stronger', 'every day.'],
    ],
    descriptions: [
      'Gear that helps you show up and stay consistent every day.',
      'Equipment built to keep up with the daily grind.',
      'Recovery tools that help your body rest and rebuild.',
      'Portable gear that lets you train anywhere, anytime.',
      'Everyday equipment for a stronger, healthier you.',
    ],
    discounts: [30, 25, 20, 35, 18],
    description: 'Equipment built for consistency — at home, at the gym, or on the trail.',
    dealsLabel: 'Training Deals',
    spotlightLabel: 'Athlete Favorites',
    promos: [
      { title: 'Training Gear Sale', subtitle: 'Up to 30% off equipment', ctaLabel: 'Shop Now' },
      { title: 'Recovery Picks', subtitle: 'Starting at $14', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Water Bottles', 'Yoga Mats', 'Resistance Bands', 'Dumbbells', 'Foam Rollers', 'Gym Bags', 'Jump Ropes', 'Fitness Trackers', 'Treadmills', 'Kettlebells', 'Pull-Up Bars', 'Massage Guns', 'Protein Shakers', 'Ab Rollers', 'Gym Gloves'],
    brands: ['Nike', 'Adidas', 'Reebok', 'Under Armour', 'Decathlon', 'Puma', 'HRX', 'Cultsport', 'Boldfit', 'Cosco', 'Wilson', 'Yonex', 'Speedo', 'Domyos', 'Kore'],
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
    dealsItems: [
      { label: 'Ergonomic Mesh Office Chair', image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=900&q=80' },
      { label: 'Wireless Keyboard & Mouse Combo', image: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=900&q=80' },
      { label: 'Adjustable Laptop Stand', image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=900&q=80' },
      { label: 'LED Desk Lamp', image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&q=80' },
      { label: 'Cable Management Organizer Kit', image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&q=80' },
      { label: 'Whiteboard with Marker Set', image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=900&q=80' },
    ],
    headlines: [
      ['Tools for', 'focused work.'],
      ['A desk that', 'works for you.'],
      ['Write it', 'down.'],
      ['Built for', 'long days.'],
      ['Work smarter,', 'not harder.'],
    ],
    descriptions: [
      'Tools that help you stay focused through the workday.',
      'Desk setups designed around the way you actually work.',
      'Notebooks and pens for jotting down every idea.',
      'Office chairs and gear built to last through long days.',
      'Smart accessories that help you work smarter, not harder.',
    ],
    discounts: [25, 30, 20, 35, 15],
    description: 'Desk setups, notebooks, and the small tools that keep focused work flowing.',
    dealsLabel: 'Workspace Deals',
    spotlightLabel: 'Desk Setup Picks',
    promos: [
      { title: 'Workspace Sale', subtitle: 'Up to 35% off desk setups', ctaLabel: 'Shop Now' },
      { title: 'Stationery Picks', subtitle: 'Starting at $6', ctaLabel: 'Explore Now' },
    ],
    tiles: ['Notebooks', 'Desk Organizers', 'Keyboards', 'Pens', 'Lighting', 'Monitor Stands', 'Cable Organizers', 'Desk Mats', 'Office Chairs', 'Whiteboards', 'Staplers', 'File Folders', 'Sticky Notes', 'Desk Calendars', 'Laptop Stands'],
    brands: ['Parker', 'Faber-Castell', 'Camlin', 'Staples', 'Godrej Interio', 'Featherlite', 'Nilkamal', 'Cello', 'Reynolds', 'Classmate', 'Logitech', 'HP', 'Dell', 'Lenovo', 'Xerox'],
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