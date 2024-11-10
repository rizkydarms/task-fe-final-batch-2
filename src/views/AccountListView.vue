<script>
import { getAccountList } from '@/services/accountService';

export default {
  name: 'AccountListView',
  data() {
    return {
      accounts: []
    };
  },
  computed: {
    totalBalance() {
      // Menghitung total saldo dari semua akun
      return this.accounts.reduce((sum, account) => sum + account.balance, 0);
    },
    averageBalance() {
      // Menghitung rata-rata saldo dari semua akun
      return this.accounts.length > 0 ? this.totalBalance / this.accounts.length : 0;
    }
  },
  async created() {
    try {
      this.accounts = await getAccountList(); // Ambil data saat komponen dibuat
    } catch (error) {
      console.error("Failed to load accounts:", error);
    }
  },
  methods: {
    formatBalance(balance) {
      // Format saldo menjadi format mata uang IDR
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance);
    },
    updateBalance(accountId) {
      // Update saldo melalui prompt
      const newBalance = prompt('Masukkan saldo baru:');
      if (newBalance && !isNaN(newBalance)) {
        this.$emit('update-balance', { accountId, balance: newBalance });
      }
    }
  }
};
</script>

<template>
    <div class="account-list-container">
      <h2 class="title">Informasi Account</h2>
  
      <!-- Summary informasi total data, total balance, dan rata-rata balance -->
      <div v-if="accounts.length" class="summary-container">
        <div class="summary-item">
          <div class="summary-text">
            <p class="summary-title">Total Data Akun</p>
            <p class="summary-value">{{ accounts.length }}</p>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-text">
            <p class="summary-title">Total Saldo</p>
            <p class="summary-value">{{ formatBalance(totalBalance) }}</p>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-text">
            <p class="summary-title">Rata-rata Saldo</p>
            <p class="summary-value">{{ formatBalance(averageBalance) }}</p>
          </div>
        </div>
      </div>
  
      <v-card v-if="accounts.length" class="account-list-card">
        <!-- Tabel untuk menampilkan daftar akun -->
        <v-simple-table>
          <thead>
            <tr>
              <th class="column-title">Nama Akun</th>
              <th class="column-title">Saldo</th>
              <th class="column-title">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.account_id">
              <td class="account-name">{{ account.nama }}</td>
              <td class="account-balance">{{ formatBalance(account.balance) }}</td>
              <td>
                <v-btn color="primary" @click="updateBalance(account.account_id)" class="update-btn">
                  Update Saldo
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
      <p v-else class="no-accounts-text">Tidak ada akun yang ditemukan.</p>
    </div>
  </template>
  
  <style scoped>
  /* Kontainer utama */
  .account-list-container {
    padding: 20px;
    max-width: 1024px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #0e185d;
    margin-bottom: 10px;
    text-align: left;
    padding-left: 10px;
  }
  
  /* Gaya untuk summary informasi */
  .summary-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .summary-item {
    display: flex;
    align-items: center;
    font-size: 1rem;
    padding-right: 10px;
    padding-left: 10px;
  }
  
  .summary-icon {
    font-size: 2rem;
    color: #4caf50;
    margin-right: 10px;
  }
  
  .summary-text {
    text-align: left;
  }
  
  .summary-title {
    font-weight: 600;
    color: #34495e;
  }
  
  .summary-value {
    font-size: 1 rem;
    font-weight: 500;
    color: #2c3e50;
  }
  /* Gaya untuk tabel */
.v-simple-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.v-simple-table th,
.v-simple-table td {
  text-align: left;
}

.column-title {
  font-weight: 600;
  color: #34495e;
  padding-left: 10px;  
  
}

.account-name {
  padding-left: 30px;  
}

.account-balance {
  padding-left: 300px;  /* Menambahkan padding kiri pada kolom saldo */
  padding-right: 300px; /* Menambahkan padding kanan pada kolom saldo */
}

.v-simple-table td {
  font-size: 1rem;
  color: #2c3e50;
}

.v-simple-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.v-simple-table tr:hover {
  background-color: #f1f1f1;
}

  
  /* Gaya untuk tombol update saldo */
  .v-btn.update-btn {
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  /* Gaya untuk teks ketika tidak ada akun */
  .no-accounts-text {
    font-size: 1.1rem;
    color: #7f8c8d;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  