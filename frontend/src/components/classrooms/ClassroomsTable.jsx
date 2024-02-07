import { Button, Col, Row, Table } from "react-bootstrap";
import Loader from "../Loader";
import {
  deleteClassroom,
  getClassroom,
} from "../../features/classrooms/classroomsSlice";
import { BsInfoCircle, BsPen, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const ClassroomsTable = ({ classrooms, isLoading }) => {
  const dispatch = useDispatch();

  const onDelete = async (id) => {
    const shouldDelete = window.confirm(
      "If you delete this record some student and allocated classroom data may be loss?"
    );

    if (shouldDelete) {
      const resultAction = await dispatch(deleteClassroom(id));
      const deletedClassroom = unwrapResult(resultAction);

      if (deletedClassroom) {
        dispatch(getClassroom());
      }
    }
  };

  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Classrooms Details</h4>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Classroom</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classrooms.length > 0 ? (
                      classrooms.map((classroom, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{classroom.classroomName}</td>
                          <td className="d-flex align-items-center">
                            <Button variant="outline-info" className="me-2">
                              <BsInfoCircle />
                            </Button>
                            <Button
                              onClick={() =>
                                dispatch(getClassroom(classroom._id))
                              }
                              variant="outline-warning"
                              className="me-2"
                            >
                              <BsPen />
                            </Button>
                            <Button
                              onClick={() => onDelete(classroom._id)}
                              variant="outline-danger"
                            >
                              <BsTrash />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-danger">
                          No data founded
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </>
        </Col>
      </Row>
    </>
  );
};

export default ClassroomsTable;
