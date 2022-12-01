// API
function doGet() {
    return ContentService.createTextOutput(JSON.stringify(getProfile()))
}
function doPost(e) {
    var sheet = ss.getSheetByName('NewsLetter')
    if (e.parameters.subscribe == 1) {
        sheet.getRange(sheet.getLastRow() + 1, 1).setValue(e.postData.contents)
        return ContentService.createTextOutput('201')
    }
    return ContentService.createTextOutput('501')
}
function onOpen(e) {
    showMenu()
}
function main() {
    NewDatabaseSheets()
    onOpen()
}

// GETTING DATA
var ss = SpreadsheetApp.getActiveSpreadsheet()
var FolderID = '1PME1DQJKdqTrCIe4a4wwmiBZfJCmBj7M'
var companyName = 'ICD'

function getProfile() {
    var profile = {
        // home page
        companyName: ss.getSheetByName('Home').getRange('B1').getValue(),
        logo: ss.getSheetByName('Home').getRange('B2').getValue(),
        heading: ss.getSheetByName('Home').getRange('B3').getValue(),
        bio: ss.getSheetByName('Home').getRange('B4').getValue(),
        video: ss.getSheetByName('Home').getRange('B5').getValue(),
        getStarted: ss.getSheetByName('Home').getRange('B6').getValue(),

        // Contact
        email1: ss.getSheetByName('Home').getRange('B7').getValue(),
        email2: ss.getSheetByName('Home').getRange('B8').getValue(),
        number1: ss.getSheetByName('Home').getRange('B9').getValue(),
        number2: ss.getSheetByName('Home').getRange('B10').getValue(),
        address1: ss.getSheetByName('Home').getRange('B11').getValue(),
        address2: ss.getSheetByName('Home').getRange('B12').getValue(),

        // social media
        facebook1: ss.getSheetByName('Home').getRange('B13').getValue(),
        facebook2: ss.getSheetByName('Home').getRange('B14').getValue(),
        twitter: ss.getSheetByName('Home').getRange('B15').getValue(),
        instagram: ss.getSheetByName('Home').getRange('B16').getValue(),
        tiktok: ss.getSheetByName('Home').getRange('B17').getValue(),
        whatsapp1: ss.getSheetByName('Home').getRange('B18').getValue(),
        whatsapp2: ss.getSheetByName('Home').getRange('B19').getValue(),
        linkedIn: ss.getSheetByName('Home').getRange('B20').getValue(),
        github: ss.getSheetByName('Home').getRange('B21').getValue(),

        // Documentations
        terms: ss.getSheetByName('Home').getRange('B22').getValue(),
        privacyPolicy: ss.getSheetByName('Home').getRange('B23').getValue(),
        contactLink: ss.getSheetByName('Home').getRange('B24').getValue(),

        // About
        about1: ss.getSheetByName('About').getRange('B1').getValue(),
        about2: ss.getSheetByName('About').getRange('B2').getValue(),
        mission: ss.getSheetByName('About').getRange('B3').getValue(),
        vision: ss.getSheetByName('About').getRange('B4').getValue(),
        learnMore: ss.getSheetByName('About').getRange('B5').getValue(),
        counter1: ss.getSheetByName('About').getRange('B6').getValue(),
        counter2: ss.getSheetByName('About').getRange('B7').getValue(),
        counter3: ss.getSheetByName('About').getRange('B8').getValue(),
        counter4: ss.getSheetByName('About').getRange('B9').getValue(),

        faq: obtain('FAQ', ['question', 'answer']),
        clients: obtain('Clients', ['name', 'url']),
        services: obtain('Services', ['title', 'url', 'description']),
        media: getMedia(),
        team: obtain('Team', ['name', 'jobTitle', 'url']),
        tabs: getMediaTabs()
    }
    Logger.log(profile)
    return profile
}

