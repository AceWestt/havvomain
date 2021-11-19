import React, { useRef, useState } from 'react';
import {
	Schema,
	Message,
	Form,
	ButtonToolbar,
	Button,
	toaster,
	Drawer,
} from 'rsuite';
import FormWrapper from '../../FormWrapper';
import MultiLangInputField from '../../MultiLangInputField';
import FileUploader from '../../FileUploader';
import axios from 'axios';
import imgInst from '../../../imgs/instructions/product-img.jpg';
import nameInst from '../../../imgs/instructions/product-name.jpg';
import descInst from '../../../imgs/instructions/product-description.jpg';
import fieldInst from '../../../imgs/instructions/product-fields.jpg';

const AddProduct = React.forwardRef((props, ref) => {
	const { open, onClose, cat_id, fetchProductData } = props;

	const model = Schema.Model({
		img: Schema.Types.ArrayType()
			.minLength(1, 'Загрузите картинку!')
			.of(
				Schema.Types.ObjectType().shape({
					blobFile: Schema.Types.ObjectType().shape({
						name: Schema.Types.StringType().pattern(
							/^.*\.(jpg|png|svg)$/i,
							'Неверный формат файла! Разрешены "jpg", "png" и "svg" '
						),
						size: Schema.Types.NumberType().max(
							3145728,
							'Размер файла не может превышать 3mb'
						),
					}),
				})
			),
		nameRu: Schema.Types.StringType().isRequired(
			'Введите название продукта на русском!'
		),
		nameEn: Schema.Types.StringType().isRequired(
			'Введите название продукта на английском!'
		),
		descriptionRu: Schema.Types.StringType().isRequired(
			'Введите описание продукта на русском!'
		),
		descriptionEn: Schema.Types.StringType().isRequired(
			'Введите описание продукта на английском!'
		),
		fieldOneLabelRu: Schema.Types.StringType().isRequired(
			'Введите название первой характеристики продукта на русском!'
		),
		fieldOneLabelEn: Schema.Types.StringType().isRequired(
			'Введите название первой характеристики продукта на английском!'
		),
		fieldOneValueRu: Schema.Types.StringType().isRequired(
			'Введите значение первой характеристики продукта на русском!'
		),
		fieldOneValueEn: Schema.Types.StringType().isRequired(
			'Введите значение первой характеристики продукта на английском!'
		),
		fieldTwoLabelRu: Schema.Types.StringType().isRequired(
			'Введите название второй характеристики продукта на русском!'
		),
		fieldTwoLabelEn: Schema.Types.StringType().isRequired(
			'Введите название второй характеристики продукта на английском!'
		),
		fieldTwoValueRu: Schema.Types.StringType().isRequired(
			'Введите значение второй характеристики продукта на русском!'
		),
		fieldTwoValueEn: Schema.Types.StringType().isRequired(
			'Введите значение второй характеристики продукта на английском!'
		),
	});

	const defaultFormValue = {
		img: [],
		nameRu: '',
		nameEn: '',
		descriptionRu: '',
		descriptionEn: '',
		fieldOneLabelRu: '',
		fieldOneLabelEn: '',
		fieldOneValueRu: '',
		fieldOneValueEn: '',
		fieldTwoLabelRu: '',
		fieldTwoLabelEn: '',
		fieldTwoValueRu: '',
		fieldTwoValueEn: '',
	};

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState(defaultFormValue);

	const [isReady, setIsReady] = useState(true);

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
				Добавлено!
			</Message>
		);
	};
	const messagePlacement = 'topCenter';

	const onSubmit = async () => {
		if (formRef.current.check()) {
			setIsReady(false);

			const formData = new FormData();

			formData.append('img', formValue.img?.[0]?.blobFile || null);
			formData.append(
				'name',
				JSON.stringify({
					ru: formValue.nameRu,
					en: formValue.nameEn,
				})
			);
			formData.append(
				'description',
				JSON.stringify({
					ru: formValue.descriptionRu,
					en: formValue.descriptionEn,
				})
			);
			formData.append(
				'fields',
				JSON.stringify({
					one: {
						label: {
							ru: formValue.fieldOneLabelRu,
							en: formValue.fieldOneLabelEn,
						},
						value: {
							ru: formValue.fieldOneValueRu,
							en: formValue.fieldOneValueEn,
						},
					},
					two: {
						label: {
							ru: formValue.fieldTwoLabelRu,
							en: formValue.fieldTwoLabelEn,
						},
						value: {
							ru: formValue.fieldTwoValueRu,
							en: formValue.fieldTwoValueEn,
						},
					},
				})
			);
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.post(
					`/api/products/products/${cat_id}`,
					formData,
					config
				);

				if (data.status === 'success') {
					setIsReady(true);
					setFormValue(defaultFormValue);
					fetchProductData();
					onClose();
					toaster.push(successMessage(), {
						placement: messagePlacement,
					});
				}
			} catch (error) {
				if (error.response.data.error) {
					toaster.push(errorMessage(error.response.data.error), {
						placement: messagePlacement,
					});
				} else {
					toaster.push(errorMessage('Не удалось добавить продукцию!'), {
						placement: messagePlacement,
					});
				}
			}
		}
	};

	return (
		<Drawer ref={ref} open={open} onClose={onClose} size="md">
			<Drawer.Header>
				<Drawer.Title>Добавить продукт</Drawer.Title>
			</Drawer.Header>
			<Drawer.Body>
				<FormWrapper
					customClass="products-add-cat-form"
					formRef={formRef}
					onChange={setFormValue}
					onCheck={setFormError}
					model={model}
					formValue={formValue}
					onSubmit={onSubmit}
				>
					<FileUploader
						label="Изображение продукта"
						name="img"
						disabled={formValue.img.length > 0}
						popoverProps={{
							text: 'Изображение продукта',
							img: imgInst,
						}}
						errExt={
							formError.img?.array?.[0]?.object?.blobFile?.object?.name?.errorMessage
						}
						errSize={
							formError.img?.array?.[0]?.object?.blobFile?.object?.size?.errorMessage
						}
					/>
					<MultiLangInputField
						runame="nameRu"
						enname="nameEn"
						label="Наименование продукта"
						popoverProps={{
							text: 'Наименование продукта',
							img: nameInst,
						}}
						ruerror={formError.nameRu}
						enerror={formError.nameEn}
					/>
					<MultiLangInputField
						runame="descriptionRu"
						enname="descriptionEn"
						label="Описание продукта"
						textarea
						popoverProps={{
							text: 'Описание продукта',
							img: descInst,
						}}
						ruerror={formError.descriptionRu}
						enerror={formError.descriptionEn}
					/>
					<MultiLangInputField
						runame="fieldOneLabelRu"
						enname="fieldOneLabelEn"
						label="Названия первой характеристики продукта"
						popoverProps={{
							text: 'Названия первой характеристики продукта',
							img: fieldInst,
						}}
						ruerror={formError.fieldOneLabelRu}
						enerror={formError.fieldOneLabelEn}
					/>
					<MultiLangInputField
						runame="fieldOneValueRu"
						enname="fieldOneValueEn"
						label="Значение первой характеристики продукта"
						popoverProps={{
							text: 'Значение первой характеристики продукта',
							img: fieldInst,
						}}
						ruerror={formError.fieldOneValueRu}
						enerror={formError.fieldOneValueEn}
					/>
					<MultiLangInputField
						runame="fieldTwoLabelRu"
						enname="fieldTwoLabelEn"
						label="Названия второй характеристики продукта"
						popoverProps={{
							text: 'Названия второй характеристики продукта',
							img: fieldInst,
						}}
						ruerror={formError.fieldTwoLabelRu}
						enerror={formError.fieldTwoLabelEn}
					/>
					<MultiLangInputField
						runame="fieldTwoValueRu"
						enname="fieldTwoValueEn"
						label="Значение второй характеристики продукта"
						popoverProps={{
							text: 'Значение второй характеристики продукта',
							img: fieldInst,
						}}
						ruerror={formError.fieldTwoValueRu}
						enerror={formError.fieldTwoValueEn}
					/>

					<Form.Group>
						<ButtonToolbar>
							<Button
								appearance="primary"
								color="cyan"
								loading={!isReady}
								type="submit"
							>
								Сохранить
							</Button>
						</ButtonToolbar>
					</Form.Group>
				</FormWrapper>
			</Drawer.Body>
		</Drawer>
	);
});

export default AddProduct;
