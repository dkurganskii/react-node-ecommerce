import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './ApiAdmin';

const AddCategory = () => {
	const [ name, setName ] = useState('');
	const [ error, setError ] = useState(false);
	const [ success, setSuccess ] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange = (e) => {
		setError('');
		setName(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setError('');
		setSuccess(false);
		// make request to api to create category
		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError('');
				setSuccess(true);
			}
		});
	};

	const newCategoryForm = () => (
		<form  onSubmit={clickSubmit}>
			<div className="form-group col-sm-12 col-md-12 col-lg-4">
				<label className="text-muted">Name</label>
				<input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
			</div >
			<button className="btn btn-outline-primary ml-3 mt-3">Create Category</button>
		</form>
	);

	const showSuccess = () => {
		if (success) {
			return <h3 className="text-success">{name} is created</h3>;
		}
	};

	const showError = () => {
		if (error) {
			return <h3 className="text-danger">Category should be unique</h3>;
		}
	};

	const goBack = () => (
		<div className="mt-5 ml-3 mb-2">
			<Link to="/admin/dashboard" className="text-warning">
				Back to Dashboard
			</Link>
		</div>
	);

	return (
		<Layout title="Add a new category" description={`Welcome ${user.name}, ready to add a new category?`}>
			<div className="row">
				{/* <div className="col-md-8 offset-md-2"> */}
				<div className="col-sm-12 col-md-3 col-lg-12 mb-2">
					{showSuccess()}
					{showError()}
					{newCategoryForm()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);
};

export default AddCategory;
