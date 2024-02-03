import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { BsJustify, BsJustifyLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = ({ Toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = async () => {
    await dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={Toggle} className="fs-4 toggle">
          <BsJustifyLeft />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="fs-4 toggle">
          <BsJustify />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={user?.name} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout} className="text-danger">
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
