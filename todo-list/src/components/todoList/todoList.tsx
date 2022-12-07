import React, { useState } from 'react'
import { Todo } from '../../@type/todo.type'
import TaskInput from '../taskInput'
import TaskList from '../taskList'
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }

  const handleCheckbox = (id: any, done: any) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  return (
    <div>
      <TaskInput addTodo={addTodo} />
      <TaskList todos={notDoneTodo} handleCheckbox={handleCheckbox} />
      <TaskList doneTaskList={true} todos={doneTodo} handleCheckbox={handleCheckbox} />
    </div>
  )
}

export default TodoList
