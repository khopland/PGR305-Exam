import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { AddNewProduct } from "./addNewProduct";
import { useState } from "react";

type props = {
  show: boolean;
  onHide: () => Promise<void>;
};
export const AddModal = ({ show, onHide }: props) => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    setDone(true);
  };

  return (
    <>
      <Modal animation={false} show={show} onHide={onHide}>
        <Modal.Header>Add new product</Modal.Header>
        <div>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <AddNewProduct
              done={done}
              setDone={setDone}
              onHide={onHide}
              setError={setError}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="success" type="submit" onClick={() => onSubmit()}>
              Add
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};
