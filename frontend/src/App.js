import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./components/InitialPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<HomePage />} path="/home" exact></Route>
          </Route>
          <Route element={<InitialPage />} path="/"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<SignIn />} path="/signin"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
