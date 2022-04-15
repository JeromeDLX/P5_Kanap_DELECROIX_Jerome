// Récupération des informations du canapé cliqué
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")

//Appel de l'API et, récupération des données du canapé
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(reponse => reponse.json())
    .then (data => kanapindividuel(data))

function kanapindividuel(canapé){
    // Destructuring informations à récupérer du canapé
    const {altTxt, colors, description, imageUrl, name, price} = canapé
    
    // Ajout des fonctions créés pour construire la page produit
    creationImageCanape(imageUrl, altTxt)
    creationTitreCanape(name)
    creationPrixCanape(price)
    creationDescriptionCanape(description)
    creationCouleursCanape(colors)
    
    // Informations à afficher et à integrer sur la page du canapé
    prixIndividuel = price
    imgUrl = imageUrl
    altText = altTxt
    nameArticle = name
}

// Création de la div d'image avec, son AltText sous forme d'élément HTML
function creationImageCanape(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent !=null) parent.appendChild(image)
}

// Création du nom de chaque canapé, sous forme d'élément HTML
function creationTitreCanape(name){
    const titreProduit = document.querySelector("#title")
    if (titreProduit !=null)titreProduit.textContent = name
}

// Création du prix de chaque canapé, sous forme d'élément HTML
function creationPrixCanape(price){
    const priceProduit = document.querySelector("#price")
    if (priceProduit !=null)priceProduit.textContent = price
}

// Création de la decription de chaque canapé, sous forme d'élément HTML
function creationDescriptionCanape(description){
    const descriptionProduit = document.querySelector("#description")
    if (descriptionProduit !=null)descriptionProduit.textContent = description
}

// Création du menu des couleurs de chaque canapés
function creationCouleursCanape(colors){
    const menuDéroulant = document.querySelector("#colors")
    if (menuDéroulant !=null){
       colors.forEach((color) => {
           const option = document.createElement("option")
           option.value = color
           option.textContent = color
           menuDéroulant.appendChild(option)
       })
    }
}

// Création alerte de quantité ou, couleur non sélectionné
const boutonAjoutPanier = document.querySelector("#addToCart")
if (boutonAjoutPanier !=null){
    boutonAjoutPanier.addEventListener("click", (e) => {
        const couleur = document.querySelector("#colors").value
        const quantité = document.querySelector("#quantity").value
        if (couleur == null || couleur === "" || quantité == null || quantité <0 || quantité == 0 || quantité >100) {
            alert("S'il vous plait choisissez une couleur et une quantité valide")
            return
        }
        // Une fois selection faite sauvegarde des données dans le LocalStorage puis renvoit vers cart
        const key = `${productId}-${couleur}`
        const dataLocalStorage = {
            productId: productId,
            couleur: couleur,
            quantité: Number(quantité),
            price: prixIndividuel,
            imageUrl: imgUrl,
            altTxt: altText,
            name: nameArticle
        }
        localStorage.setItem(key, JSON.stringify(dataLocalStorage))
        window.location.href = "cart.html"
    })
}
