var express = require('express')
var router = express.Router()
var ZoneController = require('../controllers/ZoneController')

router.get('/:resource', function(req, res, next){
  var resource = req.params.resource
  if (resource == 'zone'){
    ZoneController.find(req.query, function(err, results){
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'success',
        results: results
      })
    })
  }

})

router.get('/:resource/:id', function(req, res, next){
  var resource= request.params.resource
  var id= rquest.params.id
  if (resource == 'zone'){
    ZoneController.findById(id, function(err, result){
      if (err){
        res.json({
        confirmation: 'fail',
        message: err
      })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })

    })
  }
})
module.exports = router
