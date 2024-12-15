<template>
  <label class="input">
    <input class="input__folder" @change="model = model.replaceAll(/\s+/g, ' ')" @input="maskInput" :type="type"
      placeholder="" v-model="model">
    <span class="input__holder">{{ props.holder }}</span>
    <span class="input__error" v-show="props.error">{{ props.error }}</span>
  </label>
</template>

<script setup>
import IMask from 'imask';

const props = defineProps(['holder', 'type', 'error']);

const model = defineModel();

function maskInput(e) {
  if (props.type == 'tel') {
    const maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };
    IMask(e.target, maskOptions);
  }
}
</script>

<style>
.input {
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 10.5px 18px;
  border: 2px solid #F7F8F8;
  height: 64px;
  margin-bottom: 20px;
  border-radius: 6px;
}

.input:last-child {
  margin-bottom: 0;
}

.input__folder {
  border: none;
  color: #174B7C;
  width: 100%;
  outline: none;
  font-size: 18px;
  line-height: 110%;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.input__holder {
  position: absolute;
  left: 18px;
  top: calc(50% - 0.5em);
  font-weight: 300;
  color: #174B7C;
  pointer-events: none;
  font-size: 14px;
  line-height: 15.4px;
  transition: top 0.2s;
}

.input__folder:focus+.input__holder,
.input__folder:not(:placeholder-shown)+.input__holder {
  top: 7px;
}

.input__error {
  position: absolute;
  top: 0px;
  transform: translateY(calc(-100% - 5px));
  right: 8px;
  font-size: 11px;
  color: red;
}
</style>
