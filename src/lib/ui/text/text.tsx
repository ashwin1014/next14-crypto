import { type ReactNode } from 'react';

import classNames from 'classnames';

import styles from './text.module.css';

interface TextProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'textPrimary' | 'textSecondary' | 'primaryColor' | 'error' | 'success';
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}

const Text = ({ className, size = 'medium', color = 'textPrimary', as: Component = 'p', children }: TextProps) => {
  const classes = classNames(className, {
    [styles.textSmall]: size === 'small',
    [styles.textMedium]: size === 'medium',
    [styles.textLarge]: size === 'large',
    [styles.textXLarge]: size === 'xlarge',
    [styles.textPrimary]: color === 'textPrimary',
    [styles.textSecondary]: color === 'textSecondary',
    [styles.primaryColor]: color === 'primaryColor',
    [styles.error]: color === 'error',
    [styles.success]: color === 'success',
  });

  return <Component className={classes}>{children}</Component>;
};

export default Text;