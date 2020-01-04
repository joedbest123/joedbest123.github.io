const Element = identifier => document.querySelector(`${identifier}`);
const calcContainer = Element('.calculator-container')
const displayInput = Element('.display-comp');
const displayResult = Element('.result');
const buttons = Element('.keys');

buttons.addEventListener('click', handleClick, true);

function handleClick(e){
  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const data = displayInput.textContent;
  const data1 = parseFloat(data);
  const data2 = parseFloat(data.slice(String(data1).length+1));
  const operator = data.slice(String(data1).length, String(data1).length+1);
  const previousKeyType = calcContainer.dataset.previousKeyType;
  const answer = displayResult.textContent;
  if(key.matches('button')){
    if(!action){
      calcContainer.dataset.previousKeyType = 'number';
      if(data === '0' || previousKeyType === 'equality'){
        displayInput.textContent = keyContent;
      }else {
        displayInput.textContent = data + keyContent;
      }
    }

    if(
      action === 'add' ||
      action === 'minus' ||
      action === 'divide' ||
      action === 'multiply'
      ){
        calcContainer.dataset.previousKeyType = 'operator';
        if(previousKeyType === 'operator'){
          displayInput.textContent = data;
        }
        else if (
           previousKeyType === 'number' ||
           previousKeyType === 'decimal')
         {
           displayInput.textContent = data + key.value;
         } else if (previousKeyType === 'equality'){
           displayInput.textContent = answer + key.value;
         } else if (previousKeyType === 'percent'){
          displayInput.textContent = data;
         }
      }

    if(action === "point"){
      calcContainer.dataset.previousKeyType = 'decimal';
      displayInput.textContent = data + key.value;
    }
    
    
    if(action === "clear-one"){
      displayInput.textContent =  displayInput.textContent.slice(0, displayInput.textContent.length-1);
    } 
    if(action === "clear-everything"){
      displayInput.textContent = '';
      displayResult.textContent = '0';
    }  
    if(action === "percent"){
      calcContainer.dataset.previousKeyType = 'percent';
      displayInput.textContent = data + keyContent;
    }  
    if(String(data).length > 10){
      displayInput.classList.add('small');
    }else if(displayInput.textContent == ''&&
          displayResult.textContent == '0'){
          displayInput.classList.remove('small');
    }
    if(String(data).length >= 36){
      displayInput.classList.remove('small');
      displayInput.classList.add('smaller');
    };

    if(action === "equality"){
      calcContainer.dataset.previousKeyType = 'equality';
      if(String(displayResult).length > 10){
        displayResult.classList.add('smaller');
      }else if(displayInput.textContent == ''&&
      displayResult.textContent == '0'){
      displayInput.classList.remove('smaller')};
     displayResult.textContent = calculation(data1, data2, operator);
    }
  }
}

function calculation (n1, n2, operator){
  if(operator === '*'){
    return n1 * n2;
  }else if(operator === '/'){
    return n1 / n2;
  }else if(operator === '+'){
    return n1 + n2;
  }else if(operator === '-'){
    return n1 - n2;
  }else if(operator === '%'){
    return (n1/parseFloat(100))*n2;
  }else return n1;
}