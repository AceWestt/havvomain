import React, { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import Section from '../components/Section';
import bg from '../imgs/products_bg.svg';
import Modal from '../components/Modal';
import modalCloseIcn from '../imgs/modal-close-icn.svg';
import { gsap } from 'gsap';
import { useAppContext } from '../context';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';

const Products = () => {
	const { data } = useAxiosGet('/api/othersscreen');
	const { data: categories } = useAxiosGet('/api/products/cats');

	const { lang, productsSectionRef } = useAppContext();

	const [activeCategory, setActiveCategory] = useState(0);
	const [isModalShown, setModalShown] = useState(false);
	const showModal = (i) => {
		setActiveCategory(i);
		setModalShown(true);
		const { body } = document;
		body.style.overflow = 'hidden';
	};
	const hideModal = () => {
		setModalShown(false);
		const { body } = document;
		body.style.overflow = '';
	};

	const titleRef = useRef(null);
	const productsRef = useRef(null);

	useEffect(() => {
		gsap.set(titleRef.current, { y: 20, opacity: 0 });

		gsap.to(titleRef.current, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: titleRef.current,
			},
		});
	}, []);

	useEffect(() => {
		if (categories && categories.length > 0) {
			gsap.set(productsRef.current.children, { y: 20, opacity: 0 });
			gsap.to(productsRef.current.children, {
				opacity: 1,
				y: 0,
				scrollTrigger: {
					trigger: productsRef.current,
					start: '300px 100%',
				},
				stagger: {
					each: 0.2,
				},
			});
		}
	}, [categories]);

	return (
		<>
			<Section
				className="products-section"
				sectionTitle={data?.productTitle[lang]}
				bg={Bg}
				titleRef={titleRef}
				sectionRef={productsSectionRef}
			>
				<div className="product-list-wrapper" ref={productsRef}>
					{categories?.map((c, i) => {
						return (
							<Category
								key={`product-category-${i}`}
								category={c}
								id={i}
								showModal={showModal}
								lang={lang}
							/>
						);
					})}
				</div>
			</Section>
			{isModalShown && (
				<ProductModal category={activeCategory} hideModal={hideModal} lang={lang} />
			)}
		</>
	);
};

export default Products;

const Bg = () => {
	return <span />;
};

const Category = ({ category, customClass = '', showModal, lang }) => {
	const { name, img, description, titleBg } = category;

	return (
		<div className={`category ${customClass}`}>
			<div className="img-holder">
				<img src={img} className="img" alt={name.en} />
			</div>

			<div className="more">
				<img src={titleBg} alt="bg" className="bg" />
				<div className="title">{name[lang]}</div>
				<p>{description[lang]}</p>
				<Button title="Подробнее" outline onClick={() => showModal(category)} />
			</div>
		</div>
	);
};

const ProductModal = ({ category, hideModal, lang }) => {
	const { data } = useAxiosGet(`/api/products/products/${category._id}`);
	return (
		<Modal customClass="product-detailed-modal">
			<div className="product-modal-container">
				<img className="bg" src={bg} alt="bg" />
				<div className="header">
					<span className="title">{category.name[lang]}:</span>
					<img
						className="close-button"
						src={modalCloseIcn}
						alt="close-modal"
						onClick={hideModal}
					/>
				</div>
				<div className="body">
					<div className="product-list">
						{data?.map((product, index) => {
							const { name, img, description, fields } = product;
							return (
								<div
									className="product"
									key={`category-product-${index}-${Date.now()}`}
								>
									<img src={img} alt={name.en} />
									<div className="details">
										<div className="title">{name[lang]}</div>
										<p>{description[lang]}</p>
										<div className="fields">
											<div className="field">
												<div className="field-key">{fields.one.label[lang]}</div>
												<div className="field-value">{fields.one.value[lang]}</div>
											</div>
											<div className="field">
												<div className="field-key">{fields.two.label[lang]}</div>
												<div className="field-value">{fields.two.value[lang]}</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Modal>
	);
};
