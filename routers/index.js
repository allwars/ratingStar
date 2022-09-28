const { Router } = require('express');
const router = Router();
const url = require('url');


const { google } = require('googleapis');
const configuracion = require('../config/keys.json')
const client = new google.auth.JWT(
    configuracion.client_email,
    null,
    configuracion.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']

);

router.get('/public', (req, res) => {
    res.render('index')
})



router.post('', (req, res) => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const ratingStar = req.body.rating;
    const dateStar = year + "-" + month + "-" + date + " " + hours + ":" + minutes;

     



    client.authorize(function (err, tokens) {

        if (err) {
            console.log(err);
            return;

        } else {
            //console.log('connected');
            gsrun(client);
        }
    });



    async function gsrun(cl) {

        const gsapi = google.sheets({ version: 'v4', auth: cl });
        const opt = {
            spreadsheetId: '1_5Z1O2PYql0i4mnKjNtFUjzqQ-KdckFIVvFddt-8NqE',
            range: 'Hoja1!A1:C99999'
        };

        let data = await gsapi.spreadsheets.values.get(opt);
        let dataArray = data.data.values;
       

       
        const cell = dataArray.length;
        const newCell = cell + 1;
        const range1 = 'Hoja1!A' + newCell + ':C99999';


        



        //////////////UPDATE//////////////////////
        const updateOptions = {
            spreadsheetId: '1_5Z1O2PYql0i4mnKjNtFUjzqQ-KdckFIVvFddt-8NqE',
            range: range1,
            valueInputOption: 'USER_ENTERED',
            resource: { values: [[ratingStar, fullUrl, dateStar]] }
        };
        let res = await gsapi.spreadsheets.values.update(updateOptions);


        /////CALL SHEET
        const optupdate = {
            spreadsheetId: '1_5Z1O2PYql0i4mnKjNtFUjzqQ-KdckFIVvFddt-8NqE',
            range: 'Hoja1!A1:C99999'
        };
        let data2 = await gsapi.spreadsheets.values.get(optupdate);
        let dataArray2 = data2.data.values;
        const cell2 = dataArray2.length;

    

        ////////////// FINISH UPDATE//////////////////////

    }
    res.send('recibido');

});







module.exports = router;