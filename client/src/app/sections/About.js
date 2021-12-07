import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import aboutPointsSlideLeft from '../imgs/about-points-slide-left.svg';
import aboutPointsSlideRight from '../imgs/about-points-slide-right.svg';
import { gsap } from 'gsap';
import { useAppContext } from '../context';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';

const About = () => {
	const { data } = useAxiosGet('/api/aboutscreen');

	const titleRef = useRef(null);
	const cardListRef = useRef(null);
	const pointsRef = useRef(null);

	const { lang, smallScreen, aboutSectionRef } = useAppContext();

	useEffect(() => {
		gsap.set(cardListRef.current.children, { y: 20, opacity: 0 });

		if (!smallScreen) {
			gsap.set(pointsRef.current.children, {
				y: 20,
				opacity: 0,
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
				clearProps: 'all',
			});
		}

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
	}, [smallScreen]);

	useEffect(() => {
		if (data) {
			gsap.set(titleRef.current, { y: 20, opacity: 0 });
			gsap.to(titleRef.current, {
				opacity: 1,
				y: 0,
				scrollTrigger: {
					trigger: titleRef.current,
				},
			});
		}
	}, [data]);

	return (
		<Section
			className="about-section"
			sectionTitle={data?.blockTitle[lang]}
			titleRef={titleRef}
			sectionRef={aboutSectionRef}
		>
			<div className="about-us-text">
				<h2>{data?.title[lang]}</h2>
				<p>{data?.text[lang]}</p>
			</div>
			<div className="cards" ref={cardListRef}>
				<Card type="logo" img={data?.logoCard} customClass="logo-card" />
				<Card
					type="counter"
					counter={{
						number: data?.workerCard.number,
						text: data?.workerCard.text[lang],
					}}
					customClass="workers"
				/>
				<Card type="img" img={data?.firstImgCard} customClass="img-card-one" />
				<Card
					type="counter"
					counter={{
						number: data?.realProduct.number,
						text: data?.realProduct.text[lang],
					}}
					customClass="produced"
				/>
				<Card type="img" img={data?.secondImgCard} customClass="img-card-two" />
				<Card
					type="counter"
					counter={{
						number: data?.marketYear.number,
						text: data?.marketYear.text[lang],
					}}
					customClass="market"
				/>
			</div>
			<Points
				lang={lang}
				smallScreen={smallScreen}
				pointsRef={pointsRef}
				data={data}
			/>
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
	const cardRef = useRef(null);
	useEffect(() => {
		const target = {
			v: 0,
		};
		if (type === 'counter') {
			gsap.to(target, {
				scrollTrigger: {
					trigger: cardRef.current,
					start: '0 70%',
				},
				duration: 3,
				v: `+=${counter.number}`,
				roundProps: 'v',
				ease: 'none',
				onUpdate: () => {
					setCounting(target.v);
				},
			});
		}
	}, [counter?.number, type]);
	switch (type) {
		case 'logo':
			return (
				<div className={`card logo ${customClass}`}>
					<img alt="logo" src={img} />
				</div>
			);
		case 'counter':
			return (
				<div className={`card counter ${customClass}`} ref={cardRef}>
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

const Points = ({ pointsRef, smallScreen, lang, data }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const lastIndex = 4;
	useEffect(() => {
		if (activeIndex < 0) {
			setActiveIndex(lastIndex);
		}
		if (activeIndex > lastIndex) {
			setActiveIndex(0);
		}
	}, [activeIndex]);

	useEffect(() => {
		let slider = setInterval(() => {
			setActiveIndex(activeIndex + 1);
		}, 5000);
		return () => {
			clearInterval(slider);
		};
	}, [activeIndex]);

	const getPositionClass = (index) => {
		let position = 'next-slide';
		if (index === activeIndex) {
			position = 'active-slide';
		}
		if (index === activeIndex - 1 || (activeIndex === 0 && index === lastIndex)) {
			position = 'last-slide';
		}
		return position;
	};
	return (
		<div className="points" ref={pointsRef}>
			<Point
				icon={data?.firstPoint.icon}
				customClass={`proffessionals ${smallScreen ? getPositionClass(0) : ''}`}
				text={data?.firstPoint.text[lang]}
				bgColor={data?.firstPoint.color}
			/>
			<Point
				customClass={`safe ${smallScreen ? getPositionClass(1) : ''}`}
				icon={data?.secondPoint.icon}
				text={data?.secondPoint.text[lang]}
				bgColor={data?.secondPoint.color}
			/>
			<Point
				customClass={`quality ${smallScreen ? getPositionClass(2) : ''}`}
				icon={data?.thirdPoint.icon}
				text={data?.thirdPoint.text[lang]}
				bgColor={data?.thirdPoint.color}
			/>
			<Point
				customClass={`quality ${smallScreen ? getPositionClass(3) : ''}`}
				icon={data?.fourthPoint.icon}
				text={data?.fourthPoint.text[lang]}
				bgColor={data?.fourthPoint.color}
			/>
			<Point
				customClass={`quality ${smallScreen ? getPositionClass(4) : ''}`}
				icon={data?.fifthPoint.icon}
				text={data?.fifthPoint.text[lang]}
				bgColor={data?.fifthPoint.color}
			/>
			{smallScreen && (
				<div className="slider-controls">
					<div
						className="control slide-left"
						onClick={() => setActiveIndex(activeIndex - 1)}
					>
						<img src={aboutPointsSlideLeft} alt="slide-left" />
					</div>
					<div
						className="control slide-right"
						onClick={() => setActiveIndex(activeIndex + 1)}
					>
						<img src={aboutPointsSlideRight} alt="slide-right" />
					</div>
				</div>
			)}
		</div>
	);
};

const Point = ({ icon, text, customClass = '', bgColor = '' }) => {
	const myStyle = {
		background: bgColor,
	};
	return (
		<div className={`point ${customClass}`}>
			<div className="icon-holder" style={bgColor ? myStyle : {}}>
				<img src={icon} alt="point-icon" />
			</div>
			<p>{text}</p>
		</div>
	);
};
