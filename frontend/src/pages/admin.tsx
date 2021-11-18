import { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AddModal } from "../components/admin/addModal";
import { ListAdminProducts } from "../components/admin/listProducts";
import { productContext } from "../context/productContext";

export const Admin = () => {
  const { refresh } = useContext(productContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container>
        <h1>Admin panel</h1>
      </Container>
      <Container>
        <Row>
          <Col>
            <h2>Overview</h2>
          </Col>
          <Col lg={8}>
            <Button
              onClick={() => setShowModal((x) => !x)}
              style={{ marginBottom: "2rem" }}
            >
              add new products
            </Button>
          </Col>
        </Row>

        <AddModal
          onHide={async () => {
            setShowModal(false);
            setTimeout(async () => await refresh(), 50);
          }}
          show={showModal}
        />

        <ListAdminProducts />
      </Container>
    </>
  );
};
