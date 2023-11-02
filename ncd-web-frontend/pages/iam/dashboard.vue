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
  <header class="bg-white fixed top-0 w-full shadow-md">
    <nav class="container mx-auto px-6 py-3 flex">
      <div class="flex  items-center">
        <NuxtLink :to="{ name: 'iam-dashboard' }">
          <p class="p-1 hover:text-green-500">Dashboard</p>
        </NuxtLink>
      </div>
    </nav>
  </header>
  <title>NCD Dashboard</title>
  <div class="my-24">
    <UContainer>
      <div class="items-center justify-center h-screen">
        <div class=" flex ">

          <UCard class=" border-slate-700 border-2 text-center w-1/3 m-2 hover:bg-slate-200 hover:text-white"
            v-if="mentees">
            <NuxtLink :to="{ name: 'mentees-report' }">
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
            <p class=" text-4xl text-green-700">{{ comentors.length }} </p>
          </UCard>

          <UCard class=" border-pink-800 border-2 text-center w-1/3 m-2  hover:bg-pink-200 hover:text-white"
            v-if="evaluators">
            <h3 class=""><strong>Evaluators</strong></h3>
            <div class=" w-full h-px max-w-6xl mx-auto my-1"
              style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
            </div>
            <p class=" text-4xl text-pink-800">{{ evaluators.length }} </p>
          </UCard>

          <UCard class=" border-amber-500 border-2 text-center w-1/3 m-2  hover:bg-amber-200 hover:text-white"
            v-if="districts">
            <NuxtLink :to="{ name: 'districts-list' }">
              <h3 class=""><strong>Districts</strong></h3>
              <div class=" w-full h-px max-w-6xl mx-auto my-1"
                style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
              </div>
              <p class=" text-4xl text-amber-500">{{ districts.length }} </p>
            </NuxtLink>
          </UCard>

          <UCard class=" border-cyan-700 border-2 text-center w-1/3 m-2  hover:bg-cyan-200 hover:text-white"
            v-if="facilities">
            <h3 class=""><strong>Facilities</strong></h3>
            <div class=" w-full h-px max-w-6xl mx-auto my-1"
              style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
            </div>
            <p class=" text-4xl text-cyan-700">{{ facilities.length }} </p>
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
            <div v-if="incompleteEvals" class="text-center">
              <span class=" text-red-500 text-9xl">{{ incompleteEvals.length }}</span>
            </div>
          </div>
        </div>

        <div class=" w-full h-px max-w-6xl mx-auto my-5"
          style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
        </div>

        <div class="flex items-center justify-center">
          <NuxtLink :to="{ name: 'scores-view' }">
            <UCard class=" border-teal-900 border-2">
              <p><strong>Evaluation Items</strong></p>
              <div class=" w-full h-px max-w-6xl mx-auto my-1"
                style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
              </div>
              <p class="text-center text-4xl text-teal-900">29 </p>
            </UCard>
          </NuxtLink>
        </div>

      </div>

    </UContainer>
  </div>
</template>

