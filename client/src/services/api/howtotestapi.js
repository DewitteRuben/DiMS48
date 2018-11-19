const baseURL = "https://how-to-test-apps.herokuapp.com/api/";

export default {
    async getDims48() {
        const res = await fetch(baseURL + "test/dims48/initial");
        return res.json();
    },

    async getCategories() {
        const res = await fetch(baseURL + "categories");
        return res.json();
    },

    async getTestDetails(name) {
        const res = await fetch(baseURL + "detail/" + name);
        return res.json();
    }
}