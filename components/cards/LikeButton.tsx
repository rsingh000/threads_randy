"use client"

import Image from 'next/image';
import { useState } from 'react';

const LikeButton = () => {

    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    }

    return (
    <div onClick={() => handleClick()} className='cursor-pointer'>

        {liked ? 
            <div>
                🤍
            </div>
        :
            <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="object-contain" />
        }

        {/* <Image src="/assets/heart-gray.svg" onClick={() => handleLikeClick} alt="heart" width={24} height={24} className="cursor-pointer object-contain" /> */}

    
        
    </div>
    )
}

export default LikeButton;
