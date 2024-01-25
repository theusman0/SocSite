"use client"

import { VStack, StackDivider, Box, useToast, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchAvatar from '../SearchAvatar/SearchAvatar'

const LeftSidebar = (props) => {
    const toast = useToast();
    const [users, setUsers] = useState(null);
    const fetchAllUsers = async () => {
        try {
            const response = await fetch('/api/user/getuser/allusers', {
                headers: {
                    "token": localStorage.getItem('token')
                },

            })
            const data = await response.json();
            if (data.success) {
                setUsers(data.users)
                // console.log(data);
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
            await fetchAllUsers()
        }
    })
    return (
        <div className='LeftSidebar' >
            <VStack
                divider={<StackDivider borderColor='#afaf02' />}
                spacing={2}
                align='stretch'
                width='350px'
                padding="15px"
                borderRight="1px solid #344502"
                margin="0px 10px"
                display={{ base: "none", md: "none", xl: "block" }}
                height="88vh"
                overflow={"scroll"}
                >
                <Heading
                    fontWeight={600}
                    color={'#344502'}
                >
                    Family Members
                </Heading>
                {
                    users && users.map((user) => {
                        return <Box bg='' >
                            <SearchAvatar user={user} />
                        </Box>
                    })

                }

            </VStack>
        </div>
    )
}

export default LeftSidebar
