<script setup lang="ts">

type NxLink = {
  name: string;
  link?: string;
  disabled?: boolean;
  show?: boolean;
  hasBorder?: boolean;
  showChildren?: boolean;
  children?: any;
  bold?: boolean;
  group?: string;
};

type NxLinks = Array<NxLink>;

const emit = defineEmits(["clicked"])

const props = defineProps({
  menu: Array<NxLink>,
  position: {
    type: Number,
    default: 0,
  }
})

const showMenu = ref(false)

/**
 * Sets showMenu to opposite of given value
 * @param value Boolean value
 */
function toggleShowMenu(value: boolean) {
  showMenu.value = !value
}

/**
 * @desc Receives clicked menu item and emits it
 * @param menuItem Clicked menu item from menu
 */
function menuClicked(menuItem: NxLink) {
  emit('clicked', menuItem)
}
</script>

<template>
  <div class="slot">
    <span @click="toggleShowMenu(showMenu)">
      <slot />
    </span>
    <div class=" menu" :style="`left: ${props.position}%`">
      <NxMenu v-if="showMenu" :menu="props.menu" class="menu" @clicked="menuClicked"/>
    </div>
  </div>
</template>


<style scoped>
.slot {
  position: relative;
  max-width: max-content;
}

.menu {
  position: absolute;
}
</style>