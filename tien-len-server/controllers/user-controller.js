const User = require('../models/user')

module.exports={
    getAll:function(req,res){
        User.getAllUsers((err, users) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ users });
        });
    }
}