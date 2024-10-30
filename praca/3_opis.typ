= Opis wykorzystanych technologii oraz narzędzi

== Svelte

Svelte to otwartoźródłowy frontendowy framework języka JavaScript stworzony
przez Richa Harrisa w 2016 roku@svelte-info@svelte-license.
Cechuje się małym rozmiarem i prostotą. W porównaniu do popularnych 
frameworków tego języka - Reacta i Vue - nie jest on importowaną do projektu
biblioteką, ale kompiluje on projektowe pliki, do plików wynikowych.

== SVG.js

SVG.js to otwartoźródłowa biblioteka napisana w języku JavaScript swtorzona
przez Wouta Fierensa w 2012 roku@svgjs-info. Ma za zadanie ułatwić tworzenie
obiektów SVG i operacje na nich. Jak można zauważyć na stronie biblioteki,
rozwiązanie to jest wolniejsze@svgjs-chart, niż obsługa tego typu grafiki w kodzie,
jednak jest ona dużo przyjemniejsza i szybsza do napisania dla programisty
przez jej obiektowe podeście, a także posiada ułatwione animowanie obiektów
SVG.

== svg2pdf.js 

Svg2pdf.js jest otwartoźrodłową biblioteką Javascript, działającą także na
frontendzie. Rozwija ją niemiecka firma yWorks GmbH na licencji MIT, jednak
napisana została w 2013 przez Vitalya Puzrina@svg2pdf-info. To ona umożliwia przeniesienie
prezentacji z grafiki SVG do pliku PDF gotowego do pobrania przez użytkownika. 
W wymaganiach do działania biblioteki potrzebna jest także instalacja
biblioteki jsPDF. Wszystko odbywa się na komputerze użytkownika, bez potrzeby
używania zasobów serwera.

== npm

npm to menedżer pakietów dla języka JavaScript. Pozwala na łatwą instalację
paczek potrzebnych do skonfigurowania projektu w językach kompilowalnych do
JavaScript (TypeScript, CoffeScript itp). Wszystkie powyższe biblioteki wraz z
ich wymaganiami zostały dodane do projektu właśnie za pomocą npm. Wyszukać paczki można
na #link("https://www.npmjs.com/")[tej stronie]. 

== Vite

Vite jest narzędziem programistycznym do pomocy przy rozwoju aplikacji
internetowych. Kreator aplikacji pozwala na wybranie frameworku JavaScript z
wybranych, m. in. Svelte, od razu można dodać też obsługę języka
TypeScript, Sass, czy narzędzia do analizy kodu jak ESLint, lub obsługę testów.
Vite ma wbudowany serwer dla programisty, uruchamiany na jego maszynie, który
jest przystosowany pod tzw. "Hot reloads", czyli szybkie, automatyczne
odświeżanie, kiedy zmieni się kod źródłowy. Umożliwia to obserwowanie zmian na
żywo, bez konieczności budowania projektu, czy nawet odświeżania przeglądarki. 

== Visual Studio Code???

*Warto tutaj go dodawać?*
