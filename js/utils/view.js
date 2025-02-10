export default class View {
    setView() {
        let sites = JSON.parse(localStorage.getItem("sites")) || [];
        let container = document.getElementById("view");
        container.innerHTML = ''; // Limpar conteúdo anterior

        sites.forEach(site => {
            let siteDiv = document.createElement("div");
            siteDiv.classList.add("site");
            siteDiv.innerHTML = `<h3>${site.value}</h3>`;

            let pagesContainer = document.createElement("div");
            pagesContainer.classList.add("pages");

            site.pages.forEach(page => {
                let pageDiv = document.createElement("div");
                pageDiv.classList.add("page");
                pageDiv.innerHTML = `<strong>${page.value}</strong><ol id="list-${page.value}"></ol>`;

                let ol = pageDiv.querySelector(`#list-${page.value}`);
                page.functions.forEach(funct => {
                    let li = document.createElement("li");
                    li.textContent = funct;
                    ol.appendChild(li);
                });

                pagesContainer.appendChild(pageDiv);
            });

            siteDiv.appendChild(pagesContainer);
            container.appendChild(siteDiv);
        });
    }
    
    setSelectSite() {
        let sites = JSON.parse(localStorage.getItem("sites")) || [];
        let select = document.getElementById("site-select");
        select.innerHTML = "<option value=''>Select site</option>";

        sites.forEach(site => {
            let option = document.createElement("option");
            option.value = site.value;
            option.textContent = site.value;
            select.appendChild(option);
        });
    }
}
