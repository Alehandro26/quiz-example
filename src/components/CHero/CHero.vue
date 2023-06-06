<template>
  <div class="hero">
    <div class="hero__image" :style="`background-image: url(${data.image})`" />
    <div class="hero__content">
      <header class="hero__header">
        <img :src="data.logo" class="hero__header-image" />
      </header>

      <div class="hero__body">
        <h1 class="hero__title">
          Ответьте на {{ test.length }} {{ question }}
        </h1>
        <p class="hero__description" v-html="data.description" />
        <button class="hero__button" @click="$emit('game')">Начнём</button>
        <div class="hero__bonuses">
          <h3 class="hero__bonuses-title">Бонусы после прохождения теста</h3>
          <div class="hero__bonuses-content">
            <CBonus
              v-for="(bonus, index) in bonuses"
              :key="index"
              :text="bonus.text"
              :image="bonus.image"
              class="hero__bonus"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="hero__background" />
    <footer class="hero__footer">
      <p class="hero__footer-text">
        {{ data.disclaimer }}
      </p>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CBonus from "../CBonus/CBonus.vue";

export default {
  components: {
    CBonus,
  },
  data() {
    return {
      questionWords: ["вопрос", "вопроса", "вопросов"],
      question: "",
    };
  },
  computed: {
    ...mapState(["data"]),
    ...mapGetters({
      bonuses: "bonuses",
      test: "test",
    }),
  },
  mounted() {
    this.declOfNum(this.test.length, this.questionWords);
  },
  methods: {
    declOfNum(number, words) {
      this.question =
        words[
          number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
        ];
    },
  },
};
</script>

<style lang="less">
@import "@/styles/vars.less";

.hero {
  position: relative;
  display: flex;
  justify-content: flex-end;
  min-height: 100vh;

  @media @tablet {
    flex-direction: column;
    justify-content: flex-start;
  }

  &__image {
    position: absolute;
    width: 59%;
    left: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.9s ease-in;

    @media @tablet {
      position: static;
      width: 100%;
      height: 220px;
      bottom: auto;
    }

    .page-main_game & {
      @media @tablet {
        transform: translateY(-100%);
      }
    }
  }

  &__background {
    position: absolute;
    top: 0;
    right: 0;
    width: 41%;
    height: 100vh;
    background-color: rgb(0, 0, 0);
    transition: width 1s ease;

    .page-main_game & {
      width: 100%;
    }

    @media @tablet {
      display: none;
    }
  }

  &__content {
    position: relative;
    z-index: 5;
    top: 0;
    padding: 160px 32px;
    width: 41%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media @tablet {
      position: static;
      width: 100%;
      padding: 16px 32px 160px;
      min-height: auto;
    }

    @media @mobile {
      padding: 0 32px 120px;
    }
  }

  &__header {
    width: 100%;
    position: absolute;
    z-index: 10;
    right: 0;
    top: 0;
    padding: 16px 32px;
    border-bottom: solid 1px #1a1a1a;
    background: #000;
    transition: transform 1s ease-in, opacity 0.8s ease;

    @media @tablet {
      position: static;
      padding-left: 0;
    }

    .page-main_game & {
      transform: translateY(-80px);
      opacity: 0;
    }
  }

  &__header-image {
    height: 37px;

    @media @tablet {
      height: 30px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;

    @media @desktop-only {
      margin-bottom: 48px;
    }
  }

  &__title {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;

    @media @tablet {
      margin-top: 10px;
    }

    @media @mobile {
      font-size: 26px;
    }

    .page-main_game & {
      animation: translateRight 0.8s forwards ease-in;

      @media @tablet {
        animation: translateLeft 1s forwards ease-in;
      }
    }
  }

  &__description {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.33;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 16px;

    @media @mobile {
      font-size: 16px;
    }

    .page-main_game & {
      animation: translateRight 0.9s forwards ease-in;

      @media @tablet {
        animation: translateLeft 1.1s forwards ease-in;
      }
    }
  }

  &__button {
    position: relative;
    overflow: hidden;
    padding: 12px 30px;
    width: fit-content;
    min-height: 55px;
    overflow: hidden;
    font-size: 18px;
    line-height: 1.3rem;
    border: none;
    border-radius: 40px;
    color: #fff;
    background: var(--color-main);
    box-shadow: 0 1px 4px 0 rgba(255, 85, 0, 0.2);
    cursor: pointer;
    transition: background 0.3 ease;

    @media @mobile {
      width: 100%;
    }

    .page-main_game & {
      animation: translateRight 1s forwards ease-in;

      @media @tablet {
        animation: translateLeft 1s forwards ease-in;
      }
    }

    &:hover {
      background: #ed0707;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      background: linear-gradient(90deg, hsla(0, 0%, 100%, 0.1) 10%, hsla(0, 0%, 100%, 0.2) 20%, hsla(0, 0%, 100%, 0.6));
      width: 20px;
      transform: skewX(-45deg);
      left: -30%;
      animation: blick 4s infinite;
    }
  }

  &__bonuses {
    margin-top: 40px;
  }

  &__bonuses-title {
    margin-bottom: 8px;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 700;
    line-height: 2.4;
    letter-spacing: 1px;

    .page-main_game & {
      animation: translateRight 1.1s forwards ease-in;

      @media @tablet {
        animation: translateLeft 1.1s forwards ease-in;
      }
    }
  }

  &__bonuses-content {
    display: flex;

    @media @mobile {
      flex-direction: column;
    }

    .page-main_game & {
      animation: translateRight 1.2s forwards ease-in;

      @media @tablet {
        animation: translateLeft 1.2s forwards ease-in;
      }
    }
  }

  &__bonus {
    &:first-child {
      margin-right: 15px;

      @media @mobile {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }

  &__footer {
    padding: 16px 32px 32px;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 41%;
    transition: transform 1s ease-in;

    .page-main_game & {
      transform: translateY(100px);
    }

    @media @tablet {
      width: 100%;
    }
  }

  &__footer-text {
    font-size: 10px;
    font-weight: 500;
    line-height: 1.4;
    text-align: left;
    color: rgba(255, 255, 255, 0.7);

    @media @tablet {
      text-align: center;
    }
  }
}

@keyframes translateRight {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(80px);
    opacity: 0;
  }
}

@keyframes translateLeft {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-80px);
    opacity: 0;
  }
}

@keyframes blick {
  from {
    left: -30%;
  }

  to {
    left: 130%;
  }
}
</style>
