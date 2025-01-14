"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { fetchAllTopics } from 'app/helpers/topics/fetchAllTopics';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setAllTopics } from "state/slices/topicsSlice";
import { useAppDispatch, useAppSelector } from "state/hooks";

const Tags = () => {
    // Use usePathname to get the current route
    let pathname = usePathname();
    pathname = pathname?.substring(1) || null;
    // Handle Topics Tabs
    const [activeTab, setActiveTab] = useState<number>(0);
    const dispatch = useAppDispatch();
    const allTopics = useAppSelector(state => state.topics.allTopics);

    // Fetch All Topics
    useEffect(() => {
        if (!allTopics.length) {
            fetchAllTopics().then((data) => {
                dispatch(setAllTopics(data));
            });
        }
    }, []);
    
    // Find the active tab based on the current route and Activate its related tab
    useEffect(() => {
        if (pathname && allTopics) {

        const activeIndex = allTopics?.findIndex(
            (item) => item.name.toLowerCase().replaceAll(" ", "-") === pathname
        );
        // Offset for "All" and "Following"
        setActiveTab(activeIndex >= 0 ? activeIndex + 2 : 0);
        }
    }, [pathname, allTopics])
console.log(allTopics);
    return (
        <div className="flex text-center space-x-2">
            <Tabs
                value={1}
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
                        className={`h-full capitalize text-sm !block !whitespace-nowrap ${
                            !pathname
                                ? "text-hovers font-semibold"
                                : "text-gray-500 duration-300 hover:bg-gray-200 hover:text-hovers"
                        }`}
                    />
                </Link>
                {/* Dynamic Tabs */}
                {allTopics.map((item, index) => (
                    <Link
                        href={`/${item.name.toLowerCase().replaceAll(" ", "-")}`}
                        key={item.id}
                    >
                        <Tab
                            label={item.name}
                            className={`h-full capitalize text-sm !block !whitespace-nowrap duration-300 hover:bg-gray-200 hover:text-hovers ${
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
