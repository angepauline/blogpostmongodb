import mongoose from 'mongoose'
const blogSchema = new mongoose.Schema(
    {
        title: String,

        content: String,
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: [true, "user is required"]
        },
        commentId:[{type:mongoose.Schema.ObjectId,
            ref:"comment"
        }],
        timestamp:String
    }
)
blogSchema.pre(/^find/, function(next) {
    this.populate({
        path: "userId",
        select: "firstName email"

    })
    this.populate({
        path:"commentId",
        select:"content user timestamp"
    })
    next();
})
const blogData = mongoose.model("blog", blogSchema);
export default blogData;
