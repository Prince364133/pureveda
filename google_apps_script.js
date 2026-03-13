function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get data from the request
  var date = e.parameter.DATE || new Date().toLocaleString();
  var name = e.parameter.NAME || 'N/A';
  var phone = e.parameter.PHONENO || 'N/A';
  
  // Append a new row to the sheet
  sheet.appendRow([date, name, phone]);
  
  // Return success response in JSON format
  return ContentService.createTextOutput(JSON.stringify({
    "status": "success",
    "message": "Data saved successfully"
  })).setMimeType(ContentService.MimeType.JSON);
}
