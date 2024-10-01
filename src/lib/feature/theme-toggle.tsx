'use client'
import useTheme from '@/hooks/useTheme';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeToggle = () => {

    const { toggleTheme, isDark } = useTheme();

    return (
        <DarkModeSwitch checked={isDark} onChange={toggleTheme} />
    )
}

export default ThemeToggle;