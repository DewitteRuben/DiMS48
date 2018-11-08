export default {
    namespaced: true,
    state: {
        images: null,
        filteredImages: [],
        currentImageIndex: 0,
        options: {
            phase1: [
                {
                    btnText: '2 of minder kleuren',
                    btnValue: '<=2'
                },
                {
                    btnText: '3 of meer kleuren',
                    btnValue: '>=3'
                }
            ],
            phase2: [
                {
                    btnText: 'Links',
                    btnValue: 'L'
                },
                {
                    btnText: 'Rechts',
                    btnValue: 'R'
                },
            ],
        }
    },
    getters: {
        getCurrentImage: (state, getters, rootState) => {
            const double = rootState.dimsManager.double;
            const singleImages = state.images.filter(e => e._id.includes("A"));
            const doubleImages = state.images.filter(e => e._id.includes(state.currentImageIndex + 1));
            return double ? doubleImages : singleImages;
        },
        getCurrentOptions: (state, getters, rootState) => {
            return state.options[rootState.dimsManager.currentPhase];
        },
        isLoaded: state => {
            return state.images !== null;
        }
    },
    mutations: {
        resetState: state => {
            state.currentImageIndex = 0;
        },
        updateImages: (state, images) => {
            state.images = images;
        }
    },
    actions: {
        getNextImage: ({ commit, state, rootState }, newValue) => {
            const double = rootState.dimsManager.double;
            const singleImages = state.images.filter(e => e._id.includes("A"));
            const doubleImages = state.images.filter(e => e._id.includes(state.currentImageIndex + 1));
            const images = double ? doubleImages : singleImages;

            if (state.currentImageIndex + 1 < images.length && images.length > 0) {
                state.currentImageIndex++;
            } else {
                commit('resetState');
                commit('dimsManager/endPhase', null, { root: true });
            }

        },
        fetchImages: ({ commit }) => {
            fetch("/api/dims48Begin")
                .then(e => e.json())
                .then(e => {
                    console.log(e);
                    commit("updateImages", e.images)
                })
                .catch(e => console.error(e));
        },
    }
}
