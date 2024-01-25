"use client";
import Image from "next/image";
// import styles from "./page.module.css";
import RightSidebar from "@/Components/RightSidebar/RightSidebar";
import LeftSidebar from "@/Components/LeftSidebar/LeftSidebar";
import { Box } from "@chakra-ui/react";
import PostCard from "@/Components/PostCard/PostCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [posts, setPosts] = useState()
    const fetchUserPost = async () => {
        try {
            const response = await fetch('/api/post/feed', {
                headers: {
                    "token": localStorage.getItem('token')
                },
            })
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setPosts(data.posts)
                console.log(data);

            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Frroe',
                description: "Error to send data",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }
    useEffect(() => {
        return async () => {
            if (!localStorage.getItem('token')) {
                router.push('/login')
            }
            await fetchUserPost();
        }
    }, [])
    return (
        <main
            style={{display: 'flex'}}
        >
            <LeftSidebar />
            <Box width={{ base: "90%", md: "80%", xl: "40%" }}
                padding="15px"
                height={"88vh"}
                overflow={"scroll"}

            >

                {posts && posts.map((post) => {

                    return <PostCard post={post} />
                })
                }

            </Box>
            <RightSidebar />
        </main>
    );
}


