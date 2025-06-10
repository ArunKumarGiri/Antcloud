"use client"
import AndroidIcon from '@mui/icons-material/Android';
import LanguageIcon from '@mui/icons-material/Language';
import WindowRoundedIcon from '@mui/icons-material/WindowRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Blogs from './components/blogs';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BrandCarousel from './components/brandcarousel';

export default function Home() {

  const router = useRouter();


  return (
    <>
      {/* 1st Page of Home */}
      <div className="flex w- flex-col lg:flex-row lg:mt-0 mt-[1rem]  ">

        {/* Mockup image for mobile view */}
        <div className="lg:hidden w-full h-[22rem] flex flex-col justify-center items-center relative mt-[2rem]">
          <p
            className="absolute inset-0 text-center font-bold text-2xl z-10 leading-loose "
            style={{
              background: "linear-gradient(to right, #05EBFB, #DB19E5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DOWHATEVER DOWHATEVER DOWHATEVER
            DOWHATEVER DOWHATEVER DOWHATEVER
            DOWHATEVER DOWHATEVER DOWHATEVER
            DOWHATEVER
          </p>
          <Image
            src="/Home-Page1Mockup.png"
            alt="Home Page Mockup"
            width={1000}
            height={400}
            className="absolute w-[100vw] top-[-4rem] h-[40vh] inset-0 object-cover z-20"
          />
        </div>

        <div className="w-full lg:ml-[6rem] flex flex-col items-center lg:items-start mt-[-8rem] lg:mt-0">
          <p className="border-[1.8px] w-[80vw] lg:w-[23vw] dark:border-white border-black rounded-3xl p-2 mt-[7rem] text-center text-[18px] lg:text-[20px] font-medium h-[2.5rem] py-1 hover:cursor-default ">
            Plans Starting from Rs. 199/-
          </p>
          <p className="text-4xl lg:text-7xl font-bold mt-[2rem] text-center lg:text-left cursor-default">
            <span
              className=""
              style={{
                color: "#05EBFB",
              }}
            >
              YOUR PC{" "}
            </span>
            ON THE <br />
            CLOUD
          </p>

          <p className="text-[1rem] lg:text-[1.2rem] font-extralight mt-[2rem] text-center lg:text-left hover:cursor-default">
            Turn all the devices into a High-End Gaming Capable <br />
            Machine!
          </p>

          <button
            onClick={() => router.push('/pricing')}
            className="rounded-[20px] text-white w-[50vw] lg:w-[9.5vw] h-[7vh] text-[16px] lg:text-[18px] font-semibold mt-[2rem]  transistion-transform duration-80 ease-linear transform hover:scale-105"
            style={{
              background: "linear-gradient(to right, #05EBFB, #DB19E5)",

            }}
          >
            Subscribe
          </button>

          <div className="flex items-center gap-4 mt-[1.5rem] lg:ml-[1.3rem]">
            {/* Android Icon with tooltip */}
            <div className="relative group">
              <Link href="/downloads">
                <AndroidIcon
                  fontSize="medium"
                  className="mt-[2px] cursor-pointer"
                />
              </Link>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 hover:cursor-default">
                Android
              </span>
            </div>

            {/* Web/Language Icon with tooltip */}
            <div className="relative group">
              <Link href="/dashboard">
                <LanguageIcon fontSize="medium" className="cursor-pointer" />
              </Link>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 hover:cursor-default">
                Web
              </span>
            </div>

            {/* Windows Icon with tooltip */}
            <div className="relative group ">
              <Link href="/downloads">
                <WindowRoundedIcon
                  fontSize="medium"
                  className="cursor-pointer"
                />
              </Link>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 hover:cursor-default">
                Windows
              </span>
            </div>
          </div>
        </div>

        <div className="flex relative overflow-hidden h-full mt-[2rem] lg:mt-0">
          <Image
            src="/Rectangle.png"
            alt="AntCloud-Rectangle"
            width={1200}
            height={600}
            className="hidden lg:block w-[90vw] lg:ml-[8.5rem] lg:w-[70vw] h-[20rem] lg:h-[35.95rem]"
          />
          <div className="absolute top-[10rem] lg:top-[28rem] left-[-10rem] lg:left-[-28rem] w-[100rem] flex justify-center items-center">
            <Image
              src="/Home-Page1Mockup.png"
              alt="Home Page Mockup"
              width={1200}
              height={800}
              className="hidden lg:block absolute w-[40rem] lg:w-[75rem] h-[25rem] lg:h-[50rem] transform rotate-305"
            />
          </div>


        </div>
      </div>

      {/* 2nd Page of Home */}
      <div className=" flex flex-col w-full h-full " >

        <p
          className="absolute w-full text-center font-bold text-[1.5rem] sm:text-[2rem] py-[1rem] sm:py-[1.5rem] hover:cursor-default"
          style={{
            background: "linear-gradient(to right, #05EBFB, #DB19E5)",
          }}
        >
          WORK . PLAY . DO WHATEVER
        </p>

        <div className="flex justify-center">
          <Image
            src="/curved.png"
            alt="Home 2 Image"
            width={800}
            height={600}
            className="h-[15rem] lg:h-[30rem] lg:ml-[-63rem] ml-[-13rem]"
          />
        </div>
        <div className="absolute ml-[2rem] mt-[11rem] lg:ml-[12rem] lg:mt-[20rem] w-[90%] lg:w-[75%] h-[20rem] lg:h-[40rem] rounded-2xl text-center flex flex-col justify-center items-center">
          <div className="relative w-full h-[70%] lg:h-[90%]">
            <video src="/" className="ml-[-0.5rem] rounded-2xl border-1 w-full h-full"></video>
            <PlayCircleOutlineIcon fontSize="large" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
          </div>
          <p className="mt-[0.5rem] lg:mt-[1rem] text-sm lg:text-base font-semibold hover:cursor-default">
            Play your Favorite AAA PC Video Games now on your Old Laptop, Phone and even your MacBook <br className="hidden lg:block" />
            without purchasing any additional hardware
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center mt-[23rem] lg:mt-[28rem] w-full relative">
          <div className="lg:w-1/2 text-center  justify-center items-center flex flex-col lg:ml-[9rem]  ">
            <p className="font-bold text-3xl lg:text-5xl hover:cursor-default ml-[2.5rem] text-left lg:ml-[2rem] ">
              Introducing our <br />
              groundbreaking new
              platform
            </p>
            <p className="pt-[2rem] lg:pt-[3rem] hover:cursor-default lg:ml-[-3rem]">
              <span className="font-bold text-[20px]">AntCloud</span> provides users their own virtual <br />
              machine to use however they want, such as:
            </p>
            <ul className="list-none mt-[2rem] lg:mt-[3rem] text-[16px] lg:text-[18px] space-y-4 hover:cursor-default">
              <li className="flex items-center">
                <Image
                  src="/Checklist-ant.png"
                  alt="Ant-Cloud"
                  width={24}
                  height={24}
                  className="w-6 h-6 mr-2"
                />
                Running Graphic Intensive Games
              </li>
              <li className="flex items-center">
                <Image
                  src="/Checklist-ant.png"
                  alt="Ant-Cloud"
                  width={24}
                  height={24}
                  className="w-6 h-6 mr-2"
                />
                Heavy Softwares for Rendering purposes
              </li>
              <li className="flex items-center">
                <Image
                  src="/Checklist-ant.png"
                  alt="Ant-Cloud"
                  width={24}
                  height={24}
                  className="w-6 h-6 mr-2"
                />
                AI/ML Coding
              </li>
            </ul>
          </div>

          <div className="lg:w-full flex justify-end items-center relative mt-[3rem] lg:mt-0 overflow-hidden">
            <Image
              src="/curved.png"
              alt="Ant-cloud"
              width={800}
              height={1000}
              className="w-full mt-[-2rem] lg:w-[30rem] h-[25rem] lg:h-[50rem] rotate-[90deg] z-10 lg:mt-[8rem]"
            />
            <Image
              src="/awesome phone mockup website.png"
              alt="Phone Mockup"
              width={1600}
              height={1400}
              className="absolute mt-[-5rem] w-[40rem] lg:w-[40rem] lg:h-[35rem] lg:mr-[-2rem] h-auto z-20 right-0 lg:mt-[-2rem]"
            />
          </div>
        </div>

        <div className="flex flex-col w-full text-center py-[1.5rem]  lg:mt-[-2rem]">
          <p className="text-[20px] sm:text-[24px] lg:text-[2rem] font-light hover:cursor-default">
            We <span className="font-bold">Work</span> With Brands Like
          </p>
          <BrandCarousel />

          <Blogs />

        </div>


      </div>

    </>


  );
}
