<script setup lang="ts">
import { useEvaluationsStore } from '../../stores/evaluations';
import useDataForScoreTables from '../../composables/tables/useDataForScoreTables'
import { useAsyncState } from '@vueuse/core';

const route = useRoute()

const itemId = route.params.item

const item = itemId.toString();

const evaluationsStore = useEvaluationsStore();

const evalData = useAsyncState(async () => {
    return await evaluationsStore.evaluations();
}, undefined);

const evals: any = evalData.state

//

const dmQData = useAsyncState(async () => {
    return await useDataForScoreTables(evalData);
}, undefined);

const qdata = dmQData.state


///

const columns = [
    {
        key: 'firstname',
        label: 'First Name',
    }, {
        key: 'lastname',
        label: 'Last Name',
    }, {
        key: 'gender',
        label: 'Gender'
    },
    {
        key: 'district',
        label: 'District'
    },
    {
        key: 'facility',
        label: 'Facility'
    },
    {
        key: 'date',
        label: 'Evaluation Date'
    },
    {
        key: 'actions',
        label: 'View'
    }
]


const q = ref('')
const page = ref(1)
const pageCount = 5


const items = (row: { id: any; }) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => console.log('Edit', row.id)
        }
    ]
]

const filteredRows = (data: any) => {

    const people = data[item].mentees.dmQ1NotApplicableMentees;

    if (!q.value) {
        return people
    }
    return people.filter((person: any) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        });
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount);
}

</script>
<template>
    <header class="bg-white fixed top-0 w-full shadow-md">
        <nav class="container mx-auto px-6 py-3">
            <div class="flex  items-center">
                <NuxtLink :to="{ name: 'iam-dashboard' }">
                    <p class="p-1 hover:text-green-500">Dashboard</p>
                </NuxtLink>
                <p>|</p>
                <NuxtLink :to="{ name: 'scores-view' }">
                    <p class="p-1 hover:text-green-500">Eval-Items</p>
                </NuxtLink>
                <P>|</P>
                <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>EI-Analysis </strong></p>
            </div>

        </nav>
    </header>

    <div class="container mx-auto px-6 py-24" v-if="qdata">
        {{ qdata[item].mentees.dmQ1NotApplicableMentees }}
        <UContainer>
            <UCard class="mb-5">
                <template #header>
                    <h1 class="text-sm font-semibold">EI-Analysis | <span class="text-orange-500">{{ itemId }}</span></h1>
                </template>

                <div class="">
                    <p class="text-gray-700 text-sm">
                        Below is summary statistics for the evaluation Item <span class="text-green-500 italic">{{ itemId
                        }}</span>
                    </p>
                </div>
                <div class="grid grid-cols-7 mt-2 text-center">

                    <div class=" border border-l border-green-500">
                        <strong>Number of Entries</strong>
                    </div>
                    <div class=" border border-l border-green-500">
                        <strong>Mean</strong>
                    </div>
                    <div class=" border border-green-500">
                        <strong>Median</strong>
                    </div>
                    <div class=" border border-green-500">
                        <strong>Mode</strong>
                    </div>
                    <div class=" border border-green-500">
                        <strong>Standard Deviation</strong>
                    </div>
                    <div class=" border border-green-500">
                        <strong>Sample Kurtosis</strong>
                    </div>
                    <div class=" border border-green-500">
                        <strong>Sample Skewness</strong>
                    </div>

                </div>
                <div class="grid grid-cols-7 text-center">
                    <div class=" border border-l border-green-500">
                        {{ qdata[item].statistics.total }}
                    </div>
                    <div class=" border border-l border-green-500">
                        {{ qdata[item].statistics.mean.toFixed(2) }}
                    </div>
                    <div class=" border border-green-500">
                        {{ qdata[item].statistics.median.toFixed(2) }}
                    </div>
                    <div class=" border border-green-500">
                        {{ qdata[item].statistics.mode }}
                    </div>
                    <div class=" border border-green-500">
                        {{ qdata[item].statistics.standardDeviation.toFixed(4) }}
                    </div>
                    <div class=" border border-green-500">
                        {{ qdata[item].statistics.sampleKurtosis.toFixed(4) }}
                    </div>
                    <div class=" border border-green-500">
                        {{ qdata[item].statistics.sampleSkewness.toFixed(4) }}
                    </div>
                </div>
            </UCard>

            <UCard>
                <template #header>
                    <h1 class="text-sm font-semibold">List of Mentees who scored: <span class="text-gray-500">(0) Not
                            Applicable</span> for Evaluation Item <span class="text-orange-500">{{ itemId }}</span></h1>
                </template>
                <div>
                    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                        <UInput v-model="q" placeholder="Filter people..." />
                    </div>
                    <UTable :columns=columns :rows="filteredRows(qdata)">
                        <template #empty-state>
                            <div class="flex flex-col items-center justify-center py-6 gap-3">
                                <span class="italic text-sm">No one here!</span>
                                <UButton label="Add people" />
                            </div>
                        </template>
                        <template #actions-data="{ row }">
                            <NuxtLink :to="{ name: 'mentees-evaluations-scoreid', params: { scoreid: row.scoreId } }">
                                <UButton  :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="primary"
                                    square variant="outline">
                                    Eval report | <span class=" text-red-500">view</span></UButton>
                            </NuxtLink>

                        </template>
                    </UTable>
                    <UPagination v-model="page" :page-count="pageCount" :total="qdata.length" />
                </div>
            </UCard>

        </UContainer>

        <!-- {{ filteredRows }} -->
        <!-- {{ getFilteredRows(qdata[item].mentees.dmQ1NotApplicableMentees) }} -->
    </div>
</template>