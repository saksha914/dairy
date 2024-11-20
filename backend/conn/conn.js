const mongoose = require('mongoose');

const dbURI = "mongodb+srv://codvi001:vipransh07@dairy-project.27hizqw.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {})
.then(() => {
    console.log("My DB is Connected");
})
.catch((error) => {
    console.log("Some error occurred", error);
});

module.exports = mongoose;
