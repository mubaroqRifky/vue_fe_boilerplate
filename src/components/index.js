import Vue3EasyDataTable from "vue3-easy-data-table";
import vSelect from "vue-select";

import ModalMain from "@/components/modal/ModalMain.vue";
import TableControl from "@/components/table/TableControl.vue";
import BasicInput from "@/components/input/BasicInput.vue";
import BasicCheckbox from "@/components/input/BasicCheckbox.vue";
import CustomSelectSearch from "@/components/input/CustomSelectSearch.vue";

import IconEdit from "@/components/icons/action/IconEdit.vue";
import IconShow from "@/components/icons/action/IconShow.vue";
import IconDelete from "@/components/icons/action/IconDelete.vue";

const components = {
    vTable: Vue3EasyDataTable,
    "v-select": vSelect,

    ModalMain,
    TableControl,
    BasicInput,
    BasicCheckbox,
    CustomSelectSearch,

    IconEdit,
    IconShow,
    IconDelete,
};

export default components;
