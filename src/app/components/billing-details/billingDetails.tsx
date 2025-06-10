// import FormInput from "../form-Input/formInput";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../stream/overlays/spinner";

interface RootState {
    user: {
        userDetails: any; // Replace 'any' with your actual user type if available
    };
}

function BillingDetails() {
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user.userDetails);

    useEffect(() => {
        setLoading(!user);
    }, [user]);

    const getDateString = (dateString: string) => {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const month = monthNames[date.getMonth()];
        return `${date.getDate()} ${month} ${date.getFullYear()}`;
    };

    const timeLeft = () => {
        if (!user) return 'N/A';

        if (user.totalTimeMonth && user.totalTimeMonth !== 0) {
            const minutes = Math.max(0, user.totalTimeMonth - user.timeUsedMonth);
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} hours ${remainingMinutes} minutes`;
        }
        return 'N/A';
    };

    const daysLeft = (dateString: string) => {
        if (!dateString) return 'N/A';

        try {
            const targetDate = new Date(dateString);
            const currentDate = new Date();

            // Calculate the difference in milliseconds
            const differenceMs = targetDate.getTime() - currentDate.getTime();

            // Convert milliseconds to days and ensure it's not negative
            const days = Math.max(0, Math.ceil(differenceMs / (1000 * 60 * 60 * 24)));
            return days;
        } catch (error) {
            console.error("Error calculating days left:", error);
            return 'N/A';
        }
    };

    const checkPlanName = (planName: string) => {
        if (!planName) return 'N/A';

        const plan = planName.toLowerCase();
        if (plan === "gtxpremium") return 'PREMIUM (INTRO)';
        else if (plan === "gtxultimate") return 'ULTIMATE (INTRO)';
        else if (plan === "premium") return 'PREMIUM (ADVANCED)';
        else if (plan === "ultimate") return 'ULTIMATE (ADVANCED)';
        else return planName.toUpperCase();
    };

    if (loading) {
        return <Spinner topPosition={0} bottomPosition={0} width={100} />;
    }

    if (!user) {
        return <div className="p-4 text-gray-600">User information not available</div>;
    }

    const hasActivePlan = user.currentPlan && user.currentPlan.toLowerCase() !== "basic";
    const hasRenewalDate = Boolean(user.renewDate);
    const hasUpcomingPlans = user.upcomingPlans && user.upcomingPlans.length > 0;

    return (
        <div className="px-5 py-2.5 h-full">
            <h3 className="text-center text-2xl font-bold relative mb-8 text-white mt-[-3rem]">
                Billing and Membership
                <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 h-px w-full bg-gray-400"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Type */}
                <div className="flex w-full items-center relative z-[1]">
                    <span className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-md w-36 text-base flex items-center justify-center font-medium border border-gray-400 border-r-0">
                        Type
                    </span>
                    <div className="flex-grow bg-black border border-gray-400 px-4 py-3 rounded-r-md text-base text-white flex items-center overflow-hidden">
                        {checkPlanName(user.currentPlan)}
                    </div>
                </div>

                {/* Time Left */}
                {hasActivePlan && (
                    <div className="flex w-full items-center relative z-[1]">
                        <span className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-md w-36 text-base flex items-center justify-center font-medium border border-gray-400 border-r-0">
                            Time Left
                        </span>
                        <div className="flex-grow bg-black border border-gray-400 px-4 py-3 rounded-r-md text-base text-white flex items-center overflow-hidden">
                            {timeLeft()}
                        </div>
                    </div>
                )}

                {/* Renewal Date / Ends On */}
                {(hasActivePlan || hasRenewalDate) && (
                    <div className="flex w-full items-center relative z-[1]">
                        <span className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-md w-36 text-base flex items-center justify-center font-medium border border-gray-400 border-r-0">
                            {hasUpcomingPlans ? 'Renewal on' : 'Ends On'}
                        </span>
                        <div className="flex-grow bg-black border border-gray-400 px-4 py-3 rounded-r-md text-base text-white flex items-center overflow-hidden">
                            {getDateString(user.renewDate)}
                        </div>
                    </div>
                )}

                {/* Days Left */}
                {(hasActivePlan || hasRenewalDate) && (
                    <div className="flex w-full items-center relative z-[1]">
                        <span className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-md w-36 text-base flex items-center justify-center font-medium border border-gray-400 border-r-0">
                            Days left
                        </span>
                        <div className="flex-grow bg-black border border-gray-400 px-4 py-3 rounded-r-md text-base text-white flex items-center overflow-hidden">
                            {daysLeft(user.renewDate)}
                        </div>
                    </div>
                )}

                {/* Next Plan */}
                {hasUpcomingPlans && (
                    <div className="flex w-full items-center relative z-[1]">
                        <span className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-md w-36 text-base flex items-center justify-center font-medium border border-gray-400 border-r-0">
                            Next Plan
                        </span>
                        <div className="flex-grow bg-black border border-gray-400 px-4 py-3 rounded-r-md text-base text-white flex items-center overflow-hidden">
                            {checkPlanName(user.upcomingPlans[0].planName)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BillingDetails;