import SendMessage from "../components/SendMessage";
import Message from "../components/Message";
import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "../plugins/axios";

let refreshVar = 0;

function Messages() {
  const currentUsername = localStorage.getItem("username");
  const [recievedMesages, setData] = useState([]);
  async function getMessages() {
    try {
      let tempArr = [];
      const res = await axios.get(`/api/messages/${currentUsername}`);
      for (let i = 0; i < res.data.length; i++) {
        tempArr.unshift(res.data[i]);
      }
      setData(tempArr)
      refreshVar++
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [refreshVar]);
  
  return (
    <div>
      <Link to="/" className="btn btn-danger">Log out 🔙</Link>
      <SendMessage />
      {recievedMesages.map((message) => {
        return (
          <Message
            key={message._id}
            sender={message.sender}
            reciever={message.reciever}
            title={message.title}
            content={message.content}
          />
        );
      })}
    </div>
  );
}

export default Messages;
