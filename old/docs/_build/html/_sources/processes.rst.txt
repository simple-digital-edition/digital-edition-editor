#######
Abläufe
#######

Der Digital Edition Editor nutzt im Hintergrund ein verteiltes Speichersystem, welches ein verteiltes Arbeiten an der
Edition ermöglicht und gleichzeitig ein permanentes Backup bereitstellt. In diesem verteilten System erhält jede_r
Benutzer_in eine eigene Kopie aller Daten. Zusätzlich gibt es noch eine primäre Kopie, aus welcher die Webseite dann
generiert wird. Damit die Arbeit so reibungslos wie möglich ist, müssen ein paar Abläufe befolgt werden.

Globaler Ablauf
===============

Die folgenden drei Schritte definieren den globalen Ablauf der Bearbeitung der Ausgabe:

#. :ref:`Eine Session anfangen <process-begin-session>`.
#. :ref:`Eine Datei bearbeiten <process-edit-file>`. Dieser Schritt kann wiederholt für verschiedene Dateien ausgeführt werden.
#. :ref:`Die Session beenden <process-end-session>`.

Wenn ein Block an Änderungen abgeschlossen ist, dann kann :ref:`die Integration der Änderungen beantragt <process-integrate-changes>`
werden.

.. _process-begin-session:

Anfang einer Session
====================

Am Anfang einer neuen Session sind folgende Schritte auszuführen:

#. Einloggen.
#. Edition auswählen, in diesem Fall durch Auswählen der "Gutzkow Digitale Gesamtausgabe".
#. Die Synchronisation der eigenen Änderungen mit dem Backup geschieht automatisch, wenn man auf die Seite der
   Edition geht. Falls neue Änderungen in der primären Kopie existieren, dann werden diese automatisch aufgelistet
   und die_der Benutzer_in **muss** die Änderungen in die eigene Kopie übernehmen. Bevor dies nicht durchgeführt wurde
   können keine Dateien bearbeitet werden.

.. _process-edit-file:

Eine Datei bearbeiten
=====================

Um eine Datei zu bearbeiten, folgen sie diesen Schritten:

#. Die Edition auswählen.
#. Dem Link zum Bearbeiten einer Datei folgen *oder* in der Menüzeile auf den "Dateien" Icon clicken.
#. Aus der Liste die zu bearbeitende Datei auswählen und auf ihren Namen clicken um sie im Editor zu öffnen. Die
   Dateien sind in ihren Verzeichnissen alphabetisch sortiert.

Details zur nutzung des Texteditors finden sie :doc:`hier <editor/index>`.

Schritte 2 und 3 können wiederholt ausgeführt werden. Insbesondere über den "Dateien" Icon kann man immer schnell zur
Liste der zu bearbeitenden Dateien kommen.

.. _process-end-session:

Ende einer Session
==================

Die folgenden zwei Schritte sind am Ende der Arbeitssession durchzuführen, um sicherzustellen, dass keine Daten
verloren gehen:

#. Zur Edition zurückkehren, in diesem Fall durch Auswählen der "Gutzow Digitale Gesamtausgabe" in der Menüzeile.
#. Ihre Änderungen werden automatisch mit dem Backup synchronisiert.

.. _process-integrate-changes:

Integration in die primäre Kopie
================================

Damit Änderungen auf der Webseite sichtbar werden, müssen sie in die primäre Kopie übernommen werden:

#. Zur Edition zurückkehren, in diesem Fall durch Auswählen der "Gutzkow Digitale Gesamtausgabe" in der Menüzeile.
#. Auf die Schaltfläche "Integration beantragen" clicken.

.. important::

    Nachdem eine Integration beantragt wurde, kann keine weitere beantragt werden, bevor die erste abgeschlossen oder
    zurückgewiesen wurde. Alle Änderungen die nach der Beantragung, aber vor dem Abschluss der Integration, gemacht
    werden, werden automatisch dem Integrationsantrag hinzugefügt.
