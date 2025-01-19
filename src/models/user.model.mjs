import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
   
}, {
    timestamps: true,
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Compare the hashed password
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords.');
    }
};

const User = mongoose.model('User', userSchema);

export default User;