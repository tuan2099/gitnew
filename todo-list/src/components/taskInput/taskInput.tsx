import React, { useState } from 'react'

interface TaskInputProps {
  addTodo: (name: string) => void
}

function TaskInput(props: TaskInputProps) {
  const { addTodo } = props
  const [name, setName] = useState<string>('')
  const handleSubmit = (e: any) => {
    e.preventDefault()
    addTodo(name)
    setName('')
  }

  const handleChange = (e: any) => {
    const { value } = e.target
    setName(value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder='nhập thông tin' type='text' onChange={handleChange} value={name} />
        <button type='submit'>+</button>
      </form>
    </>
  )
}

export default TaskInput
