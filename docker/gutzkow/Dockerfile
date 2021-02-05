FROM scmmmh/digitaleditioneditor:0.13.0

ARG DIGI_EDIT_USER="digi_edit"
ARG DIGI_EDIT_UID="10000"
ARG DIGI_EDIT_GID="10000"

USER ${DIGI_EDIT_UID}:${DIGI_EDIT_GID}
COPY production.ini /etc/digi-edit
COPY customisation.css /etc/digi-edit
COPY tei_schema.json /etc/digi-edit
COPY extra /etc/digi-edit
