# Tutorial: Entendiendo Funciones 3D

## 🎯 Concepto Básico

Una función 3D tiene la forma: **z = f(x, y)**

- **x** e **y** son las coordenadas del plano (como un mapa)
- **z** es la altura en cada punto
- La función calcula qué tan alto o bajo está cada punto

**Piénsalo así:** Imagina que estás construyendo una montaña con plastilina. Para cada punto (x, y) del suelo, decides qué tan alta será la montaña en ese punto. ¡Eso es z!

---

## 📚 Nivel 1: Funciones Básicas

### 1. Plano Inclinado
```
z = x
```
**Qué hace:** A medida que x aumenta, z aumenta. Es como una rampa que sube hacia la derecha.

**Prueba también:**
- `y` - rampa que sube hacia adelante
- `x + y` - rampa diagonal
- `2*x` - rampa más empinada

### 2. Paraboloide (Cuenco)
```
z = x*x + y*y
```
**Qué hace:** Crea un cuenco perfecto. Cuanto más lejos estés del centro (0,0), más alto sube.

**Por qué:** `x*x` siempre es positivo (3×3=9, -3×-3=9), así que cualquier dirección que te muevas desde el centro, subes.

**Prueba también:**
- `x*x + 2*y*y` - cuenco ovalado (más estrecho en dirección Y)
- `-(x*x + y*y)` - cuenco invertido (boca abajo)

### 3. Silla de Montar
```
z = x*x - y*y
```
**Qué hace:** Sube en una dirección, baja en la otra. Como una silla de montar.

**Por qué:** `x*x` es positivo (sube), pero `-y*y` es negativo (baja).

---

## 🌊 Nivel 2: Funciones Ondulatorias

### 4. Onda Simple
```
z = sin(x)
```
**Qué hace:** Crea ondas que van de izquierda a derecha, como olas del mar.

**Entendiendo sin(x):**
- `sin(x)` oscila entre -1 y 1
- Completa un ciclo cada 2π ≈ 6.28 unidades
- Es la forma matemática de una onda perfecta

**Prueba también:**
- `sin(y)` - ondas de adelante hacia atrás
- `sin(2*x)` - ondas más apretadas (doble frecuencia)
- `2*sin(x)` - ondas más altas (doble amplitud)
- `sin(x + y)` - ondas diagonales

### 5. Ondas Cruzadas
```
z = sin(x) * cos(y)
```
**Qué hace:** Multiplica ondas en diferentes direcciones. Crea un patrón de cuadrícula ondulada.

**Por qué funciona:**
- `sin(x)` crea rayas verticales (ondas en X)
- `cos(y)` crea rayas horizontales (ondas en Y)
- Al multiplicarlas, ambas tienen que estar "altas" al mismo tiempo para crear picos

**Prueba también:**
- `sin(x) * sin(y)` - similar pero desfasado
- `sin(2*x) * cos(2*y)` - patrón más denso
- `sin(x) + cos(y)` - suma en lugar de multiplicar (más suave)

### 6. Ondas Concéntricas (Sombrero Mexicano)
```
z = sin(sqrt(x*x + y*y)) / sqrt(x*x + y*y)
```
**Qué hace:** Crea ondas que se expanden desde el centro, como cuando tiras una piedra al agua.

**Desglosando la fórmula:**
1. `x*x + y*y` - distancia al cuadrado desde el centro
2. `sqrt(x*x + y*y)` - distancia real al centro (radio)
3. `sin(radio)` - onda basada en qué tan lejos estás
4. `/ radio` - hace que las ondas disminuyan con la distancia

**Versión simplificada para empezar:**
- `sin(sqrt(x*x + y*y))` - solo las ondas, sin atenuación

---

## 🚀 Nivel 3: Funciones Avanzadas

### 7. Campana Gaussiana (Distribución Normal)
```
z = exp(-(x*x + y*y))
```
**Qué hace:** Crea una montaña suave que baja exponencialmente desde el centro.

