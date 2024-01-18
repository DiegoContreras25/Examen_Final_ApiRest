import mongoose from "npm:mongoose@7.6.3";
import { algo } from "../types.ts";

const Schema = mongoose.Schema;

const algoSchema = new Schema(
  {
    name: { type: String, required: true },
    algo: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "algo",
      required: true,
    },
  },
  { timestamps: true },
);

export type algoModelType = mongoose.Document & Omit<algo, "id">;

export default mongoose.model<algoModelType>("algo", algoSchema);
