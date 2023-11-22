const body = document;
const inputEmail = document.getElementById('email');
const inputPass = document.getElementById('pass');
const messageError = document.querySelectorAll('#message-error');

const MessageError = (err)=>{
        messageError[0].innerHTML=err;
        messageError[1].innerHTML=err;
        messageError[0].classList.remove('hidden');
        messageError[1].classList.remove('hidden');
        inputEmail.style.border = 'solid red 2px';
        inputPass.style.border = 'solid red 2px';
}
window.addEventListener("click",(e)=>{
    const button = e.target.id;
    if(button !== 'frame_2'){
        return;
    };
    const login = body.activeElement.parentNode.parentNode.parentNode.childNodes[1];
    const email = login.children[0].children[1];
    const password = login.children[1].children[1];

    if(email.value === "" && password.value ===""){
        return MessageError('Completa el campo');
    }

    validatorLogin(email,password); 

});

const validatorLogin = (email,password)=>{
    return fetch('https://project-xlsx-backend.vercel.app/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value,
        })
    }).then(response=>{
        if(response.ok){
            email.value = "";
            password.value = "";
            return response.json();
        }else{
            throw new Error(`Error en la solicitud ${response.statusText}`);
        };
    }).then(data=>{
        const token = data.token;
        const user = data.user;
        if(token){

            setTokenInCookie(token);
            setUserinLocalStorage(user); 
            messageError[1].innerHTML='Acccount valide';
            messageError[0].classList.add('hidden');
            messageError[1].classList.remove('hidden');
            messageError[1].style.color = "var(--green-check-account)"
            inputEmail.style.border = 'solid var(--green-check-account) 2px';
            inputPass.style.border = 'solid var(--green-check-account) 2px';
            setTimeout(()=>{
                redirectToDashBoard();
            },1000)
        }else {
            throw new Error('No se recibió un token en la respuesta');
        }
    }).catch(err=>{
        return MessageError('cuenta invalida');
    });
};


const setTokenInCookie = (token)=>{
    const expirationDate = new Date(); 
    expirationDate.setMinutes(expirationDate.getMinutes()+15);
    document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; `;
    return getTokenFromCookie();
};

const setUserinLocalStorage = (user)=>{
    localStorage.setItem('user',JSON.stringify(user));
}

const getTokenFromCookie = ()=>{
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++){
        const cookie = cookies[i].trim();
        if(cookie.startsWith('token=')){
            return cookie.substring('token='.length);
        }
    }
}

const redirectToDashBoard = async()=>{
    const token = getTokenFromCookie();
    if(token){
        const response = await fetch(`https://project-xlsx-backend.vercel.app/api/dashboard `,{
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type':'Application/json',
                'token':token
            },
        });
        if(!response.ok){
            console.log('hola',token)
            return
        }

        if(response){
            window.location.href = ('/dashboard');
        }
        return
    }
}

