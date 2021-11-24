/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

const express = require('express');
const router = express.Router();

const Bubble = require('../../db/models/bubble');
const checkParameterValidity = require('../../libs/checkParameterValidity');
const createUniqueId = require('../../libs/createUniqueId');

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/
const allowedParams = [
  'title',
  'email',
  'timezone',
  'dates',
  'options',
  'location',
  'additionalInformation',
];

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.post('/createBubble', async (req, res) => {
  if (!checkParameterValidity(req, allowedParams)) {
    return res.status(400).json({ error: 'Invalide parameters' });
  }
  let totalCountOfDocuments = await Bubble.countDocuments({});
  let shortId = createUniqueId(totalCountOfDocuments);
  req.body.shortId = shortId;
  try {
    let newBubble = new Bubble(req.body);
    await newBubble.save();
    res.status(201).send(newBubble);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/getBubble/:id', async (req, res) => {
  let bubble = await Bubble.find({ shortId: req.params.id }).lean();
  res.status(200).send({ result: bubble });
});

router.post('/addParticipant/:id', async (req, res) => {
  if (!req.body.name || !req.body.dates || typeof req.body.dates !== 'object') {
    return res.status(400).json({ error: 'Invalide parameters' });
  }
  //Create Template Participant
  let participant = {
    name: req.body.name,
    dates: [],
  };
  let allDatesFormatCorrect = true;
  req.body.dates.forEach((date) => {
    //try to cast all dates to iso
    try {
      let d = new Date(date);
      participant.dates.push(d.toISOString());
    } catch (e) {
      allDatesFormatCorrect = false;
    }
  });
  if (participant.dates.length === 0) {
    participant.dates = ['Not available'];
  }
  if (!allDatesFormatCorrect) {
    return res.status(400).json({ error: "Dates aren't formatted correctly" });
  }
  try {
    await Bubble.findOneAndUpdate(
      { shortId: req.params.id },
      {
        $push: { participants: participant },
      }
    ).lean();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

module.exports = router;
