const body = document;
const inputEmail = document.getElementById('email');
const inputPass = document.getElementById('pass');
const messageError = document.querySelectorAll('#message-error');

const setUserinLocalStorage = (user)=>{
    localStorage.setItem('user',JSON.stringify(user));
}

const MessageError = (err)=>{
    messageError[0].innerHTML=err;
    messageError[1].innerHTML=err;
    messageError[0].classList.remove('hidden');
    messageError[1].classList.remove('hidden');
    inputEmail.style.border = 'solid red 2px';
    inputPass.style.border = 'solid red 2px';
}


const validatorLogin = (email,password)=>{
    return fetch('https://project-xlsx-backend.vercel.app/api/auth',{
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

            setUserinLocalStorage({user:data.user,token:data.token}); 
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









const redirectToDashBoard = async()=>{
    window.location.href = ('/dashboard');
}

