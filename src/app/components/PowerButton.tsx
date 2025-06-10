"use client";
import React, { useState, useRef } from "react";

export function PowerButton({
    isToggledOn,
    onToggleButton,
}: {
    isToggledOn: boolean;
    onToggleButton: () => void;
}) {
    const audioRef = useRef<HTMLAudioElement>(null);
    // const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        // setIsClicked(true);
        onToggleButton();
        audioRef.current?.play();
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            // setIsClicked(false);
        }, 100);
    };

    return (
        <div className="relative flex items-center justify-center">
            {/* Outer glow effect */}
            <div className={`absolute inset-0 rounded-full blur-lg transition-opacity duration-300 
                ${isToggledOn ? 'bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] opacity-75' : 'bg-[#DB19E5] opacity-40'}`}
            />

            <button
                onClick={handleClick}
                onMouseUp={handleMouseUp}
                className={`
           relative w-16 h-16 rounded-full flex items-center justify-center
           transition-all duration-200 ease-in-out active:scale-95
           bg-gradient-to-br from-[#1C1F23] to-[#0F1114]
           shadow-xl hover:shadow-2xl
           border border-transparent
         `}
            >
                {/* SVG icon - you can replace with a static SVG if you prefer */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#b9a8e9"
                    strokeWidth={2.5}
                    className="transition-transform duration-300"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v9m6.364-6.364a9 9 0 11-12.728 0"
                    />
                </svg>
            </button>

            <audio ref={audioRef} src="/images/enter.mp3" />
        </div>
    );
}
