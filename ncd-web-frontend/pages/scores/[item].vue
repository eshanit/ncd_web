<script setup lang="ts">
import { useEvaluationsStore } from '../../stores/evaluations';
import useDataForScoreTablesItem from '../../composables/tables/useDataForScoreTablesItem'
import { useAsyncState } from '@vueuse/core';
import barChartForEvalItems from '~/composables/charts/barChartForEvalItems';
import { useDistrictStore } from '../../stores/districts'
import { useFacilityStore } from '../../stores/facilities'

const firstname = localStorage.getItem('user')

/// districts

const districtStore = useDistrictStore();

const districtData = useAsyncState(async () => {
    return await districtStore.districts();
}, undefined);

const districts: any = districtData.state;

/// facilities

const facilityStore = useFacilityStore();

const facilityData = useAsyncState(async () => {
    return await facilityStore.facilities();
}, undefined);

const facilities = facilityData.state


let qdata: any = ref({
    majorFatals: [],
    combinedTableData: []
})

let selectedDistrict = ref('')
let selectedFacility = ref('')

let tables = reactive({
    showNA: true,
    showPoor: false,
    showAverage: false,
    showGood: false
})


const showTables = (e: string) => {

    console.log(e)

    if (e == '0') {
        tables.showNA = true
        tables.showPoor = false
        tables.showAverage = false
        tables.showGood = false
    } else if (e == '1') {
        tables.showNA = false
        tables.showPoor = true
        tables.showAverage = false
        tables.showGood = false
    } else if (e == '2') {
        tables.showNA = false
        tables.showPoor = false
        tables.showAverage = true
        tables.showGood = false
    } else if (e == '3') {
        tables.showNA = false
        tables.showPoor = false
        tables.showAverage = false
        tables.showGood = true
    }

    return tables

}


const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()

const route = useRoute()

const itemId = route.params.item

//
localStorage.setItem('from', 'scores-item')
localStorage.setItem('id', itemId.toString())
//

const item = itemId.toString();

const evaluationsStore = useEvaluationsStore();

const evalData = useAsyncState(async () => {
    return await evaluationsStore.evaluations();
}, undefined);

const evals: any = evalData.state
//
const formData = computed(() => {
    return {
        district: '',
        facility: ''

    }
})

watch(selectedDistrict, (newDistrict, oldDistrict) => {

    if (newDistrict) {


        const dmQData = useAsyncState(async () => {
            return await useDataForScoreTablesItem(newDistrict, 'district');
        }, undefined);

        qdata = dmQData.state

    }


})


watch(selectedFacility, (newFacility, oldFacility) => {
    if (newFacility) {


        const dmQData = useAsyncState(async () => {
            return await useDataForScoreTablesItem(newFacility, 'facility');
        }, undefined);

        qdata = dmQData.state

    }
})

//

const dmQData = useAsyncState(async () => {
    return await useDataForScoreTablesItem('All', 'all');
}, undefined);

qdata = dmQData.state


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

/// table data

///not applicable
const getRowsNotApplicable = (menteeData: any) => {

    const data = menteeData[item].mentees.NotApplicableMentees;

    if (!q.value) {
        return data
    }

    return data.filter((person: any) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        });
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount)

}


///poor
const getRowsPoor = (menteeData: any) => {

    const data = menteeData[item].mentees.PoorMentees;

    if (!q.value) {
        return data
    }

    return data.filter((person: any) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        });
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount)

}

//Average

const getRowsAverage = (menteeData: any) => {

    const data = menteeData[item].mentees.AverageMentees;

    if (!q.value) {
        return data
    }

    return data.filter((person: any) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        });
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount)

}


//good

const getRowsGood = (menteeData: any) => {

    const data = menteeData[item].mentees.GoodMentees;

    if (!q.value) {
        return data
    }

    return data.filter((person: any) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        });
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount)

}

//chart data

const { chartSeries, chartOptions } = barChartForEvalItems()

