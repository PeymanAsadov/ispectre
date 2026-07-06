import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

function Dashboard() {
  const stats = [
    { title: "Ümumi Gəlir", value: "₼ 14,250.00", icon: <DollarSign className="text-green-600 dark:text-green-400" />, change: "+12% bu ay", highlight: true },
    { title: "Məhsul Sayı", value: "24", icon: <ShoppingBag className="text-blue-600 dark:text-blue-400" />, change: "7 fərqli kateqoriya", highlight: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-400 dark:text-slate-400 font-medium mb-1">Xülasə</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`border rounded-2xl p-6 shadow-sm flex items-start justify-between transition-colors duration-300 ${
            stat.highlight
              ? "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800"
          }`}>
            <div className="space-y-3">
              <p className={`text-sm font-medium ${stat.highlight ? "text-slate-500 dark:text-slate-350 font-semibold" : "text-gray-400 dark:text-slate-400"}`}>{stat.title}</p>
              <h3 className={`text-2xl font-bold ${stat.highlight ? "text-slate-900 dark:text-white" : "text-[#1D1D1F] dark:text-white"}`}>{stat.value}</h3>
              <p className={`text-xs flex items-center gap-1 ${stat.highlight ? "text-slate-600 dark:text-slate-300" : "text-gray-400 dark:text-slate-400"}`}>
                <TrendingUp size={12} className="text-green-500" />
                {stat.change}
              </p>
            </div>
            <div className={`p-3 rounded-xl border ${stat.highlight ? "bg-white dark:bg-slate-600 border-slate-100 dark:border-slate-550" : "bg-gray-50 dark:bg-slate-850 border-gray-100 dark:border-slate-800"}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;