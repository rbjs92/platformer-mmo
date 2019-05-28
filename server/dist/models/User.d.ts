import mongoose, { Document } from 'mongoose';
interface UserInterface extends Document {
    email: string;
    password: string;
    username: string;
    clientId: string;
    location: string;
    date: Date;
    hashPassword: any;
    comparePassword: any;
}
declare const User: mongoose.Model<UserInterface, {}>;
export = User;
