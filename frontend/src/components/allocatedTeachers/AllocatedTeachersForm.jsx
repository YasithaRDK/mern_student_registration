import { Button, Col, Form, Row } from "react-bootstrap";

const AllocatedTeachersForm = () => {
  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Allocate Teacher</h4>
            <Form>
              <Row>
                <Form.Group as={Col} lg={6} controlId="teacher">
                  <Form.Label>Teacher</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Teacher"
                    name="teacher"
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  lg={6}
                  controlId="classroom"
                  className="mb-2"
                >
                  <Form.Label>Classroom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter classroom"
                    name="classroom"
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

export default AllocatedTeachersForm;
