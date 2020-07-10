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

Überschrift |heading_img_1| |heading_img_2| |heading_img_3| |heading_img_4|
---------------------------------------------------------------------------

.. |heading_img_1| image:: icons/heading-level-1.svg
.. |heading_img_2| image:: icons/heading-level-2.svg
.. |heading_img_3| image:: icons/heading-level-3.svg
.. |heading_img_4| image:: icons/heading-level-4.svg

Zeichnet den Block als Überschrift der jeweiligen Ebene aus. Für alle Überschriften gibt es ein Attribut, welches rechts
eingestellt werden kann:

* **Kennzeichnung**: Eine (beliebige) Kennzeichnung. Diese darf nur aus Buchstaben und den Zeichen - und _ bestehen. Diese
  wird vom Lesesystem zur generierung des Inhaltsverzeichnisses genutzt. Eine Überschrift ohne Kennzeichnung wird nicht
  in das Inhaltsverzeichnis übernommen. Falls zwei aufeinanderfolgende Überschriften die gleiche Kennzeichnung haben,
  dann werden diese im Inhaltsverzeichnis als ein Eintrag (Titel/Untertitel) dargestellt.


Absatz |absatz_img|
-------------------

.. |absatz_img| image:: icons/absatz.svg

Zeichnet den Block als Textabsatz aus. Folgende Attribute können eingestellt werden:

* **Eingrückt**: Die erste Textzeile des Absatzes ist eingerückt oder nicht.
* **Textausrichtung**: Links-bündig, zentriert, rechts-bündig, oder Blocksatz.

Vers |vers_img|
---------------

.. |vers_img| image:: icons/vers.svg

Markiert ein oder mehrere Zeilen als Vers. Dazu alle Zeilen des Vers auswählen und dann als Vers auszeichnen.

Quellenliste |quelle_img|
-------------------------

.. |quelle_img| image:: icons/quelle.svg

Markiert ein oder mehrere Quellen als Quellenliste. Dazu alle Quellen auswählen und dann als Quellenliste auszeichnen.
Die einzelnen Quellen haben folgendes Attribt das eingestellt werden kann:

* **Kennzeichnung**: Das Kennzeichnungskürzel der Quelle. Dies darf nicht im Textblock selbst stehen, da es ansonst auf
  der Webseite verdoppelt wird

Auszeichnungen
==============

Folgende Auszeichnungen können innerhalb von Textblöcken vergeben werden:

Stellenkommentar |stellenkommentar_img|
---------------------------------------

.. |stellenkommentar_img| image:: icons/stellenkommentar.svg

Markiert den ausgewählten Text als Stellenkommentar. Folgende Attribute können eingestellt werden:

* **Stellenkommentar**: Der zu verlinkenden Stellenkommentar.

  Für einen neuen Stellenkommentar die Option "New" ausgewählt lassen und auf den |edit_img| klicken um den
  Stellenkommentar zu bearbeiten.

  Für einen Verweis auf einen bestehenden Stellenkommentar einfach den zu verlinkenden Stellenkommentar aus der Liste
  auswählen.

  Um den Stellenkommentar zu bearbeiten einfach auf |edit_img| klicken.

.. |edit_img| image:: icons/edit.svg

Globalkommentarverweis |verweis_apparat_img|
--------------------------------------------

.. |verweis_apparat_img| image:: icons/verweis-apparat.svg

Markiert den ausgewählten Text als Verweis auf den :doc:`Apparat <global_comments>`. Folgende
Attribute können eingestellt werden:

* **Abschnitt**: Der Abschnitt auf den verwiesen werden soll. Dies ist die Kennzeichnung die für die Überschrift im
  Apparat vergeben wurde.

Seitenanfang |seitenanfang_img|
-------------------------------

.. |seitenanfang_img| image:: icons/page-begin.svg

Markiert den ausgewählten Text als den Anfang einer Seite.

Fußnote |fussnote_img|
----------------------

.. |fussnote_img| image:: icons/footnote.svg

Markiert den ausgewählten Text als Fußnotenmarkierung. Um den Text der Fußnote zu bearbeiten, auf den |edit_img|
klicken.

Fremdsprachiger Text |foreign_img|
----------------------------------

.. |foreign_img| image:: icons/foreign.svg

Markiert den ausgewählten Text als fremdsprachigen Text.

Seite & Zeile
-------------

Markiert den ausgewählten Text als Seiten-und-Zeilen-angabe.

Wortspanne
----------

Markiert den ausgewählten Text als Wortspanne, generell nach einer "Seite & Zeile" Auszeichnung.

Zitat |zitat_img|
-----------------

.. |zitat_img| image:: icons/quote.svg

Markiert den ausgewählten Text als Zitat.

Lemma
-----

Markiert den ausgewählten Text als Lemma.

Textvorlage
-----------

Markiert den ausgewählten Text als den Originaltext aus der Vorlage.

Variante
--------

Markiert den ausgewählten Text als eine Variante in einer der Quellen. Folgendes Attribut kann eingestellt werden:

* **Quellenkürzel**: Das Quellenkürzel der Quelle aus der die Variante stammt.

Nicht ermittelt |nicht_ermittelt_img|
-------------------------------------

.. |nicht_ermittelt_img| image:: icons/nicht-ermittelt.svg

Markiert den ausgewählten Text als noch zu ermittelnde Information.

Visuelle Auszeichnungen
=======================

Folgende visuellen Elemente im Originaltext können ausgezeichnet werden:

Textgröße
---------

Für die Textgröße sind die Größen: Normal, Klein, Mittel, und Groß vorhanden.

Fettdruck |bold_img|
--------------------

.. |bold_img| image:: icons/bold.svg

Markiert den ausgewählten Text als fettgedruckt.

Kursiv |italic_img|
-------------------

.. |italic_img| image:: icons/italic.svg

Markiert den ausgewählten Text als kursiv.

Sperrung |sperrung_img|
-----------------------

.. |sperrung_img| image:: icons/sperrung.svg

Markiert den ausgewählten Text als Sperrung.

.. important::

    Der gesamte mit Sperrung darzustellende Text **muss** ausgwählt werden. Der letzte Buchstabe **darf nicht**
    ausgelassen werden. Das ist notwendig, damit der Text in TEI korrekt repräsentiert wird. In aktuellen Browsern kann
    das zwar vereinzelt zu leicht unschönen Darstellungen führen, aber diese werden im Laufe der Zeit ausgemerzt.

Hochgestellt |sup_img|
----------------------

.. |sup_img| image:: icons/sup.svg

Markiert den ausgewählten Text als hochgestellt.
