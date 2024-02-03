import { useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  getClassrooms,
  reset,
} from "../../features/classrooms/classroomsSlice";
import { useDispatch, useSelector } from "react-redux";

const ClassDropdown = ({ value, onChange }) => {
  const { classrooms } = useSelector((state) => state.classrooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassrooms());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <Form.Select as="select" name="classroom" value={value} onChange={onChange}>
      <option value="">Select Classroom </option>
      {classrooms.length > 0 &&
        classrooms.map((classroom) => (
          <option key={classroom._id} value={classroom._id}>
            {classroom.classroomName}
          </option>
        ))}
    </Form.Select>
  );
};

export default ClassDropdown;
