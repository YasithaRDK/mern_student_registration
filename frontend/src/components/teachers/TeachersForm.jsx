import { Button, Col, Form, Row } from "react-bootstrap";

const TeachersForm = () => {
  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Add Teacher</h4>
            <Form>
              <Row>
                <Form.Group as={Col} lg={6} controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  lg={6}
                  controlId="lastName"
                  className="mb-2"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="firstName"
                    required
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  lg={6}
                  controlId="contactNo"
                  className="mb-2"
                >
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter contact number"
                    name="contactNo"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="email" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    name="email"
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

export default TeachersForm;
