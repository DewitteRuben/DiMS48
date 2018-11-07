export default {
    namespaced: true,
    state: {
        images: [
            {
                id: "A1",
                imageUrl: "https://www.w3schools.com/w3css/img_lights.jpg",
            },
            {
                id: "A2",
                imageUrl: "https://openclipart.org/download/216413/coniglio_rabbit_small.svg",
            }
        ],
        currentImageIndex: 0,
        options: {
            phase1: [
                {
                    btnText: '2 or less',
                    btnValue: '<=2'
                },
                {
                    btnText: '3 or more',
                    btnValue: '>=3'
                }
            ],
            phase2: [
                {
                    btnText: 'Left',
                    btnValue: 'L'
                },
                {
                    btnText: 'Right',
                    btnValue: 'R'
                },
            ],
        }
    },
    getters: {
        getCurrentImage: state => {
            return state.images[state.currentImageIndex];
        },
        getCurrentOptions: (state, getters, rootState) => {
            return state.options[rootState.dimsManager.currentPhase];
        },
    },
    mutations: {
        resetState: state => {
            state.currentImageIndex = 0;
        }
    },
    actions: {
        getNextImage: ({ commit, state }, newValue) => {
            if (state.currentImageIndex + 1 < state.images.length) {
                state.currentImageIndex++;
            } else {
                commit('resetState');
                commit('dimsManager/endPhase', null, { root: true });
            }
        }
    }
}