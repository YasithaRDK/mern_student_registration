import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { Container, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      const capitalizedRole =
        user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1);
      toast.success(`Welcome, ${user.name}(${capitalizedRole})!`);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, email, dispatch]);

  if (isSuccess || user) {
    return <Navigate to="/" />;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  return (
    <Container className="mt-5  login-container">
      <h2 className="mb-3 text-center">Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          Login
        </Button>
        {isLoading ? <Loader /> : ""}
      </Form>
    </Container>
  );
};

export default Login;
