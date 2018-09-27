import server from './app'

const port = process.env.port || 5002;
server.listen(port, ()=>{
    console.log('Server is running on port ' + port);
});