<template>
  <div class="w-full mt-8 md:w-3/4 lg:w-5/12 2xl:w-1/3 items-center">
    <div class="form-control bg-base-200 px-5 py-12">
      <div class="alert alert-error py-2 mb-4 -mt-2" v-if="this.errorMessage">
        <div class="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-6 h-6 mx-2 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
          </svg>
          <label>{{ errorMessage }}</label>
        </div>
      </div>
      <div class="relative form-control">
        <select
          class="select select-bordered w-full max-w-xs"
          v-model="language"
        >
          <option disabled="disabled" selected="selected">Language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div class="relative mt-4 form-control">
        <label class="label-text mb-2">Tags (comma-seperated, optional)</label>
        <input
          type="text"
          placeholder="funny, history, short"
          class="input input-bordered"
          v-model="tags"
        />
      </div>
      <div class="flex flex-wrap mt-4 mb-6 -mx-3">
        <div class="w-full px-3 form-control">
          <label class="label-text mb-2" for="description">
            Surge Content
            <span
              :class="content.length > 180 ? 'text-error' : 'text-gray-500'"
              >{{ content.length + "/200" }}</span
            >
          </label>
          <textarea
            class="textarea h-24 textarea-bordered"
            placeholder="Something amazing..."
            v-model="content"
          ></textarea>
        </div>
      </div>
      <div class="flex items-center w-full pt-4">
        <button
          class="
            w-full
            py-3
            text-base text-white
            transition
            duration-500
            ease-in-out
            transform
            bg-blue-600
            border-blue-600
            rounded-md
            focus:shadow-outline
            focus:outline-none
            focus:ring-2
            ring-offset-current ring-offset-2
            hover:bg-blue-800
          "
          @click="submitSurge"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      language: "Language",
      tags: "",
      content: "",
      errorMessage: "",
    };
  },
  head() { 
    return {
      title: "Write Surge",
    };
  },
  methods: {
    async submitSurge() {
      if (this.content.length <= 200 && this.language !== "Language") {
        await this.$axios
          .post("/api/surges/create", {
            language_code: this.language,
            tags: this.tags,
            content: this.content,
          }, {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            }
          })
          .then((response) => {
            // redirect to the post location
            this.$router.push(`/surge/${response.data.route_link}`)
          });
      } else {
        this.errorMessage = "Please fill out all fields.";
      }
    },
  },
};
</script>
