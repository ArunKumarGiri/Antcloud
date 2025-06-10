import { useSelector, useDispatch } from "react-redux";
// import FormInput from "../form-Input/formInput";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { useUpdateUserProfileMutation } from "@/app/services/(auth)/updateProfileService";
import { logout } from "../../features/(auth)/authSlice";
import { useLogoutQuery } from "@/app/services/(auth)/logoutService";
import { removeCredentials } from "../../features/(auth)/userSlice";
// import { authApi } from "@/app/services/(auth)/authService";
import { RootState } from "@/app/store"; // adjust the path as needed
// import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// Add this interface near the top, before the component function
interface AccountInfo {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

// Add this type alias
type AccountInfoKey = keyof AccountInfo;

function AccountDetails() {
    const INITIAL_DATA: AccountInfo = {
        email: " ",
        firstName: " ",
        lastName: " ",
        phone: " "
    };
    const [accountInfo, setAccountInfo] = useState<AccountInfo>(INITIAL_DATA);
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, loggedIn} = useSelector((state: RootState) => state.auth)
    const user = useSelector((state: RootState) => state.user.userDetails);

    useEffect(() => {
        if (loggedIn && user) {
            const { firstName, lastName, email, phone } = user;
            setAccountInfo({
                firstName,
                lastName,
                email,
                phone,
                // resolution
                // address: `${address ? address : ""}`,
                // city: `${city ? city : ""}`,
            });
        }
    }, [user]);

    // Type the resolve object
    const resolve: Record<AccountInfoKey, { label: string; placeholder: string; type: string }> = {
        email: { label: "Email", placeholder: "Enter Email", type: "email" },
        phone: { label: "Phone", placeholder: "Phone Number", type: "text" },
        firstName: { label: "First Name", placeholder: "First Name", type: "text" },
        lastName: { label: "Last Name", placeholder: "Last Name", type: "text" },
        // resolution: { label: "Resolution", placeholder: "Resolution", type: "text" },
        // address: {
        //   label: "Address",
        //   placeholder: "Enter Address",
        //   type: "address",
        // },
        // State: { label: "City", placeholder: "Enter City", type: "text" },
        // city: { label: "City", placeholder: "Enter City", type: "text" },
    };

    // const handleChange = ({ name, value }: { name: string; value: string }) => {
    //     setAccountInfo({ ...accountInfo, [name as AccountInfoKey]: value });
    // };

    const { data, error } = useLogoutQuery('logout', { skip: true });

    // const handleLogout = () => {
    //     setIsLogoutRequest(false);
    // }

    // const handleEmailVerification = async () => {
    //     try {
    //         const response = await fetch(
    //             "https://api.antcloud.co/api/users/email/otp",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     Authorization: `JWT ${userToken}`,
    //                 },
    //             }
    //         );
    //         // if (!response.ok) {
    //         //   throw new Error("Failed to verify email");
    //         // }
    //         const data = await response.json();
    //         if (data.message !== "")
    //             toast.success(data.message);
    //     } catch (error) {
    //         toast.error("Error while sending email:");
    //     }
    // };

    useEffect(() => {
        if (data && data.message === "You have been logged out succesfully!") {
            dispatch(logout());
            dispatch(removeCredentials());
            router.push('/signin');
            toast.success("Come Back Soon!")
        } else if (error) {
            toast.error('Error Logging Out!')
        }
    }, [data, error])

    // const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

    // const updateProfile = async () => {
    //   var isError = false;
    //   const updatePromise = new Promise(async (resolve, reject) => {
    //     try {
    //       if (!isError) {
    //         console.log(accountInfo);
    //         // await firebase.updateProfile(accountInfo);
    //         // updateUserProfile(accountInfo);
    //         console.log(userData)
    //         setAccountInfo(INITIAL_DATA);
    //         resolve("Succesfully Updated profile");
    //       } else {
    //         const { firstName, lastName, email, phone } = user;
    //         setAccountInfo({
    //           firstName,
    //           lastName,
    //           email,
    //           phone
    //         });
    //       }
    //     } catch (error) {
    //       setError(true);
    //       console.log(error);
    //       reject(error.message);
    //     }
    //   });

    //   toast.promise(updatePromise, {
    //     pending: {
    //       render() {
    //         return "Updating Your Profile";
    //       },
    //     },
    //     success: {
    //       render({ data }) {
    //         return data;
    //       },
    //     },
    //     error: {
    //       render({ data }) {
    //         return data;
    //       },
    //     },
    //   });
    // };

    // const resetPassword = () => {
    //   let errorMsg = "";
    //   firebase
    //     .auth()
    //     .sendPasswordResetEmail(profile.email)
    //     .then(() => {
    //       this.setState({ password: false });
    //     })
    //     .catch((error) => {
    //       if (error.code === "auth/invalid-email") {
    //         errorMsg =
    //           "The email address entered is incorrect. Please check again.";
    //       } else if (error.code === "auth/user-not-found") {
    //         errorMsg =
    //           "User with the given email does not exist. Please check again.";
    //       } else {
    //         errorMsg = "Something went wrong";
    //       }
    //     });
    //   if (errorMsg) {
    //     toast.error(errorMsg);
    //   } else toast.success("Password reset email sent");
    // };

    if (loading) {
        return <div className="loaderforDatabase" />;
    }

    return (
        <div className="px-5 py-2.5 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.keys(accountInfo).map((key: string, idx) => {
                    const accountInfoKey = key as AccountInfoKey;
                    return (
                        <div key={idx} className="flex w-full items-center relative z-[1]">
                            <span className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-md w-36 text-base flex items-center justify-center font-medium border border-gray-400 border-r-0">
                                {resolve[accountInfoKey].label}
                            </span>
                            <div className="flex-grow bg-black border border-gray-400 px-4 py-3 rounded-r-md text-base text-white flex items-center overflow-hidden">
                                {accountInfo[accountInfoKey]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default AccountDetails;
