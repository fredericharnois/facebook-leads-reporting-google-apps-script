
/**
*
* Export Facebook Leads to Google Sheets
*
* Version: 0.1
* Google Apps Script maintained by Frederic Harnois
*
**/

// MODIFY YOUR SETTINGS HERE //

// url of the google sheets where the report will be
var SPREADSHEET_URL = 'INSERT_URL'

// name of the sheet where the report will be
var TAB_NAME = 'INSERT_TAB_NAME'

// DCM profile ID
var TOKEN = 'INSERT_PROFILE_ID'

// DCM report ID
var FORM_ID = 'INSERT_REPORT_ID'

// DO NOT MODIFY ANYTHING BELOW //

function getFacebookLeads() {

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(TAB_NAME);

  sheet.clear();
  
  var facebookUrl = 
    'https://graph.facebook.com/v3.3/' + FORM_ID +
    '&access_token=' + TOKEN;
  var response = UrlFetchApp.fetch(facebookUrl);
  var url = JSON.parse(response).leadgen_export_csv_url;
  var fetchRequest = UrlFetchApp.fetch(url);
  var results = Utilities.parseCsv(fetchRequest, '\t');
  sheet.getRange(1,1, results.length, results[0].length).setValues(results);
}