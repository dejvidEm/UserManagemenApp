var Userdb = require("../model/model");

// creating and saving new user
exports.create = (req, res) => {
    // validation of the request
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // saving collected data in the database
    user
        .save(user)
        .then(data => {
            // res.send(data) // sending data
            res.redirect(`/add-user`);
        })
        .catch(err => { // catching error 
            res.status(500).send({
                message: err.message || "Some error occureed while creating a create operation"
            })
        });
}


// retrive and return all users/ retrive and return single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({
                        message: "Not found user with id "+id
                    })
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with id "+id
                })
            })
    }else{
        Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occureed while finding information from database"
        })
    })
    }
}


// update a new identified user by user ID
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update can not be empty!"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot update user with ${id}. Maybe user not found`
            })
        }else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error Update user information"
        })
    })
}


// delete a user with specified user ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}