// Function that returns all data inside this sheet as an array of objects according to this keys
// Keys must have an order
function obtain(sheetName, keys) {
    var sheet = ss.getSheetByName(sheetName)

    var lr = sheet.getLastRow()
    var arr = []
    for (let i = 2; i <= lr; i++) {
        var obj = {}
        obj['index'] = (i - 1).toString();
        for (j = 0; j < keys.length; j++) {
            obj[keys[j]] = sheet.getRange(i, j + 1).getValue()
            if (sheetName.includes('MEDIA / ')) {
                obj['id'] = `${sheetName.slice(8, sheetName.length)}-${i - 1}`
            } else obj['id'] = `${sheetName}-${i - 1}`
        }
        arr.push(obj)
    }
    // Logger.log(arr)
    return arr
}

function getImagesFromDrive() {

    var dd = DriveApp.getFolderById(FolderID)
    var Images = []
    var files = dd.getFiles()
    while (files.hasNext()) {
        var url = files.next().getUrl()
        var id = url.slice(32, url.length - 18)
        // Logger.log(url)
        // Logger.log(id)
        var file = DriveApp.getFileById(id)
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
        var image = `https://drive.google.com/uc?export=view&id=${id}`
        Images.push(image)

    }
    // Logger.log(Images)
    return Images
}

function pasteCell(value) {
    // it puts the img url in the current cell
    ss.getActiveSheet().getActiveCell().setValue(value)
}

function getCell() {
    // it gets the content of the current cell
    ss.getActiveSheet().getActiveCell().getValue()
}

function getMedia() {
    var media = {}
    ss.getSheets().forEach(s => {
        if (s.getName().includes('MEDIA / ')) {
            var name = s.getName().slice(8, s.getName().length)
            media[name] = obtain(s.getName(), ['title', 'url', 'description'])

        }
    })
    Logger.log(media)
    return media
}


function getMediaTabs() {
    // var media = []
    var mediaTabs = []
    ss.getSheets().forEach(s => {
        if (s.getName().includes('MEDIA / ')) {
            var name = s.getName().slice(8, s.getName().length)
            mediaTabs.push(name)
        }
    })
    // Logger.log(media)
    Logger.log(mediaTabs)
    return mediaTabs

}

// UI
function showMenu() {
    var ui = SpreadsheetApp.getUi()
    var menu = ui.createMenu(companyName)
    menu.addItem('Insert Image', 'showImageSidebar')
    menu.addItem('Insert Text', 'showTextSidebar')
    menu.addItem('Add New Media Section', 'createNewMediaSection')

    menu.addToUi()
}


function createNewMediaSection() {

    var ui = SpreadsheetApp.getUi()
    var name = ui.prompt('Enter Name').getResponseText()
    newMediaSection(name)
}

function showImageSidebar() {
    var ui = SpreadsheetApp.getUi()
    ui.showSidebar(HtmlService.createHtmlOutputFromFile('T1.html')
        .setTitle('Powered by Lebancode.com'))
}

function showTextSidebar() {
    var ui = SpreadsheetApp.getUi()
    ui.showSidebar(HtmlService.createHtmlOutputFromFile('T2.html')
        .setTitle('Powered by Lebancode.com'))
}

// MACROS


