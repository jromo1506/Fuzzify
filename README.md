# Angular Fuzzy Comfort App

## Descripción
Aplicación Angular para evaluar el nivel de confort térmico de una habitación usando lógica difusa basada en tres parámetros: temperatura, humedad y velocidad del viento.

---

## Requisitos Previos
- Node.js v16+ instalado
- Angular CLI instalado globalmente (`npm install -g @angular/cli`)
- Docker instalado
- Git (opcional)

---

## Instalación

1. Clona el repositorio:
git clone https://github.com/jromo1506/Fuzzify.git
cd angular-fuzzy-comfort

2. Instala dependencias:
npm install

3. Levanta la aplicación:
ng serve

Abre en el navegador: http://localhost:4200

---

## Uso

- Ajusta los sliders de Temperatura, Humedad y Viento.
- El nivel de confort se calcula automáticamente.
- Resultados se muestran en el componente de visualización.
- Puedes guardar resultados en la tabla.

---

## Testing

Ejecuta pruebas unitarias con cobertura:
ng test --code-coverage

---

## Docker

1. Construye la imagen:
docker build -t angular-fuzzy .

2. Ejecuta el contenedor:
docker run -d -p 8080:80 angular-fuzzy

---

## Estructura del proyecto

- src/app/input-sensor/ - Entrada de datos
- src/app/fuzzy-evaluator/ - Lógica difusa
- src/app/comfort-display/ - Visualización resultados
- Servicios para comunicación
