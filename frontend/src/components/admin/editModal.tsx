import { useState } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import IProduct from "../../interfaces/product";
import { EditProduct } from "./editProduct";

type props = {
  show: boolean;
  onHide: () => Promise<void>;
  product: IProduct;
};
export const EditModal = ({ show, onHide, product }: props) => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    setDone(true);
  };
  return (
    <>
      <Modal animation={false} show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Edit{` ${product?.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <EditProduct
            done={done}
            onHide={onHide}
            product={product}
            setDone={setDone}
            setError={setError}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="success" type="submit" onClick={onSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
