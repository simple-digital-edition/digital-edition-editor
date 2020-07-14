<script lang="ts">
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AriaDialog extends Vue {
    public render(): void | VNode[] {
        if (this.$scopedSlots.default) {
            return this.$scopedSlots.default({});
        }
    }
}
</script>
