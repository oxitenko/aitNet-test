import styles from './Main.module.css';
import { useGetYearCalendar } from '../../hooks/useGetYearCalendar';
import Calendar from '../Calendar/Calendar';
import Header from '../Header/Header';

const Main = () => {
  const { yearCalendar } = useGetYearCalendar();
  console.log(yearCalendar);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Calendar yearCalendar={yearCalendar} />
      </main>
    </>
  );
};

export default Main;
