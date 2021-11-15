import { Dispatch, FC, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { Category } from '../../enum/categoryEnum';
type props = {
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
};
export const CategorySelector: FC<props> = ({ setCategory, category }) => {
  return (
    <Form.Select
      value={category}
      onChange={(e) => {
        setCategory(parseInt(e.currentTarget.value));
      }}
    >
      <option value={-1}>all</option>
      <option value={0}>Shirt</option>
      <option value={1}>Pants</option>
      <option value={2}>Shoes</option>
      <option value={3}>Accessories</option>
      <option value={4}>Bags</option>
      <option value={5}>Others</option>
    </Form.Select>
  );
};
