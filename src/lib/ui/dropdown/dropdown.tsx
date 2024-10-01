'use client'

import { useState, type ReactNode } from 'react';

import cx from 'classnames';

import styles from './dropdown.module.css';

interface DropdownProps {
  items: { label: string, value: string }[];
  title?: ReactNode;
  activeItem: string;
  onChange: (item: { label: string, value: string }) => void;
}

const Dropdown = ({ items, title, activeItem, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleItemClick = (item: { label: string, value: string }) => {
    onChange(item);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
       {title ?? 'Select'}
      </button>
      <div
        className={cx(styles.dropdownContent, { [styles.dropdownContentOpen]: isOpen })}
       >
        {items.map((item, index) => (
          <button
            key={index}
            className={cx(styles.dropdownItem, { [styles.activeItem]: activeItem === item.value })}
            onClick={() => handleItemClick(item)}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;