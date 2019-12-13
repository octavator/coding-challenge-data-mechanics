<template>
  <div>
    <Navbar/>
    <div id="dashboard" class="">
      <h2 class="page-title">Vos applications</h2>
      <div class="apps-container">
        <!-- @TODO: list apps by start-time DESC -->
        <div class="apps" v-for="app in apps" :key="app.appName">
          <app-card @delete="getAllApps" :app="app"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AppCard from '@/components/AppCard'

export default {
  name: 'Dashboard',
  data() {
    return {
      apps: [{}, {}, {}, {}]
    }
  },
  metaInfo() {
    return {
      title: 'Dashboard'
    }
  },

  components: {
    Navbar,
    Footer,
    AppCard
  },
  async mounted () {
    this.getAllApps()
  },
  methods: {
    async getAllApps() {
    try {
        const response = await this.$http.get('/apps')
        if (response.status === 200) {
          this.apps = response.data

        } else {
          // console.error(response)
        }
      } catch (e) {
        // console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/less/variables';

.apps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  // flex-wrap: wrap;
  flex-direction: column;
}

.page-title {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  color: @primary_color;
}
</style>