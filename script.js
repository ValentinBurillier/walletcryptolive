function getDefautPriceSolana() {
  const spanPrice = document.querySelector('#choiceCrypto');
  const xhr = new XMLHttpRequest();
  const iconSolana = document.querySelector('.iconSolana');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let jsonSolanaRequest = JSON.parse(xhr.response);
        let priceSolana = jsonSolanaRequest.market_data.current_price.usd;
        spanPrice.innerText = priceSolana;
        iconSolana.style.borderBottom = "3px solid gold";
      } else {
        console.log('Erreur lors de la requête');
      }
    }
  };
  
  xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/solana?');
  xhr.send();
  
}
getDefautPriceSolana();