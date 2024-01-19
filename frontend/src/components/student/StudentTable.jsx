import React, { useEffect } from "react";
import {
  deleteStudent,
  getStudent,
  getStudents,
} from "../../features/student/studentSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import Loader from "../Loader";
import { format, isValid } from "date-fns";
import { calculateAge } from "../../utills/Calculate";

const StudentTable = () => {
  const dispatch = useDispatch();

  const { students, isSuccess, isLoading } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getStudents());
      } catch (error) {
        toast.error("Error fetching students");
      }
    };

    fetchData();
  }, [dispatch]);

  const onDeleteStudent = async (id) => {
    await dispatch(deleteStudent(id));
    await dispatch(getStudents());
    toast.success("Record deleted successfully");
  };

  return (
    <Container className="mt-4  form-container">
      <Container fluid>
        <h2 className="mb-3">Student Details</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact Person</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Date of birth</th>
                <th>Age</th>
                <th>classroom</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.studentName}</td>
                  <td>{student.contactPerson}</td>
                  <td>{student.contactNo}</td>
                  <td>{student.email}</td>
                  <td>
                    {student.birthDay &&
                      (() => {
                        const birthDate = new Date(student.birthDay);
                        if (isValid(birthDate)) {
                          return format(birthDate, "MM-dd-yyyy");
                        } else {
                          console.error("Invalid date:", student.birthDay);
                          return null;
                        }
                      })()}
                  </td>
                  <td>{calculateAge(student.birthDay)}</td>
                  <td>{student.classroom}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => dispatch(getStudent(student._id))}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="ml-2"
                        onClick={() => onDeleteStudent(student._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Container>
  );
};

export default StudentTable;
