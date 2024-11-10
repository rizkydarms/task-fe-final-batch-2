<script setup>
import { ref } from 'vue'
import { mdiAccountOutline, mdiLockOutline, mdiEye, mdiEyeOff } from '@mdi/js'
import logo from '@/assets/dompetku.png'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const submitErr = ref('') // error message

const showPassword = ref(false)
const submitInProgress = ref(false) // submit loading state

async function submit() {
  submitInProgress.value = true
  submitErr.value = ''

  try {
    await userStore.login({
      username: username.value,
      password: password.value,
    })
    // success
    router.push({ name: 'home' })
  } catch (err) {
    if (err.response) {
      submitErr.value = err.response.data.error
    } else {
      submitErr.value = err
    }
  }

  submitInProgress.value = false
}
</script>
<template>
  <v-container class="d-flex justify-center align-center h-100">
    <v-row class="ma-0 pa-0" align="center" justify="center">
      <!-- Header Aplikasi -->
      <v-col cols="12" class="text-center mb-6">
        <v-img class="mx-auto" max-width="180" :src="logo"></v-img>
        <h1 class="font-weight-bold mt-4">Dompetku</h1>
        <p class="subtitle-1 font-italic text-primary">
          Expense & Income Money Management
        </p>
      </v-col>

      <!-- Form Login -->
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6" elevation="8" rounded="lg">
          <v-card-title class="headline text-center">Login</v-card-title>

          <v-form>
            <!-- Username -->
            <v-text-field
              v-model="username"
              label="Username"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              density="compact"
              placeholder="Enter your username"
              class="mb-4"
              required
            ></v-text-field>

            <!-- Password -->
            <v-text-field
              v-model="password"
              label="Password"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              density="compact"
              placeholder="Enter your password"
              class="mb-5"
              required
            ></v-text-field>

            <!-- Error Message -->
            <v-card class="mb-5" color="error" variant="tonal" v-show="submitErr">
              <v-card-text class="text-center text-white">
                {{ submitErr }}
              </v-card-text>
            </v-card>

            <!-- Login Button -->
            <v-btn
              color="primary"
              size="large"
              variant="tonal"
              block
              @click="submit"
              :readonly="submitInProgress"
            >
              Login
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiAccountOutline, mdiEye, mdiEyeOff, mdiLockOutline } from '@mdi/js';
import { ref } from 'vue';

export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      submitErr: '',
      submitInProgress: false,
      logo: 'https://your-logo-url.com/logo.png', // Ganti dengan URL logo Anda
    };
  },
  methods: {
    async submit() {
      this.submitInProgress = true;
      try {
        // Lakukan proses login, misalnya panggil API
        // const response = await api.post('/auth/login', { username: this.username, password: this.password });

        // Simulasi login sukses
        if (this.username === 'admin' && this.password === 'password') {
          this.$router.push('/home'); // Arahkan ke halaman utama
        } else {
          this.submitErr = 'Username atau password salah!';
        }
      } catch (error) {
        console.error(error);
        this.submitErr = 'Login gagal, coba lagi!';
      } finally {
        this.submitInProgress = false;
      }
    }
  },
  components: {
    mdiAccountOutline,
    mdiEye,
    mdiEyeOff,
    mdiLockOutline
  }
};
</script>

<style scoped>
/* Styling Global */
h1 {
  font-size: 2.5rem;
  color: #4CAF50;
}

p.subtitle-1 {
  font-size: 1.2rem;
}

.v-card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.v-btn {
  text-transform: none;
}

/* Responsive Design */
@media (max-width: 600px) {
  .v-card {
    padding: 24px;
  }

  h1 {
    font-size: 2rem;
  }
}

</style>

