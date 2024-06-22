const express = require("express");
const cors = require('cors');
const personRoute = require("./routes/person.js");
const auditionRoute = require("./routes/audition.js");

const app = express();
app.use(express.json());
app.use(cors());

// const db = require('./models');

app.use("/person", personRoute);
app.use("/audition", auditionRoute);

// sequelize.authenticate().then(() => {
//     console.log('Connection established successfully.');
// }).catch((error) => {
//     console.error('Unable to connect to database: ', error);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});