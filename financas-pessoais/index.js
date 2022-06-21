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

    }

    submitBudgetSave() {
        let category = ''
        switch (this.budgetFormCategoryInput.value) {
            case 'salario':
                category = "Salário"
                break
            case 'comissao':
                category = "Comissão"
                break
            case 'bolsa':
                category = "Bolsa"
                break
            case 'venda':
                category = "Venda"
                break
        }

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
                value: income,
                description: this.budgetFormDescriptionInput.value,
                category: category
            }

            if (this.budgetFormDateSpanOutra.classList.contains('budget-form-date-span-outra-click') && this.budgetFormDateInput.value !== '') {
                budget.date = this.budgetFormDateInput.value
                console.log(budget.date)
            }
            this.createDiv(budget)
            let incomeInNumber = this.realToNumber(income)
            this.budgetSum += incomeInNumber
            this.updateDashboard(this.budgetSum)
// ------------------->>>>>>>>>>>>>>>Zerar valores dos inputs (valor, categoria, descrição e salário)
        }

    }

    updateDashboard(budgetSum) {
        this.incomes.textContent = this.numberToReal(budgetSum)
    }

    createDiv(budget) {
        const div = document.createElement('div')
        div.classList.add('budget-list')
        div.id = `budget-list-div${budget.id}`
        div.innerHTML = `<div class="budget-list-item-data"> <span>19/06/2022</span> </div> <div class="budget-list-item-description""> <span id="budget-item-description${budget.id}">${budget.description}</span> </div> <div class="budget-list-item-category"> <span id="budget-item-category${budget.id}">${budget.category}</span> </div> <div class="budget-list-item-value"> <span id="budget-item-value${budget.id}">R$ ${budget.value}</span> </div> <div class="budget-list-item-actions"> <i class="fa-solid fa-pencil" id="fa-pencil"> </i> <i class="fa-solid fa-trash-can" id="fa-trash-can"> </i> </div>`
        this.budgetListContainer.appendChild(div)
        this.budgetId++
    }

    realToNumber = (value) => parseFloat(value.replaceAll('.', '').replace(',', '.'))

    numberToReal(value) {
        let income = parseFloat(value)
        income = income.toFixed(2).split('.')
        income[0] = income[0].split(/(?=(?:...)*$)/).join('.')
        income = income.join(',')
        return income
    }

    removePopupVisibility() {
        this.popup.classList.remove('overlay-target')
    }

    hojeClick() {
        this.budgetFormDateSpanOutra.classList.add('budget-form-date-span-outra-off')
        this.budgetFormDateSpanOutra.classList.remove('budget-form-date-span-outra-click')
        this.budgetFormDateSpan.classList.add('budget-form-date-span-outra-click')
        this.budgetFormDateSpan.classList.remove('budget-form-date-span-outra-off')
        this.budgetFormDateInput.classList.add('budget-form-date-input')
    }

    outraClick() {
        this.budgetFormDateSpanOutra.classList.add('budget-form-date-span-outra-click')
        this.budgetFormDateSpanOutra.classList.remove('budget-form-date-span-outra-off')
        this.budgetFormDateSpan.classList.add('budget-form-date-span-outra-off')
        this.budgetFormDateSpan.classList.remove('budget-form-date-span-outra-click')
        this.budgetFormDateInput.classList.remove('budget-form-date-input')
    }

    delEditBudgetItem(event) {
        if (event.target.classList.contains('fa-pencil')) {
            this.popup.classList.add('overlay-target')
            let budgetItemID = event.target.parentElement.parentElement.id.substr(-2)
            let budgetItem = document.getElementById(`budget-item-value${budgetItemID}`)
            let budgetItemFormated = budgetItem.textContent.split(" ")
            this.budgetFormValueInput.value = budgetItemFormated[1]
        }
    }
}


function eventListeners() {
    const budgetFormSaveButton = document.getElementById("budget-form-save-button")
    const budgetFormDateSpanOutra = document.getElementById("budget-form-date-span-outra")
    const budgetFormDateSpan = document.getElementById("budget-form-date-span")
    const budgetListContainer = document.getElementById("budget-list-container")
    const closePopup = document.getElementById("closePopup")

    const ui = new UI()

    closePopup.addEventListener("click", function () {
        ui.removePopupVisibility()
    })

    budgetFormDateSpan.addEventListener("click", function () {
        ui.hojeClick()
    })

    budgetFormDateSpanOutra.addEventListener("click", function () {
        ui.outraClick()
    })

    budgetFormSaveButton.addEventListener("click", function () {
        ui.submitBudgetSave()
    })

    budgetListContainer.addEventListener("click", function (event) {
        ui.delEditBudgetItem(event)
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