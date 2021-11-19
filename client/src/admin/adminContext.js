import React, { useContext } from 'react';

const AdminContext = React.createContext();

const theme = {
	colors: {
		mainBg: '#f7f7fa',
		greenBtn: '#24e07c',
	},
	spacing: (value) => {
		return `${value * 4}px`;
	},
};

const AdminProvider = ({ children }) => {
	return (
		<AdminContext.Provider value={{ navElements }}>
			{children}
		</AdminContext.Provider>
	);
};

export const useAdminContext = () => {
	return useContext(AdminContext);
};

export { AdminContext, AdminProvider, theme };

const navElements = [
	'Начальный экран',
	'Блок “о нас”',
	'Остальные блоки',
	'Продукция',
	'Локации на карте',
	'Контактные данные',
	'Заявки от пользователей',
];
