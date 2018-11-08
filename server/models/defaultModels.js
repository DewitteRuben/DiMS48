const Image = require('./defaultModels/image.server.model');

const ClientInfo = require('./defaultModels/client.info.server.model');

const Answer = require('./defaultModels/answer.server.model');

const Test = require('./defaultModels/test.server.model');

module.exports = {
    Image: Image.model,
    ImageSchema: Image.schema,

    ClientInfo: ClientInfo.model,
    ClientInfoSchema: ClientInfo.schema,

    Answer: Answer.model,
    AnswerSchema: Answer.schema,

    Test: Test.model,
    TestSchema: Test.schema,
};
