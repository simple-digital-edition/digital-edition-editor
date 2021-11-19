<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { derived, get, writable } from 'svelte/store';

    import { schema, uiConfig } from '../stores';
    import { TEIParser } from '../tei';
    import TiptapEditor from './TiptapEditor.svelte';

    export let text: string;

    const currentSection = writable({});
    const document = writable({});

    const bubbleMenu = derived([uiConfig, currentSection], ([uiConfig, currentSection]) => {
        if (uiConfig && uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.menuItems && currentSection && currentSection.bubbleMenu) {
            return currentSection.bubbleMenu.map((menu) => {
                if (menu.entries) {
                    return {entries: menu.entries.map((entry) => {
                        if (entry && uiConfig.editor.tei.menuItems[entry]) {
                            return uiConfig.editor.tei.menuItems[entry];
                        }
                        return null;
                    }).filter((entry) => { return entry; })}
                } else {
                    return {entries: []}
                }
            });
        }
        return null;
    });

    const sidebarMenu = derived([uiConfig, currentSection], ([uiConfig, currentSection]) => {
        if (uiConfig && uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.menuItems && currentSection && currentSection.sidebarMenu) {
            return currentSection.sidebarMenu.map((section) => {
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
        return null;
    });

    const unsubscribeUiConfig = uiConfig.subscribe((uiConfig) => {
        if (uiConfig.editor && uiConfig.editor.tei && uiConfig.editor.tei.sections && uiConfig.editor.tei.sections.length > 0) {
            currentSection.set(uiConfig.editor.tei.sections[0]);
        }
    });

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

    onDestroy(() => {
        unsubscribeUiConfig();
    });
</script>

<div id="tei-editor" class="flex flex-col h-full overflow-hidden">
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
                        <li role="presentation">
                            <button on:click={() => { currentSection.set(section); }} class="block px-2 py-1 border-b border-solid {(section.name === $currentSection.name) ? 'border-blue-700' : 'border-gray-300'} transition-colors hover:border-blue-700 focus:border-blu-700" aria-current={section.name === $currentSection}>{section.label}</button>
                        </li>
                    {/each}
                {/if}
                <li role="presentation" class="flex-auto border-b border-solid border-gray-300"></li>
            </ul>
        </nav>
        <div class="flex-auto overflow-hidden">
            {#if $currentSection && $document && $document[$currentSection.name]}
                <TiptapEditor doc={$document[$currentSection.name]} schema={$schema} bubbleMenu={$bubbleMenu} sidebarMenu={$sidebarMenu}/>
            {/if}
        </div>
    {/if}
</div>
