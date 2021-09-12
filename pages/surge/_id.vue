<template>
  <div v-if="surge" class="w-full">
    <NuxtLink
      class="btn btn-ghost hover:bg-white ml-20 font-bold text-lg mb-3 normal-case"
      to="/"
    >
      <img src="/back-curved-arrow.svg" class="w-7" />
      <span class="pl-2">Back Home</span>
    </NuxtLink>
    <SurgeCard :surge="surge" :author="author" />
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
};
</script>
