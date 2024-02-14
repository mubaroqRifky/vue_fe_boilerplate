<template>
    <div class="flex flex-col gap-3 mt-8">
        <TableControl
            add-text="Add Permission"
            @add="initialPage.addItem()"
            :search-field="state.searchField"
            v-model="state.searchValue"
            @search-enter="initialPage.search()"
        />

        <vTable
            table-class-name="main-table"
            theme-color="#00dc82"
            v-model:server-options="state.serverOptions"
            :server-items-length="state.total"
            :headers="state.headers"
            :items="state.items"
            :rows-items="state.itemShows"
            :loading="state.loading"
            :search-field="state.searchField"
            :search-value="state.searchValue"
        >
            <template #header-action="header">
                <div class="flex justify-center w-full">
                    {{ header.text }}
                </div>
            </template>
            <template #item-action="item">
                <div class="flex gap-2 items-center justify-center">
                    <button
                        class="text-green-dark"
                        @click="initialPage.editItem(item)"
                    >
                        <IconEdit width="20px" height="20px" />
                    </button>
                    <button
                        class="text-success"
                        @click="initialPage.showItem(item)"
                    >
                        <IconShow width="20px" height="20px" />
                    </button>
                    <button
                        class="text-danger"
                        @click="initialPage.confirmDelete(item)"
                    >
                        <IconDelete width="20px" height="20px" />
                    </button>
                </div>
            </template>
        </vTable>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import PagePermissionController from "@/controllers/page/PagePermissionController";

const initialPage = new PagePermissionController();
const state = reactive(initialPage.buildTable());

onMounted(() => initialPage.index());
</script>

<style lang="scss"></style>
