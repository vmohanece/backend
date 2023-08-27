import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

if (process.env.REINDEX_DB) {
	vehicleSchema.index({ createdAt: 1 });
	vehicleSchema.index({ id:1 });
  console.log("vehicle indexing done");
}

const vehicleData = mongoose.model("vehicledatas", vehicleSchema);

export default vehicleData;