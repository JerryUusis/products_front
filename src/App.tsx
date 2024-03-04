import GetAll from "./routes/GetAll";
import Home from "./routes/Home";
import GetProduct from "./routes/GetProduct";
import InsertProduct from "./routes/InsertProduct";
import UpdateProduct from "./routes/UpdateProduct";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getall" element={<GetAll />} />
        <Route path="/getproduct" element={<GetProduct />} />
        <Route path="/insertproduct" element={<InsertProduct />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
