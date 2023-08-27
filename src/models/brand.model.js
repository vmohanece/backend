import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    filename: { type: String, required: true },
    active: {type: Boolean, default: true }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

if(process.env.REINDEX_DB) {
	brandSchema.index({ createdAt: 1 });
	brandSchema.index({ id:1 });
  console.log("brand indexing done");
}

const brandData = mongoose.model("branddatas", brandSchema);

export default brandData;