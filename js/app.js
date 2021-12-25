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

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section')
const documentfrag = document.createDocumentFragment();
const ul = document.getElementById("navbar__list")
const smallWindow = window.matchMedia("(max-width: 700px)") //using media query to check whether the window got smaller or not
const header = document.querySelector(".page__header")


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavMenu() {
    for (const section of sections) {
        const li = document.createElement("li");
        const anch = document.createElement("a");
        anch.textContent = section.getAttribute("data-nav")
        anch.setAttribute('id', 'link' + section.id.substring(7))
        anch.classList.add("menu__link")
        anch.href = '#${section.id}'
        li.appendChild(anch)
        documentfrag.appendChild(li)
    }
    ul.appendChild(documentfrag)
    //creating something like burger menu to be used in responsiveness part
    const burgermenu = document.createElement('button') // Menu button
    burgermenu.classList.add("hamburger")
    //Menu bars
    const bar1 = document.createElement('div')
    const bar2 = document.createElement('div')
    const bar3 = document.createElement('div')
    bar1.classList.add("bar")
    bar2.classList.add("bar")
    bar3.classList.add("bar")
    burgermenu.appendChild(bar1)
    burgermenu.appendChild(bar2)
    burgermenu.appendChild(bar3)
    header.appendChild(burgermenu)

}

// Add class 'active' to section when near top of viewport

function highlightSectionInViewport() {

    const links = document.querySelectorAll(".menu__link")
    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        //console.log("intersction" + entry.target.id)
                        sections.forEach(section => { section.classList.remove("your-active-class") })
                        entry.target.classList.add("your-active-class")
                        links.forEach(link => { link.classList.remove("another-active-class") })
                        for (const link of links) {
                            if (link.id.substring(4) == entry.target.id.substring(7)) {
                                link.classList.add("another-active-class")
                                //console.log("link " + entry.target.id + "active")
                            }
                        }
                    }
                    observer.unobserve(entry.target)

                });
            },
            { rootMargin: "0px 0px -400px 0px" });
        sections.forEach(section => { observer.observe(section) })

    }
}


// Scroll to anchor ID using scrollTO event
function ScrollSmoothly(event) {
    event.preventDefault();
    const selectedSection = document.getElementById('section' + event.target.id.substring(4))
    //console.log(selectedSection)
    selectedSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
}

function showBurgerMenu(smallWindow) {
    const menu = document.querySelector('.hamburger')
    const li = document.querySelectorAll('li')
    var flag = 0
    if (smallWindow.matches) { // If media query matches
        menu.style.display = 'block' //shows the menu
        li.forEach(li => { li.style.display = 'block' }) //and shows the list item as block instead of inline-block
        flag = 1
    }
    else { //when window becomes in normal size again
        li.forEach(li => { li.style.display = 'inline-block' }) // display the list items again as inline-block
        menu.style.display = 'none'//hide the menu
        flag = 0
    }
    menu.addEventListener('click', function toggle() { //If menu is clicked
        if (flag == 0) { //when menu icon got clicked and menu is not shown
            li.forEach(li => { li.style.display = 'block' }) //shows the menu 
            flag = 1

        }
        else { //when menu icon got clicked and menu is shown
            li.forEach(li => { li.style.display = 'none' }) //hide the menu
            flag = 0
        }

    })

}





/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', () => buildNavMenu())
// Scroll to section on link click
ul.addEventListener('click', (event) => ScrollSmoothly(event))
// Set sections as active
window.addEventListener('scroll', () => highlightSectionInViewport())
// Showing the burger menu when window size changes
smallWindow.addEventListener('change', () => showBurgerMenu(smallWindow))




