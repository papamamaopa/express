const router = require("express").Router();
const verify = require("./verifyToken");
const { postValidation } = require("../validation");

const SearchTeam = require("../model/SearchTeam");

router.post("/create", verify, async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if Post-Name is already taken
  const name = await SearchServer.findOne({ author: req.body.name });
  if (name) res.status(400).send("Post-Title already taken!");

  const searchFor = new SearchTeam({
    name: req.body.name,
    for: req.body.for,
    type: req.body.type,
    description: req.body.description,
    author: req.body.author
  });

  try {
    const saveSearchTeam = await searchFor.save();
    res.send(saveSearchTeam);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/get", verify, async (req, res) => {
  const post = await SearchServer.findById(req.body.id);
  if (!post) res.status(401).send("Post not avaible");

  res.send(post);
});

router.get("/get/all", verify, async (req, res) => {
  SearchServer.find({}, (error, posts) => {
    res.send(posts);
  });
});

router.post("/delete", verify, async (req, res) => {
  const post = await SearchServer.findById(req.body.id);
  if (!post) res.status(401).send("Post not avaible");

  post.remove();
  res.send("Post has been deleted");
});

module.exports = router;
