import { Document, Schema, model } from "mongoose";

export interface CourseDocument extends Document {
  createdBy: Schema.Types.ObjectId;
  title: string;
  courseCode: string;
  category: string;
  level: string;
  duration: string;
  thumbnail: {
    url: string;
    imageId: string;
  };
  trailer: {
    url: string;
    videoId: string;
  };
  description: string;
  what_you_will_teach: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  targetAudience: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  courseRequirement: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  courseModules: Schema.Types.ObjectId;
  welcomeMessage: string;
  congratulationsMessage: string;
  instructors: Schema.Types.ObjectId[];
  enrolledStudents: Schema.Types.ObjectId[];
}

const CourseSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "enter a valid user ID"],
    },
    enrolledStudents: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    title: {
      type: String,
      required: [true, "title field is required"],
    },
    courseCode: {
      type: String,
      required: [true, "course code field is required"],
    },
    category: {
      type: String,
      required: [true, "course category field is required"],
      enum: [
        "School work",
        "Business",
        "Finance & Accounting",
        "IT & Software",
        "Personal Development",
        "Office Productivity",
        "Marketing",
        "Photography & Video",
        "Lifestyle",
        "Design",
        "Health & Fitness",
        "Music",
      ],
    },

    level: {
      required: [true, "course level field is required"],
      enum: ["100", "200", "300", "400", "500", "600"],
      type: String,
    },

    duration: {
      type: String,
    },

    thumbnail: {
      url: String,
      imageId: String,
    },

    trailer: {
      url: String,
      videoId: String,
    },

    description: String,
    what_you_will_teach: {
      item1: String,
      item2: String,
      item3: String,
      item4: String,
    },
    targetAudience: {
      item1: String,
      item2: String,
      item3: String,
      item4: String,
    },
    courseRequirement: {
      item1: String,
      item2: String,
      item3: String,
      item4: String,
    },
    courseModules: {
      type: Schema.Types.ObjectId,
      ref: "CourseModules",
    },
    welcomeMessage: String,
    congratulationsMessage: String,
    instructors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default model<CourseDocument>("Course", CourseSchema);
