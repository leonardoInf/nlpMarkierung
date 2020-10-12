"""
reduzieren.py - Reduziert (nicht zu verschachtelte) deutsche Sätze auf das Wesentliche.
"""

from spacy import displacy, load
import sys
nlp = load("de_core_news_sm")


def ist_nomen(wort):
    return wort.pos_ == "NOUN" or wort.pos_ == "PROPN"


def satzzeichen_ersetzen(text):
    return text.replace(",", ".").replace(":", ".").replace(";", ".")


def reduzieren(text):
    text = satzzeichen_ersetzen(text)

    sätze = list(nlp(text).sents)
    ergebnis = []

    for satz in sätze:
        reduzierter_satz = [satz.root]
        letztes_wort = []
        index = 0

        def letztes_element():
            return reduzierter_satz[index]

        def ist_letztes_wort(wort):
            return wort == satz[-2]

        def ist_legitimes_ende():
            wort = letztes_element()
            return ist_letztes_wort(wort) and ist_nomen(wort)

        def hat_kindelemente():
            return len(list(letztes_element().children)) != 0

        def weiteste_entfernung(wort):
            kindelemente = list(wort.children)
            return kindelemente[-1] if kindelemente[-1].text != "." else kindelemente[-2]

        def wort_hinzufügen(wort):
            if ist_letztes_wort(kandidat) or letztes_wort:
                letztes_wort.append(kandidat)
            else:
                reduzierter_satz.append(kandidat)
            index += 1

        def ausnahmen():
            wort = letztes_element()
            ausnahmen_tupel = ("sich", "nicht")
            ausnahmen = list(
                filter(lambda x: x.text in ausnahmen_tupel, wort.children))
            if len(ausnahmen) != 0:
                for a in ausnahmen:
                    wort_hinzufügen(a)

        while hat_kindelemente() and not ist_legitimes_ende():
            aktuelles_wort = letztes_element()
            kandidat = weiteste_entfernung(aktuelles_wort)
            ausnahmen()
            wort_hinzufügen(kandidat)

        reduzierter_satz += letztes_wort[::-1]
        reduzierter_satz = [(wort.text, wort.i) for wort in reduzierter_satz]
        ergebnis += (reduzierter_satz)

    return ergebnis


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print('python reduzieren.py "<text>"')
        exit(0)
    print(reduzieren(sys.argv[1]))
