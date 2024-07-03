import styles from './Form.module.css';
import { useFormik } from 'formik';
import useTasksStore from '../../store/tasksStore';
import { IoAdd } from 'react-icons/io5';

interface Props {
  dayId: string;
}

const Form = ({ dayId }: Props) => {
  const tasks = useTasksStore((state) => state.addTask);

  const validate = (values: { task: string }) => {
    const errors: { [key: string]: string } = {};
    if (!values.task) {
      errors.task = 'Required';
    } else if (values.task.length < 2) {
      errors.task = 'Must be 2 characters or more';
    } else if (values.task.length > 20) {
      errors.task = 'Must be 20 characters or less';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      task: '',
    },
    onSubmit: (values) => {
      if (values.task.trim() === '') return;
      tasks(values.task, dayId);
      formik.resetForm();
    },
    validate,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formInputWrapper}>
          <input
            id="task"
            name="task"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.task}
            placeholder="Enter your task"
            className={styles.formInput}
          />
          <button className={styles.formButton} type="submit">
            <IoAdd style={{ fontSize: '25px', color: 'white' }} />
          </button>
        </div>
        {formik.errors.task ? (
          <div className={styles.formError}>{formik.errors.task}</div>
        ) : null}
      </form>
    </>
  );
};

export default Form;
