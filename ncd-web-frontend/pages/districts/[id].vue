<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import chartSegmentDistrict from '../../composables/charts/chartSegmentDistrict'
import { useEvaluationsStore } from '../../stores/evaluations'
import { uniqBy } from 'lodash';

const isOpenIIEKnowledge = ref(false)
const isOpenIIEAcquiredSkill = ref(false)
const isOpenIIEBehaviour = ref(false)
const isOpenMngtKnowledge = ref(false)
const isOpenMngtAcquiredSkill = ref(false)
const isOpenMngtBehaviour = ref(false)

const evaluationsStore = useEvaluationsStore()


const route = useRoute()

const perc = ref(false)

const districtId = route.params.id;

const getDistrictEvals = evaluationsStore.getEvalByDistrict(districtId)

const districtEvals = useAsyncState(async () => {
    return await getDistrictEvals;
}, undefined);

const evals = districtEvals.state
//

const getChartSegmentDistrictData = useAsyncState(async () => {
    return await chartSegmentDistrict(districtEvals);
}, undefined);

const chartSegmentData = getChartSegmentDistrictData.state


// table stuff
const page = ref(1)
const pageCount = 5

const getRows = (data: any) => {

    const weWant: any[] = [];

    data.forEach((row: any) => weWant.push(row.info.menteeInfo[0]))

    const data2 = uniqBy(weWant, (row: any) => row.lastname)

    return data2.slice((page.value - 1) * pageCount, (page.value) * pageCount)

}


const getEvaLength = (data: any) => {

    const weWant: any[] = [];

    data.forEach((row: any) => weWant.push(row.info.menteeInfo[0]))

    return weWant.length

}

//columns
const columns = [
    {
        key: 'firstname',
        label: 'Mentee name'
    }, {
        key: 'lastname',
        label: 'Mentee lastname'
    },
    {
        key: 'gender',
        label: 'Gender'
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
    }
]

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



