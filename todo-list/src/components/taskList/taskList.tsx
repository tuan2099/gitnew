import React from 'react'
interface TaskListProps {
  doneTaskList?: boolean
}
function TaskList(props: TaskListProps) {
  const { doneTaskList } = props
  return (
    <>
      <h2>List item</h2>
      <ul>
        <li>
          <input type='checkbox' />
          <span>name</span>
          <button>sửa</button>
          <button>xóa</button>
        </li>
      </ul>
    </>
  )
}

export default TaskList
