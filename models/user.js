const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('./uuid/v1');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			requied: true,
			maxlength: 32
		},
		email: {
			type: String,
			trim: true,
			requied: true,
			unique: true
		},
		hashed_password: {
			type: String,
			requied: true
		},
		about: {
			type: String,
			trim: true
		},
		salt: String,
		role: {
			type: Number,
			default: 0
		},
		history: {
			type: Array,
			default: []
		}
	},
	{ timestamps: true }
);
