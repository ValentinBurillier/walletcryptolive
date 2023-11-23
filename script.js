function fetchSolanaPrice() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/solana?');

  // Attachez un gestionnaire d'événement pour l'événement load
  xhr.addEventListener('load', function () {
      // Code à exécuter lorsque la requête est terminée
      const myObject = JSON.parse(xhr.response);
      const solUsdPrice = myObject.market_data.current_price.usd;
      let walletLive = document.getElementById('walletLive');
      walletLive.innerHTML = `<h1>Le prix actuel est de <span>${solUsdPrice}</span>$</h1>`;
      
      // Mettez à jour le portefeuille seulement si une valeur est présente dans l'input
      const valueInput = document.querySelector('#quantity');
      if (valueInput.value.trim() !== "") {
        updateWallet();
      }
  });

  xhr.send();
}

// Détecter si le cookie est présent ou non
function getCookie(name) {
  var cookieName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }

  return null;
}

// Exemple d'utilisation
var valeurDuCookie = getCookie("solana");
console.log(valeurDuCookie);
if (valeurDuCookie !== null) {
  document.querySelector('#quantity').value = valeurDuCookie;
}

function updateWallet() {
  const valueInput = document.querySelector('#quantity');
  const newValue = parseFloat(valueInput.value);

  // Vérifiez si la valeur de l'input est un nombre
  if (!isNaN(newValue)) {
    const currentPrice = document.querySelector('span');
    const currentPriceNumber = parseFloat(currentPrice.textContent);

    const wallet = newValue * currentPriceNumber;
    const newWallet = wallet.toFixed(2);
    document.querySelector('h2').innerHTML = `La valeur de votre portefeuille actuel est de : <span id="Wallet">${newWallet}</span>$`;

    // Exemple d'utilisation
    setCookie("solana", `${newValue}`, 7);
  }
}

fetchSolanaPrice();
// Exécutez la requête toutes les 10 secondes
setInterval(fetchSolanaPrice, 10000);

const btn = document.querySelector('#btnSubmit');
btn.addEventListener('click', updateWallet);

const inputQuantity = document.querySelector('#quantity');
inputQuantity.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    updateWallet();
  }
});

// Fonction pour définir un cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}


