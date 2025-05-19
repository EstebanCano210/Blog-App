// src/components/PostDetail.jsx
import React from 'react'
import { Box, Heading, Text, Divider } from '@chakra-ui/react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default function PostDetail({ post, comments, loading, onAddComment }) {
  if (loading || !post) {
    return <Text>Cargando...</Text>
  }

  return (
    <Box>
      <Heading mb={2}>{post.title}</Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        Publicado el {new Date(post.createdAt).toLocaleDateString()} en <strong>{post.category.name}</strong>
      </Text>
      <Text mb={6}>{post.description}</Text>
      <Divider mb={6}/>
      <Heading size="md" mb={4}>Comentarios ({comments.length})</Heading>
      <CommentList comments={comments} />
      <Divider my={6}/>
      <Heading size="md" mb={4}>Deja tu comentario</Heading>
      <CommentForm onSubmit={onAddComment} />
    </Box>
  )
}
