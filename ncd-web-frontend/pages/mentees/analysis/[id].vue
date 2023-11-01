<script setup lang="ts">
import { useEvaluationsStore } from '../../../stores/evaluations';
import { useAsyncState } from '@vueuse/core';
import { sortBy, countBy } from 'lodash';
import { format } from 'date-fns'
import { mean, mode, standardDeviation, sampleSkewness } from 'simple-statistics'

const route = useRoute()

const perc = ref(false)

const menteeId = route.params.id;

const evaluationsStore = useEvaluationsStore();

const menteeData = useAsyncState(async () => {
    return await evaluationsStore.getMenteeEvals(menteeId);
}, undefined);

const mentee: any = menteeData.state

//
const getTableData = async () => {
    return menteeData.then((resp) => {
        const state: any = resp.state.value
        let vm: any[] = [];

        for (var i = 0; i < state.length; i++) {
            vm.push({
                id: state[i]._id,
                meanScore: state[i].scoreStats.totalaverageScore,
                evalDate: state[i].info.evaluationDate,
                evaluator: state[i].info.evaluatorInfo[0].firstname + " " + state[i].info.evaluatorInfo[0].surname,
                niceDate: format(new Date(state[i].info.evaluationDate), 'dd-MMM-yyyy')

            });
        }


        const sorted = sortBy(vm, ['evalDate'])

        return sorted.reverse()

    })
}

const getTableD = useAsyncState(async () => {
    return getTableData();
}, []);

const tableData: any = getTableD.state

//table columns

const columns = [

    {
        key: 'niceDate',
        label: 'Date of Evaluation'
    },
    {
        key: 'evaluator',
        label: 'Evaluator'
    },
    {
        key: 'meanScore',
        label: 'Mean Score',
    },
    {
        key: 'actions',
        label: 'View'
    }
]

const page = ref(1)
const pageCount = 5

const getRows = (data: any) => {

    return data.slice((page.value - 1) * pageCount, (page.value) * pageCount)

}

// const page = ref(1)
// const pageCount = 5
// const rows = tableData.slice((page.value - 1) * pageCount, (page.value) * pageCount)

const items = (row: { id: any; }) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => console.log('Edit', row.id)
        }
    ]
]


//charts
/// chart 1 : Bar

const chartOptions = (data: any) => {

    let vm: any[] = [];

    const newData = data.reverse()

    for (var i = 0; i < newData.length; i++) {
        vm.push(newData[i].niceDate)
    }

    return {
        xaxis: {
            categories: vm,
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        toolbar: {
            show: true
        }

    }

};


const series = (data: any) => {
    let vm: any[] = [];

    const newData = data

    for (var i = 0; i < newData.length; i++) {
        vm.push(newData[i].meanScore)
    }

    const floats = vm.map(function (el) {
        return parseFloat(el);
    });

    return [
        {
            name: "Mean Scores",
            data: floats,
        },
    ];
}

//chart 2: line graphs

const getChartData = async () => {
    return menteeData.then((resp) => {
        const state: any = resp.state.value
        let vm: any[] = [];
        let lbl: any[] = [];

        for (var i = 0; i < state.length; i++) {
            vm.push({
                name: format(new Date(state[i].info.evaluationDate), 'dd-MMM-yyyy'),
                data: Object.values(state[i].scores[0]).map((el: any) => {
                    return parseInt(el)
                })
            });

            lbl = Object.keys(state[i].scores[0])
        }

        const series = sortBy(vm, ['evalDate'])

        return {
            series: series,
            options: {
                chart: {
                    height: 500,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: true
                    }
                },
                //colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f6f6f6', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                annotations: {
                    xaxis: [{
                        x: 'dmQ1',
                        strokeDashArray: 0,
                        borderColor: '#775DD0',
                        label: {
                            borderColor: '#775DD0',
                            style: {
                                color: '#fff',
                                background: '#775DD0',
                            },
                            text: 'IIE-Knowledge',
                        }
                    },
                    {
                        x: 'dmQ8',
                        strokeDashArray: 0,
                        borderColor: '#775DD0',
                        label: {
                            borderColor: '#775DD0',
                            style: {
                                color: '#fff',
                                background: '#775DD0',
                            },
                            text: 'IIE-Acquired Skill',
                        }
                    },
                    {
                        x: 'dmQ11',
                        strokeDashArray: 0,
                        borderColor: '#775DD0',
                        label: {
                            borderColor: '#775DD0',
                            style: {
                                color: '#fff',
                                background: '#775DD0',
                            },
                            text: 'IIE-Behaviour',
                        }
                    },
                    {
                        x: 'dmQ14',
                        strokeDashArray: 0,
                        borderColor: '#740001',
                        label: {
                            borderColor: '#740001',
                            style: {
                                color: '#fff',
                                background: '#740001',
                            },
                            text: 'Mngt-Knowledge',
                        }
                    },
                    {
                        x: 'dmQ23',
                        strokeDashArray: 0,
                        borderColor: '#740001',
                        label: {
                            borderColor: '#740001',
                            style: {
                                color: '#fff',
                                background: '#740001',
                            },
                            text: 'Mngt-Acquired Skill',
                        }
                    },
                    {
                        x: 'dmQ29',
                        strokeDashArray: 0,
                        borderColor: '#740001',
                        label: {
                            borderColor: '#740001',
                            style: {
                                color: '#fff',
                                background: '#740001',
                            },
                            text: 'Mngt-Behaviour',
                        }
                    }
                    ]
                },
                xaxis: {
                    categories: lbl,
                    title: {
                        text: 'Evaluation Items'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Scores'
                    },
                    min: 0,
                    max: 4
                },
                onItemClick: {
                    toggleDataSeries: true
                }
                // colors: ['#77B6EA', '#545454'],
            }
        }

    })
}

