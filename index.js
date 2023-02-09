const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@@INDRANI11g@@",
    database: "create_note_sql"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// API SECTION  
// (GET)
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM create_note";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})


// POST 
app.post("/api/post", (req, res) => {
    const { title, description } = req.body;
    const sqlInsert = "INSERT INTO create_note (title, description) VALUES (?,?)";
    db.query(sqlInsert, [title, description], (error, result) => {
        if (error) {
            console.log("error", error);            
        }
    })
})


// DELETE 
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM create_note WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log("error", error);           
        }
    })
})


{/** 
app.get("/", (req , res) => {
    const sqlInsert = "INSERT INTO create_note (title, description, date) VALUES ('second title', 'second description', '08/02/20232323')";
    db.query(sqlInsert, (error, result) => {
        console.log("error" , error);
        console.log("result" , result);
    })
    res.send("Hello Express!");
})
*/}

app.listen(5000, () => {
    console.log("Server is running on port 5000!");
})



