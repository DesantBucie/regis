#set page(
  paper: "a4",
  numbering:none,
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

// Disable numbering in outline and section
//#set heading(numbering: (..nums) => {
//  let sequence = nums.pos()
//  // discard first entry (chapter number)
//  let _ = sequence.remove(0)
//  if sequence.len() > 0 {
//    numbering("1.", ..sequence)
//  }
//})
#show link: underline

//#figure(
#image("pictures/logo.png", width: 100%)
//)

#align(center, [
#v(48pt)
#text(17pt)[#upper[PRACA DYPLOMOWA INŻYNIERSKA]]
#v(32pt)
#text(14pt)[*Projekt i implementacja aplikacji internetowej do tworzenia prezentacji multimedialnych wykorzystując grafikę SVG*]
#v(16pt)
#text(14pt)[Design and implementation of a web application for creating SVG graphic presentations]
#v(32pt)
])

#block(inset: (left: 7cm))[
Imię i nazwisko: Jakub Truszkowski \
Numer albumu: 135206 \
Promotor: dr hab. inż. Krystian Łapa prof. PCz \
Kierunek: Informatyka \
Zakres (specjalność): Inżynieria oprogramowania \
]
#v(128pt)
Praca przyjęta dnia:

Podpis promotora:

#align(center + bottom, [Częstochowa 2024])
#pagebreak()
#pagebreak()
#set page(numbering: "1")
#counter(page).update(1)
#[
  #show outline.entry.where(
    level: 1
  ): it => {
    v(12pt, weak: true)
    strong(it)
  }
  
  #outline(
    title:"Spis Treści",
    indent:1em, 
    depth: 2,
  )
]

#show outline: set heading(outlined:true)
#pagebreak()

#[
  #show heading.where(level: 2): it => if it.numbering == none { it } else [
    #it.body
  ]

  #include "0_wstep.typ"

]
#pagebreak()

#counter(heading).update(0)
#set heading(numbering: "1.1")
#show heading.where(level: 1): it => if it.numbering == none { it } else [
   #text(24.88pt)[#v(80pt) Rozdział #(counter(heading).get().first()) \ \ #it.body]
]

#show heading.where(level: 3): it => if it.numbering == none { it } else [
  #it.body
]
#include "1_przeglad.typ"

#pagebreak()
= Omówienie zagadnienia...

#pagebreak()

#include "3_opis.typ"

#pagebreak()

#include "4_zalozenia.typ"

#pagebreak()

#include "5_prezentacja.typ"

#pagebreak()

#include "6_rozwiazania.typ"

#pagebreak()

#include("7_podsumowanie.typ")

#show heading.where(level: 1): it => if it.numbering == none { it } else [
  #it.body
]
#show heading.where(level: 2): it => if it.numbering == none { it } else [
  #it.body
]
#pagebreak()

#bibliography(
  ("bib.yaml",
  "images.bib"),
  style: "ieee",
)

#pagebreak()

// Kind of weird but works
//#{
//  show heading: none
//  heading(numbering: none)[Spis rysunków]
//}
#show outline.entry.where(
  level: 1
): it => { 
  v(12pt, weak: true)
  it 
}
#outline(
  title: [Spis rysunków],
  target: figure.where(kind: image),
)

#set heading(numbering: (..nums) => {
  let sequence = nums.pos()
  // discard first entry (chapter number)
  let _ = sequence.remove(0)
  if sequence.len() > 0 {
    numbering("1.", ..sequence)
  }
})
#pagebreak()
= Streszczenie

Po polsku
#pagebreak()
= Summary

In english
#pagebreak()
= Słowa kluczowe
