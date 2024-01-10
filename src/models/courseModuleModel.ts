import { Document, Schema, model } from "mongoose";

export interface CourseModuleDocument extends Document {
  course: Schema.Types.ObjectId;
  sections: Schema.Types.ObjectId[];
}

const CourseModuleSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: "ModuleSection",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<CourseModuleDocument>("CourseModule", CourseModuleSchema);
