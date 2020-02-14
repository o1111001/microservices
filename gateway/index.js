'use strict';

const express = require('express');
const app = express();
const { usersClient, bloggersClient } = require('./client');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/signup', (req, res) => {
  usersClient.signUp(req.body, (error, result) => {
    if (error) return res.status(400).send({ message: error.details });
    return res.send(result);
  });
});

app.post('/signin', (req, res) => {
  usersClient.signIn(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.patch('/profile/password', (req, res) => {
  usersClient.updatePassword(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.patch('/profile/name', (req, res) => {
  usersClient.updateName(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.delete('/profile', (req, res) => {
  usersClient.deleteProfile(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/auth', (req, res) => {
  usersClient.auth(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/post', (req, res) => {
  bloggersClient.createPost(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/thread', (req, res) => {
  bloggersClient.createThread(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/likePost', (req, res) => {
  bloggersClient.likePost(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/likeComment', (req, res) => {
  bloggersClient.likeComment(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/replyToComment', (req, res) => {
  bloggersClient.createComment(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/getLatestPosts', (req, res) => {
  bloggersClient.getLatestPosts(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/getPost', (req, res) => {
  bloggersClient.getPost(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

app.post('/getFullPost', (req, res) => {
  bloggersClient.getFullPost(req.body, (error, result) => {
    if (error) return res.send('error');
    return res.send(result);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Gateway listening on port ${port}!`));
