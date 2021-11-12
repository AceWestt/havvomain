import React, { useEffect, useRef } from 'react';
import Section from '../components/Section';
import logo from '../imgs/logo.svg';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { gsap } from 'gsap';
import { useAppContext } from '../context';

const Footer = () => {
	const { contactSectionRef } = useAppContext();

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		console.log(data);
	};

	const headRef = useRef(null);
	const firstColumnRef = useRef(null);
	const secondColumnRef = useRef(null);
	const lastRef = useRef(null);

	useEffect(() => {
		gsap.set(headRef.current.children, { y: 20, opacity: 0 });
		gsap.set(firstColumnRef.current.children, { y: 20, opacity: 0 });
		gsap.set(secondColumnRef.current.children, { y: 20, opacity: 0 });
		gsap.set(lastRef.current.children, { y: 20, opacity: 0 });
		gsap.to(headRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: contactSectionRef.current,
				start: '100% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
		gsap.to(firstColumnRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: contactSectionRef.current,
				start: '100% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
		gsap.to(secondColumnRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: contactSectionRef.current,
				start: '100% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
		gsap.to(lastRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: contactSectionRef.current,
				start: '100% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
	}, [contactSectionRef]);
	return (
		<Section className="footer-section" sectionRef={contactSectionRef}>
			<div className="head" ref={headRef}>
				<img src={logo} alt="logo" className="logo" />
				<span>В партнёрстве с природой!</span>
			</div>
			<div className="body">
				<div className="column contact-details" ref={firstColumnRef}>
					{contactDetails.map((c, i) => {
						return (
							<div className="row detail" key={`contact-detail-${i}`}>
								<label>{c.title.ru}</label>
								<p>{c.value.ru}</p>
							</div>
						);
					})}
				</div>
				<form
					className="column contact-form"
					onSubmit={handleSubmit(onSubmit)}
					ref={secondColumnRef}
				>
					<div className="row name">
						<label>Имя</label>
						<input
							type="text"
							placeholder="Напишите ваше имя"
							{...register('user.name')}
						/>
					</div>
					<div className="row phone">
						<label>Номер телефона</label>
						<input
							type="text"
							placeholder="(xx) xxx-xx-xx"
							{...register('user.phone')}
						/>
					</div>
					<div className="row message">
						<label>Сообщение</label>
						<input
							type="text"
							placeholder="Напишите нам сообщение..."
							{...register('user.message')}
						/>
					</div>
					<div className="row submit">
						<button type="submit">
							<Button secondary title="Связаться" />
						</button>
					</div>
				</form>
			</div>
			<div className="bottom" ref={lastRef}>
				<span>©2021 HavvoGroup. All Rights Reserved</span>
				<span>Политика конфиденциальности</span>
			</div>
		</Section>
	);
};

export default Footer;

const contactDetails = [
	{
		title: { ru: 'Адрес', en: 'Address' },
		value: {
			ru: 'Узбекистан, г. Ташкент улица Юнусабад, д. 9',
			en: 'Узбекистан, г. Ташкент улица Юнусабад, д. 9',
		},
	},
	{
		title: { ru: 'Номер телефона', en: 'Phone' },
		value: {
			ru: '(97) 355-55-55',
			en: '(97) 355-55-55',
		},
	},
	{
		title: { ru: 'E-mail', en: 'E-mail' },
		value: {
			ru: 'info@havvogroup.uz',
			en: 'info@havvogroup.uz',
		},
	},
	{
		title: { ru: 'Режим работы:', en: 'Режим работы:' },
		value: {
			ru: 'Пн - Пт с 9:00 до 18:00 Сб - Вс выходной',
			en: 'Пн - Пт с 9:00 до 18:00 Сб - Вс выходной',
		},
	},
];
