import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"  
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let Comment;

try {
    Comment = mongoose.model('Comment');
} catch (error) {
    Comment = mongoose.model('Comment', CommentSchema);
}

export default Comment
