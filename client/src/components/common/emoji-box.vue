<template>
  <div class="emoji-box">
    <ul class="emoji-list">
      <li 
        v-for="emj in emojiList" 
        :key="emj" 
        class="emoji-item" 
        @click="onClick(emj)"
      >
        {{ emj }}
      </li>
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
    }
  },
}
</script>

<style lang="scss">
.emoji-box {
  z-index: 999;
  width: 16.25rem;
  padding: .5rem;
  background-color: $white;
  border: 1px solid $color-border;
  border-radius: $radius;

  > .emoji-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    font-size: 1.3em;
    list-style: none;

    > .emoji-item {
      padding: 0 .4em;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, .12);
      }
    }
  }
}
</style>
