import React, { useState } from 'react'
import { Todo } from '../../@type/todo.type'
import TaskInput from '../taskInput'
import TaskList from '../taskList'

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [curentTodo, setCurentTodo] = useState<null | Todo>(null)
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

  const startEditTodo = (id: any) => {
    const findTodo = todos.find((todo) => todo.id === id)
    if (findTodo) {
      setCurentTodo(findTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === curentTodo?.id) {
          return curentTodo as Todo
        }
        return todo
      })
    })
    setCurentTodo(null)
  }

  const deleteTodo = (id: any) => {
    setTodos((prev) => {
      const findIndexTodo = prev.findIndex((todo) => todo.id === id)
      if (findIndexTodo > -1) {
        const result = [...prev]
        result.splice(findIndexTodo, 1)
        return result
      }
      return prev
    })
  }
  return (
    <div>
      <TaskInput addTodo={addTodo} curentTodo={curentTodo} editTodo={editTodo} finishTodo={finishTodo} />
      <TaskList
        todos={notDoneTodo}
        handleCheckbox={handleCheckbox}
        startEditTodo={startEditTodo}
        deleteTodo={deleteTodo}
      />
      <TaskList
        doneTaskList={true}
        todos={doneTodo}
        handleCheckbox={handleCheckbox}
        startEditTodo={startEditTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}

export default TodoList
