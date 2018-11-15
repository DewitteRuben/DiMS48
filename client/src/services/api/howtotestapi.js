const baseURL = "http://172.31.15.84:3000/api/";

export default {
    async getDims48() {
        const res = await fetch(baseURL + "test/dims48/initial");
        return res.json();
    }
}

// export default {
//     async getCategories() {
//         const res = await fetch(baseURL + "/api/categories");
//         return res.json();
//     }
// }
