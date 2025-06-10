'use client'
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import latencyIcon from '../../../public/images/latency-icon.webp';
import gamePIcon from '../../../public/images/gameP-icon.webp';
import pcPIcon from '../../../public/images/pcP-icon.webp';
import plansPIcon from '../../../public/images/plansP-icon.webp';
import audioPIcon from '../../../public/images/audioP-icon.webp';
import profilePIcon from '../../../public/images/profileP-icon.webp';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TextareaAutosize } from "@mui/material"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SupportDataQ from '../assets/supportQ.json';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const WhiteExpandMoreIcon = (props: any) => (
  <ExpandMoreIcon {...props} style={{ color: 'white' }} />
);

export default function Support() {
  const router = useRouter();
  const [supportData, setSupportData] = useState({
    internetConnection: "",
    issueRelatedTo: [] as string[],
    issue: "",
    source: "Browser"
  })
  const [submissionError, setSubmissionError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [issueRelatedToSelectOpen, setIssueRelatedToSelectOpen] = useState(false);
  const { userToken, loggedIn } = useSelector((state: any) => state.auth)
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const categories = [
    { key: 'latency', icon: latencyIcon, label: 'Latency', desc: 'Frame drops, stream issues, etc', questions: SupportDataQ.latency },
    { key: 'controls', icon: gamePIcon, label: 'Controls', desc: 'Controller support, keys not working etc', questions: SupportDataQ.controls },
    { key: 'pc', icon: pcPIcon, label: 'PC Mode', desc: 'How to use, customisations, etc', questions: SupportDataQ.pcMode },
    { key: 'plans', icon: plansPIcon, label: 'Plans', desc: 'Pricing, subscription issues, etc', questions: SupportDataQ.plans },
    { key: 'audio', icon: audioPIcon, label: 'Audio', desc: 'Missing audio, headphone support, etc', questions: SupportDataQ.audio },
    { key: 'profile', icon: profilePIcon, label: 'Profile', desc: 'Updating email id, passwords, etc', questions: SupportDataQ.profile },
  ];

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setIssueRelatedToSelectOpen(false)
    if (name === "issue") setSubmissionError('');
    setSupportData({ ...supportData, [name]: value });
  };

  const submitSupportRequest = async () => {
    let str = supportData.issue;
    str = str.trim();
    const words = str.split(/\s+/);
    if (words.length < 25) {
      setSubmissionError('Please provide a detailed description of your issue in atleast 25 words');
    } else {
      setLoading(true)
      const supportRequest = await fetch('https://api.antcloud.co/api/support/create', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `JWT ${userToken}`
        },
        body: JSON.stringify(supportData)
      })
      if (supportRequest) {
        setLoading(false);
        setSupportData({
          internetConnection: "",
          issueRelatedTo: [],
          issue: "",
          source: "Browser"
        })
        const supportResponse = await supportRequest.json();
        if (supportRequest.status === 200) setMessage('Support Request Created!')
        else if (supportResponse.message === "You are not allowed to perform this action") setSubmissionError('Please Login again!')
        else setSubmissionError('Something went wrong!')
        // console.log(supportRequest)
        // console.log(supportResponse)
      }
    }
  }

  useEffect(() => {
    if (!loggedIn) router.push('/signin')
    // else router.push('/service/updates')
  }, [])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenCategory(null);
        setExpandedQuestion(null);
      }
    };

    if (openCategory) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  return (
    <>
      {/* Banner Sec */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-[50vh] lg:w-[90%] lg:mt-0 mt-[-6rem] mx-auto bg-white-smoke bg-cover bg-center"
        style={{
          backgroundImage: 'url(/curved2.png)',

        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-12 sm:py-24 ">
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-nova text-[40px] sm:text-[70px] lg:mt-0 mt-[8rem] leading-[45px] sm:leading-[70px] text-white mb-4"
              >
                Support
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-base sm:text-lg text-white max-w-2xl mx-auto px-4"
              >
                Please select any of the categories below for any issues that you may be facing or contact us directly
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Support Content */}
      <section className="bg-black-2 py-6 sm:py-10 dark:text-white text-black">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch dark:bg-black bg-white dark:text-white text-black">
            {categories.map(cat => (
              <div key={cat.key} className="hover:p-[6px] transition-all duration-200 ease-linear rounded-[28px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] h-full">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="dark:bg-black/90 bg-white/90 border-0 rounded-[25px] p-6 sm:p-10 text-center shadow transition-all hover:shadow-lg cursor-pointer flex flex-col items-center h-full"
                  onClick={() => setOpenCategory(openCategory === cat.key ? null : cat.key)}
                >
                  <motion.img
                    src={cat.icon.src}
                    alt=""
                    className="mb-4 h-12 sm:h-16 object-contain dark:text-white text-black"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 dark:text-white text-black">{cat.label}</h3>
                  <p className="text-sm sm:text-base dark:text-gray-300 text-black">{cat.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className='mt-[2rem] sm:mt-[4rem]'>
        <p
          className="w-full text-center font-bold text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] py-[0.75rem] sm:py-[1rem] md:py-[1.5rem] hover:cursor-default"
          style={{
            background: "linear-gradient(to right, #05EBFB, #DB19E5)",
          }}
        >
          WORK . PLAY . DO WHATEVER
        </p>
      </div>

      {/* Contact Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-black-2 py-8 sm:py-16 dark:text-white text-black"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          <div className="w-full lg:flex-1 bg-black-3 rounded-lg p-6 sm:p-8 dark:text-white text-black">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact our support team</h2>
            <p className="text-sm sm:text-base mb-6 pt-[1rem]">Fill out the contact form, and we'll get back to you as soon as possible. Alternatively, you can reach out to us via E-mail or Discord server.</p>
            <ul className="border-t border-gray-700 pt-6 space-y-4">
              <li className="flex items-center text-sm sm:text-base"><i className="fas fa-map-marker-alt text-secondary mr-3"><LocationPinIcon sx={{ color: 'skyblue' }} /></i> Ant-Esports Pvt. Ltd Z-41, Okhla Phase II, New Delhi, 110020</li>
              <li className="flex items-center text-sm sm:text-base"><i className="fas fa-envelope text-secondary mr-3"><EmailIcon sx={{ color: 'lightpink' }} /></i> <a href="mailto:support@antcloud.co" className="dark:text-white text-black hover:text-secondary">support@antcloud.co</a></li>
              <li className="flex items-center text-sm sm:text-base"><i className="fas fa-clock text-secondary mr-3"><AccessTimeIcon sx={{ color: 'skyblue' }} /></i> Timing: 10 AM - 6 PM</li>
              <li className="flex items-center text-sm sm:text-base"><i className="fas fa-clock text-secondary mr-3"><ConnectWithoutContactIcon sx={{ color: 'lightpink' }} /></i> Available 7 Days a Week</li>
            </ul>
          </div>
          <div className="w-full lg:flex-1 bg-black-3 rounded-lg p-6 sm:p-8 shadow-lg dark:text-white text-black">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Send us a message</h2>
            <div className="p-[2px] rounded-[20px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5]">
              <form className="flex flex-col dark:bg-black bg-white gap-4 sm:gap-6 rounded-[18px] p-4 sm:p-6">
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white text-black">Issue Related To</label>
                  <div className="relative">
                    <div
                      onClick={() => setIssueRelatedToSelectOpen(!issueRelatedToSelectOpen)}
                      className="w-full p-3 rounded-lg dark:bg-black bg-white shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 dark:text-white text-black cursor-pointer flex justify-between items-center transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-[#60A5FA]/10 hover:via-[#C084FC]/5 hover:to-[#F472B6]/10 dark:hover:bg-gradient-to-r dark:hover:from-[#60A5FA]/20 dark:hover:via-[#C084FC]/10 dark:hover:to-[#F472B6]/20 backdrop-blur-sm"
                    >
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors duration-300">{supportData.issueRelatedTo.length ? supportData.issueRelatedTo.join(', ') : 'Select issues'}</span>
                      <span className={`transform transition-transform duration-500 ease-in-out text-gray-500 dark:text-gray-400 ${issueRelatedToSelectOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                    <div className={`relative w-full overflow-hidden transition-all duration-500 ease-in-out transform ${issueRelatedToSelectOpen ? 'max-h-[200px] mt-1 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}>
                      <div className="dark:bg-black bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                        {['Latency', 'Game Controls', 'Others'].map((option) => (
                          <div
                            key={option}
                            onClick={() => {
                              const newValue = supportData.issueRelatedTo.includes(option)
                                ? supportData.issueRelatedTo.filter(item => item !== option)
                                : [...supportData.issueRelatedTo, option];
                              handleChange({ target: { name: 'issueRelatedTo', value: newValue } });
                            }}
                            className={`p-3 cursor-pointer transition-all duration-500 ease-in-out hover:pl-4 rounded-l-[4px] rounded-r-[4px] text-sm sm:text-base ${supportData.issueRelatedTo.includes(option)
                              ? 'bg-gradient-to-r from-[#60A5FA]/15 via-[#C084FC]/10 to-[#F472B6]/15 dark:from-[#60A5FA]/25 dark:via-[#C084FC]/15 dark:to-[#F472B6]/25 text-black dark:text-white backdrop-blur-sm'
                              : 'hover:bg-gradient-to-r hover:from-[#60A5FA]/10 hover:via-[#C084FC]/5 hover:to-[#F472B6]/10 dark:hover:from-[#60A5FA]/20 dark:hover:via-[#C084FC]/10 dark:hover:to-[#F472B6]/20 backdrop-blur-sm'
                              }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {supportData.issueRelatedTo.includes('Latency') && (
                  <div>
                    <label className="block mb-2 text-sm font-medium dark:text-white text-black">Internet Connection</label>
                    <div className="flex gap-4 sm:gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="internetConnection"
                          value="WiFi"
                          checked={supportData.internetConnection === 'WiFi'}
                          onChange={handleChange}
                          className="w-4 h-4 accent-secondary"
                        />
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-all duration-500 ease-in-out group-hover:text-black dark:group-hover:text-white">Wi-Fi</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="internetConnection"
                          value="LAN"
                          checked={supportData.internetConnection === 'LAN'}
                          onChange={handleChange}
                          className="w-4 h-4 accent-secondary"
                        />
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-all duration-500 ease-in-out group-hover:text-black dark:group-hover:text-white">LAN</span>
                      </label>
                    </div>
                  </div>
                )}
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white text-black">Your Issue Details</label>
                  <TextareaAutosize
                    name="issue"
                    onChange={handleChange}
                    value={supportData.issue}
                    minRows={3}
                    className="w-full p-3 rounded-lg dark:bg-black bg-white shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 dark:text-white text-black text-sm sm:text-base transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-[#60A5FA]/10 hover:via-[#C084FC]/5 hover:to-[#F472B6]/10 dark:hover:bg-gradient-to-r dark:hover:from-[#60A5FA]/20 dark:hover:via-[#C084FC]/10 dark:hover:to-[#F472B6]/20 backdrop-blur-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
                    placeholder="Describe your issue here in at least 25 words."
                  />
                </div>
                {message && <p className="text-green-500 text-center text-sm sm:text-base">{message}</p>}
                {submissionError && <p className="text-red-400 text-center text-sm sm:text-base">{submissionError}</p>}
                <button
                  disabled={supportData.issueRelatedTo.length === 0 || supportData.issue === "" || loading}
                  onClick={submitSupportRequest}
                  type="button"
                  className="bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white font-semibold rounded-[15px] font-play text-[15px] sm:text-[17px] text-center inline-block transition-all duration-300 ease-in-out py-2 sm:py-3 px-6 sm:px-8 mt-4 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-1 active:shadow-md perspective-1000 transform-gpu"
                >
                  {loading ? 'Loading' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Modals */}
      <AnimatePresence>
        {openCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-12 px-2"
          >
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-[95%] sm:max-w-2xl rounded-2xl bg-gradient-to-r from-[#05EBFB] to-[#DB19E5]"
            >
              <div className="w-full h-full dark:bg-black/90 bg-white/90 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-secondary px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between rounded-t-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-black m-0">
                    {categories.find(c => c.key === openCategory)?.label}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    className="dark:text-white text-black text-xl sm:text-2xl font-bold rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/20 transition"
                    onClick={() => { setOpenCategory(null); setExpandedQuestion(null); }}
                  >
                    &times;
                  </motion.button>
                </div>
                {/* Questions */}
                <div className="p-4 sm:p-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
                  {categories.find(c => c.key === openCategory)?.questions.map((faq, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`mb-4 sm:mb-5 rounded-xl bg-white dark:bg-black shadow-md hover:shadow-lg px-4 sm:px-6 py-3 sm:py-4 cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-0.5`}
                      onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-base sm:text-lg dark:text-white text-black">{faq.ques}</div>
                        <motion.span
                          animate={{ rotate: expandedQuestion === idx ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="dark:text-white text-black text-xl sm:text-2xl"
                        >
                          &#x2304;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {expandedQuestion === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 dark:text-gray-200 text-gray-800 text-sm sm:text-base border-t border-gray-200 dark:border-gray-700 pt-3">
                              {Array.isArray(faq.ans) ? (
                                <ul className="list-decimal pl-5 space-y-1">
                                  {faq.ans.map((point, i) => (
                                    <li key={i}>{point}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span>{faq.ans}</span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}