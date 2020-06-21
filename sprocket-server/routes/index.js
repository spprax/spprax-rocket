const express = require('express');
const path = require('path');
const router = express.Router();
const sheetsmodel = require('../models/GsheetInterfaceModel.js');

/**
 * home page leads to built version of SPA
 */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../sprocket-client/build', 'index.html'))
});

/**
 * access to API home page
 */
router.get('/api', function(req, res, next) {
  res.send(`
      <h1>Spprax Server API</h1>
      <p>Welcome to sprocket backend with API access.</p>
  `);
});

function makeJsonResponse(row) {
  return {
    id: row.ID,
    title: row.Title,
    content: row.Content,
    type: row.Type,
    options: row.Options ? row.Options.split(",").map((option) => {return option.replace("\n", "").trim()}) : null,
    prompt: row.Prompt ? row.Prompt : ""
  }
}

/**
 * access to API by providing an ID
 */
router.get('/api/question/:id?', async function(req, res, next) {
  let rows = await sheetsmodel.getSheetContent(await sheetsmodel.getDoc());
  let jsonResponse = [];

  // Get all records
  if (req.params['id'] === undefined) {

    rows.forEach((row) => {
      jsonResponse.push(makeJsonResponse(row));
    });

  // Record does not exist
  } else if (rows.length - 1 < req.params['id']) {
    res.send("Error: Specified index does not exist!");

    return;

  // Get specific record
  } else {
    let row = rows[req.params['id']];
    jsonResponse.push(makeJsonResponse(row));
  }

  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(jsonResponse, null, 2));
});

module.exports = router;
