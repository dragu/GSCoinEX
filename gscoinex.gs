var timezone = 'GMT+1'
var upsheet = ''


function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Update", functionName: "UPDATE"}, {name: "AutoRefresh ON", functionName: "AUON"}, {name: "AutoRefresh OFF", functionName: "AUOFF"} ];
  ss.addMenu("GSCoinEX", menuEntries);
}


function AUON() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.getRange('A1').setValue("GSCoinEX")
  sheet.getRange('C1').setValue("AUTO REFRESH: ON")
  upsheet = sheet.getSheetName()
  
  UPDATE();
  ScriptApp.newTrigger('UPDATE')
      .timeBased()
      .everyMinutes(1)
      .create();
}


function UPDATE() {
  var sheet
  if (upsheet == '') {
    var allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    for (var i = 0; i < allSheets.length; i++) {
      if (allSheets[i].getRange('A1').getValue() == "GSCoinEX") {
        sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(allSheets[i].getSheetName())
        break;
      }
    }
    if (! sheet) sheet = SpreadsheetApp.getActiveSpreadsheet()
  }
  else {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(upsheet);
  }
  
  var msg = 'Last Update: '
  msg += Utilities.formatDate(new Date(), timezone, 'dd-MM-yyyy hh:mm')
  msg += ' '
  msg += timezone
  sheet.getRange('A1').setValue("GSCoinEX")
  sheet.getRange('E1').setValue(msg)
  
  // force google to update tickers
    
  sheet.insertRowBefore(1);
  Utilities.sleep(1000);
  sheet.deleteRow(1);
}

function AUOFF() {
  function deleteTrigger() {
    var allTriggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < allTriggers.length; i++) {
        ScriptApp.deleteTrigger(allTriggers[i]);
    }
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.getRange('C1').setValue("AUTO REFRESH: OFF")
  deleteTrigger()
}

function getBitBay(from, to, type) {
  var HIGH = "max"
  var LOW = "min"
  
  var url = "https://bitbay.net/API/Public/";
  url += from; 
  url += to; 
  url += "/ticker.json";

  var response = UrlFetchApp.fetch(url);
  var test = response.getContentText();
  var result
  var ticker = JSON.parse(test);
  
  if (type == "high") type = HIGH;
  if (type == "low") type = LOW;
  if (type == "%") {
    var range = ticker[HIGH] - ticker[LOW]
    var correctedStartValueLast = ticker["last"] - ticker[LOW]
    var rangePercentage = (correctedStartValueLast * 100) / range
    result = rangePercentage / 100
  }
  else {
    result = ticker[type]; 
  }

  return parseFloat(result);
  
}

function getBitMarket(from, to, type) {
  var HIGH = "high"
  var LOW = "low"
  
  var url = "https://www.bitmarket.pl/json/";
  url += from; 
  url += to; 
  url += "/ticker.json";

  var response = UrlFetchApp.fetch(url);
  var test = response.getContentText();
  var result
  var ticker = JSON.parse(test);
  
  if (type == "%") {
    var range = ticker[HIGH] - ticker[LOW]
    var correctedStartValueLast = ticker["last"] - ticker[LOW]
    var rangePercentage = (correctedStartValueLast * 100) / range
    result = rangePercentage / 100
  }
  else {
    result = ticker[type]; 
  }
  
  return parseFloat(result);
  
}

function getPoloniex(from, to, type) {
  var HIGH = "high24hr"
  var LOW = "low24hr"
  
  var url = "https://poloniex.com/public?command=returnTicker";

  var response = UrlFetchApp.fetch(url);
  var test = response.getContentText();
  var result
  var ticker = JSON.parse(test);

  var mypair = to;
  mypair += '_';
  mypair += from;
  
  ticker = ticker[mypair];
  
  if (type == "ask") type = "lowestAsk";
  if (type == "bid") type = "highestBid";
  if (type == "high") type = HIGH;
  if (type == "low") type = LOW;
  if (type == "volume") type = "baseVolume";
  
  if (type == "%") {
    var range = ticker[HIGH] - ticker[LOW]
    var correctedStartValueLast = ticker["last"] - ticker[LOW]
    var rangePercentage = (correctedStartValueLast * 100) / range
    result = rangePercentage / 100
  }
  else {
    result = ticker[type]; 
  }

  return parseFloat(result);
}
