import { Outlet, NavLink, Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, ArrowLeft } from "lucide-react";

function AdminLayout() {

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
    { path: "/admin/products", name: "Məhsullar", icon: <ShoppingBag size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFAFC] dark:bg-slate-950 text-[#1D1D1F] dark:text-[#E5E5E7] transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1D2530] dark:bg-slate-900 text-white flex flex-col justify-between fixed h-full z-30 transition-colors duration-300 border-r border-transparent dark:border-slate-800/80">
        <div>
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <Link to="/admin" className="text-xl font-bold tracking-tight">
              iSpectre <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded ml-1">Admin</span>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition px-4 py-3 rounded-xl hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Mağazaya qayıt
          </Link>
        </div>
      </aside>

      <main className="flex-1 pl-64">
        <div className="p-10 max-w-[1200px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;