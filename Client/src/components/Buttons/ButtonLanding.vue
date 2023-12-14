<template>
  <button
    class="btn rounded-lg border text-center font-mono tracking-wider p-3 font-semibold text-3xl ov-btn-slide-left mt-7 bg-black"
  >
    <slot></slot>
  </button>
</template>


<style lang="scss" scoped>
button {
  color: var(--title);
  border: 3px var(--details) solid;
  border-radius: 2rem;
}
button {  
  text-shadow: 1px 1px 0.2rem #f8e007aa;
  transition: all .3s;
}


/* ESTILOS BOTÓN SLIDE LEFT */
.ov-btn-slide-left {
  position: absolute;
  bottom: -12rem;
  z-index: 100000;
  overflow: hidden;
  display: inline-block;
}
.ov-btn-slide-left:hover {
  color: #000; /* color de fuente hover */
  text-shadow: 1px 1px 0.2rem rgb(144, 144, 144),
    1px 1px 0.2rem rgb(144, 144, 144), 1px 1px 0.2rem rgb(144, 144, 144);
  box-shadow: 1px 1px 1rem var(--title);
}
.ov-btn-slide-left::after {
  content: "     ";
  background: var(--details); /* color de fondo hover */
  position: absolute;
  z-index: -1;
  display: block;
  top: 0;
  bottom: 0;
  left: -100%;
  right: 100%;
  border: 7px var(--details) solid;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
  border-radius: -2rem;
}
.ov-btn-slide-left:hover::after {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
  box-shadow: 1px 1px 3px var(--title);
}
</style>