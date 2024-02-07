import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentsForm from "../components/students/StudentsForm";
import StudentsTable from "../components/students/StudentsTable";
import {
  getStudents,
  reset,
  resetSelectedStudent,
} from "../features/students/studentsSlice";
import { toast } from "react-toastify";

const Students = () => {
  const dispatch = useDispatch();

  const { students, isLoading, isError, message } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getStudents());
    return () => {
      dispatch(resetSelectedStudent());
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  return (
    <div className="px-3 mb-3">
      <StudentsForm isLoading={isLoading} />
      <StudentsTable students={students} isLoading={isLoading} />
    </div>
  );
};

export default Students;
