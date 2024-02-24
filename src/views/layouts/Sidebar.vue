<template>
    <span
        v-if="open && view != 'desktop'"
        class="bg-blur fixed top-0 left-0 right-0 bottom-0 z-10"
        @click="SidebarController.close()"
    />

    <aside
        class="flex flex-col text-xs transition-all bg-white z-10 top-0 bottom-0"
        :class="open ? 'w-[15rem]' : 'w-[5rem]'"
        :style="styleContainer"
        @mouseover="!open && mouseHandler('open')"
        @mouseleave="open && mouseHandler('close')"
    >
        <div
            class="flex gap-2 items-center px-4 pt-4 pb-4 cursor-pointer text-primaryDark overflow-hidden"
            :class="open ? 'justify-start' : 'justify-center'"
            @click="$router.push('/')"
        >
            <IconMain width="35px" height="35px" />
            <article class="flex flex-col text-gray-dark" v-if="open">
                <h1
                    class="uppercase font-bold text-lg leading-5 whitespace-nowrap"
                >
                    Starter Code
                </h1>
                <p class="text-sm leading-3 whitespace-nowrap">
                    Frontend Boilerplate
                </p>
            </article>
        </div>

        <ul
            class="px-4 flex flex-1 flex-col pt-4 pb-4 overflow-y-auto scrollbar-secondary gap-4 text-darkGray"
        >
            <template v-for="(item, index) in list_menu" :key="index">
                <template v-if="item.child">
                    <div
                        class="parent-container"
                        :class="isMenuActive(item) ? 'bg-primaryLight' : ''"
                    >
                        <li
                            class="list-menu menu-parent justify-between"
                            :class="[
                                open ? 'show' : 'close',
                                route.name.match(item.name)
                                    ? 'text-primary  font-medium'
                                    : '',
                            ]"
                            @click="showChildHandler(item)"
                        >
                            <div class="flex items-center gap-2">
                                <component
                                    v-if="item.icon"
                                    :is="item.icon"
                                    width="20px"
                                    height="20px"
                                ></component>
                                <span v-if="open">
                                    {{ item.text }}
                                </span>
                            </div>
                            <IconArrow
                                v-if="open"
                                class="transition-transform"
                                :class="isMenuActive(item) ? 'rotate-90' : ''"
                                width="15px"
                                height="15px"
                            />
                        </li>
                        <div
                            :style="
                                isMenuActive(item)
                                    ? '--height: 100%'
                                    : '--height: 0px'
                            "
                            class="child-container transition-all"
                            :class="isMenuActive(item) ? 'mt-2' : 'mt-0'"
                        >
                            <ul
                                class="flex-1 flex flex-col gap-2 overflow-hidden h-full"
                            >
                                <li
                                    v-for="(child, i) in item.child"
                                    :key="i"
                                    class="list-menu"
                                    :class="[
                                        open ? 'show' : 'close',
                                        route.name == child.name &&
                                            'child-active',
                                    ]"
                                >
                                    <router-link
                                        :to="{ path: child.link }"
                                        :class="[
                                            !open && 'justify-center',
                                            isMenuActive(child) &&
                                                'router-link-active',
                                        ]"
                                    >
                                        <component
                                            v-if="child.icon"
                                            :is="child.icon"
                                            width="20px"
                                            height="20px"
                                        ></component>
                                        <span v-if="open">
                                            {{ child.text }}
                                        </span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>

                <li v-else class="list-menu" :class="open ? 'show' : 'close'">
                    <router-link
                        :to="{ path: item.link }"
                        :class="[open ? '' : 'justify-center']"
                    >
                        <component
                            v-if="item.icon"
                            :is="item.icon"
                            width="20px"
                            height="20px"
                        ></component>
                        <span v-if="open">
                            {{ item.text }}
                        </span>
                    </router-link>
                </li>
            </template>
        </ul>
    </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import IconMain from "@/components/icons/page/IconMain.vue";
import IconArrow from "@/components/icons/page/IconArrow.vue";

import SidebarController from "@/controllers/state/SidebarController.js";

import menu from "@/static/menu";
const list_menu = ref(menu);

const route = useRoute();

const showChildHandler = (menu) => {
    menu.show = !menu.show;
};

let props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

const isCurrentOpen = ref(!props.open);

const mouseHandler = (type) => {
    if (type == "open") {
        SidebarController.open();
        isCurrentOpen.value = true;
    } else if (type == "close" && isCurrentOpen.value) {
        SidebarController.close();
        isCurrentOpen.value = false;
    }
};

const view = computed(() => {
    return SidebarController.get().view;
});

const styleContainer = computed(() => {
    const position = view.value != "desktop" ? "fixed" : "relative";
    const transform =
        view.value == "mobile" && !props.open
            ? "translateX(-100%)"
            : "translateX(0)";

    return {
        transition: "all .25s ease",
        position,
        transform,
    };
});

const setViewMobile = (windowElement) => {
    if (windowElement.innerWidth > 768) {
        SidebarController.view("desktop");
    } else if (windowElement.innerWidth > 425) {
        SidebarController.view("tablet");
        SidebarController.close();
    } else {
        SidebarController.view("mobile");
        SidebarController.close();
    }
};
const resizeHandler = (evt) => {
    setViewMobile(evt.target);
};

const isMenuActive = (item) => {
    return item.show || route.name.match(item.name);
};

onMounted(() => {
    window.addEventListener("resize", resizeHandler);
    setViewMobile(window);
});

onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
});
</script>

<style lang="scss" scoped>
.menu-parent {
    @apply py-2.5 px-4;

    :has(.child-active) & {
        /* @apply text-primary  font-medium; */
    }
}
.parent-container {
    @apply flex flex-col rounded-2xl;
}
.child-container {
    height: var(--height);
}

.list-menu {
    a {
        &.router-link-active,
        &.router-link-exact-active {
            @apply text-white  bg-primary rounded-2xl;

            span {
                @apply font-bold;
            }
        }
    }

    @apply transition-all rounded-2xl cursor-pointer flex items-center hover:text-white hover:bg-primary;

    &.show {
        @apply whitespace-nowrap;

        > a {
            @apply px-4 py-2.5;
        }
    }

    &.close {
        @apply justify-center;

        > a {
            @apply px-3.5 py-2.5;
        }
    }

    > a {
        @apply flex items-center gap-2 flex-1;
    }

    span {
        @apply font-medium;
    }
}
</style>
