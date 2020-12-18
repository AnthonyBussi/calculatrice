class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() // cette ligne appelle la fonction clear, pour tout initialiser à 0 au lancement de la calculatrice
    }

    clear() { // on met tout à 0 grâce à cette fonction
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // on converti en chaine, et on supprime le dernier élément
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return // on vérifie s'il n'y a pas déjà une virgule, si c'est le cas, la valeur affichée restera inchangée
        this.currentOperand = this.currentOperand.toString() + number.toString() // On converti en chaine de caractère, sinon Javascript va adidtionner les 2 nombres (ex : 1+1 va donner 2, alors qu'on veut que 1+1=11)
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) // on reconverti en nombre car on avait converti en chaine plus tôt
        const current = parseFloat(this.currentOperand) // on reconverti en nombre car on avait converti en chaine plus tôt
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+' :
                computation = prev + current;
                break;
            case '-' :
                computation = prev - current;
                break;
            case '*' :
                computation = prev * current;
                break;
            case '/' :
                computation = prev / current;
                break;
            default : return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` // on concatène le previousOperand et l'opération choisie
        } else {
            this.previousOperandTextElement.innerText = '' // la valeur du premier nombre du calcul va passer en haut, et on pourra taper le deuxième nombre de l'opération
        }
    }
}


// On sélectionne tout les éléments
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => { // pour chaque bouton, on ajoute un évenement au click
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay() // on enregistre le nombre sur lequel on clique et on actualise l'affichage pour qu'il s'affiche
    })
})

operationButtons.forEach(button => { // pour chaque bouton, on ajoute un évenement au click
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() // on enregistre le nombre sur lequel on clique et on actualise l'affichage pour qu'il s'affiche
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})