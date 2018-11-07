export default {
    namespaced: true,
    state: {
        answers: [],
    },
    getters: {

    },
    mutations: {
        setAnswer(state, answer) {
            state.answers.push(answer);
        }
    },
    actions: {
    }
}