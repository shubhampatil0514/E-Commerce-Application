import React from 'react';
import PropTypes from 'prop-types';

function Button({ label, onClick, variation, size, fullWidth, disabled, style, className }) {
  const buttonClasses = `${className} items-center justify-center rounded-md border border-transparent font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${variation === 'primary' ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-900 hover:bg-gray-700 focus:ring-gray-200'} 
                       ${size === 'small' ? 'py-2 px-4 text-sm' : size === 'large' ? 'px-8 py-3 text-base' : 'py-2 px-3 text-base'}
                       ${fullWidth ? 'w-full' : ''}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variation: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
  fullWidth: false,
  disabled: false,
  style: {},
};

export default Button;
