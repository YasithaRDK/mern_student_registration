import UsersForm from "../components/users/UsersForm";
import UsersTable from "../components/users/UsersTable";

const Users = () => {
  return (
    <div className="px-3">
      <UsersForm />
      <UsersTable />
    </div>
  );
};

export default Users;
