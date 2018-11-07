let Image = require('../models/defaultModels.js').Image;

let src = './assets/images'; // TODO: Change to right dir
let amountOfImages = 48;

const SET_KINDS = {
    "Abstract": "A",
    "Unique": "U",
    "Group" : "G"
};

function getImages() {
    let imagesArr = [];

    for (let i = 1; i <= amountOfImages; i++) {
        let idA = `A${i}`;
        let idB = `B${i}`;
        let localSrc = `set${i}`;

        let amountColours = getAmountOfColours(i);
        let set = getSetKind(i);
        imagesArr.push(makeImage(localSrc, idA, amountColours));
        imagesArr.push(makeImage(localSrc, idB, set));
    }
    return imagesArr;
}

function makeImage(localSrc, id, extra) {
    return new Image({
        _id: id,
        imgUrl: `${src}/${localSrc}/${id}.jpg`,
        extra: extra
    })
}

let amountOfColours = {
    1: '>=3',
    2: '>=3',
    3: '>=3',
    4: '<=2',
    5: '>=3',
    6: '>=3',
    7: '>=3',
    8: '<=2',
    9: '<=2',
    10: '>=3',
    11: '>=3',
    12: '>=3',
    13: '>=3',
    14: '<=2',
    15: '<=2',
    16: '<=2',
    17: '>=3',
    18: '>=3',
    19: '<=2',
    20: '>=3',
    21: '>=3',
    22: '<=2',
    23: '<=2',
    24: '>=3',
    25: '>=3',
    26: '>=3',
    27: '<=2',
    28: '>=3',
    29: '>=3',
    30: '<=2',
    31: '>=3',
    32: '<=2',
    33: '>=3',
    34: '>=3',
    35: '<=2',
    36: '>=3',
    37: '<=2',
    38: '<=2',
    39: '<=2',
    40: '>=3',
    41: '>=3',
    42: '<=2',
    43: '<=2',
    44: '<=2',
    45: '<=2',
    46: '>=3',
    47: '>=3',
    48: '>=3'
}

function getAmountOfColours(index) {
    return amountOfColours[index];
}

let setKind = {
    1: 'G',
    2: 'A',
    3: 'G',
    4: 'G',
    5: 'U',
    6: 'G',
    7: 'A',
    8: 'U',
    9: 'A',
    10: 'G',
    11: 'U',
    12: 'A',
    13: 'G',
    14: 'A',
    15: 'U',
    16: 'U',
    17: 'A',
    18: 'U',
    19: 'A',
    20: 'G',
    21: 'U',
    22: 'G',
    23: 'A',
    24: 'G',
    25: 'A',
    26: 'G',
    27: 'A',
    28: 'G',
    29: 'G',
    30: 'U',
    31: 'U',
    32: 'G',
    33: 'A',
    34: 'G',
    35: 'U',
    36: 'A',
    37: 'A',
    38: 'U',
    39: 'A',
    40: 'U',
    41: 'U',
    42: 'U',
    43: 'G',
    44: 'A',
    45: 'G',
    46: 'U',
    47: 'U',
    48: 'G'
}

function getSetKind(index) {
    return setKind[index];
}

function getMaxAmountCorrectAnswers() {
    let amountAnswers = {abstract: 0, group: 0, unique: 0};

    Object.values(setKind).forEach(sort => {
        switch (sort) {
            case SET_KINDS.Abstract:
                amountAnswers.abstract++;
                break;
            case SET_KINDS.Group:
                amountAnswers.group++;
                break;
            case SET_KINDS.Unique:
                amountAnswers.unique++;
        }
    });

    return amountAnswers;
}

module.exports = {
    getImages,
    amountOfImages: amountOfImages * 2,
    getSetKind,
    getAmountOfColours,
    getMaxAmountCorrectAnswers,
    amountOfColours,
    set: setKind,
    SET_KINDS
};
