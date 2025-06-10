import { useEffect, useState } from "react";
import Spinner from "./spinner";
import styles from './endOfStream.module.css';

function EndOfStream({ inactiveReason, setStartStream, mobileStream }) {
    const [show, setShow] = useState(<Spinner topPosition={40} />);

    useEffect(() => {
        if (inactiveReason === 'noplan') {
            setShow(<div className={styles.message}>
                <h3>
                    You do not have an active plan. Please purchase one before trying to play a game.
                </h3>
                <a href="/pricing">Pricing</a>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
            </div>)
        } else if (inactiveReason === 'inactive') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    Your account is currently disabled. Please contact the support team.
                </h3>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
            </div>)
        } else if (inactiveReason === 'emailverification') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    Your email is not verified. Please verify it to be able to play.
                </h3>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
            </div>)
        } else if (inactiveReason === 'dual') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    A stream is already running with your account. You cannot start a second stream.
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        }  else if (inactiveReason === 'vmissue') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    There was an issue starting your PC. <br />
                    Kindly try the following points to troubleshoot your issue:
                    {/* Please contact the support team to rectify. */}
                </h3>
                <p style={{ textAlign: "left", width: "50%", margin: "auto", marginTop: "2rem" }}>
                    {/* Kindly try the following points to troubleshoot your issue: */}
                    {/* Note: The top-up plan is only applicable if you are already on a monthly plan */}
                    <ul>
                        <li style={{ listStyleType: "unset" }}> Please refresh your page, wait for 2 mins & try again. Your PC will be reset in that time.</li>
                        <li style={{ listStyleType: "unset" }}> Kindly ensure that you are not connected to any VPN services.</li>
                        {!mobileStream 
                            ? <li style={{ listStyleType: "unset" }}> If the above two points did not help, click below for raising a support request.</li> 
                            : <li> If the above two points did not help, please contact the support team to rectify.</li>}
                    </ul>
                </p>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            window.location.href = '/support';
                        // navigate('/support')
                        // setStartStream()
                    }}
                >
                   {mobileStream ? 'Go Back' : 'Contact Support' } 
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else if (inactiveReason === 'planover') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    You have used up all the time in your plan. Please buy a top up plan.
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else if (inactiveReason === 'videonotstarting') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    You seem to be unable to start a video connection with the PC. Please check your internet connection once and try again.
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else if (inactiveReason === 'servernotavailable') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    The server you are trying to connect to is not available.
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else if (inactiveReason === 'wrongtoken') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    Something went wrong.
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else if (inactiveReason === 'vmnotfound') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    Your profile isn&apos;t completed yet, Please wait for 5 minutes then refresh your page and try again.
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else if (inactiveReason === 'serversfull') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    Our Apologies but currently all our servers are full, Please wait for atleast 10 minutes and then try connecting again.
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else if (inactiveReason === 'streamend') {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                    Your Stream has ended! Please click below to go back to your dashboard!
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        } else {
            setShow(<div className={styles.message}>
                <h3
                    style={{ textAlign: "center", marginTop: "50px" }}
                >
                   Your stream has ended!
                </h3>
                <button
                    style={{ marginTop: "2rem" }}
                    className="btn-comm btn-lg-2"
                    // onClick={setStartStream}
                    onClick={() => {
                        if (mobileStream) {
                            window.Android.showMessageInNative('goBack')
                        } else
                            setStartStream()
                    }}
                >
                    Go Back
                </button>
                {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
            </div>)
        }
    }, [inactiveReason]);

    return show;
}

export default EndOfStream;

// else if (inactiveReason === 'vmissue') {
//     setShow(<div className={styles.message}>
//         <h3
//             style={{ textAlign: "center", marginTop: "50px" }}
//         >
//             There was an issue starting your PC. Please contact the support team to rectify.
//         </h3>
//         <button
//             style={{ marginTop: "2rem" }}
//             className="btn-comm btn-lg-2"
//             // onClick={setStartStream}
//             onClick={() => {
//                 if (mobileStream) {
//                     window.Android.showMessageInNative('goBack')
//                 } else
//                     setStartStream()
//             }}
//         >
//             Go Back
//         </button>
//         {/* <button style={{ marginTop: "2rem" }} className="btn-comm btn-lg-2" onClick={setStartStream}>Go Back</button> */}
//     </div>)
// } 