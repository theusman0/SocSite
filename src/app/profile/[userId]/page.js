"use client"

import LeftSidebar from '@/Components/LeftSidebar/LeftSidebar';
import PostCard from '@/Components/PostCard/PostCard';
import RightSidebar from '@/Components/RightSidebar/RightSidebar';
import SideProfile from '@/Components/SideProfile/SideProfile';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'


import { fetchUser } from '@/Helper/config';
import { useRouter } from 'next/navigation';

export default function page(parmas) {
    const router = useRouter()
    const toast = useToast()
    const { userId } = parmas.params;
    const [user, setUser] = useState();
    const [mUser, setmUser] = useState()
    const fetchMUser = async () => {
        try {
            const response = await fetch('/api/user/getuser/' + userId, {
                headers: {
                    "token": localStorage.getItem('token')
                },

            })
            const data = await response.json();
            if (data.success) {
                setUser(data.user)
                console.log(data);
            }
            else {
                router.push('/error')
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
    const [posts, setPosts] = useState([]);
    const fetchUserPost = async () => {
        try {
            console.log("Heelo")
            const response = await fetch('/api/post/getposts/' + userId, {
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
            await fetchMUser();
            const u = await fetchUser();
            setmUser(u)
        }
    }, [])
    return (
        <Box
            display={"flex"}
        >
            <LeftSidebar />
            <Box width={{ base: "90%", md: "80%", xl: "40%" }}
                padding="15px"
                height={"88vh"}
                overflow={"scroll"}
            >
                <Box
                    marginBottom={"70px"}
                >
                    {user && <SideProfile width={500} height={400} profileHeight={150} profileWidth={150} isProfile={false} top={75} marginTop={0} user={user} />}
                </Box>
                <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Text
                        fontSize={"30px"}
                        fontWeight={"bold"}
                        color={"#344502"}
                    >
                        {user && user.name}
                    </Text>
                    <Text
                        fontSize={"30px"}
                        color={"#AFAF02"}
                    >
                        {user && user.username}
                    </Text>
                    <Text >
                        {user && user.Bio}
                    </Text>
                </Box>
                {
                    user && mUser && user.username === mUser.username &&
                    <Button
                        colorScheme={'teal'}
                        margin={"10px 0px "}
                        width={"100%"}
                        onClick={() => {
                            router.push('/profile-edit-page')
                        }}
                    >
                        Edit Prfile
                    </Button>}
                <hr /><hr />
                {posts && posts.map((post) => {
                    
                    return <PostCard post={post}/>
                })
                }
            </Box>
            <RightSidebar />
        </Box>
    )
}
