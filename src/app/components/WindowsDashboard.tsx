import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect, useRef, useState, ReactElement } from 'react';
// import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography, { TypographyProps } from '@mui/material/Typography';
import AccountDetails from './account-details/accountDetails';
import BillingDetails from './billing-details/billingDetails';
// import Miscellaneous from "../game-settings/Miscellaneous";
import ComingSoon from '../../../public/images/ComingSoon.webp';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Cancel, Close } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { PowerButton } from './PowerButton';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import StreamImage from '../../../public/StreamImage.png';


declare global {
    interface Window {
        Android?: {
            showMessageInNative: (message: string) => void;
        };
    }
}

interface WebViewEventDetail {
    start?: boolean;
    paused?: boolean;
    resumed?: boolean;
}

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
    userToken: string | null;
    userRefreshToken: string | null;
    userInfo: {
        emailVerified: boolean;
    };
}

interface UserState {
    userDetails: User | null;
}

interface RootState {
    auth: AuthState;
    user: UserState;
}

interface WindowsDashboardProps {
    maintenance: Maintenance;
    games: Game[];
    stream: (type: string) => void;
    user: User | null;
}

const tutorialStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    height: "50%",
    // width: 600,
    color: "#fff",
    bgcolor: '#212121',
    border: '2px solid #000',
    '&:focus-visible': {
        outline: "none"
    },
    boxShadow: 24,
    p: 4,
};

// Define type for content object
interface Content {
    Account: ReactElement;
    Billing: ReactElement;
    // Settings: ReactElement;
}