//small table data

const smallTableData = (data: any) => {

    let countsNA: number = data.counts['0']
    let countsPoor: number = data.counts['1']
    let countsAverage: number = data.counts['2']
    let countsGood: number = data.counts['3']
    let total: number = data.statistics.total

    return {
        counts: {
            na: countsNA,
            poor: countsPoor,
            average: countsAverage,
            good: countsGood,
        },
        percerntages: {
            na: (100 * countsNA / total).toFixed(1),
            poor: (100 * countsPoor / total).toFixed(1),
            average: (100 * countsAverage / total).toFixed(1),
            good: (100 * countsGood / total).toFixed(1)
        }
    }
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
                        <NuxtLink :to="{ name: 'scores-view' }">
                            <p class="p-1 hover:text-green-500 text-gray-500"><strong>Eval-Items</strong></p>
                        </NuxtLink>
                        <P>|</P>
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>EI-Analysis </strong></p>
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
    <div class="container mx-auto px-6 py-24" v-if="qdata">
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
                    <div class="pr-4">
                        <div class="text-gray-700 text-sm border-b border-gray-500 pb-2.5">
                            Below is summary statistics of the evaluations for
                            <span class="text-red-500 text-2xl italic" v-if="!selectedDistrict && !selectedFacility">
                                <strong>ALL</strong>
                            </span>
                            <span class="text-green-500 text-2xl italic" v-else-if="selectedDistrict">
                                <strong>{{ selectedDistrict }}</strong>
                            </span>
                            <span class="text-green-500 text-2xl italic" v-else-if="selectedFacility">
                                <strong>{{ selectedFacility }}</strong>
                            </span>
                            mentees. If you would like to filter the
                            results by district or facility please use the filters below:
                        </div>
                        <div class=" grid grid-cols-2 pt-2.5">


                            <div class="mb-4 pt-2 border-r border-gray-500">

                                <label class="block text-sm font-bold mb-2" for="country">
                                    Filter by <span class=" text-orange-500">District</span>
                                </label>
                                <select id="district"
                                    class="block w-3/4 px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm dark:bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                    v-model="selectedDistrict" v-validate="'required'" @change="selectedFacility = ''">
                                    <option class=" text-gray-500" disabled value="">--Choose District--</option>
                                    <option class=" text-cyan-500" value="All">All</option>
                                    <option class="dark:bg-gray-50" v-for=" (district, i) in districts" :key="i"
                                        :value="district.district" :selected="district.district == formData.district">
                                        {{ district.district }}
                                    </option>

                                </select>


                            </div>

                            <!--filter by facilities-->
                            <div class="mb-4 pt-2 pl-2">
                                <label class="block text-sm font-bold mb-2" for="country">
                                    Filter by <span class=" text-orange-500">Facility</span>
                                </label>
                                <select id="district"
                                    class="block w-3/4 px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm dark:bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                    v-model="selectedFacility" v-validate="'required'" @change="selectedDistrict = ''">
                                    <option class=" text-gray-500" disabled value="" selected>--Choose Facility--</option>
                                    <option class=" text-cyan-500" value="All">All</option>
                                    <option class="dark:bg-gray-50" v-for=" (facility, i) in facilities" :key="i"
                                        :value="facility" :selected="facility == formData.facility">
                                        {{ facility }}
                                    </option>

                                </select>
                            </div>



                        </div>

                    </div>
                </div>
                <div class="w-full my-2 border-b border-gray-300 py-5">
                    <div class="grid grid-cols-7 mt-2 text-center bg-slate-400">

                        <div class=" border border-l border-gray-500">
                            <strong>Number of Entries</strong>
                        </div>
                        <div class=" border border-l border-gray-500">
                            <strong>Mean</strong>
                        </div>
                        <div class=" border border-gray-500">
                            <strong>Median</strong>
                        </div>
                        <div class=" border border-gray-500">
                            <strong>Mode</strong>
                        </div>
                        <div class=" border border-gray-500">
                            <strong>Standard Deviation</strong>
                        </div>
                        <div class=" border border-gray-500">
                            <strong>Sample Kurtosis</strong>
                        </div>
                        <div class=" border border-gray-500">
                            <strong>Sample Skewness</strong>
                        </div>

                    </div>
                    <div class="grid grid-cols-7 text-center" v-if="qdata.majorData[item]">
                        <div class=" border border-l border-gray-500">
                            {{ qdata.majorData[item].statistics.total }}
                        </div>
                        <div class=" border border-l border-gray-500">
                            {{ qdata.majorData[item].statistics.mean }}
                        </div>
                        <div class=" border border-gray-500">
                            {{ qdata.majorData[item].statistics.median }}
                        </div>
                        <div class=" border border-gray-500">
                            {{ qdata.majorData[item].statistics.mode }}
                        </div>
                        <div class=" border border-gray-500">
                            {{ qdata.majorData[item].statistics.standardDeviation }}
                        </div>
                        <div class=" border border-gray-500">
                            {{ qdata.majorData[item].statistics.sampleKurtosis }}
                        </div>
                        <div class=" border border-gray-500">
                            {{ qdata.majorData[item].statistics.sampleSkewness }}
                        </div>
                    </div>
                </div>

                <div class="grid lg:grid-cols-2  md:grid-cols-1 sm:grid-cols-1 gap-10">
                    <div class="flex pt-5 pr-2">
                        <div class=" border border-gray-400 rounded-md ">
                            <h1 class="p-2"><strong>Count of Scores</strong> | <span class="text-green-500 italic">{{ itemId
                            }}</span> </h1>
                            <apexchart width="600" type="bar" :options="chartOptions(qdata.majorData[item])"
                                :series="chartSeries(qdata.majorData[item])"></apexchart>
                        </div>
                    </div>

                    <div class="pl-2">
                        <div>
                            <div class="grid grid-cols-3 border-b border-spacing-1 border-cyan-950 p-2">
                                <div class="text-center"><strong>Rating</strong></div>
                                <div class="text-center"><strong>Count</strong></div>
                                <div class="text-center"><strong>Percentage</strong></div>
                            </div>
                            <div class="grid grid-cols-3 text-gray-500 border-b border-gray-500 pb-2">
                                <div class="text-center"><span><strong>Not Applicable</strong></span></div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).counts.na }}</div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).percerntages.na }}%</div>
                            </div>
                            <div class="grid grid-cols-3 text-red-500 border-b border-red-500 pb-2">
                                <div class="text-center"><span class=""><strong>Poor</strong></span></div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).counts.poor }}</div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).percerntages.poor }}%
                                </div>
                            </div>
                            <div class="grid grid-cols-3 text-yellow-500 border-b border-yellow-500 pb-2">
                                <div class="text-center"><span class=""><strong>Average</strong></span></div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).counts.average }}</div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).percerntages.average }}%
                                </div>
                            </div>
                            <div class="grid grid-cols-3 text-green-500 border-b border-green-500 pb-2">
                                <div class="text-center"><span class=""><strong>Good</strong></span></div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).counts.good }}</div>
                                <div class="text-center">{{ smallTableData(qdata.majorData[item]).percerntages.good }}%
                                </div>
                            </div>
                            <div class="grid grid-cols-3 border-b-4 border-black pb-2">
                                <div class="text-center"><span class=""><strong>Total</strong></span></div>
                                <div class="text-center">{{ qdata.majorData[item].statistics.total }}</div>
                                <div class="text-center">100%</div>
                            </div>
                        </div>
                        <div class="pt-5">
                            <UCard class="border border-cyan-500">
                                <template #header>
                                    <div class="text-center border-b border-gray-400 pb-3"><strong>Evaluation Item -
                                        </strong><span class="text-green-500">{{ itemId }}</span></div>
                                </template>
                                {{ qdata.majorData[item].evalItem }}
                            </UCard>
                        </div>
                    </div>

                </div>

                <div class="text-center border-b border-gray-500">
                    <div>Click on the buttons below to view list of mentees according to scores they got: </div>
                    <div class="grid grid-cols-4 border-b border-spacing-1 border-cyan-950 p-2">
                        <div class="text-center">
                            <strong>
                                <UButton color="gray" variant="solid" size="xl" @click="showTables('0')">Not Applicable |
                                    Score: 0</UButton>
                            </strong>
                        </div>
                        <div class="text-center">
                            <strong>
                                <UButton color="red" variant="solid" size="xl" @click="showTables('1')">Poor| Score: 1
                                </UButton>
                            </strong>
                        </div>
                        <div class="text-center">
                            <strong>
                                <UButton color="yellow" variant="solid" size="xl" @click="showTables('2')">Average | Score:
                                    2
                                </UButton>
                            </strong>
                        </div>
                        <div class="text-center">
                            <strong>
                                <UButton color="green" variant="solid" size="xl" @click="showTables('3')">Not Applicable |
                                    Score: 3</UButton>
                            </strong>
                        </div>
                    </div>
                </div>

            </UCard>
            <!--not applicables-->
            <UCard class="pb-5" v-show="tables.showNA">
                <template #header>
                    <h1 class="text-sm font-semibold">List of Mentees who scored: <span class="text-gray-500">(0) Not
                            Applicable</span> for Evaluation Item <span class="text-orange-500">{{ itemId }}</span></h1>
                </template>
                <div>
                    <div>
                        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                            <UInput v-model="q" placeholder="Filter mentees..." />
                        </div>
                        <TableComponet :rows="getRowsNotApplicable(qdata.majorData)" :columns="columns" ></TableComponet>
                    </div>
                </div>
            </UCard>

            <!--poor-->

            <UCard class="pb-5" v-show="tables.showPoor">
                <template #header>
                    <h1 class="text-sm font-semibold">List of Mentees who scored: <span class="text-red-500">(1) Poor</span>
                        for Evaluation Item <span class="text-orange-500">{{ itemId }}</span></h1>
                </template>
                <div>
                    <div>
                        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                            <UInput v-model="q" placeholder="Filter mentees..." />
                        </div>
                        <TableComponet :rows="getRowsPoor(qdata.majorData)" :columns="columns" ></TableComponet>
                      
                    </div>
                </div>
            </UCard>

            <!--avergae-->
            <UCard class="pb-5" v-show="tables.showAverage">
                <template #header>
                    <h1 class="text-sm font-semibold">List of Mentees who scored: <span class="text-yellow-500">(2)
                            Average</span> for Evaluation Item <span class="text-orange-500">{{ itemId }}</span></h1>
                </template>
                <div>
                    <div>
                        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                            <UInput v-model="q" placeholder="Filter mentees..." />
                        </div>
                        <TableComponet :rows="getRowsAverage(qdata.majorData)" :columns="columns" ></TableComponet>
                    </div>
                </div>
            </UCard>

            <!--good-->

            <UCard class="pb-5" v-show="tables.showGood">
                <template #header>
                    <h1 class="text-sm font-semibold">List of Mentees who scored: <span class="text-green-500">(3)
                            Good</span> for Evaluation Item <span class="text-orange-500">{{ itemId }}</span></h1>
                </template>
                <div>
                    <div>
                        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                            <UInput v-model="q" placeholder="Filter mentees..." />
                        </div>
                        <TableComponet :rows="getRowsGood(qdata.majorData)" :columns="columns" ></TableComponet>
                    </div>
                </div>
            </UCard>

        </UContainer>

        <!--average-->




        <!-- {{ filteredRows }} -->
        <!-- {{ getFilteredRows(qdata.majorData[item].mentees.dmQ1NotApplicableMentees) }} -->
    </div>
</template>