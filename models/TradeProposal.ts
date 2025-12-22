import mongoose, { Schema, models, model } from "mongoose";

const TradeProposalSchema = new Schema(
  {
    fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    offeredSkillId: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    requestedSkillId: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    message: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DECLINED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default models.TradeProposal ||
  model("TradeProposal", TradeProposalSchema);