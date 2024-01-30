import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import Editor from "../components/Editor";

function EditorPage() {
  const location = useLocation();
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();
  const { roomId } = useParams();

  const [clientsList, setClientsList] = useState([]);
  const [isAsidePopupVisible, setAsidePopupVisible] = useState(false);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connections failed, try again later");
        reactNavigator("/");
      }

      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
        }
        setClientsList(clients);

        socketRef.current.emit("sync-text", {});
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        if (username !== undefined) {
          toast.success(`${username} left the room`);
        }
        setClientsList((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("joined");
        socketRef.current.off("disconnected");
        socketRef.current.disconnect();
      }
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("copied");
    } catch (error) {
      toast.error("Could not copy room id");
      console.log(error);
    }
  };

  const leaveRoom = () => {
    reactNavigator("/");
    toast.success("Disconnected");
  };

  const toggleAsidePopup = () => {
    setAsidePopupVisible(!isAsidePopupVisible);
  };

  return (
    <>
      <div className="mainWrap">
        <div className="editorWrap">
          <Editor />
        </div>
        <div className="aside">
        <button className="btn showAsidePopup" onClick={toggleAsidePopup}>
            CONTRIBUTER
          </button>
       
          {isAsidePopupVisible && (
            <div className="asidePopup">
                 <div className="asideInner">
            <h4>Connected :</h4>
            <div className="clientsList">
              {clientsList.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>
          <button className="btn copyBtn" onClick={copyRoomId}>
            ROOMID
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            LEAVE
          </button>
         
            
              <button className="btn leaveBtn" onClick={toggleAsidePopup}>Close</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditorPage;
