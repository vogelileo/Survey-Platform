/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const BubbleSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    maxlength: 10,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
  },
  timezone: {
    type: String,
    required: true,
    maxlength: 50,
  },
  dates: {
    type: [Date],
    required: true,
  },
  options: {
    anonym: { type: Boolean, required: true, default: false },
    onlyOne: { type: Boolean, required: true, default: false },
    maybe: { type: Boolean, required: true, default: false },
  },
  location: {
    type: String,
    maxlength: 200,
    default: '',
  },
  additionalInformation: {
    type: String,
    maxlength: 200,
    default: '',
  },
  participants: [
    { name: { type: String, maxlength: 100, default: '' }, dates: [Date] },
  ],
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

module.exports = mongoose.model('Bubble', BubbleSchema);
