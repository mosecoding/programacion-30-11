// Función para sumar dos números
const sumar = (a: number, b: number): number => {
    return a + b;
};

// Llamada correcta
console.log("Suma correcta:", sumar(5, 10)); // Salida esperada: Suma correcta: 15

// Llamada con error intencional
// TypeScript marcará un error aquí porque se pasa una cadena en lugar de un número
console.log("Prueba de error:", sumar(5, "10")); // Esto genera un error en tiempo de compilación
