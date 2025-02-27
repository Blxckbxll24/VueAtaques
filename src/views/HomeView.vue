<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->
    <header class="py-6 text-center bg-blue-700 flex justify-between items-center px-6">
      <h1 class="text-3xl font-bold">Ataques en Seguridad Informática</h1>
      <button
        v-if="isLoggedIn"
        @click="handleLogout"
        class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Cerrar Sesión
      </button>
    </header>

    <!-- Tipos de Ataques -->
    <section class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Tipos de Ataques Comunes</h2>
      <div class="flex space-x-4 overflow-x-auto">
        <div v-for="(attack, index) in attacks" :key="index" class="bg-blue-800 p-4 rounded-lg w-64 shadow-lg">
          <h3 class="text-xl font-bold">{{ attack.name }}</h3>
          <p class="text-sm">{{ attack.description }}</p>
        </div>
      </div>
    </section>

    <!-- Ataque Destacado -->
    <section class="p-6 bg-gray-800 mt-6 rounded-lg">
      <h2 class="text-2xl font-semibold">Ataque Destacado</h2>
      <div class="mt-4 p-4 bg-blue-900 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold">{{ featuredAttack.name }}</h3>
        <p class="mt-2">{{ featuredAttack.details }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/user';
import { useRouter } from 'vue-router';

// Store de autenticación
const authStore = useAuthStore();
const router = useRouter();

// Estado de autenticación
const isLoggedIn = authStore.isLoggedIn;

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login'); 
};

// Datos de ataques
const attacks = ref([
  { name: 'Phishing', description: 'Engaños para obtener credenciales y datos.' },
  { name: 'Ransomware', description: 'Secuestro de datos a cambio de un rescate.' },
  { name: 'DDoS', description: 'Ataques de denegación de servicio masivos.' },
  { name: 'Malware', description: 'Software malicioso que infecta sistemas.' }
]);

const featuredAttack = ref({
  name: 'Ingeniería Social',
  details: 'Consiste en manipular a las personas para obtener información confidencial mediante engaños.'
});
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
