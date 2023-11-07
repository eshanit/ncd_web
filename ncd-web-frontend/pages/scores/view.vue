<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDistrictStore } from '../../stores/districts'
import { useFacilityStore } from '../../stores/facilities'
import useDataForScoreTables from '../../composables/tables/useDataForScoreTables'
import { useField } from 'vee-validate';
import '../../validators/district';
import { useAsyncState } from '@vueuse/core';

const iamStore = useIamProfileStore();

let qdata = ref({
    combinedTableData: []
})

let selectedDistrict = ref('')
let selectedFacility = ref('')

const { useLogUserOut, profile } = useAuthStuff();

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



///
defineEmits([
    'update:district'
])

const formData = computed(() => {
    return {
        district: '',
        facility: ''

    }
})

watch(selectedDistrict, (newDistrict, oldDistrict) => {

    if (newDistrict) {

        const dmQData = useAsyncState(async () => {
            return await useDataForScoreTables(newDistrict, 'district');
        }, undefined);

        selectedFacility = ref('')
        qdata = dmQData.state

    }


})


watch(selectedFacility, (newFacility, oldFacility) => {
    if (newFacility) {
        const dmQData = useAsyncState(async () => {
            return await useDataForScoreTables(newFacility, 'facility');
        }, undefined);

        selectedDistrict = ref('')
        qdata = dmQData.state

    }
})




const dmQData = useAsyncState(async () => {
    return await useDataForScoreTables('All', 'all');
}, undefined);

qdata = dmQData.state




//
const columns: any = [
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
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Eval-Items</strong></p>

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
    <div class="my-28" v-if="qdata">
        <UContainer>
            <UCard>
                <template #header>
                    <div>
                        <div class="pr-2">
                            <h1 class=" font-semibold">EI-Analysis | <span class="text-orange-500">all evaluation
                                    items</span></h1>
                        </div>
                    </div>

                </template>
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

                            <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
                                Filter by District
                            </label>
                            <select id="district"
                                class="block w-3/4 px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm dark:bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                v-model="selectedDistrict" v-validate="'required'">
                                <option class=" text-gray-500" disabled value="">--Choose District--</option>
                                <option class=" text-cyan-500" value="All">All</option>
                                <option class="dark:bg-gray-50" v-for=" (district, i) in districts" :key="i"
                                    :value="district.district" :selected="district.district == formData.district">
                                    {{ district.district }}
                                </option>

                            </select>


                        </div>

                        <!--filter by facilities-->
                        <!-- <div class="mb-4 pt-2 pl-2">
                            <label class="block text-teal-700 text-sm font-bold mb-2" for="country">
                                Filter by Facility
                            </label>
                            <select id="district"
                                class="block w-3/4 px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm dark:bg-transparent focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                v-model="selectedFacility" v-validate="'required'">
                                <option class=" text-gray-500" disabled value="" selected>--Choose Facility--</option>
                                <option class=" text-cyan-500" value="All">All</option>
                                <option class="dark:bg-gray-50" v-for=" (facility, i) in facilities" :key="i"
                                    :value="facility" :selected="facility == formData.facility">
                                    {{ facility }}
                                </option>

                            </select>


                        </div> -->


                    </div>

                </div>

                <UTable :columns="columns" :rows="qdata.combinedTableData">
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