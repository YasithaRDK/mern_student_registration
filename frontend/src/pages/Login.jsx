import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsArrowRightSquare } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Loader from "../components/Loader";

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

    dispatch(reset());
  }, [user, isError, message, dispatch]);

  if (isSuccess || user) {
    return <Navigate to="/" />;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          xs={11}
          md={9}
          lg={6}
          className="bg-white mt-5 p-5 rounded shadow-md"
        >
          <>
            <h1 className="mb-4 d-flex align-items-center justify-content-center">
              <BsArrowRightSquare className="me-2" /> LOGIN
            </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mx-auto d-block"
              >
                Login
              </Button>
            </Form>
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
