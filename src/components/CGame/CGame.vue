<template>
  <div class="game" :style="{'background-image': `url(${data.imageGame})`}">
    <div class="game__background"/>

    <div class="game__wrapper">
      <div class="game__questions">
        <h2 class="game__title">{{ survey.question }}</h2>
        <div ref="widthAnswers" class="game__answers">
          <CAnswer
            v-for="(answer, index) in survey.answers"
            :key="index"
            ref="answers"
            :text="answer"
            :index="index"
            :style="getWidthAnswer"
            class="game__answer"
            @selected="selectedAnswer"
          />
        </div>
        <CNavbar
          ref="navbar"
          class="game__navbar"
          :progress="progress"
          :prev="checkPreviousQuestion"
          :next="checkButtonNext"
          :last-question="lastQuestion"
          @answer="nextQuestion"
          @question-previous="previousQuestion"
        />
      </div>
      <div class="game__sidebar">
        <CBonus
          v-for="(bonus, index) in bonuses"
          :key="index"
          :text="bonus.text"
          :image="bonus.image"
          class="game__bonus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CBonus from "../CBonus/CBonus.vue";
import CAnswer from "../CAnswer/CAnswer.vue";
import CNavbar from "../CNavbar/CNavbar.vue";

export default {
  components: {
    CBonus,
    CAnswer,
    CNavbar,
  },
  data() {
    return {
      numberQuestion: 0,
      pageMounted: false,
      progressFull: false,
      getWidthAnswer: "",
      checkSelected: false,
    };
  },
  computed: {
    ...mapState(["data"]),
    ...mapGetters({
      bonuses: "bonuses",
      test: "test",
    }),
    survey() {
      return this.test[this.numberQuestion];
    },

    progress() {
      if (this.progressFull) {
        return 100;
      }
      return Math.round((100 / this.test.length) * this.numberQuestion);
    },
    checkNextQuestion() {
      return this.test.length - 1 > this.numberQuestion && this.checkSelected;
    },
    checkPreviousQuestion() {
      return this.numberQuestion > 0 && !this.progressFull;
    },
    lastQuestion() {
      return this.test.length - 1 === this.numberQuestion;
    },
    checkRedirect() {
      return this.lastQuestion && this.checkSelected;
    },
    checkButtonNext() {
      return (
        !!(this.checkNextQuestion || this.checkRedirect) && !this.progressFull
      );
    },
  },
  mounted() {
    this.pageMounted = true;
    this.widthAnswer();
    window.addEventListener("resize", this.widthAnswer);
  },
  unmounted() {
    window.removeEventListener("resize", this.widthAnswer);
  },
  methods: {
    widthAnswer() {
      this.getWidthAnswer = `width: ${
        (this.$refs.widthAnswers.clientWidth - 14) / 2
      }px`;
    },
    selectedAnswer(selectedIndex) {
      this.$refs.answers.forEach((answer, index) => {
        if (index !== selectedIndex) {
          answer.selected = false;
        }
      });
      this.checkSelected = true;
    },
    nextQuestion() {
      if (this.checkRedirect) {
        this.progressFull = true;
        setTimeout(() => window.open(this.data.link, "_self"), 1000);
      }

      if (this.checkNextQuestion) {
        this.numberQuestion += 1;
        this.deleteAnswers();
      }
    },
    previousQuestion() {
      if (this.checkPreviousQuestion && !this.progressFull) {
        this.numberQuestion -= 1;
        this.deleteAnswers();
      }
    },
    deleteAnswers() {
      this.$refs.answers.forEach((answer) => {
        answer.selected = false;
      });
      this.checkSelected = false;
    },
  },
};
</script>

<style lang="less">
@import "@/styles/vars.less";

.game {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: inGame 1s;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
  }

  &__wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1024px;
    min-height: 570px;
    display: flex;
    background-color: rgb(0, 0, 0);
    box-shadow: 0 7px 15px 0 rgb(0 0 0 / 15%);
    border-radius: 4px;
    border: 5px solid #121212;

    @media @tablet {
      max-width: none;
      height: 100vh;
    }
  }

  &__questions {
    position: relative;
    padding: 30px 30px 95px;
    flex: 1 0;
  }

  &__title {
    padding-bottom: 11px;
    font-size: 28px;
    line-height: 120%;
    font-weight: 500;
  }

  &__answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__answer {
    margin-bottom: 16px;

    @media @mobile {
      width: 100% !important;
    }
  }

  &__navbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &__sidebar {
    width: 260px;
    padding: 30px 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media @800m {
      position: absolute;
      bottom: 30px;
      left: 30px;
      flex-direction: row;
    }

    @media @mobile {
      bottom: 16px;
      left: 0;
    }
  }

  &__bonus {
    &:not(:last-child) {
      margin-bottom: 15px;

      @media @800m {
        margin-bottom: 0;
        margin-right: 10px;
      }
    }
  }
}

@keyframes inGame {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
