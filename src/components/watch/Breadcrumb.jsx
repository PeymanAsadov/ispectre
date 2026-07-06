import { Link } from "react-router-dom";
import { FiHome, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function Breadcrumb({ items = [] }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-black transition-colors">
        <FiHome size={15} />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
            <FiChevronRight size={13} className="text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium truncate max-w-[220px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-black transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
