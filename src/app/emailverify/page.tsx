"use client";
import React, { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "../components/stream/overlays/spinner";
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function EmailVerify() {
    const [success, setSuccess] = useState<string | false>(false)
    const [error, setError] = useState<string | false>(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const searchParams = useSearchParams();
    const verificationToken = searchParams.get('code');

    useEffect(() => {
        if (verificationToken) {
            setLoading(true)
            fetch(`https://api.antcloud.co/api/users/email/verify?token=${verificationToken}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.message) {
                        if (data.message === "Email Verified Successfully!") {
                            setSuccess('Email Verified Successfully!')
                            toast('Email Verified Successfully!')
                            router.push('/stream');
                            setLoading(false)
                        } else {
                            setLoading(false)
                            toast.error(data.message)
                            setError(data.message)
                        }
                    }
                }).catch(err => {
                    setLoading(false)
                    console.log(err);
                    toast.error(err.message)
                })
        } else setError('No Authorization Token Found')
    }, [])
    return (
        <div className="min-h-full flex items-center justify-center [perspective:1000px]">
            <div className="w-full max-w-lg p-6">
                <Card className="bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.12)] rounded-[28px] border border-gray-200/20 dark:border-gray-800/20 hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_12px_40px_rgb(255,255,255,0.2)] transition-all duration-500 transform hover:rotate-y-3 hover:scale-105">
                    {loading ? (
                        <div className="p-8 flex justify-center">
                            <Spinner topPosition="50%" bottomPosition="50%" width="100%" />
                        </div>
                    ) : (
                        <CardContent className="p-8 text-center bg-black">
                            <div className="mb-6">
                                {error ? (
                                    <CancelIcon fontSize="large" className="w-20 h-20 text-red-500 animate-in fade-in slide-in-from-top-2 duration-500" />
                                ) : success ? (
                                    <CheckCircleIcon className="w-20 h-20 text-[#05EBFB] animate-in fade-in slide-in-from-top-2 duration-500" />
                                ) : null}
                            </div>
                            <Typography
                                variant="h4"
                                className="font-bold bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-2 duration-500"
                            >
                                {error || success}
                            </Typography>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    )
}