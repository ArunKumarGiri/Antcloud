import leftX from "../../../../public/images/controller_mods/leftX.webp";
import leftY from "../../../../public/images/controller_mods/leftY.webp";
import rightY from "../../../../public/images/controller_mods/rightY.webp";
import rightX from "../../../../public/images/controller_mods/rightX.webp";
import DpadUp from "../../../../public/images/controller_mods/dpadUp.webp";
import DpadDown from "../../../../public/images/controller_mods/dpadDown.webp";
import DpadLeft from "../../../../public/images/controller_mods/dpadLeft.webp";
import DpadRight from "../../../../public/images/controller_mods/dpadRight.webp";
import LeftStick from "../../../../public/images/controller_mods/leftStick.webp";
import RightStick from "../../../../public/images/controller_mods/rightStick.webp";
import XKey from "../../../../public/images/controller_mods/XButton.webp";
import YKey from "../../../../public/images/controller_mods/YButton.webp";
import AKey from "../../../../public/images/controller_mods/AButton.webp";
import BKey from "../../../../public/images/controller_mods/BButton.webp";
// import Guide from "../../images/controller_mods/guide.webp";
import Back from "../../../../public/images/controller_mods/backButton.webp";
import Start from "../../../../public/images/controller_mods/menuButton.webp";
import LeftTrigger from "../../../../public/images/controller_mods/leftTriggers.webp";
import RightTrigger from "../../../../public/images/controller_mods/rightTriggers.webp";

export const defaultGamepadMapping = {
  A: {
    keycode: 0,
    name: "Primary Action",
    img: AKey,
  },
  B: {
    keycode: 1,
    name: "Go Back",
    img: BKey,
  },
  X: {
    keycode: 2,
    name: "Secondary Action",
    img: XKey,
  },
  Y: {
    keycode: 3,
    name: "Tertiary Action",
    img: YKey,
  },
  LS: {
    keycode: 4,
    name: "Left Shoulder",
    img: LeftTrigger,
  },
  RS: {
    keycode: 5,
    name: "Right Shoulder",
    img: RightTrigger,
  },
  LT: {
    keycode: 6,
    name: "Left Trigger",
    img: LeftTrigger,
  },
  RT: {
    keycode: 7,
    name: "Right Trigger",
    img: RightTrigger,
  },
  Back: {
    keycode: 8,
    name: "Select",
    img: Back,
  },
  Start: {
    keycode: 9,
    name: "Start",
    img: Start,
  },
  LJB: {
    keycode: 10,
    name: "Left Joystick Click",
    img: LeftStick,
  },
  RJB: {
    keycode: 11,
    name: "Right Joystick Click",
    img: RightStick,
  },
  Up: {
    keycode: 12,
    name: "Direction Pad Up",
    img: DpadUp,
  },
  Down: {
    keycode: 13,
    name: "Direction Pad Down",
    img: DpadDown,
  },
  Left: {
    keycode: 14,
    name: "Direction Pad Left",
    img: DpadLeft,
  },
  Right: {
    keycode: 15,
    name: "Direction Pad Right",
    img: DpadRight,
  },
  // Main: {
  //   keycode: 16,
  //   name: "Guide",
  //   img: Guide,
  // },
  LJX: {
    keycode: 16,
    name: "Left Joystick X-Axis",
    img: leftX,
  },
  LJY: {
    keycode: 17,
    name: "Left Joystick Y-Axis",
    img: leftY,
  },
  RJX: {
    keycode: 18,
    name: "Right Joystick X-Axis",
    img: rightX,
  },
  RJY: {
    keycode: 19,
    name: "Right Joystick Y-Axis",
    img: rightY,
  },
};
export const defaultGamepadMapping1 = [
  {
    key: "A",
    keycode: 0,
    name: "Primary Action",
    img: AKey,
  },
  {
    key: "B",
    keycode: 1,
    name: "Go Back",
    img: BKey,
  },
  {
    key: "X",
    keycode: 2,
    name: "Secondary Action",
    img: XKey,
  },
  {
    key: "Y",
    keycode: 3,
    name: "Tertiary Action",
    img: YKey,
  },
  {
    key: "LS",
    keycode: 4,
    name: "Left Shoulder",
    img: LeftTrigger,
  },
  {
    key: "RS",
    keycode: 5,
    name: "Right Shoulder",
    img: RightTrigger,
  },
  {
    key: "LT",
    keycode: 6,
    name: "Left Trigger",
    img: LeftTrigger,
  },
  {
    key: "RT",
    keycode: 7,
    name: "Right Trigger",
    img: RightTrigger,
  },
  {
    key: "Back",
    keycode: 8,
    name: "Select",
    img: Back,
  },
  {
    key: "Start",
    keycode: 9,
    name: "Start",
    img: Start,
  },
  {
    key: "LJB",
    keycode: 10,
    name: "Left Joystick Click",
    img: LeftStick,
  },
  {
    key: "RJB",
    keycode: 11,
    name: "Right Joystick Click",
    img: RightStick,
  },
  {
    key: "Up",
    keycode: 12,
    name: "Direction Pad Up",
    img: DpadUp,
  },
  {
    key: "Down",
    keycode: 13,
    name: "Direction Pad Down",
    img: DpadDown,
  },
  {
    key: "Left",
    keycode: 14,
    name: "Direction Pad Left",
    img: DpadLeft,
  },
  {
    key: "Right",
    keycode: 15,
    name: "Direction Pad Right",
    img: DpadRight,
  },
  // Uncomment if needed
  // {
  //   key: "Main",
  //   keycode: 16,
  //   name: "Guide",
  //   img: Guide,
  // },
  {
    key: "LJX",
    keycode: 16,
    name: "Left Joystick X-Axis",
    img: leftX,
  },
  {
    key: "LJY",
    keycode: 17,
    name: "Left Joystick Y-Axis",
    img: leftY,
  },
  {
    key: "RJX",
    keycode: 18,
    name: "Right Joystick X-Axis",
    img: rightX,
  },
  {
    key: "RJY",
    keycode: 19,
    name: "Right Joystick Y-Axis",
    img: rightY,
  },
];
