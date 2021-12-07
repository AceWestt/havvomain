import React, { useRef, useState, useEffect } from 'react';
import FormWrapper from '../components/FormWrapper';
import ReadOnlyToggle from '../components/ReadOnlyToggle';
import MultiLangInputField from '../components/MultiLangInputField';
import FileUploader from '../components/FileUploader';
import NumberField from '../components/NumberField';
import MaskedField from '../components/MaskedField';
import { Schema, Message, Form, ButtonToolbar, Button, toaster } from 'rsuite';
import axios from 'axios';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';
import titleInst from '../imgs/instructions/about-title.jpg';
import descrpTitleInst from '../imgs/instructions/about-descrp-title.jpg';
import textInst from '../imgs/instructions/about-text.jpg';
import logoCardInst from '../imgs/instructions/about-logo-card.jpg';
import workersCardInst from '../imgs/instructions/about-workers-count.jpg';
import workersTextInst from '../imgs/instructions/about-workers-text.jpg';
import firstImgCardInst from '../imgs/instructions/about-first-img-card.jpg';
import realProductNumberInst from '../imgs/instructions/about-real-product-count.jpg';
import realProductTextInst from '../imgs/instructions/about-real-product-text.jpg';
import secondImgCardInst from '../imgs/instructions/about-second-img-card.jpg';
import marketYearNumberInst from '../imgs/instructions/about-market-year-number.jpg';
import marketYearTextInst from '../imgs/instructions/about-market-year-text.jpg';
import firstPointColorIconInst from '../imgs/instructions/about-first-point-color-icon.jpg';
import firstPointTextInst from '../imgs/instructions/about-first-point-text.jpg';
import secondPointInst from '../imgs/instructions/about-second-point.jpg';
import thirdPointInst from '../imgs/instructions/about-third-point.jpg';

