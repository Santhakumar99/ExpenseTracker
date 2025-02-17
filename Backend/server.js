var app = require("./app");
const port = 7001;
const fs = require("fs");
const https = require("https");

app.listen(port, () => console.log(`Server started on port ${port}`));