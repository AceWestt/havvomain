import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import bgVid from '../imgs/bg.mp4';
import logo from '../imgs/logo.svg';
import phoneIcn from '../imgs/header_phone_icn.svg';
import mobileMenuIcn from '../imgs/mobile-menu-icn.svg';
import mobileMenuBg from '../imgs/mobileMenuBg.png';
import mobileMenuCloseIcn from '../imgs/mobile-menu-close-icn.svg';
import { useAppContext } from '../context';
import Button from '../components/Button';
import downArrow from '../imgs/header_down_arrow_circled.svg';
import { gsap, Linear } from 'gsap';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';

const Header = () => {
	const {
		smallScreen,
		lang,
		setLang,
		headerSectionRef,
		aboutSectionRef,
		productsSectionRef,
		contactSectionRef,
	} = useAppContext();

	const { data } = useAxiosGet('/api/mainscreen');

	const logoRef = useRef(null);
	const menuRef = useRef(null);
	const contactRef = useRef(null);
	const langSwitchRef = useRef(null);
	const midRef = useRef(null);
	const bottomRef = useRef(null);

	const [ismobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const scrollTo = (obj) => {
		gsap.to(window, { duration: 0.5, scrollTo: obj });
	};

	useEffect(() => {
		const sectionOpen = () => {
			const navTl = gsap.timeline();
			navTl.fromTo(
				logoRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5, ease: Linear.easeNone }
			);
			if (!smallScreen) {
				navTl.fromTo(
					menuRef.current.children,
					{
						y: 20,
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						duration: 0.5,
						stagger: {
							each: 0.3,
						},
						ease: Linear.easeNone,
					}
				);
				navTl.fromTo(
					contactRef.current.children,
					{
						y: 20,
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						duration: 0.5,
						stagger: {
							each: 0.3,
						},
						ease: Linear.easeNone,
					}
				);
			}

			navTl.fromTo(
				langSwitchRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5, ease: Linear.easeNone }
			);
			navTl.fromTo(
				midRef.current.children,
				{
					y: 20,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					stagger: {
						each: 0.3,
					},
					ease: Linear.easeNone,
				}
			);
			navTl.fromTo(
				bottomRef.current,
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					ease: Linear.easeNone,
					onComplete: () => {
						gsap.fromTo(
							bottomRef.current,
							{
								y: 0,
								opacity: 1,
							},
							{
								y: 20,
								opacity: 0,
								duration: 1,
								repeat: -1,
								ease: Linear.easeNone,
							}
						);
					},
				}
			);
		};
		sectionOpen();
	}, [smallScreen]);

	return (
		<>
			<Section className="header-section" bg={Bg} sectionRef={headerSectionRef}>
				<nav className="nav">
					<div className="nav-item-wrap logo" ref={logoRef}>
						<img src={logo} className="logo" alt="logo" />
					</div>
					<div className="nav-item-wrap menu" ref={menuRef}>
						<div
							className="menu-item about"
							onClick={() => scrollTo(aboutSectionRef.current)}
						>
							{lang === 'ru' ? '?? ??????' : 'About Us'}
						</div>
						<div
							className="menu-item products"
							onClick={() => scrollTo(productsSectionRef.current)}
						>
							{lang === 'ru' ? '??????????????????' : 'Products'}
						</div>
						<div
							className="menu-item contact"
							onClick={() => scrollTo(contactSectionRef.current)}
						>
							{lang === 'ru' ? '????????????????' : 'Contacts'}
						</div>
					</div>
					<div className="nav-item-wrap cta" ref={contactRef}>
						<a href={`tel:${data?.phone}`}>
							<img src={phoneIcn} alt="phone" />
							<span>{data?.phone}</span>
						</a>
						<Button
							title={lang === 'ru' ? '??????????????????' : 'Contact Us'}
							onClick={() => scrollTo(contactSectionRef.current)}
						/>
					</div>
					<div className="nav-item-wrap lang-switch" ref={langSwitchRef}>
						<div
							className={`lang-switch-item ru ${lang === 'ru' ? 'active' : ''}`}
							onClick={() => setLang('ru')}
						>
							Ru
						</div>
						<div
							className={`lang-switch-item en ${lang === 'en' ? 'active' : ''}`}
							onClick={() => setLang('en')}
						>
							En
						</div>
					</div>
					<div
						className="nav-item-wrap mobile-menu"
						onClick={() => setIsMobileMenuOpen(true)}
					>
						<img src={mobileMenuIcn} alt="mobileMenu" />
					</div>
				</nav>
				<div className="mid" ref={midRef}>
					<h1>{data?.title[lang]}</h1>
					<h2>{data?.description[lang]}</h2>
					<div className="buttons">
						<Button
							title={lang === 'ru' ? '???????????????????? ??????????????????' : 'Products'}
							outline
							onClick={() => scrollTo(productsSectionRef.current)}
						/>
						<Button
							title={lang === 'ru' ? '?????????????????? ?? ????????' : 'Contact Us'}
							outline
							onClick={() => scrollTo(contactSectionRef.current)}
						/>
					</div>
				</div>
				<div className="bottom" ref={bottomRef}>
					<img src={downArrow} alt="down arrow" />
				</div>
			</Section>
			{smallScreen && ismobileMenuOpen && (
				<Section className="header-mobile-menu" bg={MobileMenuBg}>
					<div className="top">
						<img className="logo" src={logo} alt="logo" />
						<img
							className="close-mobile-menu"
							alt="close menu"
							src={mobileMenuCloseIcn}
							onClick={() => setIsMobileMenuOpen(false)}
						/>
					</div>
					<div className="mid">
						<div
							className="menu-item about"
							onClick={() => {
								setIsMobileMenuOpen(false);
								scrollTo(aboutSectionRef.current);
							}}
						>
							{lang === 'ru' ? '?? ??????' : 'About Us'}
						</div>
						<div
							className="menu-item products"
							onClick={() => {
								setIsMobileMenuOpen(false);
								scrollTo(productsSectionRef.current);
							}}
						>
							{lang === 'ru' ? '??????????????????' : 'Products'}
						</div>
						<div
							className="menu-item contact"
							onClick={() => {
								setIsMobileMenuOpen(false);
								scrollTo(contactSectionRef.current);
							}}
						>
							{lang === 'ru' ? '????????????????' : 'Contacts'}
						</div>
					</div>
					<div className="bottom">
						<a href={`tel:${data?.phone}`}>
							<img src={phoneIcn} alt="phone" />
							<span>{data?.phone}</span>
						</a>
						<Button
							title="??????????????????"
							onClick={() => {
								setIsMobileMenuOpen(false);
								scrollTo(contactSectionRef.current);
							}}
						/>
					</div>
				</Section>
			)}
		</>
	);
};

