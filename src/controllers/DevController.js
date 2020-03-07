const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(req, res) {
    //informação vindo do header
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const users = await Dev.find({
      //$and = operador de filtro (&&)
      $and: [
        { _id: { $ne: user } }, //$ne = not equal
        { _id: { $nin: loggedDev.likes } }, //$nin:  not in
        { _id: { $nin: loggedDev.dislikes } } //$nin:  not in
      ]
    });
    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;
    const userExists = await Dev.findOne({ user: username });

    if (userExists) return res.json(userExists);

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });
    return res.json(dev);
  }
};
