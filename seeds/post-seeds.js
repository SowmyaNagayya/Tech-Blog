const { Entry } = require('../models');

const postData = [
  {
    title: "Gary",
    content: "Cool Instructor.",
    user_id: 1
  },
  {
    title: "Gage",
    content: "Awesome Instructor.",
    user_id: 2
  },
  {
    title: "MVC",
    content: "I Hate This",
    user_id: 3
  },
];

const seedPost = () => Entry.bulkCreate(postData);

module.exports = seedPost;