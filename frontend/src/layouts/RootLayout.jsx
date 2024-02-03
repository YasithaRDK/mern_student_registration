import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const RootLayout = () => {
  const [toggle, setToggle] = useState(false);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 576px)" });

  useEffect(() => {
    setToggle(isDesktopOrTablet);
  }, [isDesktopOrTablet]);

  return (
    <Container fluid className="min-vh-100 position-fixed">
      <Row>
        {toggle && (
          <Col
            sm={5}
            md={4}
            lg={3}
            xxl={2}
            className="bg-light vh-100 overflow-auto sidebar"
          >
            <Sidebar isDesktopOrTablet={isDesktopOrTablet} Toggle={Toggle} />
          </Col>
        )}
        <Col className="p-0 d-flex flex-column vh-100 overflow-auto">
          <div>
            <Header Toggle={Toggle} />
          </div>
          <Container>{<Outlet />}</Container>
        </Col>
      </Row>
    </Container>
  );
};

export default RootLayout;
