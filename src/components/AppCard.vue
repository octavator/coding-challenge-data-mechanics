<template>
  <!-- @TODO: Use fixed min-width to uniform app cards across platforms, responsive font-size (unreadable on 4K) -->
  <div class="card">
    <div class="content">
      <div class="card-row">
        <span class="elem card__name">
          <a :href="`#/app/${app.appName}`">
            <!-- @TODO: Add fa-clock w/ build duration -->
            <span v-if="isLoaded"><b>{{ app.appName }}</b></span>
            <div v-else class="bg-loading"></div>
          </a>
        </span>
        <!-- @TODO: use fa-times icon instead of 'X' & add modal for running apps -->
        <span class="btn">
          <button class="card__delete-button danger" @click="deleteApp(app.appName)" v-if="isLoaded">X</button>
          <div v-else class="bg-loading"></div>
        </span>
      </div>
      <div class="card-row">
        <div class="relative elem card__executors">
          <span v-if="isLoaded">{{ nbExecutors }} executors</span>
          <div v-else class="bg-loading"></div>
        </div>
        <div class="relative elem card__build-time">
          <span v-if="isLoaded">build: {{ buildTime }}s</span>
          <div v-else class="bg-loading"></div>
        </div>
        
        <div class="relative elem card__status">
          <span v-if="isLoaded" :class="dynamicClass">{{ app.status.applicationState.state }}</span>
          <div v-else class="bg-loading"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'AppCard',
  props: {
    app: {
      type: Object,
      default: undefined
    }
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
      if (this.app && this.app.status && this.app.status.executorState) return Object.keys(this.app.status.executorState).length
      return 0
    },
    isLoaded() {
      return this.app && this.app.appName
    },
    dynamicClass() {
      if (!this.app || !this.app.status) return ''
      switch(this.app.status.applicationState.state) {
        case 'COMPLETED': {
          return 'card__status--completed'
        }
        case 'FAILED': {
          return 'card__status--failed'
        }
        case 'PENDING': {
          return 'card__status--pending'
        }
        case 'RUNNING': {
          return 'card__status--running'
        }
        default: {
          return ''
        }
      }
    }
  },
  methods: {
    async deleteApp(name) {
      const response = await this.$http.delete(`apps/${name}`)
      if (response.status === 200) {
        // @TODO: Add confirmation alert
        this.$emit('delete', name)
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variables';
.btn {
  top: 0;
  right: 20px;
}

.card__status {
  margin: 5px;
  color: white;
}

.card {
  min-height: 100px;
  min-width: 300px;
  width: 90%;
  position: relative;
  height: fit-content;
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  margin: 20px 5%;
  transition: all .25s linear .1s;
  &:hover {
    transform: translateY(-5px);
  }
  .card-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .card__name {
      a {
        text-decoration: none !important; 
        color: @secondary_color !important; 
      }
    }

  }
  .content {
    padding: 5px;
    width: 100%;
    height: 100px;
    display: flex;
    // justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    // flex-direction: column;
    color: grey;
    justify-content: space-between;
    .elem {
      margin: 5px 0;
      padding: 0 10px;
    }
  }
}

.card__delete-button {
  position: relative;
  right: 10px;
  outline: none !important;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 11px;
  background-color: rgb(233, 0, 0);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  color: white;
  border: none;

  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    text-decoration: none;
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}

span[class*="card__status"] {
  border-radius: 15px;
  padding: 5px 15px;
  font-size: 12px;
}
.card__status--completed {
  background-color: green;
}

.card__status--failed {
  background-color: red;
}

.card__status--pending {
  background-color: yellow;
}

.card__status--running {
  background-color: orange;
}

</style>