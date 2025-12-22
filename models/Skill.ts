import mongoose, { Schema, models, model } from "mongoose";

const SkillSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["OFFER", "REQUEST"], required: true },
  },
  { timestamps: true }
);

export default models.Skill || model("Skill", SkillSchema);