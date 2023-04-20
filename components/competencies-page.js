const competenciesMiniListToggle = document.querySelector('.competencies__input-mini')
const competenciesForm = document.querySelector('.form__input-buttons-container')

const formButtonReset = document.querySelector('.form__input-button_type_reset')

competenciesForm.addEventListener('click', () => {
  competenciesMiniListToggle.classList.toggle('competencies__input-mini_disable')
})

formButtonReset.addEventListener('click', () => {
  competenciesMiniListToggle.classList.toggle('competencies__input-mini_disable')
})


const portfolioFiles = document.querySelector('.portfolio__files')

document.querySelector('.competencies__form').onclick = function (elem) {
  const formInputButtonClose = elem.target.closest('.form__input-button_type_close');
  if (!formInputButtonClose) {
    return
  }
  formInputButtonClose.parentElement.remove()
}

const inputCheckbox = document.querySelector('.form__checkbox')

const chipsTemplate = document.querySelector('.template').content

const chipsBlock = document.querySelector('.competencies__chips-block')

function getOrCreateChips(outerText) {
  let findItem;
  let listOfChips = document.querySelectorAll('.competencies__chips');
  for (let i = 0; i < listOfChips.length; i++) {
    if (listOfChips[i].outerText === outerText) {
      findItem = listOfChips[i];
      break
    }
  }

  if (!findItem) {
    const chipsElement = chipsTemplate.querySelector('.competencies__chips').cloneNode(true);
    chipsElement.querySelector('span').textContent = outerText;

    return chipsElement;
  } else {
    return findItem;
  }
}

document.querySelectorAll('.form__checkbox').forEach((elem) => {
  elem.addEventListener('click', (event) => {
    if (document.getElementById(event.target.id).checked) {
      chipsBlock.append(getOrCreateChips(event.target.value))
    } else {
      getOrCreateChips(event.target.value).remove()
    }
  })
})