function NewDatabaseSheets() {
    var spreadsheet = SpreadsheetApp.getActive();
    spreadsheet.getRange('E10').activate();
    spreadsheet.getActiveSheet().setName('Home');
    spreadsheet.getRange('A1').activate();
    spreadsheet.getCurrentCell().setValue('Company Name');
    spreadsheet.getRange('A2').activate();
    spreadsheet.getCurrentCell().setValue('Logo');
    spreadsheet.getRange('A3').activate();
    spreadsheet.getCurrentCell().setValue('Heading1');
    spreadsheet.getRange('A4').activate();
    spreadsheet.getCurrentCell().setValue('Bio');
    spreadsheet.getRange('A5').activate();
    spreadsheet.getCurrentCell().setValue('Video URL');
    spreadsheet.getRange('A6').activate();
    spreadsheet.getCurrentCell().setValue('Get Started ( URL )');
    spreadsheet.getRange('A7').activate();
    spreadsheet.getCurrentCell().setValue('Email1');
    spreadsheet.getRange('A8').activate();
    spreadsheet.getCurrentCell().setValue('Email2');
    spreadsheet.getRange('A9').activate();
    spreadsheet.getCurrentCell().setValue('Number1');
    spreadsheet.getRange('A10').activate();
    spreadsheet.getCurrentCell().setValue('Number2');
    spreadsheet.getRange('A11').activate();
    spreadsheet.getCurrentCell().setValue('Address1');
    spreadsheet.getRange('A12').activate();
    spreadsheet.getCurrentCell().setValue('Address2');
    spreadsheet.getRange('A13').activate();
    spreadsheet.getCurrentCell().setValue('Facebook1');
    spreadsheet.getRange('A14').activate();
    spreadsheet.getCurrentCell().setValue('Facebook2');
    spreadsheet.getRange('A15').activate();
    spreadsheet.getCurrentCell().setValue('Twitter');
    spreadsheet.getRange('A16').activate();
    spreadsheet.getCurrentCell().setValue('Instagram');
    spreadsheet.getRange('A17').activate();
    spreadsheet.getCurrentCell().setValue('Tiktok');
    spreadsheet.getRange('A18').activate();
    spreadsheet.getCurrentCell().setValue('Whatsapp1');
    spreadsheet.getRange('A19').activate();
    spreadsheet.getCurrentCell().setValue('Whatsapp2');
    spreadsheet.getRange('A20').activate();
    spreadsheet.getCurrentCell().setValue('LinkedIn');
    spreadsheet.getRange('A21').activate();
    spreadsheet.getCurrentCell().setValue('Github');
    spreadsheet.getRange('A22').activate();
    spreadsheet.getCurrentCell().setValue('Terms and Conditions');
    spreadsheet.getRange('A23').activate();
    spreadsheet.getCurrentCell().setValue('Privacy Policy');
    spreadsheet.getRange('A24').activate();
    spreadsheet.getCurrentCell().setValue('Contact Link');
    // spreadsheet.getRange('A25').activate();
    // spreadsheet.getCurrentCell().setValue('FOLDER ID').setFontColor('red');
    spreadsheet.getRange('C:C').activate();
    var currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('A:B').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 2, 500);
    var sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('A:A').activate();
    spreadsheet.getActiveRangeList().setBackground('#d9d9d9');
    spreadsheet.getRange('B6').activate();
    spreadsheet.insertSheet(1);
    spreadsheet.getActiveSheet().setName('About');
    spreadsheet.getCurrentCell().setValue('About 1');
    spreadsheet.getRange('A2').activate();
    spreadsheet.getCurrentCell().setValue('About 2');
    spreadsheet.getRange('A3').activate();
    spreadsheet.getCurrentCell().setValue('Mission');
    spreadsheet.getRange('A4').activate();
    spreadsheet.getCurrentCell().setValue('Vision');
    spreadsheet.getRange('A5').activate();
    spreadsheet.getCurrentCell().setValue('Learn More ( URL )');
    spreadsheet.getRange('A6').activate();
    spreadsheet.getCurrentCell().setValue('Counter 1');
    spreadsheet.getRange('A7').activate();
    spreadsheet.getCurrentCell().setValue('Counter 2');
    spreadsheet.getRange('A8').activate();
    spreadsheet.getCurrentCell().setValue('Counter 3');
    spreadsheet.getRange('A9').activate();
    spreadsheet.getCurrentCell().setValue('Counter 4');
    spreadsheet.getRange('C:C').activate();
    currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('B1').activate();
    spreadsheet.getActiveSheet().setFrozenRows(0);
    spreadsheet.getRange('A:B').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 2, 500);
    sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('A:A').activate();
    spreadsheet.getActiveRangeList().setBackground('#d9d9d9');
    spreadsheet.getRange('B5').activate();
    spreadsheet.insertSheet(2);
    spreadsheet.getActiveSheet().setName('Services');
    spreadsheet.getCurrentCell().setValue('Title');
    spreadsheet.getRange('B1').activate();
    spreadsheet.getCurrentCell().setValue('Image');
    spreadsheet.getRange('C1').activate();
    spreadsheet.getCurrentCell().setValue('Description');
    spreadsheet.getRange('D:D').activate();
    currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('A:C').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 3, 400);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveSheet().setFrozenRows(0);
    sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontWeight('bold')
        .setBackground('#d9d9d9');
    spreadsheet.getRange('A3').activate();
    spreadsheet.insertSheet(3);
    spreadsheet.getActiveSheet().setName('FAQ');
    spreadsheet.getCurrentCell().setValue('Question');
    spreadsheet.getRange('B1').activate();
    spreadsheet.getActiveSheet().setFrozenRows(0);
    spreadsheet.getRange('B1').activate();
    spreadsheet.getCurrentCell().setValue('Answer');
    spreadsheet.getRange('C:C').activate();
    currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('A:B').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 2, 500);
    sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('bottom')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontWeight('bold')
        .setBackground('#d9d9d9');
    spreadsheet.insertSheet(4);
    spreadsheet.getActiveSheet().setName('Clients');
    spreadsheet.getCurrentCell().setValue('Client Name');
    spreadsheet.getRange('B1').activate();
    spreadsheet.getCurrentCell().setValue('Client Logo');
    spreadsheet.getRange('C:C').activate();
    currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('A:B').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 2, 500);
    sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontWeight('bold')
        .setBackground('#d9d9d9');
    spreadsheet.insertSheet(5);
    spreadsheet.getActiveSheet().setName('MEDIA / Latest');
    spreadsheet.getCurrentCell().setValue('Title');
    spreadsheet.getRange('B1').activate();
    spreadsheet.getCurrentCell().setValue('Image');
    spreadsheet.getRange('C1').activate();
    spreadsheet.getCurrentCell().setValue('Description');
    spreadsheet.getRange('D:D').activate();
    currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('A:C').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 3, 400);
    sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontWeight('bold')
        .setBackground('#d9d9d9');
    spreadsheet.getRange('A4').activate();
    spreadsheet.insertSheet(6);
    spreadsheet.getActiveSheet().setName('Team');
    spreadsheet.getCurrentCell().setValue('Name');
    spreadsheet.getRange('B1').activate();
    spreadsheet.getCurrentCell().setValue('Job Title');
    spreadsheet.getRange('C1').activate();
    spreadsheet.getCurrentCell().setValue('Image');
    spreadsheet.getRange('D:D').activate();
    currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('A:C').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 3, 400);
    sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontWeight('bold')
        .setBackground('#d9d9d9');
    spreadsheet.getRange('A3').activate();

    createNewsletter()
};

