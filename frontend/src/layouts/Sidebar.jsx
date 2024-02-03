import {
  BsArrowLeftSquare,
  BsBook,
  BsBookHalf,
  BsHouse,
  BsPeople,
  BsPerson,
  BsPersonAdd,
  BsPersonUp,
  BsPersonVcard,
} from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import { Image, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Sidebar = ({ isDesktopOrTablet, Toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="mb-2">
      <div
        onClick={Toggle}
        className="d-flex d-block d-sm-none justify-content-end mt-2"
      >
        <CgClose className="fs-4 close-button" />
      </div>
      <div className="d-flex flex-column">
        <Image src="../../logo.png" width={50} className="mx-auto my-2" />
        <span className="brand-name fs-4 mx-auto">Student</span>
        <span className="brand-name fs-4 mx-auto">Management</span>
      </div>

      <hr className="text-dark" />

      <Nav className="list-group list-group-flush">
        <NavLink
          to="/"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item mb-2 py-2 d-flex align-items-center rounded"
        >
          <BsPersonVcard className="fs-4 me-2" />
          <span>Students Record</span>
        </NavLink>
        <NavLink
          to="/students"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item mb-2 py-2 d-flex align-items-center rounded"
        >
          <BsPerson className="fs-4 me-2" />
          <span>Students</span>
        </NavLink>
        <NavLink
          to="/teachers"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item mb-2 py-2 d-flex align-items-center rounded"
        >
          <BsPeople className="fs-4 me-2" />
          <span>Teachers</span>
        </NavLink>
        <NavLink
          to="/classrooms"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item mb-2 py-2 d-flex align-items-center rounded"
        >
          <BsHouse className="fs-4 me-2" />
          <span>Classrooms</span>
        </NavLink>
        <NavLink
          to="/subjects"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item mb-2 py-2 d-flex align-items-center rounded"
        >
          <BsBook className="fs-4 me-2" />
          <span>Subjects</span>
        </NavLink>
        <NavLink
          to="/allocated-teachers"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item mb-2 py-2 d-flex align-items-center rounded"
        >
          <BsPersonUp className="fs-4 me-2" />
          <span>Allocated Teachers</span>
        </NavLink>
        <NavLink
          to="/allocated-subjects"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item mb-2 py-2 d-flex align-items-center rounded"
        >
          <BsBookHalf className="fs-4 me-2" />
          <span>Allocated Subjects</span>
        </NavLink>
        <NavLink
          to="/users"
          onClick={!isDesktopOrTablet && Toggle}
          className="list-group-item py-2 d-flex align-items-center rounded"
        >
          <BsPersonAdd className="fs-4 me-2" />
          <span>Users</span>
        </NavLink>
      </Nav>

      <hr className="text-dark" />

      <Nav className="list-group list-group-flush logout">
        <Nav.Link
          onClick={onLogout}
          className="list-group-item py-2 d-flex align-items-center rounded text-danger"
        >
          <BsArrowLeftSquare className="fs-4 me-2" />
          <span>Logout</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
