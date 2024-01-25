"use client"
import LeftSidebar from '@/Components/LeftSidebar/LeftSidebar'
import PostCard from '@/Components/PostCard/PostCard'
import RightSidebar from '@/Components/RightSidebar/RightSidebar'
import { Box, Button, Heading, Text, Textarea, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function page({ params }) {
    const [post, setPost] = useState(null)
    const { postId } = params;
    const fetchUserPost = async () => {
        try {
            console.log('Fetching user', postId);
            const response = await fetch('/api/post/getposts/onepost/' + postId, {
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
                {post && <PostCard post={post.post} />}
                <Text>
                    Comments
                </Text>
                <Textarea

                    rows={4}
                />
                <Button
                    marginTop={'10px'}
                >
                    Comment
                </Button>
                <VStack>
                    <Box
                        width={'100%'}
                        border={'2px solid #344502'}
                        borderRadius={'20px'}
                        margin={'10px'}
                    >
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            color={'#344502'}
                        >
                            <Box
                            >
                                <Image src={'/imgDef.jpg'} width={60} height={60} style={{ width: '60px', height: '60px', clipPath: "circle()" }} />
                            </Box>
                            <Box>
                                <Text fontSize={'16px'} fontWeight={'bold'}>
                                    Usman Javed
                                </Text>
                                <Text fontSize={'16px'}>
                                    the-usman
                                </Text>
                            </Box>
                        </Box>
                        <hr />
                        <Text
                            margin={"10px"}
                        >
                            This is code
                        </Text>
                    </Box>
                </VStack>
            </Box>
            <RightSidebar />
        </Box>
    )
}
