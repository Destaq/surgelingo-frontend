<template>
  <div>
    <h1 class="text-2xl font-bold mt-2 mx-auto w-full text-center">
      Personal Wordbank
    </h1>
    <p class="font-light mt-3">
      You can update the list of words you know here manually by:
    </p>
    <ul class="font-light list-disc ml-8 mt-1">
      <li>Typing in and submitting words</li>
      <!-- TODO -->
      <li>Uploading a file (coming soon)</li>
      <li>Estimating the number of words you know (coming soon)</li>
    </ul>
    <p class="font-light mt-1">If you have a high level of known vocabulary, <a href="https://github.com/hermitdave/FrequencyWords/tree/master/content/2018" class="link text-yellow-500 hover:text-yellow-700 underline">find</a> a pre-existing frequency list, format it, and paste it in.</p>
    <label class="label label-text mt-4">Language being updated</label>
    <select class="select select-sm select-bordered w-full" v-model="language">
      <option value="en">English</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="es">Spanish</option>
    </select>
    <hr class="my-3" />
    <div class="flex flex-col w-full">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Known words (newline-seperated)</span>
        </label>
        <textarea
          class="textarea h-32 textarea-bordered"
          placeholder="Word..."
          v-model="userAddedWords"
        ></textarea>
        <button
          class="btn btn-primary h-10 min-h-0 w-full mt-2"
          @click="submitWords"
        >
          Submit
        </button>
      </div>
      <div class="divider">OR</div>

      <form
        data-single="true"
        action="/file-upload"
        class="p-1 flex border-2 h-32 border-gray-200 border-dashed"
      >
        <div
          class="dz-message mx-auto my-auto align-middle cursor-pointer"
          data-dz-message
          @click="$refs.fileInput.click()"
        >
          <div class="text-lg font-medium mx-auto text-center">
            Drop files here or click to upload.
          </div>
          <div class="mx-auto text-center text-gray-500">
            Maximum file size 5MB. Newline-seperated.
          </div>
          <input class="hidden" ref="fileInput" type="file" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "wordbank",
  data() {
    return {
      userAddedWords: "",
      language: "es"
    };
  },
  head() {
    return {
      title: "Personal Wordbank",
    };
  },
  middleware: "auth",
  methods: {
    async submitWords() {
      await this.$axios.post(
        "/api/actions/edit-wordbank",
        {
          wordbank: this.userAddedWords,
          language_code: this.language
        },
        {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
            // "Content-Type": "application/x-www-form-urlencoded"
          },
        }
      );
      this.$router.push("/");
    },
  },
};
</script>
