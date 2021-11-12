import React from 'react';

const Modal = ({ customClass = '', children }) => {
	return <div className={`modal ${customClass}`}>{children}</div>;
};

export default Modal;
