<script setup lang="ts">
import { useEvaluationsStore } from '../../stores/evaluations';
import { useAsyncState } from '@vueuse/core';
import evaluatorEvalsTable from '../../composables/tables/evaluatorEvalsTable'

const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()


const route = useRoute()

const evaluatorId = route.params.id

const evaluationsStore = useEvaluationsStore();

//evals
const evaluationsData = useAsyncState(async () => {
    return await evaluationsStore.getEvalByEvaluator(evaluatorId);
}, undefined);

const evals: any = evaluationsData.state


const getEvalsData = useAsyncState(async () => {
    return await evaluatorEvalsTable(evaluationsData);
}, undefined);

const evalsData: any = getEvalsData.state

const columns = [
    {
        key: 'menteeFirstname',
        label: 'Mentee name'
    }, {
        key: 'menteeLastname',
        label: 'Mentee lastname'
    },
    {
        key: 'mennteeMeanScore',
        label: 'Eval Mean Score'
    },
    {
        key: 'numCoMentors',
        label: 'Comentors'
    },

    {
        key: 'actions',
        label: 'View'
    }]
//
const items = (row: { id: any; }) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => console.log('Edit', row.id)
        }
    ]
]

const q = ref('')
const page = ref(1)
const pageCount = 5

const getRows = (data: any) => {

    console.log(data)

    return data.filter((person: any) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        });
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount)

}


</script>
<template>
        <header class="bg-white fixed top-0 w-full">
        <nav class=" mx-auto flex">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex flex-wrap items-center">
                    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">

                        <NuxtLink :to="{ name: 'iam-dashboard' }">
                            <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
                        </NuxtLink>
                        <p>|</p>
                        <NuxtLink :to="{ name: 'evaluators-view' }">
                            <p class="p-1 hover:text-green-500 text-gray-500"><strong>Evaluators</strong></p>
                        </NuxtLink>
                        <p>|</p>
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Evaluations</strong></p>

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
    <div class="my-12" v-if="evalsData">
        <UContainer>
            <UCard>
                <template #header>
                    <div class="text-orange-500 text-sm my-2"><strong>List of Evaluations</strong></div>
                    <div class="text-sm">Below is a list of all the <span class=" text-orange-500 italic"><strong>{{ evalsData.length }}</strong></span> evaluations  done by <span class="italic text-green-500">
                           <strong>{{ evalsData[0].evalInfo }}</strong> </span>.  To see the report on an evaluation, click the evaluation report button.
                        button. </div>
                </template>
                <div>
                    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                        <UInput v-model="q" placeholder="Filter people..." />
                    </div>
                    <UTable :columns=columns :rows="getRows(evalsData)">
                        <template #empty-state>
                            <div class="flex flex-col items-center justify-center py-6 gap-3">
                                <span class="italic text-sm">No one here!</span>
                                <UButton label="Add people" />
                            </div>
                        </template>
                        <template #actions-data="{ row }">
                            <NuxtLink :to="{ name: 'mentees-evaluations-scoreid', params: { scoreid: row.evalId } }">
                                <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="primary"
                                    square variant="outline">
                                    Eval report | <span class=" text-red-500">view</span></UButton>
                            </NuxtLink>

                        </template>
                    </UTable>
                    <UPagination v-model="page" :page-count="pageCount" :total="evalsData.length" />
                </div>
            </UCard>

        </UContainer>
    </div>
</template>