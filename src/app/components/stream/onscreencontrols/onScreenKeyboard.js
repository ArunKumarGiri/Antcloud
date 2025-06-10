import styles from './onScreenKeyboard.module.css'
import { getKeys } from "./keys";
import { useState } from "react";
import keyCodes from './keyCode.json';

function OnScreenKeyboard({ onKeyPress }) {
  const [shift, setShift] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);

  const onKeyPressHandler = (key) => {
    setPressedKey(key);
    
    setTimeout(() => {
      setPressedKey(null)
    }, 100)

    if (key.toLowerCase() === "shift") setShift(!shift);
    // else if (key=== "LMB"){
    //   let message = {
    //     id: "mousebtn",
    //     type: "mousedown",
    //     button: 0,
    //   };
    //   onKeyPress(JSON.stringify(message));
    //   setTimeout(() => {
    //     message = {
    //       id: "mousebtn",
    //       type: "mouseup",
    //       button: 0,
    //     };
    //     onKeyPress(JSON.stringify(message));
    //   }, 10);
    // } else if(key === "RMB") {
    //   let message = {
    //     id: "mousebtn",
    //     type: "mousedown",
    //     button: 1,
    //   };
    //   onKeyPress(JSON.stringify(message));
    //   setTimeout(() => {
    //     message = {
    //       id: "mousebtn",
    //       type: "mouseup",
    //       button: 1,
    //     };
    //     onKeyPress(JSON.stringify(message));
    //   }, 10);
    // }
    else {
      if (keyCodes[key].shift) {
        let message = {
          id: 'keyevent',
          type: 'keydown',
          code: 'ShiftLeft'
        }
        onKeyPress(JSON.stringify(message));
        setTimeout(() => {
          message = {
            id: 'keyevent',
            type: 'keydown',
            code: keyCodes[key].code
          }
          onKeyPress(JSON.stringify(message));
          setTimeout(() => {
            message = {
              id: 'keyevent',
              type: 'keyup',
              code: keyCodes[key].code
            }
            onKeyPress(JSON.stringify(message));
            setTimeout(() => {
              message = {
                id: 'keyevent',
                type: 'keyup',
                code: 'ShiftLeft'
              }
              onKeyPress(JSON.stringify(message));
            }, 10);
          }, 10);
        }, 10);
      } else {
        let message = {
          id: 'keyevent',
          type: 'keydown',
          code: keyCodes[key].code
        }
        onKeyPress(JSON.stringify(message));
        setTimeout(() => {
          message = {
            id: 'keyevent',
            type: 'keyup',
            code: keyCodes[key].code
          }
          onKeyPress(JSON.stringify(message));
        }, 10);
      }
    }
  };

  return (
    <div className={styles.Keyboard}>
      {getKeys(shift).map((key, index) => {
        if (key === "Enter" || key === "Backspace") return <div key={index} onTouchStart={() => onKeyPressHandler(key)} style={pressedKey == key ? { backgroundColor: "#fff", color: "#111" } : {}} className={styles.Key2}>{key}</div>
        else if (key === "shift") return <div key={index} onTouchStart={() => onKeyPressHandler(key)} style={pressedKey == key ? { backgroundColor: "#fff", color: "#111" } : {}} className={styles.Key3}>{key}</div>
        else if (key === "space") return <div key={index} onTouchStart={() => onKeyPressHandler(key)} style={pressedKey == key ? { backgroundColor: "#fff", color: "#111" } : {}} className={styles.Key4}>{key}</div>
        else return <div key={index} onTouchStart={() => onKeyPressHandler(key)} style={pressedKey == key ? { backgroundColor: "#fff", color: "#111" } : {}} className={styles.Key}>{key}</div>
      }
      )}
    </div>
  );
}

export default OnScreenKeyboard;
