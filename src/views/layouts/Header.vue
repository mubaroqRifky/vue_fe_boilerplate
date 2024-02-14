<template>
    <header
        class="px-6 py-4 flex gap-8 items-center text-sm justify-between text-gray-dark transition-all"
        :class="{
            'bg-white shadow-lg': isScrolled,
            'bg-primaryDark': view == 'mobile',
        }"
    >
        <div class="flex gap-4 text-xs">
            <button
                @click="$emit('press')"
                class="btn-header"
                :class="
                    view == 'mobile' && !isScrolled
                        ? 'btn-mobile-header'
                        : 'btn-default-header'
                "
            >
                <IconBar width="20px" height="20px" />
            </button>
        </div>

        <section class="flex gap-4 items-center" v-if="user">
            <div class="whitespace-nowrap" v-if="view != 'mobile'">
                <span class="font-semibold text-xs">
                    Hey, {{ user.name }}
                </span>
                <p class="text-[.7rem] leading-3 text-darkGray">User Role</p>
            </div>

            <button
                @click="connfirmLogout"
                class="btn-header"
                :class="
                    view == 'mobile' && !isScrolled
                        ? 'btn-mobile-header'
                        : 'btn-default-header'
                "
            >
                <p v-if="view != 'mobile'">Sign Out</p>
                <IconLogout width="20px" height="20px" />
            </button>
        </section>

        <section class="flex gap-2 items-center" v-else>
            <button
                @click="router.push({ path: '/login' })"
                class="btn-header"
                :class="
                    view == 'mobile'
                        ? 'btn-mobile-header'
                        : 'btn-default-header'
                "
            >
                <p v-if="view != 'mobile'">Sign In</p>
                <IconLogin width="20px" height="20px" />
            </button>
        </section>

        <Transition name="ghost">
            <ModalMain
                v-if="modal.show"
                :type="modal.type"
                :content="modal.content"
                :subcontent="modal.subcontent"
                @close="Modal.close"
                @proses="Modal.onconfirm"
            />
        </Transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import IconBar from "@/components/icons/action/IconBar.vue";
import IconLogout from "@/components/icons/action/IconLogout.vue";
import IconLogin from "@/components/icons/action/IconLogin.vue";
import User from "@/controllers/auth/UserController.js";
import Modal from "@/controllers/state/ModalController.js";
import Loading from "@/controllers/state/LoadingController.js";
import SidebarController from "@/controllers/state/SidebarController.js";

const modal = computed(() => {
    return Modal.get();
});
const user = computed(() => {
    return User.get();
});
const view = computed(() => {
    return SidebarController.get().view;
});

const router = useRouter();

function connfirmLogout() {
    Modal.logout("Yakin ingin logout?");
    Modal.onconfirm = logoutHandler;
}

function logoutHandler() {
    User.remove();
    Modal.onclose = () => {
        window.location.href = "/";
    };

    Loading.start();
    setTimeout(() => {
        Loading.stop();
        Modal.close();
    }, 2000);
}

const isScrolled = ref(false);
const elContainer = ref(null);

onMounted(() => {
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
        elContainer.value = mainContainer;
        elContainer.value.addEventListener("scroll", handleScroll);
    }
});

onBeforeUnmount(() => {
    if (elContainer.value) {
        elContainer.value.removeEventListener("scroll", handleScroll);
    }
});

const handleScroll = () => {
    isScrolled.value = elContainer.value.scrollTop > 0;
};
</script>

<style lang="scss" scoped>
.btn-header {
    @apply rounded-md p-2 transition-all outline-none items-center gap-2 text-xs;
}
.btn-mobile-header {
    @apply hover:bg-primaryLight text-white hover:text-primary;
}
.btn-default-header {
    @apply flex bg-white hover:bg-primaryLight text-gray-dark hover:text-primary;
}
</style>
