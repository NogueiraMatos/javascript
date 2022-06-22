class UI {
    constructor() {
        this.balance = document.getElementById("balance")
        this.incomes = document.getElementById("incomes")
        this.expenses = document.getElementById("expenses")


        this.popup = document.getElementById("popup1")
        this.closePopup = document.getElementById("closePopup")
        this.popupAlert = document.getElementById("popup-alert")
        this.budgetFormValueInput = document.getElementById("budget-form-value-input")
        this.budgetFormDateSpan = document.getElementById("budget-form-date-span")
        this.budgetFormDateSpanOutra = document.getElementById("budget-form-date-span-outra")
        this.budgetFormDateInput = document.getElementById("budget-form-date-input")
        this.budgetFormDescriptionInput = document.getElementById("budget-form-description-input")
        this.budgetFormCategoryInput = document.getElementById("budget-form-category-input")
        this.budgetFormSaveButton = document.getElementById("budget-form-save-button")
        this.budgetListContainer = document.getElementById("budget-list-container")
        this.budgetListContainer = document.getElementById("budget-list-container")
        this.budgetListItemData = document.getElementById("budget-list-item-data")
        this.budgetListItemDescription = document.getElementById("budget-list-item-description")
        this.budgetListItemCategory = document.getElementById("budget-list-item-category")
        this.budgetListItemValue = document.getElementById("budget-list-item-value")
        this.faPencil = document.getElementById("fa-pencil")
        this.faTrashCan = document.getElementById("fa-trash-can")
        this.BudgetBottomSpan = document.getElementById("budget-bottom-span")
        this.budgetId = 10
        this.budgetSum = 0

        this.expensePopup = document.getElementById("popup2")
        this.expenseClosePopup = document.getElementById("expense-close-popup")
        this.expensePopupAlert = document.getElementById("expense-popup-alert")
        this.expenseFormValueInput = document.getElementById("expense-form-value-input")
        this.expenseFormDateSpan = document.getElementById("expense-form-date-span")
        this.expenseFormDateSpanOutra = document.getElementById("expense-form-date-span-outra")
        this.expenseFormDateInput = document.getElementById("expense-form-date-input")
        this.expenseFormDescriptionInput = document.getElementById("expense-form-description-input")
        this.expenseFormCategoryInput = document.getElementById("expense-form-category-input")
        this.expenseFormSaveButton = document.getElementById("expense-form-save-button")
        this.expenseListContainer = document.getElementById("expense-list-container")

        this.expenseListContainer = document.getElementById("expense-list-container")
        this.expenseListItemData = document.getElementById("expense-list-item-data")
        this.expenseListItemDescription = document.getElementById("expense-list-item-description")
        this.expenseListItemCategory = document.getElementById("expense-list-item-category")
        this.expenseListItemValue = document.getElementById("expense-list-item-value")
        this.expenseFaPencil = document.getElementById("expense-fa-pencil")
        this.expenseFaTrashCan = document.getElementById("expense-fa-trash-can")
        this.expenseBottomSpan = document.getElementById("expense-bottom-span")
        this.expenseId = 10
        this.expenseSum = 0
        this.expenseAlimentacao = 0
        this.expenseAluguel = 0
        this.expenseAgua = 0
        this.expenseLuz = 0

    }

    submitBudgetSave(budgetOrExpenses) {
        if (budgetOrExpenses === this.budgetFormSaveButton) {
            const income = this.budgetFormValueInput.value
            if (income === "" || income < 0) {
                this.popupAlert.classList.remove('popup-alert')
                this.popupAlert.classList.add('popup-alert-visible')
                setTimeout(() => {
                    this.popupAlert.classList.remove('popup-alert-visible')
                    this.popupAlert.classList.add('popup-alert')
                }, 4000);
            } else {
                let budget = {
                    id: this.budgetId,
                    budgetOrExpense: 'isBudget',
                    value: income,
                    description: this.budgetFormDescriptionInput.value,
                    category: this.budgetFormCategoryInput.value
                }
                if (this.budgetFormDateSpanOutra.classList.contains('budget-form-date-span-outra-click') && this.budgetFormDateInput.value !== '') {
                    budget.date = this.brlDate(this.budgetFormDateInput.value)
                }
                else {
                    budget.date = this.brlDate(new Date().toISOString().slice(0, 10))
                }
                this.createDiv(budget)
                let incomeInNumber = this.realToNumber(income)
                this.budgetSum += incomeInNumber
                this.updateDashboard(this.budgetSum, 'budget')

                this.budgetFormValueInput.value = ''
                this.budgetFormDescriptionInput.value = ''
                this.budgetFormCategoryInput.value = 'Salário'
            }
        } else {
            const income = this.expenseFormValueInput.value
            if (income === "" || income < 0) {
                this.expensePopupAlert.classList.remove('popup-alert')
                this.expensePopupAlert.classList.add('popup-alert-visible')
                setTimeout(() => {
                    this.expensePopupAlert.classList.remove('popup-alert-visible')
                    this.expensePopupAlert.classList.add('popup-alert')
                }, 4000);
            } else {
                let expense = {
                    id: this.expenseId,
                    budgetOrExpense: 'isExpense',
                    value: income,
                    description: this.expenseFormDescriptionInput.value,
                    category: this.expenseFormCategoryInput.value
                }

                if (this.expenseFormDateSpanOutra.classList.contains('expense-form-date-span-outra-click') && this.expenseFormDateInput.value !== '') {
                    expense.date = this.brlDate(this.expenseFormDateInput.value)
                }
                else {
                    expense.date = this.brlDate(new Date().toISOString().slice(0, 10))
                }
                this.createDiv(expense)
                let expenseInNumber = this.realToNumber(income)
                this.expenseSum += expenseInNumber
                this.updateDashboard(this.expenseSum, 'expense')
                switch (this.expenseFormCategoryInput.value) {
                    case 'Alimentação':
                        this.expenseAlimentacao += expenseInNumber
                        break
                    case 'Aluguel':
                        this.expenseAluguel += expenseInNumber
                        break
                    case 'Água':
                        this.expenseAgua += expenseInNumber
                        break
                    case 'Luz':
                        this.expenseLuz += expenseInNumber
                        break
                }
                this.expenseFormValueInput.value = ''
                this.expenseFormDescriptionInput.value = ''
                this.expenseFormCategoryInput.value = 'Alimentação'
            }
        }

    }

    brlDate = (date) => date.split('-').reverse().join('/')

    usDate = (date) => date.split('/').reverse().join('-')

    updateDashboard(modifiedValue, listName) {
        if (listName == 'budget') {
            this.incomes.textContent = this.numberToReal(modifiedValue)
            this.BudgetBottomSpan.textContent = this.numberToReal(modifiedValue)
        } else {
            this.expenses.textContent = this.numberToReal(modifiedValue)
            this.expenseBottomSpan.textContent = this.numberToReal(modifiedValue)
        }
        this.balance.textContent = this.budgetSum - this.expenseSum

    }

    createDiv(submitObject) {
        if (submitObject.budgetOrExpense === 'isBudget') {
            const div = document.createElement('div')
            div.classList.add('budget-list')
            div.id = `budget-list-div${submitObject.id}`
            div.innerHTML = `<div class="budget-list-item-data"> <span id="budget-item-date${submitObject.id}">${submitObject.date}</span> </div> <div class="budget-list-item-description""> <span id="budget-item-description${submitObject.id}">${submitObject.description}</span> </div> <div class="budget-list-item-category"> <span id="budget-item-category${submitObject.id}">${submitObject.category}</span> </div> <div class="budget-list-item-value"> <span id="budget-item-value${submitObject.id}">R$ ${submitObject.value}</span> </div> <div class="budget-list-item-actions"> <i class="fa-solid fa-pencil" id="fa-pencil"> </i> <i class="fa-solid fa-trash-can" id="fa-trash-can"> </i> </div>`
            this.budgetListContainer.appendChild(div)
            this.budgetId++
        } else {
            const div = document.createElement('div')
            div.classList.add('budget-list')
            div.id = `expense-list-div${submitObject.id}`
            div.innerHTML = `<div class="budget-list-item-data"> <span id="expense-item-date${submitObject.id}">${submitObject.date}</span> </div> <div class="budget-list-item-description""> <span id="expense-item-description${submitObject.id}">${submitObject.description}</span> </div> <div class="budget-list-item-category"> <span id="expense-item-category${submitObject.id}">${submitObject.category}</span> </div> <div class="budget-list-item-value"> <span id="expense-item-value${submitObject.id}">R$ ${submitObject.value}</span> </div> <div class="budget-list-item-actions"> <i class="fa-solid fa-pencil" id="expense-fa-pencil"> </i> <i class="fa-solid fa-trash-can" id="expense-fa-trash-can"> </i> </div>`
            this.expenseListContainer.appendChild(div)
            this.expenseId++
        }
    }

    realToNumber = (value) => parseFloat(value.replaceAll('.', '').replace(',', '.'))

    numberToReal(value) {
        let income = parseFloat(value)
        income = income.toFixed(2).split('.')
        income[0] = income[0].split(/(?=(?:...)*$)/).join('.')
        income = income.join(',')
        return income
    }

    removePopupVisibility(listName) {
        if (listName == 'budget') {
            this.popup.classList.remove('overlay-target')
            this.budgetFormDateInput.value = new Date().toISOString().slice(0, 10)
        } else {
            this.expensePopup.classList.remove('overlay-target')
            this.expenseFormDateInput.value = new Date().toISOString().slice(0, 10)
        }
    }

    hojeClick(date) {
        if (date === this.budgetFormDateSpan) {
            this.budgetFormDateSpanOutra.classList.add('budget-form-date-span-outra-off')
            this.budgetFormDateSpanOutra.classList.remove('budget-form-date-span-outra-click')
            this.budgetFormDateSpan.classList.add('budget-form-date-span-outra-click')
            this.budgetFormDateSpan.classList.remove('budget-form-date-span-outra-off')
            this.budgetFormDateInput.classList.add('budget-form-date-input')
        } else {
            this.expenseFormDateSpanOutra.classList.add('expense-form-date-span-outra-off')
            this.expenseFormDateSpanOutra.classList.remove('expense-form-date-span-outra-click')
            this.expenseFormDateSpan.classList.add('expense-form-date-span-outra-click')
            this.expenseFormDateSpan.classList.remove('expense-form-date-span-outra-off')
            this.expenseFormDateInput.classList.add('budget-form-date-input')
        }
    }

    outraClick(date) {
        if (date === this.budgetFormDateSpan || date === this.budgetFormDateSpanOutra) {
            this.budgetFormDateSpanOutra.classList.add('budget-form-date-span-outra-click')
            this.budgetFormDateSpanOutra.classList.remove('budget-form-date-span-outra-off')
            this.budgetFormDateSpan.classList.add('budget-form-date-span-outra-off')
            this.budgetFormDateSpan.classList.remove('budget-form-date-span-outra-click')
            this.budgetFormDateInput.classList.remove('budget-form-date-input')
        } else {
            this.expenseFormDateSpanOutra.classList.add('expense-form-date-span-outra-click')
            this.expenseFormDateSpanOutra.classList.remove('expense-form-date-span-outra-off')
            this.expenseFormDateSpan.classList.add('expense-form-date-span-outra-off')
            this.expenseFormDateSpan.classList.remove('expense-form-date-span-outra-click')
            this.expenseFormDateInput.classList.remove('budget-form-date-input')
        }

    }

    delEditBudgetItem(event, listName) {
        let budgetItemID = event.target.parentElement.parentElement.id.substr(-2)
        if (listName == 'budget') {
            let budgetItem = document.getElementById(`budget-item-value${budgetItemID}`)
            let budgetItemFormated = budgetItem.textContent.split(" ")
            if (event.target.classList.contains('fa-pencil')) {
                this.popup.classList.add('overlay-target')
                this.budgetFormValueInput.value = budgetItemFormated[1]
                this.budgetSum -= this.realToNumber(budgetItemFormated[1])
                this.updateDashboard(this.budgetSum, 'budget')

                this.outraClick(this.budgetFormDateSpanOutra)
                budgetItem = document.getElementById(`budget-item-date${budgetItemID}`)
                this.budgetFormDateInput.value = this.usDate(budgetItem.textContent)
                budgetItem = document.getElementById(`budget-item-description${budgetItemID}`)
                this.budgetFormDescriptionInput.value = budgetItem.textContent
                budgetItem = document.getElementById(`budget-item-category${budgetItemID}`)
                this.budgetFormCategoryInput.value = budgetItem.textContent
                this.deleteBudgetDiv(event)
            } else if (event.target.classList.contains('fa-trash-can')) {
                this.budgetSum -= this.realToNumber(budgetItemFormated[1])
                this.updateDashboard(this.budgetSum, 'budget')
                this.deleteBudgetDiv(event)
            }
        } else {
            let budgetItem = document.getElementById(`expense-item-value${budgetItemID}`)
            let budgetItemFormated = budgetItem.textContent.split(" ")
            if (event.target.classList.contains('fa-pencil')) {
                this.expensePopup.classList.add('overlay-target')
                this.expenseFormValueInput.value = budgetItemFormated[1]
                this.expenseSum -= this.realToNumber(budgetItemFormated[1])
                this.updateDashboard(this.expenseSum, 'expense')

                this.outraClick()
                budgetItem = document.getElementById(`expense-item-date${budgetItemID}`)
                this.expenseFormDateInput.value = this.usDate(budgetItem.textContent)
                budgetItem = document.getElementById(`expense-item-description${budgetItemID}`)
                this.expenseFormDescriptionInput.value = budgetItem.textContent
                budgetItem = document.getElementById(`expense-item-category${budgetItemID}`)
                this.expenseFormCategoryInput.value = budgetItem.textContent
                this.deleteBudgetDiv(event)
            } else if (event.target.classList.contains('fa-trash-can')) {
                this.budgetSum -= this.realToNumber(budgetItemFormated[1])
                this.updateDashboard(this.expenseSum, 'expense')
                this.deleteBudgetDiv(event)
            }
        }
    }

    deleteBudgetDiv(event) {
        let budgetItemID = event.target.parentElement.parentElement.id
        let budgetItem = document.getElementById(budgetItemID)
        budgetItem.remove()
    }
}

