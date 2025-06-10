import { useState, useEffect } from 'react';
// import styles from './onScreenKeyboard.module.css'
import { JoystickDiv } from './gamepadOverlay.styles';
import { Joystick } from 'react-joystick-component';

function OnScreenMouse({ setMouseBtnMessage, setMouseMoveMessage, marginLeft, marginTop }) {
  const [RMBClicked, setRMBClicked] = useState(false);
  const [LMBClicked, setLMBClicked] = useState(false);

  const [rect, setRect] = useState(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [joystickData, setJoystickData] = useState({ x: 0, y: 0 });
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const videoElem = document.getElementById('videoElem');
    if (videoElem) {
      setRect(videoElem.getBoundingClientRect());
    }

    const handleResize = () => {
      const videoElem = document.getElementById('videoElem');
      if (videoElem) {
        setRect(videoElem.getBoundingClientRect());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sendCoordinatesToStream = (pointerX, pointerY, videoSize) => {
    if (!videoSize) return;

    const { width: videoWidth, height: videoHeight } = videoSize;

    // Calculate relative pointer position within the video
    const relativeX = pointerX - marginLeft;
    const relativeY = pointerY - marginTop;

    // Normalize coordinates
    const normalizedX = relativeX / videoWidth;
    const normalizedY = relativeY / videoHeight;

    // Ensure coordinates are within the [0, 1] range
    const clampedX = Math.max(0, Math.min(normalizedX, 1));
    const clampedY = Math.max(0, Math.min(normalizedY, 1));

    // Send coordinates via WebRTC stream
    const message = {
      id: 'mousemove',
      x: clampedX,
      y: clampedY
    };
    setMouseMoveMessage(JSON.stringify(message));
  };

  const updatePointerPosition = (deltaX, deltaY) => {
    if (!rect) return;

    setPointerPosition(prevPosition => {
      const newX = Math.max(0, Math.min(prevPosition.x + deltaX, rect.width));
      const newY = Math.max(0, Math.min(prevPosition.y - deltaY, rect.height - 5));

      sendCoordinatesToStream(newX, newY, rect);
      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.updatePointerPosition = updatePointerPosition;
  }, [rect]);

  // Function to continuously update pointer based on joystick data
  const updatePointer = () => {
    const { x, y } = joystickData;

    if (x !== 0 || y !== 0) {
      const movementSpeed = 15;
      const deltaX = x * movementSpeed;
      const deltaY = y * movementSpeed;

      updatePointerPosition(deltaX, deltaY);
    }
  };

  const handleMove = (event) => {
    setJoystickData({ x: event.x, y: event.y });
  };

  const handleStop = () => {
    setJoystickData({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(updatePointer, 50); // Update every 50ms
    setIntervalId(id);

    return () => clearInterval(id);
  }, [joystickData]);

  const handleTouchStart = (key) => {
    if (key == "RMB") {
      setRMBClicked(true)
      setTimeout(() => {
        let message = {
          id: 'mousebtn',
          type: 'mousedown',
          button: 3
        }
        setMouseBtnMessage(JSON.stringify(message));
      }, 10);
    }
    else if (key == "LMB") {
      setLMBClicked(true)
      setTimeout(() => {
        let message = {
          id: 'mousebtn',
          type: 'mousedown',
          button: 1
        }
        setMouseBtnMessage(JSON.stringify(message));
      }, 10);
    }
  }

  const handleTouchStop = (key) => {
    if (key == "RMB") {
      setTimeout(() => {
        setRMBClicked(false)
        let message = {
          id: 'mousebtn',
          type: 'mouseup',
          button: 3
        }
        setMouseBtnMessage(JSON.stringify(message));
      }, 100)
    } else if (key == "LMB") {
      setTimeout(() => {
        setLMBClicked(false)
        let message = {
          id: 'mousebtn',
          type: 'mouseup',
          button: 1
        }
        setMouseBtnMessage(JSON.stringify(message));
      }, 100)
    }
  }

  return (
    <div style={{ userSelect: "none" }}>
      <div
        style={{
          position: 'absolute',
          left: pointerPosition.x + marginLeft,
          top: pointerPosition.y + marginTop,
          height: '25px',
          width: '25px',
          transition: 'transform 0.1s ease',
          transform: 'translate(-50%, -50%)',
          color: '#111',
          fontSize: '1.3rem',
          zIndex: 2,
        }}
      >
        o
      </div>

      <button
        className="mobButtonShape"
        style={{
          height: "15%",
          width: "10%",
          opacity: "50%",
          backgroundColor: LMBClicked ? "#fff" : "#171717",
          color: LMBClicked ? "#111" : "#fff",
          position: 'absolute',
          left: '12%',
          bottom: '10%',
          zIndex: 99
        }}
        onTouchStart={() => handleTouchStart('LMB')}
        onTouchEnd={() => handleTouchStop('LMB')}
      >
        Left Click
      </button>
      <button
        className="mobButtonShape"
        style={{
          height: "15%",
          width: "10%",
          opacity: "50%",
          backgroundColor: RMBClicked ? "#fff" : "#171717",
          color: RMBClicked ? "#111" : "#fff",
          position: 'absolute',
          left: '25%',
          bottom: '10%',
          zIndex: 99
        }}
        onTouchStart={() => handleTouchStart('RMB')}
        onTouchEnd={() => handleTouchStop('RMB')}
      >
        Right Click
      </button>

      <JoystickDiv className='joytsickDiv' style={{ zIndex: 99 }} right="10%" top="70%" id="LJ">
        <Joystick
          size={Math.round(Math.round((window.innerWidth * 9) / 16) * 0.25)}
          stickSize={Math.round(Math.round((window.innerWidth * 9) / 16) * 0.25 * 0.4)}
          baseColor="grey"
          stickColor="#4e4f52"
          move={handleMove} stop={handleStop}
          throttle={50}
          minDistance={Math.round(Math.round((window.innerWidth * 9) / 16) * 0.25 * 0.1)}
        />
      </JoystickDiv>
    </div>
  );
}

export default OnScreenMouse;
