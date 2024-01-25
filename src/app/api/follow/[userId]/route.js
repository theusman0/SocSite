import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
ConnectToDB();
export const POST = async (request, { params }) => {
    const { userId } = params;
    try {
        console.log(userId);
        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "invalid token" })
        }
        if (userId === request.user.id) {
            return NextResponse.json({ success: true, error: "Invalid request" })
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return NextResponse.json({ success: true, error: "user not exists" })
        }
        const newFollowing = {
            id: user.id,
            name: user.name,
            username: user.username,
            pic: user.pic,
            email: user.email
        }
        const follower = await UserModel.findById(request.user.id)
        const newFollower = {
            id: follower.id,
            name: follower.name,
            username: follower.username,
            pic: follower.pic,
            email: follower.email
        }

        const followerList = user.follower.map(follower => follower.id)
        const followingList = follower.following.map(follower => follower.id)
        if (!followerList.includes(request.user.id)) {
            user.follower.push(request.user.id)
            follower.following.push(userId)
        } else {
            user.follower = user.follower.filter(follow => follow.id !== request.user.id);
            follower.following = user.following.filter(follow => follow.id !== request.user.id);
        }
        await user.save();
        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Error" });
    }
}