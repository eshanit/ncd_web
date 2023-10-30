<script setup lang="ts">
import { useEvaluationsStore } from '../../stores/evaluations';
import { useAsyncState } from '@vueuse/core';
import { format } from 'date-fns'
import { mean, mode, standardDeviation, sampleSkewness } from 'simple-statistics'

const route = useRoute()

const menteeId = route.params.id;

const evaluationsStore = useEvaluationsStore();

const menteeData = useAsyncState(async () => {
    return await evaluationsStore.getMenteeEvals(menteeId);
}, undefined);

const mentee: any = menteeData.state

const latestData = async () => {
    return menteeData.then((resp) => {

        const state: any = resp.state.value
        let vm: any[] = [];

        for (var i = 0; i < state.length; i++) {
            vm.push(state[i].info.evaluationDate);
        }

        const max = vm.reduce((a, b) => {
            return Math.max(a, b);
        });

        return format(new Date(max), 'dd-MMM-yyyy');

    })
}


const latestDate = useAsyncState(async () => {
    return latestData();
}, undefined);

const lastEvaluationDate = latestDate.state

// /// score analysis
const flatScores = async () => {
    return menteeData.then((resp) => {
        const state: any = resp.state.value
        let vm: any[] = [];

        for (var i = 0; i < state.length; i++) {
            vm.push(state[i].scores);
        }

        const vm2 = vm.flat(1);

        const vm3: any[] = [];

        for (var i = 0; i < vm2.length; i++) {
            vm3.push(Object.values(vm2[i]))
        }

        const vm4 = vm3.flat(1);

        const nums = vm4.map(function (el) {
            return parseInt(el);
        });

        return nums
    })
}

const scoreArrays = useAsyncState(async () => {
    return flatScores();
}, undefined);

const getflatScores = scoreArrays.state
</script>
<template>
    <header class="bg-white fixed top-0 w-full shadow-md">
        <nav class="container mx-auto px-6 py-3">
            <div class="flex  items-center">
                <NuxtLink :to="{ name: 'iam-dashboard' }">
                    <p class="p-1 hover:text-green-500">Dashboard</p>
                </NuxtLink>
                <p>|</p>
                <NuxtLink :to="{ name: 'mentees-report' }">
                    <p class="p-1 hover:text-green-500">Mentees</p>
                </NuxtLink>
                <p>|</p>
                <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Mentee Stats</strong></p>
            </div>

        </nav>
    </header>
    <div v-if="mentee">
        <div class="  my-24">
            <UContainer>
                <UCard class="border-solid border-2 border-green-300">
                    <template #header>.
                        <p class=" text-green-500"><strong>Mentee Demographics:</strong></p>
                    </template>

                    <div class="grid grid-cols-2">
                        <div class=" justify-start border-b border-gray-300 p-2"><strong>Full Name:</strong></div>
                        <div class=" justify-end  border-b border-gray-300 p-2">{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</div>
                        <div class=" justify-start  border-b border-gray-300 p-2"><strong>Gender:</strong></div>
                        <div class=" justify-end border-b border-gray-300 p-2">{{ mentee[0].info.menteeInfo[0].gender }}
                        </div>
                        <div class=" justify-start border-b border-gray-300 p-2"><strong>District:</strong></div>
                        <div class=" justify-end border-b border-gray-300 p-2">{{ mentee[0].info.menteeInfo[0].district }}
                        </div>
                        <div class=" justify-start border-b border-gray-300 p-2"><strong>Facility:</strong></div>
                        <div class=" justify-end border-b border-gray-300 p-2">{{ mentee[0].info.menteeInfo[0].facility }}
                        </div>
                    </div>
                    <template #footer />
                </UCard>
                <div class=" w-full h-px max-w-6xl mx-auto my-5"
                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                </div>
                <UCard class="border-solid border-2 border-orange-300">
                    <template #header>
                        <p class=" text-orange-500"><strong>Mentee Evaluation Stats:</strong></p>
                    </template>
                    <div class="grid grid-cols-2 text-center">
                        <div class="flex border-r-2 border-gray-400 justify-items-center">
                            <div class="justify-start w-1/2">
                                <NuxtLink :to="{ name: 'mentees-analysis-id', params: { id: menteeId } }">
                                    <UButton size="xl" color="red" variant="outline">
                                        Indepth Analysis
                                    </UButton>
                                </NuxtLink>
                            </div>
                            <div class="justify-end w-1/2">
                                <div class=""><strong>Number of Evaluations:</strong></div>
                                <div class=" text-5xl text-sky-600">{{ mentee.length }}</div>
                            </div>
                        </div>
                        <div class="justify-items-center text-center">
                            <div class=""><strong>Last Evaluation Date:</strong></div>
                            <div class="text-5xl text-sky-600">{{ lastEvaluationDate }}</div>
                        </div>
                    </div>
                    <template #footer />
                </UCard>
                <div class=" w-full h-px max-w-6xl mx-auto my-5"
                    style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                </div>
                <div>
                    <div class=" text-orange-500"><strong>Scores Analysis</strong></div>

                    <div class="grid grid-cols-4">
                        <div class="mt-5 mx-2">
                            <div class="text-center">
                                <div class="border-b-4 border-yellow-300 pb-2"> <strong>Mean Score</strong></div>
                                <div>
                                    <div v-if="getflatScores" class="text-3xl"> {{ mean(getflatScores).toFixed(2) }}</div>
                                    <div v-else> calc ...</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 mx-2">
                            <div class="text-center">
                                <div class="border-b-4 border-green-500 pb-2"> <strong>Modal Score</strong></div>
                                <div>
                                    <div v-if="getflatScores" class="text-3xl"> {{ mode(getflatScores) }}</div>
                                    <div v-else> calc ...</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 mx-2">
                            <div class="text-center">
                                <div class="border-b-4 border-blue-500 pb-2"> <strong>Std Deviation</strong></div>
                                <div>
                                    <div v-if="getflatScores" class="text-3xl"> {{
                                        standardDeviation(getflatScores).toFixed(2)
                                    }}</div>
                                    <div v-else> calc ...</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 mx-2">
                            <div class="text-center">
                                <div class="border-b-4 border-red-500 pb-2"> <strong>Sample Skewness</strong></div>
                                <div v-if="getflatScores">
                                    <div v-if="getflatScores.length > 3" class="text-3xl"> {{
                                                                            sampleSkewness(getflatScores).toFixed(2) }}</div>
                                    <div v-else> n/a </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UContainer>
    </div>

</div></template>
<script setup>
</script>