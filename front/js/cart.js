// Création array du panier
const panier = [];

// Appel des fonctions des données récupérées et, des éléments à afficher
recuperationCanapeAjoutePanier()
// panier.forEach(item => displayItem(item))
panier.forEach(item => displayArticleFetch(item))

// Récupération des données du ou des canapés en cache dans le panier
function recuperationCanapeAjoutePanier() {
    const nombreProduitsAjoutés = localStorage.length
    for (let index = 0; index < nombreProduitsAjoutés; index++) {
        const item = localStorage.getItem(localStorage.key(index)) 
        const itemObject = JSON.parse(item)
        panier.push(itemObject)
    }
}

// Elements à créer et afficher dans le panier
function displayItem(item){
    const article = creationArticle(item)
    const divImage = creationImageDiv(item)
    article.appendChild(divImage)
    
    const cartItemContent = creationContenuDuPanier(item)
    article.appendChild(cartItemContent)
    displayArticle(article)

    displayQuantiteTotaleArticle()
    displayPrixTotalArticle()
}

// Function de mise en place de l'article
function displayArticle(article){
   document.querySelector("#cart__items").appendChild(article)
}

// Création de l'article "cart__item", sous forme d'élément HTML
function creationArticle(item){
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.productId
    article.dataset.color = item.couleur
    return article
}

// Création de la div "cart__item__img", sous forme HTML
function creationImageDiv(item){
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    divImage.appendChild(image)
    return divImage
}

// Création de la div "cart__item__content" et de son contenu, sous forme HTML
function creationContenuDuPanier(item,price){ 
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = creationDescriptionCanape(item,price)
    const settings = creationSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

// Création de la div "cart__item__content__description" et de son contenu, sous forme HTML
function creationDescriptionCanape(item,price){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const pCouleur = document.createElement("p")
    pCouleur.textContent = item.couleur
    const pPrice = document.createElement("p")
    pPrice.textContent = price + "€"
    // pPrice.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(pCouleur)
    description.appendChild(pPrice)

    return description
}

// Création de la div "cart__item__content__settings", sous forme HTML
function creationSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    ajoutQuantiteAuSettings(settings, item)
    ajoutDeleteAuSettings(settings, item)
    return settings
}