export function WindowsDashboard({ maintenance, games, stream, user }: WindowsDashboardProps) {

    const gamesRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const { loggedIn, userInfo, userToken, userRefreshToken } = useSelector((state: RootState) => state.auth);
    const currentUserDetails = useSelector((state: RootState) => state.user.userDetails);

    // Modal
    const [comingSoon, setComingSoon] = useState(false);
    const handleOpen = () => setComingSoon(true);
    const handleClose = () => setComingSoon(false);

    const [basicDenied, setBasicDenied] = useState(false);
    const handleBasicDeniedClose = () => setBasicDenied(false);

    const [maintenanceModal, setMaintenanceModal] = useState(false);
    const handleMaintenanceModalClose = () => setMaintenanceModal(false);

    const [emailDenied, setEmailDenied] = useState(false);
    const handleEmailDeniedClose = () => setEmailDenied(false);

    const [windowsGuideCheck, setWindowsGuideCheck] = useState(false);
    const handleWindowsGuideCheck = () => setWindowsGuideCheck(false);

    const [startDisabled, setStartDisabled] = useState(false);
    const [openStartDisabled, setOpenStartDisabled] = useState(false);
    const [tutorialModal, setTutorialModal] = useState(false);
    const handleOpenStartDisabledClose = () => setOpenStartDisabled(false);
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

    const [playButton, setPlayButton] = useState(true);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 300, sm: 500, md: 800 },
        '&:focus-visible': {
            outline: "none"
        }
    };

    const basicDeniedStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '80%', md: '40%' },
        color: "#fff",
        bgcolor: '#212121',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const basicDeniedStyle1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '80%', md: '40%' },
        ":focus-visible": {
            "outline": "none"
        },
        color: "#fff",
        bgcolor: '#212121',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: "center"
    };

    const tutorialStyleResponsive = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '1200px',
        height: '80%',
        maxHeight: '800px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        overflow: 'hidden'
    };


    const content: Content = {
        Account: <AccountDetails />,
        Billing: <BillingDetails />,
        // Settings: <Miscellaneous />,
    };

    const [menuItem, setMenuItem] = useState<keyof Content>("Account");
    const [showVideoStream, setShowVideoStream] = useState(false);


    useEffect(() => {
        setMenuOpen(false);
    }, [menuItem]);

    const [isInstalled, setIsInstalled] = useState<boolean | null>(null);


    const checkAppInstalled = () => {
        let isAppOpened = false;

        // Save the current time
        const currentTime = new Date().getTime();

        // Add event listener for focus change
        const focusListener = () => {
            isAppOpened = true;
        };
        window.addEventListener('blur', focusListener);

        // Attempt to open the app using a custom URI scheme
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'Antcloud://open'; // Replace with your app's custom URI scheme
        document.body.appendChild(iframe);

        // Set a timeout to check whether the app was opened or not
        setTimeout(() => {
            window.removeEventListener('blur', focusListener);
            document.body.removeChild(iframe);

            const timeSinceAttempt = new Date().getTime() - currentTime;

            // If the app was opened (blur detected) or enough time has passed, assume the app was installed
            if (isAppOpened && timeSinceAttempt < 2000) {
                setIsInstalled(true); // App is installed
            } else {
                setIsInstalled(false); // App is not installed
            }
        }, 1000); // 1-second delay
    };

    const [isStartedModal, setIsstartedModal] = useState(false);

    const handleDesktopOpen = () => {
        if (!maintenance.active) {
            const windowsCheck = localStorage.getItem('windowsGuide')
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
                    if ((currentUserDetails && (currentUserDetails.currentPlan === "Basic" || currentUserDetails.currentPlan === "basic")) || !currentUserDetails) {
                        setBasicDenied(true)
                    } else if (!userInfo.emailVerified) {
                        setEmailDenied(true)
                    } else if (startDisabled) {
                        setOpenStartDisabled(true)
                    } else {
                        // setComingSoon(true)
                        if (windowsCheck) {
                            setTimeout(() => {
                                stream('desktop')
                            }, 500)
                        } else {
                            setWindowsGuideCheck(true)
                        }
                    }
                }
            }
        } else {
            setMaintenanceModal(true)
        }
    }


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

    // useEffect(() => {
    //   if(user) {
    //     // console.log(user)
    //     if (user.id != "6646dff9465ec18bde7549a3" && user.id != "6634dd0d9a611aeb3d9b781c" && user.id != "6645ad2d0f6deed1587dcb94" && user.id !== "661f846dfb6c209ae828e4da" && user.id !== "6654e32c1313f589ef10c4e9" && user.id !== "674d4a0f28834a251ec53c43" && user.id !== "67b0953b552c3921673437ad" && user.id !== "6658628adfba8ef6fddc464a" && user.id !== "666e7c231ed3ee1b7ea00861" && user.id !== "665589b61313f589ef10d9e9") navigate('/service/updates')
    //   }
    // }, [currentUserDetails]) // Changed dependency


    const handleWindowsCheck = () => {
        setTimeout(() => {
            router.push('/windows/guide')
        }, 500)
    }

    const handleWindowsCheckYes = () => {
        localStorage.setItem('windowsGuide', 'true')
        setWindowsGuideCheck(false);
    }

    return (
        <>

            {/* Test Panel for All Modals
            <div className="fixed top-4 right-4 z-50 bg-gray-900 p-4 rounded-lg shadow-lg space-y-2">
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
                    boxShadow: 24,
                    p: { xs: 2, md: 4 },
                    borderRadius: 10,
                    outline: 'none',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
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
                                    <Image
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
                                    <Image
                                        src="/images/OurGames.png"
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
                    <Image
                        className="w-full h-full rounded-lg"
                        src={ComingSoon.src}
                        width={400}
                        height={400}
                        alt="Coming Soon"
                    />
                </Box>
            </Modal>

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
                    {currentUserDetails?.renewDate
                        ?
                        <Typography component="p" sx={{
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
                        <Typography component="p" sx={{
                            textAlign: 'center',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            fontWeight: 400,
                            letterSpacing: '0.5px',
                            lineHeight: 1.6
                        }}>
                            Oops! It seems like you're not on a paid plan right now.
                            If you have recently purchased or renewed a plan, please wait for five minutes and then refresh the page for your plan to activate.
                            <br /> <br />
                            If you haven't purchased a plan, Please visit our pricing page from below Link.
                        </Typography>
                    }
                    <br /> <br />
                    <Link
                        href="/pricing"
                        className="block w-2/5 mx-auto px-6 py-3 text-center bg-purple-600/80 hover:bg-purple-700/90 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transform"
                    >
                        Pricing
                    </Link>
                </Box>
            </Modal>

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
                        Oops! It seems like you haven't verified your email yet.
                        <br /> <br />
                        Please verify your email before starting the stream.
                    </Typography>
                </Box>
            </Modal>

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

            <Modal
                open={windowsGuideCheck}
                onClose={() => setWindowsGuideCheck(false)}
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
                    <Typography variant='h6' sx={{
                        textAlign: 'center',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontWeight: 400,
                        letterSpacing: '0.5px',
                        lineHeight: 1.6
                    }}>
                        Please Go through our windows app guide first by clicking <Link href="#" style={{ color: "#22B9A6" }} onClick={handleWindowsCheck}>here</Link>.
                        <br />
                        Have you gone through the windows app guide ?
                        <Stack direction="row" sx={{ justifyContent: "center", marginTop: "1rem" }} spacing={2}>
                            <Button className="windowsGuideCheckButtons" variant="outlined" sx={{ color: "#22B9A6", borderColor: "#22B9A6" }} onClick={handleWindowsCheckYes}>Yes <CheckIcon /></Button>
                            <Button onClick={() => router.push('/windows/guide')} className="windowsGuideCheckButtons" variant="outlined" sx={{ color: "red", borderColor: "red" }}>
                                No <CloseIcon />
                            </Button>
                        </Stack>
                    </Typography>
                </Box>
            </Modal>

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
                                src={StreamImage.src}
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
                                    It'll be available in <span className="text-[#055bfb]">{`0${minutes}`}:
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
                            {/* NOTE: The internal structure and styling of AccountDetails and BillingDetails (the form fields, labels, values, and vertical divider) need to be updated separately to fully match the image. */}
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
                                    onClick={() => setMenuItem(item as keyof Content)}
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