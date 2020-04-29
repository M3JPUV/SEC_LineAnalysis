//ZAB. calls the python file to run the usermodel
exports.usermodel = async function(list,team_a,team_b){
    //result = {};
    let {PythonShell} = require('python-shell')
    //let fs = require('fs');
    let options = {pythonPath:'/usr/bin/python3.8',args: [list, team_a, team_b]};
    PythonShell.run('ping_me.py', options,  async function (err, results) {
      if (err) throw err;
    });
};
//usermodel.usemodel('Passer_Rating,Rush_TDs_/_Gm','LSU','Georgia_Southern');
