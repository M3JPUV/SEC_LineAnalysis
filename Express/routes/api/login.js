express = require('express');
router = express.Router();
Sequelize = require('sequelize');
foundEmail = null;
foundPassword = null;

router.get('/:email/:password', (req, res) => {
    var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
    host: "138.47.204.103",
    port: 3306,
    dialect: 'mysql'
    });
    sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
    }).finally(() => {
    sequelize.close();
    });

    email = req.params.email;
    password = req.params.password;
    //L. Attempt to find if the email is valid
        Eresults = sequelize.query(`SELECT DISTINCT u.Email, u.Password FROM Users AS u WHERE u.Email = "${email}" and u.Password = "${password}"`,{raw: true, type: sequelize.QueryTypes.SELECT}).then(data => {
            foundEmail = null;
            foundPassword = null;
            data.forEach( (row) => {
                foundEmail = row.Email;
                foundPassword = row.Password;
            });
            console.log(foundEmail);
            console.log(foundPassword);
            if (foundEmail !== null && foundPassword !== null){
                res.status(200).json("Succesful Login");
                sequelize.close();
            }
            else{
                res.status(400).json("Invalid email or password");
                sequelize.close();
            }

                    }).catch(err => console.log(err));
});
    
module.exports = router;
