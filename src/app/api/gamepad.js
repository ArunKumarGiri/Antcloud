import axios from "axios";
import { toast } from "react-toastify";

export const saveGamePadMapping = (userToken, data) => {
  
  const loadingToast =  toast.loading('Loading');
  // const url = 'http://localhost:8000/api';
  const url = 'https://api.antcloud.co/api';
  axios
    .post(
      `${url}/users/savecontrollermapping`,
      {
        gamepads: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${userToken}`,
        },
      }
    )
    .then((e) => {
      if(e.status == 200) {
        toast.dismiss(loadingToast)
        toast.success("Mapping Saved!")
      }
      // console.log(e);
    })
    .catch((e) => {
      toast.dismiss(loadingToast)
      toast.error("Failed to save mapping!")
      console.log(e);
    });
};
export const getGamePadMapping = (userToken, gamePadFetched, onFailure) => {
  // const url = `${process.env.REACT_APP_API_KEY}/api`;
  // const url = 'http://localhost:8000/api';
  const url = 'https://api.antcloud.co/api'
  axios
    .get(
      `${url}/users/getgamepads`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${userToken}`,
        },
      }
    )
    .then((e) => {
      gamePadFetched(e.data)
      // console.log(e);
    })
    .catch((e) => {
      onFailure();
      console.log(e);
    });
};
