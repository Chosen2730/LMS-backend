import { Document, Schema, model } from "mongoose";

export interface LecturerDocument extends Document {
  firstName: string;
  lastName: string;
  isActive: boolean;
  title: string;
}

const LecturerSchema = new Schema(
  {
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      required: [true, "Email is required"],
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    title: String,

    profilePhoto: {
      imageURL: String,
      id: String,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "enter a valid user ID"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<LecturerDocument>("Lecturer", LecturerSchema);