const getChartD = useAsyncState(async () => {
    return getChartData();
}, undefined);

const chartData: any = getChartD.state

// Chart 3
const flatScores = async () => {
    return menteeData.then((resp) => {
        const state: any = resp.state.value
        let vm: any[] = [];
        let lbl: any[] = [];

        for (var i = 0; i < state.length; i++) {

            vm.push({
                name: format(new Date(state[i].info.evaluationDate), 'dd-MMM-yyyy'),
                data: countBy(Object.values(state[i].scores[0]).map((el: any) => {
                    return parseInt(el)
                }))
            });

            lbl = Object.keys(state[i].scores[0])
        }

        const series = sortBy(vm, ['evalDate'])

        let vm2: any[] = [];
        let names = ['Not Applicable', 'Poor', 'Moderate', 'Competent'];
        let timeNames = []

        for (var i = 0; i < names.length; i++) {
            vm2.push({
                name: names[i],
                data: series.map((el: any) => {
                    if (el.data[i]) {
                        return el.data[i]
                    } else {
                        return 0
                    }

                })
            });
        }

        for (var i = 0; i < series.length; i++) {
            timeNames.push(series[i].name)
        }
        //const modified = 

        return {
            series: vm2,
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    stackType: false,  ///apa
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                }, responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }], plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 10,
                        dataLabels: {
                            total: {
                                enabled: true, //apa
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        }
                    },
                },
                xaxis: {
                    type: 'date',
                    categories: timeNames,
                },
                // legend: {
                //     position: 'right',
                //     offsetY: 40
                // },
                fill: {
                    opacity: 1
                },
                //colors:['grey','red','yellow','blue']
            }
        }
    })
}

const scoreArrays = useAsyncState(async () => {
    return flatScores();
}, undefined);

const getflatScores = scoreArrays.state

// Chart 3.2
const flatScoresPerc = async () => {
    return menteeData.then((resp) => {
        const state: any = resp.state.value
        let vm: any[] = [];
        let lbl: any[] = [];

        for (var i = 0; i < state.length; i++) {

            vm.push({
                name: format(new Date(state[i].info.evaluationDate), 'dd-MMM-yyyy'),
                data: countBy(Object.values(state[i].scores[0]).map((el: any) => {
                    return parseInt(el)
                }))
            });

            lbl = Object.keys(state[i].scores[0])
        }

        const series = sortBy(vm, ['evalDate'])

        let vm2: any[] = [];
        let names = ['Not Applicable', 'Poor', 'Moderate', 'Competent'];
        let timeNames = []

        for (var i = 0; i < names.length; i++) {
            vm2.push({
                name: names[i],
                data: series.map((el: any) => {
                    if (el.data[i]) {
                        return el.data[i]
                    } else {
                        return 0
                    }

                })
            });
        }

        for (var i = 0; i < series.length; i++) {
            timeNames.push(series[i].name)
        }
        //const modified = 

        return {
            series: vm2,
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    stackType: '100%',  ///apa
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                }, responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }], plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 10,
                        dataLabels: {
                            total: {
                                enabled: false, //apa
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        },
                    },

                },
                xaxis: {
                    type: 'date',
                    categories: timeNames,
                },
                // legend: {
                //     position: 'right',
                //     offsetY: 40
                // },
                fill: {
                    opacity: 1
                },
                // colors:['cyan','red','yellow','blue']
            }
        }
    })
}
const scorePercArrays = useAsyncState(async () => {
    return flatScoresPerc();
}, undefined);

