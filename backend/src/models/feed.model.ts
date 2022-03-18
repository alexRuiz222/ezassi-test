import { Schema, model } from "mongoose";

const FeedSchema = new Schema({
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    title: {
        type: String,
        required: [true, 'The title is obligatory']
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
},
    {
        timestamps: {
            updatedAt: 'update_at', createdAt: 'created_at'
        },
        collection: 'movies'
    }
);

FeedSchema.methods.toJSON = function () {
    const { __v, ...movie } = this.toObject();
    return movie;
}

export default model('Feed', FeedSchema);