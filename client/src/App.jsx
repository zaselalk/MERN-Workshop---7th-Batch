import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/Home";
import { Student } from "./pages/Student";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:student_id" element={<Student />} />
    </Routes>
  );
}

export default App;
