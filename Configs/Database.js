const mongoose = require('mongoose');

mongoose.connect(process.env.MAIN_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to all db');
})
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;