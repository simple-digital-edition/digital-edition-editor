##############
Auszeichnungen
##############

Hier werden alle möglichen Auszeichnungsoptionen aufgelistet. Nicht alle sind in allen Editoren verfügbar. Falls eine
Auszeichnungsoption zusätzlich benötigt wird, dies bitte sofort melden.

.. important::

    Bei der Auszeichnung der Text im Editor ist der Fokus immer auf die Auszeichnung der "Bedeutung" des ausgezeichneten
    Elements zu legen und **nicht** auf die visuelle Darstellung. Falls keine Auszeichnung der gewünschten "Bedeutung"
    im Editor verfügbar ist, dann bitte dies melden und diese wird hinzugefügt. Die fehlende Auszeichnung **darf nicht**
    durch die visuellen Auszeichnungen simuliert werden.

    Die Ausnahme zu dieser Regel ist wenn visuelle Elemente ausgezeichnet werden. Dann sollen die visuellen
    Auszeichnungsoptionen genutzt werden.

Blocktypen
==========

Folgende Textblöcke können ausgewählt werden.

Überschrift
-----------

Zeichnet den Block als Überschrift aus. Für alle Überschriften gibt es zwei Attribute, welche rechts eingestellt
werden können:

* **Ebene**: Die Überschriftenebene von 1-3.
* **Kennzeichnung**: Eine (beliebige) Kennzeichnung. Diese darf nur aus Buchstaben und den Zeichen - und _ bestehen. Diese
  wird vom Lesesystem zur generierung des Inhaltsverzeichnisses genutzt. Eine Überschrift ohne Kennzeichnung wird nicht
  in das Inhaltsverzeichnis übernommen. Falls zwei aufeinanderfolgende Überschriften die gleiche Kennzeichnung haben,
  dann werden diese im Inhaltsverzeichnis als ein Eintrag (Titel/Untertitel) dargestellt.


Absatz
------

Zeichnet den Block als Textabsatz aus. Folgende Attribute können eingstellt werden:

* **Eingrückt**: Die erste Textzeile des Absatzes ist eingerückt oder nicht.
* **Textausrichtung**: Links-bündig, zentriert, rechts-bündig, oder Blocksatz.

Vers
----

Markiert ein oder mehrere Zeilen als Vers. Dazu zuerst jede einzelne Zeile als Zeile auszeichnen. Danach alle Zeilen
die zu einem Vers gehören auswählen und dann als Vers auszeichnen.

Zeile
-----

Markiert den Textblock als Verszeile. Dies muss zuerst für alle Zeilen gemacht werden, welche in einen Vers
zusammengefasst werden sollen.

Quellenliste
------------

Markiert ein oder mehrere Quellen als Quellenliste. Dazu zuerst jede einzelne Quelle als Quelle auszeichnen. Danach
alle Quellen auswählen und als Quellenliste auszeichnen.

Quelle
------

Markiert den Textblock als Quelle. Folgende Attribute können eingestell werden:

* **Kennzeichnung**: Das Kennzeichnungskürzel der Quelle. Dies darf nicht im Textblock selbst stehen, da es ansonst auf
  der Webseite verdoppelt wird

Auszeichnungen
==============

Folgende Auszeichnungne können innerhalb von Textblöcken vergeben werden:

Einzelstellenverweis
--------------------

Markiert den ausgewählten Text als Verweis auf eine :doc:`Einzelstellenerläuterung <individual_comments>`. Folgende
Attribute können eingestellt werden:

* **Einzelstellenerläuterung**: Die zu verlinkende Einzelstellenerläuterung. Diese muss erstellt werden **bevor** sie
  hier verlinkt werden kann.

Globalkommentarverweis
----------------------

Markiert den ausgewählten Text als Verweis auf den :doc:`Kommentar <global_comments>`. Folgende
Attribute können eingestellt werden:

* **Abschnitt**: Der Abschnitt auf den verwiesen werden soll. Dies ist die Kennzeichnung die für die Überschrift im
  Kommentar vergeben wurde.

Seitenanfang
------------

Markiert den ausgewählten Text als den Anfang einer Seite.

Fußnote
-------

Markiert den ausgewählten Text als Fußnote. Folgende Attribute können eingstellt werden:

* **Symbol**: Das Symbol, welches in der Webseite als Hinweis auf die Fußnote verwendet wird.

.. important::

    Der Text der Fußnote wird zwar im Text des Editors bearbeitet (und auch weiter ausgezeichnet, falls notwendig),
    aber in der Darstellung auf der Webseite wird der Fußnotentext separat angezeigt.

Fremdsprachiger Text
--------------------

Markiert den ausgewählten Text als fremdsprachigen Text.

Seite & Zeile
-------------

Markiert den ausgewählten Text als Seiten-und-Zeilen-angabe.

Wortspanne
----------

Markiert den ausgewählten Text als Wortspanne, generell nach einer "Seite & Zeile" Auszeichnung.

Zitat
-----

Markiert den ausgewählten Text als Zitat.

Lemma
-----

Markiert den ausgewählten Text als Lemma.

Korrigierter Text
-----------------

Markiert den ausgewählten Text als den ursprünglichen, korrigierten Text.

Nicht ermittelt
---------------

Markiert den ausgewählten Text als noch zu ermittelnde Information.

Visuelle Auszeichnungen
=======================

Folgende visuellen Elemente im Originaltext können ausgezeichnet werden:

Textgröße
---------

Für die Textgröße sind die Größen: Normal, Klein, Mittel, und Groß vorhanden.

Fettdruck
---------

Markiert den ausgewählten Text als fettgedruckt.

Kursiv
------

Markiert den ausgewählten Text als kursiv.

Sperrung
--------

Markiert den ausgewählten Text als Sperrung.

.. important::

    Der gesamte mit Sperrung darzustellende Text **muss** ausgwählt werden. Der letzte Buchstabe **darf nicht**
    ausgelassen werden. Das ist notwendig, damit der Text in TEI korrekt repräsentiert wird. In aktuellen Browsern kann
    das zwar vereinzelt zu leicht unschönen Darstellungen führen, aber diese werden im Laufe der Zeit ausgemerzt.

Hochgestellt
------------

Markiert den ausgewählten Text als hochgestellt.
