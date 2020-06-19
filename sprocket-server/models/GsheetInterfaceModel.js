const { GoogleSpreadsheet } = require("google-spreadsheet");

async function getSheetContent(doc) {
  const sheet = await doc.sheetsById[0];
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



module.exports = {
  getDoc: getDoc,
  getSheetContent: getSheetContent
}
