import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Post from "@/models/Post";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

ConnectToDB();

export const GET = async (request) => {
    try {
        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "Invalid token" });
        }

        const userId = request.user.id;
        const user = await UserModel.findById(userId);

        let posts = await Post.find({
            user: { $in: [user.id] }
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "user likes",
                select: "email username name pic",
            });


        if (posts.length === 0) {
            posts = await Post.aggregate([
                { $match: { user: user.id } },
                { $sample: { size: 7 } },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $unwind: "$userDetails"
                },
                {
                    $project: {
                        _id: 1,
                        caption: 1,
                        content: 1,
                        image: 1,
                        video: 1,
                        likes: 1,
                        comment: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        user: {
                            _id: "$userDetails._id",
                            email: "$userDetails.email",
                            username: "$userDetails.username",
                            name: "$userDetails.name",
                            pic: "$userDetails.pic"
                        }
                    }
                },
            ]);
        }

        return NextResponse.json({ success: true, posts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
};
