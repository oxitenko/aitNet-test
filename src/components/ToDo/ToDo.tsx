import clsx from 'clsx';
import styles from './ToDo.module.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useTasksStore from '../../store/tasksStore';

interface Props {
  task: string;
  isForModal?: boolean;
  id?: string;
}

const ToDo = ({ task, isForModal, id }: Props) => {
  const deleteTask = useTasksStore((state) => state.deleteTask);

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  return (
    <li className={clsx(styles.toDo, { [styles.isForModal]: isForModal })}>
      {isForModal && (
        <label className={styles.toDoLabel}>
          <input type="checkbox" className={styles.toDoCheckbox} />
        </label>
      )}
      <p className={styles.toDoText}>
        {!isForModal && <span className={styles.toDoDot} />}
        {task}
      </p>
      {isForModal && (
        <button
          className={styles.toDoDelete}
          onClick={() => handleDelete(id as string)}
        >
          <RiDeleteBin6Line />
        </button>
      )}
    </li>
  );
};

export default ToDo;
