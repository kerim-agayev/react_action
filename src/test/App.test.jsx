import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Todo App', () => {
  test('renders the heading', () => {
    render(<App />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
  })

  test('adds a new todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Buy milk')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  test('toggles a todo as completed', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Learn GitHub Actions')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  test('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Delete me')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    await user.click(screen.getByRole('button', { name: '✕' }))

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
  })

  test('filters active todos', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Task 1')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Task 2')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    // Complete Task 1
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    // Filter active
    await user.click(screen.getByRole('button', { name: 'Active' }))

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  test('shows task count', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Task A')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('1 task left')).toBeInTheDocument()
  })
})
