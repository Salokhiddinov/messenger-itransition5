import axios from "../plugins/axios";
import BaseCard from "../components/BaseCard";
import { useRef } from "react";

function Login() {
  const inputUsername = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredUsername = inputUsername.current.value;
    if (enteredUsername.trim().length === 0) {
      alert("Please enter username.");
      return false;
    }
    const loginData = {
      username: enteredUsername,
    };
    try {
      await axios.post("/api/login", loginData);
      localStorage.setItem("username", enteredUsername);
      window.location.href = "/messages";
    } catch (err) {
      alert(err);
      console.log(err);
      alert("Please check your username and password");
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <BaseCard className="form-card">
        <h1>Log In</h1>
        <div className="mb-3">
          <label htmlFor="email" className="label">
            Please enter your username:
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="your-username"
            ref={inputUsername}
            required
          />
        </div>
        <div>
          <button className="btn btn-success" type="submit" to="/">
            Submit
          </button>
        </div>
      </BaseCard>
    </form>
  );
}
export default Login;
