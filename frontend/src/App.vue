<template>
  <div>
    <component :is="$route.meta.layout || 'div'" />
  </div>
</template>