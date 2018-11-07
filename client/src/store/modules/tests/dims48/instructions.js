export default {
    namespaced: true,
    state: {
        data: [
            {
                "id": "phase1",
                "instructions": [
                    {
                        "title": "Testleider",
                        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
                            + "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            + "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
                            + "ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in "
                            + "voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
                            + "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia"
                            + "deserunt mollit anim id est laborum.",
                        "target": "leader"
                    },
                    {
                        "title": "Testnemer",
                        "message": "esrigtithequhgiuhesughrehighesrighifdhighifsdhighdsfhghsdfghsh.",
                        "target": "client"
                    }
                ],
            },
            {
                "id": "phase2",
                "instructions": [
                    {
                        "title": "Testleider",
                        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
                            + "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            + "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
                            + "ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in "
                            + "voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
                            + "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia"
                            + "deserunt mollit anim id est laborum.",
                        "target": "leader"
                    },
                    {
                        "title": "Testnemer",
                        "message": "esrigtithequhgiuhesughrehighesrighifdhighifsdhighdsfhghsdfghsh.",
                        "target": "client"
                    }
                ],
            },
        ],
        currentPhase: "phase1",
        currentInstruction: 0,
        lastInstruction: false,
        buttonText: "Volgende",
    },
    getters: {
        getCurrentInstruction: state => {
            const instructions = state.data.filter(e => e.id === state.currentPhase)[0].instructions;
            return instructions[state.currentInstruction];
        },
    },
    actions: {
        getNextInstruction: ({ commit, state }, newValue) => {
            const instructions = state.data.filter(e => e.id === state.currentPhase)[0].instructions;
            if (state.currentInstruction + 1 < instructions.length) {
                state.currentInstruction++;
            } else {
                commit('resetState');
                commit('dimsManager/startTest', null, { root: true })
            }
        }
    },
    mutations: {
        resetState: state => {
            state.currentInstruction = 0;
        }
    },
}