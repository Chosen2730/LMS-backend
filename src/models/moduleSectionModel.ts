import { Document, Schema, model } from "mongoose";

export interface ModuleSectionDocument extends Document {
  lectureName: string;
  resource: { resourceId: string; url: string };
  module: Schema.Types.ObjectId;
}

const ModuleSectionSchema = new Schema(
  {
    lectureName: {
      type: String,
      required: [true, "lecture name is required"],
    },
    resource: {
      resourceId: String,
      url: String,
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "CourseModule",
      required: [true, "Course module ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<ModuleSectionDocument>(
  "ModuleSection",
  ModuleSectionSchema
);
