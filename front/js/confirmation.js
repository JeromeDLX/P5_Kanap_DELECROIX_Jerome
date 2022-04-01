const numeroCommande = recuperationNumeroCommande()
affichageNumeroCommande(numeroCommande)
nettoyageDuLocalStorage()

// Fonction de récupération du numéro de commande
function recuperationNumeroCommande(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

// Fonction d'affichage du numéro de commande
function affichageNumeroCommande(orderId){
    const numeroCommandeAttribue = document.getElementById("orderId")
    numeroCommandeAttribue.textContent = orderId
}

// Fonction de nettoyage et vidage du cache
function nettoyageDuLocalStorage(){
    const vidageDuCache = window.localStorage
    vidageDuCache.clear()
}

