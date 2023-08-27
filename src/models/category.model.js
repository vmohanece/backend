import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    active: {type: Boolean, default: true }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

if (process.env.REINDEX_DB) {
	categorySchema.index({ createdAt: 1 });
	categorySchema.index({ id:1 });
  console.log("category indexing done");
}

const categoryData = mongoose.model("categorydatas", categorySchema);

export default categoryData;