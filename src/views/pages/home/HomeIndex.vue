<template lang="">
    <section class="flex gap-8 relative">
        <div class="flex-1">
            <h2 class="text-2xl font-bold">Introduction</h2>
            <p class="">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries
            </p>
            <hr class="border-gray my-6" />
            <div>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    vero quia molestias doloremque, non temporibus esse eveniet
                    ex, vel eligendi voluptates hic natus earum itaque,
                    repellendus veniam rem dolore quis.
                </p>
            </div>

            <hr class="border-gray my-6" />

            <h3 class="text-xl font-bold">Lorem, ipsum dolor.</h3>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Eveniet, dolor. Ea nihil soluta sapiente sunt at nisi delectus.
                Praesentium itaque veritatis magni aspernatur ab fugit in
                nostrum debitis quam labore.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                nihil saepe quaerat nobis, doloribus minus.
            </p>

            <hr class="border-gray my-6" />

            <h3 class="text-xl font-bold">Lorem, ipsum.</h3>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Eveniet, dolor. Ea nihil soluta sapiente sunt at nisi delectus.
                Praesentium itaque veritatis magni aspernatur ab fugit in
                nostrum debitis quam labore.
            </p>
        </div>

        <div
            class="py-4 max-w-[15rem] h-min max-h-5xl sticky top-[0rem] text-sm hidden md:block"
        >
            <h4 class="font-bold mb-4">On This Page</h4>
            <ul class="grid gap-2 content-start text-darkGray">
                <li>
                    <a href="#"> Lorem, ipsum dolor. </a>
                </li>
                <li>
                    <a href="#"> Lorem, ipsum. </a>
                </li>
                <li>
                    <a href="#"> Lorem ipsum dolor sit amet. </a>
                </li>
                <li>
                    <a href="#">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </a>
                </li>
                <li>
                    <a href="#"> Lorem ipsum dolor sit. </a>
                </li>
                <li>
                    <a href="#"> Lorem, ipsum. </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
p {
    @apply my-6 leading-6 text-darkGray text-sm;
}
</style>
