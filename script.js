const buttons = document.querySelectorAll('.button')
const buttonSelected = document.getElementsByClassName('active')
const reset = document.querySelector('#main-right #button-reset')
const inputs = document.querySelectorAll('.input')
const resultTip = document.querySelector('#result-tip')
const resultTotal = document.querySelector('#result-total')
const bill = document.querySelector('main #main-left #bill .input')
const numberOfPeople = document.querySelector(
  'main #main-left-bottom #number-people .input'
)
const errorMessage = document.querySelector('.if-zero-number')
const errorMessageNegativeBill = document.querySelector('.if-negative-bill')
const errorMessageNegativeTip = document.querySelector('.if-negative-tip')
const customTip = document.querySelector('.custom')

customTip.addEventListener('click', calculateCustomTip)

buttons.forEach((button) => {
  button.addEventListener('click', calculateTip)
})

reset.addEventListener('click', resetAll)

reset.addEventListener('mouseenter', () => {
  reset.style.backgroundColor = 'var(--lightGrayishCyan )'
})

reset.addEventListener('mouseleave', () => {
  reset.style.backgroundColor = ''
})

bill.oninput = function () {
  dealWithResetButton()

  if (bill.value < 0) {
    errorMessageNegativeBill.innerText = `can't be negative`
    errorMessageNegativeBill.style.color = 'red'
    bill.style.borderColor = 'red'
    resultTip.innerText = '----'
    resultTotal.innerText = '----'
  } else if (
    customTip.value >= 0 &&
    (numberOfPeople.value !== '' || numberOfPeople.value > 0) &&
    bill.value >= 0
  ) {
    errorMessageNegativeBill.innerText = ``
    bill.style.borderColor = ''
    calculate()
  }
}

customTip.oninput = function () {
  dealWithResetButton()

  if (customTip.value < 0) {
    errorMessageNegativeTip.innerText = `can't be negative`
    errorMessageNegativeTip.style.color = 'red'
    customTip.style.borderColor = 'red'
    resultTip.innerText = '----'
    resultTotal.innerText = '----'
  } else if (
    bill.value !== '' &&
    (numberOfPeople.value !== '' || numberOfPeople.value > 0) &&
    customTip.value >= 0
  ) {
    errorMessageNegativeTip.innerText = ``
    customTip.style.borderColor = ''
    calculate()
  }
}

numberOfPeople.oninput = function () {
  dealWithResetButton()

  if (numberOfPeople.value <= 0 || numberOfPeople.value === '') {
    errorMessage.innerText = `can't be zero or negative`
    errorMessage.style.color = 'red'
    numberOfPeople.style.borderColor = 'red'
    resultTip.innerText = '----'
    resultTotal.innerText = '----'
  } else if (customTip.value < 0 || bill.value < 0) {
    resultTip.innerText = '----'
    resultTotal.innerText = '----'
  } else {
    errorMessage.innerText = ``
    numberOfPeople.style.borderColor = ''
    calculate()
  }
}

/**
 * This function is used to calculate the total and tip per person
 */
function calculate() {
  let tipPerPerson
  let totalPerPerson
  let tipPercentage

  if (buttonSelected.length == 0) {
    tipPercentage = 0
  } else {
    if (customTip.classList.contains('active')) {
      tipPercentage = customTip.value
    } else {
      tipPercentage = buttonSelected[0].value
    }
  }

  tipPerPerson = (bill.value * tipPercentage * 0.01) / numberOfPeople.value
  totalPerPerson = bill.value / numberOfPeople.value + tipPerPerson
  tipPerPerson = tipPerPerson.toFixed(2)
  totalPerPerson = totalPerPerson.toFixed(2)

  resultTip.innerText = tipPerPerson
  resultTotal.innerText = totalPerPerson
}

/**
 * This function calculates the tip for the selected tip option
 */
function calculateTip() {
  buttons.forEach((button) => {
    button.classList.remove('active')
  })
  this.classList.add('active')
  customTip.classList.remove('active')
  calculate()
}

/**
 * This function calculates the tip for the custom tip entered by the user
 */
function calculateCustomTip() {
  buttons.forEach((button) => {
    button.classList.remove('active')
  })
  this.classList.add('active')

  if (
    bill.value !== '' &&
    (numberOfPeople.value !== '' || numberOfPeople.value > 0)
  ) {
    calculate()
  }
}

/**
 * This function is used to manage the state of reset button
 */
function dealWithResetButton() {
  if (
    customTip.value === '' &&
    bill.value === '' &&
    numberOfPeople.value === ''
  ) {
    reset.disabled = true
    reset.classList.remove('has-reset-activated')
    numberOfPeople.style.borderColor = ''
  } else {
    reset.disabled = false
    reset.classList.add('has-reset-activated')
  }
}

/**
 * This function is used to reset the fields when reset button is clicked
 */
function resetAll() {
  buttons.forEach((button) => {
    button.classList.remove('active')
  })

  inputs.forEach((input) => {
    input.value = ''
  })

  resultTip.innerText = '0.00'
  resultTotal.innerText = '0.00'

  reset.disabled = true
  errorMessage.innerText = ``
  numberOfPeople.style.borderColor = ''
  reset.classList.remove('has-reset-activated')
  reset.style.backgroundColor = ''
}
