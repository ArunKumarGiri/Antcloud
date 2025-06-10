"use client"
import React, { useRef, useEffect, useState } from "react"
import styles from "@/app/stream/streampage.module.css"
import Stream from '@/app/components/stream/Stream';
import Spinner from "@/app/components/stream/overlays/spinner";
import { Dashboard } from "@/app/components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "@/app/services/(auth)/authService";
import { setCredentials } from "@/app/features/(auth)/userSlice";
import { logout, refreshTokens, setUserPlan } from "@/app/features/(auth)/authSlice";
import { toast } from "react-toastify";
import { useRefreshUserTokenQuery } from "@/app/services/(auth)/refreshService";
import EmailVerification from "@/app/components/emailVerification";
import { zoom } from "@/app/components/zoom";
import { useRouter } from "next/navigation";

declare global {
  interface WindowEventMap {
    'webview': CustomEvent<WebViewEventDetail>;
  }
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
  const type = useRef<'mobile' | 'desktop' | null>(null);
  const router = useRouter();
  const [streamStatus, setStreamStatus] = useState('');
  const [user, setUser] = useState(null);
  const { loggedIn, userToken, userRefreshToken, userInfo } = useSelector((state: any) => state.auth);
  const [maintenance, setMaintenance] = useState({ active: false, message: undefined });
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const refreshDataRef = useRef({});
  const refreshErrorRef = useRef({});
  const [loaded, setLoaded] = useState(false);
  const [skipMe, setSkipMe] = useState(true);

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

  // Add mobile detection and token initialization
  useEffect(() => {
    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
      type.current = 'mobile';
    }

    // Initialize auth state from localStorage
    const storedToken = localStorage.getItem('userToken');
    const storedRefreshToken = localStorage.getItem('userRefreshToken');
    const storedUserInfo = localStorage.getItem('userInfo');

    if (storedToken && storedRefreshToken && storedUserInfo) {
      dispatch(setCredentials(JSON.parse(storedUserInfo)));
      setSkipMe(false);
    }
  }, []);

  refreshDataRef.current = refreshDataRef;
  refreshErrorRef.current = refreshErrorRef;

  const dispatch = useDispatch();

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const paramIdToken = params.get('idToken');

    if (!paramIdToken && !loggedIn && !localStorage.getItem('userToken')) {
      router.push('/signin')
    } else if (!paramIdToken && window.matchMedia("only screen and (max-width: 760px)").matches) {
      router.push('/downloads')
    }
    // console.log('paramidtoken' + paramIdToken)

  }, [loggedIn])

  // useEffect(() => {
  //   if (type.current !== 'mobile') router.push('/service/updates')
  // }, [])


  useEffect(() => {
    if (!startStream) document.body.style.overflowY = 'scroll';
    if (startStream) zoom.out({});
  }, [startStream])

  const stream = (game: any) => {
    if (!userInfo?.currentPlan) {
      toast.error('Please purchase a plan to start streaming');
      router.push('/pricing');
      return;
    }
    localStorage.setItem('game', game);
    setStartStream(true);
  }

  const stopStream = () => {
    setStartStream(false);

    if (type.current === 'mobile') if (typeof window !== 'undefined' && window.Android !== undefined && window.Android !== null) window.Android.showMessageInNative('ended');
  }

  useEffect(() => {
    if (type.current === 'mobile') {
      setLoaded(true);
      // For Android app, check if we have a game parameter in URL
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const gameParam = params.get('game');

      if (window.Android && gameParam) {
        // If we have a game parameter, start streaming that game
        localStorage.setItem('game', gameParam);
        setStartStream(true);
        if (typeof window !== 'undefined' && window.Android !== undefined && window.Android !== null) {
          setTimeout(() => { window.Android?.showMessageInNative('loaded') }, 2000);
        }
      }

      const handleWebView = (event: CustomEvent<WebViewEventDetail>) => {
        if (typeof window !== 'undefined' && window.Android !== undefined && window.Android !== null && event.detail.start) {
          if (window.Android) window.Android.showMessageInNative('started');
          setLoaded(true);
          setStartStream(true);
        }
        if (event.detail.paused) {
          setStreamStatus('paused')
        }
        if (event.detail.resumed) {
          setStreamStatus('resumed')
        }
      };

      window.addEventListener('webview', handleWebView as EventListener);
      return () => {
        window.removeEventListener('webview', handleWebView as EventListener);
      };
    }
  }, [type.current]);

  useEffect(() => {
    if (userToken || localStorage.getItem('userToken')) {
      setSkipMe(false);
      const tokenToUse = userToken || localStorage.getItem('userToken');
      const refreshTokenToUse = userRefreshToken || localStorage.getItem('userRefreshToken');

      if (tokenToUse) {
        tryMe(tokenToUse, refreshTokenToUse);
      }
    }
  }, [userToken, userRefreshToken]);

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

  // console.log(userToken, userRefreshToken, loggedIn, skipMe);

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
  //   navigate('/service/updates')
  // }, [])

  return (
    <div style={user == null ? { paddingBottom: "3%" } : { paddingBottom: "0" }} className={styles.Global}>
      <EmailVerification />
      {
        startStream
          ?
          !maintenanceLoading
            ? <Stream maintenance={false} stopStream={stopStream} streamStatus={streamStatus} admin={false} serverId="" />
            : <Spinner topPosition={40} bottomPosition={0} width={20} />
          : <Dashboard maintenance={maintenance} games={games} user={user} stream={stream} />
      }
    </div>
  );
}
