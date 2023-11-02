import React, { useState } from 'react'
import "@/styles/auth.css"
import { ChipProps } from '@/types/chipProps';

const Chip = ({ pref, togglePreference }: ChipProps) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        togglePreference(pref)
    };

    return (
        <div className={`pref-chip-${isClicked ? 'checked' : 'unchecked'}`} onClick={handleClick}>
            {pref}
        </div>
    )

}

export default Chip
