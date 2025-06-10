'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MouseIcon from '@mui/icons-material/Mouse';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GamepadIcon from '@mui/icons-material/Gamepad';
import SettingsIcon from '@mui/icons-material/Settings';
import { ToggleButton } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Paper, Grid, Typography, Stack, Button, Container, IconButton } from '@mui/material';

function Settings({ keyboardBased, touchAllowed, admin, planEndWarning, timeLeft, rtt, loading, setFps, setBitrate, GpadPositionSaved, setGpadPositionSaved, ToggleOnScreenKeyboard, ToggleOnScreenMouse, toggleGpadOverlay, toggleGpadPosition, FPS, bitrate, setStartStream, setPointerLockAllowed, toggleControls, game }) {
    const qualities = {
        "gareeb": [
            2000,
            4000,
            6000,
            8000
        ],
        "middleClass": [
            10000,
            12000,
            15000,
            18000
        ],
        "ameer": [
            20000,
            25000,
            30000,
            40000
        ]
    }

    const modalRef = useRef(null);
    const modal2Ref = useRef(null);

    //Stream toggle
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [GpadSelected, setGpadSelected] = React.useState(false);
    const [KeyboardSelected, setKeyboardSelected] = React.useState(false);
    const [PositionSelected, setPositionSelected] = React.useState(false);

    modalRef.current = modal;
    modal2Ref.current = modal2;

    useEffect(() => {
        if (keyboardBased) {
            document.addEventListener("keydown", keyHandle, false);
            return () => {
                document.removeEventListener("keydown", keyHandle);
            }
        }
    }, [])

    useEffect(() => {
        if (GpadPositionSaved) {
            if (PositionSelected) {
                toggleGpadPosition()
                setPositionSelected(false);
                setGpadSelected(true)
            }
            setGpadPositionSaved(false)
        }
    }, [GpadPositionSaved])

    //SettingsOverlay
    const toggleOverlay = () => {
        if (!modalRef.current) {
            setModal(true);
        } else {
            setModal(false);
        }
    }
    const toggleOverlay2 = () => {
        if (!modal2Ref.current) {
            setModal2(true);
        } else {
            setModal2(false);
        }
    }
    const keyHandle = (e) => {
        if (e.code === 'F9') {
            if (e.type === "keydown") {
                if (!modalRef.current) {
                    document.exitPointerLock();
                    setPointerLockAllowed(false);
                    setModal(true);
                } else {
                    setModal(false);
                    setPointerLockAllowed(true);
                }
                if (modal2Ref.current) {
                    setModal2(false);
                }
            }
            return;
        }
    };

    const qualityChange = (event) => {
        setBitrate(event.target.value);
    };
    const fpsChange = (event) => {
        setFps(event.target.value);
    };

    // const toggleKeyboard = () => {
    //     toggleOverlay();
    //     ToggleOnScreenKeyboard();
    // }
    const toggleGpad = () => {
        // console.log("1")
        toggleGpadOverlay();
        toggleOverlay();
    }
    const togglePosition = () => {
        toggleGpadPosition();
        toggleOverlay();
    }

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#05EBFB',
                light: '#6FFFFF',
                dark: '#00B8C8',
            },
            secondary: {
                main: '#DB19E5',
                light: '#FF59FF',
                dark: '#A500B2',
            },
            background: {
                default: '#1C1B1F',
                paper: '#2D2C31',
            },
            surface: {
                main: '#2D2C31',
                variant: '#49454F',
            },
        },
        shape: {
            borderRadius: 28,
        },
        typography: {
            fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: 20,
                        padding: '8px 16px',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(5, 235, 251, 0.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(5, 235, 251, 0.2)',
                        },
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            bgcolor: 'rgba(5, 235, 251, 0.1)',
                        },
                    },
                },
            },
        },
    });

    const [,setCookie, removeCookie] = useCookies([
        "isShutdownClicked",
        "isStreamConnected",
    ]);

    return (
        <ThemeProvider theme={theme}>
            <div>
                {
                    !loading ?
                        keyboardBased ?
                            <div style={{ zIndex: 0 }} className="absolute w-[5%] h-[5%] right-[2%] top-[3%] text-[#05EBFB] text-base font-bold z-99">
                                Press F9 for <SettingsIcon />
                                {
                                    planEndWarning ?
                                        <Typography variant="body2" color="error" sx={{
                                            backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            marginTop: '8px'
                                        }}>Your plan is about to end</Typography>
                                        : null
                                }
                            </div>
                            : <div style={{ zIndex: 99 }}>
                                <Stack direction="row" spacing={2} className="absolute left-[1%] top-[3%]">
                                    <IconButton
                                        onClick={() => { setKeyboardSelected(!KeyboardSelected); ToggleOnScreenKeyboard(); setGpadSelected(false); setPositionSelected(false) }}
                                        sx={{
                                            color: '#22B9A6',
                                            backgroundColor: 'rgba(34, 185, 166, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(34, 185, 166, 0.2)',
                                            },
                                        }}
                                    >
                                        <KeyboardIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => { setGpadSelected(false); setPositionSelected(false); ToggleOnScreenMouse() }}
                                        sx={{
                                            color: '#22B9A6',
                                            backgroundColor: 'rgba(34, 185, 166, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(34, 185, 166, 0.2)',
                                            },
                                        }}
                                    >
                                        <MouseIcon />
                                    </IconButton>
                                </Stack>
                                <Stack direction="row" spacing={2} className="absolute right-[2%] top-[3%]">
                                    <IconButton
                                        onClick={toggleOverlay}
                                        sx={{
                                            color: '#22B9A6',
                                            backgroundColor: 'rgba(34, 185, 166, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(34, 185, 166, 0.2)',
                                            },
                                        }}
                                    >
                                        <SettingsIcon />
                                    </IconButton>
                                    {
                                        planEndWarning ?
                                            <Typography variant="body2" color="error" sx={{
                                                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                            }}>Your plan is about to end</Typography>
                                            : null
                                    }
                                </Stack>
                            </div>
                        : null
                }
                <Modal open={modal}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: '95%',
                            sm: '90%',
                            md: '80%',
                            lg: '70%',
                        },
                        height: 'auto',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        maxWidth: 1000,
                        bgcolor: 'rgba(45, 44, 49, 0.7)',
                        borderRadius: '24px',
                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                        p: 2,
                        outline: 'none',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(5, 235, 251, 0.2)',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: -1,
                            left: -1,
                            right: -1,
                            bottom: -1,
                            borderRadius: '24px',
                            padding: '1px',
                            background: 'linear-gradient(45deg, rgba(5, 235, 251, 0.3), rgba(219, 25, 229, 0.3))',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        },
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}>
                        <Container maxWidth="lg" sx={{ px: 1 }}>
                            <Stack spacing={2}>
                                <Box sx={{ position: 'relative' }}>
                                    <IconButton
                                        onClick={() => {
                                            setModal(false);
                                            setPointerLockAllowed(true)
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            color: 'primary.main',
                                            backgroundColor: 'rgba(34, 185, 166, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(34, 185, 166, 0.2)',
                                            },
                                        }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <Paper elevation={5} sx={{
                                            p: 2,
                                            bgcolor: 'rgba(45, 44, 49, 0.85)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(5, 235, 251, 0.2)',
                                            backdropFilter: 'blur(8px)',
                                            '&:before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: -1,
                                                left: -1,
                                                right: -1,
                                                bottom: -1,
                                                borderRadius: '24px',
                                                padding: '1px',
                                                background: 'linear-gradient(45deg, rgba(5, 235, 251, 0.3), rgba(219, 25, 229, 0.3))',
                                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                WebkitMaskComposite: 'xor',
                                                maskComposite: 'exclude',
                                            }
                                        }}>
                                            <Typography variant="h6" gutterBottom color="white" sx={{ fontWeight: 500, fontSize: '1rem' }}>Stream Data</Typography>
                                            <Stack spacing={2}>
                                                <Box sx={{
                                                    p: 2,
                                                    bgcolor: 'rgba(73, 69, 79, 0.5)',
                                                    borderRadius: '20px',
                                                    backdropFilter: 'blur(8px)',
                                                    border: '1px solid rgba(5, 235, 251, 0.1)',
                                                }}>
                                                    <Typography variant="body2" color="white">Ping: {rtt} ms</Typography>
                                                </Box>
                                                <Box sx={{
                                                    p: 2,
                                                    bgcolor: 'rgba(73, 69, 79, 0.5)',
                                                    borderRadius: '20px',
                                                    backdropFilter: 'blur(8px)',
                                                    border: '1px solid rgba(5, 235, 251, 0.1)',
                                                }}>
                                                    <Typography variant="body2" color="white">Time Left: {timeLeft} minutes</Typography>
                                                </Box>
                                            </Stack>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Paper elevation={5} sx={{
                                            p: 2,
                                            bgcolor: 'rgba(45, 44, 49, 0.85)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(5, 235, 251, 0.2)',
                                            backdropFilter: 'blur(8px)',
                                            '&:before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: -1,
                                                left: -1,
                                                right: -1,
                                                bottom: -1,
                                                borderRadius: '24px',
                                                padding: '1px',
                                                background: 'linear-gradient(45deg, rgba(5, 235, 251, 0.3), rgba(219, 25, 229, 0.3))',
                                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                WebkitMaskComposite: 'xor',
                                                maskComposite: 'exclude',
                                            }
                                        }}>
                                            <Typography variant="h6" gutterBottom color="white" sx={{ fontWeight: 500, fontSize: '1rem' }}>Video Settings</Typography>
                                            <FormControl fullWidth>
                                                <FormLabel sx={{ color: 'white', mb: 2, fontSize: '0.875rem' }}>FPS</FormLabel>
                                                <RadioGroup
                                                    row
                                                    onChange={fpsChange}
                                                    value={FPS}
                                                    sx={{ color: 'white' }}
                                                >
                                                    {[30, 60, 120].map((fps) => (
                                                        <FormControlLabel
                                                            key={fps}
                                                            value={fps}
                                                            control={
                                                                <Radio
                                                                    size="small"
                                                                    sx={{
                                                                        color: 'white',
                                                                        '&.Mui-checked': {
                                                                            color: 'primary.main',
                                                                        },
                                                                    }}
                                                                />
                                                            }
                                                            label={`${fps} FPS`}
                                                            sx={{
                                                                bgcolor: FPS === fps ? 'rgba(34, 185, 166, 0.1)' : 'transparent',
                                                                borderRadius: '20px',
                                                                padding: '8px 16px',
                                                                margin: '0 8px',
                                                                fontSize: '0.875rem',
                                                            }}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Paper elevation={0} sx={{
                                            p: 2,
                                            bgcolor: 'rgba(45, 44, 49, 0.85)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(5, 235, 251, 0.2)',
                                            backdropFilter: 'blur(8px)',
                                            '&:before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: -1,
                                                left: -1,
                                                right: -1,
                                                bottom: -1,
                                                borderRadius: '24px',
                                                padding: '1px',
                                                background: 'linear-gradient(45deg, rgba(5, 235, 251, 0.3), rgba(219, 25, 229, 0.3))',
                                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                WebkitMaskComposite: 'xor',
                                                maskComposite: 'exclude',
                                            }
                                        }}>
                                            <Typography variant="h6" gutterBottom color="white" sx={{ fontWeight: 500, fontSize: '1rem' }}>Stream Quality</Typography>
                                            <Stack spacing={2}>
                                                <Select
                                                    fullWidth
                                                    size="small"
                                                    value={bitrate}
                                                    onChange={qualityChange}
                                                    sx={{
                                                        bgcolor: 'rgba(73, 69, 79, 0.5)',
                                                        borderRadius: '20px',
                                                        '& .MuiSelect-select': {
                                                            padding: '8px 16px',
                                                            fontSize: '0.875rem',
                                                        },
                                                        backdropFilter: 'blur(8px)',
                                                        border: '1px solid rgba(5, 235, 251, 0.1)',
                                                    }}
                                                >
                                                    <MenuItem value={2000}>Low</MenuItem>
                                                    <MenuItem value={6000}>Medium</MenuItem>
                                                    <MenuItem value={12000}>High</MenuItem>
                                                    {bitrate !== 2000 && bitrate !== 6000 && bitrate !== 12000
                                                        ? <MenuItem value={bitrate}>{bitrate}</MenuItem>
                                                        : null}
                                                </Select>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={toggleOverlay2}
                                                    sx={{
                                                        color: 'primary.main',
                                                        borderColor: 'primary.main',
                                                        borderRadius: '20px',
                                                        fontSize: '0.875rem',
                                                        padding: '8px 16px',
                                                        '&:hover': {
                                                            borderColor: 'primary.main',
                                                            bgcolor: 'rgba(34, 185, 166, 0.1)',
                                                        },
                                                    }}
                                                >
                                                    Advanced Settings
                                                </Button>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<PowerSettingsNewIcon />}
                                        onClick={() => {
                                            setStartStream(false)
                                            if (touchAllowed) window.Android.showMessageInNative('ended')
                                            if (game === "desktop") {
                                                const currentTime = new Date().getTime();
                                                setCookie("isShutdownClicked", currentTime.toString(), {
                                                    path: "/",
                                                });
                                            }
                                            removeCookie("isStreamConnected", { path: "/" });
                                        }}
                                        sx={{
                                            color: 'primary.main',
                                            borderColor: 'primary.main',
                                            borderRadius: '20px',
                                            fontSize: '0.875rem',
                                            padding: '8px 16px',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: 'rgba(34, 185, 166, 0.1)',
                                            },
                                        }}
                                    >
                                        Shut Down PC
                                    </Button>

                                    {admin && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={toggleControls}
                                            sx={{
                                                color: 'primary.main',
                                                borderColor: 'primary.main',
                                                borderRadius: '20px',
                                                fontSize: '0.875rem',
                                                padding: '8px 16px',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    bgcolor: 'rgba(34, 185, 166, 0.1)',
                                                },
                                            }}
                                        >
                                            Toggle Controls
                                        </Button>
                                    )}

                                    {touchAllowed && (
                                        <>
                                            <ToggleButton
                                                value="gamepad"
                                                selected={GpadSelected}
                                                size="small"
                                                onChange={() => {
                                                    if (!PositionSelected) {
                                                        toggleGpad()
                                                        setGpadSelected(!GpadSelected);
                                                        setPositionSelected(false)
                                                        setKeyboardSelected(false)
                                                    }
                                                }}
                                                sx={{
                                                    color: 'primary.main',
                                                    borderColor: 'primary.main',
                                                    borderRadius: '20px',
                                                    fontSize: '0.875rem',
                                                    padding: '8px 16px',
                                                    '&.Mui-selected': {
                                                        bgcolor: 'rgba(34, 185, 166, 0.1)',
                                                        color: 'primary.main',
                                                    },
                                                }}
                                            >
                                                <Stack direction="column" alignItems="center" spacing={1}>
                                                    <SportsEsportsIcon sx={{ fontSize: '1.25rem' }} />
                                                    <Typography variant="caption">Gamepad</Typography>
                                                </Stack>
                                            </ToggleButton>

                                            <ToggleButton
                                                value="layout"
                                                selected={PositionSelected}
                                                size="small"
                                                onChange={() => {
                                                    if (PositionSelected) {
                                                        togglePosition()
                                                        setPositionSelected(!PositionSelected);
                                                        setGpadSelected(true)
                                                    } else {
                                                        togglePosition()
                                                        setPositionSelected(!PositionSelected);
                                                        setGpadSelected(false)
                                                        setKeyboardSelected(false)
                                                    }
                                                }}
                                                sx={{
                                                    color: 'primary.main',
                                                    borderColor: 'primary.main',
                                                    borderRadius: '20px',
                                                    fontSize: '0.875rem',
                                                    padding: '8px 16px',
                                                    '&.Mui-selected': {
                                                        bgcolor: 'rgba(34, 185, 166, 0.1)',
                                                        color: 'primary.main',
                                                    },
                                                }}
                                            >
                                                <Stack direction="column" alignItems="center" spacing={1}>
                                                    <GamepadIcon sx={{ fontSize: '1.25rem' }} />
                                                    <Typography variant="caption">Edit Layout</Typography>
                                                </Stack>
                                            </ToggleButton>
                                        </>
                                    )}
                                </Stack>

                                {!touchAllowed && (
                                    <Typography
                                        variant="caption"
                                        color="primary.main"
                                        sx={{
                                            position: 'absolute',
                                            bottom: '2%',
                                            right: '-2rem',
                                            transform: 'translateX(-50%)',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            transition: 'color 0.3s ease-in-out',
                                            textAlign: 'center',
                                        }}
                                    >
                                        F10 : Toggle FullScreen
                                        <br /> F8 : toggle Pointer Lock
                                    </Typography>
                                )}
                            </Stack>
                        </Container>
                    </Box>
                </Modal>

                <Modal open={modal2}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: '95%',
                            sm: '90%',
                            md: '80%',
                            lg: '70%',
                        },
                        height: 'auto',
                        maxHeight: {
                            xs: '90vh',
                            sm: '85vh',
                            md: '80vh',
                        },
                        overflowY: 'auto',
                        maxWidth: 1200,
                        bgcolor: 'rgba(45, 44, 49, 0.9)',
                        borderRadius: {
                            xs: '16px',
                            sm: '20px',
                            md: '28px',
                        },
                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                        p: {
                            xs: 2,
                            sm: 3,
                            md: 4,
                        },
                        outline: 'none',
                        backdropFilter: 'blur(5px)',
                    }}>
                        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                            <Stack spacing={{ xs: 2, sm: 3, md: 4 }}>
                                <Box sx={{ position: 'relative' }}>
                                    <IconButton
                                        onClick={toggleOverlay2}
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            color: 'primary.main',
                                            backgroundColor: 'rgba(34, 185, 166, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(34, 185, 166, 0.2)',
                                            },
                                        }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Box>

                                <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} direction="row" sx={{ justifyContent: "Center" }} >
                                    {Object.entries(qualities).map(([mode, values]) => (
                                        <Grid item xs={12} md={4} key={mode}>
                                            <Paper elevation={5} sx={{
                                                p: { xs: 2, sm: 2.5, md: 3 },
                                                bgcolor: 'surface.main',
                                                borderRadius: { xs: '20px', md: '28px' },
                                                border: '1px solid rgba(34, 185, 166, 0.2)',
                                                backdropFilter: 'blur(5px)',
                                            }}>
                                                <Typography variant="h6" gutterBottom color="white" sx={{ fontWeight: 500 }}>
                                                    {mode === 'gareeb' ? 'Data Saving Mode' :
                                                        mode === 'middleClass' ? 'Performance Mode' :
                                                            'Quality Mode'}
                                                </Typography>
                                                <Stack spacing={1}>
                                                    {values.map((quality) => (
                                                        <Button
                                                            key={quality}
                                                            variant="text"
                                                            onClick={() => setBitrate(quality)}
                                                            sx={{
                                                                color: bitrate === quality ? 'primary.main' : 'white',
                                                                justifyContent: 'flex-start',
                                                                borderRadius: '20px',
                                                                padding: '12px 16px',
                                                                '&:hover': {
                                                                    bgcolor: 'rgba(34, 185, 166, 0.1)',
                                                                },
                                                            }}
                                                        >
                                                            {quality} Kbps
                                                        </Button>
                                                    ))}
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                        </Container>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}

export default Settings;