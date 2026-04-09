import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    level: number;
}

const skillSchema = new Schema<ISkill>(
    {
        name: { type: String, required: true, trim: true, unique: true },
        level: { type: Number, required: true, min: 0, max: 100 },
    },
    { timestamps: true }
);

export default mongoose.model<ISkill>('Skill', skillSchema);
