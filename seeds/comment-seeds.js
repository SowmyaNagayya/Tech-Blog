const { Comment } = require('../models');

const commentData = [
  {
    body: "Hello",
    user_id: "2",
    post_id: "1",
  },
  {
    body: "How are You",
    user_id: "3",
    post_id: "2",
  },
  {
    body: "yuck.",
    user_id: "1",
    post_id: "3",
  },
  
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;