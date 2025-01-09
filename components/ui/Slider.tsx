"use client";
import { useState, useRef, useEffect } from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
};

function Slider({ className, children }: Props) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    // Check for overflow on component mount or when children change
    useEffect(() => {
        const checkOverflow = () => {
            if (sliderRef.current) {
                const hasOverflow = sliderRef.current.scrollWidth > sliderRef.current.clientWidth;
                setIsOverflow(hasOverflow);
            }
        };

        checkOverflow();

        // Check for overflow on window resize
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [children]);

    const scrollLeft = () => {
        if (sliderRef.current) {
        sliderRef.current.scrollLeft -= 300; // Adjust scroll value as needed
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
        sliderRef.current.scrollLeft += 300; // Adjust scroll value as needed
        }
    };

    return (
        <div className="relative flex items-center group shadow-[0px_0px_3px_1px_#00A9C3] rounded-main">
        {/* Left Scroll Button */}
        {isOverflow && (
            <button
            onClick={scrollLeft}
            className="z-10 font-extrabold duration-300 opacity-0 group-hover:opacity-100 absolute left-0 bg-gray-400 text-white ms-1 py-2 px-4 rounded-full hover:bg-gray-500"
            >
            &lt;
            </button>
        )}
        {/* Content Slider */}
        <div
            className={`flex gap-5 bg-white w-full p-4 overflow-x-auto scroll-smooth rounded-main slider ${className}`}
            ref={sliderRef}
        >
            {children}
        </div>
        {/* Right Scroll Button */}
        {isOverflow && (
            <button
                onClick={scrollRight}
                className="font-extrabold duration-300 opacity-0 group-hover:opacity-100 absolute right-0 bg-gray-400 text-white me-1 py-2 px-4 rounded-full hover:bg-gray-500"
            >
                &gt;
            </button>
        )}
        </div>
    );
}

export default Slider;
