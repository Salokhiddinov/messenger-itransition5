import BaseCard from "../components/BaseCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
function SendMessage() {
  const inputMessage = useRef();
  const inputTitle = useRef();
  let inputReciever = useRef();
  const [hints, setHints] = useState([]);
  const [search, setSearch] = useState([]);
  const [showHints, setShowHints] = useState(false);

  async function loadHints(e) {
    try {
      let tempArr = [];
      const res = await axios.get("/api/usernames");
      for (let i = 0; i < res.data.length; i++) {
        let data = {
          id: i,
          reciever: res.data[i],
        };
        tempArr.push(data);
      }
      setHints(tempArr);
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  }
  function searchReciever() {
    let tempArr = [];
    for (let i = 0; i < hints.length; i++) {
      if (hints[i].reciever.includes(inputReciever.current.value)) {
        tempArr.push(hints[i]);
      }
    }
    setSearch(tempArr);
  }
  function setReciever(value) {
    inputReciever.current.value = value;
    setShowHints(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredMessage = inputMessage.current.value;
    const enteredTitle = inputTitle.current.value;
    const enteredReciever = inputReciever.current.value;

    if (
      enteredMessage.trim() === "" ||
      enteredTitle.trim() === "" ||
      enteredReciever.trim() === ""
    ) {
      alert("Fields cannot be empty! Please, check your inputs");
      return false;
    }
    const user = localStorage.getItem("username");
    try {
      const postData = {
        sender: user,
        reciever: enteredReciever,
        title: enteredTitle,
        content: enteredMessage,
      };
      axios.post("/api/send-message", postData);
      alert("Message sent");
    } catch {
      alert("Please check your username and password");
      return false;
    }
    inputMessage.current.value = "";
    inputTitle.current.value = "";
    inputReciever = "";
  };
  console.log(hints);

  useEffect(() => {
    loadHints();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <form className="form-message">
        <BaseCard>
          <h2>Send Message</h2>
          <div className="form-group">
            <label htmlFor="message" className="label">
              Reciever
            </label>
            <input
              ref={inputReciever}
              className="form-control"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setShowHints(true);
                  searchReciever();
                }
              }}
            />
            {showHints && (
              <ul className="list-group">
                {search.map((s) => (
                  <li
                    key={s.id}
                    className="list-group-item"
                    onClick={() => setReciever(s.reciever)}
                  >
                    {s.reciever}
                  </li>
                ))}
              </ul>
            )}
            <div className="list-group"></div>
            <label htmlFor="message" className="label">
              Title
            </label>
            <input ref={inputTitle} className="form-control" />
            <label htmlFor="message" className="label">
              Message
            </label>
            <textarea className="form-control" ref={inputMessage} />
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>
            Send🚀
          </button>
        </BaseCard>
      </form>
    </div>
  );
}

export default SendMessage;
