import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  tasks: [
    {
      ref: "Task",
      type: Schema.Types.ObjectId,
    },
  ],
  username: {
    required: true,
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
