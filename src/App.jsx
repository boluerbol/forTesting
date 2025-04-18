import './App.css'

// src/App.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

// Backend API endpoint (adjust if your port is different)
const API = 'http://localhost:8000/api/posts/'

function App() {
  // State to hold posts fetched from backend
  const [posts, setPosts] = useState([])

  // State to handle form input
  const [form, setForm] = useState({ title: '', content: '' })

  // Load posts when the app starts
  useEffect(() => {
    axios.get(API)
      .then(res => setPosts(res.data))
      .catch(err => console.error("Error fetching posts:", err))
  }, [])

  // Create a new post
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(API, form)
      setPosts([...posts, res.data])  // add new post to the list
      setForm({ title: '', content: '' })  // clear the form
    } catch (err) {
      console.error("Error creating post:", err)
    }
  }

  // Delete a post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${API}${id}/`)
      setPosts(posts.filter(p => p.id !== id))  // remove from UI
    } catch (err) {
      console.error("Error deleting post:", err)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📘 My Blog Posts</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>Add</button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '10px' }}>
            <strong>{post.title}</strong>: {post.content}
            <button
              onClick={() => deletePost(post.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
