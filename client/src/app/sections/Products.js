import React, { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import Section from '../components/Section';
import bg from '../imgs/products_bg.svg';
import { sampleData } from '../sampleData';
import Modal from '../components/Modal';
import modalCloseIcn from '../imgs/modal-close-icn.svg';
import { gsap } from 'gsap';
import { useAppContext } from '../context';

const Products = () => {
	const { productsSectionRef } = useAppContext();

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
		gsap.set(productsRef.current.children, { y: 20, opacity: 0 });

		gsap.to(titleRef.current, {
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: titleRef.current,
			},
		});
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
	}, []);

	return (
		<>
			<Section
				className="products-section"
				sectionTitle="Наша продукция"
				bg={Bg}
				titleRef={titleRef}
				sectionRef={productsSectionRef}
			>
				<div className="product-list-wrapper" ref={productsRef}>
					{sampleData.map((c, i) => {
						return (
							<Category
								key={`product-category-${i}`}
								category={c}
								id={i}
								showModal={showModal}
							/>
						);
					})}
				</div>
			</Section>
			{isModalShown && (
				<ProductModal category={sampleData[activeCategory]} hideModal={hideModal} />
			)}
		</>
	);
};

export default Products;

const Bg = () => {
	return <span />;
};

const Category = ({ category, customClass = '', id, showModal }) => {
	const { title, img, detailBlockBgImg, products } = category;
	let productsText = '';
	products.map((p) => {
		productsText += `${p.title.ru}, `;
		return p;
	});
	return (
		<div className={`category ${customClass}`}>
			<div className="img-holder">
				<img src={img} className="img" alt={title.en} />
			</div>

			<div className="more">
				<img src={detailBlockBgImg} alt="bg" className="bg" />
				<div className="title">{title.ru}</div>
				<p>{productsText.substr(0, productsText.length - 2)}</p>
				<Button title="Подробнее" outline onClick={() => showModal(id)} />
			</div>
		</div>
	);
};

const ProductModal = ({ category, hideModal }) => {
	const { title, products } = category;
	return (
		<Modal customClass="product-detailed-modal">
			<div className="product-modal-container">
				<img className="bg" src={bg} alt="bg" />
				<div className="header">
					<span className="title">{title.ru}:</span>
					<img
						className="close-button"
						src={modalCloseIcn}
						alt="close-modal"
						onClick={hideModal}
					/>
				</div>
				<div className="body">
					<div className="product-list">
						{products.map((product, index) => {
							const { title, img, description, fields } = product;
							return (
								<div
									className="product"
									key={`category-product-${index}-${Date.now()}`}
								>
									<img src={img} alt={title.ru} />
									<div className="details">
										<div className="title">{title.ru}</div>
										<p>{description.ru}</p>
										<div className="fields">
											{fields.map((f, i) => {
												return (
													<div className="field" key={`product-field-${i}`}>
														<div className="field-key">{f.title.ru}</div>
														<div className="field-value">{f.value.ru}</div>
													</div>
												);
											})}
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
