const dl=document.querySelectorAll(".drop-list select"),
 fromCurrency=document.querySelector(".from select"),
 toCurrency=document.querySelector(".to select"),
getButton=document.querySelector("form button");
for(let i = 0; i < dl.length; i++){
    for(let currency_code in country_code){
        let selected;
        if(i==0){
            selected=currency_code=="USD"?"selected":"";
        } 
        else if(i==1){
            selected=currency_code=="AFN"?"selected":"";
        }
        let opTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
        dl[i].insertAdjacentHTML("beforeend", opTag);
    }
    dl[i].addEventListener("change",e=>{
        loadFlag(e.target);
    });
}
function loadFlag(element){
    for(code in country_code){
        if(code==element.value){
            let imgtg=element.parentElement.querySelector("img");
            imgtg.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}
window.addEventListener("load",()=>{
    getExchange();
});
getButton.addEventListener("click",e=>{
    e.preventDefault();
    getExchange();
});
const exchangeIcon=document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click",()=>{
let tempcode=fromCurrency.value;
fromCurrency.value=toCurrency.value;
toCurrency.value=tempcode;
loadFlag(fromCurrency);
loadFlag(toCurrency);
getExchange();
});


const apiKey = '2eb05b7fc16e16d19f4ea0ce';
const apiUrl = 'https://v6.exchangerate-api.com/v6';

async function getExchange() {
    const amount = document.querySelector(".am input");
     exchangeRatetxt=document.querySelector(".exchange-rate");
    let amountValue = amount.value;
    if (amountValue == "" || amountValue == "0") {
        amount.value = "1";
        amountValue = 1;
    }
    exchangeRatetxt.innerText="Getting exchange...";
    const fromCurrencyValue = fromCurrency.value;
    const url = `${apiUrl}/${apiKey}/latest/${fromCurrencyValue}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const result = JSON.parse(data.contents);
        console.log(result);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
    fetch(url).then(response=>response.json()).then(result=>{
        let exchangeRate=result.conversion_rates[toCurrency.value];
        let totalExchange=(amountValue*exchangeRate).toFixed(2);
        
        
        exchangeRatetxt.innerText = `${amountValue} ${fromCurrencyValue} = ${totalExchange} ${toCurrency.value}`;
          
    }).catch(()=>{
        exchangeRatetxt.innerText="Something went wrong";
    });
}