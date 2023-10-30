
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

const props = defineProps({
  menu: Array<NxLink>,
  shadow: {
    type: Boolean,
    default: true
  },
  shadowOnChildren: {
    type: Boolean,
    default: true
  }
})

const nuxtIamMenu = [
  {
    name: "What is it?",
    link: "/iam/",
  },
  {
    name: "Introduction",
    link: "/iam/docs",
  },
  {
    name: "Getting Started",
    link: "/iam/docs/getting-started",
  },
  {
    name: "Concepts",
    link: "/iam/docs/concepts",
  },
  {
    name: "Features",
    link: "/iam/docs/features",
  },
  {
    name: "Front End",
    link: "/iam/docs/frontend",
  },
  {
    name: "Configuration",
    link: "/iam/docs/configuration",
  },
  {
    name: "Backend",
    link: "/iam/docs/backend",
  },
  {
    name: "Files",
    link: "/iam/docs/files",
  },
] as NxLinks;

const mainMenu = [
  {
    name: "LOGO",
    bold: true,
  },
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Nuxt IAM",
    children: nuxtIamMenu,
  },
  {
    name: "Sample",
    link: "/sample",
  },
  {
    name: "Protected Page",
    link: "/protected",
  },
  {
    name: "Contact",
    link: "/contact",
  },
] as NxLinks;

/**
 * @desc Receive clicked link from menu and navigate to that link
 * @param event Receive clicked link data
 */
function menuClicked(menuItem: NxLink) {
  if (menuItem.link) navigateTo(menuItem.link);
}

useHead({
  title: "Nuxt IAM Example Site",
});
</script>

<template>
  <div class="container">
    <NxNavbar :menu="mainMenu" @clicked="menuClicked" />
    <IamDashboardHeader class="iam-dashboard-header" />
    <div>
      <slot />
    </div>
    <IamFooter>
      <p>&copy; 2022 My Company, Inc</p>
    </IamFooter>
  </div>
</template>

<style scoped>
.nuxt-iam-logo {
  text-align: center;
}

.container {
  margin: 0 3rem;
  min-width: 360px;
}

.iam-dashboard-header {
  margin-bottom: 1.75rem;
}

@media (max-width: 525px) {
  .container {
    margin: 0 auto;
  }
}
</style>
