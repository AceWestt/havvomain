import React, { useEffect, useRef, useState } from 'react';
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
import ReadOnlyToggle from '../../ReadOnlyToggle';
import MultiLangInputField from '../../MultiLangInputField';
import FileUploader from '../../FileUploader';
import axios from 'axios';
import nameInst from '../../../imgs/instructions/product-cat-name.jpg';
import descInst from '../../../imgs/instructions/product-cat-description.jpg';
import imgInst from '../../../imgs/instructions/product-cat-img.jpg';

const EditCat = React.forwardRef((props, ref) => {
	const { open, onClose, cat } = props;

	const model = Schema.Model({
		nameRu: Schema.Types.StringType().isRequired(
			'Введите название продукции на русском!'
		),
		nameEn: Schema.Types.StringType().isRequired(
			'Введите название продукции на английском!'
		),
		descriptionRu: Schema.Types.StringType().isRequired(
			'Введите описание продукции на русском!'
		),
		descriptionEn: Schema.Types.StringType().isRequired(
			'Введите описание продукции на английском!'
		),
		titleBg: Schema.Types.ArrayType().of(
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
		img: Schema.Types.ArrayType().of(
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
	});

	const defaultFormValue = {
		nameRu: '',
		nameEn: '',
		descriptionRu: '',
		descriptionEn: '',
		titleBg: [],
		img: [],
	};

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState(defaultFormValue);

	useEffect(() => {
		if (cat && cat.name) {
			setIsReady(true);
			setFormValue({
				nameRu: cat?.name?.ru || '',
				nameEn: cat?.name?.en || '',
				descriptionRu: cat?.description?.ru || '',
				descriptionEn: cat?.description?.en || '',
				titleBg: [],
				img: [],
			});
		}
	}, [cat]);

	const [isReady, setIsReady] = useState(false);
	const [isEditable, setIsEditable] = useState(false);

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
				Изменения сохранены!
			</Message>
		);
	};
	const messagePlacement = 'topCenter';

	const onSubmit = async () => {
		if (formRef.current.check()) {
			setIsReady(false);

			const formData = new FormData();

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
			formData.append('titleBg', formValue.titleBg?.[0]?.blobFile || null);
			formData.append('img', formValue.img?.[0]?.blobFile || null);

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.put(
					`/api/products/cats/${cat._id}`,
					formData,
					config
				);

				if (data.status === 'success') {
					setIsReady(true);
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
		<Drawer
			ref={ref}
			open={open}
			onClose={() => {
				setIsEditable(false);
				setIsReady(false);
				onClose();
			}}
			size="md"
		>
			<Drawer.Header>
				<Drawer.Title>Добавить продукцию</Drawer.Title>
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
					readOnly={!isEditable}
				>
					<ReadOnlyToggle
						checked={isEditable}
						loading={!isReady}
						disabled={!isReady}
						onChange={setIsEditable}
					/>
					<MultiLangInputField
						runame="nameRu"
						enname="nameEn"
						label="Наименование продукции"
						popoverProps={{
							text: 'Наименование продукции',
							img: nameInst,
						}}
						ruerror={formError.nameRu}
						enerror={formError.nameEn}
					/>
					<MultiLangInputField
						runame="descriptionRu"
						enname="descriptionEn"
						label="Описание продукции"
						textarea
						popoverProps={{
							text: 'Описание продукции',
							img: descInst,
						}}
						ruerror={formError.descriptionRu}
						enerror={formError.descriptionEn}
					/>
					<FileUploader
						label="Фон описания продукции"
						name="titleBg"
						disabled={formValue.titleBg.length > 0}
						oldImg={cat?.titleBg}
						popoverProps={{
							text: 'Фон описания продукции',
							img: imgInst,
						}}
						errExt={
							formError.titleBg?.array?.[0]?.object?.blobFile?.object?.name
								?.errorMessage
						}
						errSize={
							formError.titleBg?.array?.[0]?.object?.blobFile?.object?.size
								?.errorMessage
						}
					/>
					<FileUploader
						label="Обложка продукции"
						name="img"
						disabled={formValue.img.length > 0}
						popoverProps={{
							text: 'Обложка продукции',
							img: imgInst,
						}}
						oldImg={cat?.img}
						errExt={
							formError.img?.array?.[0]?.object?.blobFile?.object?.name?.errorMessage
						}
						errSize={
							formError.img?.array?.[0]?.object?.blobFile?.object?.size?.errorMessage
						}
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
			</Drawer.Body>
		</Drawer>
	);
});

export default EditCat;
