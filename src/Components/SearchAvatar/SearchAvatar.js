import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const SearchAvatar = ({ user }) => {
    const router = useRouter()
    return (
        <div className={styles.SearchAvatar}>
            <Box
                display='flex'
                alignItems='center'
                padding='0px 10px'
                minWidth={300}
                border="2px solid #344502"
                borderRadius={'20px'}
                cursor='pointer'
                margin={"10px"}
                onClick={()=> {router.push('/profile/'+ user.username)}}
            >
                <Box>
                    <Image src={user && user.pic || '/imgDef.jpg'} width={60} height={60} className={styles.clipPath} style={{ clipPath: "circle()", width: "50px", height: "50px" }} />
                </Box>
                <Box padding="0px 10px 0px 20px">
                    <div className={styles.name}>
                        {user && user.name}
                    </div>
                    <div className={styles.username}>
                        {user && user.username}
                    </div>
                    <div className={styles.email}>
                        {user && user.email}
                    </div>
                </Box>
                
            </Box>

        </div>
    )
}

export default SearchAvatar
