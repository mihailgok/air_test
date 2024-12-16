<script setup>
import BaseInputVue from "./components/BaseInput.vue";
import BaseSelect from "./components/BaseSelect.vue";
import BaseRange from "./components/BaseRange.vue";
import { sendForm } from "./api/sendForm";

import { ref } from "vue";

const showModal = ref(false);

const form = ref({
  name: '',
  phone: '',
  address: '',
  space: [],
  area: {
    from: 120,
    to: 400
  },
  date: {
    from: '01.02.2025',
    to: '31.12.2026'
  }
});
const errors = ref({
  name: '',
  phone: '',
  address: '',
  space: '',
  area: {
    from: '',
    to: ''
  },
  date: {
    from: '',
    to: ''
  }
})

const selectList = ref([
  {
    text: "Производственная площадь",
    name: "first"
  },
  {
    text: "Площадь под услуги",
    name: "second"
  },
  {
    text: "Уличная площадь",
    name: "third"
  },
  {
    text: "Военная площадь",
    name: "forth"
  }
]);

function validateName() {
  // +7 (888) 888-888
  if (form.value.name.length < 3) {
    errors.value.name = 'Название должно содержать минимум 3 символа';
  } else {
    errors.value.name = '';
  }
}

function validatePhone() {
  if (form.value.phone.length < 18) {
    errors.value.phone = 'Вы не ввели телефон';
  } else {
    errors.value.phone = '';
  }
}

function validateAddress() {
  if (form.value.address.length < 5) {
    errors.value.address = 'Адрес должен содержать минимум 5 символов';
  } else {
    errors.value.address = '';
  }
}

function validateSpace() {
  if (form.value.space.length == 0) {
    errors.value.space = 'Вы не выбрали тип помещения';
  } else {
    errors.value.space = '';
  }
}

function validateArea() {
  if (Number(form.value.area.from) > Number(form.value.area.to)) {
    errors.value.area.from = 'Число не должно быть больше правого';
    errors.value.area.to = 'Число не должно быть меньше левого';
  }
  else {
    errors.value.area.from = '';
    errors.value.area.to = '';
  }
}

function validateDate() {
  let fromDate = new Date(form.value.date.to.split('.').reverse().join('-'));
  let toDate = new Date(form.value.date.from.split('.').reverse().join('-'));

  let myRe = /^[0-3][0-9]\.[0-1][0-9]\.[1-2][0-1][0-9][0-9]$/;
  let testFrom = myRe.test(form.value.date.from);
  let testTo = myRe.test(form.value.date.to);

  if (toDate - fromDate > 0) {
    errors.value.date.from = 'Дата не должна быть больше правой';
    errors.value.date.to = 'Дата не должна быть меньше левой';
  }
  else if (!testFrom) {
    errors.value.date.from = 'Неверный формат';
  }
  else if (!testTo) {
    errors.value.date.to = 'Неверный формат';
  }
  else {
    errors.value.date.from = '';
    errors.value.date.to = '';
  }
}

function changeSelect(item) {
  form.value.space = item;
  validateSpace();
}

async function handleSubmit() {
  validateName();
  validatePhone();
  validateAddress();
  validateSpace();
  validateArea();

  console.log(JSON.stringify(form.value))
  console.log(form.value)

  if (!errors.value.name && !errors.value.phone) {
    const result = sendForm(form.value).then(res => res);
    const res_data = await result;

    if (res_data) {
      console.log(res_data);
      alert("Форма успешно отправлена");
    }
  }
}

function closeModal(e) {
  if (e.target.classList.contains("modal")) {
    showModal.value = false;
  }
}
</script>

<template>
  <div>
    <button class="open_modal" @click="showModal = true">Открыть окно</button>

    <Transition name="showModal">
      <div class="modal" v-show="showModal" @click.stop="closeModal">
        <form class="modal__container" @submit.prevent="handleSubmit">
          <h2 class="modal__header">Заполните заявку, чтобы стать резидентом</h2>

          <BaseInputVue holder="Наименование организации / ИП" type="text" v-model="form.name" :error="errors.name"
            @input="validateName" />
          <BaseInputVue holder="Контактный телефон" type="tel" v-model="form.phone" :error="errors.phone"
            @input="validatePhone" />
          <BaseSelect type="single" holder="Тип помещения" v-model="form.space" :error="errors.space"
            @change="changeSelect" :data-list="selectList" />
          <!-- <BaseSelect type="multi" holder="Тип помещения" v-model="form.space" :error="errors.space"
            @change="changeSelect" :data-list="selectList" /> -->
          <BaseInputVue holder="Адрес" type="text" v-model="form.address" :error="errors.address"
            @input="validateAddress" />

          <div class="range">
            <p class="range__header">Площадь помещения (м2)</p>
            <div class="range__main">
              <BaseRange holder="от" from="0" to="10000" type="number" v-model="form.area.from"
                :error="errors.area.from" @input="validateArea" />
              <BaseRange holder="до" from="0" to="10000" type="number" v-model="form.area.to" :error="errors.area.to"
                @input="validateArea" />
            </div>
          </div>

          <div class="range">
            <p class="range__header">Дата начала аренды</p>
            <div class="range__main">
              <BaseRange holder="c" from="0" to="1000" type="date" v-model="form.date.from" :error="errors.date.from"
                @input="validateDate" />
              <BaseRange holder="по" from="0" to="1000" type="date" v-model="form.date.to" :error="errors.date.to"
                @input="validateDate" />
            </div>
          </div>

          <button class="modal__btn">Отправить</button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.range {
  margin-bottom: 20px;
}

.range__main {
  display: flex;
  gap: 8px;
}

.range__header {
  font-weight: 300;
  font-size: 14px;
  margin: 0 0 20px;
  color: #174B7C;
}

.modal {
  width: 100%;
  height: 100%;
  background: #585858A3;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__container {
  padding: 40px;
  background: #FFF;
  width: 800px;
  display: flex;
  flex-direction: column;
}

.modal__header {
  font-size: 24px;
  font-weight: 600;
  color: #1A263D;
  margin: 0 0 40px;
}

.modal__btn {
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 40px;
  background: #174B7C;
  border-radius: 1000px;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: #FFFFFF;
  align-self: center;
  cursor: pointer;
  border: none;
}

.open_modal {
  margin: 50px auto;
  display: block;
  cursor: pointer;
  padding: 20px;
}

.showModal-enter-active,
.showModal-leave-active {
  transition: opacity 0.3s ease
}

.showModal-enter-from,
.showModal-leave-to {
  opacity: 0
}
</style>
