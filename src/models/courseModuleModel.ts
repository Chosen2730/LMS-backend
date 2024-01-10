import { Document, Schema, model } from "mongoose";

export interface CourseModuleDocument extends Document {
  course: Schema.Types.ObjectId;
  sections: {
    lectureName: string;
    resource: { resourceId: string; url: string };
  }[];
}

const CourseModuleSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "course id is required"],
    },
    sections: [
      {
        lectureName: {
          type: String,
          required: [true, "lecture name is required"],
        },
        resource: {
          resourceId: String,
          url: String,
          required: [true, "resource is required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<CourseModuleDocument>("CourseModule", CourseModuleSchema);
