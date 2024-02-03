const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {

    useNewUrlParser: "true",
    useUnifiedTopology: "true"

}).then(() => {
    console.log('connected  to DB');
}).catch((e) => console.log('db connection error', e));
