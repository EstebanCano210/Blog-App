import React, { useState } from 'react';
import { Form, Button }     from 'react-bootstrap';

export default function CommentForm({ onSubmit }) {
  const [name, setName]       = useState('');
  const [content, setContent] = useState('');

  const handle = e => {
    e.preventDefault();
    onSubmit({ name, content });
    setContent('');
  };

  return (
    <Form onSubmit={handle}>
      <Form.Group className="mb-3" controlId="commentName">
        <Form.Label>Tu nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej. Juan Pérez"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="commentContent">
        <Form.Label>Comentario</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Escribe tu comentario…"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar comentario
      </Button>
    </Form>
  );
}
