<template>
  <div class="base_select" :class="props.type == 'single' ? 'base_select--single' : ''">
    <div class="base_select__top" @click.prevent="isOpen = !isOpen">
      <span class="base_select__holder" :class="selectedPunkts.length !== 0 ? 'base_select__holder--active' : ''">
        Тип помещения
      </span>
      <span class="base_select__result" v-show="selectedPunkts.length !== 0">
        {{ selectedPunkts.map(el => el.text).join(", ") }}
      </span>

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        :class="isOpen ? 'swap' : ''">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M5.22953 7.20999C5.37279 7.07216 5.56491 6.99685 5.76367 7.0006C5.96243 7.00435 6.15157 7.08686 6.28953 7.22999L9.99953 11.168L13.7095 7.22999C13.777 7.15565 13.8586 7.0956 13.9497 7.0534C14.0408 7.01119 14.1394 6.9877 14.2397 6.98431C14.34 6.98093 14.44 6.99771 14.5337 7.03366C14.6274 7.06962 14.713 7.12402 14.7853 7.19365C14.8576 7.26327 14.9152 7.3467 14.9546 7.43899C14.9941 7.53127 15.0146 7.63055 15.015 7.73092C15.0154 7.83129 14.9957 7.93072 14.9569 8.02332C14.9182 8.11592 14.8613 8.1998 14.7895 8.26999L10.5395 12.77C10.4696 12.8426 10.3857 12.9003 10.2929 12.9398C10.2001 12.9792 10.1003 12.9995 9.99953 12.9995C9.89871 12.9995 9.79893 12.9792 9.70615 12.9398C9.61337 12.9003 9.52949 12.8426 9.45953 12.77L5.20953 8.26999C5.0717 8.12674 4.99638 7.93462 5.00013 7.73585C5.00388 7.53709 5.08639 7.34795 5.22953 7.20999Z"
          fill="#174B7C" />
      </svg>
    </div>
    <Transition name="showList">
      <div class="base_select__list" v-show="isOpen">
        <label class="base_select__item" v-for="item in props.dataList" :key="item.name">
          <input type="checkbox" @change="selectItem(item)" :name="item.name"
            :checked="selectedPunkts.indexOf(item) !== -1"
            :disabled="props.type === 'single' && selectedPunkts.indexOf(item) !== -1">
          <span></span>
          <span>{{ item.text }}</span>
        </label>
      </div>
    </Transition>

    <span class="base_select__error" v-show="error">{{ props.error }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['type', 'holder', 'error', 'dataList'])
const isOpen = ref(false);
const selectedPunkts = ref([]);
const emit = defineEmits(['change'])

function selectItem(item) {
  isOpen.value = false;
  if (props.type === 'single') {
    selectedPunkts.value = [];
    selectedPunkts.value.push(item);
    emit('change', selectedPunkts.value);
    return
  }

  if (selectedPunkts.value.indexOf(item) === -1) {
    selectedPunkts.value.push(item);
  }
  else {
    selectedPunkts.value = selectedPunkts.value.filter(el => el.name !== item.name);
  }
  emit('change', selectedPunkts.value);
}
</script>


<style lang="sass">
.base_select
  position: relative
  width: 100%
  display: flex
  border: 2px solid #F7F8F8
  height: 64px
  margin-bottom: 20px
  border-radius: 6px
  &--single
    .base_select__item
      input
        &+span
          border-radius: 50%
          &::after
            border-radius: 50%
  &__top
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
    cursor: pointer
    position: relative
    padding: 10.5px 18px
    &>svg
      margin-left: auto
      transition: transform 0.3s
      &.swap
        transform: scale(1, -1)
  &__result
    align-self: flex-end
    color: #174B7C
    width: 100%
    outline: none
    font-size: 18px
    line-height: 110%
    font-weight: 500
    font-family: 'Montserrat', sans-serif
    white-space: nowrap
    overflow: hidden
  &__holder
    position: absolute
    left: 18px
    top: calc(50% - 0.5em)
    font-weight: 300
    color: #174B7C
    pointer-events: none
    font-size: 14px
    line-height: 15.4px
    transition: top 0.2s
    &--active
      top: 7px
  &__list
    display: flex
    flex-direction: column
    position: absolute
    top: 100%
    left: 0
    gap: 10px
    background: #fff
    border-radius: 10px
    border: 2px solid #174B7C
    width: 100%
    padding: 10px
    z-index: 2
    font-size: 16px
  &__item
    display: flex
    align-items: center
    gap: 10px
    padding: 10px 15px
    transition: background 0.3s
    border-radius: 6px
    cursor: pointer
    &:hover
      background: #174B7C3A
    input
      display: none
      &+span
        border: 2px solid #174B7C
        border-radius: 4px
        display: flex
        justify-content: center
        align-items: center
        width: 1.1em
        height: 1.1em
        flex-shrink: 0
        &::after
          content: ""
          width: 80%
          height: 80%
          background: transparent
          transition: background 0.3s
          border-radius: 1px
      &:checked+span
        &::after
          background: #174B7C
  &__error
    position: absolute
    top: 0px
    transform: translateY(calc(-100% - 5px))
    right: 8px
    font-size: 11px
    color: red


.showList-enter-active,
.showList-leave-active
  transition: opacity 0.3s ease

.showList-enter-from,
.showList-leave-to
  opacity: 0

</style>
