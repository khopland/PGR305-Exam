import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import IProduct from "../../interfaces/product";
import Table from "react-bootstrap/esm/Table";
import { DeleteModal } from "./deleteModal";
import { deleteProduct } from "../../service/productService";
import { EditModal } from "./editModal";
import { FC, useContext, useState } from "react";
import { productContext } from "../../context/productContext";

type props = {};
export const ListAdminProducts: FC<props> = ({}) => {
  const { value, refresh } = useContext(productContext);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selected, setSelected] = useState<IProduct | null>(null);

  const onDelete = (product: IProduct) => {
    setSelected(product);
    setShowModalDelete(true);
  };
  const onEdit = (product: IProduct) => {
    setSelected(product);
    setShowModalEdit(true);
  };

  return (
    <>
      <Container>
        {value ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sizes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {value.map((product, i) => (
                <tr key={i}>
                  <td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      rounded
                      style={{
                        objectFit: "cover",
                        width: "10rem",
                        height: "7.5rem",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <ul>
                      {product.sizes.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          onEdit(product);
                        }}
                      >
                        <svg
                          style={{
                            color: "#fff",
                            width: "1.5rem",
                            height: "1.5rem",
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          onDelete(product);
                        }}
                      >
                        <svg
                          style={{
                            color: "#333",
                            width: "1.5rem",
                            height: "1.5rem",
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3>loading...</h3>
        )}
        <EditModal
          onHide={async () => {
            setShowModalEdit(false);
            setTimeout(async () => await refresh(), 50);
          }}
          show={showModalEdit}
          product={selected ? selected : ({} as unknown as IProduct)}
        />
        <DeleteModal
          onHide={async () => {
            setShowModalDelete(false);
            setTimeout(async () => await refresh(), 50);
          }}
          show={showModalDelete}
          product={selected}
          confirmDelete={async () => {
            selected ? await deleteProduct(selected) : null;
          }}
        />
      </Container>
    </>
  );
};
