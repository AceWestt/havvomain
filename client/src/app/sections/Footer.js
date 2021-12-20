import React, { useEffect, useRef } from 'react';
import Section from '../components/Section';
import logo from '../imgs/logo.svg';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { gsap } from 'gsap';
import { useAppContext } from '../context';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';
import { Message, toaster } from 'rsuite';
import axios from 'axios';

const Footer = () => {
	const { data } = useAxiosGet('/api/othersscreen');
	const { data: contactData } = useAxiosGet('/api/contactscreen');

	const { lang, contactSectionRef } = useAppContext();

	const successMessage = (type, msg) => {
		return (
			<Message showIcon type={type} duration={5000}>
				{msg}
			</Message>
		);
	};

	const { register, handleSubmit } = useForm();
	const onSubmit = async (data) => {
		const { message, phone, name } = data.user;
		if (!message) {
			toaster.push(successMessage('error', 'Вы не указали имя'), {
				placement: 'bottomEnd',
			});
		}
		if (!phone) {
			toaster.push(successMessage('error', 'Вы не указали телефон'), {
				placement: 'bottomEnd',
			});
		}
		if (!message) {
			toaster.push(successMessage('error', 'Вы ничего не написали'), {
				placement: 'bottomEnd',
			});
		}
		if (message && phone && name) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			try {
				const { data } = await axios.post(
					'/api/message',
					{
						message,
						name,
						phone,
					},
					config
				);
				if (data.status === 'success') {
					toaster.push(
						successMessage(
							'success',
							lang === 'ru'
								? 'Сообщение отправлено. Наш оператор скоро с вами свяжется'
								: 'Message sent. Our operator will contact you soon'
						),
						{ placement: 'bottomEnd' }
					);
				} else {
					toaster.push(
						successMessage(
							'error',
							lang === 'ru'
								? 'Ошибка. Повторите еще раз пожалуйста'
								: 'Error. Please, repeat again'
						),
						{
							placement: 'bottomEnd',
						}
					);
				}
			} catch (error) {
				toaster.push(
					successMessage(
						'error',
						lang === 'ru'
							? 'Ошибка. Повторите еще раз пожалуйста'
							: 'Error. Please, repeat again'
					),
					{
						placement: 'bottomEnd',
					}
				);
			}
		}
	};

	const headRef = useRef(null);
	const firstColumnRef = useRef(null);
	const secondColumnRef = useRef(null);
	const lastRef = useRef(null);

	useEffect(() => {
		if (contactSectionRef.current) {
			gsap.set(headRef.current.children, { y: 20, opacity: 0 });
			gsap.set(firstColumnRef.current.children, { y: 20, opacity: 0 });
			gsap.set(secondColumnRef.current.children, { y: 20, opacity: 0 });
			gsap.set(lastRef.current.children, { y: 20, opacity: 0 });
			gsap.to(headRef.current.children, {
				opacity: 1,
				y: 0,
				scrollTrigger: {
					trigger: contactSectionRef.current,
					start: '50% 100%',
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
					start: '50% 100%',
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
					start: '50% 100%',
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
					start: '50% 100%',
				},
				stagger: {
					each: 0.2,
				},
			});
		}
	}, [contactSectionRef]);
	return (
		<Section className="footer-section" sectionRef={contactSectionRef}>
			<div className="head" ref={headRef}>
				<img src={logo} alt="logo" className="logo" />
				<span>{data?.contactsText[lang]}</span>
			</div>
			<div className="body">
				<div className="column contact-details" ref={firstColumnRef}>
					<div className="row detail">
						<label>{lang === 'ru' ? 'Адрес:' : 'Address:'}</label>
						<p>{contactData?.address[lang]}</p>
					</div>
					<div className="row detail">
						<label>{lang === 'ru' ? 'Номер телефона:' : 'Phone number'} </label>
						<p>{contactData?.phone[lang]}</p>
					</div>
					<div className="row detail">
						<label>E-mail: </label>
						<p>{contactData?.email[lang]}</p>
					</div>
					<div className="row detail worktime">
						<label>{lang === 'ru' ? 'Режим работы:' : 'Working hours'} </label>
						<p>{contactData?.worktime[lang]}</p>
					</div>
				</div>
				<form
					className="column contact-form"
					onSubmit={handleSubmit(onSubmit)}
					ref={secondColumnRef}
				>
					<div className="row name">
						<label>{lang === 'ru' ? 'Имя' : 'Name'}</label>
						<input
							type="text"
							placeholder={lang === 'ru' ? 'Напишите ваше имя' : 'Write your name'}
							{...register('user.name')}
						/>
					</div>
					<div className="row phone">
						<label>{lang === 'ru' ? 'Номер телефона' : 'Phone number'}</label>
						<input
							type="text"
							placeholder="(xx) xxx-xx-xx"
							{...register('user.phone')}
						/>
					</div>
					<div className="row message">
						<label>{lang === 'ru' ? 'Сообщение' : 'Message'}</label>
						<input
							type="text"
							placeholder={
								lang === 'ru' ? 'Напишите нам сообщение...' : 'Write your message...'
							}
							{...register('user.message')}
						/>
					</div>
					<div className="row submit">
						<button type="submit">
							<Button secondary title={lang === 'ru' ? 'Связаться' : 'Send'} />
						</button>
					</div>
				</form>
			</div>
			<div className="bottom" ref={lastRef}>
				<span>{data?.copyright[lang]}</span>
				{/* <span>Политика конфиденциальности</span> */}
			</div>
		</Section>
	);
};

export default Footer;
