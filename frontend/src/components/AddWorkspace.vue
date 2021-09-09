<template>
  <div id="add-workspace" fluid loading>
    <h1 id="page-title">Add Workspace</h1>
    <v-stepper
      fluid
      vertical
      v-model="status.currentStep"
      class="ma-4 rounded-lg"
    >
      <v-stepper-step step="1" :complete="status.currentStep > 1">
        {{ steps[0].name }}
      </v-stepper-step>

      <v-stepper-content step="1" style="min-height: 32px;}">
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="status.loading"
          class="ma-8 mt-0"
        ></v-progress-circular>
        <v-item-group mandatory loading v-model="setupData.subscription">
          <v-row>
            <v-item
              v-slot="{ active, toggle }"
              v-for="(subscription, index) in subscriptionPlans"
              :key="index"
              class="ma-4 d-flex"
            >
              <div class="d-flex flex-column justify-center">
                <v-card
                  :class="
                    'selection-item d-flex flex-column align-center justify-center rounded-lg flex-grow-1' +
                      (active ? ' active' : '')
                  "
                  :elevation="active ? '6' : '2'"
                  @click="
                    toggle();
                    status.currentStep++;
                  "
                >
                  <div
                    class="content d-flex flex-grow-1 flex-column justify-center align-center"
                  >
                    <p
                      class="font-weight-medium text-uppercase"
                      v-text="subscription.name"
                    ></p>
                    <p class="primary--text text-h4 font-weight-light mb-0">
                      <span
                        v-text="
                          parseFloat(subscription.price_yearly) +
                            parseFloat(subscription.price_monthly) !=
                          0
                            ? setupData.yearlyPayment
                              ? currencies[subscription.price_yearly_currency]
                              : currencies[subscription.price_monthly_currency]
                            : ''
                        "
                      ></span>
                      &nbsp;
                      <span
                        v-text="
                          parseFloat(subscription.price_yearly) +
                            parseFloat(subscription.price_monthly) !=
                          0
                            ? setupData.yearlyPayment
                              ? Math.round(
                                  (subscription.price_yearly / 12) * 100
                                ) / 100
                              : subscription.price_monthly
                            : 'FREE'
                        "
                      ></span>
                    </p>
                    <p
                      v-if="
                        parseFloat(subscription.price_yearly) +
                          parseFloat(subscription.price_monthly)
                      "
                      class="text-body-2 text-uppercase grey--text text--darken-1"
                    >
                      per member per month
                    </p>
                    <p
                      v-else
                      class="text-body-2 text-uppercase grey--text text--darken-1"
                    >
                      FOREVER
                    </p>
                  </div>
                  <div
                    class="payment-period d-flex align-center"
                    v-if="
                      parseFloat(subscription.price_yearly) +
                        parseFloat(subscription.price_monthly)
                    "
                  >
                    <span
                      :class="
                        'text-body-2 text--darken-1 mr-2 ' +
                          (setupData.yearlyPayment
                            ? 'grey--text'
                            : 'font-weight-bold')
                      "
                      >Monthly</span
                    >
                    <v-switch
                      v-model="setupData.yearlyPayment"
                      @click.stop=""
                    ></v-switch>
                    <span
                      :class="
                        'text-body-2 text--darken-1 ml-2 ' +
                          (!setupData.yearlyPayment
                            ? 'grey--text'
                            : 'font-weight-bold')
                      "
                      >Yearly</span
                    >
                  </div>
                  <!-- <p v-text="subscription.description"></p> -->
                  <div class="features d-flex flex-column align-center">
                    <p
                      v-for="(feature, feature_index) in subscription.features"
                      :key="feature_index"
                      class="d-flex align-center ma-0 text-caption font-weight-bold"
                      v-text="feature"
                    ></p>
                  </div>
                  <v-btn
                    color="primary"
                    class="mt-4"
                    v-text="subscription.buttonText"
                  ></v-btn>
                </v-card>
              </div>
            </v-item>
          </v-row>
        </v-item-group>
      </v-stepper-content>

      <v-stepper-step step="2" :complete="status.currentStep > 2">
        {{ steps[1].name }}
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-form ref="workspaceDetailsForm" style="max-width: 400px;">
          <v-text-field
            :rules="rules.nameRules"
            id="workspace_name"
            label="Workspace name"
            v-model="workspace.workspace_name"
          >
          </v-text-field>
          <v-text-field
            :rules="rules.nameRules"
            id="company_name"
            label="Company name"
            v-model="workspace.company_name"
          >
          </v-text-field>
          <v-row>
            <v-col cols="8">
              <v-text-field
                :rules="rules.streetRules"
                id="street"
                label="Street"
                v-model="workspace.street"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                :rules="rules.streetNumberRules"
                id="streetnumber"
                label="Street number"
                v-model="workspace.streetnumber"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="rules.postalCode"
                id="postal_code"
                label="Postal code"
                v-model="workspace.postal_code"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :rules="rules.cityRules"
                id="city"
                label="City"
                v-model="workspace.city"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            :rules="rules.stateRules"
            id="state"
            label="State"
            v-model="workspace.state"
          ></v-text-field>
          <v-select
            required
            id="country"
            label="Country"
            :items="options.country_choices"
            item-text="display_name"
            item-value="value"
            v-model="workspace.country"
          ></v-select>
        </v-form>

        <v-btn color="primary" class="mr-4" @click="status.currentStep++">
          Continue
        </v-btn>

        <v-btn text @click="status.currentStep--">
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-step step="3" :complete="status.currentStep > 3">
        {{ steps[2].name }}
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-item-group mandatory loading>
          <v-row>
            <v-item v-slot="{ active, toggle }" class="ma-4 d-flex">
              <div class="d-flex flex-column justify-center">
                <v-card
                  :class="
                    'selection-item d-flex flex-column align-center justify-center rounded-lg flex-grow-1' +
                      (active ? ' active' : '')
                  "
                  :elevation="active ? '6' : '2'"
                  @click="toggle()"
                >
                  <p class="primary--text text-h4 font-weight-light mb-0">
                    Invoice
                  </p>
                </v-card>
              </div>
            </v-item>
          </v-row>
        </v-item-group>

        <v-btn
          color="primary"
          class="mr-4 mt-4"
          @click="
            createWorkspace(
              workspace,
              subscriptionPlans[setupData.subscription].url,
              setupData.yearlyPayment
            )
          "
        >
          Create
        </v-btn>

        <v-btn text @click="status.currentStep--" class="mt-4">
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currencies: {
        EUR: '€',
        USD: '$'
      },
      options: {
        countries: {}
      },
      rules: {
        nameRules: [
          v => !!v || 'Your workspace requires a name',
          v => v.length <= 150 || 'Name must be less than 150 characters'
        ]
      },
      setupData: {
        subscription: null,
        yearlyPayment: true
      },
      status: {
        loading: true,
        currentStep: 1,
        submitting: false
      },
      steps: [
        {
          name: 'Choose a subscription plan'
        },
        {
          name: 'Set up workspace details'
        },
        {
          name: 'Payment options'
        },
        {
          name: 'Invite your colleagues'
        }
      ],
      subscriptionPlans: [],
      workspace: {
        workspace_name: '',
        company_name: '',
        street: '',
        streetnumber: '',
        postal_code: '',
        city: '',
        state: '',
        country: ''
      }
    }
  },

  mounted() {
    this.getPaginatedAPI('/subscriptionplans/', this.subscriptionPlans, this.status)
    this.loadCountries('/workspaces/', this.options)
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
    },
    async loadCountries(link, results) {
      return this.$api.options(link).then(response => {
        results.country_choices = response.data.actions.POST.country.choices
        for (const country of response.data.actions.POST.country.choices) {
          results.countries[country.value] = country.display_name
        }
      })
    },
    async createWorkspace(workspace, subscription, paymentCycle) {
      const workspaceData = workspace
      workspaceData.subscriptionPlan = subscription
      workspaceData.paymentCycle = paymentCycle ? 'Y' : 'M'
      return this.$api.post('/workspaces/', workspaceData)
    }
  }
}
</script>

<style scoped>
.add-workspace-card {
  border: 4px dashed #e0e0e0;
  transition: all 0.3s;
}

.selection-item {
  margin: 24px 12px 0px 12px;
  padding: 24px;
  text-align: center;
}

.selection-item.active {
  border: 2px solid #43a047;
}

.subscription_features {
  width: 250px;
  margin: 24px 12px 0px 12px;
}

.subscription {
  width: 250px;
  min-height: 300px;
}
</style>
