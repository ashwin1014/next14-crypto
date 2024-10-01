'use client'

import React, { useCallback, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation';

import { IoGlobeOutline } from "react-icons/io5";
import Dropdown from '../ui/dropdown/dropdown';
import { useLocalStorage } from '@/hooks';
import { STORAGE_KEYS } from '@/constants';

const languages = [{ label: 'English', value: 'en' }, { label: 'Spanish', value: 'es' }];


const LanguageDropdown = () => {

    const [activeLanguage, setActiveLanguage] = useLocalStorage(STORAGE_KEYS.LANGUAGE, languages[0].value);
    const [, startTransition] = useTransition();
    const router = useRouter();

    const handleLanguageChange = useCallback((item: { label: string, value: string }) => {
       startTransition(() => {
        setActiveLanguage(item.value);
        router.replace(`/${item.value}`);
       })
    }, [setActiveLanguage, router]);

    useEffect(() => {
        if (!activeLanguage) {
            setActiveLanguage(languages[0].value);
            router.replace(`/${languages[0].value}`);
        }
    }, [activeLanguage, router, setActiveLanguage]);

    return (
        <Dropdown title={<IoGlobeOutline size={25} className='text-primary' />} items={languages} activeItem={activeLanguage} onChange={handleLanguageChange} />
    )
}

export default LanguageDropdown