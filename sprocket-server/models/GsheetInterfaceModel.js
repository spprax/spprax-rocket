const { GoogleSpreadsheet } = require("google-spreadsheet");

async function getSheetContent(doc) {
  const sheet = doc.sheetsById[0];
  const rows = await sheet.getRows();

  return rows;

  // process rows to be good.
}

async function getDoc() {
  const doc = new GoogleSpreadsheet('1Z0Byobf75reObmaKJiw8X_IHPWk_z3otKfb1wGMKcP0');
  await doc.useServiceAccountAuth(require("../credentials.json"));
  await doc.loadInfo();

  return doc;
}

async function saveQAnswer(doc, res) {
  // combine header and ID
  let header = [];

  res.titleArr.forEach((title, index) => {
    header.push(`${res.idArr[index]}: ${title}`);
  })

  let rowsVal = {};
  header.forEach((key, index) => rowsVal[key] = res.answers[index]);

  const sheet = await doc.sheetsById[1553023604];
  await sheet.setHeaderRow(header);

  const row = await sheet.addRow(rowsVal);
}



module.exports = {
  getDoc: getDoc,
  getSheetContent: getSheetContent,
  saveQAnswer: saveQAnswer
}
