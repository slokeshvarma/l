let navLink = document.getElementById("eventClicable");
let eventLinks = document.getElementsByClassName("eventLinks")[0];
let hideTimeout, showTimeout;

navLink.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);

    showTimeout = setTimeout(() => {
        eventLinks.style.opacity = "1";
        eventLinks.style.visibility = "visible";
        eventLinks.style.pointerEvents = "auto";
        eventLinks.style.transition = "opacity 0.5s ease, visibility 0s 0s, pointer-events 0s 0s";
    }, 300);
});

navLink.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
        eventLinks.style.transition = "opacity 0.5s ease, visibility 0s 0.5s, pointer-events 0s 0.5s";
    }, 1000);
});

eventLinks.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);
});

eventLinks.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
    }, 900); 
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();

        let targetID = this.getAttribute("href");
        let targetSection = document.querySelector(targetID);
        let navHeight = document.querySelector("nav").offsetHeight;

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: "smooth"
            });
        }
    });
});
   
function clickEventLinks() {
    if (eventLinks.style.opacity === "0" || eventLinks.style.opacity === "") {
        eventLinks.style.opacity = "1";
        eventLinks.style.visibility = "visible";
        eventLinks.style.pointerEvents = "auto";
    } else {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
    }
}

function NavLogoVisbility() {
    const nav = document.getElementsByTagName("nav")[0];
    const navLogo = document.getElementsByClassName("navLogo")[0];
    const navRect = nav.getBoundingClientRect();
    if (navRect.top <= 0) {
        navLogo.style.display = "flex";
        nav.style.marginBottom = "2rem";
    } else {
        navLogo.style.display = "none";
        nav.style.marginBottom = "1rem";
    };
};

function PageRenderer(divID) {
    const contentDiv = document.getElementById(divID);
    if (divID === "newsLetters") {
        const NEWSLettersData = [
            {year:"2016-17", letters: ["1.1", "1.2", "1.3"], viewLink: ["", "", ""], downloadLink:["", "", ""]},
            {year:"2017-18", letters: ["2.1", "2.2", "2.3"], viewLink: ["", "", ""], downloadLink:["", "", ""]},
            {year:"2018-19", letters: ["3.1", "3.2", "3.3"], viewLink: ["", "", ""], downloadLink:["", "", ""]},
            {year:"2019-20", letters: ["4.1", "4.2", "4.3"], viewLink: ["", "", ""], downloadLink:["", "", ""]},
            {year:"2020-21", letters: ["5.1", "5.2", "5.3"], viewLink: ["", "", ""], downloadLink:["", "", ""]},
            {year:"2021-22", letters: ["6.1", "6.2"], viewLink: ["", ""], downloadLink:["", ""]},
            {year:"2022-23", letters: ["7.1", "7.2", "7.3"], viewLink: ["", "", ""], downloadLink:["", "", ""]},
        ];
        NEWSLettersData.forEach(NEWSLetterData => {
            const yearLetters = document.createElement("div");
            yearLetters.id = `${NEWSLetterData.year}`;
            yearLetters.className = "yearLetters";
            yearLetters.innerHTML = ``;
            NEWSLetterData.letters.forEach( (letter, index) => {
                yearLetters.innerHTML +=  `
                <div class="yearLetter">
                    <div class="letterName"><h4>${letter}</h4></div>
                <div class="letterLinks">
                    <a href="${NEWSLetterData.viewLink[index]}"><i class="fa fa-eye"></i></a>
                    <a href="${NEWSLetterData.downloadLink[index]}"><i class="fa fa-download"></i></a>
                </div>`
            });
            const yearElement = document.createElement("div");
            yearElement.id = `${NEWSLetterData.year}`;
            yearElement.className = "year";
            yearElement.innerHTML = ``;
            yearElement.innerHTML = `
                <div class="yearTitle"><h3>${NEWSLetterData.year}</h3></div>
                </div>`;
            yearElement.appendChild(yearLetters);
            
        contentDiv.appendChild(yearElement);
        });
    } else if (divID === "ozoneMagazines") {
        const ozoneMagazinesData = [
            {year:"2019(JAN-JUNE)", magazineEdition: "Edition-1", viewLink: "", downloadLink: ""},
            {year:"2019(JULY-DEC)", magazineEdition: "Edition-2", viewLink: "", downloadLink: ""},
            {year:"2020(JAN-JUNE)", magazineEdition: "Edition-3", viewLink: "", downloadLink: ""},
            {year:"2020(JULY-DEC)", magazineEdition: "Edition-4", viewLink: "", downloadLink: ""},
            {year:"2021(JAN-JUNE)", magazineEdition: "Edition-5", viewLink: "", downloadLink: ""},
            {year:"2021(JULY-DEC)", magazineEdition: "Edition-6", viewLink: "", downloadLink: ""},
            {year:"2022(JAN-JUNE)", magazineEdition: "Edition-7", viewLink: "", downloadLink: ""},
            {year:"2022(JULY-DEC)", magazineEdition: "Edition-8", viewLink: "", downloadLink: ""}
];
        ozoneMagazinesData.forEach(ozoneMagazineData => {
            const yearMagazine = document.createElement("div");
            yearMagazine.id = `${ozoneMagazineData.magazineEdition}`;
            yearMagazine.className = "magazineDetails";
            yearMagazine.innerHTML = ``;
            yearMagazine.innerHTML =  `
                    <div class="magazineYearName"><h4>${ozoneMagazineData.year}</h4></div>
                    <div class="magazineLinks">
                        <a href="${ozoneMagazineData.viewLink}"><i class="fa fa-eye"></i></a>
                        <a href="${ozoneMagazineData.downloadLink}"><i class="fa fa-download"></i></a>
                    </div>`;
            const yearElement = document.createElement("div");
            yearElement.id = `${ozoneMagazineData.magazineEdition}`;
            yearElement.className = "magazine";
            yearElement.innerHTML = ``;
            yearElement.innerHTML = `
                <div class="magazineEdition"><h3>${ozoneMagazineData.magazineEdition.replace("-", " ")}</h3></div>
                </div>`;
            yearElement.appendChild(yearMagazine);
            
        contentDiv.appendChild(yearElement);
        });
    };
}
