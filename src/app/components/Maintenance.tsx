"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

const Maintenance = () => {
    const [maintenance, setMaintenance] = useState({
        active: false,
        partialActive: false,
        message: null,
    });

    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    // Array of maintenance messages - comment out the ones you don't want to show
    const maintenanceMessages = [
        "Our service won't be available due to emergency maintenance. Thank you for your patience and support.",
        // "The platform will be on maintenance from 12 (Noon) till 5 pm, on 7th October for server addition & hardware upgrade.",
        // "Our cloud services will be temporarily unavailable as we migrate to a new data center from 19th Feb to 12th March 2025. Learn more",
        // "Our service won't be available due to an emergency maintenance from 12:30PM to 2PM today (Wednesday). Thank you for your patience and support."
    ];

    useEffect(() => {
        fetch('https://api.antcloud.co/api/globals/maintenance')
            .then((res) => res.json())
            .then((res) => {
                setMaintenance(res);
            })
    }, [])

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let animationId: number;

        const scroll = () => {
            if (el.scrollLeft >= el.scrollWidth / 2) {
                el.scrollLeft = 0;
            } else {
                el.scrollLeft += 1;
            }
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [maintenance]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) =>
                (prevIndex + 1) % maintenanceMessages.length
            );
        }, 5000); // Change message every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const text = maintenance.message ?? maintenanceMessages[currentMessageIndex];

    // Function to render message with Link if it contains "Learn more"
    const renderMessage = (message: string) => {
        if (message.includes("Learn more")) {
            const parts = message.split("Learn more");
            return (
                <>
                    {parts[0]}
                    <Link href="/service/updates" className="text-white underline hover:text-white/80">
                        Learn more
                    </Link>
                    {parts[1]}
                </>
            );
        }
        return message;
    };

    return (
        <>
            {(maintenance.active || maintenance.partialActive) && (
                <div className="relative w-full bg-gradient-to-r from-[#4f46e5]/90  to-[#9333ea]/90 backdrop-blur-sm py-3 px-4 shadow-lg z-50">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent"></div>
                    </div>

                    {/* Main content */}
                    <div
                        ref={scrollRef}
                        className="relative whitespace-nowrap flex gap-x-10"
                        style={{
                            width: "100%",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <div className="flex gap-x-10 text-white/90 text-sm sm:text-base min-w-max font-medium">
                            <span className="px-2">{renderMessage(text)}</span>
                            <span className="px-2">{renderMessage(text)}</span>
                            <span className="px-2">{renderMessage(text)}</span>
                            <span className="px-2">{renderMessage(text)}</span>
                        </div>
                    </div>

                    {/* Bottom border gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
            )}
        </>
    );
};

export default Maintenance;
