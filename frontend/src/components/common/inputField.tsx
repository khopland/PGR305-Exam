import { Dispatch, SetStateAction } from 'react';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';

export interface props {
  value: any;
  onValueChange: Dispatch<SetStateAction<any>>;
  required?: boolean;
  type?: string;
  label: string;
  as?: React.ElementType<any>;
}

export function InputField({
  value,
  onValueChange,
  type = 'text',
  required = false,
  label,
  as = Row,
}: props) {
  return (
    <Form.Group as={as}>
      <Form.Label column="lg">{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        required={required}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </Form.Group>
  );
}
