export default {
    namespaced: true,
    state: {
        data: [
            {
                "id": "phase1",
                "instructions": [
                    {
                        "title": "Testleider",
                        "message": "Fase 1 instructies voor de testleider",
                        "target": "leader"
                    },
                    {
                        "title": "Testnemer",
                        "message": "Fase 1 instructies voor de testnemer",
                        "target": "client"
                    }
                ],
            },
            {
                "id": "phase2",
                "instructions": [
                    {
                        "title": "Testleider",
                        "message": "Fase 2 instructies voor de testleider",
                        "target": "leader"
                    },
                    {
                        "title": "Testnemer",
                        "message": "Fase 2 instructies voor de testnemer",
                        "target": "client"
                    }
                ],
            },
        ],
        currentInstruction: 0,
        lastInstruction: false,
        buttonText: "Volgende",
    },
    getters: {
        getCurrentInstruction: (state, getters, rootState) => {
            const instructions = state.data.filter(e => e.id === rootState.dimsManager.currentPhase)[0].instructions;
            return instructions[state.currentInstruction];
        },
    },
    actions: {
        getNextInstruction: ({ commit, state, rootState }, newValue) => {
            const instructions = state.data.filter(e => e.id === rootState.dimsManager.currentPhase)[0].instructions;
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