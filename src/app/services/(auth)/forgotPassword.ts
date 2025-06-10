import axios from "axios";

export const forgotPassword = (email: string, onSuccess: () => void, onFailure: () => void) => {
    axios
        .post(`https://api.antcloud.co/api/users/forgot-password`, {
            email: email,
        })
        .then((response) => {
            onSuccess();
        })
        .catch((error) => {
            onFailure();
            console.log("error", error);
        });
};
export const resetPassword = (token: string, password: string, onSuccess: () => void, onFailure: () => void) => {
    axios
        .post(`https://api.antcloud.co/api/users/reset-password`, {
            token: token,
            password: password,
        })
        .then((response) => {
            onSuccess();
        })
        .catch((error) => {
            onFailure();
            console.log("error", error);
        });
};
