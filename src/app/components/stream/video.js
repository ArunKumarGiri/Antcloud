'use client'
import { useEffect, useRef, useState } from "react";

function Video({ mouseAllowed, touchAllowed, setMouseMoveMessage, setMouseBtnMessage, setMouseWheelMessage, marginLeft, marginTop, videoRef, audioRef, videoProps, divProps, connected }) {
  const [pointerLocked, setPointerLocked] = useState(false);
  const pointerLockedRef = useRef(null);
  pointerLockedRef.current = pointerLocked;
  const [mouseProps, setMouseProps] = useState({});
  const [touchProps, setTouchProps] = useState({});
  const marginLeftRef = useRef();
  const marginTopRef = useRef();
  marginLeftRef.current = marginLeft;
  marginTopRef.current = marginTop;
  var count = 0;
  const [mouseHappened, setMouseHappened] = useState(mouseAllowed);
  const mouseHappenedRef = useRef();
  mouseHappenedRef.current = mouseHappened;

  useEffect(() => {
    return () => {
      if (mouseAllowed) document.removeEventListener("pointerlockchange", lockChangeAlert);
    }
  }, [])

  useEffect(() => {
    if (connected && mouseAllowed) {
      document.addEventListener("pointerlockchange", lockChangeAlert, false);
    }
  }, [connected])

  useEffect(() => {
    if (mouseAllowed) {
      setMouseProps({
        onMouseDown: mouseBtnHandle,
        onMouseUp: mouseBtnHandle,
        onWheel: wheelHandle,
        onMouseMove: mouseMoveHandle
      });
    } else {
      setMouseProps({});
    }
  }, [mouseAllowed])

  useEffect(() => {
    if (touchAllowed) {
      setTouchProps({
        onTouchEnd: touchEndHandle,
        onTouchStart: touchStartHandle,
        onTouchMove: touchMoveHandle
      });
    } else {
      setTouchProps({});
    }
  }, [touchAllowed])

  const lockChangeAlert = () => {
    if (document.pointerLockElement === videoRef.current) {
      setPointerLocked(true);
    } else {
      setPointerLocked(false);
    }
  };

  const mouseMoveHandle = (c) => {
    var x, y;
    if (pointerLockedRef.current) {
      x = c.nativeEvent.movementX;
      y = c.nativeEvent.movementY;
      let message = {
        id: "mouselock",
        x,
        y,
      };
      setMouseMoveMessage(JSON.stringify(message));
    } else if (videoRef.current) {
      x = c.nativeEvent.offsetX / videoRef.current.clientWidth;
      y = c.nativeEvent.offsetY / videoRef.current.clientHeight;
      let message = {
        id: "mousemove",
        x,
        y,
      };
      setMouseMoveMessage(JSON.stringify(message));
    }
  };

  const mouseBtnHandle = (m) => {
    m.preventDefault();
    let message = {
      id: "mousebtn",
      type: m.type,
      button: m.nativeEvent.which,
    };
    // setTimeout(() => {
    if (mouseHappenedRef.current) {
      setMouseBtnMessage(JSON.stringify(message));
    }
    // },10)
  };

  const wheelHandle = (w) => {
    if (count > 3) {
      count = 0
    }
    let temp = 0
    if (w.deltaY != 0) {
      temp = w.deltaY / Math.abs(w.deltaY) * 100
      if (count % 2 != 0) {
        temp /= 2
      }
      count++
      let message = {
        id: "mousewheel",
        deltaY: temp,
      };
      setMouseWheelMessage(JSON.stringify(message));
    }
    // let message = {
    //   id: "mousewheel",
    //   deltaY: w.deltaY,
    // };
    // console.log(message);
    // setMouseWheelMessage(JSON.stringify(message));
  };

  const touchStartHandle = (c) => {
    let x = c.changedTouches[0].clientX - marginLeftRef.current;
    let y = c.changedTouches[0].clientY - marginTopRef.current;
    setMouseHappened(false);
    // console.log(c.changedTouches[0].clientX, c.changedTouches[0].clientY, x, y, marginLeftRef.current, marginTopRef.current);
    let message = {
      id: 'mousemove',
      x: x / videoRef.current.clientWidth,
      y: y / videoRef.current.clientHeight
    }
    setMouseMoveMessage(JSON.stringify(message));
    setTimeout(() => {
      let message = {
        id: 'mousebtn',
        type: 'mousedown',
        button: 1
      }
      setMouseBtnMessage(JSON.stringify(message));
    }, 10);
  }

  const touchMoveHandle = (c) => {
    let x = c.changedTouches[0].clientX - marginLeftRef.current;
    let y = c.changedTouches[0].clientY - marginTopRef.current;
    // console.log(c.changedTouches[0].clientX, c.changedTouches[0].clientY, x, y, marginLeftRef.current, marginTopRef.current);
    let message = {
      id: 'mousemove',
      x: x / videoRef.current.clientWidth,
      y: y / videoRef.current.clientHeight
    }
    setMouseMoveMessage(JSON.stringify(message));
  }

  const touchEndHandle = () => {
    // let x = c.changedTouches[0].clientX-marginLeftRef.current;
    // let y = c.changedTouches[0].clientY-marginTopRef.current;
    // console.log(c.changedTouches[0].clientX, c.changedTouches[0].clientY, x, y, marginLeftRef.current, marginTopRef.current);
    let message = {
      id: 'mousebtn',
      type: 'mouseup',
      button: 1
    }
    setMouseBtnMessage(JSON.stringify(message));
    setTimeout(() => {
      setMouseHappened(mouseAllowed);
    }, 10)
  }

  return (
    <div {...divProps}>
      <video
        {...videoProps}
        {...mouseProps}
        {...touchProps}
        playsInline
        controls={false}
        id="videoElem"
        onContextMenu={(e) => e.preventDefault()}
        ref={videoRef}
      />
      <audio autoPlay ref={audioRef} />
    </div>
  );
}

export default Video;