function eventListeners() {
    const budgetFormSaveButton = document.getElementById("budget-form-save-button")
    const budgetFormDateSpanOutra = document.getElementById("budget-form-date-span-outra")
    const budgetFormDateSpan = document.getElementById("budget-form-date-span")
    const budgetListContainer = document.getElementById("budget-list-container")
    const closePopup = document.getElementById("closePopup")

    const expenseFormSaveButton = document.getElementById("expense-form-save-button")
    const expenseFormDateSpanOutra = document.getElementById("expense-form-date-span-outra")
    const expenseFormDateSpan = document.getElementById("expense-form-date-span")
    const expenseListContainer = document.getElementById("expense-list-container")
    const expenseClosePopup = document.getElementById("expense-close-popup")

    const ui = new UI()

    closePopup.addEventListener("click", function () {
        ui.removePopupVisibility('budget')
    })

    budgetFormDateSpan.addEventListener("click", function () {
        ui.hojeClick(budgetFormDateSpan)
    })

    budgetFormDateSpanOutra.addEventListener("click", function () {
        ui.outraClick(budgetFormDateSpanOutra)
    })

    budgetFormSaveButton.addEventListener("click", function () {
        ui.submitBudgetSave(budgetFormSaveButton)
    })

    budgetListContainer.addEventListener("click", function (event) {
        ui.delEditBudgetItem(event, 'budget')
    })


    expenseClosePopup.addEventListener("click", function () {
        ui.removePopupVisibility('expense')
    })

    expenseFormDateSpan.addEventListener("click", function () {
        ui.hojeClick(expenseFormDateSpan)
    })

    expenseFormDateSpanOutra.addEventListener("click", function () {
        ui.outraClick(expenseFormDateSpanOutra)
    })

    expenseFormSaveButton.addEventListener("click", function () {
        ui.submitBudgetSave(expenseFormSaveButton)
    })

    expenseListContainer.addEventListener("click", function (event) {
        ui.delEditBudgetItem(event, 'expense')
    })
}

document.addEventListener("DOMContentLoaded", function () {
    eventListeners()
})


// mascaraMoeda by Codepen
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

function mascaraMoeda(campo, evento) {
    var tecla = (!evento) ? window.event.keyCode : evento.which;
    var valor = campo.value.replace(/[^\d]+/gi, '').reverse();
    var resultado = "";
    var mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
}