"use client"
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { toast } from "react-toastify";

const EmailVerification = () => {
    const { loggedIn, userInfo, userToken } = useSelector((state: RootState) => state.auth);


    const handleEmailVerification = async () => {
        try {
            const response = await fetch(
                "https://api.antcloud.co/api/users/email/otp",
                {
                    method: "POST",
                    headers: {
                        Authorization: `JWT ${userToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to verify email");
            }

            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            toast.error("Error while sending email:");
            console.log(error);
        }
    };

    return (
        <div>
            {loggedIn && userInfo && userInfo.emailVerified === false && (
                <p
                    style={{
                        backgroundColor: "#22b9a6",
                        paddingBottom: "8px",
                        paddingTop: "2px",
                        position: "fixed",
                        top: "0",
                        width: "100%",
                        marginBottom: "10px",
                        textAlign: "center",
                        zIndex: "1000",
                        fontSize: "18px",
                        color: "black",
                    }}
                >
                    Your email is not verified, Please check your email!{" "}
                    <span
                        onClick={handleEmailVerification}
                        style={{
                            fontSize: "18px",
                            color: "white",
                            cursor: "pointer",
                            textDecoration: "underline",
                        }}
                    >
                        Resend verification email.
                    </span>
                </p>
            )}
        </div>
    );
};

export default EmailVerification;
