import { ChangeEvent } from 'react'

import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import styles from './searchbar.module.css';

interface SearchBarProps {
    value: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    autoFocus?: boolean;
    placeholder?: string;
}

const SearchBar = ({ value, onChange, onClear, autoFocus = true, placeholder = 'Search' }: SearchBarProps) => {
    return (
        <div className={styles.container}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className={styles.input}
                placeholder={placeholder}
                autoFocus={autoFocus}
            />
            {
                value && (
                    <AiOutlineClose className={styles.icon} onClick={onClear} />
                )
            }
            <AiOutlineSearch className={styles.icon} />
        </div>
    )
}

export default SearchBar