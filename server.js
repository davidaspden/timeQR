const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
var staff = [];

app.post('/complete', (req, res) => {
    const { name, time } = req.body;
    if (name && time) {
        staff.push({ name, time });
        res.status(200).send('Clock-in time recorded');
    } else {
        res.status(400).send('Invalid request');
    }
});

app.get('/rosta', (req, res) => {
    res.json(staff);
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.htm');
});
app.get('/track', (req, res) => {
    const queryString = req.url.split('?')[1] || '';
    const cookie = req.headers.cookie || '';
    const params = {};
    queryString.split('&').forEach(pair => {
        var [key, value] = pair.split('=');
        if (key) params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    });
    if (params['t']) {
        //We have to log the time
        //res.send('Track endpoint: ' + params['t']);

        //Add the user to the list of users


        //
        res.setHeader('Set-Cookie', 'name=' + params['t']);
        res.sendFile(__dirname + '/name.htm');
    }
});

app.get('/open', (req, res) => {
    res.send('Open endpoint');
});
//static page bypass
app.get('/index.htm', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/public/qrcode.min.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/qrcode.min.js'));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

