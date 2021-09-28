function listFolderContents() {
  var foldername = 'name of google drive folder goes here';
  var folderlisting = 'listing of folder ' + foldername;
  
  var folders = DriveApp.getFoldersByName(foldername)
  var folder = folders.next();
  var contents = folder.getFiles();
  
  var ss = SpreadsheetApp.create(folderlisting);
  var sheet = ss.getActiveSheet();
  sheet.appendRow( ['ITEM'] ); // name this to whatever you want
  
  var file;
  var name;
  var link;
  while(contents.hasNext()) {
    file = contents.next();
    name = "" + file.getName();
    name = name.replace(".JPG", ""); // optional, I used this to remove .JPG at the end of each file name
    link = "" + file.getUrl();
    hyperlink = '=HYPERLINK("' + link + '", "' + name + '")';
    sheet.appendRow( [hyperlink] );     
  }  
};
