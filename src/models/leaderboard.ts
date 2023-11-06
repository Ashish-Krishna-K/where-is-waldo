import mongoose, {InferSchemaType} from 'mongoose';

const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema(
  {
    displayName: { type: String, default: 'Anonymous Player' },
    completionTime: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false },
  },
);

export interface ILeaderboardSchema extends InferSchemaType<typeof LeaderboardSchema> {}

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);

export default Leaderboard;
