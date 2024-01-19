import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = async () => {
    await dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Navbar expand="lg" className="header">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          Student Register
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto headerNav">
            <Nav.Link as={NavLink} to="/">
              Student Record
            </Nav.Link>
            <Nav.Link as={NavLink} to="/student">
              Student
            </Nav.Link>
            <Nav.Link as={NavLink} to="/teacher">
              Teacher
            </Nav.Link>
            <Nav.Link as={NavLink} to="/classroom">
              Classroom
            </Nav.Link>
            <Nav.Link as={NavLink} to="/subject">
              Subject
            </Nav.Link>
            <Nav.Link as={NavLink} to="/allocate-classroom">
              Allocate Classroom
            </Nav.Link>
            <Nav.Link as={NavLink} to="/allocate-subject">
              Allocate Subject
            </Nav.Link>
            {user.userRole === "admin" ? (
              <Nav.Link as={NavLink} to="/register">
                Register User
              </Nav.Link>
            ) : (
              " "
            )}
            <Nav.Link as={NavLink} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
