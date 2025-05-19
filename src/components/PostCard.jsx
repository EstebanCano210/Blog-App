import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Card className="h-100">
      {/*  ─────────── Imagen ─────────── */}
      {post.image && (
        <Card.Img
          variant="top"
          src={post.image}
          alt={post.title}
          style={{ objectFit: 'cover', height: '180px' }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(post.createdAt).toLocaleDateString()} — {post.category.name}
        </Card.Subtitle>
        <Card.Text className="flex-grow-1">
          {post.description.length > 100
            ? post.description.slice(0, 100) + '…'
            : post.description}
        </Card.Text>
        <Button
          as={Link}
          to={`/post/${post.id}`}
          variant="primary"
          className="mt-auto"
        >
          Leer más
        </Button>
      </Card.Body>
    </Card>
  );
}