import { Routes, Route } from "react-router-dom";
import Layout from "./layout";

// ADMIN
import AdminLayout from "./pages/ADMIN/AdminLayout";
import Dashboard from "./pages/ADMIN/Dashboard";
import AdminProducts from "./pages/ADMIN/AdminProducts";
import DynamicCategory from "./pages/ADMIN/DynamicCategory";

// Other Pages
import CategoryPage from "./pages/CategoryPage";
import CategoryProductDetail from "./pages/CategoryProductDetail";
import Account from "./components/watch/Account/Account";
import Home from "./pages/home";
import ScrollToTopButton from "./components/watch/ScrollToTopButton";
import Support from "./pages/Support";

// iPhone
import Alliphones from "./pages/phone/Alliphones";
import Phone17 from "./pages/phone/iphone17";
import Phone16 from "./pages/phone/iphone16";
import Phone15 from "./pages/phone/iphone15";
import PhoneAir from "./pages/phone/iphone-air";
import PhoneDetail from "./components/watch/phone/iphonesDetail";

// MacBook
import AllMacbooks from "./pages/mac/allmacbook";
import MacbookAir from "./pages/mac/macbookair";
import MacbookPro from "./pages/mac/macbookpro";
import MacbookNeo from "./pages/mac/macbookneo";
import MacbookDetail from "./components/watch/mac/MacDetail";

// iPad
import AlliPad from "./pages/ipad/Allipad";
import IpadPro from "./pages/ipad/ipad-pro";
import IpadAir from "./pages/ipad/ipad-air";
import IpadMini from "./pages/ipad/ipad-mini";
import Ipadbase from "./pages/ipad/ipad-base";
import IpadDetail from "./components/watch/ipad/IpadDetail";

// Watch
import AllWatches from "./pages/watch/Allwatches";
import Series11 from "./pages/watch/Series11";
import Ultra2 from "./pages/watch/Ultra2";
import WatchSE from "./pages/watch/WatchSE";
import WatchDetail from "./components/watch/WatchDetail";

// AirPods
import Airpods2 from "./pages/airpod/Airpods2";
import Airpods3 from "./pages/airpod/Airpods3";
import Airpods4 from "./pages/airpod/Airpods4";
import AirpodsMax from "./pages/airpod/AirpodsMax";
import Allairpods from "./pages/airpod/Allairpods";
import AirpodsDetail from "./components/watch/airpods/AirpodsDetail";

// Display
import AllDisplay from "./pages/display/AllDisplay";
import DisplayStudio from "./pages/display/DisplayStudio";
import DisplayXDR from "./pages/display/displayXDR";
import DisplayDetail from "./components/watch/display/DisplayDetail";

// Vision
import VisionM5 from "./pages/vision/visionM5";
import VisionM2 from "./pages/vision/visionm2";
import AllVision from "./pages/vision/Allvision";
import VisionDetail from "./components/watch/vision/VisionDetail";

// Accessories
import AllAccessories from "./pages/Accessories/Allaccessories";
import Keyboards from "./pages/Accessories/Keyboards";
import MagicKeyboard from "./pages/Accessories/MagickeyboardTouch";
import MagicKeyboardTouch from "./pages/Accessories/MagickeyboardTouch";
import Mouse from "./pages/Accessories/Mouse";
import Trackpad from "./pages/Accessories/Trackpad";
import ApplePencil from "./pages/Accessories/ApplePencil";
import PowerAdapter from "./pages/Accessories/PowerAdapter";
import AccessoriesDetail from "./components/watch/accessories/AccessoriesDetail";

// TV
import AllTv from "./pages/apple TV/Alltv";
import AppleTvProduct from "./pages/apple TV/AppleTv";
import TvRemote from "./pages/apple TV/Tvremote";
import TvDetail from "./components/watch/AppleTV/TvDetail";


// scroll
import ScrollToTop from "./components/watch/ScrollToTop";

// 404
import Notfound from "./notfound";

