import React, { useEffect, useState } from "react";

interface GamepadButtonsProps {
  gamepadIndex: number;
  setButtonsPressed: (button: number | null) => void;
}

interface JoystickState {
  RJY: number;
  LJX: number;
  RJX: number;
  LJY: number;
}

const GamepadButtons: React.FC<GamepadButtonsProps> = ({
  gamepadIndex,
  setButtonsPressed,
}) => {
  const [leftJoystickY, setLeftJoystickY] = useState<JoystickState>({
    RJY: 0,
    LJX: 0,
    RJX: 0,
    LJY: 0,
  });

  useEffect(() => {
    let animationFrameId: number;
    const updateGamepadStatus = () => {
      const gamepad = navigator.getGamepads()[gamepadIndex];
      if (gamepad) {
        const pressedButtons = gamepad.buttons
          .map((button, index) => (button.pressed ? index : null))
          .filter((index): index is number => index !== null);

        setButtonsPressed(pressedButtons[0] ?? null);

        const axis0 = Number(gamepad.axes[0]);
        const axis1 = Number(gamepad.axes[1]);
        const axis2 = Number(gamepad.axes[2]);
        const axis3 = Number(gamepad.axes[3]);

        if (axis0 > 0.5 || axis0 < -0.5) {
          setButtonsPressed(16);
        } else if (axis1 > 0.5 || axis1 < -0.5) {
          setButtonsPressed(17);
        } else if (axis2 > 0.5 || axis2 < -0.5) {
          setButtonsPressed(18);
        } else if (axis3 > 0.5 || axis3 < -0.5) {
          setButtonsPressed(19);
        }

        setLeftJoystickY({
          LJX: axis0,
          LJY: axis1,
          RJX: axis2,
          RJY: axis3,
        });
      }
      animationFrameId = requestAnimationFrame(updateGamepadStatus);
    };
    updateGamepadStatus();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [gamepadIndex, setButtonsPressed]);

  return (
    <div>
      {/* <h2>Buttons Pressed:</h2>
      <ul>
        {buttonsPressed ? (
          // buttonsPressed.map((index) => (
          <li key={0}>Button {buttonsPressed} pressed</li>
        ) : (
          // ))
          <li>No buttons pressed</li>
        )}
      </ul>
      <h2>Left Joystick Y-Axis:</h2>
      <p>
        {Number(leftJoystickY.RJX).toFixed(4)} and{" "}
        {Number(leftJoystickY.RJY).toFixed(4)}
        <br />
        {Number(leftJoystickY.LJX).toFixed(4)} and{" "}
        {Number(leftJoystickY.LJY).toFixed(4)}
      </p> */}
    </div>
  );
};

export default GamepadButtons;
