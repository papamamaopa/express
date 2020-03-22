const router = require("express").Router();
const verify = require("./verifyToken");
const { postValidation } = require("../validation");

const SearchServer = require("../model/SearchServer");

//--- Create new post
router.post("/create", verify, async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if Post-Name is already taken
  const name = await SearchServer.findOne({ author: req.body.name });
  if (name) res.status(400).send("Post-Title already taken!");

  const searchFor = new SearchServer({
    name: req.body.name,
    for: req.body.for,
    type: req.body.type,
    description: req.body.description,
    author: req.body.author
  });

  try {
    const savedSearchServer = await searchFor.save();
    res.send(savedSearchServer);
  } catch (err) {
    res.status(400).send(err);
  }
});

//--- Delete post by id
router.post("/delete", verify, async (req, res) => {
  const post = await SearchServer.findById(req.body.id);
  if (!post) res.status(400).send("Post not avaible");
  post.remove();
  res.send("Post has been deleted");
});

//--- Get post by id
router.get("/get", verify, async (req, res) => {
  const post = await SearchServer.findById(req.body.id);
  if (!post) res.status(400).send("Post not avaible");
  res.send(post);
});

//--- get all posts
router.get("/get/all", verify, async (req, res) => {
  SearchServer.find({}, (error, posts) => {
    if (error) res.status(400).send(error);
    es.send(posts);
  });
});

module.exports = router;
