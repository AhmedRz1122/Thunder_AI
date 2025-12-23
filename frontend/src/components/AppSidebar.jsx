import React, { useState } from "react";
import { Image, ChevronLeft, ChevronRight, Search ,Text} from "lucide-react";
import { CiLogout } from "react-icons/ci";
import "./AppSidebar.css";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/Sidebar";

const items = [
  { title: "Explore Image Classification", url: "#", icon: Search },
  { title: "Generate Image", url: "#", icon: Image },
  { title: "Text Generation", url: "#", icon: Text },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  function route_Sidebar(title)
  {
    if(title=="Explore Image Classification")
    {
      return "/Image_Classification";
    }
    else if(title=="Generate Image")
    {
      return "/Imagegen";
    }
    else if(title=="Text Generation")
    {
      return "/text_generation";
    }
    else{
      return "#";
    }
  }

  return (
    <Sidebar
      className={`flex flex-col bg-gray-100 text-black h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-200 transition"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

     
      <SidebarContent className="sidebar-content flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel
            className={`text-gray-600 text-sm font-bold ${
              collapsed ? "hidden" : "block"
            } px-4 mb-3`}
          >
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  
                     <NavLink to={route_Sidebar(item.title)}  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200 transition">
                     <item.icon className="w-5 h-5" />
                     <span className={`${collapsed ? "hidden" : "block"}`}>{item.title}</span>
                     </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button */}
      <div className="p-4">
        <NavLink to="/">

        <button
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg flex items-center justify-center"
          >
          <CiLogout className="mr-2" />
          <span className={`${collapsed ? "hidden" : "block"}`}>Logout</span>
        </button>
          </NavLink>
      </div>
    </Sidebar>
  );
}
