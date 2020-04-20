const mongoose = require('mongoose');

var cricketerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    lastname: {
        type: String
    },
    debut: {
        type: String
    },
    dob: {
        type: String
    },
    batting: {
        type: String
    },
    bowling: {
        type: String
    },
    shirtno: {
        type: String
    },
    runs: {
        type: String
    },
    wickets: {
        type: String
    }
});

mongoose.model('Cricketer', cricketerSchema);