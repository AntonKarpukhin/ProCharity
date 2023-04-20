const portfolioSet = document.querySelectorAll('.portfolio__files')

document.querySelector('.portfolio__set').onclick = function (elem) {
  const trashButton = elem.target.closest('.portfolio__preview-icon_trash');
  if (!trashButton){
    return
  }
  trashButton.parentElement.remove()
}

