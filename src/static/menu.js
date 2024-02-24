import { shallowRef } from "vue";

import IconMenuStarting from "@/components/icons/menu/IconMenuStarting.vue";

import IconMenuMaster from "@/components/icons/menu/IconMenuMaster.vue";
import IconMenuUser from "@/components/icons/menu/IconMenuUser.vue";
import IconMenuRole from "@/components/icons/menu/IconMenuRole.vue";
import IconMenuPermission from "@/components/icons/menu/IconMenuPermission.vue";

export default [
    {
        text: "Getting Started",
        link: "getting-started",
        icon: shallowRef(IconMenuStarting),
        name: "docs-getting-started",
    },
    {
        text: "Master",
        icon: shallowRef(IconMenuMaster),
        name: "master",
        child: [
            {
                text: "User",
                link: "/master/user",
                icon: shallowRef(IconMenuUser),
                name: "master-user",
            },
            {
                text: "Role",
                link: "/master/role",
                icon: shallowRef(IconMenuRole),
                name: "master-role",
            },
            {
                text: "Permission",
                link: "/master/permission",
                icon: shallowRef(IconMenuPermission),
                name: "master-permission",
            },
        ],
    },
];
