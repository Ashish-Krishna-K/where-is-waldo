import { Form, useNavigation } from 'react-router-dom';
import type { TSubmitScoreProps } from '../../types';
import styles from './SubmitScore.module.css';

const SubmitScore = ({ completionTime }: TSubmitScoreProps) => {
  const { state } = useNavigation();
  return (
    <Form method="post" className={styles.form}>
      <h3>Congrats!!! You completed in {completionTime} seconds.</h3>
      <label htmlFor="name">Please provide a display name for the leaderboard</label>
      <input type="text" name="name" id="name" />
      <input type="hidden" name="time" value={completionTime} />
      <button type="submit" disabled={state === 'submitting'}>
        Submit
      </button>
    </Form>
  );
};

export default SubmitScore;
