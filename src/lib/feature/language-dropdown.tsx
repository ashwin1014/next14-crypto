'use client'

import React, { useCallback, useEffect } from 'react'

import { IoGlobeOutline } from "react-icons/io5";
import Dropdown from '../ui/dropdown/dropdown';
import { useLocalStorage } from '@/hooks';
import { STORAGE_KEYS } from '@/constants';

const languages = [{ label: 'English', value: 'en' }, { label: 'Spanish', value: 'es' }];


const LanguageDropdown = () => {

    const [activeLanguage, setActiveLanguage] = useLocalStorage(STORAGE_KEYS.LANGUAGE, languages[0].value);

    const handleLanguageChange = useCallback((item: { label: string, value: string }) => {
        setActiveLanguage(item.value);
    }, [setActiveLanguage]);

    useEffect(() => {
        if (!activeLanguage) {
            setActiveLanguage(languages[0].value);
        }
    }, [activeLanguage, setActiveLanguage]);

    return (
        <Dropdown title={<IoGlobeOutline size={25} />} items={languages} activeItem={activeLanguage} onChange={handleLanguageChange} />
    )
}

export default LanguageDropdown