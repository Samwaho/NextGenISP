import { LuLayoutDashboard } from "react-icons/lu";
import { PiNetworkLight } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
export const sidebarData = [
  {
    title: "Overview",
    icon: LuLayoutDashboard,
    path: "/main",
  },
  {
    title: "Network management",
    icon: PiNetworkLight,
    path: "/main/network",
  },
  {
    title: "User management",
    icon: FiUsers,
    path: "/main/network",
  },
  {
    title: "Financial management",
    icon: MdOutlineAttachMoney,
    path: "/network",
  },
  {
    title: "Employee management",
    icon: FaUserTie,
    path: "/network",
  },
  {
    title: "Task management",
    icon: LuClipboardList,
    path: "/network",
  },
  {
    title: "Inventory management",
    icon: PiNetworkLight,
    path: "/network",
  },
];
