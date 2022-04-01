// Récupération des informations du canapé cliqué
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")

//Appel de l'API et, récupération des données du canapé
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(reponse => reponse.json())
    .then (données => kanapindividuel(données))

function kanapindividuel(canapé){
    // Destructuring informations à récupérer du canapé
    const {altTxt, colors, description, imageUrl, name, price} = canapé
    
    // Ajout des fonctions créés pour construire la page produit
    créationImageCanapé(imageUrl, altTxt)
    créationTitreCanapé(name)
    créationPrixCanapé(price)
    créationDescriptionCanapé(description)
    créationCouleursCanapé(colors)
    
    // Informations à afficher sur la page du canapé
    prixIndividuel = price
    imgUrl = imageUrl
    altText = altTxt
    nameArticle = name
}

// Création de la div d'image avec, son AltText sous forme d'élément HTML
function créationImageCanapé(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent !=null) parent.appendChild(image)
}

// Création du nom de chaque canapé, sous forme d'élément HTML
function créationTitreCanapé(name){
    const titreProduit = document.querySelector("#title")
    if (titreProduit !=null)titreProduit.textContent = name
}

// Création du prix de chaque canapé, sous forme d'élément HTML
function créationPrixCanapé(price){
    const priceProduit = document.querySelector("#price")
    if (priceProduit !=null)priceProduit.textContent = price
}

// Création de la decription de chaque canapé, sous forme d'élément HTML
function créationDescriptionCanapé(description){
    const descriptionProduit = document.querySelector("#description")
    if (descriptionProduit !=null)descriptionProduit.textContent = description
}

// Création du menu des couleurs de chaque canapés
function créationCouleursCanapé(colors){
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

// Création alerte de quantité ou, couleur non séléctionné
const boutonAjoutPanier = document.querySelector("#addToCart")
if (boutonAjoutPanier !=null){
    boutonAjoutPanier.addEventListener("click", (e) => {
        const couleur = document.querySelector("#colors").value
        const quantité = document.querySelector("#quantity").value
        if (couleur == null || couleur === "" || quantité == null || quantité == 0){
            alert("S'il vous plait choisissez une couleur et une quantité")
            return
        }
        // Une fois selection faite sauvegarde des données dans le LocalStorage
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
