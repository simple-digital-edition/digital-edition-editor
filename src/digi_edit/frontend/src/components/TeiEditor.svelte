<script lang="ts">
    export let text;
</script>

<div class="flex flex-col">
    <nav class="flex-none">
        <ul class="flex flex-row">
            <li>
                <button>Save</button>
            </li>
            <li>
                <button>Discard</button>
            </li>
        </ul>
    </nav>
    <div class="flex-auto">
        {text}
    </div>
</div>
