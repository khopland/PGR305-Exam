import { FC } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import IProduct from "../../interfaces/product";

type props = {
  show: boolean;
  onHide: () => Promise<void>;
  product: IProduct | null;
  confirmDelete: (product: IProduct) => void;
};
export const DeleteModal: FC<props> = ({
  show,
  onHide,
  product,
  confirmDelete,
}) => {
  return (
    <Modal animation={false} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete instance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {product?.name}? This action cannot be
        undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            product ? confirmDelete(product) : null;
            setTimeout(async () => await onHide(), 50);
          }}
        >
          Delete instance
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
