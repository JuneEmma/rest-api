const express = require('express');
const router = express.Router();
const Post = require('../model/Post');

// go to posts/example to see
router.get('/example', (req, res) => {
  res.send('Example text');
});

// use 'get' on postman to grab db from mongo
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // you can limit with .find
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// grabbing a specific post
router.get('/:postId', async (req, res) => {
  // postId is on postman you can call after
  console.log(req.params.postId); // localhost...posts/(canbecalledanything)

  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// use 'post' to submit information
router.post('/', async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const asyncPost = await post.save();
    res.json(asyncPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// deleting a post
router.delete('/:postId', async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// updating a post

router.patch('/:postId', async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
