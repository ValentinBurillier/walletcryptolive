function getSolPrice() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/solana?', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      let getData = JSON.parse(xhr.responseText);
      let title2 = document.querySelector('.walletPrice');
      title2.style.display = "block";
      let mySection = document.querySelector('.wallet');
      let newParagraph = document.createElement('p');
      newParagraph.textContent = `${getData.market_data.current_price.usd} usd`;
      newParagraph.id = 'dataPrice';
      mySection.appendChild(newParagraph);
      console.log(getData);
    } else {
      console.error('Erreur lors de la récupération des données');
    }
  };

  xhr.send();
}

export { getSolPrice };
