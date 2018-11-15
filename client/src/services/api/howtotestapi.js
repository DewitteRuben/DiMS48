const baseURL = "https://how-to-test-apps.herokuapp.com";

export default {
    async getDims48() {
        const res = await fetch(baseURL + "/api/dims48Begin");
        return res.json();
    }
}

// export default {
//     async getCategories() {
//         const res = await fetch(baseURL + "/api/categories");
//         return res.json();
//     }
// }
