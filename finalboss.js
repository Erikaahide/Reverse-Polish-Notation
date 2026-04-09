function normalizarEntrada(entrada) {
  if (typeof entrada === "string") {
    return entrada.trim().split(/\s+/);
  }

  if (Array.isArray(entrada)) {
    return entrada.map(el => String(el));
  }

  throw new Error("Formato de entrada inválido");
}

function validarExpresion(expresion) {
    if (!Array.isArray(expresion) || expresion.length === 0) {
      throw new Error("Escribe una expresión");
    }
  
    const operadores = new Set(["+", "-", "*", "/"]);
    let hayOperador = false;
  
    for (let token of expresion) {
        if (typeof token !== "string" || token.trim() === "") {
          throw new Error("Asegura valores númericos");
        }
      
        token = token.trim();
      
        // número válido
        if (!isNaN(token)) continue;
      
        if (operadores.has(token)) {
             hayOperador = true; 
             continue; 
            }
      
        // operador mal formado (ej: "++", "/++")
        if ("+-*/".includes(token[0])) {
          throw new Error("Operador inválido");
        }
      
        // recibe string no numerico
        throw new Error("Escribe unicamente valores númericos");
      }
  
    if (!hayOperador) {
      throw new Error("No contiene operadores, vuelve a intentarlo");
    }
  }


function notacionPolacaInversa(expresion) {
    const pila = [];
  
    for (let token of expresion) {
        token = token.trim();

      if (!isNaN(token)) {
        pila.push(Number(token));
      } else {
        if (pila.length < 2) {
          throw new Error("Valores insuficientes para ejecución");
        }
  
        const b = pila.pop();
        const a = pila.pop();
  
        if (token === "/" && b === 0) {
          throw new Error("Incorrecto dividir entre cero");
        }
  
        switch (token) {
          case "+": pila.push(a + b); break;
          case "-": pila.push(a - b); break;
          case "*": pila.push(a * b); break;
          case "/": pila.push(Math.trunc(a / b)); break;
        }
      }
    }
  
    if (pila.length !== 1) {
      throw new Error("No es posible ejecutar esta expresión");
    }
  
    return pila[0];
  }



  //testing para que jale throw new error
  function evaluar(expresion) {
    const normalizada = normalizarEntrada(expresion);
    validarExpresion(normalizada);
    return notacionPolacaInversa(normalizada);
  }

  function test(mensaje, expresion) {
    try {
      const res = evaluar(expresion);
      console.log(mensaje + ": " + res);
    } catch (error) {
      console.log(mensaje + ": " + error.message);
    }
  }

  
  console.log("Caso correcto: " + notacionPolacaInversa(["4", "13", "5", "/", "+"]))
  console.log("Caso correcto: " + notacionPolacaInversa(["3", "4", "+", "2", "*"]))
  console.log("Caso correcto: " + notacionPolacaInversa(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] ))
  
  test("Test Raúl", ["2", "+", "4", "+", "3", "5", "-", "*"]);
  test("Inicia con operador", ["-", "4", "+", "3", "5"]);
  test("Valores insuficientes", ["3", "+"]);
  test("Expresión inválida", ["3", "4", "+", "-", "2", "*", "+"]);
  test("División entre cero", ["4", "13", "0", "/", "+"]);
  
  test("Recibe array vacio", []);
  test("Recibe objeto vacio", {});
  test("No tiene operadores", ["10", "6", "9"]);
  test("Recibe un string", ["a"]);
  test("String en expresión", ["3", "e", "+", "2", "*"]);
  test("Recibe null", ["3", null, "+", "2", "*"]);
  test("Espacio vacío", ["3", " ", "+", "2", "*"]);
  test("Recibe arreglo", ["3", "[1, 2]", "+", "2", "*"]);
  test("Comillas vacías", [" "]);
  
  test("Recibe numeros", [4, 13, 5, "/", "+"]);
  test("Recibe cadena", "3 4 + 2 * ");
  test("Recibe cadena con comas", "3,4,+,2,*");
  
  test("Recibe dos o mas operadores repetidos", ["4", "13", "5", "/++", "+"]);
  test("Mezcla número y operador *13", ["4", "*13", "5", "/", "+"]);
  test("Mezcla número y operador 13+", ["4", "13+", "5", "/", "+"]);
  
  test("Recibe numero con tab", ["4       ", "13", "5", "/", "+"]);
  test("Recibe operador con tab", ["4       ", "13", "5", "/", "       +"]);