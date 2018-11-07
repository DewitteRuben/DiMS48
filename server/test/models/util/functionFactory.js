const createBeforeEach = function createBeforeEach(Model) {
    return (
        async () => {
            await Model.remove({});
        }
    );
};

const createAfterEach = function createAfterEach(Model) {
    return (
        async () => {
            await Model.remove({});
        }
    );
};

module.exports = {
    createBeforeEach,
    createAfterEach,
};
