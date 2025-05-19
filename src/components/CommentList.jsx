import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';

export default function CommentList({ comments }) {
  if (!comments.length) {
    return <p className="text-muted">Aún no hay comentarios.</p>;
  }

  return (
    <ListGroup variant="flush">
      {comments.map(c => (
        <ListGroup.Item key={c.id} className="px-0 py-3">
          <Card className="border-0">
            <Card.Body className="p-0">
              <Card.Subtitle className="mb-2">
                <strong>{c.name}</strong> &nbsp;
                <span className="text-muted small">
                  — {new Date(c.createdAt).toLocaleString()}
                </span>
              </Card.Subtitle>
              <Card.Text>{c.content}</Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