function newMediaSection(name) {
    var spreadsheet = SpreadsheetApp.getActive();
    spreadsheet.getRange('A1:C1').activate();
    spreadsheet.insertSheet(5);
    spreadsheet.getActiveSheet().setName(`MEDIA / ${name}`);
    spreadsheet.getCurrentCell().setValue('Title');
    spreadsheet.getRange('B1').activate();
    spreadsheet.getCurrentCell().setValue('Image');
    spreadsheet.getRange('C1').activate();
    spreadsheet.getCurrentCell().setValue('Description');
    spreadsheet.getRange('D:D').activate();
    var currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getRange('A:C').activate();
    spreadsheet.getActiveSheet().setColumnWidths(1, 3, 400);
    var sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontWeight('bold')
        .setBackground('#d9d9d9');
    spreadsheet.getRange('A2').activate();
};

function createNewsletter() {
    var spreadsheet = SpreadsheetApp.getActive();
    spreadsheet.getRange('A1').activate();
    spreadsheet.insertSheet(9);
    spreadsheet.getActiveSheet().setName('NewsLetter');
    spreadsheet.getRange('B:B').activate();
    var currentCell = spreadsheet.getCurrentCell();
    spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
    currentCell.activateAsCurrentCell();
    spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
    spreadsheet.getActiveSheet().setColumnWidth(1, 700);
    spreadsheet.getRange('A1').activate();
    spreadsheet.getCurrentCell().setValue('Subscribers');
    var sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontWeight('bold')
        .setBackground('#d9d9d9');
    spreadsheet.getRange('A5').activate();
};





