//Selectors
const bars = Array.from(document.querySelectorAll('.bar'))
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('.navMenu');
const navButtons = document.querySelector('.navButtons');

//hamburger menu toogle
hamburger.addEventListener('click', () => {
    bars.forEach(bar => {
        bar.classList.toggle('active')
    })
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
    navButtons.classList.toggle('active')
})

//remove on window resize
window.addEventListener('resize', () => {
    if(hamburger.classList.contains('active'))
        bars.forEach(bar => {
            bar.classList.remove('active')
        })
        hamburger.classList.remove('active')
        navMenu.classList.remove('active')
        navButtons.classList.remove('active')
})