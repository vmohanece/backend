import mongoose from "mongoose";

const Schema = mongoose.Schema;

const salesSchema = new Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users' 
    },
    paymentId: { type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'payments' 
    },
    amt: {type: String, required: true}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

if (process.env.REINDEX_DB) {
	salesSchema.index({ createdAt: 1 });
	salesSchema.index({ productId:1 });
  console.log("salesSchema indexing done");
}

const salesData = mongoose.model("salesdatas", salesSchema);

export default salesData;