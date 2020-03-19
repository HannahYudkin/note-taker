var fs = require("fs");

// fs.readFile("../db/db.json", "utf8", function(error, data) {
//   if (error) {
//     return console.log(error);
//   }

//   console.log(data);
// });

// fs.writeFile("../db/db.json", ["test"], function(err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("Success!");
// });

module.exports = {
  readFile: fs.readFile
  //writeFile: fs.writeFile
};
