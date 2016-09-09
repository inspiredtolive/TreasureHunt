var Puzzle = require('./Puzzle.js');

module.exports = {
  //retrieve all puzzles
  retrievePuzzles: function (req, res) {
    Puzzle.find({}, function (err, data) { 
      err ? 
        res.status(404).send(err)
        : res.status(200).send(JSON.stringify(data));
    });
  },
  // retrieve only puzzles in a given set (treasure hunt)
  retrievePuzzleSet: function (req, res) {
    Puzzle.find({treasureHuntTitle: req.params.treasureHuntTitle}, function (err, data) { 
      err ? 
        res.status(404).send(err)
        : res.status(200).send(JSON.stringify(data));
    });
  },
  retrievePuzzle: function(req, res) {
    Puzzle.find({treasureHuntTitle: req.params.treasureHuntTitle, riddleTitle: req.params.riddleTitle}, function (err, data) { 
      err ? 
        res.status(404).send(err)
        : res.status(200).send(JSON.stringify(data));
    });
  },
  //will create all puzzles from array and return the array of puzzles created
  createPuzzles: function (req, res) {
    var dataArr = [];
    req.body.forEach(function(puzzleObj, index) {
      new Puzzle(puzzleObj).save(function (err, data) {
        err ? 
          res.status(500).send(err) 
          : dataArr.push(data);
        index === req.body.length - 1 && res.status(201).send(JSON.stringify(dataArr));
      });
    });
  },
  //deletes all puzzles and returns object with status and number deleted
  deletePuzzles: function (req, res) {
    Puzzle.remove({}, function(err, data) {
      err ? 
        res.status(500).send(err)
        : res.status(201).send(data);
    });
  },
  // 
  deletePuzzleSet: function(req, res) {
    Puzzle.remove({treasureHuntTitle: req.params.treasureHuntTitle}, function (err, data) { 
      err ? 
        res.status(404).send(err)
        : res.status(200).send(JSON.stringify(data));
    });
  },
  deletePuzzle: function(req, res) {
    Puzzle.remove({treasureHuntTitle: req.params.treasureHuntTitle, riddleTitle: req.params.riddleTitle}, function (err, data) { 
      err ? 
        res.status(404).send(err)
        : res.status(200).send(JSON.stringify(data));
    });
  }
};
  