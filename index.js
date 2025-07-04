const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");

const PORT = 3000;

// users/1- get the user with id 1
app.post("/users", (req, res) => {
  const html = `
    <ul> ${users
      .map((user) => `<li> ${user.first_name} </li>`)
      .join("")} </ul>  
    `;





  return res.send(html);

  //sameer
  
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    //   return res.json(users);
    return res.json({ status: "workingonit" });
  })

  .patch((req, res) => {
    return res.json({ status: "workingonit" });
  })
  .delete((req, res) => {
    return res.json({ status: "workingonit" });
  });

app.post("/api/users", (req, res) => {
  return res.json({ status: "workingonit" });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id == id);
  return res.json(user);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
