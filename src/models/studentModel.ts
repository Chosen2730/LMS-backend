import { Document, Schema, model } from "mongoose";

export interface StudentDocument extends Document {
  firstName: string;
  matricNo: string;
  lastName: string;
  isActive: boolean;
}

const StudentSchema = new Schema(
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

    matricNo: {
      type: String,
      required: [true, "Matric no is required"],
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    currentLevel: {
      enum: ["100", "200", "300", "400", "500", "600"],
      default: "100",
      type: String,
    },
    faculty: String,
    department: String,
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

export default model<StudentDocument>("Student", StudentSchema);