**Usos:** Esta es la famosa "curva de campana" de estadística, pero en 3D.

### 8. Patrones de Interferencia
```
z = sin(5*x) * cos(5*y)
```
**Qué hace:** Ondas de alta frecuencia que crean patrones intrincados.

**Experimenta:**
- Cambia los números (5) por otros valores
- Prueba `sin(3*x) * cos(7*y)` - frecuencias diferentes

### 9. Cono
```
z = sqrt(x*x + y*y)
```
**Qué hace:** Un cono perfecto que sube desde el centro.

**Variaciones:**
- `abs(x) + abs(y)` - pirámide con lados planos
- `2*sqrt(x*x + y*y)` - cono más empinado

### 10. Combinaciones Complejas
```
z = sin(x*y)
```
**Qué hace:** Crea patrones hiperbólicos interesantes.

**Otras combinaciones creativas:**
- `cos(x*x - y*y)` - ondas en forma de silla de montar
- `sin(x) + cos(y) + sin(x*y)` - superposición de múltiples patrones
- `exp(-x*x) * sin(10*y)` - ondas que se desvanecen

---

## 🎨 Trucos y Consejos

### Operadores Básicos

| Operador | Efecto |
|----------|--------|
| `+` | Suma formas (combina superficies) |
| `-` | Resta formas (invierte o cava) |
| `*` | Multiplica (modula una por otra) |
| `/` | Divide (normaliza o escala) |
| `^` | Potencia (curvas más pronunciadas) |

### Modificadores Comunes

**Para hacer ondas más rápidas/lentas:**
- `sin(2*x)` - ondas más rápidas (alta frecuencia)
- `sin(0.5*x)` - ondas más lentas (baja frecuencia)

**Para hacer picos más altos/bajos:**
- `3*sin(x)` - triplica la altura
- `0.5*sin(x)` - mitad de altura

**Para desplazar la función:**
- `sin(x - 1)` - mueve toda la onda
- `sin(x) + 2` - levanta todo 2 unidades

**Para rotar/sesgar:**
- `sin(x + y)` - rotación diagonal
- `sin(x - y)` - rotación en otra diagonal

### Ideas para Experimentar

1. **Empieza simple:** Prueba `x`, `x*x`, `sin(x)` para entender lo básico

2. **Añade una dimensión:** Si `sin(x)` funciona, ¿qué pasa con `sin(y)`? ¿Y `sin(x) + sin(y)`?

3. **Multiplica:** La multiplicación crea interacciones. `x*y`, `sin(x)*cos(y)`

4. **Usa la distancia:** `sqrt(x*x + y*y)` es súper útil para simetría radial

5. **Combina funciones:** 
   - `sin(x*x + y*y)` - ondas concéntricas con frecuencia variable
   - `exp(-x*x) * sin(y)` - onda modulada
   - `x*x - y*y + sin(5*x)` - silla de montar con ondas

---

## 🔍 Ejercicios Prácticos

### Nivel Principiante
1. Crea una rampa que suba en diagonal
2. Haz un valle (cuenco invertido)
3. Crea ondas verticales

**Soluciones:**
```
1. x + y
2. -(x*x + y*y)
3. sin(y)
```

### Nivel Intermedio
4. Crea una "caja de huevos" (ondas en ambas direcciones)
5. Haz ondas que se expandan desde el centro
6. Crea una montaña suave en el centro

**Soluciones:**
```
4. sin(x) + sin(y)  o  cos(x) + cos(y)
5. sin(sqrt(x*x + y*y))
6. exp(-(x*x + y*y))
```

### Nivel Avanzado
7. Crea una espiral
8. Haz un patrón de pétalos
9. Combina una campana gaussiana con ondas

