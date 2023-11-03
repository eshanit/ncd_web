<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import chartSegmentDistrict from '../../composables/charts/chartSegmentDistrict'
import { useEvaluationsStore } from '../../stores/evaluations'
import { uniqBy } from 'lodash';

const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()

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
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex flex-wrap items-center">
                    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">

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
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right py-2">
                        <span class="text-xs pr-1 text-gray-500"><strong>{{ profile?.data.first_name }}</strong></span>
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
    <div v-if="evals" class="my-24">

        <UContainer>
            <UCard class="my-5">
                <template #header>
                    <div class="flex my-2">
                        <div class="text-orange-500 text-sm pr-1"><strong>Mentees</strong></div> | <div
                            class="text-green-500 text-sm pl-1">
                            {{
                                districtId }}</div>
                    </div>
                    <div class="text-sm">
                        <p>Below is a list of all the mentees in this district.</p>
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
                    <div class="flex my-2">
                        <div class="text-orange-500 pr-1 text-sm"><strong>DM Segment Analysis</strong></div>|<div
                            class="text-green-500 pl-1 ext-sm">{{ districtId }}</div>
                    </div>
                    <div class="text-sm">
                        <p>The DM Evaluation Form has two segements 1. <span class="text-red-500"><strong>Introduction and
                                    Initial Evaluation</strong></span> and 2. <span class="text-cyan-500"><strong>Management
                                    of DM</strong></span> each of which are further devided into 3 subsections.
                            The charts below gives a visual represantation of the distribution of scores in each of those
                            sub-sections and their proportions.</p>
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
                                <div class="flex-1" v-show="!isOpenIIEKnowledge" v-auto-animate>
                                    <UButton label="Open" @click="isOpenIIEKnowledge = true" variant="outline"><strong>View
                                            Proportions</strong>
                                    </UButton>
                                </div>
                                <div class="flex-1" v-show="isOpenIIEKnowledge" v-auto-animate>
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
                            <div class="flex border-r border-green-600 text-center p-2">
                                <div class="flex-0 justify-end text-gray-500 text-xl pb-1"> Acquired-Skill</div>
                                <div class="flex-1" v-show="!isOpenIIEAcquiredSkill">
                                    <UButton label="Open" @click="isOpenIIEAcquiredSkill = true" variant="outline">
                                        <strong>View
                                            Proportions</strong>
                                    </UButton>
                                </div>
                                <div class="flex-1" v-show="isOpenIIEAcquiredSkill">
                                    <UButton label="Open" @click="isOpenIIEAcquiredSkill = false" variant="outline"
                                        color="purple"><strong>View Counts</strong>
                                    </UButton>
                                </div>
                            </div>
                            <div class="border-r border-green-500  pb-2" v-show="!isOpenIIEAcquiredSkill">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsiieAcquiredSkill"
                                    :series="chartSegmentData.lineColumn.seriesiieAcquiredSkill"></apexchart>
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-show="isOpenIIEAcquiredSkill">
                                <apexchart type="donut" :options="{
                                    labels: chartSegmentData.pie.keys.iieacquiredskill,
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
                                }" :series="chartSegmentData.pie.values.iieacquiredskill"></apexchart>
                            </div>
                        </div>
                        <div>
                            <div class="flex border-r border-green-600 text-center p-2">
                                <div class="flex-0 justify-end text-gray-500 text-xl pb-1"> Behaviour</div>
                                <div class="flex-1" v-show="!isOpenIIEBehaviour">
                                    <UButton label="Open" @click="isOpenIIEBehaviour = true" variant="outline"><strong>View
                                            Proportions</strong>
                                    </UButton>
                                </div>
                                <div class="flex-1" v-show="isOpenIIEBehaviour">
                                    <UButton label="Open" @click="isOpenIIEBehaviour = false" variant="outline"
                                        color="purple"><strong>View Counts</strong>
                                    </UButton>
                                </div>
                            </div>
                            <div class="border-r border-green-500  pb-2" v-show="!isOpenIIEBehaviour">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsiieBehaviour"
                                    :series="chartSegmentData.lineColumn.seriesiieBehaviour"></apexchart>
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-show="isOpenIIEBehaviour">
                                <apexchart type="donut" :options="{
                                    labels: chartSegmentData.pie.keys.iiebehaviour,
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
                                }" :series="chartSegmentData.pie.values.iiebehaviour"></apexchart>
                            </div>
                        </div>
                    </div>
                </div>

                <!--MANAGEMENT CHARTS-->
                <div class="" v-if="chartSegmentData">
                    <div class="  border-b border-gray-300 pb-2 pt-2 ">
                        <p> Section B: <strong> Management of DM</strong></p>
                    </div>
                    <div class="grid grid-cols-3" v-auto-animate>

                        <div>
                            <div class="flex border-r border-green-600 text-center p-2">
                                <div class="flex-0 justify-end text-gray-500 text-xl pb-1"> Knowledge</div>
                                <div class="flex-1" v-show="!isOpenMngtKnowledge">
                                    <UButton label="Open" @click="isOpenMngtKnowledge = true" variant="outline"><strong>View
                                            Proportions</strong>
                                    </UButton>
                                </div>
                                <div class="flex-1" v-show="isOpenMngtKnowledge">
                                    <UButton label="Open" @click="isOpenMngtKnowledge = false" variant="outline"
                                        color="purple"><strong>View Counts</strong>
                                    </UButton>
                                </div>
                            </div>
                            <div class="border-r border-green-500  pb-2" v-show="!isOpenMngtKnowledge">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsmngtKnowledge"
                                    :series="chartSegmentData.lineColumn.seriesmngtKnowledge"></apexchart>
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-show="isOpenMngtKnowledge">
                                <apexchart type="donut" :options="{
                                    labels: chartSegmentData.pie.keys.mngtknowledge,
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
                                }" :series="chartSegmentData.pie.values.mngtknowledge"></apexchart>
                            </div>
                        </div>
                        <div>
                            <div class="flex border-r border-green-600 text-center p-2">
                                <div class="flex-0 justify-end text-gray-500 text-xl pb-1"> Acquired-Skill</div>
                                <div class="flex-1" v-show="!isOpenMngtAcquiredSkill">
                                    <UButton label="Open" @click="isOpenMngtAcquiredSkill = true" variant="outline">
                                        <strong>View
                                            Proportions</strong>
                                    </UButton>
                                </div>
                                <div class="flex-1" v-show="isOpenMngtAcquiredSkill">
                                    <UButton label="Open" @click="isOpenMngtAcquiredSkill = false" variant="outline"
                                        color="purple"><strong>View Counts</strong>
                                    </UButton>
                                </div>
                            </div>
                            <div class="border-r border-green-500  pb-2" v-show="!isOpenMngtAcquiredSkill">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsmngtAcquiredSkill"
                                    :series="chartSegmentData.lineColumn.seriesmngtAcquiredSkill"></apexchart>
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-show="isOpenMngtAcquiredSkill">
                                <apexchart type="donut" :options="{
                                    labels: chartSegmentData.pie.keys.mngtacquiredskill,
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
                                }" :series="chartSegmentData.pie.values.mngtacquiredskill"></apexchart>
                            </div>
                        </div>
                        <div>
                            <div class="flex border-r border-green-600 text-center p-2">
                                <div class="flex-0 justify-end text-gray-500 text-xl pb-1"> Behaviour</div>
                                <div class="flex-1" v-show="!isOpenMngtBehaviour">
                                    <UButton label="Open" @click="isOpenMngtBehaviour = true" variant="outline"><strong>View
                                            Proportions</strong>
                                    </UButton>
                                </div>
                                <div class="flex-1" v-show="isOpenMngtBehaviour">
                                    <UButton label="Open" @click="isOpenMngtBehaviour = false" variant="outline"
                                        color="purple"><strong>View Counts</strong>
                                    </UButton>
                                </div>
                            </div>
                            <div class="border-r border-green-500  pb-2" v-show="!isOpenMngtBehaviour">
                                <apexchart width="350" type="line"
                                    :options="chartSegmentData.lineColumn.optionsmngtBehaviour"
                                    :series="chartSegmentData.lineColumn.seriesmngtBehaviour"></apexchart>
                            </div>
                            <div class="border-r border-green-500  pb-2 " v-show="isOpenMngtBehaviour">
                                <apexchart type="donut" :options="{
                                    labels: chartSegmentData.pie.keys.mngtbehaviour,
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
                                }" :series="chartSegmentData.pie.values.mngtbehaviour"></apexchart>
                            </div>
                        </div>
                </div>
            </div>

        </UCard>
    </UContainer>
</div></template>