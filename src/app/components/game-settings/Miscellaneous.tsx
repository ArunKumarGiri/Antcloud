import FormInput from "@/app/components/form-Input/formInput";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from "react-router-dom";

interface Credential {
    username: string;
    password: string;
}

interface Credentials {
    Steam: Credential[];
    Rockstar: Credential[];
    Epic: Credential[];
    EA: Credential[];
    Ubisoft: Credential[];
}

function Miscellaneous() {
    // const [region, setRegion] = useState<string>();
    const [res, setRes] = useState("1080");
    const [mode, setMode] = useState("performance");
    // const [idToken, setIdToken] = useState<string>();
    // const [closeWarning, setCloseWarning] = useState(true);
    const credentials: Credentials = {
        Steam: [{ username: "", password: "" }],
        Rockstar: [{ username: "", password: "" }],
        Epic: [{ username: "", password: "" }],
        EA: [{ username: "", password: "" }],
        Ubisoft: [{ username: "", password: "" }]
    };
    const [store, setStore] = useState("");

    // const handleChange = ({ name, value }: { name: string; value: string }) => {
    //     // This function is no longer used
    // };

    // const linkTv = async () => {
    //   var linkTvCode = firebase.functions().httpsCallable("createCustomIdToken");
    //   const { data } = await linkTvCode({ uid: auth.uid, tvCode: code });
    //   console.log(data);
    // };

    // useEffect(() => {
    //   firebase
    //     .auth()
    //     .currentUser.getIdToken(true)
    //     .then((idToken) => {
    //       setIdToken(idToken)
    //       if ((profile.res == '1440' || profile.res == '2160') && profile.plan != 'premium' && profile.plan != 'unlimited' && profile.plan != 'extreme') {
    //         setCloseWarning(false);
    //         firebase.updateProfile({ res: '1080' })
    //       }
    //       if (localStorage) {
    //         if (localStorage._tgpCreds) {
    //           let json = JSON.stringify({
    //             idToken,
    //             text: localStorage._tgpCreds
    //           });
    //           fetch('/api/decryptData', {
    //             method: "POST",
    //             body: json,
    //           })
    //           .then((res) => res.json())
    //           .then((response) => {
    //             let creds = JSON.parse(response.result);
    //             if (!creds.Rockstar) creds.Rockstar = [{username: "", password: ""}];
    //             setCredentials(creds);
    //           })
    //         }
    //       }
    //       if(!profile.mode) {
    //         firebase.updateProfile({ mode: 'performance' })
    //       }
    //     });
    // }, []);

    // useEffect(() => {
    //   if (idToken) {
    //     if (region) {
    //       firebase.updateProfile({ region });
    //     }
    //   }
    // }, [region]);

    // useEffect(() => {
    //   if (idToken) {
    //     if (res) {
    //       firebase.updateProfile({ res });
    //     }
    //   }
    // }, [res]);

    // useEffect(() => {
    //   if (idToken) {
    //     if (mode) {
    //       firebase.updateProfile({ mode });
    //     }
    //   }
    // }, [mode]);

    // const onSelectRegion = (event) => {
    //   setRegion(event.target.value);
    // };

    // const onSelectRes = (event) => {
    //   setRes(event.target.value);
    //   setCloseWarning(true);
    // };

    // const onSelectMode = (event) => {
    //   setMode(event.target.value);
    //   // setCloseWarning(true);
    // };

    // const onCloseWarning = () => {
    //   setCloseWarning(false);
    // }

    // const encryptAndStore = (changedCreds) => {
    //   let json = JSON.stringify({
    //     idToken,
    //     text: JSON.stringify(changedCreds)
    //   });
    //   fetch('/api/encryptData', {
    //     method: "POST",
    //     body: json,
    //   })
    //   .then((res) => res.json())
    //   .then((response) => {
    //     localStorage.setItem("_tgpCreds", response.result)
    //   })
    // }

    // const onNewCreds = (event) => {
    //   let changedCreds = {...credentials};
    //   changedCreds[event.target.name].push({username: '', password: ''})
    //   setCredentials(changedCreds);
    //   encryptAndStore(changedCreds);
    // }

    // const onRemoveCreds = (event) => {
    //   let changedCreds = {...credentials};
    //   let details = event.target.name.split('/');
    //   changedCreds[details[0]].splice(details[1], 1)
    //   setCredentials(changedCreds);
    //   encryptAndStore(changedCreds);
    // }

    // const onShowCreds = (event) => {
    //   setStore(event.target.value);
    // }

    // const handleCredChange = ({name, value}) => {
    //   let details = name.split('/');
    //   if (value.length <= 30) {
    //     let changedCreds = {...credentials};
    //     changedCreds[details[0]][details[1]][details[2]] = value;
    //     setCredentials(changedCreds);
    //   }
    // };

    // const onUpdateCreds = () => {
    //   encryptAndStore(credentials);
    //   toast.success("Credentials Stored");
    // }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Update Game Preferences</h3>

            <div className="space-y-4">
                <p className="text-gray-600 capitalize">Current Stream Mode: Performance</p>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    name="mode"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#05EBFB] focus:ring-1 focus:ring-[#05EBFB]"
                >
                    <option value="performance">Performance</option>
                    <option value="quality">Quality</option>
                </select>

                <p className="text-gray-600">Current Video Resolution: 1080p</p>
                <select
                    value={res}
                    onChange={(e) => setRes(e.target.value)}
                    name="res"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#05EBFB] focus:ring-1 focus:ring-[#05EBFB]"
                >
                    <option value="2160" disabled>4K</option>
                    <option value="1440" disabled>2K</option>
                    <option value="1080">1080p</option>
                    <option value="720">720p</option>
                </select>

                <p className="text-[#db4bc3]">
                    We highly recommend a broadband speed of 150 Mbps or more for 4K/2K video quality
                </p>

                {(res === '1440' || res === '2160') && (
                    <Alert severity="info" className="mb-4">
                        <AlertTitle>Warning</AlertTitle>
                        Please ensure your ping is <strong>less than 10 ms</strong> for 4K/2K!<br />
                        2K/4K quality is only available in the <strong>Mumbai</strong> region.
                    </Alert>
                )}

                <div className="space-y-4">
                    <p className="text-gray-600">Stored Credentials</p>
                    <select
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        name="credential"
                        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#05EBFB] focus:ring-1 focus:ring-[#05EBFB]"
                    >
                        <option value="" disabled>Select a Store</option>
                        <option value="Epic">Epic</option>
                        <option value="Steam">Steam</option>
                        <option value="EA">EA</option>
                        <option value="Ubisoft">Ubisoft</option>
                        <option value="Rockstar">Rockstar</option>
                    </select>

                    {store && (
                        <div className="space-y-6">
                            {credentials[store as keyof Credentials].map((cred, index) => (
                                <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-gray-700">Credential {index + 1}</p>
                                    <FormInput
                                        name={`${store}/${index}/username`}
                                        label="Username"
                                        type="text"
                                        placeholder="Username"
                                        value={cred.username}
                                        maxLength={30}
                                        valueChange={() => { }}
                                    />
                                    <FormInput
                                        name={`${store}/${index}/password`}
                                        label="Password"
                                        type="password"
                                        placeholder="Password"
                                        value={cred.password}
                                        maxLength={20}
                                        valueChange={() => { }}
                                    />
                                    <div className="flex gap-4">
                                        <button
                                            className="px-4 py-2 text-white bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!cred.username || !cred.password}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="px-4 py-2 text-white bg-gradient-to-r from-[#DB19E5] to-[#05EBFB] rounded-lg hover:opacity-90"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-lg hover:opacity-90"
                            >
                                Add Another
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-[#db4bc3]">
                    You can now store your credentials locally in the browser for easily inputting them into the stream.
                </p>

                <Link
                    to="/mapping"
                    className="block w-full px-6 py-3 text-center text-white bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-lg hover:opacity-90 transition-opacity"
                >
                    Change your keyboard/gamepad mapping here
                </Link>
            </div>
        </div>
    );
}

export default Miscellaneous;