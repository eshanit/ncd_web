<script setup lang="ts">
import { useMenteesStore } from '../../stores/mentees';
import { useEvaluationsStore } from '../../stores/evaluations';
import { useAsyncState } from '@vueuse/core';


const menteesStore = useMenteesStore();
const evaluationsStore = useEvaluationsStore();

//mentees
const menteesData = useAsyncState(async () => {
    return await menteesStore.mentees();
}, undefined);

const mentees: any = menteesData.state

const page = ref(1)
const pageCount = 5

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
    chart: {
        id: "gender-bar",
    },
    xaxis: {
        categories: ["Male", "Female"],
    },
};


const series = (data: any) => {
    return [
        {
            name: "series-1",
            data: [(data.Male).length, (data.Female).length],
        },
    ];
}



</script>

<template>
    <div v-if="mentees">
        <UContainer>

            <div class=" flex p-1 ml-2 ">

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
                    <apexchart width="500" type="donut" :options="chartOptions"
                        :series="series(menteesStore.menteesByGender(mentees))"></apexchart>
                </div>

            </div>
            <div class=" w-full h-px max-w-6xl mx-auto my-1"
                style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
            </div>
            <div>
                <UTable :columns=columns :rows="mentees">
                    <template #empty-state>
                        <div class="flex flex-col items-center justify-center py-6 gap-3">
                            <span class="italic text-sm">No one here!</span>
                            <UButton label="Add people" />
                        </div>
                    </template>
                    <template #actions-data="{ row }">
                        <UButton :items="items(row)" color="gray"  v-if="evaluationsStore.evaluationsByMentee(evals)[row._id] "> Evals | {{ evaluationsStore.evaluationsByMentee(evals)[row._id].length}}</UButton>
                        <UButton :items="items(row)" color="gray"  v-else>Evals | 0</UButton>
                    </template>
                </UTable>
                <UPagination v-model="page" :page-count="pageCount" :total="mentees.length" />
            </div>
        </UContainer>

    </div>
</template>