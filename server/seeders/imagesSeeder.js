const initialImageRepository = require('../data/initial/images/intialImage.repository');
const Image = initialImageRepository.getDatabaseModel();

const seed = function seed(){
    const images = initialImageRepository.getImages();
    images.forEach(image => image.save());
};

const isDatabaseSeeded = function isDatabaseSeeded() {
    return new Promise((resolve, reject) => {
        const imageQuery = Image.find();

        imageQuery.exec((err, data) => {
            resolve(data.length !== 0);
        });
    });
};

module.exports = {
    seed,
    isDatabaseSeeded
};
