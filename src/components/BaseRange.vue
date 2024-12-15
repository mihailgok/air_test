<template>
  <label class="range_input">
    <input class="range_input__folder" @input="maskInput" :type="props.type == 'number' ? 'number' : 'text'"
      placeholder="" v-model="model">
    <span class="range_input__holder">{{ props.holder }}</span>
    <span class="input__error" v-show="props.error">{{ props.error }}</span>
  </label>
</template>

<script setup>
import IMask from 'imask';

const props = defineProps(['holder', 'from', 'to', 'type', 'error']);

const model = defineModel();

function maskInput(e) {
  if (props.type == 'number') {
    const maskOptions = {
      mask: Number,
      min: Number(props.from),
      max: Number(props.to)
    };
    IMask(e.target, maskOptions);
  }
  else if (props.type == 'date') {
    const maskOptions = {
      mask: 'd0.m0.yY00',  // enable date mask
      definitions: {
        'd': /[0-3]/,
        'm': /[0-1]/,
        'y': /[1-2]/,
        'Y': /[0,9]/,
      }
    };
    IMask(e.target, maskOptions);
  }
}
</script>


<style scoped>
.range_input {
  position: relative;
  /* width: 100%; */
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding: 10.5px 18px;
  border: 2px solid #F7F8F8;
  height: 64px;
  /* margin-bottom: 20px; */
  border-radius: 6px;
}

.range_input:last-child {
  margin-bottom: 0;
}

.range_input__folder {
  border: none;
  color: #174B7C;
  width: 100%;
  outline: none;
  font-size: 18px;
  line-height: 110%;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-align: right;
  align-self: center;
}

.range_input__holder {
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

/* .range_input__folder:focus+.range_input__holder,
.range_input__folder:not(:placeholder-shown)+.range_input__holder {
  top: 8px;
} */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0;
  /* <-- Apparently some margin are still there even though it's hidden */
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
