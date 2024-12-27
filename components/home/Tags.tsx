"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { fetchAllTopics } from "app/helpers/topics/fetchAllTopics";
import { Topic } from "app/helpers/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading from "@components/ui/Loading";

const Tags = () => {
    // Use usePathname to get the current route
    let pathname = usePathname();
    pathname = pathname?.substring(1) || null;
    // Handle Topics Tabs
    const [activeTab, setActiveTab] = useState<number>(0);
    const [topics, setTopics] = useState<Topic[]>([]);

    // Fetch All Topics
    useEffect(() => {
        fetchAllTopics().then((data) => {
        setTopics(data);
        });
    }, []);
    
    // Find the active tab based on the current route and Activate its related tab
    useEffect(() => {
        if (pathname && topics) {

        const activeIndex = topics?.findIndex(
            (item) => item.name.toLowerCase().replaceAll(" ", "-") === pathname
        );
        console.log(pathname, activeIndex);
        // Offset for "All" and "Following"
        setActiveTab(activeIndex >= 0 ? activeIndex + 2 : 0);
        }
    }, [pathname, topics])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

console.log(activeTab);
    return (
        <div className="flex topics-center space-x-2">
            <Tabs
                value={2}
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
                {/* Tabs */}
                <Tab
                    icon={
                        <span className="text-lg font-bold text-black -ms-4">
                            All Topics
                        </span>
                    }
                />
                <Link href={"/"}>
                    <Tab
                        label="For You"
                        className={`h-full capitalize text-sm block whitespace-nowrap ${
                            !pathname
                                ? "text-hovers font-semibold"
                                : "text-gray-500 duration-300 hover:bg-gray-200 hover:text-hovers"
                        }`}
                    />
                </Link>
                {/* Dynamic Tabs */}
                {topics.map((item, index) => (
                    <Link
                        href={`/${item.name.toLowerCase().replaceAll(" ", "-")}`}
                        key={item.id}
                    >
                        <Tab
                            label={item.name}
                            className={`h-full capitalize text-sm block whitespace-nowrap duration-300 hover:bg-gray-200 hover:text-hovers ${
                                activeTab === index + 2
                                    ? "text-hovers font-semibold"
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
