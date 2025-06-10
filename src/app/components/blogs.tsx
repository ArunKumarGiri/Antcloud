"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Blogs = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const blogs = [
        {
            title: 'Revolutionising Video Editing: The Impact of Cloud Computing, Featuring Ant Cloud',
            author: 'Garv Sharma',
            date: 'April 05, 2023',
            category: 'Cloud Computing',
            image: '/Blogs/blog1.png',
            imageAlt: 'AntCloud '
        },
        {
            title: 'Cloud Gaming vs. Traditional Gaming: Exploring the Pros and Cons',
            author: 'Garv Sharma',
            date: 'May 02, 2024',
            category: 'Cloud Gaming',
            image: '/Blogs/blog2.png',
            imageAlt: 'AntCloud Cloud Gaming'
        },
        
    ];

    return (
        <div className="flex flex-col items-center justify-center h-auto mt-[5rem] lg:mt[0] w-full relative z-20 ">
            <p className="text-3xl mt-8 mb-12 font-semibold hover:cursor-default">Writers Block</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4 sm:px-8 lg:px-16 pb-24">
                {blogs.map((blog, index) => (
                    <Link
                        key={index}
                        href={`/blogdetails/${index + 1}`}
                        aria-label={`Read blog: ${blog.title}`}
                        className="block w-full relative z-20 "
                    >
                        <div
                            className="relative h-[300px] sm:h-[350px] overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-500 transform hover:scale-105"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={blog.image}
                                    alt={blog.imageAlt}
                                    fill
                                    className="object-cover rounded-lg"
                                />

                                {/* Category badge */}
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm text-black z-20">
                                    {blog.category}
                                </div>

                                {/* Overlay with text */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-90'}`}>
                                    <h2 className="text-xl font-semibold text-white mb-2 hover:underline transition-all duration-150">
                                        {blog.title}
                                    </h2>

                                    <div className="flex items-center text-white text-opacity-90 text-sm">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs font-bold text-white bg-blue-500">
                                                {blog.author[0]}
                                            </div>
                                            <span>{blog.author}</span>
                                        </div>
                                        <div className="ml-4 flex items-center">
                                            <span>{blog.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blogs;