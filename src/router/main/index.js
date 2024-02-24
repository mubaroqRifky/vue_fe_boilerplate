import Main from "@/views/layouts/Main.vue";

import HomeRoute from "./home";
import MasterRoute from "./master";

export default [
    {
        path: "/",
        name: "main",
        component: Main,
        redirect: { name: "getting-started" },
        children: [...HomeRoute, ...MasterRoute],
    },
];
