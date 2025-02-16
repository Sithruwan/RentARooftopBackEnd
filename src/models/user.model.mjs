import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'owner'], required: true }, // To distinguish between clients and owners
    phone: { type: String },
    profilePicture: { type: String }, // URL to the profile picture
    createdAt: { type: Date, default: Date.now },
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