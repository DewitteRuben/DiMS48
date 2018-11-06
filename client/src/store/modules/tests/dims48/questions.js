export default {
    namespaced: true,
    state: {
        images: [
            {
                id: "A1",
                imageUrl: "/test.png"
            },
        ],
        options: {
            phase1Options: [
                {
                    btnText: '2 kleuren of minder',
                    btnValue: '<=2',
                },
                {
                    btnText: '3 kleuren of meer',
                    btnValue: '>=3',
                },

            ],
            phase2Options: [
                {
                    btnText: 'Links',
                    btnValue: 'L',
                },
                {
                    btnText: 'Rechts',
                    btnValue: 'R',
                },
            ],
        }
    },
    mutations: {
    },
    actions: {
    }
}