const Bg = () => {
	const bottomLineRef = useRef(null);
	const scrollRef = useRef(null);
	useEffect(() => {
		gsap.fromTo(
			bottomLineRef.current,
			{
				attr: {
					d: 'M-1706.79,35.65L-1706.79,35.6C-1706.79,35.6,-1602.41,35.6,-1476.39,35.6C-1350.37,35.6,-1245.99,35.6,-1245.99,35.6L-1245.99,35.65C-1245.99,35.65,-1706.79,35.65,-1706.79,35.65Z',
				},
			},
			{
				attr: {
					d: 'M-1706.79,35.65L-1706.79,1.22C-1706.79,1.22,-1602.41,35.6,-1476.39,35.6C-1350.37,35.6,-1245.99,1.22,-1245.99,1.22L-1245.99,35.65C-1245.99,35.65,-1706.79,35.65,-1706.79,35.65Z',
				},
				scrollTrigger: {
					trigger: scrollRef.current,
					scrub: true,
					start: '100% 100%',
					end: '200% 100%',
				},
				ease: Linear.easeNone,
			}
		);
	}, []);

	return (
		<>
			<video
				autoPlay
				muted
				loop
				className="main-bg-video"
				id="main-bg-video"
				ref={scrollRef}
			>
				<source src={bgVid} type="video/mp4" />
				Your browser does not support HTML5 video.
			</video>
			<svg viewBox="0 0 460.8 34.30">
				{/* <path
					ref={bottomLineRef}
					className="cls-1"
					d="M-1706.79,35.65L-1706.79,35.6C-1706.79,35.6,-1602.41,35.6,-1476.39,35.6C-1350.37,35.6,-1245.99,35.6,-1245.99,35.6L-1245.99,35.65C-1245.99,35.65,-1706.79,35.65,-1706.79,35.65Z"
					transform="matrix(1 0 0 1 1706.79 -1.22)"
				/> */}
				<path
					ref={bottomLineRef}
					className="cls-1"
					d="M-1706.79,35.65L-1706.79,35.6C-1706.79,35.6,-1602.41,35.6,-1476.39,35.6C-1350.37,35.6,-1245.99,35.6,-1245.99,35.6L-1245.99,35.65C-1245.99,35.65,-1706.79,35.65,-1706.79,35.65Z"
					transform="matrix(1 0 0 1 1706.79 -1.22)"
				/>
			</svg>
		</>
	);
};

const MobileMenuBg = () => {
	return (
		<div className="mobile-menu-bg-wrap">
			<img src={mobileMenuBg} alt="bg" />
			<div className="cover" />
		</div>
	);
};

export default Header;
