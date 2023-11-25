const Frame123 = document.getElementById('frame_123');
const stockMessage = document.getElementById('message-sussefily');
const localstoageStatusAction = localStorage.getItem('status');
const titleButtonFile = document.getElementById('title-button_file');
const inputProductUpdate = document.getElementById('product_update');
const inputPriceUpdate = document.getElementById('price_update'); 
const loaderSendFile = document.getElementById('clock-loader');
const containerUpdateProducts = document.getElementById('dashboard-update_products');
const storageData = localStorage.getItem('date');
const pageLocalstorage = localStorage.getItem("page");
const page = document.getElementsByClassName('input-page_products');
const containerCard = document.getElementById('frame_85');
const buttonPage = document.getElementsByClassName('button_page_products');
const numberOfPages = document.getElementsByClassName('number-of_pages');
const buttons = document.querySelectorAll('button');
const port = 'https://project-xlsx-backend.vercel.app'
const SystemMessages =()=>{
    setTimeout(()=>{
        stockMessage.style.opacity="1"
        stockMessage.classList.remove('hidden');
        stockMessage.classList.add('animation');
    },700)
    setTimeout(()=>{
        buttons.forEach(element=>{
            element.setAttribute('disabled','');
        });
        
        
        if(stockMessage.classList.contains('animation')){
            localStorage.removeItem('status');
            stockMessage.style.opacity ="0";
            buttons.forEach(element=>{
                element.removeAttribute('disabled','');
            });
        }
    },2000)
}

if(localstoageStatusAction==='valide'){
    stockMessage.innerHTML = "Accepted action";
    stockMessage.style.background="#368136";
    SystemMessages();
}
if(localstoageStatusAction==='refused'){
    stockMessage.innerHTML = "Action rejected"
    stockMessage.style.background="red";
    SystemMessages();
}

if(pageLocalstorage){
    setTimeout(()=>{
        localStorage.removeItem('page')
    },500)
}

const sendFile = (file, iuud) => {
    console.log(iuud)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', iuud.user);
    
    fetch(`${port}/api/products/create`, {
        method: 'POST',
        body: formData,
        mode:'cors',
    }).then(response => {
        if (response.ok) {
            loaderSendFile.classList.add('hidden')
        }else{
            console.log({response})
            loaderSendFile.classList.add('hidden')
            titleButtonFile.innerHTML = "Error, solo xslx";
            setTimeout(()=>{
                titleButtonFile.innerHTML = "Add file";
            },700);
        };

        
    }).catch(err => {
        return new Error(err)
    })
}

const writeHTML = (item)=>{
    
    
    const {id,product,price} = item;
    return `
    <div id="frame_76">
        <div id="id_data" class="table_data">
            <p class="data">${id}</p>
        </div>
        <div id="names_data" class="table_data">
            <p class="data">${product}</p>
        </div>
        <div id="Trans_date" class="table_data">
            <div id="container-Trans-date">
                <p class="data">${price}</p>
                <div id="loader-delete" class="hidden">
                    <div id="clock-loader"></div>
                </div>
            </div>
        </div>
        <div id="action">
            <button id="edit">Edit</button>
            <button id="delete">Delete</button>
        </div>
    </div>`
}




const renderProducts = (products)=>{

    containerCard.innerHTML = products.map(product=>writeHTML(product))
}

const getData = async(page)=>{
    try{
        const response =await fetch(`${port}/api/products?page=${page}&limit=7`,{mode:'cors'});
        const data = await response.json();
        console.log(data)
        const isData = await data.produt.length === 0;
        if(!isData){
            numberOfPages[0].innerHTML = `${data.page}`
            return renderProducts(data.product);
        }
        return containerCard.innerHTML = `
        <div id="frame_76">
        <div id="id_data" class="table_data">
        <p class="InsertProducts">Inserte Nuevos Productos</p>
        </div>
        </div>`;
    }catch(err){
        return containerCard.innerHTML = `
        <div id="frame_76">
        <div id="id_data" class="table_data">
        <p class="InsertProducts">Ocurrio un error en la muestra de los productos</p>
        </div>
        </div>`;
    };
}

const DeleteElementeByID = (id)=>{
    fetch(`${port}/api/products/delete/${id}`,{
        method:'DELETE',
        mode:'cors',
    }).then(response=>{
        if(response.ok){
            if(Frame123.classList.contains('animation')){
                Frame123.style.opacity = "0";
            }
            setTimeout(()=>{
                localStorage.setItem('status','valide');
                location.reload();
                return true;
            },500)
        }
    }).catch(err=>{
        localStorage.setItem('status','refused');
        throw new Error(err)
    })
}


if(!pageLocalstorage){
    page[0].setAttribute('placeholder','1')
    getData(1);
}else{
    page[0].setAttribute('placeholder',String(pageLocalstorage))
    getData(pageLocalstorage);
}

