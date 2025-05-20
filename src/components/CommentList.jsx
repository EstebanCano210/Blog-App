import React, { useState } from 'react';
import {
  ListGroup,
  Card,
  Form,
  Button,
  ButtonGroup
} from 'react-bootstrap';

export default function CommentList({ comments, onUpdate, onDelete }) {
  const [editingId,  setEditingId]  = useState(null);
  const [editName,  setEditName]   = useState('');
  const [editContent, setEditContent] = useState('');

  const startEdit = c => {
    setEditingId(c.id);
    setEditName(c.name === 'Anónimo' ? '' : c.name);
    setEditContent(c.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    await onUpdate(editingId, { name: editName, content: editContent });
    setEditingId(null);
  };

  const confirmDelete = id => {
    if (window.confirm('¿Seguro que quieres eliminar este comentario?')) {
      onDelete(id);
    }
  };

  if (!comments.length) {
    return <p className="text-muted">Aún no hay comentarios.</p>;
  }

  return (
    <ListGroup variant="flush">
      {comments.map(c => (
        <ListGroup.Item key={c.id} className="px-0 py-3">
          {editingId === c.id ? (
            <Card className="border-0">
              <Card.Body className="p-0">
                <Form.Group className="mb-2">
                  <Form.Label>Nombre (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder="Deja vacío para Anónimo"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                  />
                </Form.Group>
                <ButtonGroup>
                  <Button variant="primary" size="sm" onClick={saveEdit}>
                    Guardar
                  </Button>
                  <Button variant="secondary" size="sm" onClick={cancelEdit}>
                    Cancelar
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          ) : (
            <Card className="border-0">
              <Card.Body className="p-0">
                <Card.Subtitle className="mb-2">
                  <strong>{c.name}</strong>{' '}
                  <span className="text-muted small">
                    — {new Date(c.createdAt).toLocaleString()}
                  </span>
                </Card.Subtitle>
                <Card.Text>{c.content}</Card.Text>
                <div className="mt-2">
                  <ButtonGroup>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => startEdit(c)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => confirmDelete(c.id)}
                    >
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </div>
              </Card.Body>
            </Card>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}