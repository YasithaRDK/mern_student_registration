import { useDispatch, useSelector } from "react-redux";
import ClassroomsForm from "../components/classrooms/ClassroomsForm";
import ClassroomsTable from "../components/classrooms/ClassroomsTable";
import { useEffect } from "react";
import { getClassrooms, reset } from "../features/classrooms/classroomsSlice";
import { toast } from "react-toastify";

const Classrooms = () => {
  const dispatch = useDispatch();

  const { classrooms, isLoading, isError, message } = useSelector(
    (state) => state.classrooms
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getClassrooms());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  return (
    <div className="px-3 mb-3">
      <ClassroomsForm isLoading={isLoading} />
      <ClassroomsTable classrooms={classrooms} isLoading={isLoading} />
    </div>
  );
};

export default Classrooms;
