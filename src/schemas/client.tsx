import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
const { Schema } = mongoose;

const clientSchema = new Schema({
    code: Number,
    image: { type: String, default: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    cpf: { type: Number, required: true },
    creditcard: { type: Number, required: true, select: false },
    cvc: { type: Number, required: true, select: false },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false }
});

clientSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password!, 10);
    this.password = hash;
    next();
});

export default mongoose.models.Client || mongoose.model("Client", clientSchema)