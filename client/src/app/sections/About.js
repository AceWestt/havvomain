import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import cardImg1 from '../imgs/about_card_img_1.png';
import cardImg2 from '../imgs/about_card_img_2.png';
import logoBlue from '../imgs/logoBlue.svg';
import proffesionalsIcn from '../imgs/about_point_proffessionals_icn.svg';
import safeIcn from '../imgs/about_point_safe_icn.svg';
import qualityIcn from '../imgs/about_point_quality_icn.svg';
import { gsap } from 'gsap';
import { useAppContext } from '../context';

const About = () => {
	const titleRef = useRef(null);
	const cardListRef = useRef(null);
	const pointsRef = useRef(null);

	const { aboutSectionRef } = useAppContext();

	useEffect(() => {
		gsap.set(titleRef.current, { y: 20, opacity: 0 });
		gsap.set(pointsRef.current.children, { y: 20, opacity: 0 });
		gsap.set(cardListRef.current.children, { y: 20, opacity: 0 });
		gsap.to(titleRef.current, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: titleRef.current,
			},
		});
		gsap.to(pointsRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: pointsRef.current,
				start: '50% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
		gsap.to(cardListRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: cardListRef.current,
				start: '100% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
	}, []);

	return (
		<Section
			className="about-section"
			sectionTitle="О нас"
			titleRef={titleRef}
			sectionRef={aboutSectionRef}
		>
			<div className="about-us-text">
				<h2>
					Havvo Group - это молодой и динамично развивающийся агрохолдинг, созданный
					в 2019г.
				</h2>
				<p>
					Включает в себя группу компаний: ООО “Havvo Group”, ООО “Havvo Agro Food”,
					ООО “Havvo Trust”, ООО “Havvo Noble” СНГ Основной деятельностью нашего
					агрохолдинга является экспорт и импорт сезонной сельскохозяйственной
					продукции, сухофруктов и орехов. Численность сотрудников составляет – 20
					человек, каждый из которых является высококвалифицированным и компетентным
					профессионалом в своей отрасли. Ежегодный экспортный оборот холдинга
					составляет около 30 млн. долларов США, оборот по импорту – около 10 млн.
					долларов США.
				</p>
			</div>
			<div className="cards" ref={cardListRef}>
				<Card type="logo" img={logoBlue} customClass="logo-card" />
				<Card
					type="counter"
					counter={{ number: 20, text: 'Сотрудников в штате компании' }}
					customClass="workers"
				/>
				<Card type="img" img={cardImg1} customClass="img-card-one" />

				<Card
					type="counter"
					counter={{ number: 195, text: 'Тонн реализованной продукции' }}
					customClass="produced"
				/>
				<Card type="img" img={cardImg2} customClass="img-card-two" />
				<Card
					type="counter"
					counter={{ number: 2, text: 'Года на рынке' }}
					customClass="market"
				/>
			</div>
			<div className="points" ref={pointsRef}>
				<Point
					icon={proffesionalsIcn}
					customClass="proffessionals"
					text="Являемся специалистами экспортно-импортных операций"
				/>
				<Point icon={safeIcn} customClass="safe" text="Безопасная упаковка" />
				<Point icon={qualityIcn} customClass="quality" text="Высшее качество" />
			</div>
		</Section>
	);
};

export default About;

const Card = ({
	type = 'text',
	counter = null,
	img = null,
	customClass = '',
}) => {
	const [counting, setCounting] = useState(0);
	useEffect(() => {
		let interval;
		if (counter) {
			if (counting < counter.number) {
				interval = setInterval(() => {
					setCounting(counting + 1);
				}, 100);
			}
			return () => {
				clearInterval(interval);
			};
		}
	}, [counting, counter]);
	switch (type) {
		case 'logo':
			return (
				<div className={`card logo ${customClass}`}>
					<img alt="logo" src={img} />
				</div>
			);
		case 'counter':
			return (
				<div className={`card counter ${customClass}`}>
					<span className="number">{counting}+</span>
					<span className="text">{counter?.text}</span>
				</div>
			);
		default:
			return (
				<div className={`card img ${customClass}`}>
					<img src={img} alt="img" />
				</div>
			);
	}
};

const Point = ({ icon, text, customClass = '' }) => {
	return (
		<div className={`point ${customClass}`}>
			<div className="icon-holder">
				<img src={icon} alt="point-icon" />
			</div>
			<p>{text}</p>
		</div>
	);
};
