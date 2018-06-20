<template>
  <div class="emoji-box">
    <ul class="emoji-list">
      <li class="emoji-item" :key="emj" v-for="emj in emojiList" @click="onClick(emj)">{{emj}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    onClick: Function,
  },

  data() {
    return {
      emojiList: [
        '😃',
        '😂',
        '😅',
        '😉',
        '😌',
        '😔',
        '😓',
        '😘',
        '😡',
        '😭',
        '😱',
        '😳',
        '😵',
        '🌚',
        '👍',
        '👎',
        '💪',
        '🌹',
        '💊',
        '🇨🇳',
        '🇺🇸',
      ],
    };
  },
};
</script>

<style lang="scss">
.emoji-box {
  width: 16.25rem;
  padding: 0.5rem;
  background-color: $white;
  z-index: 999;
  border: 1px solid $color-border;
  border-radius: $radius;

  > .emoji-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.3em;
    display: flex;
    flex-wrap: wrap;

    > .emoji-item {
      padding: 0 0.4em;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.12);
      }
    }
  }
}
</style>
