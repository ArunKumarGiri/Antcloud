"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Blogs from '../components/blogs';

const faqs = [
  {
    question: "What is Ant Cloud?",
    answer: "AntCloud is India's first cloud PC service, which provides users an entire virtual machine for them to use however they want, whether to play highly demanding games or to run heavy softwares all powered by our low latency streaming software."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "Simply get in touch with our support team at support@antcloud.co & they can help you out."
  },
  {
    question: "What does 'PC Mode' mean?",
    answer: "'PC Mode' offers users their own desktop, which they can customise however they want with their own games, softwares or use it any way they want to, from whereever they wish to"
  },
  {
    question: "Which controllers are supported?",
    answer: "We recommend x-input controllers. If your controller has multiple modes, we recommend switching to x-input mode. To check support for your controller, please check our controller mapping page."
  },
  {
    question: "What are the minimum requirements?",
    answer: "We recommend a 50 Mbps broadband connection for a 1080p stream & a 100 Mbps broadband connection for a 4K stream. We also highly recommend a LAN or a 5Ghz WiFi connection. For the requirements per system, check the downloads page."
  },
  {
    question: "Which browsers are supported?",
    answer: "For PC, Laptop (Windows 10 and above only), Mac users we support Google Chrome, Microsoft Edge & Mozilla Firefox."
  },
  {
    question: "Do I need to buy games to play them?",
    answer: "If you wish to download games via a Store, then depending on the game you may have to purchase it."
  },
  {
    question: "What aspect ratio is supported?",
    answer: "Currently, we only support 16:9 aspect ratio."
  },
  {
    question: "Is iPhone/iPad supported?",
    answer: "No, Our iOS and Ipad app is in development."
  },
  {
    question: "What to do if my mouse pointer isn't locked to my screen?",
    answer: "Your pointer is locked automatically when you start a game or a software which requires the pointer to be locked, If that does not happen, Press F8 to manually trigger it."
  },
  {
    question: "How do I use Windows App?",
    answer: "Please check the Windows app guide from the Help section of Footer menu."
  },
  {
    question: "Which regions do you currently support?",
    answer: "Antcloud is currently available only to users residing in India"
  },
  {
    question: "What are the requirements for 120 FPS?",
    answer: "For 120 FPS, we highly recommend ping of less than 10 ms & a connection of 150 mbps+. Your internet needs to be able to handle all those frames coming in."
  },
  {
    question: "How do I enable 120 FPS?",
    answer: "To access, simply enable the option in the display settings of your Virtual PC by visiting 'Advanced Settings' & changing the Refresh Rate. Also, please make sure you have a 120 Hz supported monitor."
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div
      className="bg-[#414141] text-white px-6 py-4 rounded-2xl shadow cursor-pointer transition-all w-full overflow-hidden"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold">{question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={question}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-white font-light mt-2 text-[14px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  // Split the FAQs
  const half = Math.ceil(faqs.length / 2);
  const leftFAQs = faqs.slice(0, half);
  const rightFAQs = faqs.slice(half);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src="/curved.png"
          alt="FAQs"
          className="w-full md:w-auto md:ml-[-5.3rem] md:mt-[-12rem] mt-[-8rem] h-auto md:h-[55rem] z-0"
        />
        <p className=" text-4xl sm:text-5xl md:text-7xl font-bold text-center mt-[-11rem] md:text-right md:mt-[11rem] z-10">
          Frequently Asked <br /> Questions
        </p>
        <p className="font-light text-[16px] sm:text-[20px] p-2 lg:mt-[21rem] lg:ml-[-20rem] z-10  ">
          All your questions answered!
        </p>
      </div>

      <div className="mt-[3rem] md:mt-[-4rem] z-20">
        <p
          className="w-full text-center font-bold text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] py-[1rem] sm:py-[1.5rem] hover:cursor-default"
          style={{
            background: "linear-gradient(to right, #05EBFB, #DB19E5)",
          }}
        >
          WORK . PLAY . DO WHATEVER
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-4">
        <div className="mt-8 flex flex-col items-center md:items-start">
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl text-center lg:ml-[-29rem] md:text-left z-20">
            The Most Common Questions
          </p>
          <img
            src="curved2.png"
            alt=""
            className="md:block absolute mt-[-10rem] lg:mt-[-18rem] w-[40rem] lg:h-[60rem] lg:ml-[28rem] z-10"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full py-10 mt-4 z-20 ">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {leftFAQs.map((faq, index) => (
              <div
                key={index}
                className="transform transition-transform duration-150 ease-linear hover:scale-103"
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              </div>
            ))}
          </div>


          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {rightFAQs.map((faq, index) => {
              const adjustedIndex = index + half;
              return (
                <div
                  key={adjustedIndex}
                  className="transform transition-transform duration-150 ease-linear hover:scale-103"
                >
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === adjustedIndex}
                    onClick={() => toggleFAQ(adjustedIndex)}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <Blogs />
    </div>
  );
};

export default FAQs;
