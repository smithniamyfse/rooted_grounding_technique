const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const imageRouter = require('./routes/image.router'); // Import the image router
const seeInputsRouter = require('./routes/seeInputs.router'); // Import the seeInputs router
const touchInputsRouter = require('./routes/touchInputs.router'); // Import the touchInputs router
const hearInputsRouter = require('./routes/hearInputs.router'); // Import the hearInputs router
const smellInputsRouter = require('./routes/smellInputs.router'); // Import the smellInputs router
const tasteInputsRouter = require('./routes/tasteInputs.router'); // Import the tasteInputs router
const eventEntriesRouter = require('./routes/event.entries.router'); // Import the event entries router
const viewAllRouter = require('./routes/view.all.router') // Import the view all entries router



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter); // Use the image router
app.use('/api/see-inputs', seeInputsRouter); // Use the see-inputs router
app.use('/api/touch-inputs', touchInputsRouter); // Use the touch-inputs router
app.use('/api/hear-inputs', hearInputsRouter); // Use the hear-inputs router
app.use('/api/smell-inputs', smellInputsRouter); // Use the smell-inputs router
app.use('/api/taste-inputs', tasteInputsRouter); // Use the taste-inputs router
app.use('/api/event-entries', eventEntriesRouter); // Use the event entries router
app.use('/api/view-all', viewAllRouter); //Use the view all entries router





// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
