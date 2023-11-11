<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { useDistrictStore } from '../../stores/districts'
import { useEvaluationsStore } from '../../stores/evaluations'
import { useMenteesStore } from '../../stores/mentees'
import useDistrictTableData from '../../composables/tables/useDistrictTableData'
import chartDataDistrict from '../../composables/charts/chartDataDisricts'
import useDistrictPerformanceData from '../../composables/tables/useDistrictPerformanceData'
import chartDistrictBoxPlot from '../../composables/charts/chartDistrictBoxPlot'

const firstname = localStorage.getItem('user')

const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()

const districtStore = useDistrictStore()
const evaluationStore = useEvaluationsStore()
const menteeStore = useMenteesStore()

const districtData = useAsyncState(async () => {
  return await districtStore.districts();
}, undefined);

const districts = districtData.state;

///
const groupedMenteeByDistrictData = useAsyncState(async () => {
  return await menteeStore.menteesByDistrict();
}, undefined);

const menteesByDistricts = groupedMenteeByDistrictData.state;
///

//grouped evaluations

const groupedEvalsByDistrictData = useAsyncState(async () => {
  return await evaluationStore.groupedByDistricts();
}, undefined);

const groupedEvalsByDistrict = groupedEvalsByDistrictData.state;


///all

const distData = useAsyncState(async () => {
  console.log('hello')
  return await useDistrictTableData(groupedEvalsByDistrictData).then(
    (response) => {
      const district = response;

      return district
    }

  );
}, undefined);

const dists = distData.state;

//Perfomrance

const distPerformanceData = useAsyncState(async () => {
  console.log('hello performance')
  return await useDistrictPerformanceData(groupedEvalsByDistrictData).then(
    (response) => {
      const district = response;

      return district
    }

  );
}, undefined);

const distPerformance = distPerformanceData.state;




//table
const columns = [
  {
    key: 'district',
    label: 'District'
  }, {
    key: 'facilities',
    label: 'Num Facilities'
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

//chart Data Districts
const getchartData = chartDataDistrict(distData)

const districtChartData = useAsyncState(async () => {
  return getchartData;
}, undefined);

const chartData: any = districtChartData.state

//perfomrance Charts
const distPerformanceChartData = useAsyncState(async () => {
  console.log('hello performance')
  return await chartDistrictBoxPlot(groupedEvalsByDistrictData).then(
    (response) => {
      const district = response;

      return district
    }

  );
}, undefined);

const boxPlotPerformanceChart = distPerformanceChartData.state;

</script>
<template>
<header class="bg-white fixed top-0 w-full">
    <nav class="mx-auto flex">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="flex flex-wrap items-center">
          <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">
            <NuxtLink :to="{ name: 'iam-dashboard' }">
              <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
            </NuxtLink>
            <p>|</p>
            <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Districts</strong></p>
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
  <div class="my-24">

    <UContainer>

      <UCard class="my-5">
        <template #header>
          <div class="text-orange-500 text-sm my-2"><strong>Districts</strong></div>
          <p class="text-sm">Below is a list of all the districts where evaluations where done. Click on the green button
            to view analysis for each district.</p>
        </template>

        <!-- <p class="text-green-500" v-if="distPerformance">{{ boxPlotPerformance }}</p> -->

        <div v-if="dists">
          <div class="">
            <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <UInput v-model="q" placeholder="Filter districts..." />
            </div>
            <UTable :columns=columns :rows="getRows(dists)">
              <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                  <span class="italic text-sm">No one here!</span>
                  <UButton label="Add people" />
                </div>
              </template>
              <template #actions-data="{ row }">
                <NuxtLink :to="{ name: 'districts-id', params: { id: row.district } }">
                  <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="teal" square
                    variant="outline"> view </UButton>
                </NuxtLink>

              </template>
            </UTable>
            <UPagination v-model="page" :page-count="pageCount" :total="dists.length" />
          </div>
        </div>
      </UCard>

      <UCard class="my-5">
        <template #header>
          <div class="text-orange-500 text-sm  my-2"><strong>Distric-Mentee-Evaluation Analysis</strong></div>
          <p class="text-sm">This is a composite chart which shows 1. Number of <span
              class="text-cyan-500 italic">Mentees</span> per district, 2. Number of <span
              class="text-green-500 italic">Evaluations</span> per district and 3. The <span
              class="text-orange-500 italic">ratio of Mentee to Evaluation(s)</span> per district.</p>
        </template>
        <div v-if="chartData">

          <apexchart width="1200" height="450" type="line" :options="chartData.options" :series="chartData.series">
          </apexchart>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="text-orange-500 text-sm my-2"><strong>Box Plot Analysis </strong></div>
          <p class="text-sm">An evaluation session consists of 29 questions whose maximum score is 3 so all in all a
            mentee can get a maximum of 87 points, for this chart, we converted their scores using this base and ploted
            their scores as a percentage to get a representational picture of the mean, median and the upper and lower
            quantiles of each district.</p>

        </template>
        <div v-if="boxPlotPerformanceChart">

          <apexchart width="1200" height="450" type="boxPlot" :options="boxPlotPerformanceChart.options"
            :series="boxPlotPerformanceChart.series"></apexchart>
        </div>
      </UCard>



    </UContainer>


  </div>
</template>