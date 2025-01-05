import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductContent, ProductForm } from './components';
import { Error, PrivateContent } from '../../components';
import { RESET_POST_DATA, loadProductAsync } from '../../actions';
import { selectProduct } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const isCreating = !!useMatch('/product');
	const isEditing = !!useMatch('/product/:id/edit');
	const product = useSelector(selectProduct);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadProductAsync(params.id)).then((productData) => {
			setError(productData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificProductPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<ProductForm product={product} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<ProductContent product={product} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificProductPage;
};

export const Product = styled(ProductContainer)`
	margin: 40px 0;
	padding: 0 80px;

`;
