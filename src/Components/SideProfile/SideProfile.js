"use client";

import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import postDetail from '@/Helper/AddFile';
import { fetchUser } from '@/Helper/config';

const SideProfile = ({ width, height, profileWidth, profileHeight, isProfile, top, marginTop, user, isEdit }) => {
    const route = useRouter()
    // const [user, setUser] = useState(null)
    const [mUser, setmUser] = useState(null);
    const fetchMUser = async () => {
        try {
            const response = await fetch('/api/user/getuser/' + username || mUser.username , {
                headers: {
                    "token": localStorage.getItem('token')
                },
            })
            const data = await response.json();
            if (data.success) {
                setUser(data.user)
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
    const handleOnClick = () => {
        if (!isProfile)
            route.push('/profile/' + user.username)
    }
    useEffect(() => {
        return async () => {
            // const u = await fetchUser();
            // setmUser(u);
            // await fetchMUser()
        }
    }, [])
    const onChangeBg = async (e) => {
        try {
            const bgUrl = await postDetail(e.target.files[0])
            console.log(bgUrl);
            user.bgPic = bgUrl;
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ bgPic: bgUrl })
            })
            const data = await response.json();
            window.location.reload();
            console.log(data);
        } catch (e) { console.log(e) }
        await fetchUser();
    }
    const onChangePic = async (e) => {
        try {
            const bgUrl = await postDetail(e.target.files[0])
            console.log(bgUrl);
            user.pic = bgUrl;
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ pic: bgUrl })
            })
            const data = await response.json();
            await fetchUser();
            window.location.reload();
            console.log(data);
        } catch (e) { console.log(e) }
    }

    return (
        <div className='SideProfile' onClick={handleOnClick}>
            <Box
                // border="2px solid black"
                width={width}
                margin={`${marginTop}px auto`}
                position="relative"
            >
                <Box className={styles.clipPath} width={width} margin="0 auto">
                    <Image src={user && user.bgPic || "/bgimg.jpeg"} width={width} height={height} style={{ width: width + "px", height: height + "px" }} />
                </Box>
                {isEdit && <FormControl
                    position={'absolute'}
                    left={'90%'}
                    top={"90%"}
                    zIndex={'10000'}
                >
                    <FormLabel>
                        <Image src={'/cam.png'} height={35} width={35} />
                    </FormLabel>
                    <Input
                        type='file'
                        onChange={onChangeBg}
                        display={'none'}
                    />

                </FormControl>}

                {isEdit && <FormControl
                    position={'absolute'}
                    left={'50%'}
                    top={"100%"}
                    zIndex={'10000'}
                >
                    <FormLabel>
                        <Image src={'/cam.png'} height={35} width={35} />
                    </FormLabel>
                    <Input
                        type='file'
                        onChange={onChangePic}
                        display={'none'}
                    />

                </FormControl>}


                <Box margin="0 auto" >
                    <Image src={user && user.pic || "/imgDef.jpg"} width={profileWidth} height={profileHeight} className={styles.clipPathProfile} style={{ top: top + "%", width: profileWidth + "px", height: profileHeight + "px" }} />
                </Box>
            </Box>
        </div>
    )
}

export default SideProfile
