<template>
  <header class="text-gray-600 body-font bg-base-200">
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
        <img
          src="/logo_transparent.svg"
          class="w-8"
          viewBox="0 0 24 24"
        />
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
            >Write a Post</NuxtLink
          >
          <NuxtLink to="/top-posts" class="mr-5 hover:text-gray-900"
            >Top Posts</NuxtLink
          >
        </div>
      </nav>
      <NuxtLink
        to="/register"
        class="inline-flex py-0 items-center btn btn-primary min-h-0 h-8 w-24"
      >
        Sign Up
      </NuxtLink>
      <NuxtLink
        to="/login"
        class="md:ml-4 inline-flex items-center btn btn-outline min-h-0 h-8 w-24"
      >
        Log In
      </NuxtLink>
    </div>
  </header>
</template>
