import React, { useContext, useState, useEffect, useRef } from 'react';

const AppContext = React.createContext();
const smallScreenBreakPoint = 1060;

const AppProvider = ({ children }) => {
	const [smallScreen, setSmallScreen] = useState(false);
	const [lang, setLang] = useState('ru');

	const headerSectionRef = useRef(null);
	const aboutSectionRef = useRef(null);
	const productsSectionRef = useRef(null);
	const mapSectionRef = useRef(null);
	const contactSectionRef = useRef(null);

	const handleResize = () => {
		const wWidht =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
		if (wWidht <= smallScreenBreakPoint) {
			setSmallScreen(true);
		} else {
			setSmallScreen(false);
		}
	};

	useEffect(() => {
		handleResize();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [smallScreen]);

	return (
		<AppContext.Provider
			value={{
				smallScreen,
				lang,
				setLang,
				headerSectionRef,
				aboutSectionRef,
				productsSectionRef,
				mapSectionRef,
				contactSectionRef,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
