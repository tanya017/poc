import logo from "../../assets/logo.svg";
import bellIcon from "../../assets/bell_icon.svg";
import chevron from "../../assets/chevron.svg";

interface HeaderProps {
  navLinks: string[];
  activeLink?: string;
}

const Header: React.FC<HeaderProps> = ({ navLinks, activeLink }) => {
  return (
    <nav className="flex h-[60px] w-full items-center justify-between px-4 shadow-sm">
      {/*Logo*/}
      <div className="flex items-center">
        <div className="flex items-center gap-2.5 pr-8">
          <div className="flex h-8 w-8 items-center justify-center">
            <img src={logo} alt="OmneNest Logo" />
          </div>
          <span className="text-[17px] font-bold">Nest App</span>
        </div>

        {/* Indices */}
        <div className="flex items-center">
          <div className="flex flex-col border-r border-gray-100 px-5 last:border-r-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[10px] font-bold text-gray-400">
                NIFTY 50
              </span>
              <img src={chevron} alt="Arrow Down" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] font-bold text-gray-700">
                23,777.80
              </span>
              <span className="text-[11px] font-medium text-emerald-500">
                +196.65 0.83%
              </span>
            </div>
          </div>

          <div className="flex flex-col border-r border-gray-100 px-5 last:border-r-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[10px] font-bold text-gray-400">
                SENSEX
              </span>
              <img src={chevron} alt="Arrow Down" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] font-bold text-gray-700">
                76,704.13
              </span>
              <span className="text-[11px] font-medium text-emerald-500">
                +633.29 0.82%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* App Nav*/}
      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                // href={`#${link.toLowerCase()}`}
                href={link === "Orders" ? "/orders" : `#${link.toLowerCase()}`}
                className={`text-[13px] font-semibold transition-all duration-200 relative py-5
                  ${
                    activeLink === link
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 ml-4">
          {/* Notifications */}
          <button className="text-gray-400 hover:text-gray-600 relative p-1">
            <img src={bellIcon} alt="Notificatoin Icon" />
          </button>
          {/* User Icon */}
          <div>
            <span>User</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
