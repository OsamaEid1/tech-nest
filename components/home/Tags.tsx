"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { fetchAllTopics } from "app/helpers/topics/fetchAllTopics";
import { Topic } from "app/helpers/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tags = () => {
  const pathname = usePathname(); // Use usePathname to get the current route
  const [value, setValue] = useState<number>(0);
  const [items, setItems] = useState<Topic[]>([]);

  useEffect(() => {
    fetchAllTopics().then((data) => {
      setItems(data);

      // Find the active tab based on the current route
      const activeIndex = data.findIndex(
        (item) =>
          `/${item.name.toLowerCase().replaceAll(" ", "-")}` === pathname
      );
      setValue(activeIndex >= 0 ? activeIndex + 2 : 0); // Offset for "All" and "Following"
    });
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{ style: { display: "none" } }} // Hide the indicator
        TabScrollButtonProps={{
          sx: {
            color: "black", // Make the scroll buttons black
          },
        }}
        className="flex-1"
      >
        {/* Static Tabs */}
        <Tab
          icon={<span className="text-gray-500 text-sm">For you</span>}
          className="capitalize text-sm text-gray-500 px-0"
        />
        
        {/* Dynamic Tabs */}
        {items.map((item, index) => (
          <Link
            href={`/${item.name.toLowerCase().replaceAll(" ", "-")}`}
            key={item.id}
          >
            <Tab
              label={item.name}
              className={`capitalize text-sm block whitespace-nowrap ${
                value === index + 2
                  ? "text-black font-semibold"
                  : "text-gray-500"
              }`}
            />
          </Link>
        ))}
      </Tabs>
    </div>
  );
};

export default Tags;
