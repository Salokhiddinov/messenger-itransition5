import BaseCard from "../components/BaseCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
function SendMessage() {
  const inputMessage = useRef();
  const inputTitle = useRef();
  let inputReciever = useRef();
  const [hints, setHints] = useState([]);
  const [showHints, setShowHints] = useState(false);
  let temp = 0;

  async function loadHints(e) {
    e.preventDefault();
    setShowHints(true);
    try {
      let tempArr = [];
      console.log("tempArr" + tempArr);

      const res = await axios.get("/api/usernames");
      console.log("res" + res);

      for (let i = 0; i < res.data.length; i++) {
        let data = {
          id: i,
          reciever: res.data[i],
        };
        tempArr.push(data);
      }
      setHints(tempArr);
      // hints(true);
      temp++;
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
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
      enteredMessage.trim === "" ||
      enteredTitle.trim === "" ||
      enteredReciever.trim === ""
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
    setShowHints(false);
    inputMessage.current.value = "";
    inputTitle.current.value = "";
    inputReciever = "";
  };
  function toggleHints() {
    setShowHints(!showHints);
  }
  useEffect(() => {
    loadHints();
    // eslint-disable-next-line
  }, [temp]);
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
              onChange={loadHints}
              // onClick={() => setShowHints(true)}
            />
            {!showHints ? (
              <button onClick={toggleHints} className="btn btn-secondary">
                Show Hints 👇
              </button>
            ) : null}
            {showHints ? (
              <button onClick={toggleHints} className="btn btn-secondary">
                Hide Hints 🔙
              </button>
            ) : null}
            {showHints ? (
              <ul lcassName="list-group">
                {hints.map((hint) => (
                  <li
                    key={hint.id}
                    className="list-group-item"
                    onClick={() => setReciever(hint.reciever)}
                  >
                    {hint.reciever}
                  </li>
                ))}
              </ul>
            ) : null}
            {/* <div className="search_select_box">
              <select className='form-select' >
              <option defaultValue="selected" disabled>Select User</option>
                {hints.map((hint) => (
                  <option
                    key={hint.id}
                    onSelect={() => setReciever(hint.reciever)}
                    value={hint.reciever}
                  >
                    {hint.reciever}
                  </option>
                ))}
              </select>
            </div> */}

            {/* {showHints ? hints.map((hint) => (
                <li key={hint.id} onClick={() => setReciever(hint.reciever)}>{hint.reciever}</li>
              )): null} */}
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
