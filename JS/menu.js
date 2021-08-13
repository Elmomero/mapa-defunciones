let listElements = document.querySelectorAll('.list__button--click');
const botonHamburguesa = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

listElements.forEach(listElement => {
    listElement.addEventListener('click', ()=>{
        
        listElement.classList.toggle('arrow');

        let height = 0;
        let menu = listElement.nextElementSibling;
        if(menu.clientHeight == "0"){
            height=menu.scrollHeight;
        }

        menu.style.height = `${height}px`;

    })
});
botonHamburguesa.addEventListener('click',()=>{  
    if(!botonHamburguesa.classList.contains('is-active')){
        nav.classList.remove('ocultar');
        nav.classList.add('regresar');
        
    }else{
        nav.classList.remove('regresar');
        nav.classList.add('ocultar');
    }
    botonHamburguesa.classList.toggle('is-active');
    botonHamburguesa.classList.toggle('trasladarBtn');
})