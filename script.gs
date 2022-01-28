function log() {
  var folderName = "name of google drive folder goes here";
  var folderListing = "name of spreadsheet";

  var folders = DriveApp.getFoldersByName(folderName);
  var folder = folders.next();
  var contents = folder.getFiles();

  var spreadsheet = SpreadsheetApp.create(folderListing);
  var sheet = spreadsheet.getActiveSheet();
  sheet.appendRow(['ITEM', 'CATEGORY', 'QUANTITY']);

  var file;
  var fileName;
  var link;
  
  while(contents.hasNext()) {
    var info = [{}];
    file = contents.next();
    link = file.getUrl();
    fileName = file.getName(); // file names are written in format as {item name}_{categories}_{quantity}.JPG
    fileName = fileName.replace(".JPG", "");
    
    info = fileName.split("_"); // splits item name, category, and quantity into different variables
    var itemName = info[0];
    var category = info[1];
    var quantity = info[2];
    
    var hyperlink = '=HYPERLINK("' + link + '", "' + itemName + '")';
    sheet.appendRow([hyperlink, category, quantity]); 
  }
}
