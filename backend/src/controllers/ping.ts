import * as express from "express";
import * as data from "../data"


export const pingController = express.Router();

pingController.get('/events/types/:care_recipient_id', (req, res) => {
  data.retrieveEventTypes(req.params.care_recipient_id)
  .then((objects) => {
    res.status(200).json({"data": objects});
  }).catch((err) => {
    res.status(500).json({"error": err});
  });
});

pingController.get('/events/:care_recipient_id', (req, res) => {
  data.retrieveData(
    req.params.care_recipient_id,
    req.query.event_type,
    req.query.date_from,
    req.query.date_to
  ).then((objects) => {
    res.status(200).json({"data": objects});
  }).catch((err) => {
    res.status(500).json({"error": err});
  });
});
