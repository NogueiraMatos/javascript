class UI {
    constructor() {
        this.balance = document.getElementById("balance")
        this.incomes = document.getElementById("incomes")
        this.expenses = document.getElementById("expenses")
        this.budgetFormValueInput = document.getElementById("budget-form-value-input")
        this.budgetFormDateSpan = document.getElementById("budget-form-date-span")
        this.budgetFormDateSpanOutra = document.getElementById("budget-form-date-span-outra")
        this.budgetFormDateInput = document.getElementById("budget-form-date-input")
        this.budgetFormDescriptionInput = document.getElementById("budget-form-description-input")
        this.budgetFormCategoryInput = document.getElementById("budget-form-category-input")
        this.incomesSave = document.getElementById("incomes-save")
    }

    submitBudgetSave() {
        console.log(this.budgetSave)
    }
}

function eventListeners() {
    const ui = new UI()
    ui.submitBudgetSave()
}

document.addEventListener("DOMContentLoaded", function() {
    eventListeners()
})