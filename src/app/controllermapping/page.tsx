"use client"
import React, { useEffect, useRef, useState } from "react";
import Controller from "../../../public/images/controller_mods/controller.png"
import GamepadButtons from "../components/controllermapping/GamepadButtons";
import { defaultGamepadMapping1 } from "../components/controllermapping/GamePadButton";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getGamePadMapping, saveGamePadMapping } from "../api/gamepad";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface RootState {
    auth: {
        loggedIn: boolean;
        userToken: string | null;
    };
}

interface GamepadData {
    name: string;
    index: number;
    buttonMapping: Record<string, number>;
}

interface GamepadInput {
    name: string;
    key: string;
    keycode: number;
    img?: StaticImageData;
}

const ControllerMapper = () => {

    const basicDeniedStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        ["@media (min-width:992px)"]: {
            width: "40%",
        },
        color: "#fff",
        bgcolor: "#212121",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const type = useRef<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [gamepadIndex, setGamepadIndex] = useState<number | null>(null);
    const [gamepadName, setGamepadName] = useState<string>('');
    const [gamepadInputs, setGamepadInputs] = useState<GamepadInput[]>(defaultGamepadMapping1);
    const [buttonsPressed, setButtonsPressed] = useState<number | null>(null);
    const [buttonsPressed1, setButtonsPressed1] = useState<string | null>(null);
    const [gamePadConnected, setGamePadConnected] = useState<GamepadData[]>([]);
    const [goBack, setGoBack] = useState(false);
    const [idToken, setIdToken] = useState<string | null>(null);
    const { loggedIn, userToken } = useSelector((state: RootState) => state.auth);
    const router = useRouter();


    // let gamepadData = JSON.parse(localStorage.getItem("gamepads"));
    const defaultGamePadSaving = localStorage.getItem("gamepads")
    let gamepadData = defaultGamePadSaving && defaultGamePadSaving !== 'undefined' ? JSON.parse(defaultGamePadSaving) : [];
    const gamePadFetched = (e: any) => {
        localStorage.setItem("gamepads", JSON.stringify(e.gamepad));
        gamepadData = e.gamepad;
    };

    const handleGoBack = () => {
        if (window.Android) {
            window.Android.showMessageInNative('ended');
        }
    }



    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const paramIdToken = params.get('idToken');
        type.current = params.get('type');
        setIdToken(paramIdToken);
        if (!loggedIn && type.current !== "mobile") {
            toast.error("You need to login to access this page!")
            router.push('/signin')
        } else if (type.current === "mobile" && !paramIdToken) {
            toast.error("Something went wrong, Please restart your app once!", {
                autoClose: false
            })
            setGoBack(true)
        } else {
            let tokenn;
            if (type.current === "mobile") tokenn = paramIdToken;
            else tokenn = userToken
            getGamePadMapping(tokenn, gamePadFetched, () => { setGoBack(true) });
        }

        const handleGamepadConnected = (event: GamepadEvent) => {
            // console.log("Gamepad connected:", event.gamepad);
            setGamepadName(event.gamepad.id);
            setGamepadIndex(event.gamepad.index);
            setGamePadConnected((prev) => {
                if (prev.length > 0) {
                    setModalOpen(true);
                } else if (gamepadData?.length > 0) {
                    const gamepadFound = gamepadData.find(
                        (item: GamepadData) => item.name === event.gamepad.id
                    );
                    // console.log(gamepadFound);
                    if (gamepadFound) {
                        const temp = defaultGamepadMapping1.map((item) => {
                            const a = gamepadFound.buttonMapping[item.key];
                            if (['LJX', "LJY", "RJX", "RJY"].includes(item.key)) {
                                return {
                                    ...item,
                                    keycode: defaultGamepadMapping1[a].keycode + 16,
                                    key: item.key,
                                };
                            }
                            else {
                                return {
                                    ...item,
                                    keycode: defaultGamepadMapping1[a].keycode,
                                    key: defaultGamepadMapping1[a].key,
                                };
                            }
                        });
                        // console.log(temp);
                        // console.log(temp)
                        setGamepadInputs(temp);
                    }
                }
                return [
                    ...prev,
                    { name: event.gamepad.id, index: event.gamepad.index, buttonMapping: {} },
                ];
            });
        };

        const handleGamepadDisconnected = (event: GamepadEvent) => {
            setModalOpen(false);
            // console.log("Gamepad disconnected:", event.gamepad);
            setGamepadName('');
            setGamepadIndex(null);
            setGamePadConnected((prev) => {
                for (let i = 0; i < prev.length; i++) {
                    if (prev[i].index !== event.gamepad.index) {
                        handleGamepadClick(prev[i]);
                        break;
                    }
                }
                return prev.filter((pad) => pad.index !== event.gamepad.index);
            });
        };

        window.addEventListener("gamepadconnected", handleGamepadConnected);
        window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

        return () => {
            window.removeEventListener("gamepadconnected", handleGamepadConnected);
            window.removeEventListener(
                "gamepaddisconnected",
                handleGamepadDisconnected
            );
        };
    }, []);
    // console.log(gamePadConnected);
    const handleGamepadClick = (e: GamepadData) => {
        const savedData = localStorage.getItem("gamepads");
        gamepadData = savedData ? JSON.parse(savedData) : [];
        setGamepadName(e.name);
        setGamepadIndex(e.index);
        setModalOpen(false);
        const gamepadFound = gamepadData.find((item: GamepadData) => item.name === e.name);
        if (gamepadFound) {
            const temp = defaultGamepadMapping1.map((item) => {
                const a = gamepadFound.buttonMapping[item.key];
                return {
                    ...item,
                    keycode: defaultGamepadMapping1[a].keycode,
                    key: defaultGamepadMapping1[a].key,
                };
            });
            setGamepadInputs(temp);
        } else {
            setGamepadInputs(defaultGamepadMapping1);
        }
    };
    // console.log(gamepadInputs, gamepadName, gamepadIndex);
    useEffect(() => {
        if (buttonsPressed || buttonsPressed === 0) {
            if (buttonsPressed1) {
                if (
                    (buttonsPressed1 === "Left Joystick X-Axis" ||
                        buttonsPressed1 === "Right Joystick Y-Axis" ||
                        buttonsPressed1 === "Left Joystick Y-Axis" ||
                        buttonsPressed1 === "Right Joystick X-Axis") &&
                    buttonsPressed !== 16 &&
                    buttonsPressed !== 17 &&
                    buttonsPressed !== 18 &&
                    buttonsPressed !== 19
                ) {
                    toast.error("Can't map buttons to axis");
                } else {
                    const temp = defaultGamepadMapping1.find(
                        (e) => e.keycode === buttonsPressed
                    );
                    if (temp) {
                        let temp2 = gamepadInputs.map((item) =>
                            item.name === temp.name ? { ...item, keycode: -1, key: "" } : item
                        );
                        temp2 = gamepadInputs.map((item) =>
                            item.keycode === temp.keycode
                                ? { ...item, keycode: -1, key: "" }
                                : item
                        );
                        const temp1 = temp2.map((item) =>
                            item.name === buttonsPressed1
                                ? { ...item, keycode: buttonsPressed, key: temp.key }
                                : item
                        );
                        setGamepadInputs(temp1);
                    }
                    setButtonsPressed1(null);
                }
            }
        }
    }, [buttonsPressed]);

    const saveControllerInputs = () => {
        let finalInputs = [];
        for (let i = 0; i < gamepadInputs.length; i++) {
            if (!gamepadInputs[i].key) {
                toast.error("Some inputs are missing");
                finalInputs = [];
                return;
            } else {
                const keyFound = defaultGamepadMapping1.find(
                    (e) => e.name === gamepadInputs[i].name
                );
                if (keyFound && ['LJX', "LJY", "RJX", "RJY"].includes(keyFound.key)) {
                    finalInputs.push({
                        [keyFound.key]: gamepadInputs[i].keycode - 16,
                    });
                }
                else if (keyFound) {
                    finalInputs.push({
                        [keyFound.key]: gamepadInputs[i].keycode,
                    });
                }
            }
        }
        if (finalInputs.length !== 0) {
            const buttonMapping = finalInputs.reduce((acc, curr) => {
                return { ...acc, ...curr };
            }, {});
            let tokenn;
            if (idToken) tokenn = idToken;
            else tokenn = userToken;
            // for
            saveGamePadMapping(tokenn, {
                name: gamepadName,
                buttonMapping: buttonMapping,
            });
        }
    };

    // Error/Go Back state
    if (goBack) {
        return (
            <div className="h-screen bg-[#111] text-center text-white pt-32">
                <h6>Something went wrong</h6>
                <button
                    className="bg-[#2876F7] text-white py-3 px-8 rounded-lg mt-12 text-lg md:text-xl"
                    onClick={handleGoBack}
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Check if user is not logged in (and not mobile)
    if (!loggedIn && type.current !== "mobile") {
        return null; // This will be handled by the redirect in useEffect
    }

    return (
        <>
            {/* Controller Selection Dropdown - only show when multiple controllers */}
            {gamePadConnected.length > 1 && (
                <div className="my-2.5 max-w-full flex items-center justify-center">
                    <FormControl className="max-w-[500px] w-full">
                        <InputLabel id="demo-simple-select-label">
                            Select your controller
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gamepadName}
                            label="Age"
                            className="max-w-[500px] w-full"
                        >
                            {gamePadConnected.map((e) => (
                                <MenuItem
                                    onClick={() => handleGamepadClick(e)}
                                    className="max-w-[500px] w-full"
                                    value={e.name}
                                    key={e.name}
                                >
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )}

            {/* Main Content */}
            {!gamepadName ? (
                // Initial state - clean centered layout matching the image
                <div className="flex flex-row gap-[10rem] mt-[-2rem] items-center justify-center min-h-screen">
                    <div className="flex justify-center items-center mb-8">
                        <Image
                            src={Controller}
                            alt="controller"
                            className="w-full max-w-sm md:max-w-md lg:max-w-lg"
                            priority
                        />
                    </div>
                    <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-[-4rem] font-semibold dark:text-white text-black">
                        Press any key to start
                    </h1>
                </div>
            ) : (
                // Gamepad mapping interface
                <>
                    <div className="flex flex-col items-center justify-center min-h-screen py-8">
                        {/* Controller with overlay buttons */}
                        <div className="flex justify-center items-center mb-8">
                            <div
                                className="bg-contain bg-no-repeat flex justify-center items-center w-full max-w-md aspect-square md:max-w-lg lg:max-w-xl relative"
                                style={{
                                    backgroundImage: `url(${Controller})`,
                                }}
                            >
                                {buttonsPressed !== undefined ? (
                                    (() => {
                                        const button = defaultGamepadMapping1.find(
                                            (m) => m.keycode === buttonsPressed
                                        );
                                        return button?.img ? (
                                            <Image
                                                src={button.img}
                                                alt="Gamepad Button"
                                            />
                                        ) : null;
                                    })()
                                ) : buttonsPressed1 ? (
                                    (() => {
                                        const button = defaultGamepadMapping1.find(
                                            (m) => m.name === buttonsPressed1
                                        );
                                        return button?.img ? (
                                            <Image
                                                src={button.img}
                                                alt="Gamepad Button"
                                            />
                                        ) : null;
                                    })()
                                ) : null}
                            </div>
                        </div>

                        {/* Mapping Interface */}
                        <div className="w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6">
                                <p className="text-center mb-6 text-lg font-medium dark:text-white text-black">Press Save button below</p>

                                {/* Hidden GamepadButtons component */}
                                <div className="hidden">
                                    {gamepadIndex !== null && (
                                        <GamepadButtons
                                            setButtonsPressed={setButtonsPressed}
                                            gamepadIndex={gamepadIndex}
                                        />
                                    )}
                                </div>

                                {/* Button mapping list */}
                                <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
                                    {gamepadInputs.map((m, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <div
                                                onClick={() => setButtonsPressed1(m.name)}
                                                className={`flex w-full cursor-pointer items-center p-2.5 rounded-md justify-between transition-colors ${buttonsPressed1 === m.name
                                                        ? "bg-[#6DF728]"
                                                        : !m.key
                                                            ? "bg-red-500"
                                                            : buttonsPressed === m.keycode
                                                                ? "bg-blue-500"
                                                                : "bg-white hover:bg-gray-100"
                                                    }`}
                                            >
                                                <div className="select-none font-medium">{m.name}</div>
                                                <div className="select-none bg-gray-500 text-white px-1.5 py-1 rounded text-sm">
                                                    {m.key || "Not mapped"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Save button */}
                                <div className="flex w-full justify-center mt-6">
                                    <button
                                        onClick={saveControllerInputs}
                                        className="bg-[#2876F7] hover:bg-[#1e5bb8] px-8 py-3 rounded-lg text-white font-medium transition-colors"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal for multiple controllers */}
            <Modal
                open={modalOpen}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div className="relative">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setModalOpen(false)} />
                    <div className="relative bg-[#212121] text-white border-2 border-black shadow-2xl p-4 w-full md:w-[40%] max-w-[600px] rounded-lg mx-4">
                        <Typography
                            className="text-center mb-5 dark:text-white text-black"
                            variant="body1"
                        >
                            Oops! It seems you have connected more than one controller. Please
                            select any one to continue
                        </Typography>
                        <div className="space-y-2">
                            {gamePadConnected.map((e) => (
                                <p
                                    onClick={() => handleGamepadClick(e)}
                                    className="border-2 border-solid p-0.5 px-2.5 cursor-pointer hover:bg-gray-700 transition-colors rounded"
                                    key={e.name}
                                >
                                    {e.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ControllerMapper;