import View from "./view.js";


export default class FileEnginer {
    constructor() {
        this.view = new View();
    }
    saveJson() {
        let website = JSON.parse(localStorage.getItem("sites")) || [];
        const file = new Blob([JSON.stringify(website, null, 2)], { type: "application/json" });
        saveAs(file, "website.json");
        console.log("Successfully saved JSON to file");
    }

    uploadJson(structure) {
        localStorage.setItem("sites", JSON.stringify(structure));
        console.log("Successfully uploaded JSON");
        this.view.setView();
    }

}
