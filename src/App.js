import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <main>
      <Navigation />
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
