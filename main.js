const input = document.getElementById("userInput");
const btn = document.getElementById("btnCalculate");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
    const value = input.value.trim();
  
    if (value === "") {
      console.error("Escribe una expresión");
      return;
    }
  
    // convertir string a un array
    const tokens = value.split(" ");
  
    try {
      const resultado = notacionPolacaInversa(tokens);
      result.textContent = resultado;
    } catch (error) {
      console.error(error.message);
    }
  
    input.value = "";
  });

function notacionPolacaInversa(expresion) {
    const pila = [];
  
    for (let token of expresion) {
      if (!isNaN(token)) {
        pila.push(Number(token));
      } else {
        const b = pila.pop();
        const a = pila.pop();
  
        switch (token) {
          case '+':
            pila.push(a + b);
            break;
          case '-':
            pila.push(a - b);
            break;
          case '*':
            pila.push(a * b);
            break;
          case '/':
            pila.push(Math.trunc(a / b));
            break;
        }
      }
    }
  
    return pila.pop();
  }


console.log(notacionPolacaInversa(["4", "13", "5", "/", "+"]))
// 6  (4 + (13 / 5))
console.log(notacionPolacaInversa(["3", "4", "+", "2", "*"]))
// 14
console.log(notacionPolacaInversa(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] ))
// 22