const closeButton = document.querySelector('.close');
const modal = document.querySelector('.modal');

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});