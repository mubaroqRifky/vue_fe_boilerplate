<template lang="">
    <span :style="styles" :class="className">
        <svg
            :style="{ width, height }"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.6429 10.8571H10.8571V17.6429C10.8571 18.3893 10.2464 19 9.5 19C8.75357 19 8.14286 18.3893 8.14286 17.6429V10.8571H1.35714C0.610714 10.8571 0 10.2464 0 9.5C0 8.75357 0.610714 8.14286 1.35714 8.14286H8.14286V1.35714C8.14286 0.610714 8.75357 0 9.5 0C10.2464 0 10.8571 0.610714 10.8571 1.35714V8.14286H17.6429C18.3893 8.14286 19 8.75357 19 9.5C19 10.2464 18.3893 10.8571 17.6429 10.8571Z"
                fill="currentColor"
            />
        </svg>
    </span>
</template>
<script>
export default {
    props: ["width", "height", "styles", "className", "bold"],
};
</script>
<style lang=""></style>
