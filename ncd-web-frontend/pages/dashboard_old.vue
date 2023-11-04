<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';

const menteesStore = useMenteesStore();
const coMentorStore = useCoMentorsStore();
const evaluatorStore = useEvaluatorsStore();
const districtStore = useDistrictStore();
const facilityStore = useFacilityStore();
const evaluationsStore = useEvaluationsStore();

//mentees
const menteesData = useAsyncState(async () => {
  return await menteesStore.mentees();
}, undefined);

const mentees: any = menteesData.state

//comentors
const comentorData = useAsyncState(async () => {
  return await coMentorStore.comentors();
}, undefined);

const comentors: any = comentorData.state

//evaluators
const evaluatorData = useAsyncState(async () => {
  return await evaluatorStore.evaluators();
}, undefined);

const evaluators: any = evaluatorData.state

// districts
const districtData = useAsyncState(async () => {
  return await districtStore.districts();
}, undefined);

const districts: any = districtData.state

// facility
const facilityData = useAsyncState(async () => {
  return await facilityStore.facilities();
}, undefined);

const facilities: any = facilityData.state

// evaluations
const evaluationsData = useAsyncState(async () => {
  return await evaluationsStore.evaluations();
}, undefined);

const evaluations: any = evaluationsData.state

//incomplete evaluations
const incompleteEvalsData = useAsyncState(async () => {
  return await evaluationsStore.getIncompleteEvals();
}, undefined);

const incompleteEvals: any = incompleteEvalsData.state

</script>
<template>
  <title>NCD Dashboard</title>
  <UContainer>

    <div class="items-center justify-center h-screen">
      <div class=" flex ">

        <UCard class=" border-slate-700 border-2 text-center w-1/3 m-2 hover:bg-slate-200 hover:text-white"
          v-if="mentees">
          <NuxtLink to="/mentees/report">
            <h3 class=""><strong>Mentees</strong></h3>
            <div class=" w-full h-px max-w-6xl mx-auto my-1"
              style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
            </div>
            <p class=" text-4xl text-orange-500">{{ mentees.length }} </p>
          </NuxtLink>
        </UCard>


        <UCard class=" border-green-700 border-2 text-center w-1/3 m-2  hover:bg-green-200 hover:text-white"
          v-if="comentors">
          <h3 class=""><strong>Co-Mentors</strong></h3>
          <div class=" w-full h-px max-w-6xl mx-auto my-1"
            style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
          </div>
          <p class=" text-4xl text-orange-500">{{ comentors.length }} </p>
        </UCard>

        <UCard class=" border-pink-800 border-2 text-center w-1/3 m-2  hover:bg-pink-200 hover:text-white"
          v-if="evaluators">
          <NuxtLink to="/evaluators/view">
            <h3 class=""><strong>Evaluators</strong></h3>
            <div class=" w-full h-px max-w-6xl mx-auto my-1"
              style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
            </div>
            <p class=" text-4xl text-orange-500">{{ evaluators.length }} </p>
          </NuxtLink>
        </UCard>

        <UCard class=" border-amber-500 border-2 text-center w-1/3 m-2  hover:bg-amber-200 hover:text-white"
          v-if="districts">
          <NuxtLink to="/districts/list">
            <h3 class=""><strong>Districts</strong></h3>
            <div class=" w-full h-px max-w-6xl mx-auto my-1"
              style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
            </div>
            <p class=" text-4xl text-orange-500">{{ districts.length }} </p>
          </NuxtLink>
        </UCard>

        <UCard class=" border-cyan-700 border-2 text-center w-1/3 m-2  hover:bg-cyan-200 hover:text-white"
          v-if="facilities">
          <h3 class=""><strong>Facilities</strong></h3>
          <div class=" w-full h-px max-w-6xl mx-auto my-1"
            style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
          </div>
          <p class=" text-4xl text-orange-500">{{ facilities.length }} </p>
        </UCard>
      </div>

      <div class=" w-full h-px max-w-6xl mx-auto my-5"
        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
      </div>

      <div class=" flex items-center justify-center divide-x-2 divide-blue-300" h-screen>
        <div class="px-4 py-1">
          <span class=" items-start"><strong>Completed Evaluations to date</strong></span>
          <div class=" w-full h-px max-w-6xl mx-auto my-5"
            style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
          </div>
          <div v-if="evaluations" class="text-center">
            <span class=" text-sky-500 text-9xl">{{ evaluations.length }}</span>
          </div>

        </div>
        <div class="px-4 py-1">
          <span class=" items-end"><strong>Incomplete Evaluations to date</strong></span>
          <div class=" w-full h-px max-w-6xl mx-auto my-5"
            style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
          </div>
          <div v-if="evaluations" class="text-center">
            <span class=" text-red-500 text-9xl">{{ incompleteEvals.length }}</span>
          </div>
        </div>
      </div>
    </div>

  </UContainer></template>

