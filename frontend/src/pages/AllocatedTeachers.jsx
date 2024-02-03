import AllocatedTeachersForm from "../components/allocatedTeachers/AllocatedTeachersForm";
import AllocatedTeachersTable from "../components/allocatedTeachers/AllocatedTeachersTable";

const AllocatedTeachers = () => {
  return (
    <div className="px-3">
      <AllocatedTeachersForm />
      <AllocatedTeachersTable />
    </div>
  );
};

export default AllocatedTeachers;
