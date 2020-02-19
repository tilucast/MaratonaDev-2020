const buttonCta = document.querySelector('#ajudarBtn');
const form = document.querySelector('.form');

buttonCta.addEventListener('click', () =>{
    form.classList.toggle('hide');
})