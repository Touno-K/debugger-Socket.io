var Service = require('node-windows').Service;
var args = process.argv[2] || '-i';

var svc = new Service({
  name:'Debugger-Backup',
  description: 'Source Code Backup - Server Socket.io',
  script: require('path').join(__dirname, 'app.js'), 
  env: [
    { name: "BACKUP", value: './Source-Bundle/' },
    { name: "SERVER_IP", value: '192.168.10.2' },
    { name: "SERVER_PATH", value: 'NSprogrammer\\.SourceCode-Bundle' }
  ]
});

svc.on('install',function(e){
  console.log(e);
  console.log('Service install sucessfully');
  svc.start();
});

svc.on('start', function() {
  console.log('Service starting');
});
svc.on('stop', function() {
  console.log('Service stoping');
});

if(args == '-i') svc.install();
if(args == '-u') svc.uninstall();
