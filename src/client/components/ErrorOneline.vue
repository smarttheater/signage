<template>
    <div class="error-oneline">
        <div><p>{{ errorMsgStr }}</p></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        errorMsgStr: {
            type: String,
            required: true,
        },
    },
});
</script>

<style lang="scss">
    .error-oneline {
        background-color: #ccc;
        border:1px solid #ccc;
        padding: 0 1em;
        font-weight: bold;
        font-size: 0.9em;
    }
</style>

