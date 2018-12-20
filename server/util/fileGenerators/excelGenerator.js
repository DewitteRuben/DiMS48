const excel = require('excel4node');
const ImageData = require('../../data/initial/images/initialImage.repository');
const ImageConstants = require('../../data/initial/images/imageConstants');

const text = {
  worksheetNameResults: 'Resultaten',
  worksheetNameAnswers: 'Antwoorden',
  id: 'id',
  gender: 'geslacht',
  age: 'leeftijd',
  schooledFor: 'geschoold voor',
  schooledTill: 'geschoold tot',
  notes: 'notities',
  results: 'Resultaten',
  answers: 'Antwoorden',
  percentage: '%',
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

const borderStyle = "thick";
const borderColour = "#000000";
const styleBorder = {
  top: {
    border:{
      top:{
        style: borderStyle,
        color: borderColour
      }
    }
  },
  bottom:{
    border:{
      bottom:{
        style: borderStyle,
        color: borderColour
      }
    }
  },
  right:{
    border:{
      right:{
        style: borderStyle,
        color: borderColour
      }
    }
  },
  left:{
    border:{
      left:{
        style: borderStyle,
        color: borderColour
      }
    }
  },
  none:{
    border:{
      left:{
        style: 'none',
        color: borderColour
      },
      right:{
        style: 'none',
        color: borderColour
      },
      top:{
        style: 'none',
        color: borderColour
      },
      bottom:{
        style: 'none',
        color: borderColour
      }
    }
  },
  all:{
    border:{
      top:{
        style: borderStyle,
        color: borderColour
      },
      bottom:{
        style: borderStyle,
        color: borderColour
      },
      left:{
        style: borderStyle,
        color: borderColour
      },
      right:{
        style: borderStyle,
        color: borderColour
      }
    }
  }
}

function makeExcel(result){
  return new Promise((resolve, reject) => {
    try{
      let workbook = new excel.Workbook();
      let worksheetResults = workbook.addWorksheet(text.worksheetNameResults);
      let worksheetAnswers = workbook.addWorksheet(text.worksheetNameAnswers);
      worksheetResults.column(1).setWidth(22);
      worksheetResults.column(2).setWidth(12);
      worksheetResults.column(4).setWidth(14);
      worksheetResults.column(5).setWidth(13);

      const phase3Included = result.phase3 !== null;

      writeClientInfo(worksheetResults, result._id, result.clientInfo);
      writeHeadingResults(worksheetResults, phase3Included);
      writeBordersResults(worksheetResults, phase3Included);
      writeHeadingAnswers(worksheetAnswers, phase3Included);
      writeResultsPhase1(worksheetResults, result.phase1);
      writeAnswers(worksheetAnswers, result.phase1.answers, false, 1);
      writeResultsPhase2(worksheetResults, result.phase2, false);
      writeAnswers(worksheetAnswers, result.phase2.answers, true, 5);
      if(phase3Included){
        writeResultsPhase2(worksheetResults, result.phase3, true);
        writeAnswers(worksheetAnswers, result.phase3.answers, true, 9);
      }

      resolve(workbook);
    }catch(err) {
      reject(err);
    }
  });
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

function writeBordersResults(worksheet, phase3Included){
  setBorders(worksheet, beginRows.phase1Results,1,beginRows.phase1Results+2,2);

  setBorders(worksheet, beginRows.phase2Results,1,beginRows.phase2Results+4,2);
  if(phase3Included){
    setBorders(worksheet, beginRows.phase3Results,1,beginRows.phase3Results+4,2);
  }
}

function setBorders(worksheet, startRow, startCol, endRow, endCol){
  for(let row=startRow;row<=endRow;row++){
    for(let col=startCol;col<=endCol;col++){
      if(row==startRow) worksheet.cell(row,col).style(styleBorder.top);
      if(col==startCol) worksheet.cell(row,col).style(styleBorder.left);
      if(row==endRow) worksheet.cell(row,col).style(styleBorder.bottom);
      if(col==endCol) worksheet.cell(row,col).style(styleBorder.right);
    }
  }
}

function writeHeadingResults(worksheet, phase3Included){
  worksheet.cell(beginRows.results,1).string(text.results).style(styleHeading);

  worksheet.cell(beginRows.phase1Results,1).string(text.phase1).style(styleHeading);
  worksheet.cell(beginRows.phase1Results+1,1).string(`${text.percentage} ${text.right}`).style(styleData);
  worksheet.cell(beginRows.phase1Results+2,1).string(`${text.percentage} ${text.wrong}`).style(styleData);

  worksheet.cell(beginRows.phase2Results,1).string(text.phase2).style(styleHeading);
  worksheet.cell(beginRows.phase2Results,2).string(`${text.percentage} ${text.results}`);
  if(phase3Included) {
    worksheet.cell(beginRows.phase3Results,1).string(text.phase3).style(styleHeading);
    worksheet.cell(beginRows.phase3Results,2).string(`${text.percentage} ${text.results}`);
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
  if(isPhase2)worksheet.cell(beginRow, beginColumn+3).string(text.sort).style(styleHeading);
  let getCorrectAnswer = !isPhase2 ? ImageData.getPhase1Label : ImageData.getPhase2Label;
  let currentRow = beginRow+1;
  answers.forEach(answer=>{
    let index = parseInt(answer._id.substring(1));
    worksheet.cell(currentRow, beginColumn).number(index).style(styleData);
    worksheet.cell(currentRow, beginColumn+1).string(answer.answer).style(styleData);
    worksheet.cell(currentRow, beginColumn+2).string(getCorrectAnswer(index)).style(styleData);
    if(isPhase2)worksheet.cell(currentRow, beginColumn+3).string(ImageData.getPhase2Label(index));
    currentRow++;
  })
}

function writeResultsPhase2(worksheet, answers, isPart2){
  let sortDistribution = ImageData.getAmountOfAnswersPhase2();
  let amountOfImages = ImageConstants.AMOUNT_IMAGES/2;
  let startRow = beginRows.phase2Results+1;
  if(isPart2) startRow = beginRows.phase3Results+1;
  worksheet.cell(startRow,1).string(`${text.uniqueSet} (${Math.floor(ImageData.getDistributionSets().unique*100)}%)`).style(styleHeading);
  worksheet.cell(startRow,2).number(answers.scores.uniqueScore).style(styleData);
  worksheet.cell(startRow+1,1).string(`${text.groupedSet} (${Math.floor(ImageData.getDistributionSets().group*100)}%)`).style(styleHeading);
  worksheet.cell(startRow+1,2).number(answers.scores.groupedScore).style(styleData);
  worksheet.cell(startRow+2,1).string(`${text.abstractSet} (${Math.floor(ImageData.getDistributionSets().abstract*100)}%)`).style(styleHeading);
  worksheet.cell(startRow+2,2).number(answers.scores.abstractScore).style(styleData);
  worksheet.cell(startRow+3,1).string(`${text.total} (100%)`).style(styleHeading);
  let totalScore = answers.scores.uniqueScore + answers.scores.groupedScore + answers.scores.abstractScore;
  worksheet.cell(startRow+3,2).number(totalScore).style(styleData);
}

module.exports = {
  makeExcel
}
