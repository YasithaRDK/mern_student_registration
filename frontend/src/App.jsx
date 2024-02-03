import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classrooms from "./pages/Classrooms";
import Subjects from "./pages/Subjects";
import AllocatedTeachers from "./pages/AllocatedTeachers";
import AllocatedSubjects from "./pages/AllocatedSubjects";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classrooms" element={<Classrooms />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/allocated-teachers" element={<AllocatedTeachers />} />
            <Route path="/allocated-subjects" element={<AllocatedSubjects />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
