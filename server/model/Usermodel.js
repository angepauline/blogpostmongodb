import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: [true, "please you need to provide us email"] },
    password: { type: String, required: [true, "please you need to provide us ur password"] },
    gender: { type: String, enum: ["male", "female"] },
    role: { type: String, enum: ["user", "admin"], required: [true] },

    department: String,
    address: { type: String, default: "Rwanda" },
    passwordChangeTime: {
        type: String,
        default: Date.now()
    }
})
const userInfo = mongoose.model("user", userSchema);
export default userInfo
