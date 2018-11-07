export default {
    namespaced: true,
    state: {
        currentPhase: "phase1",
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
            switch (state.currentPhase) {
                case "phase1":
                    state.currentPhase = "phase2";
                    break;
            }
            state.started = false;
        },
    },
    actions: {
    }
}