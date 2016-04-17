var Service = require('node-windows').Service;
var path = require('path');

var args1 = process.argv[2] || '-i', args2 = process.argv[3] || null;

const service_config = {
  name:'Debugger-Backup',
  description: 'Source Code Backup - Server Socket.io',
  script: path.join(__dirname, 'app.js'), 
  env: [
    { name: "BACKUP", value: path.join(__dirname, '/Source-Bundle/') },
    { name: "SERVER_IP", value: '192.168.10.2' },
    { name: "SERVER_PATH", value: 'NSprogrammer\\.SourceCode-Bundle' }
  ]
}

var svc = new Service(service_config);

svc.on('install',function(e){
  console.log(e);
  console.log('Service install sucessfully');
  svc.start();
});

svc.on('start', function() {
  console.log('Service starting, ', service_config.name);
});
svc.on('stop', function() {
  console.log('Service stoping, ', service_config.name);
});

if(args1 == '-u' || args2 == '-u') svc.uninstall();
if(args1 == '-i' || args2 == '-i') svc.install();
