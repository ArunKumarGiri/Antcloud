'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function BrandCarousel() {
    const [position, setPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentWidthRef = useRef(0);

    useEffect(() => {
        // Calculate the width of one set of brands
        if (containerRef.current) {
            const childElements = containerRef.current.children;
            let totalWidth = 0;

            // Calculate width of first set only (before duplication)
            const itemCount = childElements.length / 2;
            for (let i = 0; i < itemCount; i++) {
                if (childElements[i]) {
                    const style = window.getComputedStyle(childElements[i]);
                    const marginX = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                    totalWidth += (childElements[i] as HTMLElement).offsetWidth + marginX;
                }
            }

            contentWidthRef.current = totalWidth;
        }

        const interval = setInterval(() => {
            setPosition((prevPosition) => {

                // Reset position when we've scrolled the width of one complete set
                if (Math.abs(prevPosition) >= contentWidthRef.current && contentWidthRef.current > 0) {
                    return 0;
                }
                return prevPosition - 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    // Brands data
    const brands = [
        { name: "Yotta", lightImg: "/Brands/yotta-black.png", darkImg: "/Brands/yotta.png" },
        { name: "Ant Esports", lightImg: "/Brands/Ant-black.png", darkImg: "/Brands/ant.png" },
        { name: "Plug In Digital", lightImg: "/Brands/pi-black.png", darkImg: "/Brands/pi.png" },
        { name: "NVIDIA", lightImg: "/Brands/nvidia-black.png", darkImg: "/Brands/nvidia.png" },
        { name: "Intel", lightImg: "/Brands/intel-black.png", darkImg: "/Brands/intel.png" },
        { name: "ASUS", lightImg: "/Brands/asus-black.png", darkImg: "/Brands/asus.png" },
        { name: "Supermicro", lightImg: "/Brands/supermicro-black.png", darkImg: "/Brands/supermicro.png" },
    ];

    const duplicatedBrands = [...brands, ...brands];

    return (
        <div className="relative w-full overflow-hidden py-8">
            <div
                ref={containerRef}
                className="flex items-center gap-12 transition-transform duration-300 ease-linear"
                style={{ transform: `translateX(${position}px)`, width: "max-content" }}
            >
                {duplicatedBrands.map((brand, index) => (
                    <div key={index} className="mx-4">

                        {/* Dark mode image */}
                        <div className="hidden dark:block">
                            <Image
                                src={brand.darkImg}
                                alt={brand.name}
                                width={200}
                                height={100}
                                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                priority={index < 7} 
                            />
                        </div>

                        {/* Light mode image */}
                        <div className="dark:hidden">
                            <Image
                                src={brand.lightImg}
                                alt={brand.name}
                                width={200}
                                height={100}
                                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                priority={index < 7} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}