'use client';

import { useState, useEffect } from 'react';

export default function GetCurrentUrl()
{
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        if(typeof window !== "undefined"){
            setCurrentUrl(window.location.href);
        }
    }, []);

    return currentUrl;
}


