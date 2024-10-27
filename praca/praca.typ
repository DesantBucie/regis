#set page(
  paper: "a4",
  numbering: "1",
  margin: (inside: 3.5cm, outside: 2cm, top: 2cm, bottom: 2cm)
)
#set text(
  font: "Times New Roman",
  size: 12pt,
  lang:"pl"
)
#set par(
  justify: true,
  spacing: 1.5em
)
#set block(spacing: 1.5em)

#set heading(numbering: (..nums) => {
  let sequence = nums.pos()
  // discard first entry (chapter number)
  let _ = sequence.remove(0)
  if sequence.len() > 0 {
    numbering("1.", ..sequence)
  }
})
#show outline.entry.where(
  level: 1
): it => {
  v(12pt, weak: true)
  strong(it)
}
#show link: underline

#figure(
  image("pictures/logo.png", width: 100%)
)
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
#outline(title:"Spis Treści", indent:auto, fill:none)
#pagebreak()

#include "0_wstep.typ"

#pagebreak()

#counter(heading).update(0)
#set heading(numbering: "1.1")
#show heading.where(level: 1): it => if it.numbering == none { it } else [
  Rozdział #(counter(heading).get().first()) \ #it.body
]

#include "1_przeglad.typ"

#pagebreak()
= Omówienie zagadnienia...

#pagebreak()

#include "3_opis.typ"

#pagebreak()
= Założenia projektu

#pagebreak()
= Prezentacja projektu

== Edytor

== Przeglądarka slajdów

== Eksport do formatu PDF

#pagebreak()
= Opis wybranych rozwiązań programistycznych

#pagebreak()

#include("7_podsumowanie.typ")

#show heading.where(level: 1): it => if it.numbering == none { it } else [
  #it.body
]
#show heading.where(level: 2): it => if it.numbering == none { it } else [
  #it.body
]
#pagebreak()
= Streszczenie

Po polsku
#pagebreak()
= Summary

In english

#bibliography("bib.yaml")
