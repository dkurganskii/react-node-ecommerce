import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeItem } from './CartHelpers';
import Card from './Card';
import Checkout from './Checkout'

const Cart = () => {
	const [run, setRun] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(
		() => {
			setItems(getCart());
		},
		[run]
	);

	const showItems = (items) => {
		return (
			<div>
				<h2>Your cart has {`${items.length}`} items</h2>
				<hr />
				{items.map((product, i) => (
					<Card
						key={i}
						product={product}
						showAddToCartButton={false}
						cartUpdate={true}
						showRemoveProductButton={true}
						setRun={setRun}
						run={run}
					/>
				))}
			</div>
		);
	};

	const noItemsMessage = () => (
		<h2>
			Your cart is empty. <br /> <Link to="/shop">Continue Shopping</Link>
		</h2>
	);

	return (
		<Layout title="Shopping Cart" description="Manage your cart items" className="container-fluid">
			<div className="row m-5">
				<div className="col-sm-12 col-md-6 col-lg-6 mb-2">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

				<div className="col-sm-12 col-md-6 col-lg-6 mb-2">
					<h2 className="mb-3">Your cart summary</h2>
					<hr />
					<Checkout products={items} setRun={setRun} run={run} />
					<br />
					<div>*Please use the following test credit card for payments*<br />
						<span style={{ fontWeight: 'bold' }}>Card Number:</span> 4242 4242 4242 4242<br />
						<span style={{ fontWeight: 'bold' }}>Expiration Date:</span> Any future date<br />
					</div>
				</div>

			</div>
		</Layout>
	);
};

export default Cart;
