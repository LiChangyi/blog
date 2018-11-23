import app from '../app';

// clearlove7777
const prot = normalizePort(process.env.PORT || 7777);

app.listen(prot);
console.log(`Server running on port ${prot}`);

function normalizePort (val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
