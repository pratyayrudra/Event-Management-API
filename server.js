const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json())

const Event = require('./routes/event');
const User = require('./routes/user');
const Attend = require('./routes/attend');

app.use('/event', Event);
app.use('/user', User);
app.use('/attend', Attend);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started listening at ${PORT}`)
})