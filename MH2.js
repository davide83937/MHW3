rest_url2 = 'https://imdb-api.com/en/API/SearchTitle/k_wx9c5cp6/blackwidow'
fetch(rest_url2).then(onResponse).then(onJson)

function onResponse(response){
    console.log('Risposta perfetta')
    return response.json()
}


function onJson(json)
{
    const cont = document.querySelector('#pubblicita #film')
    
    for(let i=0; i<2; i++){
        const doc = json.results[0]
        
        const img = doc.image
        
        
        const div = document.createElement('div')
        const cover = document.createElement('img')
     
        cover.src = img

        div.appendChild(cover)
        cont.appendChild(div)
        
    }
}



function onJson2(json) {
    
    const contenitore = document.querySelector('#pubblicita #musica');
    
    const results = json.albums.items;
    let num_results = results.length;
    
    if(num_results > 2)
      num_results = 2;
  
    for(let i=0; i<num_results; i++)
    {
      const result = results[i]
      const cover = result.images[0].url;
      const album = document.createElement('div');
      const img = document.createElement('img');
      img.src = cover;
      album.appendChild(img);
      contenitore.appendChild(album);
    }
  }
  
  function onResponse2(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function searchh()
  { 
    fetch("https://api.spotify.com/v1/search?type=album&q=vita vera",
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse2).then(onJson2);
  }
  
  setTimeout(searchh, 3000)
  
  function onTokenJson(json)
  {
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
  

  const client_id = '050b74b2529f4732a90c431c1b1e6c0f';
  const client_secret = '08446364621449bea945430c6c364777';
 
  let token;
 
  setTimeout(tokenSpoty, 1500)

  function tokenSpoty(){

  fetch("https://accounts.spotify.com/api/token",
      {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);

  }

/*Ho tolto dall'html tutti i nodi che facevano riferimento ai prodotti per caricarli dinamicamente,
in questo modo basta inserire il prodotto nell'array contenuto nel file Content.js per far si che appaia
sulla schermata
*/

const grid = document.querySelector('#grid')
const l = componenti.length

for(let i = 0; i < l; i++){
   const sezionee = document.createElement('div')
         sezionee.classList.add('prodotto')

   const contenutoo = document.createElement('div')
         contenutoo.classList.add('contenuto')

   const nomee = document.createElement('h1')
         nomee.classList.add('nome')
         nomee.textContent = componenti[i].Nome

   const prezzoo = document.createElement('h2')
         prezzoo.classList.add('prezzo')
         prezzoo.textContent = componenti[i].Prezzo

   const span1 = document.createElement('span')
   const span2 = document.createElement('span')

   const but1 = document.createElement('img')
         but1.classList.add('clickP')
         but1.src = 'stella_togli.jpg'

   const but2 = document.createElement('img')
         but2.classList.add('clickN')
         but2.classList.add('hidden')
         but2.src = 'stella_aggiungi.jpg'

   const descrizionee = document.createElement('p')
         descrizionee.classList.add('descrizione')
         descrizionee.classList.add('hidden')
         descrizionee.textContent = componenti[i].Descrizione

   const mDescrizionee = document.createElement('p')
         mDescrizionee.classList.add('mostra')
         mDescrizionee.textContent = 'Mostra descrizione'

   const divImg = document.createElement('div')
         divImg.classList.add('img')

   const img = document.createElement('img')
         img.classList.add('foto')
         img.src = componenti[i].Immagine

    
    span1.appendChild(but1)
    span2.appendChild(but2)
    
    divImg.appendChild(img)

    contenutoo.appendChild(nomee)
    contenutoo.appendChild(prezzoo)
    contenutoo.appendChild(span1)
    contenutoo.appendChild(span2)
    contenutoo.appendChild(descrizionee)
    contenutoo.appendChild(mDescrizionee)
    contenutoo.appendChild(divImg)

    sezionee.appendChild(contenutoo)
    grid.appendChild(sezionee)
}



/* Seleziono con querySelectorAll tutte le classi con tag .mostra,
la funzione, in base al contenuto testuale che ci sarà nel nodo di tipo p
assumerà il comportamento di nascondere o mostrare la descrizione
*/

function mostraDescrizione(event)
{
  let mostra = event.currentTarget;
  let descri = mostra.parentNode.querySelector('.descrizione')
  
  if(mostra.textContent == 'Mostra descrizione')
  {
  mostra.textContent='Nascondi Descrizione'
  descri.classList.remove('hidden')
  }
  else
    {
      mostra.textContent='Mostra descrizione'
      descri.classList.add('hidden')
    }
}


let mostra = document.querySelectorAll('.mostra')
for(m of mostra)
{
    m.addEventListener('click', mostraDescrizione);
}




/* 
Il contenuto della casella di testo, viene confrontato
con il nome di ogni prodotto, anche se il nome inserito è incompleto,
grazie al metodo indexOf. I prodotti saranno nascosti o mostrati in
base alle corrispondenze
*/


function cerca(event){
    let search = event.currentTarget
    const sezioni = document.querySelectorAll('.nome')
    for(m of sezioni){
        if(m.textContent.indexOf(search.value) == -1){
           let contenuto = m.parentNode
           let sezione = contenuto.parentNode
           sezione.classList.add('hidden')
        }else{
            let contenuto = m.parentNode
            let sezione = contenuto.parentNode
            sezione.classList.remove('hidden')
        }
    }

    
}

let search = document.querySelector('#ricerca')
search.addEventListener('keyup', cerca)






/* 
Viene creata una struttura div che contiene nodi con informazioni
sul prodotto che deve essere inserito tra i preferiti, applicando i metodi parentNode
e childNodes si ha la lista dei nodi figli che ha il prodotto che si vuole inserire tra i preferiti,
le classi di tali nodi si ciclano fino a trovare il nodo che contiene il nome, e tale nome viene inserito
nell' elemento h1 del preferito creato, stessa cosa per l'immagine, e viene inserito anche un tasto a cui viene inserito
un event listener che lo associa alla funzione di rimozione del preferito.
Inoltre viene controllato anche se la sezione preferita ha più di un figlio, in quel caso viene mostrata,
altrimenti rimane nascosta
*/ 


function prefer(event){
    const preferito = event.currentTarget.parentNode.parentNode.childNodes
    const sez = document.querySelector('#preferiti #pPreferiti')
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const img = document.createElement('img')
    const but = document.createElement('img')
    
    for(p of preferito){
        if(p.classList == 'nome'){
           h1.textContent=p.textContent
        }
    }
     
    for(p of preferito){
        if(p.classList == 'img'){
           
            img.src=p.firstChild.src
        }
    }
    
    const section = document.createElement('section')
    but.src = 'stella_aggiungi.jpg'
    but.classList.add('rimuovi')
    but.addEventListener('click', togli_preferiti)
    div.appendChild(h1)
    div.appendChild(but)
    div.appendChild(img)
    sez.appendChild(div)
    
    let pr = sez.childNodes
    
        if(pr.length > 0){
            sez.parentNode.classList.remove('hidden2')
        }
    
}

let preferiti = document.querySelectorAll('.contenuto .clickP')
for(p of preferiti){
    p.addEventListener('click', prefer)
}





/* Funzione che rimuove il preferito e controlla se la sezione preferiti
abbia zero figli, in quel caso la nasconde */


function togli_preferiti(event){
    const nascondi = event.currentTarget.parentNode
    sez_pref = nascondi.parentNode
    nascondi.remove()
    let sp = sez_pref.childNodes
    if(sp.length == 0){
        sez_pref.parentNode.classList.add('hidden2')
    }
}

