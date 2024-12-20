const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    additionalImages: [{
      type: String,
      required: false,
    }],
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
      },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
