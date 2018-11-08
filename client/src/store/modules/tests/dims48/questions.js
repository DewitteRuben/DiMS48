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
                imageUrl: "https://www.w3schools.com/w3css/img_lights.jpg",
            },
            {
                id: "B1",
                imageUrl: "https://openclipart.org/download/216413/coniglio_rabbit_small.svg",
            },
            {
                id: "B2",
                imageUrl: "https://openclipart.org/download/216413/coniglio_rabbit_small.svg",
            }
        ],
        filteredImages: [],
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
        getCurrentImage: (state, getters, rootState) => {
            const double = rootState.dimsManager.double;
            const singleImages = state.images.filter(e => e.id.includes("A"));
            const doubleImages = state.images.filter(e => e.id.includes(state.currentImageIndex + 1));
            return double ? doubleImages : singleImages;
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
        getNextImage: ({ commit, state, rootState }, newValue) => {
            const double = rootState.dimsManager.double;
            const singleImages = state.images.filter(e => e.id.includes("A"));
            const doubleImages = state.images.filter(e => e.id.includes(state.currentImageIndex + 1));
            const images = double ? doubleImages : singleImages;

            if (state.currentImageIndex + 1 < images.length && images.length > 0) {
                state.currentImageIndex++;
            } else {
                commit('resetState');
                commit('dimsManager/endPhase', null, { root: true });
            }

        }
    }
}