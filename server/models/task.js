import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
  description: {
    required: true,
    type: String,
  },
  priority: {
    default: "thấp",
    enum: ["thấp", "trung bình", "cao"],
    required: true,
    type: String,
  },
  status: {
    default: "chưa bắt đầu",
    enum: ["chưa bắt đầu", "đang thực hiện", "hoàn thành"],
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