window.addEventListener("click",(e)=>{
    const isButton = e.target.className !=="button_page_products";
    if(isButton){
        return;
    }
    const isPage = page[0].value ==="";
    
    if(isPage){
        throw new Error('No ha ingresado una pagina');
    }
    const valuePage = page[0].value;
    if(parseInt(valuePage)>parseInt(numberOfPages[0].innerHTML)){
        throw new Error('No existe esa pagina');
    }
    const localstoagePage = localStorage.setItem('page',valuePage);
    
    location.reload();
})

window.addEventListener("change", (e) => {

    if (e.srcElement.id !== "file_excel") {
        return;
    };
    const file = e.srcElement.files[0];
    if (storageData) {
        const object = JSON.parse(storageData)
        loaderSendFile.classList.remove('hidden');
        return sendFile(file, object);
    }
},false)

window.addEventListener("click",(e)=>{
    const deleteProducts = e.target;
    const updateProducts = e.target;
    const cancelUpdate = e.target.id;
    const saveUpdate = e.target.id;


    if(deleteProducts.id === "delete"){
        Frame123.classList.add('animation');
        const uuidProducts = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
        const loaderDelete = deleteProducts.parentElement.parentElement.children[2].children[0].children[1];
        const isHidden = loaderDelete.className === "hidden";
        if(isHidden){
            loaderDelete.className = ""
        }
        return DeleteElementeByID(parseInt(uuidProducts));
    }

    if(updateProducts.id === "edit"){
        containerUpdateProducts.classList.remove('hidden');
        const data =updateProducts.parentElement.parentElement;
        const idProducts = data.children[0].children[0].innerHTML;
        const product = data.children[1].children[0].innerHTML;
        const priceProducts = data.children[2].children[0].children[0].innerHTML;
        inputProductUpdate.setAttribute('placeholder',product);
        inputPriceUpdate.setAttribute('placeholder',priceProducts);
        localStorage.setItem('idUpdateProducts',idProducts);
    }   
    if(saveUpdate === "save-update"){
            const id = localStorage.getItem('idUpdateProducts');
            const loaderUpdateCard = document.getElementsByClassName('loader_update-card');
            const capaUpdateCard = document.getElementById('capa_update-card');

            if(id){
                // capaUpdateCard.classList.remove('hidden');
                if(inputPriceUpdate.value === "" || inputProductUpdate.value===""){
                    stockMessage.innerHTML = "Action rejected";
                    stockMessage.style.background="red";
                    SystemMessages();
                    if(loaderUpdateCard[0].classList.contains('hidden')){
                        loaderUpdateCard[0].classList.remove('hidden');
                        capaUpdateCard.classList.remove('hidden');

                        setTimeout(()=>{
                            loaderUpdateCard[0].classList.add('hidden');
                            capaUpdateCard.classList.add('hidden');

                        },500);
                    }
                    throw new Error ("No se puede actualizar, ya que no hay datos ingresados");
                }

                if(loaderUpdateCard[0].classList.contains('hidden')){
                    loaderUpdateCard[0].classList.remove('hidden');
                    capaUpdateCard.classList.remove('hidden');
                }
                
                setTimeout(()=>{
                    fetch(`${port}/api/products/update/${id}`,{
                        method:'PATCH',
                        mode:'cors',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify({
                            product:inputProductUpdate.value,
                            price:parseInt(inputPriceUpdate.value),
                        })
                    }).then(response=>{
                        if(response.ok){
                            setTimeout(()=>{
                                localStorage.setItem('status','valide');
                                location.reload();
                                return true;
                            },500)
                        }else{
                            loaderUpdateCard[0].classList.add('hidden');
                            capaUpdateCard.classList.add('hidden');
                            SystemMessages();
                            stockMessage.innerHTML = "Action rejected";
                            stockMessage.style.background="red";
                        }
                    }).catch(err=>{
                        
                        throw new Error(err);
                    });
                },1000)
            }
    }

    if(cancelUpdate === 'cancel-update'){
        containerUpdateProducts.classList.add('hidden');
        inputPriceUpdate.value = "";
        inputProductUpdate.value = "";
    }



    

},false);

// Arrastrar contendor de actualizar productos
    
    let startX, startY;
  
    const stopDrag = () => {
      // Eliminar los eventos de arrastre y suelta
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    };
  
    const drag = (e) => {
      // Calcular la nueva posición del contenedor
      const x = e.clientX - startX;
      const y = e.clientY - startY;
      if(y>526){
        y = y;
      }

  
      // Establecer la nueva posición del contenedor
      containerUpdateProducts.style.left = x + 'px';
      containerUpdateProducts.style.top = y + 'px';
    };
  
    const startDrag = (e) => {
      startX = e.clientX - containerUpdateProducts.offsetLeft;
      startY = e.clientY - containerUpdateProducts.offsetTop;
  
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
    };
  
    containerUpdateProducts.addEventListener('mousedown', startDrag,false);






