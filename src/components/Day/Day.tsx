import styles from './Day.module.css';
import { Day as IDay } from '../../types/types';
import clsx from 'clsx';

const Day = ({ day, holiday, isFromOtherMonth }: IDay) => {
  return (
    <li
      className={clsx(styles.day, {
        [styles.holiday]: holiday,
        [styles.isFromOtherMonth]: isFromOtherMonth,
      })}
    >
      <div className={styles.date}>
        <p>{day}</p>
      </div>
    </li>
  );
};

export default Day;
