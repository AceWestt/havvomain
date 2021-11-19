import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import mapPointIcn from '../imgs/map_point_icn.png';
import mapPointMainIcn from '../imgs/map_point_main_icn.png';
import { gsap } from 'gsap';
import { useAppContext } from '../context';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';

const MapSection = () => {
	const { data } = useAxiosGet('/api/othersscreen');
	const { data: continents } = useAxiosGet('/api/locations/continents');

	const { lang, mapSectionRef } = useAppContext();

	const [activeContinent, setActiveContinent] = useState(null);
	const [locations, setLocations] = useState([]);
	const { data: locationsData } = useAxiosGet(`/api/locations/locations/`);
	const { data: contactData } = useAxiosGet('/api/contactscreen');

	useEffect(() => {
		if (continents && continents.length > 0) {
			setActiveContinent(continents[0]);
			gsap.set(continentsRef.current.children, { y: 20, opacity: 0 });
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
		}
	}, [continents]);

	useEffect(() => {
		if (locationsData && locationsData.length > 0 && activeContinent) {
			const locations = locationsData.filter(
				(l) => l.continent_id === activeContinent._id
			);
			setLocations(locations);
		}
	}, [activeContinent, locationsData]);

	const titleRef = useRef(null);
	const descriptionRef = useRef(null);
	const continentsRef = useRef(null);
	const mapRef = useRef(null);

	useEffect(() => {
		gsap.set(titleRef.current, { y: 20, opacity: 0 });
		gsap.set(descriptionRef.current.children, { y: 20, opacity: 0 });

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
			sectionTitle={data?.mapTitle[lang]}
			titleRef={titleRef}
			sectionRef={mapSectionRef}
		>
			<div className="short-description-wrap" ref={descriptionRef}>
				<span className="title">{data?.mapText.top[lang]}</span>
				<span className="content">{data?.mapText.bottom[lang]}</span>
			</div>
			<div className="continent-wrap" ref={continentsRef}>
				{continents?.map((c, i) => {
					return (
						<div
							className={`continent ${c === activeContinent ? 'active' : ''}`}
							key={`continent-name-${c._id}`}
							onClick={() => setActiveContinent(c)}
						>
							{c.name[lang]}
						</div>
					);
				})}
			</div>
			<div className="map-wrap" ref={mapRef}>
				<YMaps>
					{activeContinent && activeContinent.central && (
						<Map
							className="map"
							state={{
								center: [activeContinent.central.long, activeContinent.central.lat],
								zoom: 5,
							}}
						>
							{locations &&
								locations.length > 0 &&
								locations.map((l, i) => {
									return (
										<Placemark
											geometry={[l.long, l.lat]}
											key={`map-placemark-${l._id}`}
											options={{
												iconLayout: 'default#image',
												iconImageHref: mapPointIcn,
												iconImageSize: [27, 35],
											}}
										/>
									);
								})}
							{contactData && contactData.officeCoords && (
								<Placemark
									geometry={[
										contactData.officeCoords.long,
										contactData.officeCoords.lat,
									]}
									options={{
										iconLayout: 'default#image',
										iconImageHref: mapPointMainIcn,
										iconImageSize: [150, 70],
									}}
								/>
							)}
						</Map>
					)}
				</YMaps>
			</div>
		</Section>
	);
};

export default MapSection;
