import React from 'react';

const Section = ({
	className,
	sectionRef = null,
	sectionTitle,
	titleRef = null,
	bg: Bg,
	children,
}) => {
	return (
		<section
			className={className ? `section ${className}` : 'section'}
			ref={sectionRef}
		>
			{Bg && <div className="bg-wrap">{<Bg />}</div>}
			{sectionTitle && (
				<div className="section-title" ref={titleRef}>
					<h3 className="section-title">{sectionTitle}</h3>
				</div>
			)}
			<div className="container">{children}</div>
		</section>
	);
};

export default Section;
