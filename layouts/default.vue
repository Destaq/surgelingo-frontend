<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader class="sticky top-0 z-50" />
    <Nuxt class="flex-grow px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl mb-4 mt-2" />
    <TheFooter />
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        "data-theme": "light",
      }
    }
  }
}
</script>
