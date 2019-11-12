import * as mongoose from 'mongoose';

export const IpUrlSchema = new mongoose.Schema({
        hash: {
            type: String,
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User',
        },
    },
    {
        versionKey: false,
        timestamps: true,

    });
