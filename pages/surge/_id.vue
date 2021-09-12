<template>
  <div v-if="surge" class="w-full">
    <NuxtLink
      class="btn btn-ghost hover:bg-white ml-20 font-bold text-lg mb-3 normal-case"
      to="/"
    >
      <img src="/back-curved-arrow.svg" class="w-7" />
      <span class="pl-2">Back Home</span>
    </NuxtLink>
    <div class="card card-side border shadow-lg w-1/2 mx-auto">
      <div class="w-16">
        <div class="grid grid-rows-2 justify-between w-2/3 pl-2 py-4 mx-auto">
          <button
            class="btn btn-square btn-md btn-ghost text-green-800"
            @click="upvoteSurge"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          </button>
          <button
            class="btn btn-square btn-ghost btn-md text-red-800"
            @click="downvoteSurge"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <button
            class="
              btn btn-ghost
              -mt-0.5
              btn-disabled
              text-center
              mx-auto
              font-semibold
              text-lg
              align-text-bottom
            "
          >
            {{ surge.upvotes }}
          </button>
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title mx-auto relative w-full">
          <span>{{ cardTranslation }} #100</span>
          <div class="badge badge-primary absolute right-4">
            {{ surge.language_code }}
          </div>
        </h2>
        <p>
          {{ surge.content.charAt(0).toUpperCase() + surge.content.slice(1)
          }}
        </p>
        <hr class="w-full mx-auto my-3" />
        <div class="grid grid-cols-3">
          <p class="-mb-3 text-gray-600 col-span-2">
            Written by
            <NuxtLink
              :to="'/users/' + author"
              class="font-semibold underline"
              >{{ author }}</NuxtLink
            >
            on {{ new Date(surge.time_created).toLocaleDateString() }}
          </p>
          <button
            class="
              cursor-pointer
              text-red-800
              hover:text-red-900
              transform
              active:scale-105
              text-right
            "
          >
            Report
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    This surge does not exist. You might have typed it in incorrectly or are
    accessing a deleted surge.
  </div>
</template> 

<script>
export default {
  data() {
    return {
      surge: null,
      author: null,
      languageMap: {
        en: 'An English',
        fr: 'A French',
        es: 'A Spanish',
        de: 'A German',
      }
    };
  },
  head() {
    return {
      title: `${this.author !== null ? this.languageMap[this.surge.language_code] + ' surge by ' + this.author : 'Sentence not found'}`,
    };
  },
  async fetch() {
    let tester = /[A-Za-z0-9]{12}/;
    let id;
    try {
      id = this.$route.path.match(tester)[0];
    } catch (e) {
      id = "000000000000"; // impossible id
    }

    const response = await this.$axios.get(`/api/surges/get?id=${id}`);
    this.surge = response.data.surge;
    this.author = response.data.author;
  },
  computed: {
    cardTranslation() {
      switch (this.surge.language_code) {
        case "en":
          return "Card";
        case "de":
          return "Karte";
        case "fr":
          return "Carte";
        case "es":
          return "Tarjeta";
      }
    },
  },
  methods: {
    async upvoteSurge() {
      let tester = /[A-Za-z0-9]{12}/;
      let id = this.$route.path.match(tester)[0];
      if (this.$auth.loggedIn) {
        const response = await this.$axios.post(`/api/surges/upvote?id=${id}`);
        this.surge.upvotes = response.data.upvotes;
      }
    },
    async downvoteSurge() {
      let tester = /[A-Za-z0-9]{12}/;
      let id = this.$route.path.match(tester)[0];
      if (this.$auth.loggedIn) {
        const response = await this.$axios.post(
          `/api/surges/downvote?id=${id}`
        );
        this.surge.upvotes = response.data.upvotes;
      }
    },
  },
};
</script>
