<template>
  <div
    class="page-main"
    :class="{ 'page-main_game': game, 'page-main_hero': hero }"
  >
    <CHero v-if="hero" @game="changePage" />
    <CGame v-else />
  </div>
</template>

<script>
import CHero from "../../components/CHero/CHero.vue";
import CGame from "../../components/CGame/CGame.vue";

export default {
  components: {
    CHero,
    CGame,
  },
  data() {
    return {
      game: false,
      hero: true,
    };
  },
  methods: {
    changePage() {
      this.game = true;

      setTimeout(() => {
        this.hero = false;
      }, 1300);
    },
  },
};
</script>

<style>
.page-main {
  position: relative;
  overflow: hidden;
}
</style>
