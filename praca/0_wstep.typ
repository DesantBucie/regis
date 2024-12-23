= Wstęp

Prezentacje multimedialne są dzisiaj nieodłączną częścią dzisiejszego świata.
Zobaczymy je podczas spotkań biznesowych i spotkań zarządu firm, konferencjach,
szkoleniach dla pracowników, a wszystko po to by w bardziej przystępny sposób
przedstawić słuchającym zagadnienie.

Już w latach 40. Armia USA zaadaptowała grafoskopy - projektory działające na
zasadzie poświetlania diapozytu, obrazu naniesionego na przeźroczysty materiał,
i przenoszącego go przez soczewki i lustra na powierzchnię ściany czy ekranu
projekcyjnego. Wszytko to po to, by lepiej przygotowywać swoich żółnierzy do
walki w bardziej przystępny i łatwiejszy do zrozumienia sposób. W późniejszym
czasie zaczęli je używać także nauczyciele akademiccy,@tertiary a kilka lat
później, rzutniki pisma zaczęto używać w amerykańskich firmach.@overhead-usage 

Początkowo slajdy do tego typu projektorów tworzono najczęściej ręcznie, pisząc
na specjalnej folii (ang. carbon film) metalowym rysikiem, czasami z pomocą
szablonów liter, cyfr i kształtów, lub używając do tego zwykłej maszyny do
pisania.@handmade-ohp Można było także wkleić zdjęcia, na przykład z gazety, z
pomocą kleju kauczukowego, wody i zdjęcia przyklejonego do folii.@handmade-ohp
Było więc to zadanie bardzo żmudne i wymagające sporej precyzji przy tworzeniu.

#figure(
  image("pictures/overhead.jpg", width: 80%),
  caption: [ Grafoskop używany na Uniwerstyecie North Carolina, lata 60.@overhead-projector-img ]
)

W tym samym okresie popularne były też rzutniki przeźrocze - diaskopy,
najczęściej na film typu 135. Najbardziej znane na świecie są rzutniki Kodaka,
z tzw. obrotową karuzelą, w której znajdują się pojedyncze kawałki taśmy
filmowej. Projektor tak jak i grafoskop działa na zasadzie podświetlenia
półprzeźroczystego materiału oraz wyświetlenie powstałego obrazu na ścianie
przez system soczewek, jednak jest zazwyczaj od niego mniejszy.

Tworzenie slajdów do rzutników przeźroczych różni się od tworzenia slajdów do
grafoskopów, ponieważ opierało się po prostu zazwyczaj na robieniu
zdjęć.@slp-made Takie materiały były więc zazwyczaj tekstem napisanym na jakieś
powierzchni, której po prostu zrobiono zdjęcie, to samo tyczy się kopiowania
obrazków z książek czy gazet. Następnie wywoływano film diapozytywowy taki jak
Kodak Ektachrome czy polski Foton, lub używano filmu natychmiastowego cięto
film na pojedyncze slajdy, po czym film mógł być wyświetlany przez rzutnik. 

W latach 80. szybki rozwój komputerów pozwolił na zdigitalizowanie procesu
tworzenia prezentacji. Programy takie jak BRUNO i Slidemaster mogły znacząco
ułatwić tworzenie slajdów, jednak przeniesienie ich na film wymagało
specjalnych drukarek i wyszkolonych operatorów do obsługi programów. W 1987
PowerPoint zostaje wypuszczony na komputery Macintosh i jeszcze w tym samym
roku zostaje zakupiony przez Microsoft, jednak prezentacje są dalej
prezentowane głównie na dwóch wyżej wymienionych rzutnikach. Dopiero w latach 90. 
i na początku XXI wieku, projektory cyfrowe zaczynają zastępować grafoskopy
i diaskopy. 

Cyfrowa rewolucja pozwoliła na jeszcze większe rozprzestrzenienie się
prezentacji multimedialnych. Znajdziemy je na każdym etapie życia: w szkołach, w pracy,
oglądając przeróżne analizy, na przykład rynku mieszkaniowego, czy przy wypuszczeniu
nowych produktów przez firmy.

#figure(
  image("pictures/powerpoint1987.png", width: 80%),
  caption: [ Interfejs użytkownika w pierwszym wydaniu programu PowerPoint @powerpoint-1987] 
)
== Cel pracy

Celem pracy jest stworzenie aplikacji internetowej do tworzenia prezentacji
multimedialnych przy użyciu grafiki SVG. Aplikacja internetowa powinna
zapewniać prosty i zrozumiały interfejs, obsługę predefiniowanych animacji na
tworzonych przez użytkownika obiektach, przeglądarkę slajdów, oraz eksport
pliku prezentacji do formatu PDF.

Pobocznym celem jest sprawdzenie, czy obecny standard SVG implementowany w
najpopularniejszych przeglądarkach pozwala na realne wykorzystanie tej
technologii w projektach, na przykład w zastępstwie canvas API.

== Zakres pracy

W rozdziale pierwszym pracy opisano porównanie istniejących już rozwiązań
kreatorów prezentacji multimedialnych, m. in. takich jak Microsoft PowerPoint.
W drugim rozdziale opisano omówienie zagadnienia stworzenia aplikacji
internetowej do tworzenia prezentacji multimedialnych. Do zagadnienia należy
wykonanie analizy technologii obsługiwanych przez najpopularniejsze
przeglądarki, rozwiązanie problemu przechowywania danych potrzebnych do
odtworzenia aplikacji i wyszczególnienie rozwiązań.
W kolejnym rozdzialne szczegółowo opisano techonologie i narzędzia użyte
w procesie tworzenia projektu inżynierskiego, takie jak Svelte, SVG.js i npm, oraz
podano porównania do konkurencyjnych bibliotek i narzędzi, oraz  powody ich użycia.
W rozdziale czwartym opisano założenia projektu - wymagania funkcjonalne,
niefunkcjonalne, diagram przypadków użycia, diagram klas i projekt interfejsu
graficznego użytkownika w programie Figma.
W następnym rozdziale opisana jest prezentacja projektu, czyli działanie
najważniejszych jego części, edytora prezentacji, przeglądarki slajdów i eksport
prezentacji do pliku PDF. 
W rozdziale szóstym można znaleźć najciekawsze rozwiązania programistyczne,
takie jak implementacja poruszaniem obiektem SVG bez użycia zewnętrznej
biblioteki, implementacja zwiększania obiektu przez użytkownika i implementacja
eksportu do pliku PDF przy użyciu biblioteki svg2pdf.js
W ostatnim, siódmym rozdziale znajduje się podsumowanie pracy, razem z
wnioskami zdobytymi podczas tworzenia projektu, oraz subiektywnymi
perspektywami rozwoju kreatora.

