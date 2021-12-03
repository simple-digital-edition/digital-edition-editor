<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { derived, get, writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

    import { schema, uiConfig, fileBusy } from '../stores';
    import { TEIParser, TEISerialiser } from '../tei';
    import TiptapEditor from './TiptapEditor.svelte';
    import BusySpinner from './BusySpinner.svelte';
    import TeiMetadataEditor from './TeiMetadataEditor.svelte';

    export let text: string;

    const dispatch = createEventDispatcher();
    const currentSection = writable({});
    const document = writable({});
    const nestedDoc = writable(null);
    const nestedSection = writable(null);
    const nestedId = writable(null);

    function createBubbleMenu(uiConfig, section) {
        return section.bubbleMenu.map((menu) => {
            if (menu.entries) {
                return {
                    entries: menu.entries.map((entry) => {
                        if (entry && uiConfig.editor.tei.menuItems[entry]) {
                            return uiConfig.editor.tei.menuItems[entry];
                        }
                        return null;
                    }).filter((entry) => { return entry; }),
                    filter: menu.filter
                };
            } else {
                return {entries: []};
            }
        });
    }

    function createSidebarMenu(uiConfig, section) {
        return section.sidebarMenu.map((section) => {
            if (section.menus) {
                return {
                    label: section.label,
                    filter: section.filter,
                    menus: section.menus.map((menu) => {
                        if (menu.entries) {
                            return {
                                entries: menu.entries.map((entry) => {
                                    if (entry && uiConfig.editor.tei.menuItems[entry]) {
                                        return uiConfig.editor.tei.menuItems[entry];
                                    }
                                    return null;
                                }).filter((entry) => { return entry; }),
                            }
                        } else {
                            return null;
                        }
                    }).filter((menu) => { return menu; }),
                }
            }
            return null;
        }).filter((section) => { return section; });
    }

    const bubbleMenu = derived([uiConfig, currentSection], ([uiConfig, currentSection]) => {
        if (uiConfig && uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.menuItems && currentSection && currentSection.bubbleMenu) {
            return createBubbleMenu(uiConfig, currentSection);
        }
        return null;
    });

    const sidebarMenu = derived([uiConfig, currentSection], ([uiConfig, currentSection]) => {
        if (uiConfig && uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.menuItems && currentSection && currentSection.sidebarMenu) {
            return createSidebarMenu(uiConfig, currentSection);
        }
        return null;
    });

    const nestedBubbleMenu = derived([uiConfig, nestedSection], ([uiConfig, nestedSection]) => {
        if (uiConfig && uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.menuItems && nestedSection && nestedSection.bubbleMenu) {
            return createBubbleMenu(uiConfig, nestedSection);
        }
        return null;
    });

    const nestedSidebarMenu = derived([uiConfig, nestedSection], ([uiConfig, nestedSection]) => {
        if (uiConfig && uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.menuItems && nestedSection && nestedSection.sidebarMenu) {
            return createSidebarMenu(uiConfig, nestedSection);
        }
        return null;
    });

    const metadataSchema = derived([uiConfig, currentSection], ([uiConfig, currentSection]) => {
        if (uiConfig && uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && currentSection && currentSection.name) {
            for (let section of uiConfig.editor.tei.sections) {
                if (section.name === currentSection.name) {
                    return section;
                }
            }
        }
        return null;
    });

    const unsubscribeUiConfig = uiConfig.subscribe((uiConfig) => {
        if (uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.sections.length > 0) {
            currentSection.set(uiConfig.editor.tei.sections[0]);
        }
    });

    function editNestedDoc(ev) {
        const doc = $document[$currentSection.name];
        if (!doc[ev.detail.type]) {
            doc[ev.detail.type] = {};
        }
        if (doc[ev.detail.type]) {
            const sect = $uiConfig.editor.tei.sections.filter((sect) => {
                return sect.name === ev.detail.type;
            });
            if (sect.length === 1) {
                if (doc[ev.detail.type][ev.detail.id]) {
                    nestedDoc.set(doc[ev.detail.type][ev.detail.id].doc);
                    nestedSection.set(sect[0]);
                    nestedId.set(ev.detail.id);
                } else {
                    let newId = 1;
                    Object.values($document).forEach((section) => {
                        if (section[ev.detail.type]) {
                            const ids = Object.keys(section[ev.detail.type]);
                            while (ids.indexOf(ev.detail.type + '-' + newId) >= 0) {
                                newId = newId + 1;
                            }
                        }
                    });
                    doc[ev.detail.type][ev.detail.type + '-' + newId] = {
                        type: ev.detail.type,
                        id: ev.detail.type + '-' + newId,
                        doc: {
                            type: 'doc',
                            content: [],
                        },
                    };
                    ev.detail.created(ev.detail.type + '-' + newId);
                    nestedDoc.set(doc[ev.detail.type][ev.detail.type + '-' + newId].doc);
                    nestedSection.set(sect[0]);
                    nestedId.set(ev.detail.type + '-' + newId);
                }
            }
        }
    }

    function updateMainDoc(ev) {
        $document[$currentSection.name]._main = ev.detail;
    }

    function updateNestedDoc(ev) {
        $document[$currentSection.name][$nestedSection.name][$nestedId].doc = ev.detail;
    }

    function saveDoc() {
        const serialiser = new TEISerialiser(get(schema));
        dispatch('save', serialiser.serialise($document));
    }

    function keyboardHandler(ev: KeyboardEvent) {
        if (ev.key.toLowerCase() === 's' && ev.ctrlKey) {
            ev.preventDefault();
            saveDoc();
        }
    }

    onMount(() => {
        if (text) {
            const parser = new TEIParser(get(schema));
            document.set(parser.parse(text));
        }
    });

    $: {
        if (text) {
            const parser = new TEIParser(get(schema));
            document.set(parser.parse(text));
        }
    }

    onDestroy(unsubscribeUiConfig);
</script>

<div class="flex flex-col h-full overflow-hidden relative tei-editor" on:keydown={keyboardHandler}>
    {#if $uiConfig && $uiConfig.editor && $uiConfig.editor.tei}
        <nav class="flex-none">
            <ul class="flex flex-row">
                <li role="presentation">
                    {#if $fileBusy}
                        <BusySpinner class="px-2 py-1 border-b-2 border-solid border-neutral" message="Your file is being saved. Please wait..."/>
                    {:else}
                        <button on:click={saveDoc} class="block px-2 py-1 border-b-2 border-solid border-neutral hover:border-primary focus:border-primary" aria-label="Save">
                            <svg viewBox="0 0 24 24" class="w-6 h-6">
                                <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                            </svg>
                        </button>
                    {/if}
                </li>
                <li role="presentation" class="w-8 border-b-2 border-solid border-neutral"></li>
                {#if $uiConfig.editor.tei.sections}
                    {#each $uiConfig.editor.tei.sections as section}
                        {#if section.label}
                            <li role="presentation">
                                <button on:click={() => { currentSection.set(section); }} class="block px-2 py-1 border-b-2 border-solid {(section.name === $currentSection.name) ? 'border-primary' : 'border-neutral'} transition-colors hover:border-primary focus:border-primary" aria-current={section.name === $currentSection}>{section.label}</button>
                            </li>
                        {/if}
                    {/each}
                {/if}
                <li role="presentation" class="flex-auto border-b-2 border-solid border-neutral"></li>
            </ul>
        </nav>
        <div class="flex-auto overflow-hidden">
            {#if $currentSection && $document && $document[$currentSection.name]}
                {#if $document[$currentSection.name]._type === 'text'}
                    <TiptapEditor doc={$document[$currentSection.name]._main} fullDoc={$document[$currentSection.name]} schema={$schema} bubbleMenu={$bubbleMenu} sidebarMenu={$sidebarMenu} on:editNestedDoc={editNestedDoc} on:update={updateMainDoc}/>
                {:else if $document[$currentSection.name]._type === 'metadata'}
                    <TeiMetadataEditor doc={$document[$currentSection.name]} schema={$metadataSchema}/>
                {/if}
            {/if}
        </div>
        {#if $nestedDoc}
            <div transition:fade="{{ duration: 100 }}" on:click={() => { nestedDoc.set(null); }} class="absolute left-0 top-0 w-full h-full z-10 bg-white bg-opacity-70">
                <div on:click={(ev) => { ev.stopPropagation(); }} class="absolute left-1/2 top-1/2 w-4/5 h-4/5 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-neutral shadow-lg">
                    <TiptapEditor doc={$nestedDoc} fullDoc={$document[$currentSection.name]} schema={$schema} bubbleMenu={$nestedBubbleMenu} sidebarMenu={$nestedSidebarMenu} on:editNestedDoc={editNestedDoc} on:update={updateNestedDoc}/>
                    <div class="absolute right-0 top-0 z-10 transform translate-x-1/2 -translate-y-1/2">
                        <button on:click={() => { nestedDoc.set(null); }} class="block p-1 bg-white rounded-full border border-neutral shadow-lg">
                            <svg viewBox="0 0 24 24" class="w-6 w-8">
                                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>
