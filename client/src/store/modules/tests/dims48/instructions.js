export default {
    namespaced: true,
    state: {
        instructions: [
            {
                "id": 0,
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
                "id": 1,
                "title": "Testnemer",
                "message": "esrigtithequhgiuhesughrehighesrighifdhighifsdhighdsfhghsdfghsh.",
                "target": "client"
            }
        ],
        currentInstruction: 0,
        buttonText: "Volgende",
    },
    getters: {
        getCurrentInstruction: state => {
            return state.instructions[state.currentInstruction];
        }
    },
    mutations: {
        getNextInstruction(state, n) {
            if (state.currentInstruction + 1 < state.instructions.length) {
                state.currentInstruction++;
            }
        },
    },
    actions: {
    }
}