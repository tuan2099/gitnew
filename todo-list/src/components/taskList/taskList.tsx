import { Todo } from '../../@type/todo.type'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleCheckbox: (id: any, done: any) => void
}
function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleCheckbox } = props

  const onChangeCheckbox = (idTodo: any) => (e: any) => {
    handleCheckbox(idTodo, e.target.checked)
  }

  return (
    <>
      <h2>{doneTaskList ? 'hoàn thành' : 'chưa hoàn thành'}</h2>
      <ul>
        {todos.map((todo) => {
          return (
            <>
              <li key={todo.id}>
                <input type='checkbox' checked={todo.done} onChange={onChangeCheckbox(todo.id)} />
                <span>{todo.name}</span>
                <button>sửa</button>
                <button>xóa</button>
              </li>
            </>
          )
        })}
      </ul>
    </>
  )
}

export default TaskList
