import { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  getStudents,
  getStudent,
  reset,
} from "../features/students/studentsSlice";
import Loader from "../components/Loader";

const Home = () => {
  const [formData, setFormData] = useState({
    classroom: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    birthDay: "",
  });

  const [id, setId] = useState("");

  const [teacherAndSubjectDetails, setTeacherAndSubjectDetails] = useState([]);

  const { classroom, contactPerson, contactNo, email, birthDay } = formData;

  const { students, selectedStudent, isLoading } = useSelector(
    (state) => state.students
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());

    if (selectedStudent) {
      const studentData = selectedStudent[0];

      setFormData({
        contactPerson: studentData.contactPerson,
        contactNo: studentData.contactNo,
        email: studentData.email,
        birthDay: format(new Date(studentData.birthDay), "yyyy-MM-dd"),
        classroom: studentData.classroom,
      });
      setId(studentData._id);
      setTeacherAndSubjectDetails(selectedStudent);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, selectedStudent]);

  const handleStudentChange = (id) => {
    resetForm();
    dispatch(getStudent(id));
  };

  const resetForm = () => {
    setFormData({
      classroom: "",
      contactPerson: "",
      contactNo: "",
      email: "",
      birthDay: "",
    });
    setTeacherAndSubjectDetails("");
    setId("");
  };

  const style = { height: "100vh" };

  if (isLoading) {
    return <Loader style={style} />;
  }

  return (
    <div className="px-3 mb-3">
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">Student Details</h4>
            <Form>
              <Row>
                <Form.Group as={Col} lg={6} controlId="student">
                  <Form.Label>Student</Form.Label>
                  <Form.Select
                    as="select"
                    name="id"
                    value={id}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (selectedValue !== "") {
                        handleStudentChange(selectedValue);
                      }
                      resetForm();
                    }}
                  >
                    <option value="">Select Student </option>
                    {students.length > 0 &&
                      students.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.studentName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="classroom">
                  <Form.Label>Classroom</Form.Label>
                  <Form.Control
                    type="text"
                    name="classroom"
                    value={classroom}
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
                    value={contactPerson}
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
                    value={contactNo}
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
                    value={email}
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="birthDay">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthDay"
                    value={birthDay}
                    required
                    disabled
                  />
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
                  {!teacherAndSubjectDetails ||
                  teacherAndSubjectDetails.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-danger">
                        Select Student
                      </td>
                    </tr>
                  ) : (
                    teacherAndSubjectDetails?.map((details, index) => (
                      <tr key={index}>
                        <td>
                          {details.subject ? (
                            details.subject
                          ) : (
                            <span style={{ color: "red" }}>
                              No data available
                            </span>
                          )}
                        </td>
                        <td>
                          {details.teacher ? (
                            details.teacher
                          ) : (
                            <span style={{ color: "red" }}>
                              No data available
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
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
