= Podsumowanie

== Przydatność aplikacji

Aplikacja z punktu użytkownika działa poprawnie i oferuje podstawowe możliwości
tworzenia prezentacji multimedialnych takie jak wstawianie tekstu, obrazów,
animacji, czy eksport prezentacji do pliku PDF.  Rozwiązanie takie jako darmowy
kreator prezentacji być może miałby nawet możliwość odniesienia pewnego sukcesu
na rynku komercyjnym - użytkownikowi nie jest potrzebne konto, miejsce w
chmurze, czy odpowiedni system operacyjny jak w przypadku rozwiązań
konkurencyjnych, a przeglądarka obsługująca OPFS i SVG. Unika się też w ten
sposób konieczności instalacji innego programu takiego jak PowerPoint czy
LibreOffice.  Aplikacja w tej chwili może być wykorzystywana z powodzeniem do
prostych prezentacji.

== Perspektywy rozwoju

Dużą niewiadomą dla rozwoju tego typu aplikacji, jest rozwój standardu SVG 2, który ma przynieść między innymi
usprawnienia w obsłudze tekstu @text-autowrap,
jednak jego wprowadzenie jest mało prawdopodobne. Rozwijany od 2016 roku @svg2
nie doczekał się jednak wsparcia w jakiejkolwiek przeglądarce.

=== Wsparcie dla przeglądarek Safari

Obecnie cała aplikacja nie działa na przeglądarkach Safari. Powodem jest brak
wsparcia przez nie API OPFS,a konkretnie metody umożliwiającej stworzenie pliku w
OPFS. Rozwiązaniem mogłoby być przejście na API IndexedDB, lub stworzenie tzw.
service workera, które safari już wspiera. 

=== Nowe funkcje dla tekstu

Obiekt tekstowy w tej implementacji posiada tylko jeden obiekt svg, co
uniemożliwia zrobienie rzeczy do których przyzwyczaiły nas inne edytory, na
przykład z programu Microsoft PowerPoint. Nie można na przykład uzyskać w tym
samym obiekcie tekstowym innego rozmiaru czcionki, nawet dla jednej litery. 
Było by to możliwe poprzez zastosowanie dosyć skomplikowanego algorytmu dzielącego
tekst na sekcję przy użyciu obiektu SVG o nazwie tspan. Każdy taki obiekt, będący
jako dziecko obiektu text, może mieć inne właściwości, jak wielkość czcionki, kolor,
czy efekty pogrubienia, pochylenia i podkreślenia. Obecnie nie można też zaznaczać tekstu
kursorem myszy.

=== Rozwinięcie animacji dodawanych do obiektu

Aby jeszcze bardziej rozwinąć aplikację, należałoby dodać edytor animacji, w
której użytkownik, mógłby dokładnie zdefiniować jaką animację chce uzyskać na
danym obiekcie. Umożliwiłoby to tworzenie lepszych i ciekawszych prezentacji
multimedialnych, co zachęciło by potencjalnych użytkowników do jego użycia.

