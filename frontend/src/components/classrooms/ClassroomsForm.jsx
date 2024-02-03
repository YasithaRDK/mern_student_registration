import { Button, Col, Form, Row } from "react-bootstrap";

const ClassroomsForm = () => {
  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Add Classroom</h4>
            <Form>
              <Form.Group controlId="classroom">
                <Form.Label>Classroom Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Classroom"
                  name="classroom"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                className="mt-2 mt-md-2 mx-auto mx-md-0 d-block"
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

export default ClassroomsForm;
