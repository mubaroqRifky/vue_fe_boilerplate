<template>
    <div class="flex flex-col items-end gap-3 justify-end w-full">
        <div class="w-full grid gap-3 text-xs">
            <div class="flex justify-end" v-if="canAdd">
                <button
                    class="btn btn-sm btn-primary w-full xs:max-w-[10rem]"
                    @click="$emit('add')"
                >
                    <IconAdd width="15px" height="15px" />
                    {{ addText }}
                </button>
            </div>

            <div class="flex gap-2 items-center w-full max-w-sm">
                <BasicInput
                    class="w-full"
                    placeholder="Search"
                    type="search"
                    :value="searchValue"
                    @update:value="searchValueBinding"
                    @search-enter="emit('searchEnter')"
                    search
                    no-validity
                />

                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import IconAdd from "@/components/icons/action/IconAdd.vue";

const emit = defineEmits(["add", "update:modelValue", "searchEnter"]);

const props = defineProps({
    canAdd: {
        type: Boolean,
        default: true,
    },
    addText: {
        type: String,
        default: "Add Data",
    },
    searchField: {
        default: function () {
            return [];
        },
    },
    modelValue: String,
});

const searchValue = ref(props.modelValue);
const searchValueBinding = (value) => {
    searchValue.value = value;
    emit("update:modelValue", value);
};
</script>

<style lang=""></style>
