import mongoose from 'mongoose';
const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  topic: String,
  questions: Array,
  answers: Array,
  score: Number
}, { timestamps:true });
export default mongoose.model('QuizAttempt', quizAttemptSchema);
