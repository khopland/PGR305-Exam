import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Category } from "../../enum/categoryEnum";
import { InputField } from "../common/inputField";
import { postProduct } from "../../service/productService";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type props = {
  done: boolean;
  setDone: Dispatch<SetStateAction<boolean>>;
  onHide: () => Promise<void>;
  setError: (x: string) => void;
};
export const AddNewProduct = ({ done, setDone, onHide, setError }: props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.01);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>(Category.Shirt);
  const [curentSize, setCurentSize] = useState("");
  const [size, setSize] = useState<string[]>([]);
  const [img, setImg] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (done) handleSubmit();
  }, [done]);

  const handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files?.length && setImg(e.target.files[0]);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (name.length > 1 && price > 0 && size.length > 0) {
      (await postProduct(
        {
          name,
          price: Math.round(price * 100),
          sizes: size,
          category,
          description: description.length > 0 ? description : undefined,
        },
        img
      ))
        ? await clearData()
        : alert("Error");
    } else {
      setDone(false);
      setError("All fields needs to be filled out and not negative price");
    }
  };

  const addSize = () => {
    const newSize = curentSize.trim();
    if (newSize !== "" && !size.includes(newSize)) {
      setSize([...size, curentSize]);
      setCurentSize("");
    }
  };

  const clearData = async () => {
    setName("");
    setPrice(0);
    setDescription("");
    setCategory(0);
    setCurentSize("");
    setSize([]);
    setImg(undefined);
    if (ref.current) ref.current.value = "";
    await onHide();
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Col>
            <InputField
              as={Col}
              type="text"
              value={name}
              onValueChange={setName}
              label="name"
              required
            />

            <InputField
              as={Col}
              type="number"
              value={price}
              onValueChange={setPrice}
              label="price (0.00)"
              required
            />

            <Form.Group>
              <Form.Label column="lg">Image file</Form.Label>
              <Form.Control
                ref={ref}
                type="file"
                onChange={handleCange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label column="lg">category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(parseInt(e.currentTarget.value))}
                required
              >
                <option value="0"> Shirt</option>
                <option value="1"> pants</option>
                <option value="2"> shoes</option>
                <option value="3"> accessories</option>
                <option value="4"> bags</option>
                <option value="5"> others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label column="lg">description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a description here (not required)"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Form.Group>

            <InputField
              as={Col}
              type="text"
              value={curentSize}
              onValueChange={setCurentSize}
              label="add new size"
            />
            <br />

            <Button onClick={addSize} size="sm" style={{ marginRight: "2rem" }}>
              add new size
            </Button>

            {size.map((s, i) => (
              <i key={i} style={{ paddingRight: "1rem", fontSize: "1.3rem" }}>
                {s}
                {i !== 0 ? "" : ","}
              </i>
            ))}
          </Col>
        </Form>
      </Row>
    </Container>
  );
};
