#set page(
  paper: "a4",
  numbering: "1"
)
#set text(
  font: "Times New Roman",
  size: 12pt,
  lang:"pl"
)
#figure(
  image("pictures/logo.png", width: 100%)
)


#set heading(numbering: (..nums) => {
  let sequence = nums.pos()
  // discard first entry (chapter number)
  let _ = sequence.remove(0)
  if sequence.len() > 0 {
    numbering("1.", ..sequence)
  }
})


#align(center + horizon, text(16pt)[
  #strong[Politechnika Częstochowska \
Wydział Informatyki i Sztucznej Inteligencji \ ]
\ \ \ 
Praca dyplomowa inżynierska
\ \ \
*Projekt i implementacja aplikacji internetowej do tworzenia prezentacji multimedialnych wykorzystując grafikę SVG *

Design and implementation of a web application for creating SVG graphic presentations
])
#align(left + bottom, [
Imię i nazwisko: Jakub Truszkowski \
Numer albumu: 135206 \
Promotor: dr hab. inż. Krystian Łapa prof. PCz \
Kierunek: Informatyka \
Zakres (specjalność): Inżynieria oprogramowania \
  #align(center, [Częstochowa 2024])
])

#pagebreak()
#pagebreak()

= Wstęp

Lorem ipsum - tu historia o prezentacjach etc.

== Cel pracy

Celem pracy jest stworzenie prostego w obsłudze edytora do tworzenia prezentacji z możliwością użycia animacji, razem z przeglądarką prezentacji, oraz jej eksportem do PDF.

== Zakres pracy

W rozdziale pierwszym pracy opisano porównanie istniejących już rozwiązań.


#pagebreak()

#set heading(numbering: "1.")
#show heading.where(level: 1): it => if it.numbering == none { it } else [
  Rozdział #(counter(heading).get().first() - 1) \ #it.body
]
= Przegląd dostępnych rozwiązań

Na rynku znajduje się obecnie wiele darmowych jak i płatnych rozwiązań dotyczących prezentacji multimedialnych. Najpopularniejszym z nich jest Microsoft PowerPoint, popularne są również Open/Libre Office Impress, Google Slides, Canva oraz Keynote, ale w tym przypadku tylko na komputery firmy Apple. 

== Microsoft PowerPoint

Dzieło Microsoftu jest liderem, jeżeli chodzi o światowe użycie. 
Microsoft szacuje, że na świecie jest 1 200 000 000 kopii tego programu. //@citationNeeded

Ponieważ jest to najpopularniejszy program tego typu, inne programy jak Open/Libre Office Impress kopiują go w wyglądzie interfejsu użytkownika, jak i działaniu.

Program posiada zaawansowany, jednak często trudny do zrozumienia interfejs użytkownika.
Można dowolnie edytować tekst, ustawiać wielkość nawet pojedynczych liter, kolory tła czy liter.
Jest też ogromna ilość przejść pomiędzy slajdami i animacji obiektów. 
W nowszych wersjach programu można wykonać bardzo zaawansowane prezentacje, które nieraz mogły by przypominać 
render ręcznie wymodelowanych i zanimowanych obiektów 3d.

== Open/Libre Office

== Google Slides

= Omówienie zagadnienia...

= Opis wykorzystanych technologii oraz narzędzi

== Svelte

== svg.js

== svg2pdf.js 


= Podsumowanie

#show heading.where(level: 1): it => if it.numbering == none { it } else [
  #it.body
]
= Streszczenie

Po polsku

= Summary

In english
