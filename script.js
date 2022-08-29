
const userNameInput = document.querySelector(".yourName");

  function nameUser() {
  const user = {
    name: userNameInput.value,
  }

  const promessaLogin = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", user);

  promessaLogin.then(entraSala);
}
function entraSala(){
   
    window.location.href = "http://127.0.0.1:5500/index.html";
    
}








let mensagens = [];


function carregaMensagens(){

    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
   
 promessa.then(mostrarMensagens);

}
carregaMensagens();


function mostrarMensagens(resposta){
    
    console.log(resposta.data);
    
    
   mensagens = resposta.data;
   
   renderizarMensagens();
   
}

setInterval(carregaMensagens, 3000);



function renderizarMensagens(){

    const ul = document.querySelector('.box-msg');
    ul.innerHTML = '';
    for( let i=0 ; i < mensagens.length; i++){
        if(mensagens[i].type === "message"){
      ul.innerHTML = ul.innerHTML +
     `<li class ="cont-msg">
     <span class="hora">(${mensagens[i].time})</span>
    <span class="remetente">${mensagens[i].from}</span>
    <span class="destinatario"> <span class="to">para</span> ${mensagens[i].to}</span>
    <span class="conteudo">${mensagens[i].text}</span>
       </li>`}
       if(mensagens[i].type === "status"){
        ul.innerHTML = ul.innerHTML +
       `<li class ="cont-msg-status">
       <span class="hora">(${mensagens[i].time})</span>
      <span class="remetente">${mensagens[i].from}</span>
      <span class="conteudo">${mensagens[i].text}</span>
         </li>`}
         if(mensagens[i].type === "private_message" || mensagens[i].to ==! "Todos"){
            ul.innerHTML = ul.innerHTML +
           `<li class ="cont-msg-private">
           <span class="hora">(${mensagens[i].time})</span>
          <span class="remetente">${mensagens[i].from}</span>
          <span class="destinatario"> <span class="to">para</span> ${mensagens[i].to}</span>
          <span class="conteudo">${mensagens[i].text}</span>
             </li>`;}
       
             ul.lastChild.scrollIntoView('.box-mensagens')


             
           
    }
   
}
function msgInp(){
const mensagemEnviada = document.querySelector('.mensagem')
const participante = document.querySelector('.yourName')
const para = "Todos"
const tipo = "Pública" 

    const novaMsg = {
        from: participante.value,
        to: para,
        text: mensagemEnviada.value,
        type: tipo
    }

    const promessaMsg = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMsg)
    promessaMsg.then(carregaMensagens);
renderizarMensagens();

}
