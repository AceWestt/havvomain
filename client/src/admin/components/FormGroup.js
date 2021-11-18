import React from 'react';

const FormGroup = ({ customClass = '', label = '', children }) => {
	return (
		<div className={`form-control ${customClass}`}>
			<label>{label}</label>
			<div className="field">{children}</div>
		</div>
	);
};

export default FormGroup;
