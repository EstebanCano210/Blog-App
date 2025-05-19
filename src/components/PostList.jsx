// src/components/PostList.jsx
import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import PostCard       from './PostCard'

export default function PostList({ posts }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {posts.map(p => <PostCard key={p.id} post={p}/>)}
    </SimpleGrid>
  )
}
