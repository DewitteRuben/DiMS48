const initialImageRepository = require('../data/initialDiMS48/images/initialImage.repository');
const Image = initialImageRepository.getDatabaseModel();

const seed = function seed(){
    const imagesPhase1 = initialImageRepository.getImagesPhase1();
    const imagesPhase2 = initialImageRepository.getImagesPhase2();

    imagesPhase1.forEach(image => image.save());
    imagesPhase2.forEach(image => image.save());
};

const isDatabaseSeeded = function isDatabaseSeeded() {
    return new Promise((resolve, reject) => {
        const imageQuery = Image.find();

        imageQuery.exec((err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data.length !== 0);
            }
        });
    });
};

module.exports = {
    seed,
    isDatabaseSeeded
};
