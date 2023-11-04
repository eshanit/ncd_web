<script setup lang="ts">
import { useEvaluationsStore } from '../../stores/evaluations';
import { useAsyncState } from '@vueuse/core';
import { format } from 'date-fns'
import { mean, mode, standardDeviation, sampleSkewness } from 'simple-statistics'

const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()


const isOpenMean = ref(false)
const isOpenModal = ref(false)
const isOpenStdDeviation = ref(false)
const isOpenSkewness = ref(false)

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
    <header class="bg-white fixed top-0 w-full">
        <nav class=" mx-auto flex">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex flex-wrap items-center">
                    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1">

                        <NuxtLink :to="{ name: 'iam-dashboard' }">
                            <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
                        </NuxtLink>
                        <p>|</p>
                        <NuxtLink :to="{ name: 'mentees-report' }">
                            <p class="p-1 hover:text-green-500 text-gray-500"><strong>Mentees</strong></p>
                        </NuxtLink>
                        <p>|</p>
                        <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Mentee Stats</strong></p>

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
    <div v-if="mentee">
        <div class=" my-28 ">
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
                                    <UButton size="xl" color="purple" variant="outline">
                                        <strong>Indepth Analysis</strong>
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
                        <div class="mt-5 mx-2 cursor-pointer" @click="isOpenMean = true">
                            <UCard class=" hover:border-yellow-400 hover:border-2 ">
                                <div class="text-center">
                                    <div class="border-b-4 border-yellow-300 pb-2"> <strong>Mean Score</strong></div>
                                    <div>
                                        <div v-if="getflatScores" class="text-3xl"> {{ mean(getflatScores).toFixed(2) }}
                                        </div>
                                        <div v-else> calc ...</div>
                                    </div>
                                </div>
                            </UCard>
                        </div>
                        <div class="mt-5 mx-2 cursor-pointer" @click="isOpenModal = true">
                            <UCard class=" hover:border-green-400 hover:border-2 ">
                                <div class="text-center">
                                    <div class="border-b-4 border-green-300 pb-2"> <strong>Mode Score</strong></div>
                                    <div>
                                        <div v-if="getflatScores" class="text-3xl"> {{ mode(getflatScores) }}
                                        </div>
                                        <div v-else> calc ...</div>
                                    </div>
                                </div>
                            </UCard>
                        </div>
                        <div class="mt-5 mx-2 cursor-pointer" @click="isOpenStdDeviation = true">
                            <UCard class=" hover:border-blue-400 hover:border-2 ">
                                <div class="text-center">
                                    <div class="border-b-4 border-blue-300 pb-2"> <strong>Std Deviation of Scores</strong>
                                    </div>
                                    <div>
                                        <div v-if="getflatScores" class="text-3xl"> {{
                                            standardDeviation(getflatScores).toFixed(2) }}
                                        </div>
                                        <div v-else> calc ...</div>
                                    </div>
                                </div>
                            </UCard>
                        </div>
                        <div class="mt-5 mx-2 cursor-pointer" @click="isOpenSkewness = true">
                            <UCard class=" hover:border-red-400 hover:border-2 ">
                                <div class="text-center">
                                    <div class="border-b-4 border-red-300 pb-2"> <strong>Skewness of Scores</strong></div>
                                    <div>
                                        <div v-if="getflatScores" class="text-3xl"> {{
                                            sampleSkewness(getflatScores).toFixed(2) }}
                                        </div>
                                        <div v-else> calc ...</div>
                                    </div>
                                </div>
                            </UCard>
                        </div>
                    </div>
                </div>
            </UContainer>
        </div>

    </div>
    <!--mean-->
    <USlideover v-model="isOpenMean">
        <UCard class="flex flex-col flex-1 "
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }"
            v-if="getflatScores">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div class=" text-green-500"><strong>Mean/Average Scores</strong></div>
                </div>
            </template>
            <!-- Content -->
            <div class="my-2">
                <p>The mean score for <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> for all their scores aggregated over
                    <span class="text-red-500 text-sm italic"><strong>{{ mentee.length }}</strong></span> evaluations is
                    <span class="text-blue-500 text-sm italic"><strong>{{ mean(getflatScores).toFixed(2) }}</strong></span>
                </p>
            </div>
            <div v-if="mean(getflatScores) < 1.5">
                <p>This means overally <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> performed <span
                        class=" text-red-500 italic"><strong>Poorly</strong></span>, and the performance is unacceptable</p>
            </div>
            <div v-if="mean(getflatScores) >= 1.5 || mean(getflatScores) <= 2.5">
                <p>This means overally <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> performed <span
                        class=" text-yellow-500 italic"><strong>Moderately</strong></span>, and the performance is
                    acceptable but needs improvement</p>
            </div>
            <div v-if="mean(getflatScores) > 2.5">
                <p>This means overally <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> is <span
                        class=" text-green-500 italic"><strong>Competent</strong></span>, and the performance is good, a
                    master of skill</p>
            </div>

            <template #footer>
                <!-- Content -->
                <div>
                    <p><span class="text-red-500"><strong>NB:</strong></span> <span class="text-sm italic"> This is data
                            collected over <span class="text-blue-500 text-sm italic"><strong>{{ mentee.length
                            }}</strong></span> evaluation sessions.</span></p>
                </div>
            </template>
        </UCard>
    </USlideover>

    <!--mode-->

    <USlideover v-model="isOpenModal">
        <UCard class="flex flex-col flex-1 "
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }"
            v-if="getflatScores">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div class=" text-green-500"><strong>Mode Score</strong></div>
                </div>
            </template>
            <!-- Content -->
            <div class="my-2">
                <p>The mode score for <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> for all their scores aggregated over
                    <span class="text-red-500 text-sm italic"><strong>{{ mentee.length }}</strong></span> evaluations is
                    <span class="text-blue-500 text-sm italic"><strong>{{ mode(getflatScores) }}</strong></span>
                </p>
            </div>
            <div v-if="mode(getflatScores) == 0" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span> got a score of <span
                        class="text-gray-500 italic"><strong>0 (Not Applicable - could not be evaluated)</strong></span> on
                    most of the evaluation items.</p>
            </div>
            <div v-if="mode(getflatScores) == 1" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span> got a score of <span
                        class=" text-red-500 italic"><strong>1 (Poor - unacceptable performance)</strong></span> on most of
                    the evaluation items.</p>
            </div>
            <div v-if="mode(getflatScores) == 2" class="my-2">
                <p>This means overally <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> got a score of <span
                        class=" text-yellow-500 italic"><strong>2 (Moderate - acceptable but needs
                            improvement)</strong></span> on most of the evaluation items.</p>
            </div>
            <div v-if="mode(getflatScores) == 3" class="my-2">
                <p>This means overally <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> got a score of <span
                        class=" text-green-500 italic"><strong>3 (Competent - good, master of skill)</strong></span> on most
                    of the evaluation items.</p>
            </div>




            <template #footer>
                <!-- Content -->
                <div>
                    <p><span class="text-red-500"><strong>NB:</strong></span> <span class="text-sm italic"> This is data
                            collected over <span class="text-blue-500 text-sm italic"><strong>{{ mentee.length
                            }}</strong></span> evaluation sessions.</span></p>
                </div>
            </template>
        </UCard>
    </USlideover>

    <!--Std Deviation-->

    <USlideover v-model="isOpenStdDeviation">
        <UCard class="flex flex-col flex-1 "
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }"
            v-if="getflatScores">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div class=" text-green-500"><strong>Standard Devation of Scores</strong></div>
                </div>
            </template>
            <!-- Content -->
            <div class="my-2">
                <p>The Standard Deviation of scores for <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> for all their scores aggregated over
                    <span class="text-red-500 text-sm italic"><strong>{{ mentee.length }}</strong></span> evaluations is
                    <span class="text-blue-500 text-sm italic"><strong>{{ standardDeviation(getflatScores).toFixed(2)
                    }}</strong></span>
                </p>
            </div>
            <div v-if="standardDeviation(getflatScores) == 0" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span> got equal scores across all evaluations
                </p>
            </div>
            <div v-else-if="standardDeviation(getflatScores) > 0 && standardDeviation(getflatScores) < 0.5" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span>'s scores do not differ much from the
                    average or mean </p>
            </div>

            <div v-else-if="standardDeviation(getflatScores) >= 0.5 && standardDeviation(getflatScores) < 1" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span>'s scores differ by some considerable
                    margin from the mean </p>
            </div>
            <div v-else-if="standardDeviation(getflatScores) >= 1 && standardDeviation(getflatScores) < 1.5" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span>'s scores differs considerably from the
                    mean </p>
            </div>
            <div v-else class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span>'s scores differs very much from the
                    mean </p>
            </div>





            <template #footer>
                <!-- Content -->
                <div>
                    <p><span class="text-red-500"><strong>NB:</strong></span> <span class="text-sm italic"> This is data
                            collected over <span class="text-blue-500 text-sm italic"><strong>{{ mentee.length
                            }}</strong></span> evaluation sessions.</span></p>
                </div>
            </template>
        </UCard>
    </USlideover>

    <!--sampleSkewness-->
    <USlideover v-model="isOpenSkewness">
        <UCard class="flex flex-col flex-1 "
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }"
            v-if="getflatScores">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div class=" text-green-500"><strong>Skewness of Scores</strong></div>
                </div>
            </template>
            <!-- Content -->
            <div class="my-2">
                <p>The sample skewness of the scores for <span class="text-red-500 text-sm italic"><strong>{{
                    mentee[0].info.menteeInfo[0].firstname }} {{
        mentee[0].info.menteeInfo[0].lastname }}</strong></span> for all their scores aggregated over
                    <span class="text-red-500 text-sm italic"><strong>{{ mentee.length }}</strong></span> evaluations is
                    <span class="text-blue-500 text-sm italic"><strong>{{ sampleSkewness(getflatScores).toFixed(2)
                    }}</strong></span>
                </p>
            </div>
            <div v-if="sampleSkewness(getflatScores) == 0" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span>'s score data is likely asymmetrical.
                </p>
            </div>
            <div v-else-if="sampleSkewness(getflatScores) < 0" class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span>'s are negatively skewed, it has a tail
                    on the negative side of the graph, meaning the graph is skewed to the left, so when modeling the data or
                    making
                    statistical inferences its best to take this into account.
                </p>
            </div>

            <div v-else="sampleSkewness(getflatScores) > 0  " class="my-2">
                <p>This means <span class="text-red-500 text-sm italic"><strong>{{ mentee[0].info.menteeInfo[0].firstname }}
                            {{
                                mentee[0].info.menteeInfo[0].lastname }}</strong></span>'s are positively skewed, it has a tail
                    on the positive side of the graph, meaning the graph is skewed to the right, so when modeling the data
                    or
                    making
                    statistical inferences its best to take this into account.
                </p>
            </div>


            <template #footer>
                <!-- Content -->
                <div>
                    <p><span class="text-red-500"><strong>NB:</strong></span> <span class="text-sm italic"> This is data
                            collected over <span class="text-blue-500 text-sm italic"><strong>{{ mentee.length
                            }}</strong></span> evaluation sessions.</span></p>
                </div>
            </template>
        </UCard>
    </USlideover>
</template>
<script setup>
</script>