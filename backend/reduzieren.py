"""
reduzieren.py - Reduziert (nicht zu verschachtelte) deutsche Sätze auf das Wesentliche.
Die Sätze müssen einen Punkt am Ende haben.
Und ja, Meschen sind hierin besser als mein Algorithmus..
"""

from spacy import displacy, load
import itertools
import sys

nlp = load("de_core_news_sm")


def flatten(x):
    return list(itertools.chain.from_iterable(x))


def ist_nomen(wort):
    return wort.pos_ == "NOUN" or wort.pos_ == "PROPN"


def satzzeichen_ersetzen(text):
    return text.replace(",", ".").replace(":", ".").replace(";", ".")


def markieren(text, indizes):
    wörter = text.split()
    for i in range(len(wörter)):
        print(colored(wörter[i], "red" if i in indizes else "white"), end=" ")


def reduzieren(text):
    sätze = nlp(satzzeichen_ersetzen(text)).sents
    return flatten([satz_reduzieren(satz, i)
                    for i, satz in enumerate(sätze)])


"""
Reduziert einen Satz.
Parameter: satz - Ein Satz als Zeichenkette
           n - Index des Satzes im Text
Rückgabewert: Liste der Indizes der 'relevanten' Wörter
"""


def satz_reduzieren(satz, n):
    reduzierter_satz = []
    letztes_wort = []
    index = -1

    def letztes_element():
        if letztes_wort:
            return letztes_wort[-1]
        else:
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
        nonlocal index
        if ist_letztes_wort(wort) or letztes_wort:
            letztes_wort.append(wort)
        else:
            reduzierter_satz.append(wort)
            index += 1

    def ausnahmen():
        wort = letztes_element()
        ausnahmen_tupel = ("sich", "nicht")
        ausnahmen = list(
            filter(lambda x: x.text in ausnahmen_tupel, wort.children))
        if len(ausnahmen) != 0:
            for a in ausnahmen:
                wort_hinzufügen(a)

    wort_hinzufügen(satz.root)
    while hat_kindelemente() and not ist_legitimes_ende():
        aktuelles_wort = letztes_element()
        kandidat = weiteste_entfernung(aktuelles_wort)
        ausnahmen()
        wort_hinzufügen(kandidat)

    reduzierter_satz += letztes_wort[::-1]
    # Position im Text
    return [wort.i-n for wort in reduzierter_satz]


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print('python reduzieren.py "<text>"')
        exit(0)
    print(reduzieren(sys.argv[1]))
