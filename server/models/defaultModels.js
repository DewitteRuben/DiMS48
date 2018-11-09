const Image = require('./defaultModels/image.server.model');
const ClientInfo = require('./defaultModels/client.info.server.model');
const Answer = require('./defaultModels/answer.server.model');
const PhaseTest = require('./defaultModels/phase.test.server.model');
const Test = require('./defaultModels/test.server.model');
const Option = require('./defaultModels/option.server.model');

module.exports = {
    Image: Image.model,
    ImageSchema: Image.schema,

    ClientInfo: ClientInfo.model,
    ClientInfoSchema: ClientInfo.schema,

    Answer: Answer.model,
    AnswerSchema: Answer.schema,

    PhaseTest: PhaseTest.model,
    PhaseTestSchema: PhaseTest.schema,

    Test: Test.model,
    TestSchema: Test.schema,

    Option: Option.model,
    OptionSchema: Option.schema,
};
