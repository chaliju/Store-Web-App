<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;

  border-radius: 50%;
  display: flex;
  /* margin: auto 5px; */
  align-items: center;
  justify-content: center;
  border: 2px solid #aaa;
  color: white;
}

.check-button img {
    display: inline-block;
  }

.check {
  background-color: var(--color-high-text);
  border: 2px solid var(--color-high-text);
}
</style>