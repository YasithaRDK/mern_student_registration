import { Button, Col, Form, Row } from "react-bootstrap";

const Profile = () => {
  return (
    <div className="px-3">
      <Row className="justify-content-center">
        <Col lg={8} className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Edit Profile Details</h4>
            <Form>
              <Form.Group controlId="subject">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  name="subject"
                  required
                />
              </Form.Group>

              <Form.Group controlId="subject">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  name="subject"
                  required
                />
              </Form.Group>

              <Form.Group controlId="subject">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  name="subject"
                  required
                />
              </Form.Group>

              <Form.Group controlId="subject">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  name="subject"
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
    </div>
  );
};

export default Profile;
