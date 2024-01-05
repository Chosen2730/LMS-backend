import { Document, Schema, model } from "mongoose";

export interface TutorDocument extends Document {
  user: Schema.Types.ObjectId;
}

const TutorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "enter a valid user ID"],
    },
    status: {
      enum: ["pending", "approved", "revoked"],
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model<TutorDocument>("Tutor", TutorSchema);
