<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { useMenteesStore } from '../../stores/mentees'
import { useFacilityStore } from '../../stores/facilities'
import { useEvaluationsStore } from '../../stores/evaluations'
import useFacilityTableData from '../../composables/tables/useFacilityTableData'
import lineBarChartFacility from '../../composables/charts/lineBarChartFacility'
import { ref } from 'vue';

const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff();


const menteeStore = useMenteesStore()
const facilityStore = useFacilityStore();
const evaluationStore = useEvaluationsStore()

// facility
const facilityData = useAsyncState(async () => {
  return await facilityStore.facilities();
}, undefined);

const facilities: any = facilityData.state

//mentees in a facility

const groupedMenteeByFacilityData = useAsyncState(async () => {
  return await menteeStore.menteesByFacility();
}, undefined);

const menteesByFacility = groupedMenteeByFacilityData.state;

// evals in a facility

const groupedEvalsByFacilityData = useAsyncState(async () => {
  return await evaluationStore.groupedByFacility();
}, undefined);

const groupedEvalsByFacility = groupedEvalsByFacilityData.state;

///all

const facilsData = useAsyncState(async () => {
  console.log('hello')
  return await useFacilityTableData(groupedEvalsByFacilityData);
}, undefined);

const facils = facilsData.state;

//table
const columns = [
  {
    key: 'district',
    label: 'District'
  },
  {
    key: 'facility',
    label: 'Facility'
  },
  {
    key: 'mentees',
    label: 'Num Mentees'
  },
  {
    key: 'evaluations',
    label: 'Evaluations'
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


//charts


const facilsChartData = useAsyncState(async () => {
  return lineBarChartFacility(groupedEvalsByFacilityData);
}, undefined);

const facilsChart: any = facilsChartData.state;

</script>

<template>

  <div v-if="facilities">
    <header class="bg-white fixed top-0 w-full">
    <nav class="mx-auto flex">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="flex flex-wrap items-center">
          <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">
            <NuxtLink :to="{ name: 'iam-dashboard' }">
              <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
            </NuxtLink>
            <p>|</p>
            <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Facilities</strong></p>
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
    <UContainer>
      <UCard class="my-12">
        <template #header>
          <div class="text-orange-500 text-sm my-2"><strong>Facilities</strong></div>
          <p class="text-sm">Below is a list of all the <span class="text-green-500 italic">facilities</span> where
            evaluations where done. Click on the green button
            to view analysis for each district.</p>
        </template>

        <!-- <p class="text-green-500" v-if="distPerformance">{{ boxPlotPerformance }}</p> -->

        <div v-if="facils">
          <div class="">
            <UTable :columns=columns :rows="getRows(facils)">
              <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                  <span class="italic text-sm">No one here!</span>
                  <UButton label="Add people" />
                </div>
              </template>
              <template #actions-data="{ row }">
                <NuxtLink :to="{ name: 'facilities-id', params: { id: row.facility } }">
                  <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="teal" square
                    variant="outline"> view </UButton>
                </NuxtLink>

              </template>
            </UTable>
            <UPagination v-model="page" :page-count="pageCount" :total="facils.length" />
          </div>
        </div>
      </UCard>


      <UChart v-if="facilsChart">
        <template #header>
          Summary of Facility Counts
        </template>
        <div class="=grid grid-cols-2">
          <div>
            <apexchart width="1200" height="450" type="bar" :options="facilsChart.options" :series="facilsChart.series">
            </apexchart>
          </div>
        </div>
      </UChart>

    </UContainer>
  </div>
</template>