const AboutScreen = () => {
	const model = Schema.Model({
		blockTitleRu: Schema.Types.StringType().isRequired(
			'Введите заголовок на русском!'
		),
		blockTitleEn: Schema.Types.StringType().isRequired(
			'Введите заголовок на английском!'
		),
		titleRu: Schema.Types.StringType().isRequired(
			'Введите заголовок на русском!'
		),
		titleEn: Schema.Types.StringType().isRequired(
			'Введите заголовок на английском!'
		),
		textRu: Schema.Types.StringType().isRequired('Введите текст на русском!'),
		textEn: Schema.Types.StringType().isRequired('Введите текст на английском!'),
		logoCard: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(svg)$/i,
						'Неверный формат файла! Разрешен только "svg" '
					),
					size: Schema.Types.NumberType().max(
						1048576,
						'Размер файла не может превышать 1mb'
					),
				}),
			})
		),
		workerNumber: Schema.Types.NumberType().isRequired('Введите число!'),
		workersTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		workersTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
		firstImgCard: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(jpg|png|svg)$/i,
						'Неверный формат файла! Разрешены "jpg", "png" и "svg" '
					),
					size: Schema.Types.NumberType().max(
						1048576,
						'Размер файла не может превышать 1mb'
					),
				}),
			})
		),
		realProductNumber: Schema.Types.NumberType().isRequired('Введите число!'),
		realProductTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		realProductTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
		secondImgCard: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(jpg|png|svg)$/i,
						'Неверный формат файла! Разрешены "jpg", "png" и "svg" '
					),
					size: Schema.Types.NumberType().max(
						1048576,
						'Размер файла не может превышать 1mb'
					),
				}),
			})
		),
		marketYearNumber: Schema.Types.NumberType().isRequired('Введите число!'),
		marketYearTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		marketYearTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
		firstPointColor: Schema.Types.StringType()
			.isRequired('Введите hex код цвета!')
			.rangeLength(7, 7, 'Введитие цветовой код полностью!'),
		firstPointIcon: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(gif|svg)$/i,
						'Неверный формат файла! Разрешены "svg" и "gif" '
					),
					size: Schema.Types.NumberType().max(
						204800,
						'Размер файла не может превышать 200kb'
					),
				}),
			})
		),
		firstPointTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		firstPointTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
		secondPointColor: Schema.Types.StringType()
			.isRequired('Введите hex код цвета!')
			.rangeLength(7, 7, 'Введитие цветовой код полностью!'),
		secondPointIcon: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(gif|svg)$/i,
						'Неверный формат файла! Разрешены "svg" и "gif" '
					),
					size: Schema.Types.NumberType().max(
						204800,
						'Размер файла не может превышать 200kb'
					),
				}),
			})
		),
		secondPointTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		secondPointTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
		thirdPointColor: Schema.Types.StringType()
			.isRequired('Введите hex код цвета!')
			.rangeLength(7, 7, 'Введитие цветовой код полностью!'),
		thirdPointIcon: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(gif|svg)$/i,
						'Неверный формат файла! Разрешены "svg" и "gif" '
					),
					size: Schema.Types.NumberType().max(
						204800,
						'Размер файла не может превышать 200kb'
					),
				}),
			})
		),
		thirdPointTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		thirdPointTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
		fourthPointColor: Schema.Types.StringType()
			.isRequired('Введите hex код цвета!')
			.rangeLength(7, 7, 'Введитие цветовой код полностью!'),
		fourthPointIcon: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(gif|svg)$/i,
						'Неверный формат файла! Разрешены "svg" и "gif" '
					),
					size: Schema.Types.NumberType().max(
						204800,
						'Размер файла не может превышать 200kb'
					),
				}),
			})
		),
		fourthPointTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		fourthPointTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
		fifthPointColor: Schema.Types.StringType()
			.isRequired('Введите hex код цвета!')
			.rangeLength(7, 7, 'Введитие цветовой код полностью!'),
		fifthPointIcon: Schema.Types.ArrayType().of(
			Schema.Types.ObjectType().shape({
				blobFile: Schema.Types.ObjectType().shape({
					name: Schema.Types.StringType().pattern(
						/^.*\.(gif|svg)$/i,
						'Неверный формат файла! Разрешены "svg" и "gif" '
					),
					size: Schema.Types.NumberType().max(
						204800,
						'Размер файла не может превышать 200kb'
					),
				}),
			})
		),
		fifthPointTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском!'
		),
		fifthPointTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском!'
		),
	});

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		blockTitleRu: '',
		blockTitleEn: '',
		titleRu: '',
		titleEn: '',
		textRu: '',
		textEn: '',
		logoCard: [],
		workerNumber: 0,
		workersTextRu: '',
		workersTextEn: '',
		firstImgCard: [],
		realProductNumber: 0,
		realProductTextRu: '',
		realProductTextEn: '',
		secondImgCard: [],
		marketYearNumber: 0,
		marketYearTextRu: '',
		marketYearTextEn: '',
		firstPointColor: '',
		firstPointIcon: [],
		firstPointTextRu: '',
		firstPointTextEn: '',
		secondPointColor: '',
		secondPointIcon: [],
		secondPointTextRu: '',
		secondPointTextEn: '',
		thirdPointColor: '',
		thirdPointIcon: [],
		thirdPointTextRu: '',
		thirdPointTextEn: '',
		fourthPointColor: '',
		fourthPointIcon: [],
		fourthPointTextRu: '',
		fourthPointTextEn: '',
		fifthPointColor: '',
		fifthPointIcon: [],
		fifthPointTextRu: '',
		fifthPointTextEn: '',
	});

	const [isReady, setIsReady] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [id, setId] = useState(null);

	const { data, success, error, fetchData } = useAxiosGet('/api/aboutscreen');

	useEffect(() => {
		if (error) {
			if (error.response.data.error) {
				toaster.push(errorMessage(error.response.data.error), {
					placement: messagePlacement,
				});
			} else {
				toaster.push(errorMessage('Не удалось Получить данные!'), {
					placement: messagePlacement,
				});
			}
		}
		if (success) {
			setIsReady(true);
			setId(data._id);
			setFormValue({
				blockTitleRu: data.blockTitle.ru,
				blockTitleEn: data.blockTitle.en,
				titleRu: data.title.ru,
				titleEn: data.title.en,
				textRu: data.text.ru,
				textEn: data.text.en,
				logoCard: [],
				workerNumber: data.workerCard.number,
				workersTextRu: data.workerCard.text.ru,
				workersTextEn: data.workerCard.text.en,
				firstImgCard: [],
				realProductNumber: data.realProduct.number,
				realProductTextRu: data.realProduct.text.ru,
				realProductTextEn: data.realProduct.text.en,
				secondImgCard: [],
				marketYearNumber: data.marketYear.number,
				marketYearTextRu: data.marketYear.text.ru,
				marketYearTextEn: data.marketYear.text.en,
				firstPointColor: data.firstPoint.color,
				firstPointIcon: [],
				firstPointTextRu: data.firstPoint.text.ru,
				firstPointTextEn: data.firstPoint.text.en,
				secondPointColor: data.secondPoint.color,
				secondPointIcon: [],
				secondPointTextRu: data.secondPoint.text.ru,
				secondPointTextEn: data.secondPoint.text.en,
				thirdPointColor: data.thirdPoint.color,
				thirdPointIcon: [],
				thirdPointTextRu: data.thirdPoint.text.ru,
				thirdPointTextEn: data.thirdPoint.text.en,
				fourthPointColor: data.fourthPoint.color,
				fourthPointIcon: [],
				fourthPointTextRu: data.fourthPoint.text.ru,
				fourthPointTextEn: data.fourthPoint.text.en,
				fifthPointColor: data.fifthPoint.color,
				fifthPointIcon: [],
				fifthPointTextRu: data.fifthPoint.text.ru,
				fifthPointTextEn: data.fifthPoint.text.en,
			});
		}
	}, [data, success, error]);

	const errorMessage = (error) => {
		return (
			<Message showIcon type="error">
				{error}
			</Message>
		);
	};
	const successMessage = () => {
		return (
			<Message showIcon type="success" duration={5000}>
				<b>Успех!</b>
				<br />
				Пожалуйста, не забудьте включить редактирование перед тем как снова
				приступить к работе.
			</Message>
		);
	};
	const messagePlacement = 'topCenter';

	const onSubmit = async () => {
		if (formRef.current.check()) {
			setIsReady(false);
			setIsEditable(false);

			const formData = new FormData();
			formData.append(
				'blockTitle',
				JSON.stringify({
					ru: formValue.blockTitleRu,
					en: formValue.blockTitleEn,
				})
			);
			formData.append(
				'title',
				JSON.stringify({
					ru: formValue.titleRu,
					en: formValue.titleEn,
				})
			);
			formData.append(
				'text',
				JSON.stringify({
					ru: formValue.textRu,
					en: formValue.textEn,
				})
			);
			formData.append('logoCard', formValue.logoCard?.[0]?.blobFile || null);
			formData.append(
				'workerCard',
				JSON.stringify({
					text: {
						ru: formValue.workersTextRu,
						en: formValue.workersTextEn,
					},
					number: formValue.workerNumber,
				})
			);
			formData.append(
				'firstImgCard',
				formValue.firstImgCard?.[0]?.blobFile || null
			);
			formData.append(
				'realProduct',
				JSON.stringify({
					text: {
						ru: formValue.realProductTextRu,
						en: formValue.realProductTextEn,
					},
					number: formValue.realProductNumber,
				})
			);
			formData.append(
				'secondImgCard',
				formValue.secondImgCard?.[0]?.blobFile || null
			);
			formData.append(
				'marketYear',
				JSON.stringify({
					text: {
						ru: formValue.marketYearTextRu,
						en: formValue.marketYearTextEn,
					},
					number: formValue.marketYearNumber,
				})
			);
			formData.append(
				'firstPoint',
				JSON.stringify({
					text: {
						ru: formValue.firstPointTextRu,
						en: formValue.firstPointTextEn,
					},
					color: formValue.firstPointColor,
				})
			);
			formData.append(
				'firstPointIcon',
				formValue.firstPointIcon?.[0]?.blobFile || null
			);
			formData.append(
				'secondPoint',
				JSON.stringify({
					text: {
						ru: formValue.secondPointTextRu,
						en: formValue.secondPointTextEn,
					},
					color: formValue.secondPointColor,
				})
			);
			formData.append(
				'secondPointIcon',
				formValue.secondPointIcon?.[0]?.blobFile || null
			);
			formData.append(
				'thirdPoint',
				JSON.stringify({
					text: {
						ru: formValue.thirdPointTextRu,
						en: formValue.thirdPointTextEn,
					},
					color: formValue.thirdPointColor,
				})
			);
			formData.append(
				'thirdPointIcon',
				formValue.thirdPointIcon?.[0]?.blobFile || null
			);
			formData.append(
				'fourthPoint',
				JSON.stringify({
					text: {
						ru: formValue.fourthPointTextRu,
						en: formValue.fourthPointTextEn,
					},
					color: formValue.fourthPointColor,
				})
			);
			formData.append(
				'fourthPointIcon',
				formValue.fourthPointIcon?.[0]?.blobFile || null
			);
			formData.append(
				'fifthPoint',
				JSON.stringify({
					text: {
						ru: formValue.fifthPointTextRu,
						en: formValue.fifthPointTextEn,
					},
					color: formValue.fifthPointColor,
				})
			);
			formData.append(
				'fifthPointIcon',
				formValue.fifthPointIcon?.[0]?.blobFile || null
			);

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.put(
					`/api/aboutscreen/${id}`,
					formData,
					config
				);

				if (data.status === 'success') {
					setIsReady(true);
					toaster.push(successMessage(), {
						placement: messagePlacement,
					});
					await fetchData();
				}
			} catch (error) {
				if (error.response.data.error) {
					toaster.push(errorMessage(error.response.data.error), {
						placement: messagePlacement,
					});
				} else {
					toaster.push(errorMessage('Не удалось сохранить изменения!'), {
						placement: messagePlacement,
					});
				}
			}
		}
	};

	return (
		<FormWrapper
			customClass="about-screen-form"
			formRef={formRef}
			onChange={setFormValue}
			onCheck={setFormError}
			model={model}
			formValue={formValue}
			onSubmit={onSubmit}
			readOnly={!isEditable}
		>
			<ReadOnlyToggle
				checked={isEditable}
				loading={!isReady}
				disabled={!isReady}
				onChange={setIsEditable}
			/>
			<MultiLangInputField
				runame="blockTitleRu"
				enname="blockTitleEn"
				label="Заголовок блока"
				popoverProps={{
					text: 'Заголовок на блоке “о нас”',
					img: descrpTitleInst,
				}}
				ruerror={formError.blockTitleRu}
				enerror={formError.blockTitleEn}
			/>
			<MultiLangInputField
				runame="titleRu"
				enname="titleEn"
				label="Заголовок описания"
				popoverProps={{
					text: 'Заголовок описания',
					img: titleInst,
				}}
				ruerror={formError.titleRu}
				enerror={formError.titleEn}
			/>
			<MultiLangInputField
				textarea
				runame="textRu"
				enname="textEn"
				label="Текст описания"
				popoverProps={{
					text: 'Текст описания',
					img: textInst,
				}}
				ruerror={formError.textRu}
				enerror={formError.textEn}
			/>

			<FileUploader
				label="Карточка с логотипом"
				name="logoCard"
				disabled={formValue.logoCard.length > 0}
				oldImg={data?.logoCard}
				popoverProps={{
					text: 'Карточка с логотипом',
					img: logoCardInst,
				}}
				errExt={
					formError.logoCard?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.logoCard?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>
			<NumberField
				name="workerNumber"
				label="Число на карточке о сотрудниках"
				min={0}
				error={formError.workerNumber}
				popoverProps={{
					text: 'Число на карточке о сотрудниках',
					img: workersCardInst,
				}}
			/>

			<MultiLangInputField
				runame="workersTextRu"
				enname="workersTextEn"
				label="Текст на карточке о сотрудниках"
				textarea
				popoverProps={{
					text: 'Текст на карточке о сотрудниках',
					img: workersTextInst,
				}}
				ruerror={formError.workersTextRu}
				enerror={formError.workersTextEn}
			/>
			<FileUploader
				label="Первая карточка с картинкой"
				name="firstImgCard"
				disabled={formValue.firstImgCard.length > 0}
				oldImg={data?.firstImgCard}
				popoverProps={{
					text: 'Первая карточка с картинкой',
					img: firstImgCardInst,
				}}
				errExt={
					formError.firstImgCard?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.firstImgCard?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>

			<NumberField
				name="realProductNumber"
				label="Число на карточке о реализованной продукции"
				min={0}
				error={formError.realProductNumber}
				popoverProps={{
					text: 'Число на карточке о реализованной продукции',
					img: realProductNumberInst,
				}}
			/>

			<MultiLangInputField
				runame="realProductTextRu"
				enname="realProductTextEn"
				label="Текст на карточке о реализованной продукции"
				textarea
				popoverProps={{
					text: 'Текст на карточке о реализованной продукции',
					img: realProductTextInst,
				}}
				ruerror={formError.realProductTextRu}
				enerror={formError.realProductTextEn}
			/>

			<FileUploader
				label="Вторая карточка с картинкой"
				name="secondImgCard"
				disabled={formValue.secondImgCard.length > 0}
				oldImg={data?.secondImgCard}
				popoverProps={{
					text: 'Вторая карточка с картинкой',
					img: secondImgCardInst,
				}}
				errExt={
					formError.secondImgCard?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.secondImgCard?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>

			<NumberField
				name="marketYearNumber"
				label="Число на карточке о рынке"
				min={0}
				error={formError.marketYearNumber}
				popoverProps={{
					text: 'Число на карточке о рынке',
					img: marketYearNumberInst,
				}}
			/>

			<MultiLangInputField
				runame="marketYearTextRu"
				enname="marketYearTextEn"
				label="Текст на карточке о рынке"
				textarea
				popoverProps={{
					text: 'Текст на карточке о рынке',
					img: marketYearTextInst,
				}}
				ruerror={formError.marketYearTextRu}
				enerror={formError.marketYearTextEn}
			/>

			<MaskedField
				name="firstPointColor"
				label="Цветовой код фона первой бирки (hex)"
				mask="#******"
				popoverProps={{
					text: 'Цветовой код фона первой бирки (hex)',
					img: firstPointColorIconInst,
				}}
				error={formError.firstPointColor}
			/>

			<FileUploader
				label="Иконка на первой бирки"
				name="firstPointIcon"
				disabled={formValue.firstPointIcon.length > 0}
				oldImg={data?.firstPoint.icon}
				popoverProps={{
					text: 'Иконка на первой бирки',
					img: firstPointColorIconInst,
				}}
				errExt={
					formError.firstPointIcon?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.firstPointIcon?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>

			<MultiLangInputField
				runame="firstPointTextRu"
				enname="firstPointTextEn"
				label="Текст на первой бирки"
				textarea
				popoverProps={{
					text: 'Текст на первой бирки',
					img: firstPointTextInst,
				}}
				ruerror={formError.firstPointTextRu}
				enerror={formError.firstPointTextEn}
			/>

			<MaskedField
				name="secondPointColor"
				label="Цветовой код фона второй бирки (hex)"
				mask="#******"
				popoverProps={{
					text: 'Цветовой код фона второй бирки (hex)',
					img: secondPointInst,
				}}
				error={formError.secondPointColor}
			/>

			<FileUploader
				label="Иконка на второй бирки"
				name="secondPointIcon"
				disabled={formValue.secondPointIcon.length > 0}
				oldImg={data?.secondPoint.icon}
				popoverProps={{
					text: 'Иконка на второй бирки',
					img: secondPointInst,
				}}
				errExt={
					formError.secondPointIcon?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.secondPointIcon?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>

			<MultiLangInputField
				runame="secondPointTextRu"
				enname="secondPointTextEn"
				label="Текст на второй бирки"
				textarea
				popoverProps={{
					text: 'Текст на второй бирки',
					img: secondPointInst,
				}}
				ruerror={formError.secondPointTextRu}
				enerror={formError.secondPointTextEn}
			/>

			<MaskedField
				name="thirdPointColor"
				label="Цветовой код фона третьей бирки (hex)"
				mask="#******"
				popoverProps={{
					text: 'Цветовой код фона третьей бирки (hex)',
					img: thirdPointInst,
				}}
				error={formError.thirdPointColor}
			/>

			<FileUploader
				label="Иконка на третьей бирки"
				name="thirdPointIcon"
				disabled={formValue.thirdPointIcon.length > 0}
				oldImg={data?.thirdPoint.icon}
				popoverProps={{
					text: 'Иконка на третьей бирки',
					img: thirdPointInst,
				}}
				errExt={
					formError.thirdPointIcon?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.thirdPointIcon?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>

			<MultiLangInputField
				runame="thirdPointTextRu"
				enname="thirdPointTextEn"
				label="Текст на третьей бирки"
				textarea
				popoverProps={{
					text: 'Текст на третьей бирки',
					img: thirdPointInst,
				}}
				ruerror={formError.thirdPointTextRu}
				enerror={formError.thirdPointTextEn}
			/>

			<MaskedField
				name="fourthPointColor"
				label="Цветовой код фона четвертой бирки (hex)"
				mask="#******"
				popoverProps={{
					text: 'Цветовой код фона четвертой бирки (hex)',
					img: thirdPointInst,
				}}
				error={formError.fourthPointColor}
			/>

			<FileUploader
				label="Иконка на четвертой бирки"
				name="fourthPointIcon"
				disabled={formValue.fourthPointIcon.length > 0}
				oldImg={data?.fourthPoint.icon}
				popoverProps={{
					text: 'Иконка на четвертой бирки',
					img: thirdPointInst,
				}}
				errExt={
					formError.fourthPointIcon?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.fourthPointIcon?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>

			<MultiLangInputField
				runame="fourthPointTextRu"
				enname="fourthPointTextEn"
				label="Текст на четвертой бирки"
				textarea
				popoverProps={{
					text: 'Текст на четвертой бирки',
					img: thirdPointInst,
				}}
				ruerror={formError.fourthPointTextRu}
				enerror={formError.fourthPointTextEn}
			/>

			<MaskedField
				name="fifthPointColor"
				label="Цветовой код фона пятой бирки (hex)"
				mask="#******"
				popoverProps={{
					text: 'Цветовой код фона пятой бирки (hex)',
					img: thirdPointInst,
				}}
				error={formError.fifthPointColor}
			/>

			<FileUploader
				label="Иконка на пятой бирки"
				name="fifthPointIcon"
				disabled={formValue.fifthPointIcon.length > 0}
				oldImg={data?.fifthPoint.icon}
				popoverProps={{
					text: 'Иконка на пятой бирки',
					img: thirdPointInst,
				}}
				errExt={
					formError.fifthPointIcon?.array?.[0]?.object?.blobFile?.object?.name
						?.errorMessage
				}
				errSize={
					formError.fifthPointIcon?.array?.[0]?.object?.blobFile?.object?.size
						?.errorMessage
				}
			/>

			<MultiLangInputField
				runame="fifthPointTextRu"
				enname="fifthPointTextEn"
				label="Текст на пятой бирки"
				textarea
				popoverProps={{
					text: 'Текст на пятой бирки',
					img: thirdPointInst,
				}}
				ruerror={formError.fifthPointTextRu}
				enerror={formError.fifthPointTextEn}
			/>

			<Form.Group>
				<ButtonToolbar>
					<Button
						appearance="primary"
						color="cyan"
						loading={!isReady}
						disabled={!isEditable}
						type="submit"
					>
						Сохранить
					</Button>
				</ButtonToolbar>
			</Form.Group>
		</FormWrapper>
	);
};

export default AboutScreen;
