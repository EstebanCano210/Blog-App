import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" py={6} textAlign="center" bg="gray.100" _dark={{ bg: 'gray.900' }}>
      <Text color="gray.600" _dark={{ color: 'gray.400' }}>
        © {new Date().getFullYear()} Blog Académico. Hecho con ❤️ y React.
      </Text>
    </Box>
  )
}