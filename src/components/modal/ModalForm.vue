<template lang="">
    <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-blur flex justify-center items-center z-50"
        @click.self.stop="!loading && $emit('close')"
        @keyup.escape="!loading && $emit('close')"
    >
        <div
            class="modal-body modal-glass relative flex flex-col justify-center px-5 md:px-10 py-5 pt-5"
        >
            <button
                class="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1.5 text-xs"
                @click.stop="$emit('close')"
                :disabled="loading"
                alt="Cancel"
            >
                <IconClose width="8px" height="8px" />
            </button>

            <div class="gap-5 flex flex-col">
                <div class="grid gap-1 content-start">
                    <h2
                        class="text-gray-dark text-lg font-bold text-center max-w-sm mx-auto"
                    >
                        {{ content }}
                    </h2>

                    <p
                        v-if="subcontent"
                        class="text-center text-sm font-semibold text-gray-dark text-elipsis elipsis-3"
                        :title="subcontent"
                    >
                        {{ subcontent }}
                    </p>
                </div>

                <div class="grid w-full gap-4">
                    <slot></slot>
                </div>

                <div
                    class="w-full md:w-auto flex flex-col-reverse md:flex-row gap-3 md:gap-4"
                    :class="actionClass"
                    v-if="!$slots.action"
                >
                    <button
                        class="btn btn-sm btn-tertiary w-full md:w-36 justify-center"
                        @click.stop="$emit('close')"
                        :disabled="loading"
                        alt="Cancel"
                    >
                        {{ btnCancel }}
                    </button>
                    <button
                        class="btn btn-sm btn-primary w-full md:w-36 justify-center gap-4"
                        @click.stop="!loading && $emit('proses')"
                        :disabled="loading"
                        id="confirm_yes"
                        alt="Confirm"
                    >
                        {{ btnConfirm }}
                        <BounceLoaderVue
                            :loading="loading"
                            :color="'white'"
                            :size="'20px'"
                            class="absolute right-3"
                        ></BounceLoaderVue>
                    </button>
                </div>

                <slot name="action"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import IconClose from "../icons/action/IconClose.vue";
import BounceLoaderVue from "vue-spinner/src/BounceLoader.vue";
import Loading from "@/controllers/state/LoadingController";

export default {
    data() {
        return {};
    },
    components: {
        IconClose,
        BounceLoaderVue,
    },
    watch: {},
    props: {
        content: {
            type: String,
            default: "",
        },
        subcontent: {
            type: String,
            default: "",
        },
        btnConfirm: {
            default: "Iya",
        },
        btnCancel: {
            default: "Kembali",
        },
        actionClass: {
            default: "justify-center items-center mt-8",
        },
        btnClass: {
            default: "w-full",
        },
    },
    computed: {
        loading() {
            return Loading.get();
        },
    },
    methods: {
        btnYesFocus() {
            const btnYes = document.getElementById("confirm_yes");
            if (btnYes) {
                btnYes.focus();
            }
        },
    },
    mounted() {
        this.btnYesFocus();
    },
};
</script>

<style lang="scss" scoped>
.modal-glass {
    background: linear-gradient(
        148.05deg,
        rgba(255, 255, 255, 0.8) 9.93%,
        rgba(255, 255, 255, 0.5) 91.86%
    );
    backdrop-filter: blur(10px);
}
.modal-body {
    @apply w-3/4 max-w-2xl bg-white border border-solid rounded-xl border-primary;

    .btn-close-modal {
        @apply bg-gray-dark text-white rounded-full p-1 w-6 h-6 flex justify-center items-center -top-2 -right-2 absolute;
    }
}
</style>