**Soluciones:**
```
7. sin(sqrt(x*x + y*y) + atan2(y, x)*5)
8. sin(5*atan2(y, x)) * exp(-(x*x + y*y))
9. exp(-(x*x + y*y)) * sin(10*sqrt(x*x + y*y))
```

---

## 📊 Funciones Útiles de Referencia

| Función | Qué hace | Ejemplo |
|---------|----------|---------|
| `sin(x)`, `cos(x)`, `tan(x)` | Ondas periódicas | `sin(x)` |
| `sqrt(x)` | Raíz cuadrada | `sqrt(x*x + y*y)` |
| `abs(x)` | Valor absoluto (siempre positivo) | `abs(x) + abs(y)` |
| `exp(x)` | Exponencial (e^x) | `exp(-(x*x + y*y))` |
| `log(x)` | Logaritmo natural | `log(abs(x*x + y*y))` |
| `PI` | Número π (3.14159...) | `sin(PI*x)` |
| `E` | Número e (2.71828...) | `E^(-x*x)` |

---

## 💡 Entendiendo los Controles del Visualizador

### Range (Rango)
- Controla qué tan lejos se extiende el plano X-Y
- Rango = 5 significa de -5 a +5 en ambos ejes
- **Aumenta** para ver más del patrón
- **Disminuye** para hacer zoom en el centro

### Resolution (Resolución)
- Cuántos puntos se calculan
- Más alto = más suave pero más lento
- Más bajo = más rápido pero más pixelado
- 50 es un buen equilibrio

### Color Schemes (Esquemas de Color)
- Los colores mapean la altura (valor de z)
- Ayudan a ver mejor los cambios de elevación
- Prueba diferentes esquemas para ver qué funciona mejor

---

## 🎓 Patrones Matemáticos Comunes

### Simetría Radial (desde el centro)
Cualquier función de `sqrt(x*x + y*y)` será simétrica desde el centro:
- `sqrt(x*x + y*y)` - cono
- `sin(sqrt(x*x + y*y))` - ondas concéntricas
- `exp(-sqrt(x*x + y*y))` - campana

### Simetría de Ejes
Funciones separadas en x e y:
- `sin(x) + cos(y)` - independiente en cada eje
- `x*x + y*y` - parabólico en ambas direcciones

### Patrones Hiperbólicos
Multiplicación de x e y:
- `x*y` - silla hiperbólica básica
- `sin(x*y)` - ondas hiperbólicas

---

## 🚀 Tu Turno

**Desafío final:** Intenta crear tu propia función única combinando conceptos:

1. Elige una base (plano, cuenco, ondas, o campana)
2. Añade modificaciones (multiplicadores, suma de funciones)
3. Experimenta con simetría (radial vs. axial)
4. Ajusta frecuencias y amplitudes
5. ¡Mira qué formas interesantes puedes crear!

**Ejemplo de proceso creativo:**
- Empiezo con ondas: `sin(x)`
- Añado la otra dimensión: `sin(x) + sin(y)`
- Multiplico para interacción: `sin(x) * sin(y)`
- Aumento frecuencia: `sin(3*x) * sin(3*y)`
- Añado una campana: `sin(3*x) * sin(3*y) * exp(-(x*x + y*y))`
- ¡Resultado: pattrón de ondas que se desvanece desde el centro!

---

## 📚 Recursos Adicionales

**Funciones para explorar:**
- Investiga "superficies paramétricas"
- Busca "ecuaciones de superficies famosas" (esfera, toroide, etc.)
- Mira "funciones de dos variables" en cálculo

**Aplicaciones del mundo real:**
- Topografía (mapas de elevación)
- Física (ondas, campos electromagnéticos)
- Economía (superficies de utilidad)
- Gráficos 3D (modelado de terrenos)

---

¡Ahora tienes todas las herramientas para crear visualizaciones 3D increíbles! Empieza con lo simple y ve construyendo desde ahí. **La mejor forma de aprender es experimentando.** 🎨✨
