import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    code: Number,
    name: String,
    description: String
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema)