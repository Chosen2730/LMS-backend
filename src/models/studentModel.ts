import mongoose, { Document, Schema, model } from "mongoose";

export interface StudentDocument extends Document {
  first_name: string;
  matric_no: string;
  last_name: string;
  is_active: boolean;
}

const StudentSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
    },
    matric_number: {
      type: String,
      required: [true, "Matric no is required"],
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<StudentDocument>("Student", StudentSchema);
