import ConnectToDB from "@/Helper/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';

ConnectToDB();

export const POST = async (request) => {
    try {
        const { email, password, name, username } = await request.json();
        console.log(email, password, name, username);

        if (!email || !isValidEmail(email)) {
            return NextResponse.json({ success: false, error: "Invalid email format" });
        }

        if (!name || !isValidName(name)) {
            return NextResponse.json({ success: false, error: "Invalid name" });
        }

        if (!username || !isValidUsername(username)) {
            return NextResponse.json({ success: false, error: "Invalid username" });
        }

        let user = await UserModel.findOne({ email: email })
        if (user) {
            return NextResponse.json({ success: false, error: "Email already found" });
        }
        let user2 = await UserModel.findOne({ username: username })
        if (user2) {
            return NextResponse.json({ success: false, error: "username already found" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassed = await bcrypt.hash(password, salt);
        console.log(hashedPassed)
        const confirmationToken = uuidv4();
        let user3 = await UserModel.create({
            email,
            name,
            username,
            password: hashedPassed,
            confirmationToken: confirmationToken
        })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EmailPassword
            }
        });

        const confirmationLink = `http:localhost:3000/confirm/${confirmationToken}`;
        const mailOptions = {
            from: 'noreply@socsite.com',
            to: email,
            subject: 'Confirm Your Email',
            text: `Click the following link to confirm your email: ${confirmationLink} \n Your Confirmation code is ${confirmationToken}`
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidName(name) {
    return name.trim().length > 0;
}

function isValidUsername(username) {
    return username.trim().length > 0 && username.length <= 20; 
}
