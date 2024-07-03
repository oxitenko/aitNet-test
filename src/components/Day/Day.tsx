import styles from './Day.module.css';
import { Day as IDay } from '../../types/types';
import clsx from 'clsx';
import ToDoList from '../ToDoList/ToDoList';

interface Props extends IDay {
  onOpen: () => void;
}

const Day = ({ day, holiday, isFromOtherMonth, onOpen, id }: Props) => {
  return (
    <li
      onClick={onOpen}
      className={clsx(styles.day, {
        [styles.holiday]: holiday,
        [styles.isFromOtherMonth]: isFromOtherMonth,
      })}
    >
      <div className={styles.date}>
        <p>{day}</p>
        <ToDoList dayId={id as string} isForModal={false} />
      </div>
    </li>
  );
};

export default Day;
