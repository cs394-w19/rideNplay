const express = require('express');
const bodyParser = require('body-parser');
const scheduler = require('node-schedule');
const cluster = require('cluster');
const crypto = require('crypto');
const path = require('path');

// server config for phone number
const serverConfig = require('./server_config');

const express_app = express();
// twilio client init
const client = require('twilio')('ACcb2bbf1ec4e8cd9b85fc7e4420f2ee3e', '081193202595c927ed1e6ce596b3d47c');

express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());
express_app.use(express.static(path.join(__dirname, 'build')));

let scheduledTasks = new Set();
let allTasks = {};

express_app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


express_app.post('/api/new_ride', async (req, res) => {
    // api to send texts after new ride creation.
    console.log('Received new ride request.');
    res.header('Content-Type', 'application/json');
    const textData = req.body;
    console.log(textData);
    let newMessage = textData.message;
    let messageRecipient = textData.to;
    client.messages
        .create({
            from: "+17574186902",
            to: serverConfig.phoneNumber,
            body: newMessage
        })
        .then(() => {
            // successful text send
            console.log(`Message to ${serverConfig.phoneNumber} successfully sent.`);
            return res.send({'success': true, 'message': 'Successfully sent message.'});
        })
        .catch(err => {
            // error sending text
            console.log('hit error');
            console.log(err);
            return res.send({'success': false, 'message': err});
        });

});

express_app.post('/api/end_ride', async (req, res) => {
    // api to send texts after new ride creation.
    console.log('Received end ride request.');
    res.header('Content-Type', 'application/json');
    const textData = req.body;
    console.log(textData);
    let newMessage = textData.message;
    let messageRecipient = textData.to;
    client.messages
        .create({
            from: "+17574186902",
            to: serverConfig.phoneNumber,
            body: newMessage
        })
        .then(() => {
            // successful text send
            console.log(`Message to ${serverConfig.phoneNumber} successfully sent.`);
            return res.send({'success': true, 'message': 'Successfully sent message.'});
        })
        .catch(err => {
            // error sending text
            console.log('hit error');
            console.log(err);
            return res.send({'success': false, 'message': err});
        });

});

express_app.post('/api/picked_up_child', async (req, res) => {
    // api to send texts after new ride creation.
    console.log('Received new child pickup request request.');
    res.header('Content-Type', 'application/json');
    const textData = req.body;
    console.log(textData);
    let newMessage = textData.message;
    let messageRecipient = textData.to;
    client.messages
        .create({
            from: "+17574186902",
            to: serverConfig.phoneNumber,
            body: newMessage
        })
        .then(() => {
            // successful text send
            console.log(`Message to ${serverConfig.phoneNumber} successfully sent.`);
            return res.send({'success': true, 'message': 'Successfully sent message.'});
        })
        .catch(err => {
            // error sending text
            console.log('hit error');
            console.log(err);
            return res.send({'success': false, 'message': err});
        });

});

// sever port is 3002
express_app.portNumber = 3002;

function startServer(port) {
    // function to start server and cycle through ports if 3002 isn't available
    express_app.portNumber = port;
    express_app.listen(process.env.PORT || port, () => {
        console.log("server is running on port: " + express_app.portNumber);
    }).on('error', function (err) {
        if(err.errno === 'EADDRINUSE') {
            console.log(`----- Port ${express_app.portNumber} is busy, trying with port ${express_app.portNumber + 1} -----`);
            startServer(express_app.portNumber + 1)
        } else {
            console.log(err);
        }
    });
}

startServer(express_app.portNumber);