import React, { Dispatch, SetStateAction } from 'react';
import { Form, Row } from 'react-bootstrap';

export interface props {
  value: string | number | undefined;
  onValueChange: Dispatch<SetStateAction<any>>;
  required?: boolean;
  type?: string;
  label: string;
}

export function InputField({
  value,
  onValueChange,
  type = 'text',
  required = false,
  label,
}: props) {
  return (
    <Form.Group as={Row}>
      <Form.Label column="lg" lg={2}>
        {label}
      </Form.Label>
      <Form.Control
        type={type}
        value={value}
        required={required}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </Form.Group>
  );
}
