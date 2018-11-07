export default {
    namespaced: true,
    state: {
        currentPhase: 1,
        showingInstructions: true,
        started: false,
        done: false,
    },
    getters: {

    },
    mutations: {
        startTest: state => {
            state.started = true;
        },
        endPhase: state => {
            state.currentPhase++;
            state.started = false;
        },
    },
    actions: {
    }
}