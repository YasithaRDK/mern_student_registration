import { useEffect } from "react";
import StudentForm from "../components/student/StudentForm";
import StudentTable from "../components/student/StudentTable";
import { reset } from "../features/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Student = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.students);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // return () => {
    //   dispatch(reset());
    // };
  }, [isError, message, dispatch]);

  return (
    <>
      <StudentForm />

      <StudentTable />
    </>
  );
};

export default Student;
