import { Button, Col, Row, Table } from "react-bootstrap";
import { calculateAge } from "../../utilities/calculate";
import { format } from "date-fns";
import { BsInfoCircle, BsPen, BsTrash } from "react-icons/bs";
import {
  deleteStudent,
  getStudent,
  getStudents,
} from "../../features/students/studentsSlice";
import { useDispatch } from "react-redux";
import Loader from "../Loader";
import { unwrapResult } from "@reduxjs/toolkit";

const StudentsTable = ({ students, isLoading }) => {
  const dispatch = useDispatch();

  const onDelete = async (id) => {
    const resultAction = await dispatch(deleteStudent(id));
    const deletedStudent = unwrapResult(resultAction);

    if (deletedStudent) {
      dispatch(getStudents());
    }
  };

  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Students Details</h4>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Contact Person</th>
                      <th>Contact Number</th>
                      <th>Email</th>
                      <th>Date of Birth</th>
                      <th>Age</th>
                      <th>Classroom</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((student, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.studentName}</td>
                          <td>{student.contactPerson}</td>
                          <td>{student.contactNo}</td>
                          <td>{student.email}</td>
                          <td>
                            {student.birthDay
                              ? format(new Date(student.birthDay), "MM-dd-yyyy")
                              : "N/A"}
                          </td>
                          <td>{calculateAge(student.birthDay)}</td>
                          <td>{student.classroom}</td>
                          <td className="d-flex align-items-center">
                            <Button variant="outline-info" className="me-2">
                              <BsInfoCircle />
                            </Button>
                            <Button
                              onClick={() => dispatch(getStudent(student._id))}
                              variant="outline-warning"
                              className="me-2"
                            >
                              <BsPen />
                            </Button>
                            <Button
                              onClick={() => onDelete(student._id)}
                              variant="outline-danger"
                            >
                              <BsTrash />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-danger">
                          No data found
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

export default StudentsTable;
