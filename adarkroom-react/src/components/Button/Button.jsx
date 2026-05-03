import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * 基础按钮组件
 */
const Button = ({
  id,
  className,
  onClick,
  disabled,
  children,
  text,
  title,
  style,
  variant = 'default',
  size = 'medium',
  loading = false,
  ...props
}) => {
  const buttonText = text || children;

  const buttonClassName = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className,
    disabled ? 'disabled' : '',
    loading ? 'loading' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      id={id}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={style}
      {...props}
    >
      <span>{buttonText}</span>
      {loading && <span className="loading-spinner">...</span>}
    </div>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  text: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  loading: PropTypes.bool
};

export default Button;
