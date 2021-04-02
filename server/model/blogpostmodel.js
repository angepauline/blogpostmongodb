import mongoose from 'mongoose'
const blogpostSchema = new mongoose.Schema(
    {
        title: String,

        content: String,
        userid: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: [true, "user is required"]
        },
        timestamp: String
    }
)
blogpostSchema.pre(/^find/, function(next) {
    this.populate({
        path: "userid",
        select: "firstName email"

    })
    next();
})
const blogInfo = mongoose.model("blogpost", blogpostSchema);
export default blogInfo;
