<template>
  <div v-if="surge">Page for a surge. {{ surge }}</div>
  <div v-else>This surge does not exist.</div>
</template>

<script>
export default {
  data() {
    return {
      surge: null,
    };
  },
  head() {
    return {
      title: "working on it",
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
  },
};
</script>
