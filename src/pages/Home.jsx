import React, { useState } from 'react';
import { Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { useCategories } from '../shared/hooks/useCategories';
import { usePosts }      from '../shared/hooks/usePosts';
import PostCard          from '../components/PostCard';

export default function Home() {
  const { cats, loading: catLoading } = useCategories();
  const [filter, setFilter]           = useState('');
  const { posts, loading: postLoading } = usePosts(filter);

  return (
    <>
      <h1 className="mb-4">Publicaciones</h1>

      {catLoading ? (
        <div className="text-center mb-4"><Spinner animation="border" /></div>
      ) : (
        <Form.Select
          className="mb-4"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">Todos los cursos</option>
          {cats.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Form.Select>
      )}

      {postLoading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : posts.length ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {posts.map(p => (
            <Col key={p.id}>
              <PostCard post={p} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No hay publicaciones para mostrar.</Alert>
      )}
    </>
  );
}
