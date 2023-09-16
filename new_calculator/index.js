class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear();
    }
    clear(){
        this.previousOperand=''
        this.currentOperand=''
        this.operation=undefined
    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString()+number.toString()

    }
    choseOperation(operation){
        if(this.currentOperand==='') return;
        if(this.previousOperand!=''){
            this.compute()
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand=''

    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    compute(){
        let computation;
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation=prev+current;
                break;
            case '×':
                computation=prev*current;
                break;
            case '-':
                computation=prev-current;
                break;
            case '÷':
                computation=prev/current;
                break;
            case '/':
                computation=prev/current;
                break;
        
            default:
                break;
        }

        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand=''
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand
        if(this.operation!=null){
            this.previousOperandTextElement.innerText=`${this.previousOperand} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText=""
        }

    }

}
const numberButtons=document.querySelectorAll('[data-number-button')
const operationButtons=document.querySelectorAll('[data-operation-button]')
const clearButton=document.querySelector('[data-allDelete-button]')
const deleteButton=document.querySelector('[data-delete-button')
const equalButton=document.querySelector('[data-equal-button]')
const previousOperandTextElement=document.querySelector('[data-previous-text]')
const currentOperandTextElement=document.querySelector('[data-current-text]')


const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.choseOperation(button.innerHTML)
        calculator.updateDisplay();
    })
})
clearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})

equalButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})

window.addEventListener('keydown',(e)=>{
   const number=["1","2","3","4","5","6","7","8","9",".","0"]
   const operator=["-","+","/","*",]
   const equal=['=','Enter'];
   const back='Backspace'
   const allClear='Delete'
   if(number.includes(e.key)){
    calculator.appendNumber(e.key);
    calculator.updateDisplay()
   }
   if(operator.includes(e.key)){
    calculator.choseOperation(e.key)
    calculator.updateDisplay();
   }
   if(equal.includes(e.key)){
    calculator.compute();
    calculator.updateDisplay();
   }
   if(e.key===back){
    calculator.delete();
    calculator.updateDisplay();
   }
   if(e.key===allClear){
    calculator.clear()
    calculator.updateDisplay()
   }
})