const getflatPercScores = scorePercArrays.state

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
                <NuxtLink :to="{
                    name: 'mentees-id',
                    params: { id: menteeId }
                }">
                    <p class="p-1 hover:text-green-500">Mentees Stats</p>
                </NuxtLink>
                <p>|</p>
                <p class="p-1 text-orange-500 border-b-2 border-green-500"><strong>Mentee Analysis</strong></p>
            </div>

        </nav>
    </header>

    <div v-if="mentee">
        <UContainer>
            <div class="my-12 pl-6 py-3" v-if="mentee">
                <strong><span class="text-green-500 text-2xl p-1">{{ mentee[0].info.menteeInfo[0].firstname
                }}</span></strong>|<span class="text-orange-500 p-1">{{
    (mentee[0].info.menteeInfo[0].lastname).toLowerCase() }}</span>
            </div>

            <UCard class="mx-auto">
                <template #header>
                    <div class="text-orange-500 text-sm my-2"><strong>List of Evaluations</strong></div>
                    <div class="text-sm">Below is a list of all the evaluations for <span class="italic bold"> {{ mentee[0].info.menteeInfo[0].firstname
                }} {{ mentee[0].info.menteeInfo[0].lastname
                }}</span>. To see a report on an evaluation, click the evaluation report button. </div>
                </template>
                <div>
                    <UTable :columns=columns :rows="getRows(tableData)">
                        <template #empty-state>
                            <div class="flex flex-col items-center justify-center py-6 gap-3">
                                <span class="italic text-sm">No one here!</span>
                                <UButton label="Add people" />
                            </div>
                        </template>
                        <template #actions-data="{ row }">
                            <NuxtLink :to="{ name: 'mentees-scores-scoreid', params: { scoreid: row.id } }">
                                <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="primary"
                                    square variant="outline">
                                    Eval report | <span class=" text-red-500">view</span></UButton>
                            </NuxtLink>

                        </template>
                    </UTable>
                    <UPagination v-model="page" :page-count="pageCount" :total="tableData.length" />
                </div>
            </UCard>
            <!-- chart 1-->

            <UCard class="pt-5 mx-auto my-5">
                <template #header>
                    <div class="text-sm text-orange-500 my-2"><strong>Bar Chart for Mean Scores</strong></div>
                    <div class="text-sm">Each evaluation that <span class="italic bold"> {{ mentee[0].info.menteeInfo[0].firstname
                }} {{ mentee[0].info.menteeInfo[0].lastname
                }}</span> completed has its mean score calculated over the 29 evaluation items. Below is a bar chart which gives a visual representation of the mean scores over time. </div>
                </template>
                <div class="w-full border-solid hover:border-dotted border-black" v-if="tableData">
                    <apexchart class="pr-3" width="1200" height="400" type="bar" :options="chartOptions(tableData)"
                        :series="series(tableData)">
                    </apexchart>
                </div>
            </UCard>

            <!-- chart 2 -->

            <UCard class="pt-5 mx-auto my-5">
                <template #header>
                    <div class="text-sm text-orange-500 my-2"><strong>Line Chart Comparison of Scores</strong></div>
                    <div class="text-sm">Each evaluation that <span class="italic bold"> {{ mentee[0].info.menteeInfo[0].firstname
                }} {{ mentee[0].info.menteeInfo[0].lastname
                }}</span> completed has 29 evaluation items. Below is a line chart which gives a visual representation of hpw the mentee faired on each question. The graph is interactive, you can select and deselect the dates which you want to analyse. </div>
                </template>
                <div class="w-full border-solid hover:border-dotted border-black" v-if="chartData">
                    <apexchart width="1200" height="500" type="line" :options="chartData.options"
                        :series="chartData.series">
                    </apexchart>
                </div>
            </UCard>

            <!-- chart 3 -->

            <UCard class="pt-5 mx-auto my-5">
                <template #header>
                    <div class="grid grid-cols-2 ">
                        <div class="left-0 text-sm text-orange-500 ">
                            <strong>Score Break Down:</strong>
                        </div>
                        <div class="">
                            <div class="" v-show="!perc">
                                <UButton @click="perc = !perc" color="purple" variant="outline"> View in %</UButton>
                            </div>
                            <div class="" v-show="perc">
                                <UButton @click="perc = !perc" color="green" variant="outline"> View in Scores</UButton>
                            </div>
                        </div>

                    </div>
                    <div class="text-sm">The graph below shows score counts for each evaluation session. To toggle between percentages and counts click the button above.</div>
                </template>
                <div v-show="!perc">
                    <div class="w-full border-solid hover:border-dotted border-black" v-if="getflatScores">
                        <apexchart width="1200" height="500" type="bar" :options="getflatScores.options"
                            :series="getflatScores.series">
                        </apexchart>
                    </div>
                </div>
                <div>
                    <div v-show="perc" class="w-full border-solid hover:border-dotted border-black"
                        v-if="getflatPercScores">
                        <apexchart width="1200" height="500" type="bar" :options="getflatPercScores.options"
                            :series="getflatPercScores.series">
                        </apexchart>
                    </div>
                </div>

            </UCard>

        </UContainer>


    </div>
</template>