// BUDGET CONTROLLER
let budgetController = (function() {
    
    let Expense = function(id , description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id , description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            expense: [],
            income: [],
        },
        totals: {
            expense: 0,
            income: 0,
        },
    };

    return {
        addItem: function(type, des, val) {
            let newItem, Id, idLength;
            idLength = data.allItems[type].length;
            if (idLength > 0) {
                // Create new Id
                Id = data.allItems[type][idLength - 1].id + 1;
            } else {
                Id = 0;
            };
            // Create new Item based on 'expense' or 'Income'
            if (type === 'expense') {
                newItem = new Expense(Id, des, val);
            } else if (type === 'income') {
                newItem = new Income(Id, des, val);
            };
            // Push it in to our data structure;
            data.allItems[type].push(newItem);
            return newItem;
        },
    };
    
})();

// UI CONTROLLER
let uiController = (function() {

    let DomStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list', 
        expensesContainer: '.expenses__list', 
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: document.querySelector(DomStrings.inputValue).value,
            };       
        },

        addListItem: function(obj, type) {
            let html, newHtml, element;

            if (type === 'income') {
                element = DomStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'expense') {
                element = DomStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            };

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getDomStrings: function() {
            return DomStrings;
        },
    };
})();

// GLOBAL CONTROLLER
let controller= (function(budgetCtrl, uiCtrl) {

    let setupEventListeners = function() {
        let dom = uiCtrl.getDomStrings();
        document.querySelector(dom.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                ctrlAddItem();
            };
        });    
    };
    
    let ctrlAddItem = function() {
        let input = uiCtrl.getInput();
        let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        uiCtrl.addListItem(newItem, input.type);

    };

    return {
        init: function() {
            setupEventListeners();
        },
    };
   
})(budgetController, uiController);

controller.init();
