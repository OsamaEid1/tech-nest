"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { fetchAllTopics } from "app/helpers/topics/fetchAllTopics";
import { Topic } from "app/helpers/constants";


const Tags = () => {
  const [value, setValue] = useState<number>(0);
  const [items, setItems] = useState<Topic[]>([]);

  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddClick = () => {
    // Logic for adding a new tab or triggering an action
    alert("Add new tab action!");
  };
  useEffect(() => {
    fetchAllTopics().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <div className="flex items-center space-x-2 ">
      {/* Tabs for carousel */}
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
        {/* First tab as + button */}
        <Tab
          icon={<span className="text-black text-lg font-normal">All</span>}
          // onClick={handleAddClick} // Trigger adding logic
          className="capitalize text-sm text-black px-0"
        />

        {/* Regular tabs */}
        {items.map((item, index) => (
          <Tab
            key={item.id}
            label={item.name}
            className={`capitalize text-sm ${
              value === index + 1 ? "text-black font-semibold" : "text-gray-500"
            }`}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default Tags;
