import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Bio: {
        type: String,
    },
    pic: {
        type: String,
        default: ""
    },
    bgPic: {
        type: String,
    },
    confirmationToken: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    following: {
        type: [mongoose.Schema.Types.Mixed],
        ref:"User"
    },
    follower: {
        type: [mongoose.Schema.Types.Mixed],
    }
}, {
    timestamps: true, 
});


const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);


export default UserModel;
