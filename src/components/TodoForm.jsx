import { useState } from 'react'
import './TodoForm.css'

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task..."
        autoFocus
      />
      <button type="submit">Add</button>
    </form>
  )
}