// Création de la div "cart__item__content__settings__quantity" et son contenu, sous forme HTML
function ajoutQuantiteAuSettings(settings, item){
    const quantité = document.createElement("div")
    quantité.classList.add("cart__item__content__settings__quantity")

    const pQuantité = document.createElement("p")
    pQuantité.textContent = "Qté : "
    quantité.appendChild(pQuantité)

    const input = document.createElement ("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantité
    input.addEventListener("input", () => majQuantiteEtPrix(item.productId, input.value, item))

    quantité.appendChild(input)
    settings.appendChild(quantité)
}

// Création de la div "cart__item__content__settings__delete" et son contenu, sous forme HTML
function ajoutDeleteAuSettings(settings, item){
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    divDelete.addEventListener("click", () => suppressionCanapePanier(item))

    const pSupression = document.createElement("p")
    pSupression.textContent = "Supprimer"

    divDelete.appendChild(pSupression)
    settings.appendChild(divDelete)
}

// Création de la fonction de supression d'un produit du panier
function suppressionCanapePanier(item){
    const canapéASupprimer = panier.findIndex(
    (canapé) => canapé.productId === item.productId && canapé.couleur === item.couleur)
    panier.splice(canapéASupprimer, 1)
    
    suppressionDonneesPanier(item)
    suppressionArticleDePage(item)
    totalQtePrix()
}

// Création de la div "cart__price" et affichage quantité totale article panier, sous forme HTML
function displayQuantiteTotaleArticle(){
    let totalArticle = 0;
    const totalQuantité = document.querySelector("#totalQuantity")
    panier.forEach(canape => {
    const quantitéTotalUnitaire = canape.quantité
    totalArticle += quantitéTotalUnitaire
    totalQuantité.textContent = totalArticle
    })
}

// Création de la div "cart__price" et affichage prix total panier, sous forme HTML
function displayPrixTotalArticle(){
    let totalArticle = 0;
    const totalPrix = document.querySelector("#totalPrice")
    panier.forEach(canape => {
    const prixTotalUnitaire = canape.price * canape.quantité
    totalArticle += prixTotalUnitaire
    totalPrix.textContent = totalArticle
    })
}

// Création fonction de mise à jour du prix et quantité total article du panier
function majQuantiteEtPrix(productId, nouvelleValeur, item){
    const articleAModifier = panier.find(item => item.productId === productId)
    articleAModifier.quantité = Number(nouvelleValeur)
    item.quantité = articleAModifier.quantité
    
    sauvegardeEtMajDonneesPanier(item)
    totalQtePrix()
}

// Création fonction de mise à jour du cache lors de la modifs article panier
function sauvegardeEtMajDonneesPanier(item){
    const newDonneesASauvegarder = JSON.stringify(item)
    const key = `${item.productId}-${item.couleur}`
    localStorage.setItem(key, newDonneesASauvegarder)
}

// Création fonction de suppression du cache lors de la suppression d'un article du panier
function suppressionDonneesPanier(item){
    const key = `${item.productId}-${item.couleur}`
    localStorage.removeItem(key)
}

// Création fonction de suppression de l'article supprimé du panier
function suppressionArticleDePage(item){
    const articleSupprimer = document.querySelector(`article[data-id="${item.productId}"][data-color="${item.couleur}"]`)
    articleSupprimer.remove()
    location.reload()
}

// Mise en place du bouton de commande
const boutonCommande = document.querySelector("#order")
boutonCommande.addEventListener("click", (e) => formulaireDeCommande(e))

// Verification si panier vide ou non 
function formulaireDeCommande(e){
    e.preventDefault()
    if (panier.length === 0) {
    alert("Oups ! Votre panier a l'air vide")
    return
    }
    
    if (siFormulaireNonComplet_new()) return 
    
    if (siEmailNonValide()) return

    const corpsDuFormulaire = creationCorpsDuFormulaire()  
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(corpsDuFormulaire),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(reponse => reponse.json())
        .then ((data) => {
            const numeroCommande = data.orderId
            window.location.href = "confirmation.html" + "?orderId=" + numeroCommande
        })
        .catch((error) => console.error(error))
}

// Création des champs du formulaire à remplir
function creationCorpsDuFormulaire(){
    const form = document.querySelector(".cart__order__form")

    const firstname = form.elements.firstName.value 
    const lastname = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const corps = { 
        contact: {
            firstName: firstname,
            lastName: lastname,
            address: address,
            city: city,
            email: email
        },
    products: recupIdDuCache()
    }
    return corps
}

// Fonction de récupération des id des canapés séléctionnés
function recupIdDuCache(){
    const nombreProduitsAjoutés = localStorage.length
    const idProduits = []
    for (let index = 0; index < nombreProduitsAjoutés; index++) {
        const key = localStorage.key(index)
        const id = key.split("-")[0]
        idProduits.push(id)
    }
    return idProduits
}

function siFormulaireNonComplet_new(){
    const form = document.querySelector(".cart__order__form")
    const inputsFormulaire = form.querySelectorAll('input') 
    const validInputs = Array.from(inputsFormulaire).filter(input => input.value !== "");

    if (validInputs.length <6) {
        alert ("Veillez à bien remplir tout les champs")
        return true
    }
    return false
}

// Fonction de vérification de la validité de l'adresse mail avec modèle REGEX
function siEmailNonValide(){
    const verifEmail = document.querySelector("#email").value
    const modeleRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (modeleRegex.test(verifEmail) === false) {
            alert("Vérifiez bien votre adresse email")
            return true
        }
    return false
}


/*************************FONCTIONS ASYNC *******************/
const recuperationDonne = async () => {
    let response = await fetch("http://localhost:3000/api/products/");
    return await response.json();
  };

  // Obtenir tous les prix des produits qui se trouvent dans le panier
  const fetchPrix = async () => {
    listeArticle = await recuperationDonne();
    let res = [];
    for (let i = 0; i < localStorage.length; i++) {
        let item = localStorage.getItem(localStorage.key(i))
        let data = JSON.parse(item)
        idProduct1 = data.productId;
      result = listeArticle.filter((article) => article._id === idProduct1);
      res.push(result[0]);
    }
    return res;
  };
  

  // Calcul des totaux prix et quantite
async function totalQtePrix() {
    let listePrix = await fetchPrix();
    let sommeQte = 0;
    let sommePrix = 0;

    document.querySelectorAll(".itemQuantity").forEach((element, i) => {
      sommeQte += parseInt(element.value);
      sommePrix += listePrix[0].price * parseInt(element.value);
    });

    document.getElementById("totalPrice").innerText = sommePrix;
    document.getElementById("totalQuantity").innerText = sommeQte;
  }

  // Afficher un article
  async function displayArticleFetch(item) {
    const response = await fetch(`http://localhost:3000/api/products/${item.productId}`)

    var data = await response.json();
    price = data.price

    const article = creationArticle(item)
    const divImage = creationImageDiv(item)
    article.appendChild(divImage)
    
    const cartItemContent = creationContenuDuPanier(item,price)
    article.appendChild(cartItemContent)
    displayArticle(article)
    totalQtePrix()

    return data.price

}
