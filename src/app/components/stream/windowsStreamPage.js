import { useEffect, useRef, useState } from "react";
import BasicStream from "./basicStream";
import Spinner from "./overlays/spinner";
import { useSelector } from "react-redux";
import EndOfStream from "./overlays/endOfStream";
import Loading from "./overlays/loadingOverlay";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WindowsStream from "./windowsStream";

function WindowsStreamPage({ maintenance, stopStream, streamStatus, admin, serverId }) {
    const [fullscreen, setFullscreen] = useState(false);
    const fullscreenRef = useRef(null);
    fullscreenRef.current = fullscreen;
    const [pointerLock, setPointerLock] = useState(false);
    const pointerLockRef = useRef(null);
    pointerLockRef.current = pointerLock;
    const [pcConfig, setPcConfig] = useState(null);
    const [pcConfigErr, setPcConfigErr] = useState(null);
    const [idToken, setIdToken] = useState(null);
    const idTokenRef = useRef(null);
    idTokenRef.current = idToken;
    const [game, setGame] = useState(null);
    const [type, setType] = useState(null);
    const typeRef = useRef(null);
    typeRef.current = type;
    const [start, setStart] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [keyboardBased, setKeyboardBased] = useState(true);
    const [touchAllowed, setTouchAllowed] = useState(false);
    const [controlsAllowed, setControlsAllowed] = useState(true);
    const controlsAllowedRef = useRef(null);
    controlsAllowedRef.current = controlsAllowed;

    const { userToken } = useSelector(state => state.auth);

    const res = useRef(null);
    const userMappingsMobile = useRef(null);

    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === cookieName) {
                return value;
            }
        }
        return null;
    }

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let token = params.get('idToken');
        let type = params.get('type');

        setType(type);
        if (game == null) setGame(params.get('game'));
        if (token != null) setIdToken(token);
        if (!type) {
            // let token = getCookieValue("antplay-tech");
            setIdToken(userToken);
            setGame(localStorage.getItem('game'));
        }
        if (type === 'mobile') {
            res.current = params.get('resolution')
            setGame(params.get('game'));
            setKeyboardBased(false);
            setTouchAllowed(true);
            fetch('https://api.antcloud.co/api/controllerMapping/onscreen', {
                method: 'GET',
                headers: { Authorization: `JWT ${token}` }
            })
                .then(async res => {
                    if (res.status === 200) {
                        let result = await res.json();
                        localStorage.setItem('buttonLocations', JSON.stringify(result.mappings[0]));
                    }
                })
            fetch('https://api.antcloud.co/api/users/getgamepads', {
                method: 'GET',
                headers: { Authorization: `JWT ${token}` }
            })
                .then(async res => {
                    if (res.status === 200) {
                        let result = await res.json();
                        if (result.gamepad.length > 0) localStorage.setItem("userMappingsMobile", JSON.stringify(result.gamepad))
                        else userMappingsMobile.current = null;
                    }
                })
        } else {
            document.addEventListener("keydown", keyHandle, false);
            return () => {
                document.removeEventListener("keydown", keyHandle);
                if (fullscreenRef.current) {
                    closeFullscreen();
                    if (navigator.keyboard && navigator.keyboard.unlock) navigator.keyboard.unlock();
                }
            }
        }
        if (admin) {
            setControlsAllowed(false);
        }
    }, [])

    useEffect(() => {
        if (idToken)
            fetch('https://api.antcloud.co/api/users/getPcConfig', {
                method: 'POST',
                headers: { Authorization: `JWT ${idToken}` }
            })
                .then((res) => res.json())
                .then((pcConfig) => {
                    if (pcConfig.message === "Invalid Token" || pcConfig.message === "Token Expired") {
                        setPcConfigErr(true)
                    } else {
                        setPcConfig(pcConfig);
                        if (!typeRef.current) {
                            setStart(true);
                            // fullscreenRef.current = true
                            // openFullscreen(document.body)
                            // .then(() => {if (navigator.keyboard && navigator.keyboard.lock) navigator.keyboard.lock(["Escape"])})
                            // .catch((error) => console.error("Cannot go fullscreen", error));
                        }
                        setLoaded(true);
                    }
                })
                .catch((err) => {
                    setPcConfigErr(true)
                });
    }, [idToken])

    const keyHandle = (e) => {
        e.preventDefault();
        if (e.code === 'F10') {
            e.preventDefault();
            if (e.type === "keydown") {
                if (
                    window.screen.width === window.innerWidth &&
                    window.screen.height === window.innerHeight
                ) {
                    setFullscreen(false);
                    closeFullscreen();
                    if (navigator.keyboard && navigator.keyboard.unlock) navigator.keyboard.unlock();
                } else {
                    setFullscreen(true);
                    // document.getElementById('videoElem').style.minHeight = '100vh';
                    openFullscreen(document.body)
                        .then(() => { if (navigator.keyboard && navigator.keyboard.lock) navigator.keyboard.lock(["Escape"]) })
                        .catch((error) => console.error("Cannot go fullscreen", error));
                }
            }
            return;
        } else if (e.code === 'F8') {
            if (fullscreenRef.current && !pointerLockRef.current) {
                setPointerLock(true);
            } else {
                setPointerLock(false);
            }
        }
    };

    const openFullscreen = (elem) => {
        if (elem.requestFullscreen) {
            return elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            return elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            return elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            return elem.msRequestFullscreen();
        }
    }
    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    const setStartStream = () => {
        setStart(false);
        stopStream();
    }

    const toggleControls = () => {
        setControlsAllowed(!controlsAllowedRef.current);
    }

    const handleReload = () => {
        window.location.reload();
    }

    const basicDeniedStyle1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "90%",
        ":focus-visible": {
            "outline": "none"
        },
        ["@media (min-width:992px)"]: {
            width: "40%"
        },
        // width: 600,
        color: "#fff",
        bgcolor: '#212121',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: "center"
    };
    // console.log("Maintain:::: " + JSON.stringify(maintenance))
    return (
        <div>
            {
                loaded
                    // ? start
                    ?
                    maintenance.active ?
                        <Modal
                            open={true}
                            onClose={() => { window.Android.showMessageInNative('goBack') }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out"
                        >
                            <Box sx={basicDeniedStyle1}>
                                <Typography sx={{ textAlign: "center" }} variant="p">
                                    {maintenance.message ? maintenance.message : "Our service won't be available due to an emergency maintenance. Thank you for your patience and support."}
                                    {/* Our service won't be available due to an emergency maintenance from 12:30PM to 2PM today (Wednesday). Thank you for your patience and support. */}
                                    {/* Our sincere apologies for the inconvenience caused. Users will not be able to connect to their PCs. We are currently investigating the issue. Thank you for your patience and support. */}
                                </Typography>
                            </Box>
                        </Modal>
                        :
                        <WindowsStream
                            socketConnection={admin ? false : true}
                            servID={serverId}
                            connectionType={'windows'}
                            pcConfig={pcConfig}
                            idToken={idToken}
                            game={game}
                            admin={admin}
                            keyboardBased={keyboardBased}
                            keyboardAllowed={controlsAllowed}
                            gpadAllowed={controlsAllowed}
                            mouseAllowed={controlsAllowed}
                            touchAllowed={touchAllowed}
                            fullscreen={fullscreenRef.current}
                            pointerLock={pointerLockRef.current}
                            setStartStream={setStartStream}
                            streamStatus={streamStatus}
                            toggleControls={toggleControls}
                            res={res.current}
                        />
                    // : <button onClick={() => setStart(true)}>Start</button>
                    : pcConfigErr
                        ?
                        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <h3 style={{ textAlign: "center" }}>
                                Error Loading Configs
                                <br />
                            </h3>
                            <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={handleReload}>Reload</button>
                        </div>
                        : <div>
                            <h3 style={{ textAlign: "center", marginTop: "100px" }}>
                                Loading Configs
                                <br />
                            </h3>
                            <Spinner />
                        </div>
            }
        </div>
    );
}

export default WindowsStreamPage;