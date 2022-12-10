import React, { useState } from 'react'
import { Todo } from '../../@type/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  curentTodo: Todo | null
  editTodo: (name: string) => void
  finishTodo: () => void
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, curentTodo, editTodo, finishTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (curentTodo) {
      finishTodo()
      if (name) return setName('')
    } else {
      addTodo(name)
    }
    setName('')
  }

  const handleChange = (e: any) => {
    const { value } = e.target
    if (curentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='nhập thông tin'
          type='text'
          onChange={handleChange}
          value={curentTodo ? curentTodo.name : name}
        />
        <button type='submit'>{curentTodo ? 'Sửa' : 'Thêm'}</button>
      </form>
    </>
  )
}

export default TaskInput
