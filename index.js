
const app = require('./app');


async function main () {
  await app.listen(app.get('port'));
  //console.log('listening on port', app.get('port'));
}

main();


