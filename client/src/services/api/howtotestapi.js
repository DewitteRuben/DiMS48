const baseURL = "https://how-to-test-apps.herokuapp.com/api/";

export default {
    async getDims48() {
        const res = await fetch(baseURL + "test/dims48/initial");
        return res.json();
    },

    async getCategories() {
        const res = await fetch(baseURL + "categories");
        return res.json();
    }
}

// export default {
//     async getCategories() {
//         const res = await fetch(baseURL + "/api/categories");
//         return res.json();
//     }
// }
