import React, { useEffect, useState } from 'react';
import {
	ButtonToolbar,
	Button,
	Panel,
	IconButton,
	Message,
	toaster,
	Modal,
	Table,
} from 'rsuite';
import { Icon } from '@rsuite/icons';
import AddCat from '../components/productScreenSub/drawers/AddCat';
import EditCat from '../components/productScreenSub/drawers/EditCat';
import EditProduct from '../components/productScreenSub/drawers/EditProduct';
import AddProduct from '../components/productScreenSub/drawers/AddProduct';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';
import axios from 'axios';
import { theme } from '../adminContext';
import { TiEdit } from 'react-icons/ti';
import { CgList } from 'react-icons/cg';
import { MdDeleteForever } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

const sytles = {
	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	productCatList: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		gap: theme.spacing(5),
		marginTop: theme.spacing(5),
	},
	productCat: {
		diplay: 'inline-block',
		width: theme.spacing(60),
	},
	productCatImg: {
		height: theme.spacing(60),
	},
	productCatControl: {
		marginTop: theme.spacing(4),
	},
	productList: {
		marginTop: theme.spacing(10),
		width: '100%',
	},
};

const Products = () => {
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedCat, setEditedCat] = useState({});

	const [isDeleting, setIsDeleting] = useState(false);
	const [deletedId, setDeletedId] = useState(null);

	const [isAdding, setIsAdding] = useState(false);
	const [addingId, setAddingId] = useState(null);

	const [isShowing, setIsShowing] = useState(false);
	const [showingId, setShowingId] = useState(null);

	const [isEditingProduct, setIsEditingProduct] = useState(false);
	const [editedProdcut, setEditedProduct] = useState(null);

	const { data, fetchData } = useAxiosGet('/api/products/cats');
	const { data: productsData, fetchData: fetchProductData } = useAxiosGet(
		'/api/products/products'
	);

	const [productList, setProductList] = useState([]);

	useEffect(() => {
		if (showingId) {
			let productsFiltered = productsData.filter(
				(p) => p.category_id === showingId
			);
			if (productsFiltered.length > 0) {
				productsFiltered = productsFiltered.map((p) => {
					const newP = {
						id: p._id,
						name: p.name.ru,
						description: p.description.ru,
						img: p.img,
					};
					return newP;
				});
				setProductList(productsFiltered);
				setIsShowing(true);
			} else {
				setProductList([]);
				setIsShowing(false);
			}
		}
	}, [showingId, productsData]);

	const productCategories = data?.reverse().slice(0, data?.length);

	const errorMessage = (error) => {
		return (
			<Message showIcon type="error">
				{error}
			</Message>
		);
	};

	const successMessage = (msg) => {
		return (
			<Message showIcon type="success" duration={5000}>
				{msg}
			</Message>
		);
	};

	const messagePlacement = 'topCenter';

	const handleEdit = (cat) => {
		setEditedCat(cat);
		setIsEditing(true);
	};

	const handleDelete = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};
		try {
			const res = await axios.delete(`/api/products/cats/${deletedId}`, config);
			if (res.data.status === 'success') {
				setIsDeleting(false);
				setDeletedId(null);
				fetchData();
				toaster.push(successMessage('Удалено!'), {
					placement: messagePlacement,
				});
			}
		} catch (error) {
			if (error.response.data.error) {
				toaster.push(errorMessage(error.response.data.error), {
					placement: messagePlacement,
				});
			} else {
				toaster.push(errorMessage('Не удалось удалить продукцию!'), {
					placement: messagePlacement,
				});
			}
		}
	};

	return (
		<div className="admin-products-screen" style={sytles.root}>
			<ButtonToolbar>
				<Button appearance="primary" onClick={() => setOpen(true)} color="green">
					Новая продукция
				</Button>
			</ButtonToolbar>
			<div className="admin-product-cats" style={sytles.productCatList}>
				{productCategories &&
					productCategories.length > 0 &&
					productCategories.map((cat, index) => {
						return (
							<Panel
								shaded
								bordered
								bodyFill
								style={sytles.productCat}
								key={`product-cat-${cat._id}`}
							>
								<img src={cat.img} alt="product" style={sytles.productCatImg} />
								<Panel header={cat.name.ru}>
									<p>
										<small>{cat.description.ru}</small>
									</p>
									<div style={sytles.productCatControl}>
										<ButtonToolbar>
											<IconButton
												size="sm"
												icon={<Icon as={CgList} />}
												appearance="primary"
												color="violet"
												circle
												onClick={() => {
													setShowingId(cat._id);
												}}
											/>
											<IconButton
												size="sm"
												icon={<Icon as={IoMdAdd} />}
												appearance="primary"
												color="green"
												circle
												onClick={() => {
													setAddingId(cat._id);
													setIsAdding(true);
												}}
											/>
											<IconButton
												size="sm"
												icon={<Icon as={TiEdit} />}
												appearance="primary"
												color="cyan"
												circle
												onClick={() => handleEdit(cat)}
											/>
											<IconButton
												size="sm"
												icon={<Icon as={MdDeleteForever} />}
												appearance="primary"
												color="red"
												circle
												onClick={() => {
													setDeletedId(cat._id);
													setIsDeleting(true);
												}}
											/>
										</ButtonToolbar>
									</div>
								</Panel>
							</Panel>
						);
					})}
			</div>
			{isShowing && (
				<div className="admin-product-list" style={sytles.productList}>
					<h4>Продукты выбранной продукции</h4>
					{productList.length > 0 ? (
						<ProductsTable
							data={productList}
							setIsEditingProduct={setIsEditingProduct}
							seteditedProduct={setEditedProduct}
							fetchProductData={fetchProductData}
						/>
					) : (
						<p>Добавьте продукты</p>
					)}
				</div>
			)}

			<AddCat
				open={open}
				onClose={() => {
					setOpen(false);
					fetchData();
				}}
			/>
			<EditCat
				open={isEditing}
				onClose={() => {
					setIsEditing(false);
					setEditedCat({});
					fetchData();
				}}
				cat={editedCat}
			/>
			<CatDeleteDialog
				open={isDeleting}
				onClose={() => {
					setIsDeleting(false);
					setDeletedId(null);
				}}
				onConfirm={handleDelete}
			/>
			<AddProduct
				open={isAdding}
				cat_id={addingId}
				onClose={() => {
					setIsAdding(false);
					setShowingId(addingId);
					setAddingId(null);
					fetchProductData();
				}}
			/>
			<EditProduct
				open={isEditingProduct}
				data={editedProdcut}
				onClose={() => {
					fetchProductData();
					setIsEditingProduct(false);
				}}
			/>
		</div>
	);
};

