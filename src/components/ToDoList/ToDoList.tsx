import styles from './ToDoList.module.css';
import useTasksStore from '../../store/tasksStore';
import ToDo from '../ToDo/ToDo';

interface Props {
  dayId: string;
  isForModal?: boolean;
}

const ToDoList = ({ dayId, isForModal = true }: Props) => {
  const tasks = useTasksStore((state) => state.tasks);

  if (!tasks.length) {
    return null;
  }

  const filteredTasks =
    tasks.find((task) => task.idDay === dayId)?.tasksForDay ?? [];

  console.log(tasks, filteredTasks);

  return (
    <ul className={styles.toDoList}>
      {filteredTasks.map((task) => (
        <ToDo
          key={task.id}
          task={task.text}
          isForModal={isForModal}
          id={task.id}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
