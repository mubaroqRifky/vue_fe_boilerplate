<template>
    <div class="flex flex-col gap-3 mt-8">
        <section
            class="p-4 shadow-md border border-solid border-softGray flex flex-col gap-4"
        >
            <h2 class="font-medium my-2">Form {{ title }}</h2>
            <BasicInput
                class="lg:w-1/2"
                label="Name"
                placeholder="Name"
                required
                :disabled="loading || initialPage.isShow"
                :error="payload.errors?.name || errors.name"
                @change="payload.validate('name')"
                v-model:value="payload.name"
            />
            <BasicInput
                class="lg:w-1/2"
                label="Email"
                placeholder="Email"
                required
                :disabled="loading || initialPage.isShow"
                :error="payload.errors?.email || errors.email"
                @change="payload.validate('email')"
                v-model:value="payload.email"
            />
            <BasicCheckbox
                v-if="!initialPage.isCreate"
                class="lg:w-1/2"
                label="Active"
                type="checkbox"
                :value-true="1"
                :value-false="0"
                required
                :disabled="loading || initialPage.isShow"
                :error="payload.errors?.is_active || errors.is_active"
                @change="payload.validate('is_active')"
                v-model:value="payload.is_active"
            />

            <div>
                <button
                    v-if="initialPage.isEdit"
                    class="btn btn-sm btn-primary"
                    :disabled="loading"
                    @click="initialPage.confirmUpdate()"
                >
                    Update
                </button>
                <button
                    v-if="initialPage.isCreate"
                    class="btn btn-sm btn-primary"
                    :disabled="loading"
                    @click="initialPage.confirmSave()"
                >
                    Simpan
                </button>
            </div>
        </section>

        <section
            v-if="!initialPage.isCreate"
            class="p-4 shadow-md border border-solid border-softGray flex flex-col gap-4"
        >
            <div class="grid grid-cols-2 md:flex mt-2 text-xs">
                <template v-for="(item, index) in tabs" :key="index">
                    <button
                        @click="activeTab = item.value"
                        class="px-4 py-2 md:w-40 border border-solid transition-all outline-none"
                        :class="
                            activeTab == item.value
                                ? 'bg-primary text-white border-primary'
                                : 'border-lightGray'
                        "
                    >
                        {{ item.text }}
                    </button>
                </template>
            </div>

            <section class="grid content-start mt-4 gap-4">
                <TableControl
                    :can-add="initialPage.isEdit"
                    :add-text="`Assign ${
                        tabs.find((v) => v.value == activeTab).text
                    }`"
                    @add="showModalForm"
                    :search-field="table.searchField"
                    v-model="table.searchValue"
                />
                <vTable
                    table-class-name="main-table"
                    theme-color="#00dc82"
                    :headers="table.headers"
                    :items="table.items"
                    :rows-items="table.itemShows"
                    :loading="table.loading"
                    :rows-per-page="table.rowsPerPage"
                    :search-field="table.searchField"
                    :search-value="table.searchValue"
                    buttons-pagination
                    show-index
                >
                    <template #header-action="header">
                        <div class="flex justify-center w-full">
                            {{ header.text }}
                        </div>
                    </template>
                </vTable>
            </section>
        </section>

        <ModalForm
            v-if="modalTable"
            :content="'Assign Permission'"
            :loading="loading"
            @close="closeModalTable"
            @proses="syncHandler"
            actionClass="justify-end"
            btnClass=""
            btnCancel="Batal"
            btnConfirm="Sync"
        >
            <section class="grid content-start gap-4">
                <TableControl
                    :can-add="false"
                    :search-field="stateTableModal.searchField"
                    v-model="stateTableModal.searchValue"
                    @search-enter="searchModalTable"
                />
                <vTable
                    table-class-name="main-table fixed"
                    theme-color="#00dc82"
                    v-model:server-options="stateTableModal.serverOptions"
                    :server-items-length="stateTableModal.total"
                    :headers="stateTableModal.headers"
                    :items="mapItems"
                    :rows-items="stateTableModal.itemShows"
                    :loading="stateTableModal.loading"
                    :search-field="stateTableModal.searchField"
                    :search-value="stateTableModal.searchValue"
                    v-model:items-selected="itemsSelected"
                    fixed-checkbox
                    :checkbox-column-width="36"
                    buttons-pagination
                />
            </section>
        </ModalForm>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";
import ModalForm from "@/components/modal/ModalForm.vue";
import PageUserController from "@/controllers/page/PageUserController";
import InputValidationController from "@/controllers/state/InputValidationController";
import PagePermissionController from "@/controllers/page/PagePermissionController";
import PageRoleController from "@/controllers/page/PageRoleController";

const route = useRoute();
const title = route.meta.title;
const id = route.params.id;

const initialPage = new PageUserController();
const { payload, loading, data } = initialPage.buildForm();
const errors = computed(() => InputValidationController.get());

const itemsSelected = ref([]);
const modalTable = ref(false);

const activeTab = ref("roles");
const tabs = ref([
    { text: "Role", value: "roles" },
    { text: "Permission", value: "permissions" },
]);

const headers = reactive({
    roles: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
    ],
    permissions: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
    ],
});

const table = reactive({
    headers: headers[activeTab.value],
    items: [],
    rowsPerPage: 5,
    loading,
    searchField: ["name"],
    searchValue: "",
});

watchEffect(() => {
    table.headers = headers[activeTab.value] || [];
    table.items = data.value[activeTab.value] || [];
});

const mapItems = computed(() => {
    return stateTableModal.value.items.map((val) => {
        let result = {};
        switch (activeTab.value) {
            default:
                result.id = val.id;
                result.name = val.name;
                result.description = val.description;
                break;
        }
        return result;
    });
});

const initialPermission = new PagePermissionController();
initialPermission.initialTable.headers.pop();

const initialRole = new PageRoleController();
initialRole.initialTable.headers.pop();

let stateTableModal = ref({});
const modalTableInitial = ref(null);
const path = ref("");

const showModalForm = () => {
    switch (activeTab.value) {
        case "roles":
            stateTableModal.value = reactive(initialRole.buildTable());
            modalTableInitial.value = initialRole;
            path.value = "role";
            break;
        case "permissions":
            stateTableModal.value = reactive(initialPermission.buildTable());
            modalTableInitial.value = initialPermission;
            path.value = "permission";
            break;
        default:
            break;
    }
    modalTableInitial.value.index();
    itemsSelected.value = [...table.items];
    modalTable.value = true;
};

const closeModalTable = () => {
    stateTableModal.value.searchValue = "";
    stateTableModal.value.serverOptions.page = 1;
    modalTable.value = false;
};
const searchModalTable = () => {
    if (modalTableInitial.value) modalTableInitial.value.search();
};

const syncHandler = async () => {
    try {
        const values = itemsSelected.value.map((val) => val.name);
        await initialPage.sync(path.value, activeTab.value, values);
    } catch (error) {
        throw new ErrorHandler(error);
    } finally {
        closeModalTable();
    }
};

onMounted(() => id && initialPage.show(id));
</script>

<style lang=""></style>
