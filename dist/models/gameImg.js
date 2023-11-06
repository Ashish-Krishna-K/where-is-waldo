"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const GameImageSchema = new Schema({
    gameName: { type: String, required: true },
    answers: [
        {
            name: { type: String, required: true },
            xAxis: { type: Number, required: true },
            yAxis: { type: Number, required: true },
        },
    ],
    leaderboard: [{ type: Schema.Types.ObjectId, ref: 'Leaderboard' }],
}, {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false },
});
const GameImage = mongoose_1.default.model('GameImage', GameImageSchema);
exports.default = GameImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUltZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvZ2FtZUltZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyxNQUFNLE1BQU0sR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQztBQUUvQixNQUFNLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FDaEM7SUFDRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDMUMsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDdEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1lBQ3ZDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtTQUN4QztLQUNGO0lBQ0QsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ25FLEVBQ0Q7SUFDRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7SUFDN0MsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO0NBQ2hELENBQ0YsQ0FBQztBQUVGLE1BQU0sU0FBUyxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUUvRCxrQkFBZSxTQUFTLENBQUMifQ==