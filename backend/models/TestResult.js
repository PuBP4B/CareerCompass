import mongoose from 'mongoose';
const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  mbti: String,
  aptitude: Object,
  basicScore: Number,
}, { timestamps:true });
export default mongoose.model('TestResult', testResultSchema);
