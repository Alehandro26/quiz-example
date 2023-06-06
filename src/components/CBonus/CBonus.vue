<template>
  <div class="bonus">
    <img :src="image" class="bonus__image" />
    <span class="bonus__text" v-html="text" />
    <img src="../../assets/images/lock.svg" alt="X" class="bonus__lock" />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less">
@import "@/styles/vars.less";

.bonus {
  position: relative;
  width: 193px;
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #dbdada;
  border-radius: 5px;
  cursor: not-allowed;

  .game__sidebar & {
    width: 100%;

    @media @800m {
      justify-content: center;
      width: 40px;
      min-height: 40px;
    }
  }

  &__image {
    padding: 0 8px;
    height: 30px;
    width: auto;

    .game__sidebar & {
      @media @800m {
        padding: 0;
        height: 29px;
      }
    }
  }

  &__text {
    padding-right: 9%;
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #69748c;
    text-align: right;

    .game__sidebar & {
      @media @800m {
        display: none;
      }
    }
  }

  &__lock {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(40%, -40%);
  }
}
</style>
