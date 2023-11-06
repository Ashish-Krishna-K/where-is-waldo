import mongoose from 'mongoose';
import connectDb from './src/database';
import GameImage from './src/models/gameImg';

const addEntry = async () => {
  try {
    const pokemonImg = new GameImage({
      gameName: 'pokemon',
      answers: [
        {
          name: 'magnemite',
          xAxis: 234,
          yAxis: 36,
        },
        {
          name: 'weepinbell',
          xAxis: 151,
          yAxis: 566,
        },
        {
          name: 'zubat',
          xAxis: 327,
          yAxis: 434,
        },
      ],
    });
    await pokemonImg.save();
    console.log('pokemon gameImg id: ', pokemonImg.id, 'answers: ', pokemonImg.answers);
    const onepieceImg = new GameImage({
      gameName: 'one piece',
      answers: [
        {
          name: 'zoro',
          xAxis: 477,
          yAxis: 74,
        },
        {
          name: 'momonosuke',
          xAxis: 118,
          yAxis: 741,
        },
        {
          name: 'aokiji',
          xAxis: 643,
          yAxis: 718,
        },
      ],
    });
    await onepieceImg.save();
    console.log('onepiece gameImg id: ', onepieceImg.id, 'answers: ', onepieceImg.answers);
    const classicImg = new GameImage({
      gameName: 'classic',
      answers: [
        {
          name: 'wally',
          xAxis: 322,
          yAxis: 511,
        },
        {
          name: 'wenda',
          xAxis: 230,
          yAxis: 421,
        },
        {
          name: 'odlaw',
          xAxis: 42,
          yAxis: 571,
        },
      ],
    });
    await classicImg.save();
    console.log('classic gameImg id: ', classicImg.id, 'answers: ', classicImg.answers);
    mongoose.connection.close(true);
  } catch (error) {
    console.error(error);
  }
};

connectDb();
addEntry();