function App() {
  const STORAGE_PRODUCTS = "ispectre_products";

  if (!localStorage.getItem(STORAGE_PRODUCTS)) {
    const initialProducts = [
      { id: "1", name: "iPhone 17 Pro", price: 2499, category: "iphone", img: "https://images.official-apple-assets..." },
      { id: "2", name: "MacBook Pro M5", price: 3499, category: "macbook", img: "https://images.official-apple-assets..." }
    ];
    localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(initialProducts));
  }

  return (
    <>
                  <ScrollToTop />

      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />

          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/category/:categoryName/:id" element={<CategoryProductDetail />} />

          {/* İPHONE */}
          <Route path="/iphone" element={<Alliphones />} />
          <Route path="/iphone17" element={<Phone17 />} />
          <Route path="/iphone16" element={<Phone16 />} />
          <Route path="/iphone15" element={<Phone15 />} />
          <Route path="/iphone-air" element={<PhoneAir />} />
          <Route path="/detail/:id" element={<PhoneDetail key="detail" />} />

          {/* MACBOOK */}
          <Route path="/macbook" element={<AllMacbooks />} />
          <Route path="/macbook-air" element={<MacbookAir />} />
          <Route path="/macbook-pro" element={<MacbookPro />} />
          <Route path="/macbook-neo" element={<MacbookNeo />} />
          <Route path="/macbook/:id" element={<MacbookDetail />} />

          {/* İPAD */}
          <Route path="/ipad" element={<AlliPad />} />
          <Route path="/ipad-air" element={<IpadAir />} />
          <Route path="/ipad-pro" element={<IpadPro />} />
          <Route path="/ipad-mini" element={<IpadMini />} />
          <Route path="/ipad-base" element={<Ipadbase />} />
          <Route path="/ipad/:id" element={<IpadDetail />} />

          {/* WATCH */}
          <Route path="/watch" element={<AllWatches />} />
          <Route path="/watch-series11" element={<Series11 />} />
          <Route path="/watch-ultra2" element={<Ultra2 />} />
          <Route path="/watch-se" element={<WatchSE />} />
          <Route path="/watch/:id" element={<WatchDetail />} />

          {/* AIRPODS */}
          <Route path="/airpods" element={<Allairpods />} />
          <Route path="/airpods2" element={<Airpods2 />} />
          <Route path="/airpods3" element={<Airpods3 />} />
          <Route path="/airpods4" element={<Airpods4 />} />
          <Route path="/airpods-max" element={<AirpodsMax />} />
          <Route path="/airpods/:id" element={<AirpodsDetail />} />

          {/* DISPLAY */}
          <Route path="/display-studio" element={<DisplayStudio />} />
          <Route path="/display-xdr" element={<DisplayXDR />} />
          <Route path="/displays" element={<AllDisplay />} />
          <Route path="/display/:id" element={<DisplayDetail />} />

          {/* VISION */}
          <Route path="/vision-m2" element={<VisionM2 />} />
          <Route path="/vision-m5" element={<VisionM5 />} />
          <Route path="/vision" element={<AllVision />} />
          <Route path="/vision/:id" element={<VisionDetail />} />

          {/* ACCESSORIES */}
          <Route path="/accessories" element={<AllAccessories />} />
          <Route path="/accessories/keyboards" element={<Keyboards />} />
          <Route path="/accessories/keyboards/magic" element={<MagicKeyboard />} />
          <Route path="/accessories/keyboards/magic-touch" element={<MagicKeyboardTouch />} />
          <Route path="/accessories/mouse" element={<Mouse />} />
          <Route path="/accessories/trackpad" element={<Trackpad />} />
          <Route path="/accessories/pencil" element={<ApplePencil />} />
          <Route path="/accessories/power-adapter" element={<PowerAdapter />} />
          <Route path="/accessories/:id" element={<AccessoriesDetail />} />

          {/* TV */}
          <Route path="/tv-home" element={<AllTv />} />
          <Route path="/tv-home2" element={<AllTv />} />
          <Route path="/tv/appletv" element={<AppleTvProduct />} />
          <Route path="/tv/remote" element={<TvRemote />} />
          <Route path="/tv/:id" element={<TvDetail />} />

          {/* Account */}
          <Route path="/account" element={<Account />} />

          {/* 404 */}
          <Route path="*" element={<Notfound />} />
        </Route>

        {/* ADMIN Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/:categoryName" element={<DynamicCategory />} />
        </Route>
      </Routes>

      <ScrollToTopButton />
    </>
  );
}

export default App;