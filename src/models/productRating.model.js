import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productRatingSchema = new Schema(
  {
    productId: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'productsdatas' 
    },
    userId: { type: mongoose.Schema.Types.String,
      required: true,
      ref: 'users'
    },
    rating: { type: Number, required: true },
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
	productRatingSchema.index({ createdAt: 1 });
	productRatingSchema.index({ productId:1 });
  console.log("productRating indexing done");
}

const productRatingData = mongoose.model("productratingdatas", productRatingSchema);

export default productRatingData;