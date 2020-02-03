const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    return res.status(200).json({msg: 'eat my bootyt'});
});


router.post('/', (req, res) => {
    return res.status(201).json({msg: 'success post'});
});
    
module.exports = router;
