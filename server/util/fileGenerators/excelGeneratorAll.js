const excel = require('excel4node');

const text = {
  worksheetResults: 'Resultaten',
  id: 'id',
  gender: 'geslacht',
  age: 'leeftijd',
  schooledFor: 'geschoold voor',
  schooledTill: 'geschoold tot',
  notes: 'notities',
  results: 'resultaten',
  phase1: 'Fase 1',
  phase2: 'Fase 2',
  phase3: 'Fase 3',
  uniqueSet: 'unieke set',
  groupedSet: 'gepaarde set',
  abstractSet: 'abstracte set',
}

const columns = {
  id: 1,
  gender: 2,
  age: 3,
  schooledFor: 4,
  schooledTill: 5,
  resultPart1: 6,
  resultPart2UniqueSet: 7,
  resultPart2GroupedSet: 8,
  resultPart2AbstractSet: 9,
  resultPart3UniqueSet: 10,
  resultPart3GroupedSet: 11,
  resultPart3AbstractSet: 12,
}

const styleHeading = {
  font: {
    color: '#000000',
    size: 12
  }
}

const styleData = {
  font: {
    color: '#000000',
    size: 10
  },
  numberFormat: '#0; (#0); -'
}

function makeExcel(results){
  let workbook = new excel.Workbook();
  let worksheetResults = workbook.addWorksheet(text.worksheetResults);

  setColumnWidths(worksheetResults);
  writeHeadingResults(worksheetResults);
  writeResults(worksheetResults, results);

  return workbook;
}

function setColumnWidths(worksheet){
  worksheet.column(columns.id).setWidth(22);
  worksheet.column(columns.schooledFor).setWidth(14);
  worksheet.column(columns.schooledTill).setWidth(13);
  worksheet.column(columns.resultPart1).setWidth(16);
  worksheet.column(columns.resultPart2UniqueSet).setWidth(12);
  worksheet.column(columns.resultPart2GroupedSet).setWidth(14);
  worksheet.column(columns.resultPart2AbstractSet).setWidth(14);
  worksheet.column(columns.resultPart3UniqueSet).setWidth(12);
  worksheet.column(columns.resultPart3GroupedSet).setWidth(14);
  worksheet.column(columns.resultPart3AbstractSet).setWidth(14);
}

function writeHeadingResults(worksheet){
  worksheet.cell(1,columns.id).string(text.id).style(styleHeading);
  worksheet.cell(1,columns.gender).string(text.gender).style(styleHeading);
  worksheet.cell(1,columns.age).string(text.age).style(styleHeading);
  worksheet.cell(1,columns.schooledFor).string(text.schooledFor).style(styleHeading);
  worksheet.cell(1,columns.schooledTill).string(text.schooledTill).style(styleHeading);
  worksheet.cell(1,columns.resultPart1).string(`${text.phase1} ${text.results}`);
  worksheet.cell(1,columns.resultPart2UniqueSet).string(`2-${text.uniqueSet}`);
  worksheet.cell(1,columns.resultPart2GroupedSet).string(`2-${text.groupedSet}`);
  worksheet.cell(1,columns.resultPart2AbstractSet).string(`2-${text.abstractSet}`);
  worksheet.cell(1,columns.resultPart3UniqueSet).string(`3-${text.uniqueSet}`);
  worksheet.cell(1,columns.resultPart3GroupedSet).string(`3-${text.groupedSet}`);
  worksheet.cell(1,columns.resultPart3AbstractSet).string(`3-${text.abstractSet}`);
}

function writeResults(worksheet, results){
  let row = 2;
  results.forEach(result=>{
    worksheet.cell(row, columns.id).string(result._id.toString()).style(styleData);
    worksheet.cell(row, columns.gender).string(result.clientInfo.gender).style(styleData);
    worksheet.cell(row, columns.age).number(result.clientInfo.age).style(styleData);
    worksheet.cell(row, columns.schooledFor).number(result.clientInfo.schooledFor).style(styleData);
    worksheet.cell(row, columns.schooledTill).number(result.clientInfo.schooledTill).style(styleData);
    worksheet.cell(row, columns.resultPart1).number(result.phase1.score).style(styleData);
    worksheet.cell(row, columns.resultPart2UniqueSet).number(result.phase2.scores.uniqueScore).style(styleData);
    worksheet.cell(row, columns.resultPart2GroupedSet).number(result.phase2.scores.groupedScore).style(styleData);
    worksheet.cell(row, columns.resultPart2AbstractSet).number(result.phase2.scores.abstractScore).style(styleData);
    console.log(result.phase3);
    if(result.phase3 !== null){
      worksheet.cell(row, columns.resultPart3UniqueSet).number(result.phase3.scores.uniqueScore).style(styleData);
      worksheet.cell(row, columns.resultPart3GroupedSet).number(result.phase3.scores.groupedScore).style(styleData);
      worksheet.cell(row, columns.resultPart3AbstractSet).number(result.phase3.scores.abstractScore).style(styleData);
    }
    row++;
  })
}

module.exports = {makeExcel};
