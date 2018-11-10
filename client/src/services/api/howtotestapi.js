const baseURL = "https://how-to-test-apps.herokuapp.com";

export default {
    async getDims48() {
        const res = await fetch(baseURL + "/api/dims48Begin");
        return res.json();
    }
}