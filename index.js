const server = require('./api/server');
const dotenv = require('dotenv');

dotenv.config();


const port = process.env.PORT || 3002;
server.listen(port, () => {
    console.log(`*** Server is running on port ${port} ***`);
});