import { ZoomMtg } from "@zoomus/websdk";
import { decrypt } from "./crypto.js";
console.log("checkSystemRequirements");
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
$.i18n.reload("ko-KO");

const startMeeting = () => {
  var params = {};

  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (str, key, value) => (params[key] = decrypt(value))
  );
  console.log(params);
  zoomMtgInit(params);
};

const zoomMtgInit = meetingConfig => {
  ZoomMtg.init({
    leaveUrl: `https://localhost:9999/close.html`,
    screenShare: false,
    success: res => {
      console.log("init success");
      $.i18n.reload("ko-KO");
      zoomMtgJoin(meetingConfig);
    },
    error: res => {
      console.log(res);
    }
  });
};

const zoomMtgJoin = meetingConfig => {
  ZoomMtg.join({
    meetingNumber: meetingConfig.meetingNumber,
    userName: meetingConfig.userName,
    signature: meetingConfig.signature,
    apiKey: meetingConfig.apiKey,
    passWord: meetingConfig.passWord, //option
    success: res => {
      console.log("joinSuccess res");
      window.addEventListener("beforeunload", () => {
        ZoomMtg.leaveMeeting({});
        window.close();
      });
    },
    error: res => {
      console.log(res);
    }
  });
};

startMeeting();
