<template>
  <div
    class="answer"
    :class="{ answer_selected: selected }"
    @click="selected = !selected"
  >
    <div class="answer__wrapper">
      <div class="answer__radio" />
      <span class="answer__text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerBlock",
  props: {
    text: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: null,
    },
  },
  emits: ["selected"],
  data() {
    return {
      selected: false,
    };
  },
  watch: {
    selected(value) {
      if (value) {
        this.$emit("selected", this.index);
      }
    },
  },
};
</script>

<style lang="less">
@import "@/styles/vars.less";

.answer {
  display: flex;
  border-radius: 5px;
  border: solid 1px #1a1a1a;
  cursor: pointer;

  &__wrapper {
    padding: 13px 16px;
    display: flex;
    align-items: center;
  }

  &__radio {
    position: relative;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1a1a1a;
    border-radius: 50%;
    transition: border 0.3s ease;

    .answer_selected & {
      border: 1px solid var(--color-main);
    }

    &::before {
      content: "";
      position: absolute;
      width: 50%;
      height: 50%;
      background-color: var(--color-main);
      border-radius: 50%;
      transform: scale(0);
      transition: transform 0.3s ease;

      .answer_selected & {
        transform: scale(1);
      }
    }
  }

  &__text {
    display: block;
    padding-left: 16px;
  }
}
</style>
