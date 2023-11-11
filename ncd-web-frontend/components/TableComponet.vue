<script setup lang="ts">
const props = defineProps({
    rows: {
        type: Array<any>,
        required: true
    },
    columns: {
        type: Array<any>,
        required: true
    }
})

const q = ref('')
const page = ref(1)
const pageCount = 5


const items = (row: { id: any; }) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => console.log('Edit', row.id)
        }
    ]
]


</script>
<template>

    <UTable :columns="props.columns" :rows="props.rows">
        <template #empty-state>
            <div class="flex flex-col items-center justify-center py-6 gap-3">
                <span class="italic text-sm">No one here!</span>
                <UButton label="Add people" />
            </div>
        </template>
        <template #actions-data="{ row }">
            <NuxtLink :to="{ name: 'mentees-evaluations-scoreid', params: { scoreid: row.scoreId } }">
                <UButton :items="items(row)" icon="i-heroicons-pencil-square" size="sm" color="primary" square
                    variant="outline">
                    Eval report | <span class=" text-red-500">view</span></UButton>
            </NuxtLink>

        </template>
    </UTable>
    <UPagination v-model="page" :page-count="pageCount" :total="rows.length" />
</template>