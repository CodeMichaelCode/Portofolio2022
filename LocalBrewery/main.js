//selectors
let searchTypes = Array.from(document.querySelectorAll('input[name = "breweryFilter"]'));
const searchBtn = document.querySelector('#search');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageButtons = document.getElementById('pageButtons'); 
const inputText = document.getElementById('searchedText');
let searchType = 'by_city=';
let pageNum = 1;
let lastPage = false;

const hamburger = document.querySelector('.hamburger');
const navMenu =  document.querySelector('.navMenu');

//functions loops and objects
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addTransitionDelay() {
    if(hamburger.classList.contains('active')){
        navMenu.style.transitionDelay = '500ms'
    }
    else{
        navMenu.style.transitionDelay = '0s'
    }
}

searchTypes.forEach((item) => {
    item.addEventListener('click', ()  => {
        searchType = `${item.value}`
        inputText.value = ''
        return searchType.toLowerCase()
    })
});

let searchObj = {
    newSearch: () => {
    let searchedText = inputText.value;
    if(searchedText === '') {
        return
    }
    let appURL = 'https://api.openbrewerydb.org/breweries?per_page=5&';
    let url = `${appURL}${searchType}${searchedText}&page=${pageNum}`
    const searchResults = document.querySelector('.searchResults');
    pageButtons.classList.remove('hide');
    searchResults.classList.remove('hide');
        fetch(url)
        .then(res => {
            // if(res.ok) {
            //     console.log(url)
            //     console.log('Get request successful')
            // }else{
            //     console.log('Get request unsuccessful')
            // }
            return res
        })
        .then(res => res.json())
        .then(data => {
            let dataArr = ['name', 'brewery_type', 'website' , 'phone' , 'street' , 'postal_code' , 'city' , 'state', 'country'];
            
            if(Object.keys(data).length > 0) {
                removeAllChildNodes(searchResults);
                for(let i = 0; i < Object.keys(data).length; i++) {
                    let docFrag = new DocumentFragment();
                    let newDiv = document.createElement('div');
                    newDiv.classList.add('brewery')
                    docFrag.appendChild(newDiv)
                    let newBrew = document.createElement('ul')
                    newDiv.appendChild(newBrew)
                    dataArr.forEach(el => {
                        let value = data[i][el]
                        let cleanedUpName = el.replace('_', ' ')
                        if(value != null) {
                            let desc = document.createElement('li')
                            let titleSpan = document.createElement('span');
                            let descriptionSpan =  `: ${value}`;
                            titleSpan.textContent = cleanedUpName;
                            desc.appendChild(titleSpan)
                            desc.innerHTML += descriptionSpan;
                            newBrew.appendChild(desc)
                        }
                    })
                    searchResults.appendChild(docFrag)
                    nextBtn.classList.remove('disabled')
                    lastPage = false;
                    }
            }else{
                lastPage = true;
            }

            if(pageNum == 1) {
                prevBtn.classList.add('disabled')
                nextBtn.classList.remove('disabled')
            }

            if(lastPage && pageNum == 2){
                pageNum -= 1
                document.getElementById('pageNumber').textContent = pageNum
                prevBtn.classList.add('disabled')
                nextBtn.classList.add('disabled')
            }else if(lastPage && pageNum !== 1){
                pageNum -= 1
                document.getElementById('pageNumber').textContent = pageNum
                nextBtn.classList.add('disabled')
            }    
        })
        .catch(error => console.error(error))
    },
    minusPageNum: () => {
        if(pageNum === 1) {
            pageNum = 1
        }else {
            pageNum -= 1
        }
    },
    plusPageNum: () => {
        if(lastPage) {
            return
        }else if(pageNum >= 1) {
            pageNum += 1
        }
    },
    resetPageNum: () => {
        pageNum = 1
    }
    
}

//Event listeners

searchBtn.addEventListener('click', () => {
    searchObj.newSearch(searchObj.resetPageNum())
    document.getElementById('pageNumber').textContent = pageNum
    prevBtn.classList.add('disabled')
});

inputText.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchObj.newSearch(searchObj.resetPageNum())
        document.getElementById('pageNumber').textContent = pageNum
        prevBtn.classList.add('disabled')
    }
});

prevBtn.addEventListener('click', () => {
    nextBtn.classList.remove('disabled')
    searchObj.newSearch(searchObj.minusPageNum())
    document.getElementById('pageNumber').textContent = pageNum
}); 

nextBtn.addEventListener('click', () => {
    searchObj.plusPageNum()
    prevBtn.classList.remove('disabled')
    searchObj.newSearch()
    document.getElementById('pageNumber').textContent = pageNum
}); 

hamburger.addEventListener('click', () => {
    navMenu.style.transitionDelay = '0s'
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
});

document.querySelectorAll('.navMenu a').forEach((el) => {
    el.addEventListener('click', () => {
    addTransitionDelay()
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
    });
});

window.addEventListener('scroll', () => {
    if(hamburger.classList.contains('active')){
        hamburger.click()
    }
})