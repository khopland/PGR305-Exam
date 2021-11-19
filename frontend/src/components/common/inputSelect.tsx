import Form from "react-bootstrap/esm/Form";
import React from "react";
import Row from "react-bootstrap/esm/Row";

export interface props {
  value: string | number | string[] | undefined;
  onValueChange: (e: any) => void;
  label: string;
  children: React.ReactNode;
}

export function InputSelect({ value, onValueChange, label, children }: props) {
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
}
