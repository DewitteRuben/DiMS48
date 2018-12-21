const compareImage = function compareImage(img1, img2) {
    const img1Id = parseInt(img1._id.substring(1));
    const img2Id = parseInt(img2._id.substring(1));

    if (img1Id < img2Id) {
        return -1;
    }
    if (img1Id > img2Id) {
        return 1;
    }
    return 0;
};

module.exports = {
    compareImage
};