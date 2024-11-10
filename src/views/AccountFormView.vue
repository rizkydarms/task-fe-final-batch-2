<template>
    <v-container>
      <v-card class="mx-auto" max-width="600">
        <v-card-title>
          <span class="text-h6">{{ isEditing ? 'Edit Account' : 'Create Account' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="accountData.name"
              label="Nama"
              required
              outlined
            ></v-text-field>
  
            <v-text-field
              v-model="accountData.email"
              label="Email"
              type="email"
              required
              outlined
            ></v-text-field>
  
            <v-text-field
              v-model="accountData.balance"
              label="Saldo"
              type="number"
              required
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cancel">Cancel</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="saveAccount">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import api from '@/plugins/api';
  
  export default {
    props: {
      account: {
        type: Object,
        default: () => ({ name: '', email: '', balance: 0 }),
      },
    },
    data() {
      return {
        accountData: { ...this.account },
        isEditing: !!this.account.id,
        formValid: false,
      };
    },
    methods: {
      // Mengirim data akun baru atau mengedit akun
      saveAccount() {
        const endpoint = this.isEditing
          ? `/account/update/${this.accountData.id}`
          : '/account/create';
  
        const method = this.isEditing ? 'put' : 'post';
  
        api[method](endpoint, this.accountData)
          .then(() => {
            this.$emit('saved');
            this.$router.push('/accounts'); // Mengarahkan ke halaman list account
          })
          .catch(error => {
            console.error("Error saving account:", error);
          });
      },
  
      // Membatalkan dan kembali ke halaman daftar akun
      cancel() {
        this.$router.push('/accounts');
      },
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  </style>
  