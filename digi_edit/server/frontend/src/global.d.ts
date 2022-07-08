/// <reference types="svelte" />

interface EditNestedDocEvent extends Event {
    detail: EditNestedDocDetail;
}

interface EditNestedDocDetail {
    type: string;
    id: string;
    created: (id: string) => void;
}
