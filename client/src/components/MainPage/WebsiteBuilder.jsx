import React, { useState } from "react";
import TopBar from "./Topbar";
import LeftSidebar from "./LeftSidebar";
import MainCanvas from "./MainCanvas";
import RightSidebar from "./RightSidebar";
import BottomBar from "./BottomBar";

const WebsiteBuilder = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleElementSelect = (item, subItem) => {
    setSelectedElement({ main: item, sub: subItem });
    setRightSidebarOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1">
        <LeftSidebar
          sidebarOpen={leftSidebarOpen}
          toggleSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
          toggleCategory={toggleCategory}
          expandedCategories={expandedCategories}
          handleElementSelect={handleElementSelect}
        />
        <MainCanvas />
        {rightSidebarOpen && (
          <RightSidebar
            element={selectedElement}
            closeSidebar={() => setRightSidebarOpen(false)}
          />
        )}
      </div>
      <BottomBar />
    </div>
  );
};

export default WebsiteBuilder;
