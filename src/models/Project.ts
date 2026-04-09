import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    technologies: string[];
    githubLink: string;
    liveLink: string;
    image: string;
    createdAt: Date;
}

const projectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        technologies: [{ type: String, required: true }],
        githubLink: { type: String, default: '' },
        liveLink: { type: String, default: '' },
        image: { type: String, default: '' },
    },
    { timestamps: true }
);

projectSchema.index({ createdAt: -1 });

export default mongoose.model<IProject>('Project', projectSchema);
