"use client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Upload } from "./Helper/AddFile";

export function middleware(request) {
    // if (!localStorage.getItem("token")) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }
    NextResponse.next();
}

export const config = {
    // matcher: ['/', '/profile/:path*', '/addpost', '/addpost/addimagepost']
};
