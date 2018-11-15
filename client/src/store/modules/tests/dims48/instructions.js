export default {
    namespaced: true,
    state: {
        instructions: null,
        currentInstruction: 0,
        buttonText: "Volgende",
    },
    getters: {
        getCurrentInstruction: (state, getters, rootState) => {
            const instructions = state.instructions.filter(e => e._id === rootState.dimsManager.currentPhase)[0].instructions;
            return instructions[state.currentInstruction];
        },
    },
    actions: {
        getNextInstruction: ({ commit, state, rootState }, newValue) => {
            const instructions = state.instructions.filter(e => e._id === rootState.dimsManager.currentPhase)[0].instructions;
            if (state.currentInstruction + 1 < instructions.length) {
                state.currentInstruction++;
            } else {
                commit('resetState');
                commit('dimsManager/startPhase', null, { root: true })
            }
        }
    },
    mutations: {
        resetState: state => {
            state.currentInstruction = 0;
        },
        updateInstructions: (state, instructions) => {
            state.instructions = instructions;
        }
    },
}