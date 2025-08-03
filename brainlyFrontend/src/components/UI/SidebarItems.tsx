import type { ReactElement } from "react";

const SidebarItems = ({
  text,
  icon,
  active = false,
}: {
  text: string;
  icon: ReactElement;
  active?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 py-3 px-3 rounded-md cursor-pointer transition-colors 
        ${active ? "bg-purple-100 text-purple-600 font-medium" : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default SidebarItems;
