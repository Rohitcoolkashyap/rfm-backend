const express = require("express");
const router = express();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Joi = require("joi");

router.post("/", async (req, res) => {
  console.log("hii");
  const { firstName, lastName, email, password } = req.body;
  try {
    //   0. validate name ,email,password
    async function validate(data) {
      const schema = Joi.object({
        firstName: Joi.string().alphanum().min(2).max(20).required(),
        lastName: Joi.string().alphanum().min(2).max(20).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      });
      return schema.validate(data);
    }
    const { error } = await validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
      return;
    }

    // 1.Check if user already exist in db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exist with email ${email}`);
    }
    // 2.if not hash their password
    const hash = await bcrypt.hash(password, 10); // provide 10 salt round (processing power)
    // 3.create user
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hash,
    }).save();
    // 3.5 create cart for new user
    // await new Cart({ user: newUser._id }).save();
    // 4.create token for the user
    //   it used to recognise user  within out application
    //  token is store cookies of browser at some time
    const token = jwt.sign({ userId: newUser._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5.send back the token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in sign up please come back later!");
  }
});
module.exports = router;
