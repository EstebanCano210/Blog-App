import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner, Alert, Card, Button, Form } from 'react-bootstrap';
import { usePost, useComments } from '../shared/hooks/';
import CommentForm from '../components/CommentForm';

export default function PostPage() {
  const { id } = useParams();
  const { post, loading: lp }         = usePost(id);
  const {
    comments,
    loading: lc,
    add,
    update: edit,
    remove: removeComment
  } = useComments(id);

  const [editingId, setEditingId]     = useState(null);
  const [editData, setEditData]       = useState({ name: '', content: '' });

  if (lp) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (!post) return <Alert variant="danger">Publicación no encontrada.</Alert>;

  const fecha = new Date(post.createdAt).toLocaleDateString();
  const hora  = new Date(post.createdAt).toLocaleTimeString();

  const beginEdit = c => {
    setEditingId(c.id);
    setEditData({ name: c.name, content: c.content });
  };
  const cancelEdit = () => setEditingId(null);
  const saveEdit = async e => {
    e.preventDefault();
    await edit(editingId, editData);
    cancelEdit();
  };

  return (
    <>
      <div className="mb-3">
        <Button as={Link} to="/" variant="outline-light">
          ← Volver al inicio
        </Button>
      </div>

      <Card className="mb-4 shadow-sm bg-dark text-light">
        {post.image && (
          <Card.Img
            variant="top"
            src={post.image}
            alt={post.title}
            className="img-fluid"
            style={{ objectFit: 'cover', maxHeight: '300px' }}
          />
        )}
        <Card.Body>
          <Card.Title as="h2" className="mb-3">{post.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Publicado el {fecha} a las {hora} — en <strong>{post.category.name}</strong>
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
            {post.description}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm bg-dark text-light">
        <Card.Body>
          <Card.Title as="h4" className="mb-3">
            Comentarios ({comments.length})
          </Card.Title>

          {lc
            ? <div className="text-center my-3"><Spinner animation="border" /></div>
            : comments.map(c => (
                <div key={c.id} className="mb-3 p-3 bg-secondary rounded">
                  {editingId === c.id ? (
                    <Form onSubmit={saveEdit}>
                      <Form.Control
                        className="mb-2"
                        placeholder="Nombre (opcional)"
                        value={editData.name}
                        onChange={e => setEditData({ ...editData, name: e.target.value })}
                      />
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="mb-2"
                        placeholder="Comentario"
                        value={editData.content}
                        onChange={e => setEditData({ ...editData, content: e.target.value })}
                      />
                      <Button type="submit" variant="primary" className="me-2">Guardar</Button>
                      <Button variant="outline-light" onClick={cancelEdit}>Cancelar</Button>
                    </Form>
                  ) : (
                    <>
                      <strong>{c.name}</strong> &nbsp;
                      <span className="text-muted small">
                        — {new Date(c.createdAt).toLocaleString()}
                      </span>
                      <p>{c.content}</p>
                      <Button size="sm" variant="outline-light" className="me-2" onClick={() => beginEdit(c)}>
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          if (window.confirm('¿Seguro que deseas eliminar este comentario?')) {
                            removeComment(c.id);
                          }
                        }}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </div>
              ))
          }
        </Card.Body>
      </Card>
      <Card className="mb-5 shadow-sm bg-dark text-light">
        <Card.Body>
          <Card.Title as="h4" className="mb-3">Deja tu comentario</Card.Title>
          <CommentForm onSubmit={add} />
        </Card.Body>
      </Card>
    </>
  );
}