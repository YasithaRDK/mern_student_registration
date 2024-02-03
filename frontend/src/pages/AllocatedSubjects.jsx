import AllocatedSubjectsForm from "../components/allocatedSubjects/AllocatedSubjectsForm";
import AllocatedSubjectsTable from "../components/allocatedSubjects/AllocatedSubjectsTable";

const AllocatedSubjects = () => {
  return (
    <div className="px-3">
      <AllocatedSubjectsForm />
      <AllocatedSubjectsTable />
    </div>
  );
};

export default AllocatedSubjects;
