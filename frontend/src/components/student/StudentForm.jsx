import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { calculateAge } from "../../utills/Calculate";
import {
  createStudent,
  getStudents,
  updateStudent,
  resetSelectedStudent,
} from "../../features/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClassroomDropdown from "../dropdowns/ClassroomDropdown";

const StudentForm = () => {
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

      const {
        _id,
        firstName,
        lastName,
        contactPerson,
        contactNo,
        email,
        birthDay,
        classroomId,
      } = studentData;

      const formattedBirthDay = birthDay ? birthDay.slice(0, 10) : "";

      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        contactPerson: contactPerson || "",
        contactNo: contactNo || "",
        email: email || "",
        birthDay: formattedBirthDay,
        age: calculateAge(formattedBirthDay),
        classroom: classroomId || "",
      });

      setId(_id);
    } else {
      resetForm();
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

  const addStudent = async (data) => {
    const result = await dispatch(createStudent(data));

    if (createStudent.fulfilled.match(result)) {
      toast.success("Record added successfully");
      resetForm();
    }
    await dispatch(getStudents());
  };

  const studentUpdate = async (id, data) => {
    await dispatch(updateStudent({ id, data }));
    await dispatch(getStudents());
    resetForm();
    toast.success("Record updated successfully");
  };

  const onSubmit = (e) => {
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
      studentUpdate(id, data);
    } else {
      addStudent(data);
    }
  };

  const resetForm = () => {
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

  const onCancel = () => {
    resetForm();
    dispatch(resetSelectedStudent());
  };

  return (
    <Container className="mt-2  form-container">
      <Container fluid>
        <h2 className="mb-3">Add student</h2>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md="6">
              <Form.Group as={Row}>
                <Form.Label column lg="4">
                  First Name
                </Form.Label>
                <Col lg="8">
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6">
              <Form.Group as={Row}>
                <Form.Label column lg="4">
                  Last Name
                </Form.Label>
                <Col lg="8">
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" className="mt-md-4">
              <Form.Group as={Row}>
                <Form.Label column lg="4">
                  Contact Person
                </Form.Label>
                <Col lg="8">
                  <Form.Control
                    type="text"
                    placeholder="Enter contact person"
                    name="contactPerson"
                    value={contactPerson}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" className="mt-md-4">
              <Form.Group as={Row}>
                <Form.Label column lg="4">
                  Contact Number
                </Form.Label>
                <Col lg="8">
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    name="contactNo"
                    value={contactNo}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" className="mt-md-4">
              <Form.Group as={Row}>
                <Form.Label column lg="4">
                  Email address
                </Form.Label>
                <Col lg="8">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" className="mt-md-4">
              <Form.Group as={Row}>
                <Form.Label column lg="4">
                  Date of Birth
                </Form.Label>
                <Col lg="8">
                  <Form.Control
                    type="date"
                    name="birthDay"
                    value={birthDay}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" className="mt-md-4">
              <Form.Group as={Row}>
                <Form.Label column lg="4">
                  Age
                </Form.Label>
                <Col lg="8">
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    name="age"
                    value={age}
                    onChange={onChange}
                    disabled
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" className="mt-md-4">
              <ClassroomDropdown onChange={onChange} value={classroom} />
            </Col>
          </Row>

          <div className="d-flex">
            <Button
              variant={selectedStudent ? "success" : "primary"}
              type="submit"
              className="mt-2"
            >
              {selectedStudent ? "Update" : "Add"}
            </Button>
            {selectedStudent && (
              <Button className="ms-2 mt-2" onClick={onCancel}>
                Clear
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </Container>
  );
};

export default StudentForm;
