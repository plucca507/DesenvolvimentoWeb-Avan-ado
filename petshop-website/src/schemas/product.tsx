import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    code: Number,
    name: String,
    image: String,
    description: String,
    cover: String,
    price: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    animal: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    stock: { type: Number, required: false, default: 0 }
});

export default mongoose.models.Product || mongoose.model("Product", productSchema)