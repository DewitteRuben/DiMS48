const initialImageRepository = require('../data/initial/images/initialImage.repository');
const Image = initialImageRepository.getDatabaseModel();

const seed = function seed(){
    const images = initialImageRepository.getImages();
    images.forEach(image => image.save());
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
