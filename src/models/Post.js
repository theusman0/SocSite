
import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    caption: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    comment: {
        type: [mongoose.Schema.Types.Mixed],
    }
}, {
    timestamps: true,
});

let Post;

try {
    Post = mongoose.model('Post');
} catch (error) {
    Post = mongoose.model('Post', postSchema);
}

export default Post;

