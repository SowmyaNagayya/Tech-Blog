const { User } = require('../models');

const userData = [
  {
    username: "sowmya",
    password: "abcd"
  },
  {
    username: "nagayya",
    password: "efgh"
  },
  {
    username: "narayan",
    password: "ijkl"
  },
  
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;