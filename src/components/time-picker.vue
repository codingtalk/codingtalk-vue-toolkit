<template>
    <input type="date" @change="change">
</template>

<script setup>
const props = defineProps({
});
const emits = defineEmits(['change'])

const change = (e) => {
    emits('change', e?.target?.value)
}
</script>