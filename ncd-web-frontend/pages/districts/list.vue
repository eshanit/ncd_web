<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { useDistrictStore } from '../../stores/districts'
import { useEvaluationsStore } from '../../stores/evaluations'
import { useMenteesStore } from '../../stores/mentees'
import useDistrictTableData from '../../composables/tables/useDistrictTableData'

const districtStore  = useDistrictStore()
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


const distData = useAsyncState(async () => {
    console.log('hello')
  return await useDistrictTableData(districtData, groupedMenteeByDistrictData );
}, undefined);

const dists = distData.state;



//grouped evaluations

// const groupedEvalsByDistrictData = useAsyncState(async () => {
//   return await evaluationStore.groupedByDistricts();
// }, undefined);

// const groupedEvalsByDistrict = groupedEvalsByDistrictData.state;






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
            <UCard>
                <template #header>
                    <div class="text-green-500"><strong>Districts</strong></div>
                </template>
                <!-- {{ districts }} -->
                <p class="text-green-500">{{ dists }}</p>
                {{menteesByDistricts}}
            </UCard>
        </UContainer>
    </div>
</template>