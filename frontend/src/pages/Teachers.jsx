import TeachersForm from "../components/teachers/TeachersForm";
import TeachersTable from "../components/teachers/TeachersTable";

const Teachers = () => {
  return (
    <div className="px-3">
      <TeachersForm />
      <TeachersTable />
    </div>
  );
};

export default Teachers;
