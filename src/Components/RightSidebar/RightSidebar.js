"use client"
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import SideProfile from '../SideProfile/SideProfile';
import styles from './page.module.css'
import { fetchUser } from '@/Helper/config';
import { userAgent } from 'next/server';

const RightSidebar = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        
        return async () => {
            const u = await fetchUser();
            // console.log(u);
            setUser(u)
            // console.log(user)
        }
    }, [user])
    return (
        <div className='RightSidebar'>
            <Box
                width={{ xl: '350px', md: '300px' }}
                display={{ base: 'none', md: 'flex', xl: 'flex' }}
                fontSize={'20px'}
                fontWeight={500}
                flexDirection='column'
                alignItems='center'
                justifyContent={'center'}
                color="#344502"
                height='88vh'
                padding={"20px 40px"}
                borderLeft="1px solid #344502"
            >
                
                {user &&
                    <SideProfile width={280} height={200} profileHeight={90} profileWidth={90} isProfile={false} top={75} marginTop={15} user={user} />
                }
                <Box className={styles.listClass} marginTop="90px">
                    
                    <span><Image src={'/home.png'} width={28} height={28} /></span>&nbsp;&nbsp;<Link href={"/"} user={user}>Home</Link>
                </Box>
                <Box className={styles.listClass}>
                    <span><Image src={'/profile.png'} width={28} height={28} /></span>&nbsp;&nbsp;<Link href={user ? "/profile/"+user.username: "/"}>Profile</Link>
                </Box>
                <Box className={styles.listClass}>
                    <span><Image src={'/feed.png'} width={28} height={28} /></span>&nbsp;&nbsp;<Link href={"/feed"}>Feed</Link>
                </Box>

            </Box>
        </div>
    )
}

export default RightSidebar
