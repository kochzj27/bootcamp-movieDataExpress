// Express Framework
const express = require("express");
const app = express();

const axios = require("axios");

// Body Parser Library for Post Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Route to Serve the React App
app.use(express.static(__dirname + "./../movie-data-w-server/build/"));

// RESTFUL ROUTES:

// GET ALL
app.get("/search/:title", (request, response) => {

  axios.get(`http://www.omdbapi.com/?apikey=5850fdab&s=${request.params.title}`)
    .then((res) => {
      response.json({
        payload: res.data.Search[0],
        status: true
      })
    })
    .catch((err) => {
      console.log(err);
    })

})

app.get(`/history`, (request, response) => {

  //make axios call out to the mockapi
  axios.get(`http://5c953cd2498269001487f228.mockapi.io/movies`)
    .then((res) => {
      response.json({
        payload: res.data,
        status: true
      })
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post(`/history`, (request, response) => {
  console.log(request.body.payload);
  let newRecord = {
    title: request.body.Title,
    year: request.body.Year,
    poster: request.body.Poster,
  }
  console.log(newRecord);
  axios.post(`http://5c953cd2498269001487f228.mockapi.io/movies`, newRecord)
    .then((res) => {
      console.log(res);
      response.json({
        status: true,
      })
    })
    .catch((err) => {
      console.log(err);
    })
})

app.delete(`/history/:id`, (request, response) => {
  axios.delete(`http://5c953cd2498269001487f228.mockapi.io/movies/${request.params.id}`)
    .then((res) => {
      console.log(res)
      response.json({
        status: true,
      })
    })
    .catch((err) => {
      console.log(err);
    })
})
// "/tasks/:id" ===     "/tasks/3"      ==  request.params.id => 3
// "/tasks/:id" ===     "/tasks/hello"  == request.params.id => 'hello'

// // GET 1
// app.get("/tasks/:id", (request, response) => {
//   const note = tasks.find((note) => {
//     console.log(note);
//     console.log(request.params.id)
//     if (note.id == request.params.id) {
//       return note;
//     } else return false;

//   })
//   console.log(note);
//   response.json({
//     status: true,
//     task: note
//   })
// })

// // CREATE 1
// app.post("/tasks", (request, response) => {
//   console.log(request.body)
//   tasks.push({
//     id: nextId++,
//     text: request.body.text,
//     status: 'active',
//   });
//   response.json({
//     status: true,
//     tasks: tasks
//   })
// })

// // DELETE 1
// app.delete("/tasks/:id", (request, response) => {
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id == request.params.id) {
//       tasks.splice(i, 1);
//       break;
//     }
//   }
//   response.json({
//     status: true,
//     tasks: tasks
//   })
// })

// // UPDATE 1
// app.put("/tasks/:id", (request, response) => {
//   console.log(request.body);
//   console.log(request.params.id);
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id == request.params.id) {
//       tasks[i] = Object.assign({}, tasks[i], request.body);
//     }
//   }
//   response.json({
//     status: true,
//     tasks: tasks
//   })
// })


// SERVER LISTENING
app.listen(1337, () => {
  console.log("Server restarted...")
});