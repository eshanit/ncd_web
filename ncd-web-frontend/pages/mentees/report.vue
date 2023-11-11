<script setup lang="ts">
import { useMenteesStore } from '../../stores/mentees';
import { useEvaluationsStore } from '../../stores/evaluations';
import { useAsyncState } from '@vueuse/core';

const firstname = localStorage.getItem('user')
const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()


const menteesStore = useMenteesStore();
const evaluationsStore = useEvaluationsStore();

//set

//set
localStorage.setItem('from', 'mentees-report')

localStorage.setItem('id', '')

//mentees
const menteesData = useAsyncState(async () => {
    return await menteesStore.mentees();
}, undefined);

const mentees: any = menteesData.state

const q = ref('')
const page = ref(1)
const pageCount = 5

const getRows = (data: any) => {


    return data.filter((person: any) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        });
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount)

}

//

const menteeEvalData: any = useAsyncState(async () => {
    return await evaluationsStore.evaluations();
}, undefined);

const evals: any = menteeEvalData.state

// columns

const columns = [
    {
        key: 'firstname',
        label: 'Mentee name'
    }, {
        key: 'surname',
        label: 'Mentee lastname'
    },
    {
        key: 'gender',
        label: 'Gender'
    },
    {
        key: 'contact',
        label: 'Contact'
    },
    {
        key: 'district',
        label: 'District'
    }, {
        key: 'facility',
        label: 'Facility'
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

/// chart

const chartOptions = {

    labels: ["Male", "Female"],

};


const series = (data: any) => {
    return [(data.Male).length, (data.Female).length];
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
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Mentees</strong></p>

                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right py-2">
                        <span class="text-xs pr-1 text-gray-500"><strong>{{ firstname }}</strong></span>
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
    <div v-if="mentees">
        <UContainer>
            <div class=" flex p-1 ml-2  my-24">

                <div class="text-center w-1/2">
                    <!-- {{ evaluationsStore.evaluationsByMentee(evals)['d474bcd7-1427-4cce-b2d6-7cbb70d77eee'] }} -->
                    <div class=" py-10">
                        <h3 class=" text-3xl ">Number of Mentees</h3>
                    </div>
                    <div class=" w-full h-px max-w-6xl mx-auto my-1"
                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                    </div>
                    <div class=" text-9xl text-green-500">{{ mentees.length }}</div>
                </div>

                <div class="w-1/2">
                    <apexchart width="400" type="donut" :options="chartOptions"
                        :series="series(menteesStore.menteesByGender(mentees))"></apexchart>
                </div>

            </div>
            <div class=" w-full h-px max-w-6xl mx-auto my-1"
                style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
            </div>
            <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <UInput v-model="q" placeholder="Filter mentees..." />
            </div>
            <div class="pb-10">
                <UTable :columns=columns :rows="getRows(mentees)">
                    <template #empty-state>
                        <div class="flex flex-col items-center justify-center py-6 gap-3">
                            <span class="italic text-sm">No one here!</span>
                            <UButton label="Add people" />
                        </div>
                    </template>
                    <template #actions-data="{ row }">
                        <NuxtLink :to="{ name: 'mentees-id', params: { id: row._id } }">
                            <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="primary" square
                                variant="outline" v-if="evaluationsStore.evaluationsByMentee(evals)[row._id]"> Evals | <span
                                    class=" text-orange-500">{{
                                        evaluationsStore.evaluationsByMentee(evals)[row._id].length }}</span></UButton>
                            <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="red" square
                                variant="outline" v-else disabled>Evals | 0</UButton>
                        </NuxtLink>

                    </template>
                </UTable>
                <UPagination v-model="page" :page-count="pageCount" :total="mentees.length" />
            </div>
        </UContainer>

    </div>
</template>