//Appel de l'API et, récupération des données
fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then (données => ajoutProduits(données))

function ajoutProduits(canapés){
        //const _id = données[0]._id
        //const imageUrl = données[0].imageUrl
        //const altTxt = données[0].altTxt
        //const name = données[0].name
        //const description = données[0].description
    // Loop pour récupération des infos de tout les canapés
    canapés.forEach(canapé => {
        // Destructuring 
        const {_id, imageUrl, altTxt, name, description} = canapé
        
        //Création de la carte du canapé
        const Ancre = créationAncre(_id) 
        const Article = document.createElement("Article")
        const Image = créationImage(imageUrl, altTxt)
        const Titre = créationTitre(name)
        const Descriptif = créationDescriptif(description)
        
        //Ajout des éléments de la carte
        appendElementsAuxCartes(Article, Image, Titre, Descriptif)
        appendArticleVersAncre(Ancre, Article)
    })
}

function appendElementsAuxCartes(Article, Image, Titre, Descriptif){
    Article.appendChild(Image)
    Article.appendChild(Titre)
    Article.appendChild(Descriptif)
}

function créationAncre(id){
    const ancre  = document.createElement("a")
    ancre.href = "./product.html?id=42" + id
    return ancre
}

function appendArticleVersAncre(Ancre, Article){
    const items = document.querySelector("#items")
    items.appendChild(Ancre)
    Ancre.appendChild(Article)
}

function créationImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function créationTitre(name){ 
    const Titre = document.createElement("Titre")
    Titre.textContent = name
    Titre.classList = ("productName")
    return Titre
}

function créationDescriptif(description){  
    const Descriptif = document.createElement("Descriptif")
    Descriptif.textContent = description
    Descriptif.classList.add("productDescription")
    return Descriptif
}