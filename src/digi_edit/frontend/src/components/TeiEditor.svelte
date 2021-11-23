<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { derived, get, writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

    import { schema, uiConfig } from '../stores';
    import { TEIParser } from '../tei';
    import TiptapEditor from './TiptapEditor.svelte';

    export let text: string;

    const currentSection = writable({});
    const document = writable({});
    const nestedDoc = writable(null);
    const nestedSection = writable(null);

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

    const unsubscribeUiConfig = uiConfig.subscribe((uiConfig) => {
        if (uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.sections.length > 0) {
            currentSection.set(uiConfig.editor.tei.sections[0]);
        }
    });

    function editNestedDoc(ev) {
        const doc = $document[$currentSection.name];
        if (doc[ev.detail.type] && doc[ev.detail.type][ev.detail.id]) {
            const sect = $uiConfig.editor.tei.sections.filter((sect) => {
                return sect.name === ev.detail.type;
            });
            if (sect.length === 1) {
                nestedDoc.set(doc[ev.detail.type][ev.detail.id].doc);
                nestedSection.set(sect[0]);
            }
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

<div id="tei-editor" class="flex flex-col h-full overflow-hidden relative">
    {#if $uiConfig && $uiConfig.editor && $uiConfig.editor.tei}
        <nav class="flex-none">
            <ul class="flex flex-row">
                <li role="presentation">
                    <button class="block px-2 py-1 border-b border-solid border-gray-300 hover:border-blue-700 focus:border-blu-700">Save</button>
                </li>
                <li role="presentation">
                    <button class="block px-2 py-1 border-b border-solid border-gray-300 hover:border-blue-700 focus:border-blu-700">Discard</button>
                </li>
                <li role="presentation" class="w-8 border-b border-solid border-gray-300"></li>
                {#if $uiConfig.editor.tei.sections}
                    {#each $uiConfig.editor.tei.sections as section}
                        {#if section.label}
                            <li role="presentation">
                                <button on:click={() => { currentSection.set(section); }} class="block px-2 py-1 border-b border-solid {(section.name === $currentSection.name) ? 'border-blue-700' : 'border-gray-300'} transition-colors hover:border-blue-700 focus:border-blu-700" aria-current={section.name === $currentSection}>{section.label}</button>
                            </li>
                        {/if}
                    {/each}
                {/if}
                <li role="presentation" class="flex-auto border-b border-solid border-gray-300"></li>
            </ul>
        </nav>
        <div class="flex-auto overflow-hidden">
            {#if $currentSection && $document && $document[$currentSection.name]}
                <TiptapEditor doc={$document[$currentSection.name]._main} schema={$schema} bubbleMenu={$bubbleMenu} sidebarMenu={$sidebarMenu} on:editNestedDoc={editNestedDoc}/>
            {/if}
        </div>
        {#if $nestedDoc}
            <div transition:fade="{{ duration: 100 }}" on:click={() => { nestedDoc.set(null); }} class="absolute left-0 top-0 w-full h-full z-10 bg-white bg-opacity-70">
                <div on:click={(ev) => { ev.stopPropagation(); }} class="absolute left-1/2 top-1/2 w-4/5 h-4/5 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg">
                    <TiptapEditor doc={$nestedDoc} schema={$schema} bubbleMenu={$nestedBubbleMenu} sidebarMenu={$nestedSidebarMenu} on:editNestedDoc={editNestedDoc}/>
                    <div class="absolute right-0 top-0 z-10 transform translate-x-1/2 -translate-y-1/2">
                        <button on:click={() => { nestedDoc.set(null); }} class="block p-1 bg-white rounded-full border border-gray-300 shadow-lg">
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
