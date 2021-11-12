import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import mapPointIcn from '../imgs/map_point_icn.png';
import mapPointMainIcn from '../imgs/map_point_main_icn.png';
import { gsap } from 'gsap';
import { useAppContext } from '../context';

const MapSection = () => {
	const { mapSectionRef } = useAppContext();

	const [activeContinent, setActiveContinent] = useState(0);

	const titleRef = useRef(null);
	const descriptionRef = useRef(null);
	const continentsRef = useRef(null);
	const mapRef = useRef(null);

	useEffect(() => {
		gsap.set(titleRef.current, { y: 20, opacity: 0 });
		gsap.set(descriptionRef.current.children, { y: 20, opacity: 0 });
		gsap.set(continentsRef.current.children, { y: 20, opacity: 0 });
		gsap.set(mapRef.current, { y: 20, opacity: 0 });
		gsap.to(titleRef.current, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: titleRef.current,
			},
		});
		gsap.to(descriptionRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: descriptionRef.current,
				start: '100% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
		gsap.to(continentsRef.current.children, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: continentsRef.current,
				start: '100% 100%',
			},
			stagger: {
				each: 0.2,
			},
		});
		gsap.to(mapRef.current, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: titleRef.current,
			},
		});
	}, []);

	return (
		<Section
			className="map-section"
			sectionTitle="География поставок"
			titleRef={titleRef}
			sectionRef={mapSectionRef}
		>
			<div className="short-description-wrap" ref={descriptionRef}>
				<span className="title">Мы работаем с такими странами, как:</span>
				<span className="content">
					Россия, Германия, Кахастан, Киргизстан, Афганистан, Украина, Эквадор
				</span>
			</div>
			<div className="continent-wrap" ref={continentsRef}>
				{continents.map((c, i) => {
					return (
						<div
							className={`continent ${i === activeContinent ? 'active' : ''}`}
							key={`continent-name-${i}`}
							onClick={() => setActiveContinent(i)}
						>
							{c.title.ru}
						</div>
					);
				})}
			</div>
			<div className="map-wrap" ref={mapRef}>
				<YMaps>
					<Map
						className="map"
						state={{ center: continents[activeContinent].center, zoom: 5 }}
					>
						{continents[activeContinent].list.map((c, i) => {
							return (
								<Placemark
									geometry={c}
									key={`map-placemark-${i}`}
									options={{
										iconLayout: 'default#image',
										iconImageHref: mapPointIcn,
										iconImageSize: [27, 35],
									}}
								/>
							);
						})}
						<Placemark
							geometry={[41.3775, 64.5853]}
							options={{
								iconLayout: 'default#image',
								iconImageHref: mapPointMainIcn,
								iconImageSize: [150, 70],
							}}
						/>
					</Map>
				</YMaps>
			</div>
		</Section>
	);
};

export default MapSection;

const continents = [
	{
		title: { ru: 'Средняя Азия', en: 'Central Asia' },
		list: [
			[48.0196, 66.9237],
			[41.2044, 74.7661],
		],
		center: [41.3775, 64.5853],
	},
	{
		title: { ru: 'Eвропа', en: 'Europe' },
		list: [[51.1657, 10.4515]],
		center: [51.1657, 10.4515],
	},
	{
		title: { ru: 'Южная Америка', en: 'South America' },
		list: [[23.6345, -102.5528]],
		center: [23.6345, -102.5528],
	},
];
