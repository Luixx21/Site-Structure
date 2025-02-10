import View from "./view.js";
import FileEnginer from "./json.js";


export default class Events {
    constructor() {
        this.view = new View();
        
        this.fileEnginer = new FileEnginer();
    }
    addEvents() {
        // Eventos do DOM
        document.addEventListener("DOMContentLoaded", () => {
            this.view.setView();
            this.view.setSelectSite();
        });

        document.getElementById("site-select").addEventListener("change", () => {
            let sites = JSON.parse(localStorage.getItem("sites")) || [];
            let selectSite = document.getElementById("site-select").value;
            let selectPage = document.getElementById("page-select");

            selectPage.innerHTML = "<option value=''>Select page</option>";

            let selectedSite = sites.find(site => site.value === selectSite);
            if (selectedSite) {
                selectedSite.pages.forEach(page => {
                    let option = document.createElement("option");
                    option.value = page.value;
                    option.textContent = page.value;
                    selectPage.appendChild(option);
                });
            };
        });

        // Adicionar estrutura JSON
        document.getElementById("add-structure").addEventListener("click", () => {
            try {
                let structure = JSON.parse(document.getElementById("structure-textarea").value);
                this.fileEnginer.uploadJson(structure);
            } catch (e) {
                console.error("Erro ao carregar JSON:", e);
            }
        });

        // Salvar JSON
        document.getElementById("save").addEventListener("click", this.fileEnginer.saveJson);

        // Adicionar Site
        document.getElementById("add-site").addEventListener("click", () => {
            let sites = JSON.parse(localStorage.getItem("sites")) || [];
            let siteInput = document.getElementById("site-input").value.trim().toUpperCase();

            if (siteInput !== '') {
                if (!sites.some(site => site.value === siteInput)) {
                    sites.push({ value: siteInput, pages: [] });
                    localStorage.setItem("sites", JSON.stringify(sites));
                    this.view.setSelectSite();
                    this.view.setView();
                } else {
                    console.log("Site já existe.");
                }
            }
        });

        // Remover Site
        document.getElementById("remove-site").addEventListener("click", () => {
            let sites = JSON.parse(localStorage.getItem("sites")) || [];
            let siteInput = document.getElementById("site-select").value;

            sites = sites.filter(site => site.value !== siteInput);
            localStorage.setItem("sites", JSON.stringify(sites));

            this.view.setSelectSite();
            this.view.setSelectPage();
            this.view.setView();
        });

        // Adicionar Página
        document.getElementById("add-page").addEventListener("click", () => {
            let sites = JSON.parse(localStorage.getItem("sites")) || [];
            let pageInput = document.getElementById("page-input").value.trim().toUpperCase();
            let selectedSiteValue = document.getElementById("site-select").value;

            let selectedSite = sites.find(site => site.value === selectedSiteValue);

            if (selectedSite && pageInput !== '') {
                if (!selectedSite.pages.some(page => page.value === pageInput)) {
                    selectedSite.pages.push({ value: pageInput, functions: [] });
                    localStorage.setItem("sites", JSON.stringify(sites));
                    this.view.setSelectPage();
                    this.view.setView();
                } else {
                    console.log("Página já existe.");
                }
            }
        });

        // Remover Página
        document.getElementById("remove-page").addEventListener("click", () => {
            let sites = JSON.parse(localStorage.getItem("sites")) || [];
            let selectedSiteValue = document.getElementById("site-select").value;
            let pageInput = document.getElementById("page-select").value;

            let selectedSite = sites.find(site => site.value === selectedSiteValue);

            if (selectedSite) {
                selectedSite.pages = selectedSite.pages.filter(page => page.value !== pageInput);
                localStorage.setItem("sites", JSON.stringify(sites));
                this.view.setSelectPage();
                this.view.setView();
            }
        });

        // Adicionar Função
        document.getElementById("add-funct").addEventListener("click", () => {
            let sites = JSON.parse(localStorage.getItem("sites")) || [];
            let functInput = document.getElementById("funct-input").value.trim().toUpperCase();
            let selectedSiteValue = document.getElementById("site-select").value;
            let selectedPageValue = document.getElementById("page-select").value;

            let selectedSite = sites.find(site => site.value === selectedSiteValue);
            if (selectedSite) {
                let selectedPage = selectedSite.pages.find(page => page.value === selectedPageValue);
                if (selectedPage && functInput !== '') {
                    selectedPage.functions.push(functInput);
                    localStorage.setItem("sites", JSON.stringify(sites));
                    this.view.setView();
                }
            }
        });

        // Remover Função
        document.getElementById("remove-funct").addEventListener("click", () => {
            let sites = JSON.parse(localStorage.getItem("sites")) || [];
            let selectedSiteValue = document.getElementById("site-select").value;
            let selectedPageValue = document.getElementById("page-select").value;

            let selectedSite = sites.find(site => site.value === selectedSiteValue);
            if (selectedSite) {
                let selectedPage = selectedSite.pages.find(page => page.value === selectedPageValue);
                if (selectedPage && selectedPage.functions.length > 0) {
                    selectedPage.functions.pop();
                    localStorage.setItem("sites", JSON.stringify(sites));
                    this.view.setView();
                }
            }
        });
    }
}
