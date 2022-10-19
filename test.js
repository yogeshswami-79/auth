const { exec } = require('child_process');

function executeCmd(cmd){
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return console.log('err: ', err)
        }
        if (stdout) {
            return console.log(stdout)
        }
        if (stderr) {
            return console.log('stderr: ', stderr)
        }
    })
}

for(let i =0; i<10; i++){
    executeCmd('npm start')
}
