let btnCash = document.querySelector('#btnSubmit2');
console.log(btnCash);
btnCash.addEventListener('click', () => {
  const valueCash = document.querySelector('#money').value;
  // Exemple d'utilisation
  setCookie("cashCrypto", `${valueCash}`, 30);
  titleCash(valueCash);
})

function titleCash(euro) {
  const title = document.querySelector('#myCash');
  title.innerHTML = `Vous avez investi : ${euro} euros.`;

  const perf = document.querySelector('#perf');
  const Wallet = parseFloat(document.querySelector('#Wallet').textContent);
  const newPerf = (((Wallet / euro) - 1) * 100);
  newPerf.toFixed(2);
  const suppl = Wallet - euro;
  perf.innerHTML = `Votre performance est de + ${newPerf} % soit + ${suppl} euros`;

}
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