 const button = document.querySelector('#quoteBtn');
 const copyBtn = document.querySelector('.fa-clipboard');



fetch("https://api.kanye.rest")
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        document.querySelector('#kQuote').innerText = `"${data.quote}" \n - Kanye West`
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

function newQuote() {
    fetch("https://api.kanye.rest")
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        document.querySelector('#kQuote').innerText = `"${data.quote}" \n - Kanye West`
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

button.addEventListener('click', newQuote);

copyBtn.addEventListener('click', () => {
    let quote = document.querySelector('#kQuote');
    const body = document.querySelector('body');
    const area = document.createElement('textarea');
    body.appendChild(area);
  
    area.value = quote.innerText;
    area.select();
    area.setSelectionRange(0, 9999);
    document.execCommand('copy');
  
    body.removeChild(area);

    // alert('Text copied')
});
