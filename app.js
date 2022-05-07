const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    document.querySelector('.menu').classList.toggle('active')
});

window.addEventListener('scroll', () => {
    if(hamburger.classList.contains('active')){
        hamburger.click()
    }
})