import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    code: Number,
    author: String,
    rate: Number,
    content: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

export default mongoose.models.Review || mongoose.model("Review", reviewSchema)