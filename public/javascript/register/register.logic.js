
const register = document;

window.addEventListener('click',(e)=>{
    const sendButton =e.target.id; 
    if( sendButton !== 'frame_2'){
        return;
    }
    console.log({register})
    const inputs = register.activeElement.parentElement.parentElement.parentElement.children[0]
    const user = inputs.children[0].children[1];
    const email = inputs.children[1].children[1];
    const password = inputs.children[2].children[1];
    const verifyPass = inputs.children[3].children[1];
    AreTheFieldsFull(user.value,email.value,password.value,verifyPass.value);

});


const AreTheFieldsFull=(user,email,pass,vPass)=>{
    if(user !== "" && email !== "" && pass !== ""&& vPass !== ""){
        if(pass.length >= 8 && vPass.length >= 8){
            return verifyPass(user,email,pass,vPass);
        }else{
            console.log('Las contraseñas tienen que tener 8 caracteres');
        }
    }else{
        console.log('Completa los campos');
    };
};


const verifyPass = (user,email,pass,vPass)=>{
    const verify = pass === vPass ? true:false;
    if(!verify){
        throw new Error ('Las contraseñas no son iguales');
    }
    registerData(user,email,pass);
};


const registerData =(user,email,pass)=>{
    fetch('https://project-xlsx-backend.vercel.app/api/users/register',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name:user,
            email:email,
            password:pass,
        }),
    }).then(response=>{
        if(response.ok){
            console.log('Usuario creado');
            window.location.href = '/login/';
        }
    }).catch(err=>{
        throw new Error (`Error: ${err}`);
    });
};