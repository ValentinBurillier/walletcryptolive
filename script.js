const spanPrice = document.querySelector('#choiceCrypto');
function getDefautPriceSolana() {
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

const imgIcon = document.querySelectorAll('.iconCrypto');
imgIcon.forEach((element) => {
  element.addEventListener('click', () => {
    /*1ère etape : Lors du clique on change la bordure */
    imgIcon.forEach((e) => {
      e.style.borderBottom = 'none';
    })
    element.style.borderBottom = "3px solid gold";

    /*2ème étape : On affiche le prix actuel de la crypto sélectionnée */
    const idCrypto = element.id;
    
    function request(cryptoElement) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            let jsonRequest = JSON.parse(xhr.response);
            let priceCrypto = jsonRequest.market_data.current_price.usd;
            spanPrice.innerText = priceCrypto;
          } else {
            console.log('Erreur lors de la requête');
          }
        }
      };
      
      xhr.open('GET', `https://api.coingecko.com/api/v3/coins/${cryptoElement}?`);
      xhr.send();
    }
    
    request(idCrypto);
  })
})

//SOUMISSION FORMULAIRE
const btnForm = document.querySelector('#btnForm');
btnForm.addEventListener('click', () => {

  //1ère étape : on récupère la valeur du champ du formulaire
  const valueForm = document.querySelector('#solanaQuantity').value; //string value

  //2ème étape : on récupère la crypto sélectionnée
  const allImgIcon = document.querySelectorAll('.iconCrypto');
  const cryptoSelected = function(cryptos) {
    allImgIcon.forEach((e) => {
      if(e.style.borderBottom === "3px solid gold") {
        const cryptoMoment = e.id;
        
        //3ème étape : Création du cookie
        function setCookie(crypto, value) {
          document.cookie = `${crypto}=${value}`;
          console.log(document.cookie);
        }
        setCookie(cryptoMoment, valueForm);
      }
    })
  }
  cryptoSelected(allImgIcon);
})

//Au démarage de la page : 1ère étape : on récupère les cookies dans un tableau.
function getCookie() {
  const cookiesArray = document.cookie.split(';'); //Récupère tous les cookies
  const allCrypto = document.querySelectorAll('.iconCrypto'); //GET ALL ID CRYPTOS
  const idCryptos = []
  allCrypto.forEach((element) => {
    idCryptos.push(element.id);
  })
  //On récupère les valeurs des cookies par rapports aux id cryptos.
  const valueCryptos = [];
  idCryptos.forEach((element) => {
    valueCryptos.push(getCookieValue(element));
  })
  console.log(idCryptos);
  console.log(valueCryptos);
}

getCookie();
function getCookieValue(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Vérifier si ce cookie correspond au nom recherché
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  // Si le cookie n'est pas trouvé, retourner une chaîne vide ou une valeur par défaut
  return '';
}