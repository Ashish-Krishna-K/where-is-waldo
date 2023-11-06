import styles from './Spinner.module.css';

const Spinner = () => {
  return <div className={styles.loadingContainer} aria-description="Loading..."></div>;
};

export default Spinner;
