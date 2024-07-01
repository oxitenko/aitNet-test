import styles from './Header.module.css';
import { year } from '../../utils/moment';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>ToDo Calendar for {year} year</h1>
    </header>
  );
};

export default Header;
