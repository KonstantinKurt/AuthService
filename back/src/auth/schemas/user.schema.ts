import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        ip_address: {
            type: Array,
            required: true,
            default: [],
        },
        role: {
            type: String,
            default: `User`,
        },
    },
    {
        versionKey: false,
        timestamps: true,

    });
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hash(this.password, +process.env.USER_PASSWORD_SALT);
    next();
});
