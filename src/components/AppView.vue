<template>
  <div id="app-view">
    <Navbar/>
    <div class="content container">
      <h2 v-if="isLoaded" class="page-title">{{ app.appName }} <span class="app__status" :class="dynamicClass">{{ app.status.applicationState.state }}</span></h2>
      <!-- ERROR MESSAGE FOR FAILED APPS -->
      <p v-if="isLoaded" class="app__start-time">App started at {{ app.status.lastSubmissionAttemptTime | formatDate }} and built for {{ buildTime }}s.</p>

      <!-- ERROR MESSAGE FOR FAILED APPS -->
      <p v-if="isLoaded && app.status.applicationState && app.status.applicationState.errorMessage" class="app__error-msg">Error: {{ app.status.applicationState.errorMessage }} </p>

      <!-- CONFIG (hidden by default) -->
      <div class="app__block">
        <label class="label">Configuration <button @click="showConfig = !showConfig" class="dame__button show-config">Show</button></label>
        <div class="config__block" v-if="app && showConfig">
          {{ app.config }}
        </div>
      </div>

      <!-- EXECUTORS (hidden by default) -->
      <div class="app__block">
        <label name="date" v-if="app && app.status && app.status.lastSubmissionAttemptTime">
          Number of executors
          </label>
          <p class="executors"> {{ nbExecutors }} Total Executors </p>
      </div>
      <!-- LOGS (hidden by default) -->
      <div class="app__block">
        <label class="label">Logs <button @click="showLogs = !showLogs" class="dame__button show-config">Show</button></label>
        <div class="config__block" v-show="this.logs && showLogs">
          {{ this.logs.content }}
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'AppView',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      showConfig: false,
      showLogs: false,
      app: {},
      logs: {}
    }
  },
  props: {
    appName: {}
  },
  computed: {
    buildTime() {
      if (!this.isLoaded) {
        return undefined
      }
      const msDiff = new Date(this.app.status.terminationTime) - new Date(this.app.status.lastSubmissionAttemptTime)
      //difference is given in milliseconds, switch back to seconds
      return msDiff / 1000
    },
    nbExecutors() {
      if (this.isLoaded && this.app.status.executorState) return Object.keys(this.app.status.executorState).length
      return 0
    },

    isLoaded() {
      return this.app && this.app.status
    },
    dynamicClass() {
      if (!this.app || !this.app.status) return ''
      switch(this.app.status.applicationState.state) {
        case 'COMPLETED': {
          return 'app__status--completed'
        }
        case 'FAILED': {
          return 'app__status--failed'
        }
        case 'PENDING': {
          return 'app__status--pending'
        }
        case 'RUNNING': {
          return 'app__status--running'
        }
        default: {
          return ''
        }
      }
    }
  },
  metaInfo() {
    return {
      title: (this.app && this.app.appName) ? this.app.appName : ''
    }
  },
  async mounted() {
    //GET APP
    const appResponse = await this.$http.get(`/apps/${this.appName}`)
    this.app = appResponse.data

    // GET LOGS
    const logResponse = await this.$http.get(`/apps/${this.appName}/log`)
    // eslint-disable-next-line no-console
    console.log(logResponse)
    if (logResponse.status !== 200) {
      this.logs = "Error while retrieving this app's logs."
      return
    }
    this.logs = logResponse.data
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/less/variables';

.page-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: @primary_color;
}

#app-view {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}

.app__block {
  margin-bottom: 20px;
}

.page-title {
  font-size: 1.8em;
  margin: 35px 0;
  color: @primary_color;
}

.config__block {
  padding: 25px;
  overflow-wrap: break-word; 
}

.app__error-msg {
  color: @danger_color;

  font-size: 1.3em;
}

span[class*="app__status"] {
  color: white;
  margin-left: 10px;
  border-radius: 15px;
  padding: 5px 14px;
  font-size: 12px;
}
.app__status--completed {
  background-color: @success_color;
}

.app__status--failed {
  background-color: @danger_color;
}

.app__status--pending {
  background-color: yellow;
}

.app__status--running {
  background-color: @warning_color;
}

label {
  color: @secondary_color;
  padding-bottom: 10px;
  font-size: 20px;
  border-bottom: 1px solid @secondary_color;
}
</style>
