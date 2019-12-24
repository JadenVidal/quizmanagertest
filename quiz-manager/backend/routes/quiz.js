const router = require('express').Router();
let Quiz = require('../models/quiz.model');

//get all
router.route('/').get((req, res) => {
  Quiz.find()
    .then(quiz => res.json(quiz))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get quiz by school
router.route('/:username/:school').get((req, res) => {
  Quiz.find({"school": req.params.school, "scope": "public", "username": { $ne : req.params.username }})
    .then(quiz => res.json(quiz))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get quiz by username
router.route('/:username').get((req, res) => {
    Quiz.find({"username": req.params.username})
      .then(quiz => res.json(quiz))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//add quiz  
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const scope = req.body.scope;
  const username = req.body.username;
  const school = req.body.school;
  const questions = req.body.questions;

  const newQuiz = new Quiz({name, scope, username, school, questions});

  newQuiz.save()
    .then(() => res.json('Quiz added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update single field by id
router.route('/:field/:quiz_id').put((req, res) => {
    Quiz.findById(req.params.quiz_id)
      .then(quiz => {
        const fieldReq = req.params.field  
        quiz[fieldReq] = req.body[fieldReq];
  
        quiz.save()
          .then(() => res.json('Quiz updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

//update quiz id
router.route('/:quiz_id').put((req, res) => {
  Quiz.findById(req.params.quiz_id)
    .then(quiz => {
      quiz = req.body;

      quiz.save()
        .then(() => res.json('Quiz updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

   //delete by id 
   router.route('/:id').delete((req, res) => {
    Quiz.findByIdAndDelete(req.params.id)
      .then(() => res.json('Quiz deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;