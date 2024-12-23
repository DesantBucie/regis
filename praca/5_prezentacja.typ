= Prezentacja projektu

== Edytor

Edytor jest najważniejszą i najbardziej skomplikowaną częścią projektu,
ponieważ musi on pozwolić użytkownikowi na łatwe i intuicyjne tworzenie treści
w programie, oraz przetłumaczyć je na język komputera, aby dane mogły zostać
zapisane do pliku i tak pobrane i odtworzone na dowolnym innym urządzeniu.


#figure(
  image("pictures/editor1.png", width: 100%),
  caption: [Widok edytora po wejściu do aplikacji]
)
Na samej górze widoczny jest pasek zadań podzielony na trzy części: dotyczącą
obiektów, slajdu i całego pliku. Zaczynając od lewej do slajdu użytkownik może
dodać rzeczy niezbędne w prezentacji multimedialnej: pole tekstowe, dzięki
któremu można dodać tekst do naszego slajdu, kształt SVG, predefiniowany lub
swój własny (stworzony w użytkownika w zewnętrznym programie i wyeskportowany
jako ścieżka SVG), oraz zdjęcia, które można załadować bezpośrednio z dysku
danego komputera. Następnie oddzielony przerwą jest wybierak koloru slajdu.
Należy jednak zauważyć, że kolor tła slajdów działa tylko we wbudowanej
przeglądarce slajdów, ale nie są wspierane przez eksport do PDF.

W kolejnej części górnego paska dostępne są trzy kolejne opcje: opcja
pobierania pliku prezentacji w z rozszerzeniem .regis, opcja przejrzenia
prezentacji użytkownika we wbudowanej przeglądarce slajdów online i opcja
wygenerowania i pobrania pliku PDF, który możemy odtworzyć na praktycznie
każdym urządzeniu bez dostępu do internetu.

#figure(
  image("pictures/editor2.png", width: 50%),
  caption: [Okno nazwy pobieranego pliku]
)

Po wybraniu opcji pobrania użytkownik zostanie poproszony o podanie nazwy
pliku, który ma zostać zapisany na dysku komputera. W tym celu pojawia się
okienko dialogowe, w którym należy wpisać preferowaną nazwę pliku. Po
zatwierdzeniu przyciskiem "OK", plik zostaje pobrany na dysk użytkownika. Brak
wpisania nazwy, lub naciśniecię przycisku "Cancel" spowoduje anulowanie
pobierania prezentacji. Wybranie przycisku Viewer automatycznie zapisze postępy
pracy w prezentacji i przeniesie użytkownika do przeglądarki prezentacji, w
której będzie można wyświetlić dany projekt w tym animacje, które zostały
dodane do obiektów.  Ostatnia opcja również zapisze postępy pracy i
wyeksportuje prezentację do pliku PDF. Możliwe jest to dzięki bibliotece svg2pdf.js.

#figure(
  image("pictures/editor3.png", width: 100%),
  caption: [Pobrany plik prezentacji]
)

Po lewej stronie na szarym tle znajduje się panel slajdów, który pozwala na
zarządzanie całą strukturą prezentacji. W tym miejscu znajdą się wszystkie
slajdy w projekcie, ułożone od góry do dołu, jak w konkurencyjnych
rozwiązaniach. Zaznaczony przez użytkownika slajd jest podświetlony na kolor
różowy co wyróżnia go z pośród reszty, która jest w kolorze jasnogranatowym.
Każdy slajd można usunąć klikając czerwony krzyżyk umieszczony w prawym górym
rogu każdego slajdu, a zaznaczony slajd można przenieść w projekcie wyżej lub
niżej przyciskami ze strzałkami co odpowiada pierwszeństwu w wyświetlaniu.
Ponadto każdy slajd ma nazwę w zależności od typu szablonu, który został
wybrany przy jego tworzeniu. Na samym dole panelu znajduje się szary przycisk
z podpisem "Add slide" służący do dodania slajdu. Po jego naciśnięciu rozwija
się lista slajdów z szablonów: pusty, tytułowy, zawartości, sekcja i obrazek.
Jest to dość prosty ale skuteczny system szablonów, który ułatwi użytkownikowi
przystosowanie danego slajdu na swoje potrzeby, bez konieczności tworzenia
wszystkiego za każdym razem od nowa. Po dodaniu slajdu, pojawia się on z nazwą
szablonu (na przykład Image Slide) na pasku.

#figure(
  image("pictures/editor5.png", width: 30%),
  caption: [Panel slajdów]
)

Dodając do slajdu zdjęcie z dysku za pomocą przycisku Image wyświetli się
systemowe okno wyboru pliku. Dla mniej obeznanego z technologią użytkownika
ważne jest, że nie da się wybrać pliku, który nie jest zdjęciem - podświetlone
są tylko te z odpowiednimi rozszerzeniami, a inne formaty nie będą
zaakceptowane.  Zdjęcia mają najmniej opcji edycji ze wszystkich obiektów,
można je tylko przenieść w przód, lub w tył, dodać do nich animacje, oraz
usunąć. 

Dodając kształt SVG dostępne jest więcej opcji personalizacji obiektu. Dostępna
jest zmiana koloru obwódki, który zmieniamy używając próbnika kolorów
wbudowanego w przeglądarkę (Chrome) lub system operacyjny (Safari, Firefox),
aktualizacja jej grubości w 4 różnych wariantach od poziomu 0 (brak obwórdki)
do poziomiu 4(największa grubość). Tak samo możliwa jest też zmiana koloru
wypełnienia kształtu, również używając tego samego próbnika dostępnego z
przeglądarki. Warto wspomnieć, że próbniki te mogą przyjmować także wartości
HEX, czy RGBA.  Ostatnią opcją, którą także można zmieniać jest przeźroczystość
obiektu od 1 do 0 (z dokładnością do 0.01), gdzie 1 oznacza brak
przeźroczystości a 0 oznacza brak widocznego obiektu.

#figure(
  image("pictures/editor4.png", width: 100%),
  caption: [Zaznaczony tekst i opcje jego edycji powyżej]
)
Najwięcej opcji edycji ma obiekt pola tekstowego - Textbox. Poza wcześniej
wymienioną zmianą koloru i przeźroczystości, użytkownicy mają do dyspozycji
pogrubienie tekstu, kursywę, podkreślenie tekstu, ustawienie go do lewej,
środka i prawej strony pola, wybór czcionki z kilku dostępnych w polu typu
select, oraz jej wielkość.

Te podstawowe funkcje edycji są najczęściej wykorzystywane przez użytkowników i
powinny w zupełności wystarczyć do stworzenia profesjonalnej i estetycznej
prezentacji. Edytor zapewnia więc dużą swobodę tworzenia, a jednocześnie jest
na tyle prosty, że nie potrzeba nauki, czy poradników by z niego korzystać, jak
jest to często w przypadku konkurencyjnych rozwiązań.


== Przeglądarka slajdów



== Eksport do formatu PDF
