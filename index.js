import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

let posts = [];
let postNumber = 0;

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', { posts });
})

app.get('/submit', (req, res) => {
  res.render('submit.ejs');
});

app.post('/submit', (req, res) => {
  const { title, content, post_id } = req?.body;
  if (!post_id) {
    //create a new post
    postNumber++;
    console.log("title: ", title);
    console.log("content: ", content);
    console.log("id: ", postNumber);
    posts.push({ title, content, id: postNumber });
    console.log('posts:', posts);
  } else {
    //update an existing post
    let index = posts.findIndex(post => post.id == post_id);
    posts[index] = { title, content, id: post_id };
  }

  res.render('index.ejs', { posts });
});

app.post('/delete', (req, res) => {
  const post_id = +req?.body?.post_id;
  console.log('post to delete id: ', post_id);
  posts = posts.filter(post => {
    return post.id != post_id;
  });

  res.render('index.ejs', { posts });
});

app.post('/put', (req, res) => {
  const post_id = +req?.body?.post_id;
  console.log('post to edit id: ', post_id);
  let postToEdit = posts.find(post => post.id == post_id);
  console.log('post to edit', postToEdit);
  res.render('edit.ejs', postToEdit);
});

app.listen(port, () => {
  console.log(`The server started on ${port}`);
});


