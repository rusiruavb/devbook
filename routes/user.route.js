const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const multer = require("multer");
const sharp = require("sharp");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

// @route         POST user/register
// @description   Create new user profile
// @access        Public
const upload = multer({
  limits: {
    fileSize: 4000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File is not supported"));
    }
    cb(undefined, true);
  },
});

router.post("/register", upload.single("avatar"), async (req, res) => {
  // image configuration
  const avatar = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    user = new User({ name, email, password, avatar });
    await user.save();
    const token = await user.generateAuthToken();
    console.log("New user successfully created");
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
});

// @route         POST user/create-experience
// @description   Add experience to the profile
// @access        Private
router.put("/create-experience", auth, async (req, res) => {
  try {
    const { title, company, from, to, description } = req.body;
    const experience = {
      title: title,
      company: company,
      from: from,
      to: to,
      description: description,
    };

    await User.findOneAndUpdate(
      { email: req.user.email },
      { $push: { experience: experience } },
      { new: true, upsert: true }
    );
    res.status(200).send({ experience: req.user.experience });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message);
  }
});

// @route         POST user/update-experience/:id
// @description   Update profile experience by experience id
// @access        Private
router.put("/update-experience/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const { title, company, from, to, description } = req.body;
    const preExp = await User.findOne({ _id: req.user.id });

    console.log(preExp.experience.id(id)._id);
    preExp.experience.id(id).title = title;
    preExp.experience.id(id).company = company;
    preExp.experience.id(id).from = from;
    preExp.experience.id(id).to = to;
    preExp.experience.id(id).description = description;

    preExp.save();
    res.status(200).send(preExp.experience.id(id));
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message);
  }
});

// @route         POST user/experience
// @description   Display all user experience
// @access        Private
router.get("/experience", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      throw new Error("There is no any user");
    }
    res.status(200).send({ experience: user.experience });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message);
  }
});

// @route         POST user/experience/:id
// @description   Get experience by id
// @access        Private
router.get("/experience/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      throw new Error("There is no any user");
    }
    const experience = user.experience.id(id);
    res.status(200).send({ experience: experience });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message);
  }
});

// @route         POST user/login
// @description   User login
// @access        Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user: user, token: token, status: "Login Success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message);
  }
});

// @route         POST user/logout
// @description   Logout from the system
// @access        Private
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send("Logout successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// @route         POST user/logoutall
// @description   Logout from all devices
// @access        Private
router.post("/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("logout from all devices");
  } catch (error) {
    res.status(500).send("Error with logout all");
  }
});

// @route         GET user/logout
// @description   User profile
// @access        Private
router.get("/me", auth, async (req, res) => {
  //convert image to base 64
  const image = Buffer.from(req.user.avatar).toString("base64");
  res.send({ user: req.user, avatar: image });
  //console.log(image);
});

module.exports = router;
