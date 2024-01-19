import { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

const Teacher = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
  });

  const { firstName, lastName, contactNo, email } = formData;

  return (
    <>
      <Container className="mt-2  form-container">
        <Container fluid>
          <h2 className="mb-3">Add student</h2>
          <Form>
            <Row>
              <Col md="6">
                <Form.Group as={Row}>
                  <Form.Label column lg="4">
                    First Name
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      value={firstName}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group as={Row}>
                  <Form.Label column lg="4">
                    Last Name
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                      value={lastName}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col md="6" className="mt-md-4">
                <Form.Group as={Row}>
                  <Form.Label column lg="4">
                    Contact Number
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      type="text"
                      placeholder="Enter contact number"
                      name="contactNo"
                      value={contactNo}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col md="6" className="mt-md-4">
                <Form.Group as={Row}>
                  <Form.Label column lg="4">
                    Email address
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-2">
              Login
            </Button>
          </Form>
        </Container>
      </Container>

      <Container className="mt-5  form-container">
        <Container fluid>
          <h2 className="mb-3">Student Details</h2>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </Container>
    </>
  );
};

export default Teacher;