</script>
<template>
    <header class="bg-white fixed top-0 w-full shadow-md">
        <nav class="container mx-auto px-6 py-3 flex">
            <div class="flex  items-center">
                <NuxtLink :to="{ name: 'iam-dashboard' }">
                    <p class="p-1 hover:text-green-500">Dashboard</p>
                </NuxtLink>
                <p>|</p>
                <NuxtLink :to="{ name: 'districts-list' }">
                    <p class="p-1 hover:text-green-500">Districts</p>
                </NuxtLink>
                <p>|</p>
                <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Districts Analysis</strong></p>
            </div>
        </nav>
    </header>
    <div v-if="evals" class="my-24">

        <UContainer>
            <UCard class="my-5">
                <template #header>
                    <div class="flex">
                        <div class="text-orange-500 pr-1"><strong>Mentees</strong></div> | <div class="text-green-500 pl-1">
                            {{
                                districtId }}</div>
                    </div>
                </template>
                <UTable :columns=columns :rows="getRows(evals)">
                    <template #empty-state>
                        <div class="flex flex-col items-center justify-center py-6 gap-3">
                            <span class="italic text-sm">No one here!</span>
                            <UButton label="Add people" />
                        </div>
                    </template>
                    <template #actions-data="{ row }">
                        <NuxtLink :to="{ name: 'mentees-id', params: { id: row.id } }">
                            <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="primary" square
                                variant="outline" v-if="evaluationsStore.evaluationsByMentee(evals)[row.id]"> Evals | <span
                                    class=" text-orange-500">{{
                                        evaluationsStore.evaluationsByMentee(evals)[row.id].length }}</span></UButton>
                            <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="red" square
                                variant="outline" v-else disabled>Evals | 0</UButton>
                        </NuxtLink>

                    </template>
                </UTable>
                <UPagination v-model="page" :page-count="pageCount" :total="getEvaLength(evals)" />
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex">
                        <div class="text-orange-500 pr-1"><strong>DM Segment Analysis</strong></div>|<div
                            class="text-green-500 pl-1">{{ districtId }}</div>
                    </div>
                </template>
                <!--IIE CHARTS-->
                <div v-if="chartSegmentData">
                    <div class="  border-b border-gray-300 pb-2 pt-2 ">
                        <p> Section A: <strong> Introduction and Initial Evaluation</strong></p>
                    </div>
                    <div class="grid grid-cols-3">
                        <div>
                            <div class="flex border-r border-green-600 text-center p-2">
                                <div class="flex-0 justify-end text-gray-500 text-xl pb-1"> Knowledge</div>
                                <div class="flex-1" v-show="!isOpenIIEKnowledge">
                                    <UButton label="Open" @click="isOpenIIEKnowledge = true" variant="outline"><strong>View
                                            Proportions</strong>
                                    </UButton>
                                </div>
                                <div class="flex-1" v-show="isOpenIIEKnowledge">
                                    <UButton label="Open" @click="isOpenIIEKnowledge = false" variant="outline"
                                        color="purple"><strong>View Counts</strong>
                                    </UButton>
                                </div>
                            </div>
                            <div class="border-r border-green-500  pb-2" v-show="!isOpenIIEKnowledge">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsiieKnowledge"
                                    :series="chartSegmentData.lineColumn.seriesiiEKnowledge"></apexchart>
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-show="isOpenIIEKnowledge">
                                <apexchart type="donut" :options="{
                                    labels: chartSegmentData.pie.keys.iieknowledge,
                                    responsive: [{
                                        breakpoint: 350,
                                        options: {
                                            chart: {
                                                width: 250
                                            },
                                            legend: {
                                                position: 'top'
                                            }
                                        }
                                    }]
                                }" :series="chartSegmentData.pie.values.iieknowledge"></apexchart>
                            </div>
                        </div>
                        <div>
                            <div class=" border-r border-green-600 text-center p-2">
                                <div class="text-gray-500 text-xl pb-1">Acquired-Skill</div>
                                <!-- <div> Average Score: <UButton label="Open" @click="isOpenIIEKnowledge = true"><strong>{{
                            mentee.scoreStats.averageIIEKnowledgeScore }}</strong></UButton>
                        </div> -->
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-if="chartSegmentData">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsiieAcquiredSkill"
                                    :series="chartSegmentData.lineColumn.seriesiieAcquiredSkill"></apexchart>
                            </div>
                        </div>
                        <div>
                            <div class=" text-center p-2">
                                <div class="text-gray-500 text-xl pb-1">Behaviour</div>
                                <!-- <div> Average Score: <UButton label="Open" @click="isOpenIIEKnowledge = true"><strong>{{
                            mentee.scoreStats.averageIIEKnowledgeScore }}</strong></UButton>
                        </div> -->
                            </div>
                            <div class=" pb-2 " v-if="chartSegmentData">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsiieBehaviour"
                                    :series="chartSegmentData.lineColumn.seriesiieBehaviour"></apexchart>
                            </div>
                        </div>

                    </div>
                </div>

                <!--MANAGEMENT CHARTS-->
                <div>
                    <div class="  border-b border-gray-300 pb-2 pt-2 ">
                        <p> Section B: <strong> Management of DM</strong></p>
                    </div>
                    <div class="grid grid-cols-3">
                        <div>
                            <div class=" border-r border-green-600 text-center p-2">
                                <div class="text-gray-500 text-xl pb-1"> Knowledge</div>
                                <!-- <div> Average Score: <UButton label="Open" @click="isOpenIIEKnowledge = true"><strong>{{
                            mentee.scoreStats.averageIIEKnowledgeScore }}</strong></UButton>
                        </div> -->
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-if="chartSegmentData">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsmngtKnowledge"
                                    :series="chartSegmentData.lineColumn.seriesmngtKnowledge"></apexchart>
                            </div>
                        </div>
                        <div>
                            <div class=" border-r border-green-600 text-center p-2">
                                <div class="text-gray-500 text-xl pb-1">Acquired-Skill</div>
                                <!-- <div> Average Score: <UButton label="Open" @click="isOpenIIEKnowledge = true"><strong>{{
                            mentee.scoreStats.averageIIEKnowledgeScore }}</strong></UButton>
                        </div> -->
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-if="chartSegmentData">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsmngtAcquiredSkill"
                                    :series="chartSegmentData.lineColumn.seriesmngtAcquiredSkill"></apexchart>
                            </div>
                        </div>
                        <div>
                            <div class=" text-center p-2">
                                <div class="text-gray-500 text-xl pb-1">Behaviour</div>
                                <!-- <div> Average Score: <UButton label="Open" @click="isOpenIIEKnowledge = true"><strong>{{
                            mentee.scoreStats.averageIIEKnowledgeScore }}</strong></UButton>
                        </div> -->
                            </div>
                            <div class=" pb-2 " v-if="chartSegmentData">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsmngtBehaviour"
                                    :series="chartSegmentData.lineColumn.seriesmngtBehaviour"></apexchart>
                            </div>
                        </div>

                    </div>
                </div>

            </UCard>
        </UContainer>
        <div v-if="chartSegmentData">{{ chartSegmentData }}</div>




    </div>
</template>