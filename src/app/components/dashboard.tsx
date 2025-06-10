"use client"
import { useSelector } from 'react-redux';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import AccountDetails from './account-details/accountDetails';
import BillingDetails from './billing-details/billingDetails';
// import Miscellaneous from "../game-settings/Miscellaneous";
import ComingSoon from '../../../public/images/ComingSoon.webp'
import Streamimg from '../../../public/StreamImage.png';
import { Cancel } from '@mui/icons-material';
import Carousel from "react-multi-carousel";
// import settings from '../stream/overlays/settingsModal';
// import { zoom } from '../zoom';
import { PowerButton } from './PowerButton';
import { useCookies } from 'react-cookie';
import "react-multi-carousel/lib/styles.css";

interface Game {
  gameId: string;
  name: string;
}

interface Maintenance {
  active: boolean;
  message?: string;
}

interface User {
  id: string;
  currentPlan: string;
  renewDate: string | null;
  emailVerified: boolean;
  totalTimeMonth: number;
  timeUsedMonth: number;
  upcomingPlans?: Array<{
    planName: string;
  }>;
}

interface AuthState {
  loggedIn: boolean;
  userInfo: {
    emailVerified: boolean;
  };
}

interface RootState {
  auth: AuthState;
  user: {
    userDetails: User;
  };
}

interface DashboardProps {
  maintenance: Maintenance;
  games: Game[];
  stream: (type: string) => void;
  user: User | null;
}

// const tutorialStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: "70%",
//   height: "50%",
//   // width: 600,
//   color: "#fff",
//   bgcolor: '#212121',
//   border: '2px solid #000',
//   '&:focus-visible': {
//     outline: "none"
//   },
//   boxShadow: 24,
//   p: 4,
// };

