// funcion main con la logica despues defino testing con console.log
// objetivo recibir un log adecuado a cada validación 

function evaluarExpresion(str) {
    if (str.trim() === "") {
      console.error("Escribe una expresión");
      return;
    }
  
    try {
      const resultado = notacionPolacaInversa(tokens);
      console.log("Resultado:", resultado);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  function notacionPolacaInversa(expresion) {
      const pila = [];
    
      for (let token of expresion) {
        if (!isNaN(token)) {
          pila.push(Number(token));
        } else {
          if (pila.length < 2) {
            console.log("Expresión inválida: faltan operandos");
          }
          
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
    
      if (pila.length !== 1) {
        console.log("Expresión inválida");
      }
    
      return pila.pop();
    }
  
  
  console.log("Caso correcto: " + notacionPolacaInversa(["4", "13", "5", "/", "+"]))
  // 6  (4 + (13 / 5))
  console.log("Caso correcto: " + notacionPolacaInversa(["3", "4", "+", "2", "*"]))
  // 14
  console.log("Caso correcto: " + notacionPolacaInversa(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] ))
  // 22
  console.log("No tiene operadores: " + notacionPolacaInversa(["10", "6", "9",] ))
  // No contiene operadores, vulve a intentarlo
  console.log("División entre cero: " + notacionPolacaInversa(["4", "13", "0", "/", "+"]))
  // Incorrecto dividir entre cero
  console.log("Recibe un string: " + notacionPolacaInversa(["a"] ))
  // Escribe valores númericos
  console.log("Recibe un string entre la expresión: " + notacionPolacaInversa(["3", "e", "+", "2", "*"]))
  // Escribe unicamente valores númericos
  console.log("Recibe null: " + notacionPolacaInversa(["3", "null", "+", "2", "*"]))
  // Define valores númericos
  console.log("Recibe un espacio vacio entre la expresión: " + notacionPolacaInversa(["3", " ", "+", "2", "*"]))
  // Asegura valores númericos
  console.log("Recibe comillas vacias: " + notacionPolacaInversa([" "]))
  // Escribe una expresión 
  console.log("Recibe numeros insuficientes para ejecutar: " + notacionPolacaInversa(["3", "+"]))
  // Valores insuficientes para ejecucuión
  console.log("Recibe numeros expresiones invalidas: " + notacionPolacaInversa(["3", "4", "+", "-", "2", "*", "+"]))
  // No es posible ejecutar esta expresión 