import { ReactNode } from 'react';

export type TGameImgAnswerData = {
  name: string;
  xAxis: number;
  yAxis: number;
  _id: string;
  id: string;
};

export type TGameImgData = {
  _id: string;
  gameName: string;
  answers: TGameImgAnswerData[];
  id: string;
};

export type TPlayGameLoaderData = {
  gameImg: TGameImgData;
};

export type TCoordinates = {
  x: number;
  y: number;
};

export type TModalProps = { shouldOpen: boolean; children: ReactNode };

export type TSubmitScoreProps = { completionTime: number };

export type TImgsId = { _id: string; gameName: string; id: string };

export type TGameMenuLoaderData = {
  allImgsId: TImgsId[];
};

export type TLeaderboardData = {
  completionTime: number;
  displayName: string;
  id: string;
  _id: string;
};

export type TLeaderboardLoaderData = {
  gameName: string;
  leaderboard: TLeaderboardData[];
};
