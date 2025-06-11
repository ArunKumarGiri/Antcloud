"use client"
import React, { useEffect, useState, ChangeEvent } from "react"
import styles from "../stream/streampage.module.css"
import Stream from "../components/stream/stream";
import Spinner from "../components/stream/overlays/spinner";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AdminStream() {
    const [startStream, setStartStream] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [serverId, setServerId] = useState('');
    const { userToken } = useSelector((state: { auth: { userToken: string } }) => state.auth);
    const router = useRouter();

    useEffect(() => {
        fetch('https://api.antcloud.co/api/users/me', {
            // fetch('http://localhost:8000/api/users/me', {
            headers: {
                "Authorization": `JWT ${userToken}`
            }
        }).then(async (res) => {
            const result = await res.json();
            if (res.status === 200) {

                if (result.user.email != "yadavlakshay76@gmail.com" && result.user.email != "gaurichauhan060@gmail.com" && result.user.email != "sarang.atri@gmail.com" && result.user.email != "abhyant@antplay.tech") {
                    router.push('/stream')
                }
            } else {
                router.push('/stream')
            }
            setLoaded(true);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (!startStream) document.body.style.overflowY = 'scroll';
    }, [startStream])

    const stream = () => {
        setStartStream(true);
    }

    const stopStream = () => {
        setStartStream(false);
    }

    const setValue = (event: ChangeEvent<HTMLInputElement>) => {
        setServerId(event.target.value);
    }

    return (
        <div className={styles.Global}>
            {
                loaded ?
                    startStream ?
                        <Stream stopStream={stopStream} maintenance={{ active: false, message: null }} streamStatus={''} admin={true} serverId={serverId} />
                        : <div>
                            <input value={serverId} onChange={setValue}></input>
                            <button onClick={stream}>Start</button>
                        </div>
                    : <Spinner topPosition="50%" bottomPosition="auto" width="50px" />
            }
        </div>
    );
}