import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api';
import { Container, List, ListItem, ListItemText, TextField } from '@mui/material';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <List>
        {filteredPosts.map(post => (
          <ListItem key={post.id}>
            <ListItemText primary={post.title} secondary={post.body} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostList;
