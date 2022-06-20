class UI {
    constructor() {
        this.balance = document.getElementById("balance")
        this.incomes = document.getElementById("incomes")
        this.expenses = document.getElementById("expenses")

        
        this.popupAlert = document.getElementById("popup-alert")
        this.budgetFormValueInput = document.getElementById("budget-form-value-input")
        this.budgetFormDateSpan = document.getElementById("budget-form-date-span")
        this.outra = document.getElementById("outra")
        console.log(outra)
        this.budgetFormDateInput = document.getElementById("budget-form-date-input")
        this.budgetFormDescriptionInput = document.getElementById("budget-form-description-input")
        this.budgetFormCategoryInput = document.getElementById("budget-form-category-input")
        this.budgetFormSaveButton = document.getElementById("budget-form-save-button")

        this.budgetListContainer = document.getElementById("budget-list-container")
        this.budgetListItemData = document.getElementById("budget-list-item-data")
        this.budgetListItemDescription = document.getElementById("budget-list-item-description")
        this.budgetListItemCategory = document.getElementById("budget-list-item-category")
        this.budgetListItemValue = document.getElementById("budget-list-item-value")
        this.faPencil = document.getElementById("fa-pencil")
        this.faTrashCan = document.getElementById("fa-trash-can")
        this.BudgetBottomSpan = document.getElementById("budget-bottom-span")

    }

    submitBudgetSave() {
        //this.incomes.textContent = this.budgetFormValueInput.value
        const income = this.budgetFormValueInput.value
        const self = this
        if (income === "" || income < 0) {
            this.popupAlert.classList.remove('popup-alert')
            this.popupAlert.classList.add('popup-alert-visible')
            setTimeout(() => {
                this.popupAlert.classList.remove('popup-alert-visible')
                this.popupAlert.classList.add('popup-alert')
            }, 4000);
        } else {
            const div = document.createElement('div')
            div.classList.add('budget-list')
            div.innerHTML = '<div class="budget-list-item-data" id="budget-list-item-data"> <span>19/06/2022</span> </div> <div class="budget-list-item-description" id="budget-list-item-description"> <span>Salário</span> </div> <div class="budget-list-item-category" id="budget-list-item-category"> <span>TST</span> </div> <div class="budget-list-item-value" id="budget-list-item-value"> <span>R$ 7.000,00</span> </div> <div class="budget-list-item-actions"> <i class="fa-solid fa-pencil" id="fa-pencil"> </i> <i class="fa-solid fa-trash-can" id="fa-trash-can"> </i> </div>'
            this.budgetListContainer.appendChild(div)
            console.log('hello')
        }
    }

    outraClick() {
        this.outra.classList.remove('budget-form-date-span-outra-off')
        this.outra.classList.add('budget-form-date-span-outra-click')
    }    
}


function eventListeners() {
    const budgetFormSaveButton = document.getElementById("budget-form-save-button")

    const ui = new UI()

    budgetFormSaveButton.addEventListener("click", function() {
        ui.submitBudgetSave()
    })

    outra.addEventListener("click", function() {
        ui.outraClick()
    })
}

document.addEventListener("DOMContentLoaded", function () {
    eventListeners()
})