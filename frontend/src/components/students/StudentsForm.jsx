import { Button, Col, Form, Row } from "react-bootstrap";
import ClassDropdown from "../common/ClassDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { calculateAge } from "../../utilities/calculate";
import {
  createStudent,
  getStudents,
  resetSelectedStudent,
  updateStudent,
} from "../../features/students/studentsSlice";
import Loader from "../Loader";
import { unwrapResult } from "@reduxjs/toolkit";

const StudentsForm = ({ isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    birthDay: "",
    age: "",
    classroom: "",
  });

  const [id, setId] = useState(null);

  const {
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    age,
    classroom,
  } = formData;

  const dispatch = useDispatch();

  const { selectedStudent } = useSelector((state) => state.students);

  useEffect(() => {
    if (selectedStudent) {
      const studentData = selectedStudent[0];

      const formattedBirthDay = studentData.birthDay.slice(0, 10);

      setFormData({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        contactPerson: studentData.contactPerson,
        contactNo: studentData.contactNo,
        email: studentData.email,
        birthDay: formattedBirthDay,
        age: calculateAge(formattedBirthDay),
        classroom: studentData.classroomId,
      });

      setId(studentData._id);
    }
  }, [selectedStudent]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "birthDay") {
      const calculatedAge = calculateAge(value);

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        age: calculatedAge,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      contactPerson,
      contactNo,
      email,
      birthDay,
      classroom,
    };

    if (selectedStudent) {
      const resultAction = await dispatch(updateStudent({ data, id }));
      const updatedStudent = unwrapResult(resultAction);

      if (updatedStudent) {
        await dispatch(getStudents());
        formReset();
      }
    } else {
      const resultAction = await dispatch(createStudent(data));
      const createdStudent = unwrapResult(resultAction);

      if (createdStudent) {
        await dispatch(getStudents());
        formReset();
      }
    }
  };

  const onCancel = () => {
    formReset();
    dispatch(resetSelectedStudent());
  };

  const formReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      contactPerson: "",
      contactNo: "",
      email: "",
      birthDay: "",
      age: "",
      classroom: "",
    });
  };

  return (
    <>
      <Row>
        <Col className="bg-white mt-3 p-3 p-md-5 rounded shadow-md">
          <>
            <h4 className="text-center mb-4">
              {selectedStudent ? "Edit" : "Add"} Student
            </h4>
            <Form onSubmit={onSubmit}>
              <Row>
                <Form.Group as={Col} lg={6} controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  lg={6}
                  controlId="lastName"
                  className="mb-2"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
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
                    onChange={onChange}
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
                    type="text"
                    placeholder="Enter contact number"
                    name="contactNo"
                    value={contactNo}
                    onChange={onChange}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} lg={6} controlId="email" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email address"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="birthDay">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthDay"
                    value={birthDay}
                    onChange={onChange}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} lg={6} controlId="age" className="mb-2">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    name="age"
                    value={age}
                    onChange={onChange}
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6} controlId="classroom">
                  <Form.Label>ClassroomId</Form.Label>
                  <ClassDropdown value={classroom} onChange={onChange} />
                </Form.Group>
              </Row>

              <div className="d-flex">
                <Button
                  variant={selectedStudent ? "success" : "primary"}
                  className="mt-2 mt-md-0 me-2  d-block"
                  type="submit"
                >
                  {isLoading ? <Loader /> : selectedStudent ? "Edit" : "Add"}
                </Button>
                {selectedStudent && (
                  <Button
                    onClick={onCancel}
                    variant="warning"
                    className="mt-2 mt-md-0  d-block"
                    type="submit"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
          </>
        </Col>
      </Row>
    </>
  );
};

export default StudentsForm;
