const portfolio = document.querySelector('.portfolio')
const portfolioSet = portfolio.querySelectorAll('.portfolio__files')
const formInput = portfolio.querySelectorAll('.form__input')

document.querySelector('.portfolio__set').onclick = function (elem) {
  const trashButton = elem.target.closest('.portfolio__preview-icon_trash');
  if (!trashButton){
    return
  }
  trashButton.parentElement.remove()
}
