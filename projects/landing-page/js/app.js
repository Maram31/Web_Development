/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

//Define Global Variables
let selectNav = document.querySelector("#navbar__list");
let selectAllSections = document.querySelectorAll("section");
var timeout;

 

//call buildNav function when page is fully loaded
window.addEventListener('load', buildNav());



//build navigation bar
function buildNav() {
    selectAllSections.forEach((element)=>{
        let sectionsList = document.createElement("li");
        sectionsList.classList.add("menu__link");
        let sectionID = element.getAttribute("id");
        sectionsList.classList.add(sectionID);

        let sectionNumber = element.getAttribute("data-nav");

        sectionsList.innerHTML = `<a href="#${sectionID}">${sectionNumber}</a>`;
        selectNav.appendChild(sectionsList);
        setScrollToSection();

    });
};



//activate chosen section only
function activateSection(section) {
    deactivateAllSections();
    section.classList.add("your-active-class");
    let navLinks =  document.querySelectorAll(".menu__link");
    navLinks.forEach((element) => {
        if(element.classList.contains(section.getAttribute("id"))) {
            element.classList.add("active");
        }
    });
};



//deactivate all sections on page
function deactivateAllSections() {
    let navLinks =  document.querySelectorAll(".menu__link");
    selectAllSections.forEach((elem) => {
        elem.classList.remove("your-active-class");
        navLinks.forEach((element) => {
            if(element.classList.contains(elem.getAttribute("id"))) {
                element.classList.remove("active");
            }
        });

    });
}



//set scroll to section on click
function setScrollToSection() {
    document.getElementById("navbar__list").style.display="block"; //display navigation bar

    links = document.querySelectorAll(".menu__link");

    links.forEach((element) => {
        element.addEventListener("click", function(event) {
            clearTimeout(timeout);
            event.preventDefault();
            document.querySelector(element.children[0].getAttribute('href')).scrollIntoView({behavior: 'smooth'});
            timeout = setTimeout(function(){ document.getElementById("navbar__list").style.display="none";}, 5000); //hide navigation bar after 5 seconds of inactivity

        });
    });  
};


 
//check for scrolling on page
window.addEventListener("scroll", function(event) {
    document.getElementById("navbar__list").style.display="block"; //display navigation bar
    clearTimeout(timeout);
    selectAllSections.forEach((element) => { //activate only section in view
        if(checkViewport(element)) {
            deactivateAllSections();
            activateSection(element);
        }
    });
    timeout = setTimeout(function(){ document.getElementById("navbar__list").style.display="none";}, 5000); //hide navigation bar after 5 seconds of inactivity
});




//check if element is in view
function checkViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};	


