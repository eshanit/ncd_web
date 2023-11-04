<script setup lang="ts">
import { ref } from 'vue';
import { useEvaluationsStore } from '../../stores/evaluations';
import { useEvaluatorsStore } from '../../stores/evaluators'
import { useAsyncState } from '@vueuse/core';

const iamStore = useIamProfileStore();
const { useLogUserOut, profile } = useAuthStuff()

const evaluatorStore = useEvaluatorsStore();
const evaluationsStore = useEvaluationsStore();

const evaluatorData = useAsyncState(async () => {
    return await evaluatorStore.evaluators();
}, undefined);

const evaluators: any = evaluatorData.state



////

//evals
const evalData: any = useAsyncState(async () => {
    return await evaluationsStore.evaluations();
}, undefined);

const evals: any = evalData.state

// columns

const columns = [
    {
        key: 'firstname',
        label: 'Evaluator name'
    }, {
        key: 'surname',
        label: 'Evaluator lastname'
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


const page = ref(1)
const pageCount = 5

const getRows = (data: any) => {


    return data.slice((page.value - 1) * pageCount, (page.value) * pageCount)

}


</script>
<template>
       <header class="fixed top-0 w-full ">
        <nav class=" mx-auto  flex">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex flex-wrap items-center">
                    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">

                        <NuxtLink :to="{ name: 'iam-dashboard' }">
                            <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
                        </NuxtLink>
                        <p>|</p>
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Evaluators</strong></p>

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
    <div class="my-12" v-if="evaluators" >
        <UContainer>
            <UCard>
                <template #header>
                    <h4 class="card-title my-1"><strong>Evaluators</strong></h4>
                    <p>Below is a list of the <span class="text-orange-500"><strong>{{ evaluators.length }}</strong></span> lead evaluators and the number of evaluations they have done, click the <span class="text-green-500 italic">green </span>button to see a breakdown of the evaluations.</p>
                </template>
                <UTable :columns=columns :rows="getRows(evaluators)">
                    <template #empty-state>
                        <div class="flex flex-col items-center justify-center py-6 gap-3">
                            <span class="italic text-sm">No one here!</span>
                            <UButton label="Add people" />
                        </div>
                    </template>
                    <template #actions-data="{ row }" v-if="evals">
                        <NuxtLink :to="{ name: 'evaluators-id', params: { id: row._id } }">
                            <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="primary" square
                                variant="outline" v-if="evaluationsStore.evaluationsByEvaluator(evals)[row._id]"> Evals | <span
                                    class=" text-orange-500">{{ evaluationsStore.evaluationsByEvaluator(evals)[row._id].length  }}</span></UButton>
                            <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="red" square
                                variant="outline" v-else disabled>Evals | 0</UButton>
                        </NuxtLink>

                    </template>
                </UTable>
                <UPagination v-model="page" :page-count="pageCount" :total="evaluators.length" />
            </UCard>
        </UContainer>
    </div>
</template>