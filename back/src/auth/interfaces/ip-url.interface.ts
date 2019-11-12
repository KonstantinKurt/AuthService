import * as mongoose from 'mongoose';

export interface IpUrl extends mongoose.Document {
    id: string;
    url: string;
}
