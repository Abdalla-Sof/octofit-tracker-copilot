import mongoose, { Schema } from 'mongoose';

const WorkoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() }
});

export default mongoose.model('Workout', WorkoutSchema);
