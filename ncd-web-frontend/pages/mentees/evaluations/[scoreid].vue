<script setup lang="ts">
import { useEvaluationsStore } from '../../../stores/evaluations'
import { format } from 'date-fns';
import chartDataScorePie from '../../../composables/chartDataScorePie'

const iamStore = useIamProfileStore();

const { useLogUserOut, profile } = useAuthStuff()

const isOpenIIEKnowledge = ref(false)
const isOpenIIEAcquiredSkill = ref(false)
const isOpenIIEBehaviour = ref(false)
const isOpenMngtKnowledge = ref(false)
const isOpenMngtAcquiredSkill = ref(false)
const isOpenMngtBehaviour = ref(false)


const route = useRoute()

const scoreId = route.params.scoreid;

//

const from = localStorage.getItem('from');

const fromId = localStorage.getItem('id');

//

const evaluationsStore = useEvaluationsStore();

const menteeData = useAsyncState(async () => {
    return await evaluationsStore.getEval(scoreId);
}, undefined);

const mentee: any = menteeData.state


//chart score data

const getchartData = chartDataScorePie(menteeData)


const scorePieData = useAsyncState(async () => {
    return getchartData;
}, undefined);

const pieData: any = scorePieData.state



</script>
<template>
    <header class="bg-white fixed top-0 w-full ">
        <nav class="mx-auto flex">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex flex-wrap items-center">
                    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1" v-if="mentee">

                        <div class="flex" v-if="from == 'evaluators-id'">
                            <NuxtLink :to="{ name: 'iam-dashboard' }">
                                <p class="p-1 hover:text-green-500 text-gray-500">
                                    <strong>Dashboard</strong>
                                </p>
                            </NuxtLink>
                            <p>|</p>
                            <NuxtLink :to="{ name: 'evaluators-view' }">
                                <p class="p-1 hover:text-green-500 text-gray-500">
                                    <strong>Evaluators</strong>
                                </p>
                            </NuxtLink>
                            <p>|</p>
                            <NuxtLink :to="{
                                name: from,
                                params: {
                                    id: fromId
                                }
                            }">
                                <p class="p-1 hover:text-green-500 text-gray-500">
                                    <strong>Evaluations</strong>
                                </p>
                            </NuxtLink>
                            <p>|</p>
                            <p class="p-1 text-orange-500 border-b-2 border-green-500">
                                <strong>Mentee Report</strong>
                            </p>

                        </div>
                        <div class="flex" v-else-if="from == 'mentees-analysis-id'">

                            <NuxtLink :to="{ name: 'iam-dashboard' }">
                                <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
                            </NuxtLink>
                            <p>|</p>
                            <NuxtLink :to="{ name: 'mentees-report' }">
                                <p class="p-1 hover:text-green-500 text-gray-500"><strong>Mentees</strong></p>
                            </NuxtLink>
                            <p>|</p>
                            <NuxtLink :to="{
                                name: 'mentees-id',
                                params: { id: mentee.info.menteeInfo[0].id }
                            }">
                                <p class="p-1 hover:text-green-500 text-gray-500"><strong>Mentees Stats</strong></p>
                            </NuxtLink>
                            <p>|</p>
                            <NuxtLink :to="{
                                name: 'mentees-analysis-id',
                                params: { id: mentee.info.menteeInfo[0].id }
                            }">
                                <p class="p-1 hover:text-green-500 text-gray-500"><strong>Mentees Analysis</strong></p>
                            </NuxtLink>
                            <p>|</p>
                            <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Mentee Report</strong></p>

                        </div>
                        <div class="flex" v-else-if="from == 'scores-item'">
                            <NuxtLink :to="{ name: 'iam-dashboard' }">
                                <p class="p-1 hover:text-green-500 text-gray-500"><strong>Dashboard</strong></p>
                            </NuxtLink>
                            <p>|</p>
                            <NuxtLink :to="{ name: 'scores-view' }">
                                <p class="p-1 hover:text-green-500 text-gray-500"><strong>Eval-Items</strong></p>
                            </NuxtLink>
                            <P>|</P>
                            <NuxtLink :to="{ name: from,
                                 params: { item: fromId } }">
                                <p class="p-1 hover:text-green-500 text-gray-500"><strong>EI-Analysis </strong></p>
                            </NuxtLink>
                            <p>|</p>
                            <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Mentee Report</strong></p>
                        </div>
                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right py-2">
                        <!-- <span class="text-xs pr-1 text-gray-500" v-if="profile"><strong>{{ profile?.data.first_name }}</strong></span> -->
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
            <UCard class="mt-3 mb-3">
                <template #header>
                    <strong>Mentee Information</strong>
                    <!-- <div class="text-red-500">{{ scoreId }}</div>
                {{ mentee }} -->
                </template>
                <div v-if="mentee">

                    <UCard class="border-solid border-2 border-green-300">
                        <template #header>
                            <p class=" text-green-500"><strong>Mentee Demographics:</strong></p>
                        </template>

                        <div class="grid grid-cols-2">
                            <div class=" justify-start border-b border-gray-300 p-2"><strong>Full Name:</strong></div>
                            <div class=" justify-end  border-b border-gray-300 p-2">{{ mentee.info.menteeInfo[0].firstname
                            }}
                                {{
                                    mentee.info.menteeInfo[0].lastname }}</div>
                            <div class=" justify-start  border-b border-gray-300 p-2"><strong>Gender:</strong></div>
                            <div class=" justify-end border-b border-gray-300 p-2">{{ mentee.info.menteeInfo[0].gender }}
                            </div>
                            <div class=" justify-start border-b border-gray-300 p-2"><strong>District:</strong></div>
                            <div class=" justify-end border-b border-gray-300 p-2">{{ mentee.info.menteeInfo[0].district }}
                            </div>
                            <div class=" justify-start p-2"><strong>Facility:</strong></div>
                            <div class=" justify-end p-2">{{ mentee.info.menteeInfo[0].facility }}</div>
                        </div>
                    </UCard>
                    <div class=" w-full h-px max-w-6xl mx-auto my-5"
                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                    </div>
                    <UCard class="border-solid border-2 border-green-300">
                        <template #header>
                            <p class=" text-green-500"><strong>Evaluation Info:</strong></p>
                        </template>

                        <div class="grid grid-cols-2">
                            <div class=" justify-start border-b border-gray-300 p-2"><strong>Evaluator:</strong></div>
                            <div class=" justify-end border-b border-gray-300 p-2">{{ mentee.info.evaluatorInfo[0].firstname
                            }}
                                {{ mentee.info.evaluatorInfo[0].surname }}</div>
                            <div class=" justify-start  p-2"><strong>Evaluation Date:</strong></div>
                            <div class=" justify-end  p-2">{{ format(new Date(mentee.info.evaluationDate), 'dd-MMM-yyyy') }}
                            </div>
                        </div>
                    </UCard>
                    <div class=" w-full h-px max-w-6xl mx-auto my-5"
                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                    </div>
                    <UCard class="border-solid border-2 border-green-300">
                        <template #header>
                            <p class=" text-green-500"><strong>Co-Mentors:</strong> <span class="text-red-500">{{
                                mentee.info.comentorInfo.length }}</span></p>
                        </template>

                        <div>
                            <div class="grid grid-cols-4 border-b border-orange-300 p-2">
                                <div class=""><strong>Name</strong></div>
                                <div class=""><strong>Surname</strong></div>
                                <div class=""><strong>Gender</strong></div>
                                <div class=""><strong>Contact</strong></div>
                            </div>
                        </div>
                        <div v-for="(comentor, i) in mentee.info.comentorInfo" :key="i">
                            <div class="grid grid-cols-4">
                                <div class="border-b border-gray-300 p-2">{{ comentor.name }}</div>
                                <div class="border-b border-gray-300 p-2">{{ comentor.surname }}</div>
                                <div class="border-b border-gray-300 p-2">{{ comentor.gender }}</div>
                                <div class="border-b border-gray-300 p-2">{{ comentor.contact }}</div>
                            </div>
                        </div>
                    </UCard>
                    <div class=" w-full h-px max-w-6xl mx-auto my-5"
                        style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0) 1.46%, rgba(149, 131, 198, 0.6) 40.83%, rgba(149, 131, 198, 0.3) 65.57%, rgba(149, 131, 198, 0) 107.92%);">
                    </div>
                    <div class="grid grid-cols-2 pb-2">
                        <div class=" text-3xl text-orange-400 border-b border-gray-300">Scores</div>
                        <div class="flex">
                            <div class="">
                                <span v-if="mentee.scoreStats.totalScore > 43.5" class="text-blue-500">{{
                                    mentee.scoreStats.totalScore }}</span>
                                <span v-else class="text-red-500">{{ mentee.scoreStats.totalScore }}</span> out of
                                <strong>87</strong>
                            </div>
                            <div class="text-orange-500 pr-2 pl-2">|</div>
                            <div class="">
                                <span v-if="mentee.scoreStats.totalScore > 49" class="text-blue-500">{{
                                    mentee.scoreStats.percTotal }}%</span>
                            </div>
                            <div class="text-orange-500 pr-2 pl-2">|</div>
                            <div class="">
                                <strong>Mean Score:</strong> <span v-if="mentee.scoreStats.totalScore > 49"
                                    class="text-blue-500">{{ mentee.scoreStats.totalaverageScore }}</span>
                            </div>

                        </div>

                    </div>
                    <div class="  border-b border-gray-300 pb-2">
                        <p> Below are the scores breakdown for this evaluation:</p>
                    </div>
                    <div class="  border-b border-gray-300 pb-2 pt-2 ">
                        <p> Section A: <strong> Introduction and Initial Evaluation</strong></p>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class=" border-r border-green-500 text-center p-2">
                            <div class="text-gray-500 text-xl pb-1"> Knowledge</div>
                            <div> Average Score: <UButton label="Open" @click="isOpenIIEKnowledge = true"><strong>{{
                                mentee.scoreStats.averageIIEKnowledgeScore }}</strong></UButton>
                            </div>
                        </div>
                        <div class=" border-r border-green-500 text-center p-2">
                            <div class="text-gray-500 text-xl pb-1"> Acquired Skill</div>
                            <div> Acquired Skill: <UButton label="Open" @click="isOpenIIEAcquiredSkill = true"><strong>{{
                                mentee.scoreStats.averageIIEAcquiredSkillScore }}</strong></UButton>
                            </div>
                        </div>
                        <div class="text-center pt-2">
                            <div class="text-gray-500 text-xl p-1"> Behaviour</div>
                            <div> Average Score: <UButton label="Open" @click="isOpenIIEBehaviour = true"><strong>{{
                                mentee.scoreStats.averageIIEBehaviourScore }}</strong></UButton>
                            </div>
                        </div>
                    </div>

                    <!--break 1-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q1
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ1 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ1
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ1 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ1
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ1 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ1
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ1 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ1
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q8
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ8 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ8
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ8 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ8
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ8 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ8
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ8 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ8
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> Q11
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ11 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ11
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ11 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ11
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ11 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ11
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ11 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ11
                                }}</strong></span>
                            </div>
                        </div>
                    </div>

                    <!--break 2-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q2
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ2 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ2
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ2 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ2
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ2 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ2
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ2 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ2
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q9
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ9 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ9
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ9 = 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ9
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ9 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ9
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ9 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ9
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> Q12
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ12 == 0" class="text-gray-500">{{ mentee.scores[0].dmQ12
                                }}</span>
                                <span v-else-if="mentee.scores[0].dmQ12 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ12
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ12 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ12
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ12 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ12
                                }}</strong></span>
                            </div>
                        </div>
                    </div>
                    <!--Break 3-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q3
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ3 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ3
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ3 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ3
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ3 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ3
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ3 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ3
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q10
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ10 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ10
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ10 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ10
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ10 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ10
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ10 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ10
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> Q13
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ13 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ13
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ13 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ13
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ13 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ13
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ13 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ13
                                }}</strong></span>
                            </div>
                        </div>
                    </div>
                    <!-- break 4-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q4
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ4 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ4
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ4 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ4
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ4 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ4
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ4 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ4
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500">
                                -
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>
                    <!--break 5-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q5
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ5 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ5
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ5 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ5
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ5 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ5
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ5 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ5
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> -
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>
                    <!--break 5-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q6
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ6 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ6
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ6 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ6
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ6 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ6
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ6 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ6
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> -
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>
                    <!--break 6-->
                    <div class="grid grid-cols-3 items-center border-b border-gray-500">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q7
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ7 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ7
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ7 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ7
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ7 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ7
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ7 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ7
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> -
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>
                    <div class="  border-b border-gray-300 pb-2 pt-2 ">
                        <p> Section B: <strong> Management of DM</strong></p>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class=" border-r border-green-500 text-center p-2">
                            <div class="text-gray-500 text-xl pb-1"> Knowledge</div>
                            <div> Average Score: <UButton label="Open" @click="isOpenMngtKnowledge = true"><strong>{{
                                mentee.scoreStats.averageMgntKnowledgeScore }}</strong></UButton>
                            </div>
                        </div>
                        <div class=" border-r border-green-500 text-center p-2">
                            <div class="text-gray-500 text-xl pb-1"> Acquired Skill</div>
                            <div> Acquired Skill: <UButton label="Open" @click="isOpenMngtAcquiredSkill = true"><strong>{{
                                mentee.scoreStats.averageMgntAcquiredSkillScore }}</strong></UButton>
                            </div>
                        </div>
                        <div class="text-center pt-2">
                            <div class="text-gray-500 text-xl p-1"> Behaviour</div>
                            <div> Average Score: <UButton label="Open" @click="isOpenMngtBehaviour = true"><strong>{{
                                mentee.scoreStats.averageMgntBehaviourScore }}</strong></UButton>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q14
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ14 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ14
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ14 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ14
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ14 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ14
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ14 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ14
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q23
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ23 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ23
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ23 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ23
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ23 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ23
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ23 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ23
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> Q29
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ29 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ29
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ29 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ29
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ29 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ29
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ29 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ29
                                }}</strong></span>
                            </div>
                        </div>
                    </div>

                    <!--break -->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q15
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ15 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ15
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ15 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ15
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ15 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ15
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ15 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ15
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q24
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ24 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ24
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ24 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ24
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ24 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ24
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ8 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ24
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>

                    <!--break-->

                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q16
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ16 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ16
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ16 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ16
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ16 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ16
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ16 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ16
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q25
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ25 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ25
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ25 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ25
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ25 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ25
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ25 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ25
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>

                    <!--break-->
                    <!--break-->

                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q17
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ17 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ17
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ17 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ17
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ17 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ17
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ17 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ17
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q26
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ26 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ26
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ26 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ26
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ26 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ26
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ26 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ26
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>

                    <!--break-->
                    <!--break-->

                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q18
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ18 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ18
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ18 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ18
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ18 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ18
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ18 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ18
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q27
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ25 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ27
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ27 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ27
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ27 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ27
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ27 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ27
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>

                    <!--break-->
                    <!--break-->

                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q19
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ19 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ19
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ19 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ19
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ19 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ19
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ19 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ19
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500"> Q28
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ28 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ28
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ28 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ28
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ28 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ28
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dm28 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ28
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>

                    <!--break-->

                    <!--break-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q20
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ20 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ20
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ20 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ20
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ20 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ20
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ20 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ20
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500">
                                -
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>

                    <!--break-->
                    <!--break-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q21
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ21 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ21
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ21 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ21
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ21 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ21
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ21 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ21
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500">
                                -
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>

                    <!--break-->
                    <!--break-->
                    <div class="grid grid-cols-3 items-center ">
                        <div class=" border-t border-gray-500  text-center ">
                            <div class="text-gray-500 p-5"> Q22
                                <UIcon name="i-heroicons-arrow-long-right" />
                                <span v-if="mentee.scores[0].dmQ22 == 0" class="text-gray-500"><strong>{{
                                    mentee.scores[0].dmQ22
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ22 == 1" class="text-red-500"><strong>{{
                                    mentee.scores[0].dmQ22
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ22 == 2" class="text-yellow-500"><strong>{{
                                    mentee.scores[0].dmQ22
                                }}</strong></span>
                                <span v-else-if="mentee.scores[0].dmQ22 == 3" class="text-green-500"><strong>{{
                                    mentee.scores[0].dmQ22
                                }}</strong></span>
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 border-l border-r  border-green-500">
                                -
                            </div>
                        </div>
                        <div class=" border-t border-gray-500  text-center X">
                            <div class="text-gray-500 p-5 "> -
                            </div>
                        </div>
                    </div>


                    <!--end-->

                </div>
            </UCard>
        </UContainer>
    </div>
    <!--slidover-->
    <USlideover v-model="isOpenIIEKnowledge" v-if="pieData">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div><strong>IIE Knowledge</strong></div>
                    <div class="text-orange-500 px-1"><strong>|</strong></div>
                    <div class="text-green-500">analysis</div>
                </div>
            </template>
            <!-- Content -->
            <div class="border-b border-gray-300  pb-2 ">
                <apexchart width="425" type="donut" :options="{
                    labels: pieData.keys.iieknowledge
                }" :series="pieData.values.iieknowledge"></apexchart>
            </div>

            <div class="grid grid-cols-2">
                <div class=" justify-start border-b border-gray-300 p-2"><strong>Score Level</strong></div>
                <div class=" justify-end border-b border-gray-300 text-center p-2"><strong>Occurences/Count</strong></div>
                <div class=" justify-start  p-2">Competent</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieknowledge[3] }}
                </div>

                <div class=" justify-start  p-2">Moderate</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieknowledge[2] }}
                </div>
                <div class=" justify-start   p-2">Poor</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieknowledge[1] }}
                </div>
                <div class=" justify-start p-2">Not Applicable</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieknowledge[0] }}
                </div>
            </div>

            <template #footer>
                <!-- Content -->

            </template>
        </UCard>
    </USlideover>
    <!--slide over 2-->
    <USlideover v-model="isOpenIIEAcquiredSkill" v-if="pieData">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div><strong>IIE Acquired-Skill</strong></div>
                    <div class="text-orange-500 px-1"><strong>|</strong></div>
                    <div class="text-green-500">analysis</div>
                </div>
            </template>
            <!-- Content -->
            <div class="border-b border-gray-300  pb-2 ">
                <apexchart width="425" type="donut" :options="{
                    labels: pieData.keys.iieacquiredskill
                }" :series="pieData.values.iieacquiredskill"></apexchart>
            </div>
            <div class="grid grid-cols-2">
                <div class=" justify-start border-b border-gray-300 p-2"><strong>Score Level</strong></div>
                <div class=" justify-end border-b border-gray-300 text-center p-2"><strong>Occurences/Count</strong></div>
                <div class=" justify-start  p-2">Competent</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieacquiredskill[3] }}
                </div>
                <div class=" justify-start  p-2">Moderate</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieacquiredskill[2] }}
                </div>

                <div class=" justify-start   p-2">Poor</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieacquiredskill[1] }}
                </div>

                <div class=" justify-start p-2">Not Applicable</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iieacquiredskill[0] }}
                </div>

            </div>

            <template #footer>
                <!-- Content -->

            </template>
        </UCard>
    </USlideover>
    <!--slide over 3-->
    <USlideover v-model="isOpenIIEBehaviour" v-if="pieData">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div><strong>IIE Management</strong></div>
                    <div class="text-orange-500 px-1"><strong>|</strong></div>
                    <div class="text-green-500">analysis</div>
                </div>
            </template>
            <!-- Content -->
            <div class="border-b border-gray-300  pb-2 ">
                <apexchart width="425" type="donut" :options="{
                    labels: pieData.keys.iiebehaviour
                }" :series="pieData.values.iiebehaviour"></apexchart>
            </div>
            <div class="grid grid-cols-2">
                <div class=" justify-start border-b border-gray-300 p-2"><strong>Score Level</strong></div>
                <div class=" justify-end border-b border-gray-300 text-center p-2"><strong>Occurences/Count</strong></div>
                <div class=" justify-start  p-2">Competent</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iiebehaviour[3] }}
                </div>
                <div class=" justify-start  p-2">Moderate</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iiebehaviour[2] }}
                </div>

                <div class=" justify-start   p-2">Poor</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iiebehaviour[1] }}
                </div>

                <div class=" justify-start p-2">Not Applicable</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.iiebehaviour[0] }}
                </div>

            </div>

            <template #footer>
                <!-- Content -->

            </template>
        </UCard>
    </USlideover>
    <!--slidover-->
    <USlideover v-model="isOpenMngtKnowledge" v-if="pieData">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div><strong>Management of DM Knowledge</strong></div>
                    <div class="text-orange-500 px-1"><strong>|</strong></div>
                    <div class="text-green-500">analysis</div>
                </div>
            </template>
            <!-- Content -->
            <div class="border-b border-gray-300  pb-2 ">
                <apexchart width="425" type="donut" :options="{
                    labels: pieData.keys.mngtknowledge
                }" :series="pieData.values.mngtknowledge"></apexchart>
            </div>

            <div class="grid grid-cols-2">
                <div class=" justify-start border-b border-gray-300 p-2"><strong>Score Level</strong></div>
                <div class=" justify-end border-b border-gray-300 text-center p-2"><strong>Occurences/Count</strong></div>
                <div class=" justify-start  p-2">Competent</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtknowledge[3] }}
                </div>

                <div class=" justify-start  p-2">Moderate</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtknowledge[2] }}
                </div>
                <div class=" justify-start   p-2">Poor</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtknowledge[1] }}
                </div>
                <div class=" justify-start p-2">Not Applicable</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtknowledge[0] }}
                </div>
            </div>

            <template #footer>
                <!-- Content -->

            </template>
        </UCard>
    </USlideover>
    <!--slide over 2-->
    <USlideover v-model="isOpenMngtAcquiredSkill" v-if="pieData">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div><strong>Management of DM Acquired-Skill</strong></div>
                    <div class="text-orange-500 px-1"><strong>|</strong></div>
                    <div class="text-green-500">analysis</div>
                </div>
            </template>
            <!-- Content -->
            <div class="border-b border-gray-300  pb-2 ">
                <apexchart width="425" type="donut" :options="{
                    labels: pieData.keys.mngtacquiredskill
                }" :series="pieData.values.mngtacquiredskill"></apexchart>
            </div>
            <div class="grid grid-cols-2">
                <div class=" justify-start border-b border-gray-300 p-2"><strong>Score Level</strong></div>
                <div class=" justify-end border-b border-gray-300 text-center p-2"><strong>Occurences/Count</strong></div>
                <div class=" justify-start  p-2">Competent</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtacquiredskill[3] }}
                </div>
                <div class=" justify-start  p-2">Moderate</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtacquiredskill[2] }}
                </div>

                <div class=" justify-start   p-2">Poor</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtacquiredskill[1] }}
                </div>

                <div class=" justify-start p-2">Not Applicable</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtacquiredskill[0] }}
                </div>

            </div>

            <template #footer>
                <!-- Content -->

            </template>
        </UCard>
    </USlideover>
    <!--slide over 3-->
    <USlideover v-model="isOpenMngtBehaviour" v-if="pieData">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-800' }">
            <template #header>
                <!-- Content -->
                <div class="flex">
                    <div><strong>Management of DM Behaviour</strong></div>
                    <div class="text-orange-500 px-1"><strong>|</strong></div>
                    <div class="text-green-500">analysis</div>
                </div>
            </template>
            <!-- Content -->
            <div class="border-b border-gray-300  pb-2 ">
                <apexchart width="425" type="donut" :options="{
                    labels: pieData.keys.mngtbehaviour
                }" :series="pieData.values.mngtbehaviour"></apexchart>
            </div>
            <div class="grid grid-cols-2">
                <div class=" justify-start border-b border-gray-300 p-2"><strong>Score Level</strong></div>
                <div class=" justify-end border-b border-gray-300 text-center p-2"><strong>Occurences/Count</strong></div>
                <div class=" justify-start  p-2">Competent</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtbehaviour[3] }}
                </div>
                <div class=" justify-start  p-2">Moderate</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtbehaviour[2] }}
                </div>

                <div class=" justify-start   p-2">Poor</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtbehaviour[1] }}
                </div>

                <div class=" justify-start p-2">Not Applicable</div>
                <div class=" justify-end  text-center p-2">
                    {{ pieData.raw.mngtbehaviour[0] }}
                </div>

            </div>

            <template #footer>
                <!-- Content -->

            </template>
        </UCard>
    </USlideover>
</template>