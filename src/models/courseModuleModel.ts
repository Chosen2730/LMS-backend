import { Document, Schema, model } from "mongoose";

export interface CourseModuleDocument extends Document {
  course: Schema.Types.ObjectId;
  sections: Schema.Types.ObjectId[];
  moduleName: string;
}

const CourseModuleSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    moduleName: {
      type: String,
      required: [true, "Please enter a module name"],
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
