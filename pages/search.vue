<template>
  <div class="pt-6 form-control">
    <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-x-2">
      <div>
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="SurgeOfficial"
          class="input input-bordered"
          v-model="username"
        />
      </div>
      <div>
        <label class="label label-text">Language</label>
        <select class="select select select-bordered w-full" v-model="language">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div>
        <label class="label">
          <span class="label-text">Tag</span>
        </label>
        <input
          type="text"
          placeholder="neuroscience"
          class="input input-bordered"
          v-model="tag"
        />
      </div>
      <div>
        <label class="label">
          <span class="label-text">Contents</span>
        </label>
        <input
          type="text"
          placeholder="rapidly"
          class="input input-bordered"
          v-model="contents"
        />
      </div>
    </div>
    <button
      class="btn-info btn w-full md:w-40 mt-4 md:mt-2 min-h-0 h-10 mx-auto"
      @click="detailedSurgeSearch"
    >
      Search
    </button>
    <hr class="my-6" />
    <SurgeCard
      v-for="surge in surges"
      :key="surge.route_link"
      :surge="surge"
      :author="surge.author"
      class="w-full px-4 md:px-10 lg:px-28 my-2"
    />
    <button v-if="surges.length > 0" class="btn btn-primary mx-auto w-full mt-6" @click="appendDetailedSurgeSearch">
      Load More
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      language: "es",
      tag: "",
      contents: "",
      surges: [],
    };
  },
  head() {
    return {
      title: "Search Sentences",
    };
  },
  methods: {
    async detailedSurgeSearch() {
      const response = await this.$axios.get(
        `/api/surges/detailed-search?language_code=${this.language}&username=${
          this.username !== "" ? this.username : "null"
        }&tag=${this.tag !== "" ? this.tag : "null"}&contents=${
          this.contents !== "" ? this.contents : "null"
        }`,
        {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        }
      );
      this.surges = response.data.surges;
    },
    async appendDetailedSurgeSearch() {
      const response = await this.$axios.get(
        `/api/surges/detailed-search?language_code=${this.language}&username=${
          this.username !== "" ? this.username : "null"
        }&tag=${this.tag !== "" ? this.tag : "null"}&contents=${
          this.contents !== "" ? this.contents : "null"
        }&alreadyShown=${this.surges.map((el) => el.route_link)}`,
        {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        }
      );
      for (const surge of response.data.surges) {
        this.surges.push(surge);
      }
      console.log(this.surges)
    },
  },
};
</script>
