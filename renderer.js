// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// var $ = require('jquery');
      // var io = require('socket.io-client');
      // var me = io.connect('http://localhost:3001/websock');
      // me.on('connect', function(){
      //   console.log('Connected to server...');
      //   me.emit('msg', 'Can you hear me!!' );
      // });

      // me.on('greet', (msg) => {
      //   console.log(msg);
      // });

      // me.on('ticker', (data) => console.log('Data ticker:', data));
      
      // You can also require other files to run in this process

window.startRest = false;
window.startWebsocket = true;

var jQuery= require('jquery');
(function ($, w){

      $('#stopws').click((e)=>{
            console.log('Stop feed...');
            window.startWebsocket = false;
      });

      $('#startws').click((e) => {
            console.log('Starting websock feed');
            window.startWebsocket = true;
      });

      $('#startrest').click((e)=> {
            console.log('Start rest calls');
            window.startRest = true;
      });

      $('#stoprest').click((e)=> {
            console.log('Stop rest calls');
            window.startRest = false;
      });
})(jQuery, window);