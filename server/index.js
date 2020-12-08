var app = require('./app');
var port = 3001;

app.listen(port, () => {
    console.log('Server running in port ' + port);
});