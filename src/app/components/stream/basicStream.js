import styles from './basicstream.module.css'
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { Helmet } from 'react-helmet';
import Loading from './overlays/loadingOverlay';
import Waiting from './overlays/waitingOverlay';
import Settings from './overlays/settingsModal';
import Video from './video';
import Keyboard from './controls/keyboard';
import Gamepad from './controls/gamepad';
import GamepadOverlay from './onscreencontrols/gamepadOverlay';
import OnScreenKeyboard from './onscreencontrols/onScreenKeyboard';
import EndOfStream from './overlays/endOfStream';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import OnScreenMouse from './onscreencontrols/onScreenMouse';
// var OpusScript = require("opusscript");
// const Encoder = require('libopus.js').Encoder;

function BasicStream({ socketConnection, servID, connectionType, pcConfig, idToken, game, admin, fullscreen, pointerLock, keyboardBased, keyboardAllowed, mouseAllowed, gpadAllowed, touchAllowed, setStartStream, streamStatus, toggleControls, res }) {

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const idTokenRef = useRef(null);
  const socketRef = useRef(null);
  const firstConnectedRef = useRef(null);
  const wsStartedRef = useRef(null);
  const inactiveRef = useRef(null);
  const websocketRef = useRef(null);
  const pc = useRef(null);
  const rttRef = useRef();
  const startTime = useRef(0);
  const pointerLockAllowedRef = useRef(null);
  const showOnScreenKeyboardRef = useRef(null);
  const showOnScreenMouseRef = useRef(null);
  const gpadOverlayRef = useRef(null);
  const positionRef = useRef(null);
  const fScreenRef = useRef(null);
  const pLockRef = useRef(null);
  const gpadPostionSavedRef = useRef(null);

  //Video sizing
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [videoProps, setVideoProps] = useState({ width: "100%" });
  const [divProps, setDivProps] = useState({ style: {} });

  //Stream Control
  const [start, setStart] = useState(false);
  const [socket, setSocket] = useState(null);
  const [dc, setDC] = useState(null);
  const [firstConnected, setFirstConnected] = useState(false);
  const [showStream, setShowStream] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [vmstatus, setVmstatus] = useState(false);
  const [connected, setConnected] = useState(false);
  const [length, setLength] = useState(0);
  const [waittime, setWaittime] = useState('5 mins');
  const [newConnection, setNewConnection] = useState(false);
  const [wsStarted, setWsStarted] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [inactiveReason, setInactiveReason] = useState('');
  const [websocket, setWebsocket] = useState(null);

  // Delete this
  // const [microphone, setMicrophone] = useState(null);
  // const microphoneref = useRef();
  // microphoneref.current = microphone;


  let serverID, pcOnTrack, pcOnDC, dcOnMessage, onICEState, onICECand;

  //Stream Settings
  const [bitrate, setBitrate] = useState(6000);
  const [FPS, setFps] = useState(60);

  const [timeLeft, setTimeLeft] = useState(0);
  const [planEndWarning, setPlanEndWarning] = useState(false);
  const [rtt, setRtt] = useState(0);

  //Mouse control
  const [mouseMoveMessage, setMouseMoveMessage] = useState("");
  const [mouseBtnMessage, setMouseBtnMessage] = useState("");
  const [mouseWheelMessage, setMouseWheelMessage] = useState("");
  const [pointerLockAllowed, setPointerLockAllowed] = useState(true);

  //Keyboard control
  const [keyMessage, setKeyMessage] = useState("");

  //Gamepad Messages 
  const [gpadMessage, setGpadMessage] = useState("");

  //On-Screen Keyboard
  const [showOnScreenKeyboard, setShowOnScreenKeyboard] = useState(false);

  // On-Screen Mouse
  const [showOnScreenMouse, setShowOnScreenMouse] = useState(false);

  //on-Screen Gamepad
  const [gpadOverlay, setGpadOverlay] = useState(false);
  const [position, setPosition] = useState(false);
  const [GpadPositionSaved, setGpadPositionSaved] = useState(false);
  const [userMappingsMobile, setUserMappingsMobile] = useState(null);

  // const [log, setLog] = useState(JSON.stringify({}));


  const { userDetails } = useSelector(state => state.user);
  const resolution = res && res !== null ? res : userDetails && userDetails.resolution ? userDetails.resolution : 1080;

  idTokenRef.current = idToken;
  socketRef.current = socket;
  firstConnectedRef.current = firstConnected;
  wsStartedRef.current = wsStarted;
  inactiveRef.current = inactive;
  websocketRef.current = websocket;
  rttRef.current = rtt;
  pointerLockAllowedRef.current = pointerLockAllowed;
  showOnScreenKeyboardRef.current = showOnScreenKeyboard;
  showOnScreenMouseRef.current = showOnScreenMouse;
  gpadOverlayRef.current = gpadOverlay;
  positionRef.current = position;
  fScreenRef.current = fullscreen;
  pLockRef.current = pointerLock;
  gpadPostionSavedRef.current = GpadPositionSaved

  const [cookies, setCookie, removeCookie] = useCookies([
    "isStreamConnected", "windowClosedAt"
  ]);

  //Initial
  useEffect(() => {
    // console.log(game)
    document.body.style.overflow = 'hidden';
    screenSize();
    window.addEventListener('resize', screenSize);

    return () => {
      stop();
    }
  }, [])

  useEffect(() => {
    // if (pcConfig) 
    setStart(true);
    if (localStorage.getItem("userMappingsMobile")) setUserMappingsMobile(JSON.parse(localStorage.getItem("userMappingsMobile")))
    // console.log(userDetails)
    // setShowStream(true);
    // setLoading(true)
  }, [pcConfig])

  //Stream Control Plan
  useEffect(() => {
    if (socketConnection) {
      if (start) {
        let socket = io("https://socket.antcloud.co:8000", {
          // let socket = io("http://localhost:5001", {
          query: {
            type: "client",
            game: game,
            // server: '56894315',
            token: idTokenRef.current,
            stream: `${resolution} 6000 60 10`,
            connection: connectionType,
            // connection: "mobile",
          },
          secure: true,
          transports: ["websocket"]
        });
        socket.on("connect_error", () => {
          // console.log(err);
          if (!inactiveRef.current) {
            stop();
            setInactive(true);
            setInactiveReason('wrongtoken');
          }
        })
        socket.on("new_connection", (data) => {
          if (data.clients >= 2) {
            setNewConnection(true);
          }
        });
        socket.on("waiting", (length) => {
          let waittime;
          if (length <= 5) {
            waittime = "5 mins";
          } else if (length <= 10) {
            waittime = "5-10 mins";
          } else if (length <= 20) {
            waittime = "5-15 mins";
          } else if (length <= 25) {
            waittime = "15-25 mins";
          } else {
            waittime = "30 mins";
          }
          setWaiting(true);
          setLength(length);
          setWaittime(waittime);
          setLoading(false);
        });
        socket.on("inactive", (data) => {
          // console.log("Inactive")
          // console.log(data)
          if (!inactiveRef.current) {
            stop();
            setInactive(true);
            setInactiveReason(data);
          }
        });
        socket.on("control", (data) => {
          if (typeof data === "object") {
            setTimeLeft(data.timeLeft);
          } else if (data.includes("serverID")) {
            if (!wsStartedRef.current) {
              serverID = JSON.parse(data).serverID;
              startWebSocket();
              setWsStarted(true);
            }
          } else if (data === "gamequit") {
            setStartStream();
          } else if (data === "planendwarning") {
            setPlanEndWarning(true);
          }
        });
        socket.on("gamequit", () => {
          setStartStream(false)
        })
        socket.on("status", data => {
          if (data === "starting") setVmstatus("starting");
          else if (data === "done") setVmstatus("done");
          else setVmstatus(false);
        })
        socket.on('reset', () => {
          const currentTime = new Date().getTime();
          localStorage.setItem("startedAt", currentTime.toString());
          stop();
          setInactive(true);
          setInactiveReason("Your Stream has ended!");
        })
        setSocket(socket);
        setShowStream(true);
        setLoading(true);
      }
    } else {
      if (start) {
        serverID = servID;
        startWebSocket();
        setShowStream(true);
        setLoading(true);
      }
    }
  }, [start])

  useEffect(() => {
    if (dc) {
      let pingInterval = setInterval(() => {
        if (dc.readyState === 'open') {
          startTime.current = Date.now();
          dc.send(JSON.stringify({ id: 'ping' }));
        }
      }, 1000);
      dcOnMessage = dc.onmessage = (evt) => {
        if (typeof evt.data !== "string") {
          return;
        }
        if (evt.data === "Connected") {
          setLoading(false);
          setWaiting(false);
          setConnected(true);
        } else if (evt.data === "pong") {
          let currTime = Date.now();
          setRtt((currTime - startTime.current) / 2);
        } else if (mouseAllowed) {
          let msg = JSON.parse(evt.data);
          // if (msg.id === "mouseLock") {
          //   if (msg.lock) {
          //     if (videoRef.current && !document.pointerLockElement && fScreenRef.current) {
          //       if (pointerLockAllowedRef.current) videoRef.current.requestPointerLock();
          //     }
          //   } else {
          //     document.exitPointerLock();
          //   }
          // }
          if (msg.id === "mouseLock") {
            if (msg.lock) {
              if (videoRef.current && !document.pointerLockElement && fScreenRef.current) {
                if (pointerLockAllowedRef.current) videoRef.current.requestPointerLock();
              }
            } else {
              if (fScreenRef.current && pLockRef.current) {
                videoRef.current.requestPointerLock();
              } else {
                document.exitPointerLock();
              }
            }
          }
          //   else if (msg.id == "gpadVibration") {
          //     // console.log(msg.index, msg.leftMotor, msg.rightMotor)
          //     if ((msg.index || msg.index === 0) && msg.leftMotor >0 || msg.rightMotor>0) {
          //         let gps = navigator.getGamepads();
          //         if (gps.length){
          //             let gp = gps[msg.index];
          //             let strongMagnitude = (msg.leftMotor > msg.rightMotor?msg.leftMotor:msg.rightMotor)/255;
          //             if (gp.vibrationActuator) gp.vibrationActuator.playEffect('dual-rumble', {
          //                 startDelay: 0,
          //                 duration: 150,
          //                 weakMagnitude: 1.0,
          //                 strongMagnitude,
          //             });
          //             // else console.log("Gamepad doesn't support vibration");
          //         }
          //     }
          // }
        }
      };
      dc.onclose = () => {
        clearInterval(pingInterval);
      }
    }
  }, [dc]);

  let currentLog = {
    A: false,
    B: false,
    X: false,
    Y: false,
    LS: false,
    RS: false,
    LT: 0,
    RT: 0,
    Back: false,
    Start: false,
    LJB: false,
    RJB: false,
    Up: false,
    Down: false,
    Left: false,
    Right: false,
    Main: false,
    RJY: 0,
    RJX: 0,
    LJY: 0,
    LJX: 0,
  };

  const typeRef = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = 'Are you sure you want to leave? Your changes may not be saved.';
      event.preventDefault();
      event.returnValue = message; // Required for Chrome
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    typeRef.current = params.get("type");
    if (typeRef.current === "mobile" && params.get('test') === 'true') {
      console.log("HERE In Line 356")
      window.addEventListener("webview", (event) => {
        console.log("Event Captured :" + event.detail)
        if (event.detail.controls) {
          const gg = event.detail.controls;
          // console.log("gg", gg);
          let buttonMessages = gg.match(
            /buttonMessage\(key=(.*?), pressed=(.*?)\)/g
          );
          buttonMessages.forEach((message) => {
            let pressed = message.match(/pressed=(.*?)[,\)]/)[1];
            let key = message.match(/key=(.*?)[,\)]/)[1];
            if (pressed === "true") {
              currentLog[key] = true;
            } else {
              currentLog[key] = false;
            }
            if ((key == "RT" && pressed === "true") || (key == "LT" && pressed === "true")) {
              currentLog[key] = 1;
            } else if ((key == "RT" && pressed === "false") || (key == "LT" && pressed === "false")) {
              currentLog[key] = 0;
            }
            let ljMatch = gg.match(/lj=joystickMessage\(x=(.*?), y=(.*?)\)/);
            if (ljMatch) {
              currentLog.LJX = parseFloat(ljMatch[1]);
              currentLog.LJY = parseFloat(ljMatch[2]);
            }
            let rjMatch = gg.match(/rj=joystickMessage\(x=(.*?), y=(.*?)\)/);
            if (rjMatch) {
              currentLog.RJX = parseFloat(rjMatch[1]);
              currentLog.RJY = parseFloat(rjMatch[2]);
            }
          });
          delete currentLog.Options;
          delete currentLog.Select;
          let message = {
            id: "gpadevent",
            index: 0,
            state: JSON.stringify(currentLog),
          };
          console.log("GPAD MESSAGE")
          console.log(JSON.stringify(message))
          setGpadMessage(JSON.stringify(message));
          //   let key = Object.keys(gg)[0];
          // let buttonMessages = gg.match(
          //   /buttonMessage\(key=(.*?), pressed=(.*?)\)/g
          // );
          // buttonMessages.forEach((message) => {
          //   let pressed = message.match(/pressed=(.*?)[,\)]/)[1];
          //   let key = message.match(/key=(.*?)[,\)]/)[1];
          //   if (pressed === "true") {
          //     currentLog[key] = true;
          //   } else {
          //     currentLog[key] = false;
          //   }
          //   let ljMatch = gg.match(/lj=joystickMessage\(x=(.*?), y=(.*?)\)/);
          //   if (ljMatch) {
          //     currentLog.LJX = parseFloat(ljMatch[1]);
          //     currentLog.LJY = parseFloat(ljMatch[2]);
          //   }
          //   let rjMatch = gg.match(/rj=joystickMessage\(x=(.*?), y=(.*?)\)/);
          //   if (rjMatch) {
          //     currentLog.RJX = parseFloat(rjMatch[1]);
          //     currentLog.RJY = parseFloat(rjMatch[2]);
          //   }
          // });
          // console.log(JSON.stringify(currentLog));
          // let message = {
          //   id: "gpadevent",
          //   index: 0,
          //   state: JSON.stringify(currentLog),
          // };
          // console.log("GPAD MESSAGE")
          // console.log(JSON.stringify(message))
          // setGpadMessage(JSON.stringify(message));
        }
      });

      return () => {
        window.removeEventListener('webview')
      }
    }
  }, []);

  // Test
  // useEffect(() => {
  //   document.addEventListener('keydown', (e) => {
  //     if (e.code == 'Digit5') {
  //       let message1 = {
  //         id: "gpadevent",
  //         index: 0,
  //         state: JSON.stringify({
  //           "A": false,
  //           "B": false,
  //           "X": false,
  //           "Y": false,
  //           "LS": false,
  //           "RS": false,
  //           "LT": 0,
  //           "RT": 0,
  //           "Back": false,
  //           "Start": false,
  //           "LJB": false,
  //           "RJB": false,
  //           "Up": false,
  //           "Down": false,
  //           "Left": false,
  //           "Right": false,
  //           "Main": false,
  //           "LJX": 0,
  //           "LJY": 0,
  //           "RJX": 0,
  //           "RJY": 0
  //         }
  //         )
  //       }
  //       console.log(JSON.stringify(message1))
  //       setGpadMessage(message1)
  //     }
  //     if (e.code == 'Digit4') {
  //       let gg = "fpsControlsMessage(lj=joys+tickMessage(x=0, y=0), rj=joystickMessage(x=0, y=0), shoot=buttonMessage(key=RT, pressed=false), scope=buttonMessage(key=LT, pressed=false), reload=buttonMessage(key=LS, pressed=false), jump=buttonMessage(key=A, pressed=true), crouch=buttonMessage(key=RJB, pressed=false), sprint=buttonMessage(key=LJB, pressed=false), melee=buttonMessage(key=RS, pressed=false), useItem=buttonMessage(key=X, pressed=false), dropWeapon=buttonMessage(key=Select, pressed=false), prevWeapon=buttonMessage(key=Left, pressed=false), nextWeapon=buttonMessage(key=Right, pressed=false), heal=buttonMessage(key=Down, pressed=false), menu=buttonMessage(key=Options, pressed=false), score=buttonMessage(key=Select, pressed=false))"
  //       let buttonMessages = gg.match(
  //         /buttonMessage\(key=(.*?), pressed=(.*?)\)/g
  //       );
  //       buttonMessages.forEach((message) => {
  //         let pressed = message.match(/pressed=(.*?)[,\)]/)[1];
  //         let key = message.match(/key=(.*?)[,\)]/)[1];
  //         if (pressed === "true") {
  //           currentLog[key] = true;
  //         } else {
  //           currentLog[key] = false;
  //         }
  //         if (key == "RT" && pressed === "true") {
  //           currentLog[key] = 0;
  //         } else if (key == "LT" && pressed === "1") {
  //           currentLog[key] = 1;
  //         }
  //         let ljMatch = gg.match(/lj=joystickMessage\(x=(.*?), y=(.*?)\)/);
  //         if (ljMatch) {
  //           currentLog.LJX = parseFloat(ljMatch[1]);
  //           currentLog.LJY = parseFloat(ljMatch[2]);
  //         }
  //         let rjMatch = gg.match(/rj=joystickMessage\(x=(.*?), y=(.*?)\)/);
  //         if (rjMatch) {
  //           currentLog.RJX = parseFloat(rjMatch[1]);
  //           currentLog.RJY = parseFloat(rjMatch[2]);
  //         }
  //       });
  //       delete currentLog.Options;
  //       delete currentLog.Select;
  //       let message = {
  //         id: "gpadevent",
  //         index: 0,
  //         state: JSON.stringify(currentLog),
  //       };
  //       console.log("GPAD MESSAGE")
  //       console.log(JSON.stringify(message))
  //       setGpadMessage(JSON.stringify(message));

  //       // currLog.A = true;
  //       // currLog.B = false;
  //       // currLog.X = false;
  //       // currLog.Y = false;
  //       // currLog.LS = false;
  //       // currLog.RS = false;
  //       // currLog.LT = 0;
  //       // currLog.RT = 0;
  //       // currLog.Back = false;
  //       // currLog.Start = false;
  //       // currLog.LJB = false;
  //       // currLog.RJB = false;
  //       // currLog.Up = false;
  //       // currLog.Down = false;
  //       // currLog.Left = false;
  //       // currLog.Right = false;
  //       // currLog.Main = false;
  //       // currLog.LJX = 0;
  //       // currLog.LJY = 0;
  //       // currLog.RJX = 0;
  //       // currLog.RJY = 0;
  //       // let templog = JSON.parse(log);
  //       // if (JSON.stringify(currLog) != JSON.stringify(templog)) {
  //       //   // console.log(currLog);
  //       //   templog = currLog;
  //       //   setLog(JSON.stringify(templog));
  //       //   let message = {
  //       //     id: "gpadevent",
  //       //     index: 0,
  //       //     state: JSON.stringify(currLog),
  //       //   };
  //       //   console.log(JSON.stringify(message))
  //       //   setGpadMessage(JSON.stringify(message));
  //       // }
  //       // setTimeout(() => {
  //       // let message = {
  //       //   id: "gpadevent",
  //       //   index: 0,
  //       //   state: JSON.stringify({
  //       //     "A": true,
  //       //     "B": false,
  //       //     "X": false,
  //       //     "Y": false,
  //       //     "LS": false,
  //       //     "RS": false,
  //       //     "LT": 0,
  //       //     "RT": 0,
  //       //     "Back": false,
  //       //     "Start": false,
  //       //     "LJB": false,
  //       //     "RJB": false,
  //       //     "Up": false,
  //       //     "Down": false,
  //       //     "Left": false,
  //       //     "Right": false,
  //       //     "Main": false,
  //       //     "LJX": 0,
  //       //     "LJY": 0,
  //       //     "RJX": 0,
  //       //     "RJY": 0
  //       //   }
  //       //   ),
  //       // };
  //       // console.log(JSON.stringify(message))
  //       // setGpadMessage(message)
  //       // },200)
  //     }
  //   })

  //   document.addEventListener('keyup', (e) => {
  //     if (e.code == 'Digit4') {
  //       let currLog = {};
  //       currLog.A = false;
  //       currLog.B = false;
  //       currLog.X = false;
  //       currLog.Y = false;
  //       currLog.LS = false;
  //       currLog.RS = false;
  //       currLog.LT = 0;
  //       currLog.RT = 0;
  //       currLog.Back = false;
  //       currLog.Start = false;
  //       currLog.LJB = false;
  //       currLog.RJB = false;
  //       currLog.Up = false;
  //       currLog.Down = false;
  //       currLog.Left = false;
  //       currLog.Right = false;
  //       currLog.Main = false;
  //       currLog.LJX = 0;
  //       currLog.LJY = 0;
  //       currLog.RJX = 0;
  //       currLog.RJY = 0;
  //       let templog = JSON.parse(log);
  //       if (JSON.stringify(currLog) != JSON.stringify(templog)) {
  //         // console.log(currLog);
  //         templog = currLog;
  //         setLog(JSON.stringify(templog));
  //         let message = {
  //           id: "gpadevent",
  //           index: 0,
  //           state: JSON.stringify(currLog),
  //         };
  //         console.log(JSON.stringify(message))
  //         setGpadMessage(JSON.stringify(message));
  //       }
  //     }
  //   })
  // }, [])

  useEffect(() => {
    if (newConnection) {
      if (waiting) {
        setLoading(true);
        setWaiting(false);
      }
    }
  }, [newConnection])

  useEffect(() => {
    if (streamStatus === 'paused') {
      setShowStream(false);
      if (socketConnection) socket.emit('paused');
      // stopPC();
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) audioRef.current.pause();
    } else if (streamStatus === 'resumed') {
      setShowStream(true);
      setLoading(true);
      if (socketConnection) socket.emit('resumed');
      if (videoRef.current) videoRef.current.play();
      if (audioRef.current) audioRef.current.play();
    }
  }, [streamStatus])

  //Stream Settings
  useEffect(() => {
    socket?.emit("setstream", resolution + " " + bitrate + " " + FPS + " 10");
    let message = {
      id: 'fps',
      fps: parseInt(FPS)
    }
    if (dc && dc.readyState === 'open') {
      dc.send(JSON.stringify(message))
    }
  }, [FPS]);

  useEffect(() => {
    socket?.emit("setstream", resolution + " " + bitrate + " " + FPS + " 10");
    let message = {
      id: 'quality',
      quality: bitrate
    }
    if (dc && dc.readyState === 'open') {
      dc.send(JSON.stringify(message))
    }
  }, [bitrate]);

  //Video positioning
  useEffect(() => {
    screenSize();
  }, [fScreenRef.current])

  //Controls
  useEffect(() => {
    if (dc && dc.readyState === 'open') {
      dc.send(mouseMoveMessage);
    }
  }, [mouseMoveMessage]);
  useEffect(() => {
    if (dc && dc.readyState === 'open') {
      dc.send(mouseBtnMessage);
    }
  }, [mouseBtnMessage]);
  useEffect(() => {
    if (dc && dc.readyState === 'open') {
      dc.send(mouseWheelMessage);
    }
  }, [mouseWheelMessage]);
  useEffect(() => {
    if (dc && dc.readyState === 'open') {
      dc.send(keyMessage);
    }
  }, [keyMessage]);
  useEffect(() => {
    if (dc && dc.readyState === 'open') {
      // console.log(JSON.stringify(gpadMessage))
      dc.send(gpadMessage);
    }
  }, [gpadMessage]);

  // Delete this
  // useEffect(() => {
  //   console.log('2334')
  //   if (dc && dc.readyState === 'open') {
  //     console.log("Gonna Send")
  //     let message = {
  //       id: "mic",
  //       mes: microphoneref.current,
  //     };
  //     console.log(message);
  //     dc.send(JSON.stringify(message));
  //   }
  // }, [microphoneref.current]);

  //Stop functions
  const stopPC = () => {
    if (videoRef.current) videoRef.current.srcObject = null;
    if (audioRef.current) audioRef.current.srcObject = null;
    if (dc) {
      dc.removeEventListener("message", dcOnMessage);
      dc.close();
      setDC(null);
    }
    if (pc.current) {
      pc.current.removeEventListener("track", pcOnTrack);
      pc.current.removeEventListener("datachannel", pcOnDC);
      pc.current.removeEventListener("iceconnectionstatechange", onICEState);
      pc.current.removeEventListener("icecandidate", onICECand);
      if (pc.current.getTransceivers) {
        pc.current.getTransceivers().forEach((transceiver) => {
          if (transceiver.stop) {
            transceiver.stop();
          }
        });
      }
      setTimeout(() => {
        if (pc.current) pc.current.close();
        pc.current = null;
      }, 500);
    }
  };

  const stop = () => {
    stopPC();
    if (websocketRef.current) {
      websocketRef.current.close();
      setWebsocket(null);
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      setSocket(null);
    }
    window.removeEventListener('resize', screenSize);
  };

  //Websocket Funcstions
  const randomId = (length) => {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const pickRandom = () => characters.charAt(Math.floor(Math.random() * characters.length));
    return [...Array(length)].map(pickRandom).join("");
  };

  const startWebSocket = async () => {
    let clientId = randomId(10);
    let websocket = new WebSocket("wss://socket.antcloud.co:8000/socket.io/?EIO=4&transport=websocket&type=websocketclient&clientID=" + clientId);
    // let websocket = new WebSocket("ws://localhost:5001/socket.io/?EIO=4&transport=websocket&type=websocketclient&clientID="+clientId);

    websocket.onmessage = async (evt) => {
      if (evt.data[0] === "0") {
        websocket.send('40')
      }
      else if (evt.data[0] === "2") {
        websocket.send('3')
      }
      else if (evt.data[0] === '4' && evt.data[1] === '0') {
        sendRequest();
      }
      else if (evt.data[0] === '4' && evt.data[1] === '2') {
        const message = JSON.parse(evt.data.substr(18, evt.data.length - 19))
        if (message.type === "offer") {
          createPeerConnection({
            sdp: message.description,
            type: message.type,
          });
        } else if (message.type === "candidate") {
          pc.current.addIceCandidate({
            candidate: message.candidate,
            sdpMid: message.mid,
          });
        }
      }
    };
    setWebsocket(websocket);
  };

  const sendLocalCandidate = (cand) => {
    const { candidate, sdpMid } = cand;
    let message = JSON.stringify(
      [
        "pcconnection",
        {
          id: serverID,
          type: "candidate",
          candidate,
          mid: sdpMid,
        }
      ]
    );

    websocketRef.current.send('42' + message);
  };

  const sendRequest = () => {
    let message = JSON.stringify(
      ['pcconnection',
        {
          id: serverID,
          type: "request",
        }
      ]);
    websocketRef.current.send('42' + message);
  };

  // const startBleh = async () => {
  //   try {
  //     // Get local stream, show it in self-view, and add it to be sent.
  //     navigator.getUserMedia({
  //       audio: true
  //     }, function (stream) {

  //       //5)
  //       recordAudio = RecordRTC(stream, {
  //         type: 'audio',

  //         //6)
  //         mimeType: 'audio/opus',
  //         sampleRate: 44100,
  //         // used by StereoAudioRecorder
  //         // the range 22050 to 96000.
  //         // let us force 16khz recording:
  //         desiredSampRate: 16000,

  //         // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
  //         // CanvasRecorder, GifRecorder, WhammyRecorder
  //         recorderType: StereoAudioRecorder,
  //         // Dialogflow / STT requires mono audio
  //         numberOfAudioChannels: 1
  //       });

  //       recordAudio.startRecording();
  //     }, function (error) {
  //       console.error(JSON.stringify(error));
  //     });
  //     // const stream =
  //     //   await navigator.mediaDevices.getUserMedia({ audio: true });
  //     // stream.getTracks().forEach((track) => {
  //     //   if (track.kind === "audio") setMicrophone(stream)
  //     //   console.log(pc)
  //     // console.log(track)
  //     // console.log(stream)
  //     //   return pc.current.addTrack(track, stream)
  //     // }
  //     // );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // const startBleh = async () => {
  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //     .then((stream) => {
  //       // Create an AudioContext
  //       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  //       // var enc = new Encoder({ rate: 48000, channels: 1 });

  //       // Create a MediaStreamAudioSourceNode
  //       const sourceNode = audioContext.createMediaStreamSource(stream);

  //       // Create a ScriptProcessorNode to process the audio data
  //       const scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
  //       const opusEncoder = new Encoder();

  //       // Set up event handler for when audio data is available
  //       scriptNode.onaudioprocess = (event) => {
  //         const audioBuffer = event.inputBuffer;
  //         const rawData = audioBuffer.getChannelData(0); 
  //         console.log(rawData)// Get the raw audio data
  //         // var result = enc.encode(rawData);
  //         const encodedData = opusEncoder.encode(Float32Array.from(rawData));
  //         // const opusData = opusEncoder.encode(rawData);
  //         sendData(encodedData);
  //         // Do something with the raw audio data (e.g., send it through the data channel)
  //         setMicrophone(encodedData)
  //         // sendData(rawData);
  //       };

  //       // Connect the nodes
  //       sourceNode.connect(scriptNode);
  //       scriptNode.connect(audioContext.destination);

  //       // Function to send raw audio data
  //       function sendData(rawData) {
  //         // setMicrophone(rawData)
  //         // Send the raw audio data through the data channel or process it as needed
  //         console.log('Raw audio data:', rawData);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error accessing microphone:', error);
  //     });

  // }

  //PeerConnection Creation

  // const [cookies, setCookie, removeCookie] = useCookies(["shutDownTimeout"]);

  const createPeerConnection = async (offer) => {
    // console.log("Starting new PC");
    pc.current = new RTCPeerConnection(pcConfig);
    pcOnTrack = pc.current.ontrack = (evt) => {
      if (
        videoRef.current &&
        !videoRef.current.srcObject &&
        evt.track.kind === "video"
      ) {
        videoRef.current.srcObject = evt.streams[0];
        videoRef.current.play();
      } else if (
        audioRef.current &&
        !audioRef.current.srcObject &&
        evt.track.kind === "audio"
      ) {
        audioRef.current.srcObject = evt.streams[0];
        audioRef.current.play();
      }
    };
    pcOnDC = pc.current.ondatachannel = (evt) => {
      setDC(evt.channel);
    };

    pc.current.setRemoteDescription(offer);
    pc.current.createAnswer().then((answer) => {
      pc.current.setLocalDescription(answer).then(() => {
        const answer = pc.current.localDescription;
        websocketRef.current.send('42' +
          JSON.stringify(
            ["pcconnection", {
              id: serverID,
              type: answer.type,
              description: answer.sdp,
            }])
        );
      });
    });

    onICEState = pc.current.oniceconnectionstatechange = () => {
      // console.log("PCState: ", pc.current.iceConnectionState);
      if (connectionType) {
        if (pc.current.iceConnectionState === "connected") {
          setFirstConnected(true);
          setCookie("isStreamConnected", true, { path: "/" });
          // startBleh().then(res => console.log(res)) // Remove this
          //   .catch((err) => console.log(err))
        }
        if (pc.current.iceConnectionState === "disconnected") {
          removeCookie("isStreamConnected", { path: "/" });
          if (!firstConnectedRef) {
            socket?.emit("control", "restart");
            stopPC();
          } else {
            if (!inactiveRef.current) {
              stop();
              setInactive(true);
              setInactiveReason("wrongtoken");
            }
          }
        }
      }
    };

    onICECand = pc.current.onicecandidate = (e) => {
      if (e.candidate && e.candidate.candidate) {
        sendLocalCandidate(e.candidate);
      }
    };
  };

  //Video positioning function
  const screenSize = () => {
    setTimeout(() => {
      let expectedHeight = Math.round((window.innerWidth * 9) / 16);
      let expectedWidth = Math.round((window.innerHeight * 16) / 9);
      let expectedMarginLeft = Math.round((window.innerWidth - expectedWidth) / 2);
      let expectedMarginTop = Math.round((window.innerHeight - expectedHeight) / 2);
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
      if (expectedWidth > window.innerWidth) {
        setDivProps({ style: { display: "inline-block" } });
        setVideoProps({ height: expectedHeight });
        setMarginTop(expectedMarginTop);
        setMarginLeft(0);
      }
      else if (expectedHeight > window.innerHeight) {
        setDivProps({ style: { display: "inline-block" } });
        setVideoProps({ width: expectedWidth });
        setMarginLeft(expectedMarginLeft);
        setMarginTop(0);
      }
      else {
        setDivProps({ style: {} });
        setVideoProps({ width: "100%" });
        setMarginTop(0);
        setMarginLeft(0);
      }
    }, 100);
  }

  //Settings Toggles
  const ToggleOnScreenKeyboard = () => {
    if (!showOnScreenKeyboardRef.current) {
      if (gpadOverlayRef.current) setGpadOverlay(false);
      if (showOnScreenMouseRef.current) setShowOnScreenMouse(false);
      setShowOnScreenKeyboard(true);
    } else {
      setShowOnScreenKeyboard(false);
    }
  }

  const ToggleOnScreenMouse = () => {
    if (!showOnScreenMouseRef.current) {
      if (gpadOverlayRef.current) setGpadOverlay(false);
      if (showOnScreenKeyboardRef.current) setShowOnScreenKeyboard(false);
      if (positionRef.current) setPosition(false);
      setShowOnScreenMouse(true);
    } else {
      setShowOnScreenMouse(false);
    }
  }

  const toggleGpadOverlay = () => {
    if (showOnScreenKeyboardRef.current) setShowOnScreenKeyboard(false);
    if (positionRef.current) setPosition(false);
    if (showOnScreenMouseRef.current) setShowOnScreenMouse(false);
    setGpadOverlay(!gpadOverlayRef.current);
  }

  const toggleGpadPosition = () => {
    if (!positionRef.current && !gpadOverlayRef.current) {
      if (showOnScreenKeyboardRef.current) setShowOnScreenKeyboard(false);
      if (showOnScreenMouseRef.current) setShowOnScreenMouse(false);
      setGpadOverlay(true);
    }
    setPosition(!positionRef.current);
    if (GpadPositionSaved) {
      setPosition(false)
    }
  }

  // const toggleGpadPosition = () => {
  //   // console.log("Toggling")
  //   if (!positionRef.current && !gpadOverlayRef.current) {
  //     if (showOnScreenKeyboardRef.current) setShowOnScreenKeyboard(false);
  //     setGpadOverlay(true);
  //   }
  //   setPosition(!positionRef.current);
  // }

  const goBack = () => {
    if (!admin) socketRef.current.emit('closestream');
    setStartStream();
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      // const windowClosedAt = cookies["windowClosedAt"];
      const isStreamConnected = cookies["isStreamConnected"];
      const currentTime1 = new Date().getTime();
      if (isStreamConnected) {
        setCookie("windowClosedAt", currentTime1.toString(), { path: "/" });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cookies, setCookie, removeCookie]);
  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      {
        gpadAllowed ?
          <Gamepad
            setGpadMessage={setGpadMessage}
            randomId={randomId}
            connected={connected}
            userMapping={userMappingsMobile && userMappingsMobile !== null ? userMappingsMobile : userDetails && userDetails.gamepads ? userDetails.gamepads : null}
          />
          : null
      }
      {
        keyboardAllowed ?
          <Keyboard
            setKeyMessage={setKeyMessage}
            connected={connected}
          />
          : null
      }
      {
        inactive ?
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", padding: "4vh" }}>
            <EndOfStream inactiveReason={inactiveReason} setStartStream={setStartStream} mobileStream={touchAllowed} />
          </div>
          : showStream ? (
            <>
              {
                gpadOverlay && connected ?
                  <GamepadOverlay
                    setPosition={position}
                    toggleGpadPosition={toggleGpadPosition}
                    setGpadMessage={setGpadMessage}
                    setGpadPositionSaved={setGpadPositionSaved}
                    randomId={randomId}
                    idToken={idToken}
                    height={height}
                    width={width}
                  />
                  : null
              }
              <div style={{ position: "relative", textAlign: "center" }}>
                {
                  showOnScreenKeyboard && connected ?
                    <OnScreenKeyboard onKeyPress={setKeyMessage} />
                    : null
                }
                {
                  showOnScreenMouse && connected ?
                    <OnScreenMouse marginLeft={marginLeft} marginTop={marginTop} setMouseBtnMessage={setMouseBtnMessage} setMouseMoveMessage={setMouseMoveMessage} />
                    : null
                }
                {
                  loading || waiting ? (
                    <div className={styles.overlay}>
                      {
                        waiting ?
                          <Waiting length={length} waittime={waittime} />
                          : null
                      }
                      {
                        loading ?
                          <Loading game={game} vmstatus={vmstatus} mobileStream={touchAllowed} />
                          : null
                      }
                    </div>
                  ) : null
                }
                <Settings
                  keyboardBased={keyboardBased}
                  touchAllowed={touchAllowed}
                  admin={admin}
                  planEndWarning={planEndWarning}
                  timeLeft={timeLeft}
                  rtt={rtt}
                  loading={loading || waiting}
                  setFps={setFps}
                  setBitrate={setBitrate}
                  ToggleOnScreenKeyboard={ToggleOnScreenKeyboard}
                  ToggleOnScreenMouse={ToggleOnScreenMouse}
                  toggleGpadOverlay={toggleGpadOverlay}
                  toggleGpadPosition={toggleGpadPosition}
                  GpadPositionSaved={gpadPostionSavedRef.current}
                  setGpadPositionSaved={setGpadPositionSaved}
                  FPS={FPS}
                  bitrate={bitrate}
                  setStartStream={goBack}
                  setPointerLockAllowed={setPointerLockAllowed}
                  toggleControls={toggleControls}
                  game={game}
                />

                <Video
                  mouseAllowed={mouseAllowed}
                  touchAllowed={touchAllowed}
                  setMouseMoveMessage={setMouseMoveMessage}
                  setMouseBtnMessage={setMouseBtnMessage}
                  setMouseWheelMessage={setMouseWheelMessage}
                  marginLeft={marginLeft}
                  marginTop={marginTop}
                  videoRef={videoRef}
                  audioRef={audioRef}
                  divProps={divProps}
                  videoProps={videoProps}
                  connected={connected}
                />
              </div>
            </>
          ) : null
      }
    </div>
  );
}

export default BasicStream;