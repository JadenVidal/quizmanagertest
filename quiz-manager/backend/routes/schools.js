const router = require('express').Router();
let School = require('../models/school.model');

//get all
router.route('/').get((req, res) => {
  School.find()
    .then(schools => res.json(schools))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get single school by id
router.route('/id/:school_id').get((req, res) => {
    School.findById(req.params.school_id)
      .then(school => res.json(school))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//get single school by key
router.route('/key/:school_key').get((req, res) => {
  School.find({keys: { $all: [req.params.school_key]}})
    .then(school => res.json(school))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add school  
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const keys = req.body.keys;
  const newSchool = new School({name, keys});

  newSchool.save()
    .then(() => res.json('School added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update single field by id
router.route('/:field/:school_id').put((req, res) => {
    School.findById(req.params.school_id)
      .then(school => {
        const fieldReq = req.params.field  
        school[fieldReq] = req.body[fieldReq];
  
        school.save()
          .then(() => res.json('School updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

 //delete by id 
  router.route('/:id').delete((req, res) => {
    School.findByIdAndDelete(req.params.id)
      .then(() => res.json('School deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;