"use client"

import { FormControl, FormLabel, Input, VStack, Button, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Loader from '@/Components/Loader/Loader'
import SideProfile from '@/Components/SideProfile/SideProfile'
import LeftSidebar from '@/Components/LeftSidebar/LeftSidebar'
import RightSidebar from '@/Components/RightSidebar/RightSidebar'
import { fetchUser } from '@/Helper/config'
function Page() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        name:user.name,
        Bio: user.Bio,
    })
    useEffect(() => {
        return async () => {
            if (!localStorage.getItem('token')) {
                router.push('/login')
            }
            const u = await fetchUser()
            setUser(u)
            console.log(u)
            formData.name = u.name
            formData.Bio = u.Bio
        }
    }, [])
    const toast = useToast();
    const [loading, setLoading] = useState(false)
    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const submitHandler = async () => {
        setLoading(true)
        
        try {
            const config = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch('/api/user/update', config)
            const data = await response.json();
            console.log(data);
            if (data.success) {
                toast({
                    title: 'Updated Successfull',
                    description: "Your successfully account updated",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                console.log(data)
                setLoading(false)
            }
            else {
                toast({
                    title: 'Error To login Account',
                    description: data.error,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
        >
            <LeftSidebar />
            <Box width={{ base: "90%", md: "80%", xl: "40%" }}
                padding="15px"
                height={"88vh"}
                overflow={"scroll"}
                overflowX={"hidden"}
            >

                <VStack>
                    <Box marginBottom={"90px"}

                    >
                        <SideProfile width={500} height={400} profileHeight={150} profileWidth={150} isProfile={true} top={75} marginTop={0} user={user} isEdit={true} />
                    </Box>
                    <FormControl id='email'  fontWeight={900}
                        m={'5px 0px 5px 0px'}
                    >
                        <FormLabel fontWeight={900}>
                            Enter your new name
                        </FormLabel>
                        <Input
                            type='text'
                            placeholder="Enter your Email"
                            onChange={onChangeHandle}
                            value={formData.name}
                            name='name'
                        />
                    </FormControl>
                    <FormControl 
                        m={'5px 0px 5px 0px'}>
                        <FormLabel fontWeight={900}>
                            Enter your Bio
                        </FormLabel>
                        <Input
                            type='text'
                            placeholder="Enter your Password"
                            onChange={onChangeHandle}
                            value={formData.Bio}
                            name='Bio'
                        />
                    </FormControl>
                    <Button
                        width={"100%"}
                        colorScheme='blue'
                        style={{ marginTop: 15 }}
                        onClick={submitHandler}
                        isLoading={loading}
                    >
                        {loading ? (<Loader />) : ("Update Profile")}
                    </Button>
                </VStack>
            </Box>
            <RightSidebar />
        </Box>
    )
}

export default Page
