import { Col, Row, Table } from "react-bootstrap";

const AllocatedTeachersTable = () => {
  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Allocated Teachers Details</h4>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Teacher</th>
                    <th>Classroom</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>
        </Col>
      </Row>
    </>
  );
};

export default AllocatedTeachersTable;
