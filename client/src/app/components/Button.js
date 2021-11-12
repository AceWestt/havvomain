import React from 'react';

const Button = ({
	secondary = false,
	outline = false,
	className = '',
	title = '',
	onClick = () => {},
	onMouseEnter = () => {},
	onMouseLeave = () => {},
	btnRef = null,
}) => {
	return (
		<div
			className={`btn ${secondary ? 'btn-secondary' : 'btn-primary'} ${
				outline ? 'outline' : ''
			} ${className ? className : ''}`}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			ref={btnRef}
		>
			{title}
		</div>
	);
};

export default Button;
