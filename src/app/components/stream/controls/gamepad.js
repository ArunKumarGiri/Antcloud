'use client'
import { useEffect, useState } from "react";

function Gamepad({ setGpadMessage, connected, randomId, userMapping }) {
  const gpInit = {
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    LS: 4,
    RS: 5,
    LT: 6,
    RT: 7,
    Back: 8,
    Start: 9,
    LJB: 10,
    RJB: 11,
    Up: 12,
    Down: 13,
    Left: 14,
    Right: 15,
    Main: 16,
    LJX: 0,
    LJY: 1,
    RJX: 2,
    RJY: 3,
    type: "button",
  }
  const [gpIndex, setGpIndex] = useState([]);
  const [gamepad, setGamepad] = useState(gpInit);
  const [tick, setTick] = useState("");
  const [log, setLog] = useState(JSON.stringify([{}, {}, {}, {}]));
  let gpInterval;
  //  gamepad = {
  //   A: 0,
  //   B: 1,
  //   X: 2,
  //   Y: 3,
  //   LS: 4,
  //   RS: 5,
  //   LT: 6,
  //   RT: 7,
  //   Back: 8,
  //   Start: 9,
  //   LJB: 10,
  //   RJB: 11,
  //   Up: 12,
  //   Down: 13,
  //   Left: 14,
  //   Right: 15,
  //   Main: 16,
  //   LJX: 0,
  //   LJY: 1,
  //   RJX: 2,
  //   RJY: 3,
  //   type: "button",
  // };

  // const gamepadRef = useRef();
  // gamepadRef.current = gamepad;

  useEffect(() => {
    return () => {
      window.removeEventListener("gamepadconnected", gamepadConnected);
      window.removeEventListener("gamepaddisconnected", gamepadDisconnected);
    }
  }, [])

  // console.log(gamepad)
  useEffect(() => {
    let gamepads = navigator.getGamepads();
    // console.log(gamepad)
    gpIndex.forEach((val, index) => {
      let i = val.index;
      let gp = gamepads[i];
      let currentLog = {};
      if (gp) {
        currentLog.A = gp.buttons[gamepad.A].pressed;
        currentLog.B = gp.buttons[gamepad.B].pressed;
        currentLog.X = gp.buttons[gamepad.X].pressed;
        currentLog.Y = gp.buttons[gamepad.Y].pressed;
        currentLog.LS = gp.buttons[gamepad.LS].pressed;
        currentLog.RS = gp.buttons[gamepad.RS].pressed;
        currentLog.LT = gp.buttons[gamepad.LT].value;
        currentLog.RT = gp.buttons[gamepad.RT].value;
        currentLog.Back = gp.buttons[gamepad.Back].pressed;
        currentLog.Start = gp.buttons[gamepad.Start].pressed;
        currentLog.LJB = gp.buttons[gamepad.LJB].pressed;
        currentLog.RJB = gp.buttons[gamepad.RJB].pressed;
        currentLog.Up = gp.buttons[gamepad.Up] ? gp.buttons[gamepad.Up].pressed : false;
        currentLog.Down = gp.buttons[gamepad.Down] ? gp.buttons[gamepad.Down].pressed : false;
        currentLog.Left = gp.buttons[gamepad.Left] ? gp.buttons[gamepad.Left].pressed : false;
        currentLog.Right = gp.buttons[gamepad.Right] ? gp.buttons[gamepad.Right].pressed : false;
        currentLog.Main = false;
        currentLog.LJX =
          gp.axes[gamepad.LJX] > 0.1 || gp.axes[gamepad.LJX] < -0.1
            ? gp.axes[gamepad.LJX]
            : 0;
        currentLog.LJY =
          gp.axes[gamepad.LJY] > 0.1 || gp.axes[gamepad.LJY] < -0.1
            ? gp.axes[gamepad.LJY]
            : 0;
        currentLog.RJX =
          gp.axes[gamepad.RJX] > 0.1 || gp.axes[gamepad.RJX] < -0.1
            ? gp.axes[gamepad.RJX]
            : 0;
        currentLog.RJY =
          gp.axes[gamepad.RJY] > 0.1 || gp.axes[gamepad.RJY] < -0.1
            ? gp.axes[gamepad.RJY]
            : 0;
        let templog = JSON.parse(log);
        if (JSON.stringify(currentLog) !== JSON.stringify(templog[i])) {
          templog[i] = currentLog;
          setLog(JSON.stringify(templog));
          let message = {
            id: "gpadevent",
            index: index,
            state: JSON.stringify(currentLog),
          };
          setGpadMessage(JSON.stringify(message));
        }
      }
    });
  }, [tick]);

  useEffect(() => {
    if (connected) {
      gamepadHandle();
    }
  }, [connected])

  const gamepadHandle = () => {
    let gamepads = navigator.getGamepads();
    if (gamepads) {
      window.addEventListener("gamepadconnected", gamepadConnected, false);
      window.addEventListener("gamepaddisconnected", gamepadDisconnected, false);
      setupGamepad();
    }
  };
  const setupGamepad = () => {
    let gamepads = navigator.getGamepads();
    // console.log(gamepads);
    for (let i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        let id = gamepads[i]?.id;
        if (userMapping && userMapping.find((e) => e.name == id)) setGamepad(userMapping.find((e) => e.name == id).buttonMapping);
        else setGamepad(gpInit)
        
        if (id) {
          let found = false;
          let currentGpIndex = gpIndex;
          currentGpIndex.forEach(val => {
            if (val.val === id && val.index !== i) {
              found = true;
            }
          })
          if (!found) {
            currentGpIndex.push({ val: id, index: i });
            setGpIndex(currentGpIndex);
            if (!gpInterval) gpInterval = window.setInterval(gamepadUpdate, 50);
          }
        }
      }
    }
  };
  
  const gamepadConnected = (event) => {
    console.log("Gamepad Connected: " + event.gamepad.id);
    setupGamepad();
  };

  const gamepadDisconnected = (event) => {
    console.log("Gamepad Disconnected: " + event.gamepad.id + " on index: " + event.gamepad.index);
    let index = event.gamepad.index;
    let message = {
      id: "gpadevent",
      index,
      state: "disconnected",
    };
    setGpadMessage(JSON.stringify(message));
    let currentGpIndex = gpIndex;
    let indexToDelete = 0;
    for (let i = 0; i < currentGpIndex.length; i++) {
      if (currentGpIndex[i].index === index) {
        indexToDelete = i;
      }
    }
    currentGpIndex.splice(indexToDelete, 1);
    setGpIndex(currentGpIndex);
    console.log(currentGpIndex);
    if (JSON.stringify(gpIndex) === JSON.stringify([])) {
      window.clearInterval(gpInterval);
      gpInterval = 0;
    }
  };
  const gamepadUpdate = () => {
    setTick(randomId(10));
  };

  return (
    <div />
  );
}

export default Gamepad;