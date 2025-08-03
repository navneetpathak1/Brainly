import { LogoIcon } from "../../icons/LogoIcon";
import { Twitter } from "../../icons/Twitter";
import { Youtube } from "../../icons/Youtube";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white shadow-md border-r border-r-gray-100 w-72 fixed left-0 top-0 p-4 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-6">
        <LogoIcon />
        <h1 className="text-gray-700 font-semibold text-lg">Brainly</h1>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-2">
        <SidebarItems text="Twitter" icon={<Twitter />} />
        <SidebarItems text="Youtube" icon={<Youtube />} />
      </div>
    </div>
  );
};

export default Sidebar;
