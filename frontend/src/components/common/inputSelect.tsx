import React from 'react';
import { Form, Row } from 'react-bootstrap';

export interface props {
  value: string | number | string[] | undefined;
  onValueChange: (e: any) => void;
  label: string;
  children: React.ReactNode;
}

export const InputSelect = ({
  value,
  onValueChange,
  label,
  children,
}: props) => {
  return (
    <Form.Group as={Row}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(e) => onValueChange(e)}
      >
        {children}
      </Form.Control>
    </Form.Group>
  );
};
