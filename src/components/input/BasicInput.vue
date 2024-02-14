<template>
    <div class="relative">
        <label
            class="input-wrapper"
            :class="[
                invalid?.message
                    ? 'danger focus-error'
                    : theme == 'primary'
                    ? 'primary focus-primary'
                    : 'primary focus-secondary',
            ]"
        >
            <span class="input-label" v-if="label">
                {{ label }}
                <i v-if="required" class="text-danger">*</i>
            </span>
            <div
                v-if="
                    ['text', 'number', 'email', 'password', 'search'].includes(
                        type
                    )
                "
                class="relative"
            >
                <input
                    :type="type"
                    class="input-base"
                    :placeholder="placeholder"
                    :value="value"
                    @input="inputHandler"
                    :disabled="disabled"
                    @keyup.enter="emit('searchEnter')"
                />
                <IconSearch
                    v-if="search && !value"
                    className="absolute text-gray right-2 top-1/2 -translate-y-1/2 pointer-events-none "
                    width="20px"
                />
            </div>
            <textarea
                v-else-if="type == 'textarea'"
                cols="20"
                rows="5"
                class="input-base"
                :placeholder="placeholder"
                :value="value"
                @input="emit('update:value', $event.target.value)"
                :disabled="disabled"
            ></textarea>
            <slot v-if="type == 'file'" name="file"></slot>
        </label>

        <p v-if="!noValidity" class="text-danger text-[.6rem] mt-1">
            {{ invalid?.message || "&nbsp;" }}
        </p>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import IconSearch from "@/components/icons/action/IconSearch.vue";

const emit = defineEmits(["update:value", "searchEnter"]);

const props = defineProps({
    required: {
        type: Boolean,
        default: false,
    },
    noValidity: {
        type: Boolean,
        default: false,
    },
    theme: {
        default: "primary",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    search: {
        type: Boolean,
        default: false,
    },
    info: {
        default: "",
    },
    label: {
        default: false,
    },
    type: {
        default: "text",
    },
    placeholder: {
        default: "",
    },
    error: {
        default: function () {
            return {};
        },
    },
    value: String,
});

const validity = ref({});
const invalid = computed({
    get: () => validity.value,
    set: () => (validity.value = {}),
});

watch(
    () => props.value,
    () => (invalid.value = {})
);
watch(
    () => props.error,
    (value) => {
        if (typeof value == "string") {
            validity.value = { message: value };
        } else {
            validity.value = value;
        }
    }
);

const inputHandler = (e) => {
    const value = e.target.value;
    emit("update:value", value);
};
</script>

<style lang="scss">
.input-base {
    @apply px-2 py-[.4rem] w-full outline-none border border-lightGray rounded-md outline outline-offset-[1.5px];
}

.input-wrapper {
    @apply grid gap-1 content-start items-center text-xs w-full md:min-w-[14rem];

    &.primary {
        input,
        textarea {
            &:disabled {
                @apply bg-softGray;
            }
        }
    }

    &.danger {
        input,
        textarea {
            @apply border-danger;

            &:disabled {
                @apply bg-softGray;
            }
        }

        .vs__search {
            border: none !important;
        }

        .vs__dropdown-toggle,
        .dp__input_reg {
            border: 1px solid #ca3333 !important;
        }
    }

    &.focus-primary {
        input,
        textarea {
            &.input-base:focus {
                @apply outline-primaryOutline border-primaryDark;

                & + span {
                    @apply text-primary;
                }
            }
        }
    }
    &.focus-secondary {
        input,
        textarea {
            &.input-base:focus {
                @apply outline-secondaryOutline border-secondaryDark;

                & + span {
                    @apply text-secondary;
                }
            }
        }
    }

    &.focus-error {
        input,
        textarea {
            &.input-base:focus,
            &.input-border {
                @apply outline-dangerOutline;
            }
        }
    }

    .input-label {
        @apply text-[.7rem] whitespace-normal font-semibold;
    }
}
</style>