const CatDeleteDialog = React.forwardRef((props, ref) => {
	const { open, onClose, onConfirm } = props;
	return (
		<Modal size={'sm'} open={open} onClose={onClose} ref={ref}>
			<Modal.Header>
				<Modal.Title>Вы уверены?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				После удаления продукции ее нельзя восстановить.
				<br /> Кроме того все добавленные продукты к этой продукции будут утеряны!
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onConfirm} appearance="primary" color="red">
					Да уверен(а)
				</Button>
				<Button onClick={onClose} appearance="subtle">
					Отмена
				</Button>
			</Modal.Footer>
		</Modal>
	);
});

const ProductsTable = React.forwardRef((props, ref) => {
	const {
		data,
		onRowClick,
		setIsEditingProduct,
		seteditedProduct,
		fetchProductData,
	} = props;

	return (
		<Table height={400} data={data} onRowClick={onRowClick}>
			{/* <Table.Column width={70} align="center" fixed>
				<Table.HeaderCell>Id</Table.HeaderCell>
				<Table.Cell dataKey="_id" />
			</Table.Column> */}

			<Table.Column width={200} fixed>
				<Table.HeaderCell>Наименование</Table.HeaderCell>
				<Table.Cell dataKey="name" />
			</Table.Column>
			<Table.Column width={500}>
				<Table.HeaderCell>Описание</Table.HeaderCell>
				<Table.Cell dataKey="description" />
			</Table.Column>

			<Table.Column width={300} fixed="right">
				<Table.HeaderCell>Действия</Table.HeaderCell>
				<Table.Cell>
					{(rowData) => {
						const fetchProduct = async () => {
							try {
								const data = await axios.get(
									`/api/products/products/product/${rowData.id}`
								);
								seteditedProduct(data.data);
								setIsEditingProduct(true);
							} catch (error) {
								if (error) {
									window.location.reload();
								}
							}
						};
						const deleteProduct = async () => {
							const config = {
								headers: {
									'Content-Type': 'multipart/form-data',
									Authorization: `Bearer ${localStorage.getItem('authToken')}`,
								},
							};
							try {
								const { data } = await axios.delete(
									`/api/products/products/${rowData.id}`,
									config
								);
								if (data.status === 'success') {
									fetchProductData();
								}
							} catch (error) {
								if (error) {
									console.log(error);
								}
							}
						};
						return (
							<ButtonToolbar>
								<Button appearance="subtle" color="cyan" onClick={fetchProduct}>
									Редактировать
								</Button>
								<Button appearance="subtle" color="red" onClick={deleteProduct}>
									Удалить
								</Button>
							</ButtonToolbar>
						);
					}}
				</Table.Cell>
			</Table.Column>
		</Table>
	);
});

export default Products;