export function Dashboard({ maintenance, stream }: DashboardProps) {

  // const gamesRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user.userDetails);

  // Modal
  const [comingSoon, setComingSoon] = useState(false);
  const handleClose = () => setComingSoon(false);

  const [basicDenied, setBasicDenied] = useState(false);
  const handleBasicDeniedClose = () => setBasicDenied(false);

  const [maintenanceModal, setMaintenanceModal] = useState(false);
  const handleMaintenanceModalClose = () => setMaintenanceModal(false);

  const [emailDenied, setEmailDenied] = useState(false);
  const handleEmailDeniedClose = () => setEmailDenied(false);

  const [openStartDisabled, setOpenStartDisabled] = useState(false);
  const [tutorialModal, setTutorialModal] = useState(false);
  const handleOpenStartDisabledClose = () => setOpenStartDisabled(false);

  // const [playButton, setPlayButton] = useState(true);

  // Profile
  const [menuItem, setMenuItem] = useState("Account");

  const content = {
    Account: <AccountDetails />,
    Billing: <BillingDetails />,
    // Settings: <Miscellaneous />,
  };

  const [isStartedModal, setIsstartedModal] = useState(false);

  const [showVideoStream, setShowVideoStream] = useState(false);

  const handleDesktopOpen = () => {
    if (!maintenance.active) {
      const shutDownTimeout = cookies["isShutdownClicked"];
      const currentTime = new Date().getTime();
      const startedAttimeDifference =
        60000 - (currentTime - parseInt(shutDownTimeout || "0"));
      if (startedAttimeDifference > 0) {
        setIsstartedModal(true);
        removeCookie("isStreamConnected", { path: "/" });
        removeCookie("windowClosedAt", { path: "/" });
      } else {
        if (!timeLeft) {
          removeCookie("isShutdownClicked", { path: "/" });
          // removeCookie("windowClosedAt", { path: "/" });
          if ((user && (user.currentPlan === "Basic" || user.currentPlan === "basic")) || !user) {
            setBasicDenied(true)
          } else if (!userInfo.emailVerified) {
            setEmailDenied(true)
          } else if (openStartDisabled) {
            setOpenStartDisabled(true)
          } else {
            // setComingSoon(true)
            setShowVideoStream(true);
            setTimeout(() => {
              stream('desktop')
            }, 500)
          }
        }
      }
    } else {
      setMaintenanceModal(true)
    }
  }

  // const handleGameOpen = (game: Game) => {
  //   if (!maintenance.active) {
  //     if ((user && (user.currentPlan === "Basic" || user.currentPlan === "basic")) || !user) {
  //       setBasicDenied(true)
  //     } else if (!userInfo.emailVerified) {
  //       // setComingSoon(true)
  //       setEmailDenied(true)
  //     } else {
  //       stream(game.gameId)
  //     }
  //   } else setMaintenanceModal(true)
  // }

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const newUser = localStorage.getItem('newAccount');
    const storedTime = localStorage.getItem("timer");
    const currentTime = new Date().getTime();
    if (storedTime && newUser) document.body.style.overflow = 'hidden';
    // localStorage.setItem("timer", currentTime.toString());
    const timeDifference = 90000 - (currentTime - parseInt(storedTime || "0"));
    setTimeLeft(Math.max(0, timeDifference));
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      // localStorage.setItem("timer", currentTime.toString());
      const timeDifference = 90000 - (currentTime - parseInt(storedTime || "0"));
      setTimeLeft(Math.max(0, timeDifference));
      if (timeDifference <= 0) {
        document.body.style.overflow = '';
        clearInterval(intervalId);
        localStorage.removeItem('timer');
        if (newUser && newUser === "true") setTutorialModal(true)
        localStorage.setItem("newAccount", "false");
      }
    }, 1000); // Update timer every second
    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = ((timeLeft % 60000) / 1000).toFixed(0);

  const [isToggledOn, setIsToggledOn] = useState(false);

  const handleToggleButton = () => {
    setIsToggledOn(prevState => !prevState);
  };

  const [cookies, setCookie, removeCookie] = useCookies([
    "shutDownTimeout",
    "isShutdownClicked",
    "isStreamConnected",
    "refreshTimeout",
    "windowClosedAt",
  ]);

  useEffect(() => {
    const isStreamConnected = cookies["isStreamConnected"];
    const refreshTime = cookies["windowClosedAt"];
    if (isStreamConnected && refreshTime) {
      const currentTime = new Date().getTime();
      const startedAttimeDifference =
        55000 - (currentTime - parseInt(refreshTime || "0"));
      if (startedAttimeDifference > 0) {
        setTimeout(() => {
          const currentTime1 = new Date().getTime();
          setCookie("isShutdownClicked", currentTime1.toString(), {
            path: "/",
          });
        }, startedAttimeDifference);
      } else if (
        startedAttimeDifference + 30000 > 0 &&
        startedAttimeDifference <= 0
      ) {
        const currentTime1 = new Date().getTime();
        setCookie(
          "isShutdownClicked",
          (currentTime1 + startedAttimeDifference).toString(),
          {
            path: "/",
          }
        );
      } else {
        removeCookie("isStreamConnected", { path: "/" });
      }
    }
  }, []);

  return (
    <>
      {/* Test Panel for All Modals */}
      {/* <div className="fixed top-4 right-4 z-50 bg-gray-900 p-4 rounded-lg shadow-lg space-y-2">
                <h3 className="text-white text-sm font-bold mb-2">Test Modals:</h3>
                <button
                    onClick={() => setMaintenanceModal(true)}
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Maintenance Modal
                </button>
                <button
                    onClick={() => setTutorialModal(true)}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Tutorial Modal
                </button>
                <button
                    onClick={() => setComingSoon(true)}
                    className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Coming Soon Modal
                </button>
                <button
                    onClick={() => setOpenStartDisabled(true)}
                    className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Plan Activating Modal
                </button>
                <button
                    onClick={() => setBasicDenied(true)}
                    className="block w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Basic Denied Modal
                </button>
                <button
                    onClick={() => setEmailDenied(true)}
                    className="block w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Email Denied Modal
                </button>
                <button
                    onClick={() => setIsstartedModal(true)}
                    className="block w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    VM Restart Modal
                </button>
            </div> */}

      {/* Maintenance Modal */}
      <Modal
        open={maintenanceModal}
        onClose={handleMaintenanceModalClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '40%' },
          maxHeight: '90vh',
          bgcolor: 'rgba(33, 33, 33, 0.8)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
          p: 4,
          borderRadius: 10,
          outline: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}>
          <Typography variant='body1' sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            fontWeight: 400,
            letterSpacing: '0.5px',
            lineHeight: 1.6
          }}>
            {maintenance.message ? maintenance.message : "Our service won't be available due to an emergency maintenance. Thank you for your patience and support."}
          </Typography>
        </Box>
      </Modal>

      {/* Tutorial Modal */}
      <Modal
        open={tutorialModal}
        onClose={() => setTutorialModal(false)}
        className="z-50"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: '80%', lg: '70%' },
          height: { xs: '90%', sm: '85%', md: '75%', lg: '70%' },
          maxHeight: '95vh',
          bgcolor: 'rgba(33, 33, 33, 0.8)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
          p: { xs: 2, md: 4 },
          borderRadius: 10,
          outline: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}>
          {/* Close Button */}
          <Cancel
            onClick={() => setTutorialModal(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              cursor: 'pointer',
              color: 'white',
              zIndex: 1000,
              fontSize: '2rem'
            }}
          />

          {/* Carousel Container */}
          <Box sx={{
            flex: 1,
            mt: 4,
            overflow: 'hidden',
            '& .react-multi-carousel-list': {
              height: '100%'
            },
            '& .react-multi-carousel-item': {
              height: '100%'
            }
          }}>
            <Carousel
              arrows
              autoPlay
              autoPlaySpeed={6000}
              infinite
              draggable
              swipeable
              keyBoardControl
              containerClass="carousel-container"
              itemClass="carousel-item"
              responsive={{
                desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
                tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
                mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
              }}
            >
              {/* Slide 1 */}
              <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                alignItems: 'center',
                p: { xs: 1, md: 2 }
              }}>
                <Box sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '200px'
                }}>
                  <img
                    src="/StreamCarousel.png"
                    alt="Dashboard"
                    width={600}
                    height={400}
                    style={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </Box>
                <Box sx={{
                  flex: 1,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Typography variant="body1" sx={{
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    lineHeight: 1.6
                  }}>
                    Hi! Welcome to AntCloud, your account is now ready.
                    <br /><br />
                    This is your Dashboard.
                    <br /><br />
                    From here, you can directly access your own PC & use it however you please.
                  </Typography>
                </Box>
              </Box>

              {/* Slide 2 */}
              <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                alignItems: 'center',
                p: { xs: 1, md: 2 }
              }}>
                <Box sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '200px'
                }}>
                  <img
                    src="/imgs/OurGames.png"
                    alt="Games"
                    width={600}
                    height={400}
                    style={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </Box>
                <Box sx={{
                  flex: 1,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Typography variant="body1" sx={{
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    lineHeight: 1.6
                  }}>
                    From the games section, you can simply click on the pre-installed games & start playing.
                  </Typography>
                </Box>
              </Box>

              {/* Slide 3 */}
              <Box sx={{
                height: '100%',
                marginLeft: '10rem',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="h6" sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  color: 'white'
                }}>
                  Shortcut Keys
                </Typography>
                <Box component="ul" sx={{
                  listStyle: 'disc',
                  pl: 3,
                  mb: 4,
                  '& li': {
                    mb: 1,
                    color: 'white'
                  }
                }}>
                  <li>
                    <Typography component="span" sx={{ color: '#055bfb', fontWeight: 'bold' }}>
                      F10
                    </Typography>
                    {' - Toggle FullScreen Mode'}
                  </li>
                  <li>
                    <Typography component="span" sx={{ color: '#055bfb', fontWeight: 'bold' }}>
                      F9
                    </Typography>
                    {' - Toggle Stream Setting Menu'}
                  </li>
                </Box>
                <Typography variant="body1" sx={{
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  Note: From the F9 section, you can change your video stream settings & shut down your PC as well.
                </Typography>
              </Box>
            </Carousel>
          </Box>
        </Box>
      </Modal>

      {/* Coming Soon Modal */}
      <Modal
        open={comingSoon}
        onClose={handleClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxHeight: '90vh',
          bgcolor: 'rgba(33, 33, 33, 0.8)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
          p: 4,
          borderRadius: 10,
          outline: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}>
          <img
            className="w-full h-full rounded-lg"
            src={ComingSoon.src}
            width={400}
            height={400}
            alt="Coming Soon"
          />
        </Box>
      </Modal>

      {/* Plan Activating Modal */}
      <Modal
        open={openStartDisabled}
        onClose={handleOpenStartDisabledClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '40%' },
          maxHeight: '90vh',
          bgcolor: 'rgba(33, 33, 33, 0.8)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
          p: 4,
          borderRadius: 10,
          outline: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}>
          <Typography component="p" sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            fontWeight: 400,
            letterSpacing: '0.5px',
            lineHeight: 1.6
          }}>
            Your Plan is being activated right now.
            <br /> <br />
            Please wait for a few minutes and then refresh your page to start playing.
          </Typography>
        </Box>
      </Modal>

      {/* Basic Denied Modal */}
      <Modal
        open={basicDenied}
        onClose={handleBasicDeniedClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '40%' },
          maxHeight: '90vh',
          bgcolor: 'rgba(33, 33, 33, 0.8)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
          p: 4,
          borderRadius: 10,
          outline: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}>
          {user && user.renewDate
            ?
            <Typography sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 400,
              letterSpacing: '0.5px',
              lineHeight: 1.6
            }}>
              Oops! It seems like your plan has expired.
              <br /> <br />
              Renew your plan now by visiting our pricing page from below Link.
            </Typography>
            :
            <Typography sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 400,
              letterSpacing: '0.5px',
              lineHeight: 1.6
            }}>
              Oops! It seems like you&#39;re not on a paid plan right now.
              If you have recently purchased or renewed a plan, please wait for five minutes and then refresh the page for your plan to activate.
              <br /> <br />
              If you haven&apos;t purchased a plan, Please visit our pricing page from below Link.
            </Typography>
          }
          <br /> <br />
          <Link
            href="/pricing"
            className="block w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto px-4 sm:px-6 py-2 sm:py-3 text-center bg-purple-600/80 hover:bg-purple-700/90 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transform text-sm sm:text-base md:text-lg"
          >
            Pricing
          </Link>
        </Box>
      </Modal>

      {/* Email Denied Modal */}
      <Modal
        open={emailDenied}
        onClose={handleEmailDeniedClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '40%' },
          maxHeight: '90vh',
          bgcolor: 'rgba(33, 33, 33, 0.8)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
          p: 4,
          borderRadius: 10,
          outline: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}>
          <Typography component="p" sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            fontWeight: 400,
            letterSpacing: '0.5px',
            lineHeight: 1.6
          }}>
            Oops! It seems like you haven&apos;t verified your email yet.
            <br /> <br />
            Please verify your email before starting the stream.
          </Typography>
        </Box>
      </Modal>

      {/* Not Allowed to Restart VM */}
      <Modal
        open={isStartedModal}
        onClose={() => setIsstartedModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '40%' },
          maxHeight: '90vh',
          bgcolor: 'rgba(33, 33, 33, 0.8)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
          p: 4,
          borderRadius: 10,
          outline: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}>
          <Typography component="p" sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            fontWeight: 400,
            letterSpacing: '0.5px',
            lineHeight: 1.6
          }}>
            Please wait for a minute while your machine is being reset.
          </Typography>
        </Box>
      </Modal>

      <Box className="w-full h-auto flex flex-col">
        <section className="flex w-full h-screen">
          <div
            className="relative w-full h-full cursor-default"
            onClick={handleDesktopOpen}
          >
            {showVideoStream ? (
              <video
                src="/dashboardVideo2.mp4"
                autoPlay
                loop
                className={`w-full h-full object-cover ${timeLeft > 0 ? 'opacity-30' : ''}`}
              />
            ) : (
              <img
                src={Streamimg.src}
                alt="Background"
                className={`w-full h-full object-cover ${timeLeft > 0 ? 'opacity-30' : ''}`}
              />
            )}
            <h1 className="absolute w-full mt-[-5rem] top-1/4 left-1/2 transform -translate-x-1/2 text-center text-3xl md:text-4xl lg:text-4xl font-bold text-white">
              Welcome to your Dashboard.
            </h1>
            <p className="absolute top-[30%] left-1/2 transform -translate-x-1/2 text-center text-base md:text-lg text-white mt-[-4rem]">
              Click anywhere to access your very own Virtual PC
            </p>

            {timeLeft > 0 ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-2/5 text-white bg-[#212121] p-4 md:p-8 border-2 border-black shadow-2xl cursor-default">
                <h5 className="text-sm md:text-base">
                  Thank you for your payment.<br />
                  Your account is being setup right now. <br /> <br />
                  It&apos;ll be available in <span className="text-[#055bfb]">{`0${minutes}`}:
                    {`${Number(seconds) > 9 ? "" : "0"}${seconds}`} minutes </span>
                </h5>
              </div>
            ) : (
              <div className="absolute ml-[-4px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <PowerButton
                  isToggledOn={isToggledOn}
                  onToggleButton={handleToggleButton}
                />
              </div>
            )}
          </div>
        </section>

        {/* Profile Section */}
        <section className="mt-8 flex flex-col items-center px-2 md:px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-8 text-white">Profile</h1>

          {/* Profile Card Container */}
          <div className="bg-black border border-gray-400 rounded-lg p-4 md:p-8 w-full max-w-4xl mx-auto">

            {/* Personal Info Heading - You might want to move this into AccountDetails component */}
            {menuItem === 'Account' && (
              <h2 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8 text-white relative">
                Personal Info.
                {/* Divider Line */}
                <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 h-px w-full bg-gray-400"></div>
              </h2>
            )}
            {/* Billing Info Heading - Add similar heading in BillingDetails if needed */}

            {/* Content Area (AccountDetails or BillingDetails) */}
            <div className="mt-6 md:mt-10">
              {/* NOTE: The internal structure and styling of AccountDetails and BillingDetails (the form fields, labels, values, and vertical divider) need to be updated separately to fully match the img. */}
              {content[menuItem as keyof typeof content]}
            </div>

            {/* Basic Plan Expiry Message (optional, depending on where you want this displayed) */}
            {user && user.currentPlan.toLowerCase() === "basic" && user.renewDate ? (
              <p className="text-red-500 text-center mt-4 text-sm md:text-base">Your Plan has expired! Renew your plan today to enjoy uninterrupted playtime.</p>
            ) : null}
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mt-6 md:mt-10 pb-6 md:pb-10">
            <div className="flex border border-gray-400 rounded-lg overflow-hidden">
              {Object.keys(content).map((item, idx) => (
                <button
                  key={idx}
                  className={`px-6 py-2 md:px-12 md:py-4 text-sm md:text-xl font-medium transition-colors duration-200
                    ${menuItem === item ? 'bg-gray-300 text-black' : 'bg-black text-white hover:bg-gray-800'}`}
                  onClick={() => setMenuItem(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

        </section>
      </Box>
    </>
  );
}