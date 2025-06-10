'use client'
import { useEffect } from "react";

function Keyboard({ setKeyMessage, connected }) {
  useEffect(() => {
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener("keydown", keyHandle);
      document.removeEventListener("keyup", keyHandle);
    }
  }, [])

  useEffect(() => {
    if (connected) {
      window.addEventListener('focus', handleFocus);
      document.addEventListener("keydown", keyHandle, false);
      document.addEventListener("keyup", keyHandle, false);
    }
  }, [connected])

  // useEffect(() => {
  //   const handleBlur = () => {
  //     console.log('Window lost focus');
  //     // Handle tab change or window focus lost
  //   };

  //   const handleFocus = () => {
  //     console.log('Window gained focus');
  //     // Handle tab change or window focus gained
  //   };

  //   window.addEventListener('blur', handleBlur);
  //   window.addEventListener('focus', handleFocus);

  //   return () => {
  //     window.removeEventListener('blur', handleBlur);
  //     window.removeEventListener('focus', handleFocus);
  //   };
  // }, []);


  const handleFocus = () => {
    let keyCodes = ['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'ShiftLeft', 'ShiftRight', 'Tab']

    keyCodes.forEach((key, index) => {
      setTimeout(() => {
        let message = {
          id: 'keyevent',
          type: 'keyup',
          code: key,
        };
        setKeyMessage(JSON.stringify(message));
      }, index * 100); // Delay each key event to ensure proper processing
    });
  };

const keyHandle = (e) => {
  if (e.code && e.code !== 'F11') {
    let message = {
      id: "keyevent",
      type: e.type,
      code: e.code,
    };
    setKeyMessage(JSON.stringify(message));
    // console.log(JSON.stringify(message))
  }
};

return (
  <div />
);
}

export default Keyboard;