import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.Number,
      required: true,
      ref: 'categorydatas'
    },
    price: { type: Number, required: true },
    offerPrice: {type: Number},
    code: { type: String, required: true },
    desc: { type: String, required: true },
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

if (process.env.REINDEX_DB) {
	productsSchema.index({ createdAt: 1 });
  console.log("products indexing done");
}

const productsData = mongoose.model("productsdatas", productsSchema);

export default productsData;