<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Registro</h2>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="name">Nombre</label>
          <input id="name" type="text" v-model="name" v-bind="nameAttrs" :class="{ 'w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500': true, 'border-red-500': errors.name }">
          <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="email">Correo Electrónico</label>
          <input id="email" type="email" v-model="email" v-bind="emailAttrs" :class="{ 'w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500': true, 'border-red-500': errors.email }">
          <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="password">Contraseña</label>
          <input id="password" type="password" v-model="password" v-bind="passwordAttrs" :class="{ 'w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500': true, 'border-red-500': errors.password }">
          <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="confirmPassword">Confirmar Contraseña</label>
          <input id="confirmPassword" type="password" v-model="confirmPassword" v-bind="confirmPasswordAttrs" :class="{ 'w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500': true, 'border-red-500': errors.confirmPassword }">
          <span v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</span>
        </div>

        <button type="submit" class="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/User';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('Correo incorrecto').required('El correo es requerido'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Las contraseñas deben coincidir').required('Confirma tu contraseña'),
  }),
});

const [name, nameAttrs] = defineField('name', { validateOnModelUpdate: true });
const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: true });
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: true });
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword', { validateOnModelUpdate: true });

const handleRegister = handleSubmit(async (values) => {
  try {
    await authStore.register(values.email, values.password);
    router.push({ name: 'Home' });
  } catch (error) {
    console.error('Error al registrar:', error);
  }
});
</script>

<style scoped>
input {
  transition: all 0.2s;
}
</style>
