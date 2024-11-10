<template>
    <v-container class="d-flex justify-center align-center h-100">
      <v-row class="ma-0 pa-0" align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-6" elevation="8" rounded="lg">
            <v-card-title class="headline text-center">Ubah Password</v-card-title>
  
            <v-form ref="form" v-model="formValid">
              <!-- Password Baru -->
              <v-text-field
                v-model="newPassword"
                label="Password Baru"
                prepend-inner-icon="mdi-lock-outline"
                :type="showNewPassword ? 'text' : 'password'"
                @click:append-inner="showNewPassword = !showNewPassword"
                :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                outlined
                required
              ></v-text-field>
  
              <!-- Konfirmasi Password Baru -->
              <v-text-field
                v-model="confirmPassword"
                label="Konfirmasi Password Baru"
                prepend-inner-icon="mdi-lock-outline"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                outlined
                required
              ></v-text-field>
  
              <!-- Pesan Error -->
              <v-alert v-if="errorMessage" type="error" class="mt-4">
                {{ errorMessage }}
              </v-alert>
  
              <!-- Tombol Ubah Password -->
              <v-btn
                color="primary"
                size="large"
                class="mt-5"
                block
                :disabled="!formValid || loading"
                @click="changePassword"
              >
                Ubah Password
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mdiLockOutline, mdiEye, mdiEyeOff } from '@mdi/js';
  import api from '@/plugins/api';
  
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        showNewPassword: false,
        showConfirmPassword: false,
        formValid: false,
        errorMessage: '',
        loading: false,
      };
    },
    methods: {
      async changePassword() {
        // Validasi input password
        if (this.newPassword !== this.confirmPassword) {
          this.errorMessage = 'Password tidak sesuai, silakan periksa kembali.';
          return;
        }
  
        this.loading = true;
        this.errorMessage = '';
  
        try {
          // Mengirim request ke backend untuk mengganti password
          await api.post('/auth/changepassword', {
            newPassword: this.newPassword,
          });
  
          // Redirect atau tampilkan pesan sukses
          this.$router.push('/home');
        } catch (error) {
          this.errorMessage = 'Gagal mengubah password. Silakan coba lagi.';
        } finally {
          this.loading = false;
        }
      },
    },
    components: {
      mdiLockOutline,
      mdiEye,
      mdiEyeOff,
    },
  };
  </script>
  
  <style scoped>
  /* Styling button, card, dll */
  .v-card {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  </style>
  