import React from 'react'
import TaskInput from '../taskInput'
import TaskList from '../taskList'
function TodoList() {
  return (
    <div>
      <TaskInput />
      <TaskList doneTaskList={true} />
    </div>
  )
}

export default TodoList
