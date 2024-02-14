<template lang="">
    <div class="width-constraint">
        <section
            class="flex items-center justify-center lg:gap-6 px-4 md:px-8 h-full"
        >
            <div
                class="max-w-sm text-center grid gap-6 content-center items-center justify-items-center px-4 md:px-8 py-8 rounded-sm"
            >
                <img :src="logo" class="w-40" alt="Logo CP Petindo" />
                <div class="flex flex-col gap-1 justify-center items-center">
                    <h1 class="text-xl uppercase font-bold tracking-widest">
                        Welcome Back!
                    </h1>
                    <h2>Login to Continue</h2>
                </div>
                <p class="text-xs leading-4">
                    Mohon login menggunakan email @cpp.co.id yang sudah
                    terhubung dengan desktop Anda
                </p>

                <div class="text-black mt-2 flex justify-center">
                    <button
                        class="google-btn shadow-primary whitespace-nowrap max-w-xs"
                        alt="Sign In"
                        @click="googleLoginHandler"
                        :disabled="loading"
                    >
                        <IconGoogle width="20px" height="20px" />
                        Masuk dengan Google
                        <MoonLoader
                            :loading="loading"
                            :size="'20px'"
                            class="absolute right-4 text-primaryDark"
                        ></MoonLoader>
                    </button>

                    <GoogleLogin
                        ref="ref_btn"
                        class="hidden"
                        :params="params"
                        :renderParams="renderParams"
                        :success="onsuccess"
                    />
                </div>
            </div>
        </section>

        <Transition name="ghost">
            <ModalMain
                v-if="getModalState.show"
                :type="getModalState.type"
                :content="getModalState.content"
                :subcontent="getModalState.subcontent"
                @close="closeModalHandler"
                @proses="getModalState.onconfirm"
            />
        </Transition>
    </div>
</template>

<script>
import logo from "@/assets/images/logoCpp.png";
import IconGoogle from "@/components/icons/page/IconGoogle.vue";
import GoogleLogin from "@/components/button/GoogleLogin.vue";

import Authenticate from "@/apis/Authenticate";

import Modal from "@/controllers/state/ModalController";
import Loading from "@/controllers/state/LoadingController";
import User from "@/controllers/auth/UserController";

import MoonLoader from "vue-spinner/src/MoonLoader.vue";

export default {
    data() {
        return {
            logo,
            params: {
                client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true,
            },
        };
    },
    components: {
        IconGoogle,
        GoogleLogin,
        MoonLoader,
    },
    computed: {
        loading: () => Loading.get(),
        getModalState: () => Modal.get(),
        closeModalHandler: () => Modal.close,
    },
    methods: {
        googleLoginHandler() {
            try {
                const btn = this.$refs?.ref_btn?.btn;
                if (btn) btn.click();
                else throw new Error("Hey Login Google Belum Siap!");
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        async onsuccess(response) {
            try {
                const id_token = response.credential;
                this.loginHandler(id_token);
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        async loginHandler(id_token) {
            try {
                const { data } = await Authenticate.login(id_token);
                // setTimeout(() => {
                //     User.set(id_token);
                //     this.$router.push({ path: "/" });
                // }, 1000);
                User.set(data.token);
                this.$router.push({ path: "/" });
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.google-btn {
    @apply w-full px-12 py-2.5 rounded-md outline-none flex gap-2 items-center justify-center justify-items-center  hover:bg-primary hover:text-white transition-all hover:border-primary bg-white text-sm;
}

.shadow-primary {
    box-shadow: 1px 2px 10px -4px gray;
}
</style>
