"use client"
import React, { useRef, useEffect, useState } from "react"
import styles from "@/app/stream/streampage.module.css"
import WindowsStreamPage from '@/app/components/stream/windowsStreamPage';
import Spinner from "@/app/components/stream/overlays/spinner";
import { Dashboard } from "@/app/components/dashboard";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "@/app/services/(auth)/authService";
import { setCredentials } from "@/app/features/(auth)/userSlice";
import { logout, refreshTokens, setUserPlan } from "@/app/features/(auth)/authSlice";
import { toast } from "react-toastify";
import { useRefreshUserTokenQuery } from "@/app/services/(auth)/refreshService";
import EmailVerification from "@/app/components/emailVerification";
import { zoom } from "@/app/components/zoom";
import { WindowsDashboard } from "@/app/components/WindowsDashboard";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        Android?: {
            showMessageInNative: (message: string) => void;
        };
    }
}

interface WebViewEventDetail {
    start?: boolean;
    paused?: boolean;
    resumed?: boolean;
}

export default function StreamPage() {
    const [startStream, setStartStream] = useState(false);
    const [games, setGames] = useState([]);
    const gamesRef = useRef<any[]>([]);
    gamesRef.current = games;
    const type = useRef(null);
    const router = useRouter();
    const [streamStatus, setStreamStatus] = useState('');
    const [user, setUser] = useState(null);
    const { loggedIn, userToken, userRefreshToken, userInfo } = useSelector((state: any) => state.auth);
    const [maintenance, setMaintenance] = useState({ active: false, message: undefined });
    const [maintenanceLoading, setMaintenanceLoading] = useState(false);
    const refreshDataRef = useRef({});
    const refreshErrorRef = useRef({});

    refreshDataRef.current = refreshDataRef;
    refreshErrorRef.current = refreshErrorRef;

    const dispatch = useDispatch();

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const paramIdToken = params.get('idToken');

        if (!paramIdToken && !loggedIn) {
            router.push('/signin')
        } else if (!paramIdToken && window.matchMedia("only screen and (max-width: 760px)").matches) {
            router.push('/downloads')
        }
    }, [])

    useEffect(() => {
        if (!startStream) document.body.style.overflowY = 'scroll';
        if (startStream) zoom.out({});
    }, [startStream])

    const stream = (game: any) => {
        localStorage.setItem('game', game);
        setStartStream(true);

    }

    const stopStream = () => {
        setStartStream(false);

        if (type.current === 'mobile') if (window.Android) window.Android.showMessageInNative('ended');
    }


    const fetchMe = async (meToken: string | null) => {
        try {
            const userData = await fetch('https://api.antcloud.co/api/users/me',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `JWT ${meToken}`
                    }
                }
            )
            const user = await userData.json();
            return user
        } catch (err) {
            console.log(err)
            toast.error(err instanceof Error ? err.message : String(err))
        }
    }

    const fetchRefresh = () => {
        return fetch('https://api.antcloud.co/api/users/refresh',
            {
                method: 'GET',
                headers: {
                    'refresh': `JWT ${userRefreshToken}`
                }
            }
        ).then((res) => res.json())
            .then(res => {
                return res
            })
    }

    useEffect(() => {
        if (loggedIn) {
            const tryMe = (meToken: string | null, refreshToken: string | null) => {
                fetchMe(meToken)
                    .then(userData => {
                        if (userData.message) {
                            if (userData.message === 'Token Expired') {
                                fetchRefresh().then(refreshData => {
                                    if (refreshData.message === 'Re-authentication needed!' || refreshData.message === 'Forbidden Request!' || refreshData.message === 'Refresh Token Expired') {
                                        toast.error('Session Expired! Please Sign in again.')
                                        router.push('/signin');
                                        dispatch(logout())
                                    } else if (refreshData.message === "New Access Pairs Generated!") {
                                        dispatch(refreshTokens(refreshData));
                                        tryMe(refreshData.accessToken, refreshData.refreshToken);
                                    }
                                })
                            } else if (userData.message === 'Invalid Token') {
                                toast.error('Session Expired! Please Sign in again.')
                                router.push('/signin');
                                dispatch(logout())
                            }
                        } else {
                            dispatch(setCredentials(userData.user))
                            const userPayload = {
                                id: userData.user.id,
                                firstName: userData.user.firstName,
                                currentPlan: userData.user.currentPlan,
                                emailVerified: userData.user.emailVerified,
                                email: userData.user.email
                            }
                            dispatch(setUserPlan(userPayload));
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
            tryMe(userToken, userRefreshToken);
        }

        fetch('https://api.antcloud.co/api/globals/maintenance')
            .then((res) => res.json())
            .then((res) => {
                setMaintenance(res);
                setMaintenanceLoading(false)
            })
    }, []);

    // useEffect(() => {
    //   router.push('/service/updates')
    // }, [])

    return (
        <div style={user == null ? { paddingBottom: "3%" } : { paddingBottom: "0" }} className={styles.Global}>
            <EmailVerification />
            {
                startStream
                    ?
                    !maintenanceLoading
                        ? <WindowsStreamPage maintenance={maintenance} stopStream={stopStream} streamStatus={streamStatus} admin={false} serverId="" />
                        : <Spinner topPosition={40} bottomPosition={0} width={20} />
                    : <WindowsDashboard maintenance={maintenance} games={games} user={user} stream={stream} />
            }
        </div>
    );
}