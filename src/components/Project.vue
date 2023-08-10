<template>
  <div class="container" :class="{ 'desktop' : isDesktop, 'tablet' : isTablet, 'mobile' : isMobile }">
    <div class="breadcrumb-container">
      <Breadcrumb :items="items" ref="breadcrumb" />
    </div>
    <div class="content-container">
      <!--<router-view v-slot="{ Component }">
        <transition name="slide-page">
          <component :is="Component" />
        </transition>
      </router-view>-->
      <router-view @back="handleBack" @next="handleNext" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { findIndex } from "core-js/internals/array-iteration";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Project",
  inject: ["isDesktop", "isTablet", "isMobile"],
  components: {
    Breadcrumb
  },
  data() {
    let fullPath = '/' + this.$route.path.split("/")[1] + "/project";
    return {
      items: [
        {
          text: "Research Details",
          to: fullPath + "/research-details",
          active: false,
          warning: false,
        },
        {
          text: "Research Team, Collaborators, Referees",
          to: fullPath + "/placeholder",
          active: false,
          warning: false,
        },
        {
          text: "Research Milestone",
          to: fullPath + "/research-milestone",
          active: false,
          warning: false,
        },
        {
          text: "Budget",
          to: "/",
          active: false,
          warning: false,
        },
        {
          text: "Declaration of Ethics Approval",
          to: "/",
          active: false,
          warning: false,
        },
        {
          text: "Other Attachments",
          to: "/",
          active: false,
          warning: false,
        }
      ]
    };
  },
  methods: {
    handleBack(result) {
      const index = findIndex(this.items, (item) => item.to === this.$route.path);
      this.items[index].active = result;
      this.items[index].warning = !result;
      this.$refs.breadcrumb.goBack();
    },
    handleNext(result) {
      const index = findIndex(this.items, (item) => item.to === this.$route.path);
      this.items[index].active = result;
      this.items[index].warning = !result;
      this.$refs.breadcrumb.goNext();
    }
  }
}
</script>

<style scoped>
div.container {
  display: flex;
  position: relative;
  flex-direction: column;
}

div.container.desktop {
  flex-direction: row;
}

.breadcrumb-container {
  flex: 0 0 auto; /* Don't grow, don't shrink, fixed width */
  margin-top: 1em;
}

div.container.desktop .breadcrumb-container {
  width: 250px;
}

div.container.mobile .breadcrumb-container {
  margin: auto;
}

.content-container {
  flex: 1; /* Grow to fill remaining space */
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  justify-content: center;
  align-items: center;
}
</style>