












const { google } = require('googleapis');
const configuracion = require('../config/keys.json')
const client = new google.auth.JWT(
    configuracion.client_email,
    null,
    configuracion.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']

);

client.authorize(function (err, tokens) {

    if (err) {
        console.log(err);
        return;

    } else {
        console.log('connected');
        gsrun(client);
    }
});



async function gsrun(cl) {

    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
        spreadsheetId: '1_5Z1O2PYql0i4mnKjNtFUjzqQ-KdckFIVvFddt-8NqE',
        range: 'Hoja1!A1:B99999'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;
    /* let newDataArray = dataArray.map(function (r) {
        r.push(r[0] + '-' + r[2]);
        return;
    }); */

    //console.log(dataArray);
    //let datosTabla = dataArray;

    console.log(dataArray.length);
    const cell = dataArray.length;
    const newCell = cell + 1;
    const range1 = 'Hoja1!A' + newCell + ':B99999';


    console.log(range1);



    //////////////UPDATE//////////////////////
    const updateOptions = {
        spreadsheetId: '1_5Z1O2PYql0i4mnKjNtFUjzqQ-KdckFIVvFddt-8NqE',
        range: range1,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [['work', 'yeeepa'], ['luin', 'derge'], ['3dasaa', 'asdas']] }
    };
    let res = await gsapi.spreadsheets.values.update(updateOptions);


    /////CALL SHEET
    const optupdate = {
        spreadsheetId: '1_5Z1O2PYql0i4mnKjNtFUjzqQ-KdckFIVvFddt-8NqE',
        range: 'Hoja1!A1:B99999'
    };
    let data2 = await gsapi.spreadsheets.values.get(optupdate);
    let dataArray2 = data2.data.values;
    const cell2 = dataArray2.length;

    //console.log(res);
    console.log(dataArray2);
    console.log(cell2);

    ////////////// FINISH UPDATE//////////////////////

}
