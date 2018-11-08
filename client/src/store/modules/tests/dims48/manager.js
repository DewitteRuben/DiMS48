export default {
    namespaced: true,
    state: {
        version: "dims48a",
        currentPhase: "phase1",
        double: false,
        started: false,
        loaded: false,
        finished: false,
    },
    getters: {

    },
    mutations: {
        startPhase: state => {
            if (state.version === "dims48b")
                state.double = true;

            if (state.currentPhase === "end")
                state.finished = true;
            else
                state.started = true;
        },
        endPhase: state => {
            switch (state.currentPhase) {
                case "phase1":
                    if (state.version === "dims48a") {
                        state.currentPhase = "phase2";
                        state.double = true;
                    } if (state.version === "dims48b") {
                        state.currentPhase = "end";
                    }
                    break;
                case "phase2":
                    state.currentPhase = "end";
                    break;
            }
            state.started = false;
        },
        setLoaded: state => {
            state.loaded = true;
        },
    },
    actions: {
    }
}