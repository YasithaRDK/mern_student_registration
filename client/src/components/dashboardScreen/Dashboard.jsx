import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../../pages/Home";
import Student from "../../pages/Student";
import Register from "../../pages/Register";
import { Container } from "react-bootstrap";
import Profile from "../../pages/Profile";
import Classroom from "../../pages/Classroom";
import Teacher from "../../pages/Teacher";
import Subject from "../../pages/Subject";
import AllocateClassroom from "../../pages/AllocateClassroom";
import AllocateTeacher from "../../pages/AllocateTeacher";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <Container fluid>
        <Container className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/allocate-classroom" element={<AllocateClassroom />} />
            <Route path="/allocate-subject" element={<AllocateTeacher />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Container>
    </div>
  );
};

export default Dashboard;
