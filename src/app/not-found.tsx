"use client";
import React from "react";
import NotFoundImg from "../../public/404.png"
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';

export default function NotFound() {

    return (
        <section className="relative min-h-screen w-full overflow-hidden">

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center ">
                <Image
                    src="/404.png"
                    alt="404"
                    width={400}
                    height={400}
                    className="w-[400px] h-[400px]"
                />
                <Link
                    href="/"
                    className="px-8 py-4 mt-[-1rem] rounded-full bg-gradient-to-r from-[#22247e] to-[#28e1fe] text-black dark:text-white font-bold hover:from-[#22247e] hover:to-[#28e1fe] transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#9157ed]/50"
                >
                    <ArrowBackIcon className="mr-2" />
                    BACK TO HOME
                </Link>
                <h2 className="mt-7 text-4xl font-bold bg-gradient-to-r from-[#9056ee] to-[#1191be] bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-2 duration-500">
                    Oops, Page Not found!
                </h2>

            </div>
        </section>
    );
} 