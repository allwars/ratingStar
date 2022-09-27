
const app = require('./app');


async function main () {
  await app.listen(app.get('port'));
  console.log('listening on port', app.get('port'));
}

main();

/* 
Router.post('/public',(req, res) => {
  console.log(req.body);
  res.send('recibido')
});
 */

