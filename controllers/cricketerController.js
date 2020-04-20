const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var assert= require('assert')
const Cricketer = mongoose.model('Cricketer');

router.get('/', (req, res) => {
    res.render("cricketer/addOrEdit", {
        viewTitle: "Insert Cricketer"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var cricketer = new Cricketer();
    cricketer.fullName = req.body.fullName;
    cricketer.lastname = req.body.lastname;
    cricketer.debut = req.body.debut;
    cricketer.dob = req.body.dob;
    cricketer.batting = req.body.batting;
    cricketer.bowling = req.body.bowling;
    cricketer.shirtno = req.body.shirtno;
    cricketer.runs = req.body.runs;
    cricketer.wickets = req.body.wickets;
    
    cricketer.save((err, doc) => {
        if (!err)
            res.redirect('cricketer/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("cricketer/addOrEdit", {
                    viewTitle: "Insert cricketer",
                    cricketer: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Cricketer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('cricketer/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("cricketer/addOrEdit", {
                    viewTitle: 'Update cricketer',
                    cricketer: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}
/*
router.get('/list',function(req,res,next){
    var resultarray=[];
    var db;
    var error;
    mongoose.connect('mongodb://localhost:27017/CrickDB',{ useNewUrlParser: true },function(err,database){
        error=err;
        db=database;
        assert.equal(null,err);
        var cursor=db.collection('employee').find();
        cursor.forEach(function(doc,err){
           assert.equal(null,err);
            resultarray.push(doc);
        },function(){
            db.close();
            res.render("employee/list",{data: resultarray});
            //res.render("index.hbs",{data: resultarray});


        });
    });
  
});
*/
router.get('/list', (req, res) => {
    Cricketer.find((err, docs) => {
        if (!err) {
            res.render("cricketer/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving cricketer list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Cricketer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("cricketer/addOrEdit", {
                viewTitle: "Update cricketer",
                cricketer: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Cricketer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/cricketer/list');
        }
        else { console.log('Error in cricketer delete :' + err); }
    });
});

module.exports = router;