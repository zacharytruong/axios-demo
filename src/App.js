import './App.css';
import api from './api/posts';
import uniqid from 'uniqid';
import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [postId, setPostId] = useState('');

  const newPost = async (id, title, author) => {
    try {
      const post = {
        id,
        title,
        author
      };
      const res = await api.post('/posts', post);
      setPosts([...posts, res.data]);
    } catch (err) {
      // Not in 200 response range
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.error(`Error: ${err.message}`);
      }
    }
  };
  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
    } catch (err) {
      // Not in 200 response range
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.error(`Error: ${err.message}`);
      }
    }
  };

  const updatePost = async (id, title, author) => {
    try {
      const newPost = {
        id,
        title,
        author
      };
      const res = await api.put(`/posts/${id}`, newPost);
      setPosts(posts.map((post) => (post.id === id ? { ...res.data } : post)));
      setNewAuthor('');
      setNewTitle('');
      setPostId('');
    } catch (err) {
      // Not in 200 response range
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.error(`Error: ${err.message}`);
      }
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    await updatePost(postId, newTitle, newAuthor)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        // Not in 200 response range
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        } else {
          console.error(`Error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>App</h1>
      <button
        onClick={() => {
          newPost(uniqid(), uniqid(), uniqid());
        }}
      >
        Add new post
      </button>
      <button onClick={() => deletePost('l6e1q996')}>
        Delete post l6e1q997
      </button>
      <form onSubmit={handleEditPost}>
        <label htmlFor="title">Title</label>
        <input
          value={newTitle}
          type="text"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label htmlFor="author">Author</label>
        <input
          value={newAuthor}
          type="text"
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <label htmlFor="post-id">Post ID</label>
        <input
          value={postId}
          type="text"
          onChange={(e) => setPostId(e.target.value)}
        />
        <button>Edit Post</button>
      </form>
      {posts.map((post) => (
        <div key={post.id}>
          <p>ID: {post.id}</p>
          <p>{post.title}</p>
          <p style={{ fontStyle: 'italic' }}>{post.author}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
