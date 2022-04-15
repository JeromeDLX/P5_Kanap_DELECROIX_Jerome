//Appel de l'API et, récupération des données et ajout des produits
fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then (données => ajoutProduits(données))

// Fonction pour l'ajout des produits à la galerie
function ajoutProduits(canapés){
    
    // Loop pour récupération des infos de tout les canapés
    canapés.forEach(canapé => {
        // Destructuring données à prendre pour chaque canapé
        const {_id, imageUrl, altTxt, name, description} = canapé
        
        // Création de l'article qui contiendra infos du canapé
        const Article = document.createElement("Article")
        
        // Ajout des fonctions créés pour construire l'article
        const Ancre = creationAncre(_id) 
        const Image = creationImage(imageUrl, altTxt)
        const Titre = creationTitre(name)
        const Descriptif = creationDescriptif(description)
        
        // Elements à ajouter à une carte article
        appendElementsAuxCartes(Article, Image, Titre, Descriptif)
        appendArticleVersAncre(Ancre, Article)
    })
}

// Fonction d'ajout de tous les éléments créé à une carte
function appendElementsAuxCartes(Article, Image, Titre, Descriptif){
    Article.appendChild(Image)
    Article.appendChild(Titre)
    Article.appendChild(Descriptif)
}

// Ajout du a et de l'article au a href
function appendArticleVersAncre(Ancre, Article){
    const items = document.querySelector("#items")
    items.appendChild(Ancre)
    Ancre.appendChild(Article)
}

// Création du a href de chaque canapé avec, ID associé, sous forme d'élément HTML
function creationAncre(id){
    const ancre  = document.createElement("a")
    ancre.href = "./product.html?id=" + id
    return ancre
}

// Création de l'image et, de son AltText sous forme d'élément HTML
function creationImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

// Création du nom de chaque canapé, sous forme d'élément HTML
function creationTitre(name){ 
    const Titre = document.createElement("Titre")
    Titre.textContent = name
    Titre.style.margin = "20px 0px 10px 0px";
    Titre.classList = ("productName")
    return Titre
}

// Création de la decription de chaque canapé, sous forme d'élément HTML
function creationDescriptif(description){  
    const Descriptif = document.createElement("Descriptif")
    Descriptif.textContent = description
    Descriptif.style.margin = "10px 15px 15px 15px"
    Descriptif.style.textAlign = "center"
    Descriptif.classList.add("productDescription")
    return Descriptif
}
