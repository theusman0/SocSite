"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { Avatar, AvatarGroup, Box, useDisclosure, Button, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import SearchAvatar from '../SearchAvatar/SearchAvatar'
import { fetchUser } from '@/Helper/config'

const PostCard = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [like, setLike] = useState("/like.png")
    const [user, setUser] = useState(null)
    const onClickLike = async() => {
        try {
            const response = await fetch('/api/post/likepost/' + post._id, {
                method: 'POST',
                headers: {
                    
                    "token": localStorage.getItem("token")
                }
            })
            const data = await response.json()
            console.log(data)
            if (data.success) {
                setLike(like === "/liked.png"? "/like.png" : "/liked.png")
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        return async () => {
            const u = await fetchUser()
            const likeIds = post.likes.map(like => like._id)
            if (u && likeIds.includes(u._id)) {
                setLike("/liked.png")
            }
        }
    })
    return (
        <>

            <Box className={styles.PostCard}
                margin={"10px 0px"}
            >
                <Box
                    className={styles.profilePart}
                    display="flex"
                    width="100%"
                >

                    {
                        <Box>
                            <Image src={post && post.user && post.user.pic || '/imgDef.jpg'} width={60} height={60} style={{ clipPath: "circle()", width: "60px", height: "60px" }} />
                        </Box>}
                    <Box padding={"0"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        // alignItems={"center"}
                        margin={"0px 15px"}
                    >
                        <div className={styles.name}>
                            {post && post.user && post.user.name}
                        </div>
                        <div className={styles.username}>
                            {post && post.user && post.user.username}
                        </div>
                        <div className={styles.email}>
                            {post && post.user && post.user.email}
                        </div>
                    </Box>
                </Box>
                {
                    post && !post.image &&
                <Text fontSize={"22px"} fontWeight={"bold"} width={"100%"} margin={"10px 0px 5px 0px"}>
                    {post.content}
                </Text>
                }
                <Box
                    className={styles.content}
                    width={"100%"}
                >
                    {post && post.image ? post.caption : post.content}
                </Box>
                <Box

                >
                    {post && post.image &&
                        <Image src={post.image} width={600} height={600} className={styles.image} />
                    }
                </Box>
                <Box
                    className={styles.buttonSection}
                    width={"100%"}
                    padding={"10px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <Box className={styles.rightSection}
                        display={"flex"}
                    >
                        <div className={styles.like}>
                            <Image src={like} width={35} height={35} onClick={onClickLike} />
                        </div>
                        <div >
                            <Link href={'/postpage/' + post._id} >
                                <Image src={"/comment.png"} width={40} height={40} />
                            </Link>
                        </div>
                    </Box>

                    <Box>
                        <AvatarGroup size='sm' max={4}
                            onClick={onOpen}
                            cursor={"pointer"}

                        >
                            {
                                post && post.likes.map((like) => {
                                    return <Avatar name={like.name} src={like.pic} />}
                                )
                                
                            }
                        </AvatarGroup>
                    </Box>

                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    maxHeight={"500px"}
                    overflow={"scroll"}
                >
                    <ModalHeader>Poeple that Like</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                    </ModalBody>
                    {
                        post && post.likes.map((like) => {
                            return <SearchAvatar user={like} />
                        }
                                )
                                
                            }
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostCard
