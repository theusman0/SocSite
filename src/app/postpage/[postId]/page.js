"use client"
import LeftSidebar from '@/Components/LeftSidebar/LeftSidebar'
import PostCard from '@/Components/PostCard/PostCard'
import RightSidebar from '@/Components/RightSidebar/RightSidebar'
import { Box, Button, Heading, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function page({params}) {
    const [post, setPost] = useState(null)
    const { postId } = params;
    const fetchUserPost = async () => {
        try {
            console.log('Fetching user', postId);
            const response = await fetch('/api/post/getposts/onepost/'+postId, {
                headers: {
                    "token": localStorage.getItem('token')
                },
            })
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setPost(data)
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
            await fetchUserPost()
        }
    }, [])
    return (

        <Box
        
            display={'flex'}>
            <LeftSidebar />
            <Box width={{ base: "90%", md: "80%", xl: "40%" }}
                padding="15px"
                height={"88vh"}
                overflow={"scroll"}
            >
                {post && <PostCard post={post.post } />}
                <Text>
                    Comments
                </Text>
                <Textarea
                    
                    rows={4}
                />
                <Button>
                    Comment
                </Button>
            </Box>
            <RightSidebar />
        </Box>
    )
}
