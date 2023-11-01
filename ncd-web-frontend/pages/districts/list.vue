<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { useDistrictStore } from '../../stores/districts'
import { useEvaluationsStore } from '../../stores/evaluations'
import { useMenteesStore } from '../../stores/mentees'
import useDistrictTableData from '../../composables/tables/useDistrictTableData'
import chartDataDistrict from '../../composables/charts/chartDataDisricts'
import useDistrictPerformanceData from '../../composables/tables/useDistrictPerformanceData'
import chartDistrictBoxPlot from '../../composables/charts/chartDistrictBoxPlot'


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

const page = ref(1)
const pageCount = 5

const getRows = (data: any) => {

  return data.slice((page.value - 1) * pageCount, (page.value) * pageCount)

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
  <header class="bg-white fixed top-0 w-full shadow-md">
    <nav class="container mx-auto px-6 py-3 flex">
      <div class="flex  items-center">
        <NuxtLink :to="{ name: 'iam-dashboard' }">
          <p class="p-1 hover:text-green-500">Dashboard</p>
        </NuxtLink>
        <p>|</p>
        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Districts</strong></p>
      </div>
    </nav>
  </header>
  <div class="my-24">

    <UContainer>

      <UCard class="my-5">
        <template #header>
          <div class="text-green-500"><strong>Districts</strong></div>
        </template>

        <!-- <p class="text-green-500" v-if="distPerformance">{{ boxPlotPerformance }}</p> -->

        <div v-if="dists">
          <div class="">
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
                    variant="outline" > view </UButton>
                </NuxtLink>

              </template>
            </UTable>
            <UPagination v-model="page" :page-count="pageCount" :total="dists.length" />
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
         <div class="text-orange-500"><strong>Chart Analysis</strong></div> 
        </template>
        <div v-if="chartData">
   
            <apexchart width="1200" height="350" type="line" :options="chartData.options" :series="chartData.series"></apexchart>
          </div>
      </UCard>

      <UCard>
        <template #header>
         <div class="text-orange-500"><strong>Box Plot Analysis </strong></div> 
        </template>
        <div v-if="boxPlotPerformanceChart">
   
            <apexchart width="1200" height="350" type="boxPlot" :options="boxPlotPerformanceChart.options" :series="boxPlotPerformanceChart.series"></apexchart>
          </div>
      </UCard>



    </UContainer>


  </div>
</template>