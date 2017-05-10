const app = require('./src/app').app;
const mongoose = require('./src/app').mongoose;

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log('Image Search Abstraction Layer service listening on port ' + PORT);
});

process.on('SIGINT', () => {
  mongoose.disconnect();
  console.log('Received SIGINT, db connection closed.');

  process.exit(0);
});

process.on('exit', (code) => {
  mongoose.disconnect();
  console.log(`Process about to exit with code: ${code}...`);
});