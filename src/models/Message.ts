import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        subject: { type: String, required: true, trim: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

messageSchema.index({ createdAt: -1 });

export default mongoose.model<IMessage>('Message', messageSchema);
