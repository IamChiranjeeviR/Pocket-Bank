import { Menu, House, ArrowRightLeft, CircleUserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

interface SideBarLinks {
  icon: LucideIcon;
  name: string;
  path: string;
}

const sideBarLinks: SideBarLinks[] = [
  {
    icon: House,
    name: "Home",
    path: "/dashboard",
  },
  {
    icon: ArrowRightLeft,
    name: "Transactions",
    path: "/transactions",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div className="flex flex-row md:flex-col justify-between px-3 py-2 border-b border-b-gray-300 md:border-0">
      <div className="flex flex-row md:flex-col items-center md:items-start">
        <div
          className="hidden md:block px-2 py-1 w-fit mb-5 cursor-pointer"
          onClick={() => setIsSideBarOpen((prev) => !prev)}
        >
          <Menu className="text-gray-700" />
        </div>

        <div className="flex flex-row sm:flex-col gap-5 items-start">
          {sideBarLinks.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                className={({ isActive }) =>
                  `rounded flex items-center gap-2 w-fit px-2 py-1
                   ${isActive ? "text-[#2549BD]" : "text-gray-700"}
                   hover:bg-gray-100`
                }
              >
                <Icon className="w-5 h-5" />
                {isSidebarOpen && <span>{menu.name}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div>
        <div className="p-2 cursor-pointer">
          <CircleUserRound className="w-8 h-8 text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
