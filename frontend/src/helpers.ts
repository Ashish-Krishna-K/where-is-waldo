import { TCoordinates } from './types';

export const getDistance = (answerCoordinates: TCoordinates, clickedCoordinates: TCoordinates) => {
  const x = clickedCoordinates.x - answerCoordinates.x;
  const y = clickedCoordinates.y - answerCoordinates.y;
  return Math.sqrt(x ** 2 + y ** 2);
};

export const getElapsedTimeForDisplay = (time: number) => {
  const hrs = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = Math.floor(time % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
