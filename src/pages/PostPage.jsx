import React from 'react';
import { useParams }     from 'react-router-dom';
import { Spinner, Alert, Card } from 'react-bootstrap';
import { usePost, 
         useComments} from '../shared/hooks/';
import CommentList       from '../components/CommentList';
import CommentForm       from '../components/CommentForm';

export default function PostPage() {
  const { id } = useParams();
  const { post, loading: lp }     = usePost(id);
  const { comments, loading: lc, add } = useComments(id);

  if (lp) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (!post) return <Alert variant="danger">Publicación no encontrada.</Alert>;

  const fecha = new Date(post.createdAt).toLocaleDateString();
  const hora  = new Date(post.createdAt).toLocaleTimeString();

  return (
    <>
      {/* ─────────── Detalle del Post ─────────── */}
      <Card className="mb-4 shadow-sm">
        {/* Imagen si existe */}
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

      {/* ─────────── Comentarios ─────────── */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title as="h4" className="mb-3">
            Comentarios ({comments.length})
          </Card.Title>
          {lc
            ? <div className="text-center my-3"><Spinner animation="border" /></div>
            : <CommentList comments={comments} />
          }
        </Card.Body>
      </Card>

      {/* ─────────── Formulario ─────────── */}
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Card.Title as="h4" className="mb-3">Deja tu comentario</Card.Title>
          <CommentForm onSubmit={add} />
        </Card.Body>
      </Card>
    </>
  );
}
