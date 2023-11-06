import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GameImageSchema = new Schema(
  {
    gameName: { type: String, required: true },
    answers: [
      {
        name: { type: String, required: true },
        xAxis: { type: Number, required: true },
        yAxis: { type: Number, required: true },
      },
    ],
    leaderboard: [{ type: Schema.Types.ObjectId, ref: 'Leaderboard' }],
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false },
  },
);

const GameImage = mongoose.model('GameImage', GameImageSchema);

export default GameImage;
