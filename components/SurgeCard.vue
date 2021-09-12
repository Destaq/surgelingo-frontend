<template>
  <div class="card bg-white card-side border shadow-lg w-full mx-auto">
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
      <h2 class="text-md font-normal mx-auto relative w-full mb-4">
        <span class="mr-3">By
          <NuxtLink :to="'/users/' + author" class="font-semibold underline">{{
            author
          }}</NuxtLink></span>
          <span class="mx-0.5 text-yellow-500 font-light" v-for="tag in surge.tags" :key="tag">#{{ tag }}</span>
        <div class="badge badge-primary absolute right-4">
          {{ surge.language_code }}
        </div>
      </h2>
      <p class="min-h-6">
        {{ surge.content.charAt(0).toUpperCase() + surge.content.slice(1) }}
      </p>
      <hr class="w-full mx-auto my-3" />
      <div class="grid grid-cols-3">
        <p class="text-gray-600 my-auto">
         {{ new Date(surge.time_created).toLocaleDateString() }}
        </p>
        <button class="btn btn-success btn-sm">Mark Known</button>
        <button
          class="
            cursor-pointer
            text-red-800
            hover:text-red-900
            transform
            active:scale-105
            text-right
            my-auto
          "
        >
          Report
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["surge", "author"]
}
</script>
