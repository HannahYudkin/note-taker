//[{"id":0,"title":"Test Title","text":"Test text"}]

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
 const db = require("../db/db");
 const fs = require("fs");
 const uuidv4 = require('uuid/v4');
 //const readWrite = require("readWrite");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    let obj = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    return res.json(obj);

  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let receivedNote = req.body;
    let newID = uuidv4();

    receivedNote.id = newID;
  
    fs.readFile("db/db.json", function (err, data) {
      if (err) throw err;

      let notesArray = JSON.parse(data);
      
      notesArray.push(receivedNote);

      fs.writeFile("db/db.json", JSON.stringify(notesArray), "utf8", err => {
        if (err) throw err;
        console.log("Sucessfully wrote to 'db.json' file.")
        res.json(receivedNote);
      })
    });

   });

  app.delete("/api/notes/:id", function(req, res) {
    fs.readFile("db/db.json",function (err, data) {
      if (err) throw err;

      const readData = JSON.parse(data);
      const filtered = readData.filter((note) => note.id !== req.params.id);
       const writeData = JSON.stringify(filtered)
      fs.writeFile("db/db.json", writeData, "utf8", err => {
        if (err) throw err;
        res.status(200).end();

        console.log("Successfully deleted note.");
      })
      //fs.writeFile("db/db.json", JSON.stringify(JSON.parse(data).filter(note) => note.id !== req.params.id))
    })
  })
}




    // let dbArray = db.filter((item) => {              objn= db[i] item.id = id, strinify and send back  RAeturn true or false, not filter save to file send back
    //   //console.log(typeof(parseInt(item.id)))
    //   //console.log(typeof(parseInt(req.params)))
    //    if (item.id === req.params.id) {
    //      return false;
    //    }
    //    else {
    //      return true;
    //    }
    // })
    // console.log(newArray)
  //   for (var i = 0; i < db.length; i++) {
  //     var obj = db[i];
  
  //     if (obj.id === req.params.id) {
  //         db.splice(i, 1);
  //     }
  // }
  //delete a note- read data, parse into json, stringify data,
   // res.json(db)
  //});
