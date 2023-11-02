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
    }
]

// const getPeople = (data: any) => (
//     data.map((item: any) => {
//         return {
//             firstname: item.firstname,
//             lastname: item.lastname,
//             gender: item.gender,
//             district: item.district,
//             facility: item.facility,
//             date: item.date
//         }
//     })
// )
const q = ref('');


const getFilteredRows:any = (data: any) => {

   let people = data
    
    const filteredRows = computed(() => {

        if (!q.value) {
            return people
        }
        return people.filter((person: any) => {
            return Object.values(person).some((value) => {
                return String(value).toLowerCase().includes(q.value.toLowerCase())
            })
        })
    })

    return filteredRows;

}


//

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
                    <UTable :rows="getFilteredRows(qdata[item].mentees.dmQ1NotApplicableMentees)" :columns="columns" />
                </div>
            </UCard>

        </UContainer>
{{ getFilteredRows(qdata[item].mentees.dmQ1NotApplicableMentees) }}
    </div>
</template>