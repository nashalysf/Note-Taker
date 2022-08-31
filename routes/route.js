const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
module.exports = app => {

    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = [].concat(JSON.parse(data));
    

        app.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        function findById(id, noteListItems) {
            const result = noteListItems.filter(notes => notes.id === id)[0];
            if (result) {
                res.json(result);
              } else {
                res.send(404);
              }
          }  
          
        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            newNote.id = notes.length.toString();
            res.json(req.body);
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });

        app.get("/api/notes/:id", (req, res) => {
            const result = findById(req.params.id, notes);
            res.json(result);
        });

        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });

    

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}
