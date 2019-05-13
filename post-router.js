const express = require('express');
const db = require('./data/db');
const router = express.Router();


router.post('/', (req, res) => {
    const newPost = req.body;
    if(newPost.title && newPost.contents){
        try{
            db.insert(newPost)
            res.status(201).json(newPost)            
        }catch(error){
            res.status(500).json({error: "There was an error while saving the post to the database"})
        }
    }
    else{
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
});

router.get('/', (req, res) => {
    try{
        db.find()
        console.log(res.data)
        res.status(200).json(res)
    }catch(error){res.status(500).json({error:"The posts information could not be retrieved." })}
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    if(id){
        try{
            db.findById(id)
            res.status(200).json(res)
        }catch(error){res.status(404).json({message: "The post with the specified ID does not exist."})}
    }else{ res.status(500).json({error: "The post information could not be retrieved."})}
    
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const post = req.body;
    if(post.title || post.contents){
        try{
            db.update(id, post)
            res.status(201).json(res)
        }catch(error){res.status(404).json(`{ message: "The post with the specified ID does not exist." }`)}
    }
    else(res.status(400).json(`{ errorMessage: "Please provide title and contents for the post." }`))
})



module.exports = router;