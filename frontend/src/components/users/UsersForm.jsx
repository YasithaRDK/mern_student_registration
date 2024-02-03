import { Button, Col, Form, Row } from "react-bootstrap";

const UsersForm = () => {
  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Register User</h4>
            <Form>
              <Row>
                <Form.Group as={Col} lg={6} controlId="username">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="email" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    required
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  lg={6}
                  controlId="password"
                  className="mb-2"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    required
                  />
                </Form.Group>
              </Row>

              <Button
                variant="primary"
                className="mt-2 mt-md-0 mx-auto mx-md-0 d-block"
                type="submit"
              >
                Add
              </Button>
            </Form>
          </>
        </Col>
      </Row>
    </>
  );
};

export default UsersForm;
