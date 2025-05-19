import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout   from './components/Layout';
import Home     from './pages/Home';
import PostPage from './pages/PostPage';
import NotFound from './pages/NotFound';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
