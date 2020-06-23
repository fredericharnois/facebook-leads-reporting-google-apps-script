
/**
*
* Export Facebook Leads to Google Sheets
*
* Version: 0.2
*
* Google Apps Script maintained by Frederic Harnois
* fred@fredericharnois.com
*
**/

// MODIFY YOUR SETTINGS HERE //

// url of the google sheets where the report will be
const SPREADSHEET_URL = 'INSERT_URL'

// name of the sheet where the report will be
const TAB_NAME = 'INSERT_TAB_NAME'

// user access token linked to a Facebook app
const TOKEN = 'INSERT_TOKEN'

// lead form ID
const FORM_ID = 'INSERT_FORM_ID'

// DO NOT MODIFY ANYTHING BELOW //

function getFacebookLeads() {

  const ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  const sheet = ss.getSheetByName(TAB_NAME);

  sheet.clear();
  
  const url = 
    `https://www.facebook.com/ads/lead_gen/export_csv/?id=${FORM_ID}&type=form&access_token=${TOKEN}`;
  const fetchRequest = UrlFetchApp.fetch(url);
  const results = Utilities.parseCsv(fetchRequest, '\t');
  sheet.getRange(1,1, results.length, results[0].length).setValues(results);
}