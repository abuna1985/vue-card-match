<template>
  <h1 :class="$style['title']">Vue Memory Game</h1>
  <!-- https://www.thisdot.co/blog/styling-vue-single-file-components#style-modules -->
  <section :class="$style.description">
    <p class="description__text">
      This is a camping themed card matching game!
    </p>
    <p :class="$style['powered-wrapper']" class="description__text">
      Powered by
      <a
        :class="$style['powered-link']"
        href="https://v3.vuejs.org/"
        target="_blank"
      >
        <img
          :class="$style['powered-logo']"
          src="assets/images/vue-logo.svg"
          alt="Vue.js logo"
        />
        Vue.js 3
      </a>
      <span>, </span>
      <a
        :class="$style['powered-link']"
        href="https://www.typescriptlang.org/docs/"
        target="_blank"
      >
        <img
          :class="$style['powered-logo']"
          src="assets/images/typescript-logo.svg"
          alt="TypeScript Logo"
        />
        TypeScript
      </a>
      <span> & </span>
      <a
        :class="$style['powered-link']"
        href="https://github.com/abuna1985/vue-memory-game"
        target="_blank"
      >
        <img
          :class="$style['powered-logo']"
          src="assets/images/github-logo.svg"
          alt="GitHub Logo"
        />
        GitHub</a
      >
    </p>
  </section>
</template>

<style module>
.title {
  font-size: 2rem;
  padding-bottom: 20px;
  padding-top: 10px;
  font-weight: bold;
}

.description__text {
  margin: 0;
  font-size: 1rem;
}

.description__text:last-child {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.powered-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.powered-link {
  color: #3d9970;
  padding: 0 5px;
}

.powered-link:first-child,
.powered-link:last-child {
  padding-right: 0;
}

.powered-logo {
  width: 18px;
}

@media screen and (min-width: 600px) {
  .title {
    padding-bottom: 10px;
    font-size: 2.5rem;
  }
}
</style>
