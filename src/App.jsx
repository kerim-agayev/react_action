import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  function addTodo(text) {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }])
  }

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <FilterBar filter={filter} onFilter={setFilter} />
      <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />
      <div className="footer">
        <span>{activeCount} task{activeCount !== 1 ? 's' : ''} left</span>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  )
}
