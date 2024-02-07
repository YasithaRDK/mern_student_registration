import { Spinner } from "react-bootstrap";

const Loader = ({ style }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={style}
    >
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default Loader;
