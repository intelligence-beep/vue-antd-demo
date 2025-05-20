<template>
  <router-view></router-view>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --primary-color: #1890ff;
}

.text-primary {
  color: var(--primary-color);
}

.bg-primary {
  background-color: var(--primary-color);
}

.rounded-button {
  border-radius: 4px;
}
</style> 