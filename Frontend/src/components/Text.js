import React from 'react';
import PropTypes from 'prop-types';

function Text({ text, size, color, bold, style, className }) {
  const textClasses = `${className} 
                       ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}
                       ${bold ? 'font-bold' : 'font-normal'}
                       ${color === 'primary' ? 'text-black ' : color === 'secondary' ? 'text-gray-600' : ''}`;

  return (
    <p
      className={textClasses}
      style={style}
    >
      {text}
    </p>
  );
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  bold: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

Text.defaultProps = {
  size: 'medium',
  color: 'primary',
  bold: false,
  style: {},
  className: '',
};

export default Text;
