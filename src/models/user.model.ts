import { connectDB, disconnectDB } from "../db/db.js";
import IUser from "../interfaces/user.interface.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<IUser>({
    _id: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User_Model = mongoose.model('user', userSchema);

export default class User {

    async login(username: string, password: string): Promise<IUser> {
        try {
            await connectDB();
            const user = await User_Model.findOne({ username: username.toLowerCase() });
            if (!user) {
                throw Error('User does not exist')
            }
            const hashed_pwd = user.password as string;
            const is_correct_pwd = await bcrypt.compare(password, hashed_pwd);
            if (is_correct_pwd) {
                return user as IUser;
            } else {
                throw Error('Password Does not Match');
            }
        } catch (error) {
            disconnectDB();
            throw Error((error as Error).message);
        }
    }

    async register(username: string, password: string): Promise<IUser | undefined> {
        try {
            await connectDB();
            const already_exsists = await User_Model.findOne({ username: username.toLowerCase() });
            if (already_exsists) {
                throw Error('User Already Exsists');
            }
            const salt_rounds = +(process.env.SALT_ROUNDS as unknown as number);
            const hashed_pwd = await bcrypt.hash(password, salt_rounds);
            const user = new User_Model({
                username: username.toLowerCase(),
                password: hashed_pwd
            });
            await user.save();
            disconnectDB();
            return user;

        } catch (error) {
            disconnectDB();
            throw Error((error as Error).message);
        }
    }

}