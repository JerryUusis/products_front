import GetAll from "./routes/GetAll";
import Home from "./routes/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getall" element={<GetAll />} />
      </Routes>
    </Router>
  );
}

export default App;
