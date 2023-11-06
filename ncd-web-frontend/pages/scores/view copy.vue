<script setup lang="ts">
import { useEvaluationsStore } from '../../stores/evaluations';
import useDataForScoreTables from '../../composables/tables/useDataForScoreTables'
import { useAsyncState } from '@vueuse/core';
const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()

const evaluationsStore = useEvaluationsStore();

const evalData = useAsyncState(async () => {
    return await evaluationsStore.evaluations();
}, undefined);

const evals: any = evalData.state;

const dmQData = useAsyncState(async () => {
    return await useDataForScoreTables(evalData);
}, undefined);

const qdata = dmQData.state

//
const columns = [
    {
        key: 'actions',
        label: 'Evaluation Item',

    }, {
        key: 'total',
        label: 'Number of Entries',
        sortable: true
    }, {
        key: 'mean',
        label: 'Mean',
        sortable: true
    }, {
        key: 'median',
        label: 'Median',
        sortable: true,
        direction: 'desc'
    },
    {
        key: 'mode',
        label: 'Mode',
        sortable: true,
        direction: 'desc'
    },
    {
        key: 'standardDeviation',
        label: 'Standard Deviation',
        sortable: true,
        direction: 'desc'
    },
    {
        key: 'sampleKurtosis',
        label: 'Sample Kurtosis',
        sortable: true,
        direction: 'desc'
    },
    {
        key: 'sampleSkewness',
        label: 'Sample Skewness',
        sortable: true,
        direction: 'desc'
    }
]

///

</script>
<template>
   <header class="bg-white fixed top-0 w-full">
        <nav class="mx-auto  flex">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex flex-wrap items-center">
                    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">
                        <NuxtLink :to="{ name: 'iam-dashboard' }">
                            <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
                        </NuxtLink>
                        <p>|</p>
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Scores</strong></p>

                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right py-2">
                        <!-- <span class="text-xs pr-1 text-gray-500"><strong>{{ profile?.data.first_name }}</strong></span> -->
                        <button
                            class="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button" @click="useLogUserOut(iamStore)">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <!-- <p>{{ qdata }}</p> -->
    <div class="my-28" v-if="qdata">

        <UContainer>
            <UCard>
                <template #header>
                    <h1 class="text-sm font-semibold">EI-Analysis | <span class="text-orange-500">all evaluation
                            items</span></h1>
                </template>
                <div class="">
                    <p class="text-gray-700 text-sm">
                        Below is summary statistics for the evaluation
                    </p>
                </div>

                <UTable :columns?="columns" :rows="qdata.combinedTableData">
                    <template #actions-data="{ row }">
                        <NuxtLink :to="{ name: 'scores-item', params: { item: row.item } }">
                            <UButton icon="i-heroicons-clipboard-document" size="sm" color="purple" square
                                variant="outline">{{ row.item }}</UButton>
                        </NuxtLink>
                    </template>

                </UTable>

            </UCard>
        </UContainer>

    </div>
</template>