<template>
  <div class="navbar">
    <div class="navbar__wrapper">
      <div class="navbar__progress">
        <div class="navbar__text">
          Готово:
          <span class="navbar__percent">{{ countProgress + "%" }}</span>
        </div>
        <div class="navbar__scale">
          <div
            class="navbar__scale-progress"
            :style="{ width: countProgress + '%' }"
          />
        </div>
      </div>
      <div class="navbar__buttons-wrapper">
        <button
          class="navbar__button navbar__button_previous"
          :class="{ navbar__button_disabled: !prev }"
          @click="$emit('question-previous')"
        >
          <img src="../../assets/images/arrow.svg" alt="" class="" />
        </button>
        <div class="navbar__wrapper-button">
          <button
            class="navbar__button"
            :class="{ navbar__button_disabled: !next }"
            @click="$emit('answer')"
          >
            <span v-if="!lastQuestion">Следующий вопрос</span>
            <span v-else>Последний шаг</span>
          </button>
          <span class="navbar__button-description"
            >или нажмите <b>Enter</b></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarBlock",
  props: {
    progress: {
      type: Number,
      default: null,
    },
    next: {
      type: Boolean,
      default: false,
    },
    prev: {
      type: Boolean,
      default: false,
    },
    lastQuestion: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["answer", "question-previous"],
  data() {
    return {
      countProgress: 0,
      interval: null,
    };
  },
  watch: {
    progress() {
      if (this.countProgress < this.progress) {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          this.countProgress += 1;
        }, 30);
      } else if (this.countProgress > this.progress) {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          this.countProgress -= 1;
        }, 30);
      }
    },
    countProgress() {
      if (this.countProgress === this.progress) {
        clearInterval(this.interval);
      }
    },
  },
  mounted() {
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 13 && this.next) {
        this.$emit("answer");
      }
    });
  },
  unmounted() {
    document.removeEventListener("keypress");
  },
};
</script>

<style lang="less">
@import "@/styles/vars.less";

.navbar {
  z-index: 5;

  &__wrapper {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: solid 1px #1a1a1a;

    @media @800m {
      justify-content: flex-end;
    }

    @media @mobile {
      justify-content: center;
    }
  }

  &__progress {
    flex: 1 1 auto;

    @media @800m {
      display: none;
    }
  }

  &__text {
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.7);
  }

  &__percent {
    margin-left: 10px;
    color: var(--color-main);
    font-size: 14px;
    font-weight: 700;
  }

  &__scale {
    position: relative;
    height: 6px;
    width: 100%;
    background-color: #262626;
    border-radius: 25px;
    overflow: hidden;
  }

  &__scale-progress {
    height: 100%;
    width: 0;
    transition: width 0.4s ease;
    background-color: var(--color-main);
  }

  &__buttons-wrapper {
    display: flex;
    align-items: center;

    @media @mobile {
      flex-direction: column-reverse;
    }
  }

  &__wrapper-button {
    position: relative;
    display: inline-block;
  }

  &__button-description {
    position: absolute;
    bottom: -17px;
    right: 3px;
    font-size: 11.5px;
    color: #595959;
    white-space: nowrap;

    @media @800m {
      display: none;
    }
  }

  &__button {
    height: 43px;
    margin-left: 20px;
    padding: 0 16px 0 22px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background-color: var(--color-main);
    border-radius: 24px;
    line-height: 1.3;
    cursor: pointer;

    &_previous {
      padding: 0;
      background-color: transparent;

      @media @mobile {
        margin-top: 10px;
      }
    }

    &_disabled {
      opacity: 0.8;
      cursor: default;
    }
  }
}
</style>
