import { useState, useEffect } from "react";
import Spinner from "./spinner";
import BlockBreakerGame from "./BlockBreakerGame";

function Loading({ game, vmstatus, mobileStream }) {
    const [timer, setTimer] = useState(300); // Start with 5 minutes
    const [isFiveMinuteCycle, setIsFiveMinuteCycle] = useState(true);
    const [showGame, setShowGame] = useState(false); // State to toggle game visibility

    useEffect(() => {
        let checkTime;
        if (vmstatus === "starting") {
            checkTime = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 0) {
                        // Switch between 5 minutes and 2 minutes
                        setIsFiveMinuteCycle(!isFiveMinuteCycle);
                        return isFiveMinuteCycle ? 120 : 300; // 2 minutes or 5 minutes
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            clearInterval(checkTime);
        }
    }, [vmstatus, isFiveMinuteCycle]);

    // Add keyboard event listener to toggle game
    useEffect(() => {
        const handleKeyDown = (e) => {
            // For example, toggle with the 'G' key
            if (e.key === 'g' || e.key === 'G') {
                // Only allow toggling if vmstatus is starting or done
                if (vmstatus === "starting" || vmstatus === "done") {
                    setShowGame(prevShowGame => !prevShowGame);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [vmstatus]); // Add vmstatus as a dependency

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "black" }}>
            <img
                src="/StreamVideo.gif"
                alt="Background Animation"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                    opacity: timer > 0 ? 0.3 : 1,
                    transition: "opacity 0.5s ease-in-out",
                }}/>
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}  >
                {/* Remove the toggle button */}
                {/*
                {(vmstatus === "starting" || vmstatus === "done") && (
                    <button
                        onClick={toggleGameVisibility}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            padding: "10px",
                            backgroundColor: "#0095DD",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            zIndex: 2 // Ensure button is above other content
                        }}
                    >
                        {showGame ? "Show Spinner" : "Play Game"}
                    </button>
                )}
                */}

                {/* Always show the loading info */}
                {vmstatus === "starting" ?
                    <div className="mt-[-10rem]">
                        <h3
                            style={{ textAlign: "center", marginTop: "-150px", color: "white" }}
                        >
                            Your PC is starting<br />
                            This may take upto < span style={{ color: "#22B9A6" }
                            }> {`0${Math.trunc(timer / 60)}`}:
                                {`${timer % 60 > 9 ? "" : "0"}${timer % 60}`} minutes </span > < br /> <br />
                            {/* This may take upto 5 minutes<br /><br /> */}
                            {
                                !mobileStream && <p style={{ color: "white" }}> Note: Press F10 to go fullscreen</p>
                            }
                            {/* <p> Note: Press F10 to go fullscreen</p> */}
                        </h3>
                        {/* Conditionally show Game or Spinner */}
                        {showGame && (vmstatus === "starting" || vmstatus === "done") && !mobileStream ? (
                            <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
                                <BlockBreakerGame />
                            </div>
                        ) : (
                            <>
                                {(vmstatus === "starting" || vmstatus === "done") && !mobileStream && (
                                    <p style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
                                        Press G to play a game in the meantime
                                    </p>
                                )}
                                <Spinner />

                            </>
                        )}
                    </div>
                    : vmstatus === "done" ?
                        <div className="mt-[-10rem]">
                            <h3
                                style={{ textAlign: "center", marginTop: "-150px", color: "white" }}
                            >
                                Loading Stream<br />
                                This may take upto 30 seconds.<br /><br />
                                {
                                    !mobileStream && <p style={{ color: "white" }}> Note: Press F10 to go fullscreen</p>
                                }
                                {/* <p> Note: Press F10 to go fullscreen</p> */}
                            </h3>
                            {/* Conditionally show Game or Spinner */}
                            {showGame && (vmstatus === "starting" || vmstatus === "done") && !mobileStream ? (
                                <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
                                    <BlockBreakerGame />
                                </div>
                            ) : (
                                <>
                                    {(vmstatus === "starting" || vmstatus === "done") && !mobileStream && (
                                        <p style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
                                            Press G to play a game in the meantime
                                        </p>
                                    )}
                                    <Spinner />

                                </>
                            )}
                        </div> : game === "desktop" ?
                            <div className="mt-[-10rem]">
                                <h3
                                    style={{ textAlign: "center", marginTop: "-150px", color: "white" }}

                                >
                                    Sending Boot Request<br />
                                    Please refresh your page and try again if it takes more than 30 seconds.
                                    <br /><br />
                                    {
                                        !mobileStream && <p style={{ color: "white" }}> Note: Press F10 to go fullscreen</p>
                                    }
                                    {/* <p> Note: Press F10 to go fullscreen</p> */}
                                </h3>
                                <Spinner />
                            </div>
                            : <div style={{ height: "100vh", backgroundColor: "black", paddingTop: "10%" }}>
                                <h3
                                    style={{ textAlign: "center", color: "white" }}
                                >
                                    Loading Please wait <br />
                                    Please refresh your page and try again if it takes more than 30 seconds.
                                    <br /><br />
                                    {
                                        !mobileStream && <p style={{ color: "white" }}> Note: Press F10 to go fullscreen</p>
                                    }
                                    {/* <p> Note: Press F10 to go fullscreen</p> */}
                                </h3>
                                <Spinner topPosition={50} />
                            </div>
                }
            </div>
        </div>
    );
}

export default Loading;