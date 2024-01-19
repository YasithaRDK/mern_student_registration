import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.auth);

  if (user.userRole !== "admin") {
    return <Navigate to="/" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container className="mt-2  form-container">
      <Container fluid>
        <h2 className="mb-3">Register User</h2>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={handleLogin}
            className="mt-2"
          >
            Register
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default Register;
