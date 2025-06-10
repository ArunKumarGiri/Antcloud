"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../store";
import { toast } from "react-toastify";
import axios from "axios";
import { Box, Typography, Modal, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Spinner from "../components/stream/overlays/spinner";
import { useGetUserDetailsQuery } from "@/app/services/(auth)/authService";
import { setCredentials } from "@/app/features/(auth)/userSlice";
import { logout, refreshTokens, setUserPlan } from "@/app/features/(auth)/authSlice";
import { useRefreshUserTokenQuery } from "@/app/services/(auth)/refreshService";
import { useRazorpay } from "react-razorpay";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { statesOfIndia } from "@/app/assets/stateCity";

interface Plan {
  price: string;
  streamTime: string;
  resolution: string;
  ramVram: string;
  storage: string;
  rayTracing: string;
  validity: string;
  planName?: string;
  planCode?: string;
  GPU?: string;
  status?: boolean;
}



const plansData: Record<string, Plan[]> = {
  "Intro Plans": [
    {
      planName: "Premium",
      planCode: "GTXPremium",
      price: "₹199",
      streamTime: "35 Hours",
      resolution: "Up to 720p / 120 FPS",
      ramVram: "18GB / 6GB",
      storage: "250GB",
      rayTracing: "Disabled",
      validity: "30 Days",
      GPU: "GTX 1660",
      status: true
    },
    {
      planName: "Ultimate",
      planCode: "GTXPremium",
      price: "₹499",
      streamTime: "100 Hours",
      resolution: "Up to 1080p / 120 FPS",
      ramVram: "18GB / 6GB",
      storage: "250GB",
      rayTracing: "Disabled",
      validity: "30 Days",
      GPU: "GTX 1660",
      status: true
    },

    {
      planName: "TopUp",
      planCode: "TopUp",
      price: "₹40 +",
      streamTime: "1 Hour",
      resolution: "Depending on Base plan",
      ramVram: "Depending on Base plan",
      storage: "Depending on Base plan",
      rayTracing: "Depending on Base plan",
      validity: "Depending on Base plan",
      GPU: "Depending on Base plan",
      status: true
    }
  ],

  "Advanced Plans": [
    {
      planName: "Premium",
      planCode: "Premium",
      price: "₹699",
      streamTime: "50 Hours",
      resolution: "Up to 1080p / 120 FPS",
      ramVram: "20GB / 16GB",
      storage: "250GB",
      rayTracing: "Enabled",
      validity: "30 Days",
      GPU: "RTX A4000",
      status: true
    },
    {
      planName: "Ultimate",
      planCode: "Ultimate",
      price: "₹999",
      streamTime: "150 Hours",
      resolution: "Up to 4K / 120 FPS",
      ramVram: "20GB / 16GB",
      storage: "250GB",
      rayTracing: "Enabled",
      validity: "30 Days",
      GPU: "RTX A4000",
      status: true
    },
    {
      planName: "TopUp",
      planCode: "TopUp",
      price: "₹40 +",
      streamTime: "1 Hour",
      resolution: "Depending on Base plan",
      ramVram: "Depending on Base plan",
      storage: "Depending on Base plan",
      rayTracing: "Depending on Base plan",
      validity: "Depending on Base plan",
      GPU: "Depending on Base plan",
      status: true
    }
  ],

  "Super Plan": [
    {
      planName: "Premium",
      planCode: "Premium",
      price: "₹1,099",
      streamTime: "100 Hours",
      resolution: "Up to 4K / 120 FPS",
      ramVram: "20GB / 12GB",
      storage: "350GB",
      rayTracing: "Enabled",
      validity: "30 Days",
      GPU: "RTX 5070",
      status: true
    },
    {
      planName: "Ultimate",
      planCode: "Ultimate",
      price: "₹1,299",
      streamTime: "150 Hours",
      resolution: "Up to 4K / 120 FPS",
      ramVram: "20GB / 12GB",
      storage: "500GB",
      rayTracing: "Enabled",
      validity: "30 Days",
      GPU: "RTX 5070",
      status: true
    },
    {
      planName: "TopUp",
      planCode: "TopUp",
      price: "₹40 +",
      streamTime: "1 Hour",
      resolution: "Depending on Base plan",
      ramVram: "Depending on Base plan",
      storage: "Depending on Base plan",
      rayTracing: "Depending on Base plan",
      validity: "Depending on Base plan",
      GPU: "Depending on Base plan",
      status: true
    }
  ]
};

const getIcon = (feature: string) => {
  switch (feature) {
    case "Time":
      return <HourglassTopIcon fontSize="small" />;
    case "Resolution":
      return <HighQualityIcon fontSize="small" />;
    case "RAM/VRAM":
      return <MemoryIcon fontSize="small" />;
    case "Storage":
      return <StorageIcon fontSize="small" />;
    case "Ray Tracing":
      return <FlashOnIcon fontSize="small" />;
    case "Validity":
      return <CalendarMonthIcon fontSize="small" />;
    case "GPU":
      return <WhatshotIcon fontSize="small" />;
    default:
      return null;
  }
};



const Pricing = () => {
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<keyof typeof plansData>("Advanced Plans");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [topUpCounts, setTopUpCounts] = useState<{ [key: string]: number }>({});
  const [paymentAllowed, setPaymentAllowed] = useState(false);
  const [introAllowed, setIntroAllowed] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [isStateAvailable, setIsStateAvailable] = useState(false);
  const [skipMe, setSkipMe] = useState(false);
  const [priceList, setPriceList] = useState(2);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [paymentLinkLoading, setPaymentLinkLoading] = useState(false);
  const [btnStatus, setBtnStatus] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [paymentCallbackLoading, setPaymentCallbackLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponCodeInputValue, setCouponCodeInputValue] = useState("");
  const [validCoupon, setvalidCoupon] = useState<boolean | null>(false);
  const [discountDetails, setDiscountDetails] = useState<{ type: string; amount: number } | null>(null);
  const [couponModal, setCouponModal] = useState(false);
  const couponInputRef = useRef<HTMLDivElement>(null);

  // Array of plan names or tab names to disable. Examples:
  // - For individual plans: ['Premium', 'GTXUltimate', 'Super']
  // - For entire tabs: ['Intro Plans', 'Advanced Plans', 'Super Plan']
  // - For both: ['Intro Plans', 'Premium', 'Super']
  // Note: For Intro Plans, add 'GTX' prefix to plan names (e.g., 'GTXPremium' instead of 'Premium')
  const [disabledPlans, setDisabledPlans] = useState<string[]>([]);
  const { Razorpay } = useRazorpay();
  const subscriptionIdRef = useRef<any>(null);
  subscriptionIdRef.current = order;

  const notesRef = useRef<any>(null);
  notesRef.current = notes;

  const router = useRouter();
  const dispatch = useDispatch();
  const { loggedIn, userInfo, userToken, userRefreshToken } = useSelector((state: RootState) => state.auth);
  const [showCouponInput, setShowCouponInput] = useState(true);
  const [waitList, setWaitList] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [switchWarning, setSwitchWarning] = useState(false);
  const [renewWarning, setRenewWarning] = useState(false);
  const [downTimeModal, setDownTimeModal] = useState(false);
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    boxShadow: 'none',
    p: 0,
    borderRadius: '20px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const loaderModalStyle = {
    ...style,
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1rem'
  };

  const locationModalStyle = {
    ...style,
    width: 500,
    padding: '0'
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (couponInputRef.current && !couponInputRef.current.contains(event.target as Node)) {
        if (!couponCodeInputValue) {
          setShowCouponInput(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [couponCodeInputValue]);

  const handleValidateCouponCode = () => {
    setCouponLoading(true)
    fetch(`https://api.antcloud.co/api/coupons/check?code=${couponCodeInputValue}`)
      .then(async (res) => {
        const response = await res.json();
        console.log(response)
        setvalidCoupon(response.active)
        if (response.active) {
          setAppliedCouponCode(couponCodeInputValue)
          setDiscountDetails({ type: response.type, amount: response.discountAmount })
          toast.success("Coupon applied successfully!")
          setTimeout(() => {
            setCouponModal(false);
          }, 1000)
        } else {
          toast.error("Invalid coupon code!")
        }
        setCouponLoading(false)
      }).catch((err) => {
        console.log(err)
        setvalidCoupon(false)
        setCouponLoading(false)
        toast.error("Invalid coupon code!")
      })
  }

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCodeInputValue(e.target.value)
    setvalidCoupon(null)
  }

  const handleTabClick = (tabName: keyof typeof plansData) => {
    setActiveTab(tabName);
    setSelectedPlan(null);
    // Set priceList based on the selected tab
    if (tabName === "Intro Plans") {
      setPriceList(1);
    } else if (tabName === "Advanced Plans") {
      setPriceList(2);
    } else if (tabName === "Super Plan") {
      setPriceList(3);
    }
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleTopUpChange = (index: number, delta: number) => {
    setTopUpCounts(prev => {
      const key = `${activeTab}-${index}`;
      const current = prev[key] ?? 1; // default to 1
      const newCount = Math.max(1, current + delta); // keep minimum as 1
      return { ...prev, [key]: newCount };
    });
  };



  const createPaymentLink = (userToken: string) => {
    if (!selectedPlan) {
      toast.error("Please select a plan first");
      return;
    }

    let planName = selectedPlan.planName || '';
    // Add GTX prefix for Intro Plans (priceList === 1) except for TopUp
    if (priceList === 1 && planName !== "TopUp") {
      planName = `GTX${planName}`;
    }

    if (loggedIn) {
      setBtnStatus(false)
      setPaymentLinkLoading(true)
      fetch("https://api.antcloud.co/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + userToken,
        },
        body: JSON.stringify({
          planName: planName,
          platform: "Browser",
          quantity: quantity,
          couponCode: planName.includes("GTX") ? null : appliedCouponCode,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response && response.message) {
            if (response.message.includes("Token Expired")) {
              // refreshUserToken()
              fetchRefresh().then(refreshData => {
                if (refreshData.message === 'Re-authentication needed!' || refreshData.message === 'Forbidden Request!' || refreshData.message === 'Refresh Token Expired') {
                  toast.error('Session Expired! Please Sign in again.')
                  router.push('/signin');
                  dispatch(logout())
                } else if (refreshData.message === "New Access Pairs Generated!") {
                  dispatch(refreshTokens(refreshData));
                  createPaymentLink(refreshData.accessToken)
                }
              })
            } else if (response.message.includes("Invalid Token")) {
              toast.error("Session Expired! Please login again.")
              router.push('/signin');
              dispatch(logout())
            }
            toast.error(response.message);
            setSelectedCard(null)
            // setPlanError(response.message)
          } else {
            setBtnStatus(true);
            setOrder(response)
            setNotes(response.notes);
            handlePayment(response);
            // setPaymentLink(response.paymentLink);
          }
          setPaymentLinkLoading(false)
        })
        .catch((err) => {
          setPaymentLinkLoading(false)
          toast.error('Something went wrong!')
          console.log(err)
        });
    } else {
      setBtnStatus(true);
      // setPaymentLink("/signin");
      console.log("API token not found");
    }
  };



  const fetchRefresh = () => {
    return fetch('https://api.antcloud.co/api/users/refresh',
      {
        method: 'GET',
        headers: {
          'refresh': `JWT ${userRefreshToken}`
        }
      }
    ).then((res) => res.json())
      .then(res => {
        return res
      })
  }

  const fetchMe = async (meToken: string) => {
    try {
      const userData = await fetch('https://api.antcloud.co/api/users/me',
        {
          method: 'GET',
          headers: {
            'Authorization': `JWT ${meToken}`
          }
        }
      )
      const user = await userData.json();
      return user
    } catch (err) {
      console.log(err)
      toast.error(err instanceof Error ? err.message : String(err))
    }
  }

  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem("antcloud-token") !== null;

  useEffect(() => {
    if (loggedIn) {
      const tryMe = (meToken: string | null, refreshToken: string | null) => {
        if (!meToken) return;
        fetchMe(meToken)
          .then(userData => {
            if (userData.message) {
              if (userData.message === 'Token Expired') {
                fetchRefresh().then(refreshData => {
                  if (refreshData.message === 'Re-authentication needed!' || refreshData.message === 'Forbidden Request!' || refreshData.message === 'Refresh Token Expired') {
                    toast.error('Session Expired! Please Sign in again.')
                    router.push('/signin');
                    dispatch(logout())
                  } else if (refreshData.message === "New Access Pairs Generated!") {
                    dispatch(refreshTokens(refreshData));
                    tryMe(refreshData.accessToken, refreshData.refreshToken);
                  }
                })
              } else if (userData.message === 'Invalid Token') {
                toast.error('Session Expired! Please Sign in again.')
                router.push('/signin');
                dispatch(logout())
              }
            } else {
              fetch('https://api.antcloud.co/api/globals/payment')
                .then((res) => {
                  const resData = res.json()
                  return resData
                }).then((res) => {
                  if (res.active) {
                    setPaymentAllowed(true)

                    // Turning Off Intro for everyone except renewals
                    if (userData.user.currentPlan.toLowerCase().includes('gtx') || userData.user.expiredPlan.toLowerCase().includes('gtx')) setIntroAllowed(true)
                    else setIntroAllowed(false)

                    // Old method allowing intro for everyone accept new users or cancelled users

                    // if (userData.user.currentPlan.toLowerCase() === 'basic' && (!userData.user.subscriptionStatus || userData.user.subscriptionStatus.toLowerCase() === 'cancelled')) setIntroAllowed(false)
                    // else setIntroAllowed(true)
                  } else {
                    if (userData.user.currentPlan.toLowerCase() === 'basic' && (!userData.user.subscriptionStatus || userData.user.subscriptionStatus.toLowerCase() === 'cancelled')) setPaymentAllowed(false)
                    else {
                      setPaymentAllowed(true)
                      // Turning Off Intro for everyone except renewals    
                      if (userData.user.currentPlan.toLowerCase().includes('gtx') || userData.user.expiredPlan.toLowerCase().includes('gtx')) setIntroAllowed(true)
                      else setIntroAllowed(false)

                      // Old method allowing intro for everyone accept new users or cancelled users

                      // setIntroAllowed(true)
                    }
                  }
                }).catch((err) => {
                  console.log(err)
                })

              if (!userData.user.location || (userData.user?.location && !userData.user?.location?.State)) setAddressModal(true);
              else setIsStateAvailable(true)

              dispatch(setCredentials(userData.user))

              const userPayload = {
                id: userData.user.id,
                firstName: userData.user.firstName,
                currentPlan: userData.user.currentPlan,
                emailVerified: userData.user.emailVerified,
                email: userData.user.email
              }
              dispatch(setUserPlan(userPayload));
            }
          }).catch(err => {
            console.log(err)
          })
      }
      tryMe(userToken, userRefreshToken);
      setSkipMe(false);
    }
  }, []);

  const checkTransaction = (response: any) => {
    setPaymentCallbackLoading(true)
    // fetch("http://localhost:8000/api/subscriptions/verifyCallback",
    fetch("https://api.antcloud.co/api/subscriptions/verifyCallback",
      {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          Authorization: "JWT " + userToken
        },
        body: JSON.stringify({
          payId: response.razorpay_payment_id,
          orderId: subscriptionIdRef.current.id,
          sign: response.razorpay_signature
        })
      }
    )
      .then(result => result.json())
      .then((result) => {
        if (result.result !== "Failed") {
          if (notesRef.current.planName.toLowerCase() === "topup") {
            setPaymentCallbackLoading(false)
            toast.success("Payment Done!")
            router.push('/stream')
          } else {
            setTimeout(() => {
              if (!notesRef.current.addToUpcoming && !notesRef.current.switchCluster && !notesRef.current.upgrade && !notesRef.current.renew && !notesRef.current.switchStorage) {
                localStorage.setItem('newAccount', "true");
                const currentTime = new Date().getTime();
                localStorage.setItem("timer", currentTime.toString());
              }
              setPaymentCallbackLoading(false)
              toast.success("Payment Done!")
              router.push('/stream')
            }, 5000)
          }
        } else {
          setPaymentCallbackLoading(false)
          toast.error("Payment Failed!")
        }
      }).catch(err => {
        setPaymentCallbackLoading(false)
        toast.error("Payment Failed!")
      })
  };

  const handlePayment = useCallback(async (order: any) => {
    const amount = order.amount * quantity;
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: amount,
      currency: "INR",
      name: "Antcloud",
      description: `Subscribe for AntCloud Plan`,
      image: "https://antcloud.co/static/media/Ant-Logo.8bee7434f594d1115fc3.webp",
      handler: (res: any) => checkTransaction(res),
      prefill: {
        name: order.notes.fullName,
        email: order.notes.email,
        contact: order.notes.phone,
      },
      notes: order.notes,
      theme: {
        color: "#22B9A6",
      },
    };

    const rzpay = new (Razorpay as any)(options);
    rzpay.on("payment.failed", function (response: any) {
      toast.error("Payment Failed!")
    });
    rzpay.open();
  }, [Razorpay]);

  const isPlanDisabled = (plan: Plan) => {
    const planName = priceList === 1 && plan.planName !== "TopUp" ? `GTX${plan.planName}` : plan.planName;
    // Check if either the plan is directly disabled or if its tab is disabled
    return disabledPlans.includes(planName || '') || disabledPlans.includes(activeTab);
  };

  const handleClose = () => {
    setWaitList(false);
    setComingSoon(false);
    setDownTimeModal(false);
  };

  const handleWaitlist = () => {
    setWaitList(true);
    setComingSoon(false);
  };

  const handleSwitchWarning = () => {
    setSwitchWarning(!switchWarning);
  };

  const handleRenewWarning = () => {
    setRenewWarning(!renewWarning);
  };

  const handleClusterSwitchYes = () => {
    setSwitchWarning(false);
    setRenewWarning(false);
    if (selectedPlan) {
      createPaymentLink(userToken || '');
    }
  };

  const handleStateChange = (event: any) => {
    setState(event.target.value);
  };

  const submitLocation = async () => {
    if (!state || !pincode) {
      toast.error("Please fill in all fields");
      return;
    }

    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setAddressLoading(true);
    try {
      const response = await fetch('https://api.antcloud.co/api/users/updateLocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${userToken}`
        },
        body: JSON.stringify({
          state: state,
          pincode: pincode
        })
      });

      const data = await response.json();

      if (data.message === 'Token Expired') {
        const refreshData = await fetchRefresh();
        if (refreshData.message === 'Re-authentication needed!' || refreshData.message === 'Forbidden Request!' || refreshData.message === 'Refresh Token Expired') {
          toast.error('Session Expired! Please Sign in again.');
          router.push('/signin');
          dispatch(logout());
        } else if (refreshData.message === "New Access Pairs Generated!") {
          dispatch(refreshTokens(refreshData));
          submitLocation(); // Retry with new token
        }
      } else if (data.message === 'Invalid Token') {
        toast.error('Session Expired! Please Sign in again.');
        router.push('/signin');
        dispatch(logout());
      } else if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Location updated successfully!");
        setAddressModal(false);
        setIsStateAvailable(true);
        dispatch(setCredentials(data.user));
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setAddressLoading(false);
    }
  };

  return (
    <div
      className="text-white min-h-screen px-4 py-10 sm:px-8"
      style={{
        backgroundImage: "url('/curved2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >

      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-black p-1 ">
            {Object.keys(plansData).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab as keyof typeof plansData)}
                className={`px-6 py-2 ml-[3px] mr-[3px] rounded-full text-md font-medium hover:scale-107 transition-transform duration-100 ease-linear
                  ${activeTab === tab
                    ? "bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white"
                    : "text-gray-300 hover:bg-gray-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-center dark:text-white text-black text-3xl font-bold mb-8">Choose Your Plan</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {plansData[activeTab]
              .filter(plan => plan.status)
              .map((plan, index) => {
                const planKey = `${activeTab}-${index}`;
                const topUpCount = topUpCounts[planKey] || 0;
                const isDisabled = isPlanDisabled(plan);

                return (
                  <div
                    key={index}
                    onClick={() => !isDisabled && handlePlanSelect(plan)}
                    className={`rounded-2xl p-[3px] transition-all duration-300 transform hover:scale-105 cursor-pointer relative group
                    ${selectedPlan === plan ? "bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] shadow-lg shadow-[#05EBFB]/20 scale-105" : "bg-black"}
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative rounded-2xl bg-black/90 shadow-lg h-full hover:shadow-xl hover:shadow-[#05EBFB]/10 transition-all duration-300">
                      <div className="p-6 text-center border-b border-gray-700">
                        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] bg-clip-text text-transparent">{plan.planName}</h3>
                        <p className="text-2xl font-semibold">
                          {plan.planName === "TopUp"
                            ? `₹${40 * (topUpCount || 1)}`
                            : plan.price}
                        </p>
                      </div>
                      <div className="p-6 space-y-4 text-sm">
                        {[
                          { label: "Time", value: plan.planName === "TopUp" ? `${topUpCount || 1} Hour${topUpCount === 1 ? "" : "s"}` : plan.streamTime },
                          { label: "Resolution", value: plan.resolution },
                          { label: "RAM/VRAM", value: plan.ramVram },
                          { label: "Storage", value: plan.storage },
                          { label: "Ray Tracing", value: plan.rayTracing },
                          { label: "Validity", value: plan.validity },
                          { label: "GPU", value: plan.GPU },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between group">
                            <p className="flex items-center gap-1 text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                              {getIcon(label)}
                              {label}:
                            </p>
                            <p className="text-gray-300 group-hover:text-white transition-colors duration-200">
                              {value}
                            </p>
                          </div>
                        ))}
                        {plan.planName === "TopUp" && (
                          <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTopUpChange(index, -1);
                              }}
                              className="p-1 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                            >
                              <RemoveIcon fontSize="small" />
                            </button>
                            <span>{topUpCount || 1}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTopUpChange(index, 1);
                              }}
                              className="p-1 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                            >
                              <AddIcon fontSize="small" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center">
          {isAuthenticated && (
            <div className="flex flex-col items-center mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  ref={couponInputRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-2 items-center bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg shadow-lg"
                >
                  <input
                    type="text"
                    value={couponCodeInputValue}
                    onChange={handleCouponChange}
                    placeholder="Enter coupon code"
                    className="px-4 py-2 rounded-md bg-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 transition-all duration-200 w-48"
                  />
                  <button
                    onClick={handleValidateCouponCode}
                    disabled={couponLoading}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white hover:scale-105 hover:opacity-90 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {couponLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Applying...
                      </>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={isAuthenticated ? () => createPaymentLink(userToken || '') : () => router.push("/signin")}
            className="hover:scale-108 duration-150 ease-in px-6 py-3 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white rounded-full font-semibold shadow-lg hover:opacity-90"
          >
            {isAuthenticated ? "Next" : "Sign In to Continue"}
          </button>
        </div>
      </div>

      {/* Processing Payments Modal */}
      <Modal
        open={paymentCallbackLoading}
        className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm "
      >
        <div className="bg-[#0A0A0A] ml-[-3rem] border border-[#1A1A1A] rounded-2xl p-8 shadow-xl w-[400px] max-w-[90vw]">
          <p className="text-lg font-medium text-white text-center">Processing Payment.</p>
          <p className="text-sm text-gray-400 text-center">Please do not leave this page!</p>

          <Spinner topPosition={60} bottomPosition={0} width={window.innerWidth < 768 ? 16 : 8} />

        </div>
      </Modal>

      {/* WaitList Modal */}
      <Modal
        open={waitList}
        onClose={handleClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 shadow-xl w-[400px] max-w-[90vw]">
          <Typography className="text-left text-lg leading-relaxed text-white">
            Hey there,
            <br />
            <br />
            We're absolutely thrilled to have you join Antcloud waitlist!
            <br />
            <br />
            We're not accepting payments at the moment, but don't worry – you're at the front of the line for when we open up again.
            <br />
            <br />
            Regards,
            <br />
            Antcloud Team
          </Typography>
        </div>
      </Modal>

      {/* Not Accepting Any New Members Modal */}
      <Modal
        open={comingSoon}
        onClose={handleClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 shadow-xl w-[400px] max-w-[90vw]">
          <div className="text-center">
            <p className="text-lg text-white mb-4">
              Sorry! We're currently not accepting any new members.
            </p>
            <button
              onClick={handleWaitlist}
              className="mt-4 mb-4 px-6 py-2 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white rounded-full font-semibold hover:opacity-90 transition-all duration-200"
            >
              Join Waitlist
            </button>
            <p className="text-base text-gray-400">
              Please click the above button to join our waitlist.
            </p>
          </div>
        </div>
      </Modal>

      {/* Switch Cluster Warning */}
      <Modal
        open={switchWarning}
        onClose={handleSwitchWarning}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 shadow-xl w-[400px] max-w-[90vw]">
          <div className="text-left">
            <p className="text-base text-white mb-4">
              NOTE : Purchasing this plan means your data will not transfer to your new PC. Be cautious as all information will not be accessible once you migrate to a different PC.
            </p>
            <h4 className="text-center text-lg font-semibold text-white mb-8">
              Do you want to continue?
            </h4>
            <div className="flex justify-around">
              <button
                onClick={handleClusterSwitchYes}
                className="px-6 py-2 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white rounded-full font-semibold hover:opacity-90 transition-all duration-200"
              >
                Yes
              </button>
              <button
                onClick={handleSwitchWarning}
                className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:opacity-90 transition-all duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Upcoming Plan Warning */}
      <Modal
        open={renewWarning}
        onClose={handleRenewWarning}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 shadow-xl w-[400px] max-w-[90vw]">
          <div className="text-left">
            <p className="text-base text-white mb-4">
              Warning: Your current subscription period isn't finished yet. If you purchase this plan, it will get activated once your current period finishes. {priceList !== 3 && 'For more hours, we recommend a Top up plan.'}
            </p>
            <h4 className="text-center text-lg font-semibold text-white mb-8">
              Do you want to continue?
            </h4>
            <div className="flex justify-around">
              <button
                onClick={handleClusterSwitchYes}
                className="px-6 py-2 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white rounded-full font-semibold hover:opacity-90 transition-all duration-200"
              >
                Yes
              </button>
              <button
                onClick={handleRenewWarning}
                className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:opacity-90 transition-all duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* State Modal */}
      <Modal
        open={addressModal}
        onClose={() => setAddressModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 shadow-xl w-[500px] max-w-[90vw]">
          {addressLoading ? (
            <Spinner topPosition={0} bottomPosition={0} width={window.innerWidth < 768 ? 16 : 10} />
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <CloseIcon
                  className="cursor-pointer hover:text-gray-400 transition-colors duration-200 text-white"
                  onClick={() => setAddressModal(false)}
                />
              </div>
              <div className="pr-5">
                <h2 className="text-2xl font-bold mb-2 text-white">Please update your location</h2>
                <p className="text-gray-400 mb-6">For invoicing purposes, we need your accurate location.</p>

                <FormControl className="w-full mb-6">
                  <InputLabel id="demo-simple-select-label" className="text-gray-400">
                    {state ? "" : "Select state"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    onChange={handleStateChange}
                    className="  bg-[#1A1A1A] "
                    sx={{
                      '& .MuiSelect-select': {
                        color: 'white',
                      },
                      '& input': {
                        color: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                        borderRadius: '1rem',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#05EBFB',
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                    }}
                  >
                    {statesOfIndia.map((item) => (
                      <MenuItem key={item.key} value={item.value} className="text-white">
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <input
                  onChange={(e) => {
                    setPincode(() => {
                      const a = e.target.value.replace(/\D/g, "");
                      return a;
                    })
                  }}
                  className="w-full h-14 px-4 bg-[#1A1A1A] text-white rounded-2xl border border-[#2A2A2A] focus:border-[#05EBFB] focus:outline-none transition-colors duration-200"
                  placeholder="Pin code"
                />
                <button
                  onClick={submitLocation}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] text-white rounded-full font-semibold hover:opacity-90 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* DownTime Modal */}
      <Modal
        open={downTimeModal}
        onClose={handleClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 shadow-xl w-[400px] max-w-[90vw]">
          <div className="text-center">
            <p className="text-base text-gray-400">
              Currently we are not accepting any new members.
            </p>
          </div>
        </div>
      </Modal>

      {/* Test Section - Only visible in development */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-gray-700">
          <h3 className="text-white font-semibold mb-2">Test Modals:</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setWaitList(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Waitlist
            </button>
            <button
              onClick={() => setComingSoon(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Coming Soon
            </button>
            <button
              onClick={() => setSwitchWarning(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Switch Warning
            </button>
            <button
              onClick={() => setRenewWarning(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Renew Warning
            </button>
            <button
              onClick={() => setAddressModal(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Location
            </button>
            <button
              onClick={() => setDownTimeModal(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Downtime
            </button>
            <button
              onClick={() => setPaymentCallbackLoading(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Processing
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Pricing;
