import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { getClassrooms } from "../../features/classroom/classroomSlice";
import { useDispatch, useSelector } from "react-redux";

const ClassroomDropdown = ({ value, onChange }) => {
  const { classrooms } = useSelector((state) => state.classrooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassrooms());
  }, [dispatch]);

  return (
    <Form.Group as={Row}>
      <Form.Label column lg="4">
        Classroom
      </Form.Label>
      <Col lg="8">
        <Form.Select
          as="select"
          name="classroom"
          value={value}
          onChange={onChange}
        >
          <option value="">Select Classroom </option>
          {classrooms.length > 0 &&
            classrooms.map((classroom) => (
              <option key={classroom._id} value={classroom._id}>
                {classroom.classroomName}
              </option>
            ))}
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default ClassroomDropdown;
