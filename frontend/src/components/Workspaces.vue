<template>
  <div id="workspaces">
    <h1 id="page-title">Workspaces</h1>
    <v-row>
      <v-col class="d-flex flex-wrap">
        <v-card class="workspace-card" v-if="status.loading">
          <v-skeleton-loader type="card"> </v-skeleton-loader>
        </v-card>
        <v-card
          v-for="(workspace, index) in workspaces"
          :key="index"
          class="workspace-card rounded-lg"
        >
          <v-skeleton-loader type="image" boilerplate></v-skeleton-loader>
          <v-card-title>{{ workspace.workspace_name }}</v-card-title>
        </v-card>
        <router-link
          to="/workspaces/add"
          class="workspace-card add-workspace-card d-flex flex-column justify-center align-center rounded-xl"
        >
          <v-icon size="64">mdi-plus</v-icon>
          <h4>Add Workspace</h4>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: {
        loading: true
      },
      workspaces: []
    }
  },

  mounted() {
    Promise.all([
      this.getPaginatedAPI('/workspaces/', this.workspaces, this.status)
    ])
  },

  methods: {
    async getPaginatedAPI(link, results, status = Object()) {
      status.loading = true
      return this.$api.get(link).then(response => {
        response.data.results.forEach(result => {
          results.push(result)
        })
        if (response.data.next != null) {
          return this.getPaginatedAPI(response.data.next, results, status)
        } else {
          status.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
.workspace-card {
  width: 300px;
  min-height: 350px;
  margin: 24px 12px 0px 12px;
}

.add-workspace-card {
  border: 4px dashed #e0e0e0;
  transition: all 0.3s;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}

.add-workspace-card:hover,
.add-workspace-card:hover .v-icon {
  background-color: #ffffff;
  border-color: #43a047;
  color: #43a047;
}
</style>
