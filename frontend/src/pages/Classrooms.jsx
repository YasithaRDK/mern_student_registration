import ClassroomsForm from "../components/classrooms/ClassroomsForm";
import ClassroomsTable from "../components/classrooms/ClassroomsTable";

const Classrooms = () => {
  return (
    <div className="px-3">
      <ClassroomsForm />
      <ClassroomsTable />
    </div>
  );
};

export default Classrooms;
