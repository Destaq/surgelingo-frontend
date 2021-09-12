<template>
  <header class="text-gray-600 body-font bg-base-200 border border-b shadow-lg">
    <div
      class="
        container
        mx-auto
        flex flex-wrap
        p-5
        flex-col
        md:flex-row
        items-center
      "
    >
      <NuxtLink
        to="/"
        class="
          flex
          title-font
          font-medium
          items-center
          text-gray-900
          mb-4
          md:mb-0
        "
      >
        <img src="/logo_transparent.svg" class="w-6" viewBox="0 0 24 24" />
        <span class="ml-3 text-xl">SurgeLingo</span>
      </NuxtLink>
      <nav
        class="
          md:mr-auto
          md:ml-4
          md:py-1
          md:pl-4
          flex flex-wrap
          items-center
          text-base
          justify-center
        "
        :class="$auth.loggedIn ? 'md:border-l md:border-gray-400' : ''"
      >
        <div v-if="$auth.loggedIn">
          <NuxtLink to="/write" class="mr-5 hover:text-gray-900"
            >Write Surge</NuxtLink
          >
          <NuxtLink to="/wordbank" class="mr-5 hover:text-gray-900"
            >Update Wordbank</NuxtLink
          >
          <NuxtLink to="/search" class="mr-5 hover:text-gray-900"
            >Search Surges</NuxtLink
          >
        </div>
      </nav>
      <div v-if="!$auth.loggedIn">
        <NuxtLink
          to="/register"
          class="inline-flex py-0 items-center btn btn-primary min-h-0 h-8 w-24"
        >
          Sign Up
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="
            md:ml-4
            inline-flex
            items-center
            btn btn-outline
            min-h-0
            h-8
            w-24
          "
        >
          Log In
        </NuxtLink>
      </div>
      <div class="dropdown dropdown-end mt-4 md:mt-0" v-else>
        <div class="avatar placeholder cursor-pointer" tabindex="0">
          <!-- change settings -->
          <div
            class="bg-neutral-focus text-neutral-content rounded-full w-8 h-8"
          >
            <span>{{ $auth.user[0].toUpperCase() }}</span>
          </div>
        </div>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <NuxtLink to="/profile" class="text-sm">Profile</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/settings" class="text-sm">Settings</NuxtLink>
          </li>
          <li class="text-sm text-red-700 cursor-pointer hover:bg-gray-200 rounded-lg" @click="logoutUser">
            <span>Sign Out</span>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      this.$auth.logout()
    }
  },
}
</script>
