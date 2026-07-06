import { Outlet } from "react-router-dom";

import Footer from "./footer";

import Nav from "./nav/nav";



function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B0D] text-[#1d1d1f] dark:text-[#F5F5F5] transition-colors duration-300">
      <div id="top"></div>

      <Nav />

      <main className="pt-[115px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;