import { Col, Form, Row, Table } from "react-bootstrap";

const Home = () => {
  return (
    <div className="px-3">
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Student Details</h4>
            <Form>
              <Row>
                <Form.Group as={Col} lg={6} controlId="student">
                  <Form.Label>Student</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter student"
                    name="student"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="classroom">
                  <Form.Label>Classroom</Form.Label>
                  <Form.Control
                    type="text"
                    name="classroom"
                    required
                    disabled
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} lg={6} controlId="contactPerson">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact person"
                    name="contactPerson"
                    required
                    disabled
                  />
                </Form.Group>

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
                    disabled
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} lg={6} controlId="email" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="birthDay">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" name="birthDay" required disabled />
                </Form.Group>
              </Row>
            </Form>
          </>
        </Col>
      </Row>

      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Teachers and Subjects Details</h4>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
