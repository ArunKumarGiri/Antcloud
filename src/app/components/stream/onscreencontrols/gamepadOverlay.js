import { Button, JoystickDiv } from './gamepadOverlay.styles';
import styles from './gamepadoverlay.module.css'
import DpadPic from './Dpad.png';
import HamburgerPic from './hamburger.png';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useEffect, useRef, useState } from "react";
import { Joystick } from 'react-joystick-component';

function GamepadOverlay({ setPosition, setGpadPositionSaved, toggleGpadPosition, setGpadMessage, randomId, idToken, height, width }) {
  const [tick, setTick] = useState("");
  const [log, setLog] = useState(JSON.stringify({}));

  const [A, setA] = useState(false);
  const [B, setB] = useState(false);
  const [X, setX] = useState(false);
  const [Y, setY] = useState(false);
  const [LS, setLS] = useState(false);
  const [RS, setRS] = useState(false);
  const [LT, setLT] = useState(0);
  const [RT, setRT] = useState(0);
  const [Back, setBack] = useState(false);
  const [Start, setStart] = useState(false);
  const [LJB, setLJB] = useState(false);
  const [RJB, setRJB] = useState(false);
  const [Up, setUp] = useState(false);
  const [Down, setDown] = useState(false);
  const [Left, setLeft] = useState(false);
  const [Right, setRight] = useState(false);
  const [LJX, setLJX] = useState(0);
  const [RJX, setRJX] = useState(0);
  const [LJY, setLJY] = useState(0);
  const [RJY, setRJY] = useState(0);

  const [LTDouble, setLTDouble] = useState(false);
  const [LTTime, setLTTime] = useState(false);
  const LTDoubleRef = useRef(), LTTimeRef = useRef();
  LTDoubleRef.current = LTDouble;
  LTTimeRef.current = LTTime;
  const [RTDouble, setRTDouble] = useState(false);
  const [RTTime, setRTTime] = useState(false);
  const RTDoubleRef = useRef(), RTTimeRef = useRef();
  RTDoubleRef.current = RTDouble;
  RTTimeRef.current = RTTime;
  const [LSDouble, setLSDouble] = useState(false);
  const [LSTime, setLSTime] = useState(false);
  const LSDoubleRef = useRef(), LSTimeRef = useRef();
  LSDoubleRef.current = LSDouble;
  LSTimeRef.current = LSTime;
  const [RSDouble, setRSDouble] = useState(false);
  const [RSTime, setRSTime] = useState(false);
  const RSDoubleRef = useRef(), RSTimeRef = useRef();
  RSDoubleRef.current = RSDouble;
  RSTimeRef.current = RSTime;

  const [LJBDouble, setLJBDouble] = useState(false);
  const LJBDoubleRef = useRef();
  LJBDoubleRef.current = LJBDouble;
  const [RJBDouble, setRJBDouble] = useState(false);
  const RJBDoubleRef = useRef();
  RJBDoubleRef.current = RJBDouble;

  const defaultOverlay = {
    Up: {
      left: "12%",
      top: "15%",
      size: 0.1
    },
    Down: {
      left: "12%",
      top: "35%",
      size: 0.1
    },
    Left: {
      left: "7%",
      top: "25%",
      size: 0.1
    },
    Right: {
      left: "17%",
      top: "25%",
      size: 0.1
    },
    Start: {
      left: "67%",
      top: "15%",
      size: 0.1
    },
    Back: {
      left: "32%",
      top: "15%",
      size: 0.1
    },
    Y: {
      left: "87%",
      top: "15%",
      size: 0.1
    },
    A: {
      left: "87%",
      top: "35%",
      size: 0.1
    },
    B: {
      left: "92%",
      top: "25%",
      size: 0.1
    },
    X: {
      left: "82%",
      top: "25%",
      size: 0.1
    },
    LS: {
      left: "27%",
      top: "65%",
      size: 0.1
    },
    LT: {
      left: "30%",
      top: "80%",
      size: 0.1
    },
    RS: {
      left: "73%",
      top: "65%",
      size: 0.1
    },
    RT: {
      left: "70%",
      top: "80%",
      size: 0.1
    },
    LJ: {
      left: "15%",
      top: "70%",
      size: 0.25
    },
    RJ: {
      left: "85%",
      top: "70%",
      size: 0.25
    }
  };
  const [ButtonLocations, setButtonLocation] = useState(JSON.stringify(defaultOverlay))
  const ButtonLocationsRef = useRef(null);
  ButtonLocationsRef.current = ButtonLocations;
  const [selectedButton, setSelectedButton] = useState(null);
  const selectedButtonRef = useRef(null);
  selectedButtonRef.current = selectedButton;

  const [lastSize, setLastSize] = useState(null);
  const lastSizeRef = useRef(null);
  lastSizeRef.current = lastSize;

  let gpInterval, overlayControl = {
    A: setA,
    B: setB,
    X: setX,
    Y: setY,
    Back: setBack,
    Start: setStart,
    Up: setUp,
    Down: setDown,
    Left: setLeft,
    Right: setRight
  };
  let overlayButtons = [
    { id: 'Up', value: <img src={DpadPic} style={{ transform: 'rotate(90deg)' }} /> },
    { id: 'Down', value: <img src={DpadPic} style={{ transform: 'rotate(270deg)' }} /> },
    { id: 'Left', value: <img src={DpadPic} /> },
    { id: 'Right', value: <img src={DpadPic} style={{ transform: 'rotate(180deg)' }} /> },
    { id: 'Start', value: <img src={HamburgerPic} /> },
    { id: 'Back', value: <DriveFolderUploadIcon fontSize='small' sx={{ paddingTop: '3px' }} /> },
    { id: 'Y', value: 'Y' },
    { id: 'A', value: 'A' },
    { id: 'B', value: 'B' },
    { id: 'X', value: 'X' },
    { id: 'LS', value: 'LS' },
    { id: 'LT', value: 'LT' },
    { id: 'RS', value: 'RS' },
    { id: 'RT', value: 'RT' }
  ]

  useEffect(() => {
    let locations = null;
    if (localStorage) locations = localStorage.getItem('buttonLocations');
    if (!locations) {
      localStorage.setItem('buttonLocations', JSON.stringify(defaultOverlay));
      let body = {
        mappings: [
          {
            mapping: defaultOverlay
          }
        ]
      }
      fetch('https://api.antcloud.co/api/controllerMapping/onscreen', {
        method: 'POST',
        headers: { Authorization: `JWT ${idToken}`, 'Content-Type': 'Application/json' },
        body: JSON.stringify(body)
      })
    } else {
      setButtonLocation(locations);
    }
    if (!setPosition) {
      if (!gpInterval) gpInterval = window.setInterval(gamepadUpdate, 50);
      return () => {
        let message = {
          id: 'gpadevent',
          index: 0,
          state: "disconnected"
        }
        setGpadMessage(JSON.stringify(message))
      }
    }
  }, []);

  useEffect(() => {
    let currentLog = {};
    currentLog.A = A;
    currentLog.B = B;
    currentLog.X = X;
    currentLog.Y = Y;
    currentLog.LS = LS;
    currentLog.RS = RS;
    currentLog.LT = LT;
    currentLog.RT = RT;
    currentLog.Back = Back;
    currentLog.Start = Start;
    currentLog.LJB = LJB;
    currentLog.RJB = RJB;
    currentLog.Up = Up;
    currentLog.Down = Down;
    currentLog.Left = Left;
    currentLog.Right = Right;
    currentLog.Main = false;
    currentLog.LJX = LJX;
    currentLog.LJY = LJY;
    currentLog.RJX = RJX;
    currentLog.RJY = RJY;
    let templog = JSON.parse(log);
    if (JSON.stringify(currentLog) != JSON.stringify(templog)) {
      // console.log(currentLog);
      templog = currentLog;
      setLog(JSON.stringify(templog));
      let message = {
        id: "gpadevent",
        index: 0,
        state: JSON.stringify(currentLog),
      };
      setGpadMessage(JSON.stringify(message));
    }
  }, [tick]);

  const gamepadUpdate = () => {
    setTick(randomId(10));
  };

  const buttonEvent = (event) => {
    let button = event.currentTarget.id;
    if (!setPosition) {
      if (button === 'LT') {
        if (event.type === "touchstart") {
          if (LTTimeRef.current) {
            if (LTDoubleRef.current) {
              setTimeout(() => {
                setLTTime(false);
              }, 500);
              setLTDouble(false);
            } else {
              setLT(1);
              setLTDouble(true);
            }
          } else if (LTDoubleRef.current) {
            setLT(0);
            setLTDouble(false);
          } else {
            setLTTime(true);
            setLT(1);
            setTimeout(() => {
              setLTTime(false);
            }, 500);
          }
        } else {
          if (!LTDoubleRef.current) {
            setLT(0);
          }
        }
      } else if (button === 'RT') {
        if (event.type === "touchstart") {
          if (RTTimeRef.current) {
            if (RTDoubleRef.current) {
              setTimeout(() => {
                setRTTime(false);
              }, 500);
              setRTDouble(false);
            } else {
              setRT(1);
              setRTDouble(true);
            }
          } else if (RTDoubleRef.current) {
            setRT(0);
            setRTDouble(false);
          } else {
            setRTTime(true);
            setRT(1);
            setTimeout(() => {
              setRTTime(false);
            }, 500);
          }
        } else {
          if (!RTDoubleRef.current) {
            setRT(0);
          }
        }
      } else if (button === 'LS') {
        if (event.type === "touchstart") {
          if (LSTimeRef.current) {
            if (LSDoubleRef.current) {
              setTimeout(() => {
                setLSTime(false);
              }, 500);
              setLSDouble(false);
            } else {
              setLS(true);
              setLSDouble(true);
            }
          } else if (LSDoubleRef.current) {
            setLS(false);
            setLSDouble(false);
          } else {
            setLSTime(true);
            setLS(true);
            setTimeout(() => {
              setLSTime(false);
            }, 500);
          }
        } else {
          if (!LSDoubleRef.current) {
            setLS(false);
          }
        }
      } else if (button === 'RS') {
        if (event.type === "touchstart") {
          if (RSTimeRef.current) {
            if (RSDoubleRef.current) {
              setTimeout(() => {
                setRSTime(false);
              }, 500);
              setRSDouble(false);
            } else {
              setRS(true);
              setRSDouble(true);
            }
          } else if (RSDoubleRef.current) {
            setRS(false);
            setRSDouble(false);
          } else {
            setRSTime(true);
            setRS(true);
            setTimeout(() => {
              setRSTime(false);
            }, 500);
          }
        } else {
          if (!RSDoubleRef.current) {
            setRS(false);
          }
        }
      } else {
        if (event.type === "touchstart") overlayControl[button](true);
        else overlayControl[button](false);
      }
    } else {
      if (event.type === "touchstart" && !selectedButtonRef.current) {
        setSelectedButton(event.currentTarget.id);
        let BLocations = JSON.parse(ButtonLocationsRef.current);
        BLocations[event.currentTarget.id].backgroundcolor = "green";
        setButtonLocation(JSON.stringify(BLocations));
      }
      else if (event.type === "touchend" && selectedButtonRef.current === event.currentTarget.id) {
        setSelectedButton(null);
        let BLocations = JSON.parse(ButtonLocationsRef.current);
        delete BLocations[event.currentTarget.id].backgroundcolor;
        setButtonLocation(JSON.stringify(BLocations));
      }
      else if (event.type === "touchmove" && selectedButtonRef.current === event.currentTarget.id) {
        if (event.changedTouches.length > 1) {
          let distance = Math.pow((event.changedTouches[0].clientX - event.changedTouches[1].clientX), 2) + Math.pow((event.changedTouches[0].clientY - event.changedTouches[1].clientY), 2)
          if (lastSizeRef.current) {
            let BLocations = JSON.parse(ButtonLocationsRef.current);
            if (distance > lastSizeRef.current) {
              BLocations[selectedButtonRef.current].size += 0.01;
            } else {
              if (BLocations[selectedButtonRef.current].size >= 0.05) {
                BLocations[selectedButtonRef.current].size -= 0.01;
              }
            }
            setButtonLocation(JSON.stringify(BLocations));
          }
          setLastSize(distance);
        } else {
          let BLocations = JSON.parse(ButtonLocationsRef.current);
          let x = Math.round(event.changedTouches[0].clientX / width * 100);
          let y = Math.round(event.changedTouches[0].clientY / height * 100);
          BLocations[selectedButtonRef.current].left = `${x}%`;
          BLocations[selectedButtonRef.current].top = `${y}%`;
          setButtonLocation(JSON.stringify(BLocations));
        }
      }
    }
  }

  const handleStartLeft = () => {
    if (LJBDoubleRef.current) {
      setLJB(true);
    } else {
      setLJBDouble(true);
      setTimeout(() => {
        setLJBDouble(false);
      }, 500);
    }
  }
  const handleMoveLeft = (event) => {
    setLJX(event.x);
    setLJY(-event.y);
  }
  const handleStopLeft = () => {
    setLJX(0);
    setLJY(0);
    setLJB(false);
  }

  const handleStartRight = () => {
    if (RJBDoubleRef.current) {
      setRJB(true);
    } else {
      setRJBDouble(true);
      setTimeout(() => {
        setRJBDouble(false);
      }, 500);
    }
  }
  const handleMoveRight = (event) => {
    setRJX(event.x);
    setRJY(-event.y);
  }
  const handleStopRight = () => {
    setRJX(0);
    setRJY(0);
    setRJB(false);
  }

  const JSDivEvent = (event) => {
    if (setPosition) {
      if (event.type === "touchstart" && !selectedButtonRef.current) {
        setSelectedButton(event.currentTarget.id);
      }
      else if (event.type === "touchend" && selectedButtonRef.current === event.currentTarget.id) {
        setSelectedButton(null);
        setLastSize(null);
      }
      else if (event.type === "touchmove" && selectedButtonRef.current === event.currentTarget.id) {
        if (event.changedTouches.length > 1) {
          let distance = Math.pow((event.changedTouches[0].clientX - event.changedTouches[1].clientX), 2) + Math.pow((event.changedTouches[0].clientY - event.changedTouches[1].clientY), 2)
          if (lastSizeRef.current) {
            let BLocations = JSON.parse(ButtonLocationsRef.current);
            if (distance > lastSizeRef.current) {
              BLocations[selectedButtonRef.current].size += 0.01;
            } else {
              if (BLocations[selectedButtonRef.current].size >= 0.05) {
                BLocations[selectedButtonRef.current].size -= 0.01;
              }
            }
            setButtonLocation(JSON.stringify(BLocations));
          }
          setLastSize(distance);
        } else {
          let BLocations = JSON.parse(ButtonLocationsRef.current);
          let x = Math.round(event.changedTouches[0].clientX / width * 100);
          let y = Math.round(event.changedTouches[0].clientY / height * 100);
          BLocations[selectedButtonRef.current].left = `${x}%`;
          BLocations[selectedButtonRef.current].top = `${y}%`;
          setButtonLocation(JSON.stringify(BLocations));
        }
      }
    }
  }

  const positionDone = () => {
    let buttonLocations = JSON.parse(ButtonLocationsRef.current);
    let body = {
      mappings: [
        {
          mapping: buttonLocations
        }
      ]
    }
    fetch('https://api.antcloud.co/api/controllerMapping/onscreen', {
      method: 'PATCH',
      headers: { Authorization: `JWT ${idToken}`, 'Content-Type': 'Application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        console.log("13")
        localStorage.setItem('buttonLocations', JSON.stringify(buttonLocations));
        setGpadPositionSaved(true)
        toggleGpadPosition();
      })
  }

  const resetToDefault = () => {
    setButtonLocation(JSON.stringify(defaultOverlay));
  }

  return (
    <div className={styles.overlay}>
      {
        setPosition ?
          <div style={{ top: '5%', left: '45%' }} >
            Set Layout
            <button onClick={positionDone}>Done</button>
            <button onClick={resetToDefault}>Reset</button>
          </div>
          : null
      }
      {
        overlayButtons.map(button => {
          return <Button
            {...JSON.parse(ButtonLocations)[button.id]}
            disableAnimation={true}
            onTouchStart={buttonEvent}
            onTouchMove={buttonEvent}
            onTouchEnd={buttonEvent}
            height={Math.round(height * JSON.parse(ButtonLocations)[button.id].size)}
            width={Math.round(height * JSON.parse(ButtonLocations)[button.id].size)}
            key={button.id}
            id={button.id}>
            {button.value}
          </Button>
        })
      }
      <JoystickDiv className='joytsickDiv' left={JSON.parse(ButtonLocations).LJ.left} top={JSON.parse(ButtonLocations).LJ.top} onTouchStart={JSDivEvent} onTouchMove={JSDivEvent} onTouchEnd={JSDivEvent} id="LJ">
        <Joystick
          size={Math.round(height * JSON.parse(ButtonLocations).LJ.size)}
          stickSize={Math.round(height * JSON.parse(ButtonLocations).LJ.size * 0.4)}
          baseColor="grey"
          stickColor="#4e4f52"
          move={handleMoveLeft}
          stop={handleStopLeft}
          start={handleStartLeft}
          throttle={50}
          minDistance={Math.round(height * JSON.parse(ButtonLocations).LJ.size * 0.1)}
        />
      </JoystickDiv>
      <JoystickDiv className='joytsickDiv' left={JSON.parse(ButtonLocations).RJ.left} top={JSON.parse(ButtonLocations).RJ.top} onTouchStart={JSDivEvent} onTouchMove={JSDivEvent} onTouchEnd={JSDivEvent} id="RJ">
        <Joystick
          size={Math.round(height * JSON.parse(ButtonLocations).RJ.size)}
          stickSize={Math.round(height * JSON.parse(ButtonLocations).RJ.size * 0.4)}
          baseColor="grey"
          stickColor="#4e4f52"
          move={handleMoveRight}
          stop={handleStopRight}
          start={handleStartRight}
          throttle={50}
          minDistance={Math.round(height * JSON.parse(ButtonLocations).RJ.size * 0.1)}
        />
      </JoystickDiv>
    </div>
  );
}

export default GamepadOverlay;