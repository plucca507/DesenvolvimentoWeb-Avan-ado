import mongoose from 'mongoose';
const { Schema } = mongoose;

const requestSchema = new Schema({
    code: Number,
    price: Number,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    date: { type: Date, required: false, default: Date.now() },
    status: { type: String, default: "Aguardando Pagamento" }
});

export default mongoose.models.Request || mongoose.model("Request", requestSchema)