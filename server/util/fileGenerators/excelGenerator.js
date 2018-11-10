const excel = require('excel4node');
const ImageData = require('../../seeders/imagesSeeder');

const text = {
  worksheetNameResults: 'Resultaten',
  worksheetNameAnswers: 'Antwoorden',
  id: 'id',
  gender: 'geslacht',
  age: 'leeftijd',
  schooledFor: 'geschoold voor',
  schooledTill: 'geschoold tot',
  notes: 'notities',
  results: 'Resultaten (in %)',
  answers: 'Antwoorden',
  phase1: 'Fase 1',
  phase2: 'Fase 2',
  phase3: 'Fase 3',
  right: 'goed',
  wrong: 'fout',
  sort: 'soort set',
  uniqueSet: 'unieke set',
  groupedSet: 'gepaarde set',
  abstractSet: 'abstracte set',
  distribution: 'verdeling sets',
  total: 'totaal',
  index: 'nr.',
  answer: 'antwoord',
  correctAnswer: 'juist antwoord'
}

const beginRows = {
  clientInfo: 1,
  results: 4,
  phase1Results: 5,
  phase2Results: 9,
  phase3Results: 15,
  answersHeading: 1,
  phaseAnswers: 3
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

function makeExcel(result){
  let workbook = new excel.Workbook();
  let worksheetResults = workbook.addWorksheet(text.worksheetNameResults);
  let worksheetAnswers = workbook.addWorksheet(text.worksheetNameAnswers);
  worksheetResults.column(1).setWidth(22);
  worksheetResults.column(4).setWidth(14);
  worksheetResults.column(5).setWidth(13);

  const phase3Included = result.answersPhase3.answers.length > 0;

  writeClientInfo(worksheetResults, result._id, result.clientInfo);
  writeHeadingResults(worksheetResults, phase3Included);
  writeHeadingAnswers(worksheetAnswers, phase3Included);
  writeResultsPhase1(worksheetResults, result.answersPhase1);
  writeAnswers(worksheetAnswers, result.answersPhase1.answers, false, 1);
  writeResultsPhase2(worksheetResults, result.answersPhase2, false);
  writeAnswers(worksheetAnswers, result.answersPhase2.answers, true, 5);
  if(phase3Included){
    writeResultsPhase2(worksheetResults, result.answersPhase3, true);
    writeAnswers(worksheetAnswers, result.answersPhase3.answers, true, 9);
  }

  //workbook.write('result.xlsx');
  return workbook;
}

function writeClientInfo(worksheet, _id, clientInfo){
  worksheet.cell(beginRows.clientInfo,1).string(text.id).style(styleHeading);
  worksheet.cell(beginRows.clientInfo+1,1).string(_id.toString()).style(styleData);
  worksheet.cell(beginRows.clientInfo,2).string(text.gender).style(styleHeading);
  worksheet.cell(beginRows.clientInfo+1,2).string(clientInfo.gender).style(styleData);
  worksheet.cell(beginRows.clientInfo,3).string(text.age).style(styleHeading);
  worksheet.cell(beginRows.clientInfo+1,3).number(clientInfo.age).style(styleData);
  worksheet.cell(beginRows.clientInfo,4).string(text.schooledFor).style(styleHeading);
  worksheet.cell(beginRows.clientInfo+1,4).number(clientInfo.schooledFor).style(styleData);
  worksheet.cell(beginRows.clientInfo,5).string(text.schooledTill).style(styleHeading);
  worksheet.cell(beginRows.clientInfo+1,5).number(clientInfo.schooledTill).style(styleData);
  worksheet.cell(beginRows.clientInfo,6).string(text.notes).style(styleHeading);
  worksheet.cell(beginRows.clientInfo+1,6, beginRows.clientInfo+4, 10, true).string(clientInfo.notes);
}

function writeHeadingResults(worksheet, phase3Included){
  worksheet.cell(beginRows.results,1).string(text.results).style(styleHeading);

  worksheet.cell(beginRows.phase1Results,1).string(text.phase1).style(styleHeading);
  worksheet.cell(beginRows.phase1Results+1,1).string(text.right).style(styleData);
  worksheet.cell(beginRows.phase1Results+2,1).string(text.wrong).style(styleData);

  worksheet.cell(beginRows.phase2Results,1).string(text.phase2).style(styleHeading);
  worksheet.cell(beginRows.phase2Results+1,1).string(text.sort).style(styleHeading);
  worksheet.cell(beginRows.phase2Results+1,2).string(text.right).style(styleHeading);
  worksheet.cell(beginRows.phase2Results+1,3).string(text.distribution).style(styleHeading);
  if(phase3Included) {
    worksheet.cell(beginRows.phase3Results,1).string(text.phase3).style(styleHeading);
    worksheet.cell(beginRows.phase3Results+1,1).string(text.sort).style(styleHeading);
    worksheet.cell(beginRows.phase3Results+1,2).string(text.right).style(styleHeading);
    worksheet.cell(beginRows.phase3Results+1,3).string(text.distribution).style(styleHeading);
  }
}

function writeHeadingAnswers(worksheet, phase3Included){
  worksheet.cell(beginRows.answersHeading,1).string(text.answers).style(styleHeading);
  worksheet.cell(beginRows.answersHeading+1,1).string(text.phase1).style(styleHeading);
  worksheet.cell(beginRows.answersHeading+1,5).string(text.phase2).style(styleHeading);
  if(phase3Included) worksheet.cell(beginRows.answersHeading+1,9).string(text.phase3).style(styleHeading);
}

function writeResultsPhase1(worksheet, answers){
  worksheet.cell(beginRows.phase1Results+1,2).number(answers.score).style(styleData);
  worksheet.cell(beginRows.phase1Results+2,2).number(100-answers.score).style(styleData);
}

function writeAnswers(worksheet, answers, isPhase2, beginColumn){
  let beginRow = beginRows.phaseAnswers;
  worksheet.cell(beginRow, beginColumn).string(text.index).style(styleHeading);
  worksheet.cell(beginRow, beginColumn+1).string(text.answer).style(styleHeading);
  worksheet.cell(beginRow, beginColumn+2).string(text.correctAnswer).style(styleHeading);
  let getCorrectAnswer = isPhase2 ? ImageData.getAmountOfColours : ImageData.getSetKind;
  let currentRow = beginRow+1;
  answers.forEach(answer=>{
    let index = parseInt(answer._id.substring(1));
    worksheet.cell(currentRow, beginColumn).number(index).style(styleData);
    worksheet.cell(currentRow, beginColumn+1).string(answer.answer).style(styleData);
    worksheet.cell(currentRow, beginColumn+2)
      .string(getCorrectAnswer(index)).style(styleData);
    currentRow++;
  })
}

function writeResultsPhase2(worksheet, answers, isPart2){
  let sortDistribution = ImageData.getMaxAmountCorrectAnswersPhase2();
  let amountOfImages = ImageData.amountOfImages/2;
  let startRow = beginRows.phase2Results+1;
  if(isPart2) startRow = beginRows.phase3Results+1;
  worksheet.cell(startRow,1).string(text.uniqueSet).style(styleHeading);
  worksheet.cell(startRow,2).number(answers.scores.uniqueScore).style(styleData);
  worksheet.cell(startRow,3).number(sortDistribution.unique/amountOfImages*100).style(styleData);
  worksheet.cell(startRow+1,1).string(text.groupedSet).style(styleHeading);
  worksheet.cell(startRow+1,2).number(answers.scores.groupedScore).style(styleData);
  worksheet.cell(startRow+1,3).number(sortDistribution.group/amountOfImages*100).style(styleData);
  worksheet.cell(startRow+2,1).string(text.abstractSet).style(styleHeading);
  worksheet.cell(startRow+2,2).number(answers.scores.abstractScore).style(styleData);
  worksheet.cell(startRow+2,3).number(sortDistribution.abstract/amountOfImages*100).style(styleData);
  worksheet.cell(startRow+3,1).string(text.total).style(styleHeading);
  let totalScore = answers.scores.uniqueScore + answers.scores.groupedScore + answers.scores.abstractScore;
  let totalDistribution = (sortDistribution.unique + sortDistribution.group + sortDistribution.abstract) / amountOfImages * 100;
  worksheet.cell(startRow+3,2).number(totalScore).style(styleData);
  worksheet.cell(startRow+3,3).number(totalDistribution).style(styleData);
}

module.exports = {
  makeExcel
}
