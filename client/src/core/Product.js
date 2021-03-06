import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './ApiCore';
import SingleCard from './SingleCard';

const Product = (props) => {
	const [product, setProduct] = useState({});
	const [relatedProduct, setRelatedProduct] = useState([]);
	const [error, setError] = useState(false);

	const loadSingleProduct = (productId) => {
		read(productId).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProduct(data);
				// fetch related products
				listRelated(data._id).then((data) => {
					if (data.error) {
						setError(data.error);
					} else {
						setRelatedProduct(data);
					}
				});
			}
		});
	};

	useEffect(
		() => {
			const productId = props.match.params.productId;
			loadSingleProduct(productId);
		},
		[props]
	);


	return (
		<Layout
			title={product && product.name}
			description='Good Choice!'
			className="container-fluid"
		>
			<div className="row m-5">
				<div className="col-sm-12 col-md-6 col-lg-8 ">
					{/* <div className="col-4"> */}
					{product && product.description && <SingleCard product={product} showViewProductButton={false} />}
				</div>
				{/* mb-5 d-flex align-items-stretch */}
				<div className="col-sm-12 col-md-6 col-lg-4 mt-2 align-items-stretch">
					<h4>Related products</h4>
					{relatedProduct.map((p, i) => (
						<div className="mb-5">
							<SingleCard key={i} product={p} />
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Product;
