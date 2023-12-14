<script setup>
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import { useAccessStore } from "../stores/userStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import FooterVue from "../components/Footer.vue";
const store = useAccessStore();
const router = useRouter();
onMounted(() => {
  if (!store.access) {
    router.push({ name: "login" });
  }
});
</script>
<template>

  <div class="--container-- flex flex-col justify-evenly m-auto items-center min-h-screen" v-if="store.access">
    <div class="ppal">
    <div class="flex flex-col text-title w-[80%] bg-container m-7 p-2 border border-border rounded-2xl">
      <h3 class="text-justify text-2xl">
        HenryMoon es un proyecto que busca proporcionar un espacio de relajación y distensión para los programadores. Su
        objetivo es ayudar a los estudiantes de SoyHenry a encontrar un equilibrio saludable entre el trabajo y el
        descanso para convertirse en programadores exitosos. HenryMoon simboliza la busqueda de la unión entre la paz
        mental y la relajación, invitando a dejar atrás las preocupaciones diarias y sumergirse en un universo donde todo
        es posible.

      </h3>

    </div>

    <h1 class="text-title text-center text-3xl mt-3 font-bold">DEVELOPERS</h1>
    <div class="--container-- m-3 p-2 flex flex-col md:flex-row">
      <div class="md:w-1/2  flex flex-col p-2 m-2">
        <div class=" m-1 border border-border  flex flex-col items-center md:flex-row rounded-2xl h-1/4">

          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container  p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/Aufer.svg" alt="Aufer" class="w-full h-full object-cover" />
            </div>

            <div class="md:w-2/3 m-2 bg-container text-title">

              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Aufer Victoriano Contreras Cáceres
                </h3>
                <p class="text-l m-3 text-justify">

                  Soy defensor del trabajo en equipo y la formación constante, me encanta crear algoritmos y la solución de problemas, siempre busco nuevos retos y ayudo quién lo necesite. Los videojuegos son mi pasión, la magia de dar vida a los pixeles es indescriptible.

                </p>
                <div class="iconos">
                  <a href="https://github.com/Aufervic" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/aufervic/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="border border-border m-1 flex flex-col items-center md:flex-row rounded-2xl h-1/4">

          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/Ernesto.svg" alt="Ernesto" class="w-full h-full object-cover" />
            </div>
            <div class="md:w-2/3 m-2 bg-container text-title">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Ernesto Jesús Aguirre Chama
                </h3>
                <p class="text-l m-3 text-justify">

                  Soy Full Stack Developer. Este mes estoy por sacar mi primer libro, donde cuento una historia personal y algunos escritos propios. Me caracterizo por ser muy sociable, me gusta trabajar en equipo ayudando a las personas a conseguir sus propios éxitos

                </p>
                <div class="iconos">
                  <a href="https://github.com/EAguirreChama" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/ernesto-aguirre-chama-a9a090269" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="border border-border m-1 flex flex-col items-center md:flex-row rounded-2xl h-1/4">
          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/Lienan.svg" alt="Lienan" class="w-full h-full object-cover" />

            </div>
            <div class="md:w-2/3 m-2 bg-container text-title">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Lienan Manuel Wisner
                </h3>
                <p class="text-l m-3 text-justify">

                  Soy de Argentina, tengo 23 años, soy una persona muy curiosa y me encanta aprender todo lo que pueda. 
Me encanta trabajar tanto solo como en equipo y poder llevar a cabo objetivos que sean propuestos para un fin en común. 🤗


                </p>
                <div class="iconos">
                  <a href="https://github.com/LienanWisner" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/lienanwisner/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-border m-1 flex flex-col items-center md:flex-row rounded-2xl h-1/4">
          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/johan.svg" alt="Johan" class="w-full h-full object-cover" />

            </div>
            <div class="md:w-2/3 m-2 bg-container text-title">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Johan Fabian Arciniegas Fajardo
                </h3>
                <p class="text-l m-3 text-justify">

                  Desarrollador Full-Stack con experiencia en metodologías ágiles como SCRUM y herramientas como GIT. Conocimientos en REACT, CSS frameworks y Vue.JS. Mi experiencia como ingeniero electrónico me ha permitido trabajar en equipo y adquirir habilidades operativas y técnicas.
                 </p>

                <div class="iconos">
                  <a href="https://github.com/JFFajardo" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/johan-arciniegas-fajardo-81500511a/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/2 flex flex-col p-2 m-2">

        <div class="border border-border m-1 flex flex-col items-center md:flex-row rounded-2xl h-1/4">

          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/camilo.svg" alt="Camilo" class="w-full h-full object-cover" />
            </div>
            <div class="md:w-2/3 m-2 bg-container text-title">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Camilo Agudelo Betancur
                </h3>
                <p class="text-l m-3 text-justify">

                  Colombiano, estudiante de Desarrollo Web Full Stack, en Henry; tengo preferencia por el Front-End, pero para este proyecto me centré más en el Back-End. Agradecido con mi equipo y esta oportunidad de trabajar en equipo y demostrar nuestro potencial.

                </p>
                <div class="iconos">
                  <a href="https://github.com/CAgudeloBetancur" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/camilo-agudelo-betancur/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-border m-1 flex flex-col items-center md:flex-row rounded-2xl h-1/4">

          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/Jairo.svg" alt="Jairo" class="w-full h-full object-cover" />
            </div>
            <div class="md:w-2/3 m-2 bg-container text-title">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Jairo David Holgado
                </h3>
                <p class="text-l m-3 text-justify">

                  Comencé a interesarme por la tecnología a los 14 años con mi primer dispositivo móvil. Desarrollé mi primera página web con HTML, CSS y JS en un emulador de Linux para dispositivos móviles. Desde entonces, no he dejado de aprender sobre programación.

                </p>
                <div class="iconos">
                  <a href="https://github.com/HolgadoJairoDavid" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/jairo-holgado-a28589261" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="border border-border m-1 flex flex-col items-center md:flex-row rounded-2xl h-1/4">

          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/jose.svg" alt="Jose" class="w-full h-full object-cover" />
            </div>
            <div class="md:w-2/3 m-2 bg-container text-title">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Jose Antonio Lopez Rocha
                </h3>
                <p class="text-l m-3 text-justify">

                  Soy estudiante de 9no semestre ingeniería electrónica y full stack developer, he aprendido de manera empírica el diseño gráfico, me gusta aportar ideas nuevas y ayudar a todos para que puedan completar sus metas.

                </p>
                <div class="iconos">
                  <a href="https://github.com/joselopez25" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/jose-lopez-rocha-61b5581b0/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-border m-1 flex flex-col items-center md:flex-row rounded-2xl h-1/4">

          <div class="flex flex-col justify-evenly items-center md:flex-row bg-container p-2 m-2 rounded-2xl">
            <div
              class="border border-border w-[200px] h-[200px] bg-white flex items-center justify-center rounded-full  overflow-hidden">
              <img src="../assets/img/Nico.svg" alt="Nico" class="w-full h-full object-cover" />
            </div>
            <div class="md:w-2/3 m-2 bg-container text-title">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Nicolas Dario Suarez
                </h3>
                <p class="text-l m-3 text-justify">

                  Full Stack Web Developer y Técnico Electrónico con amplias habilidades blandas. Apasionado por la creación de soluciones tecnológicas innovadoras.
Mi enfoque es el trabajo en equipo, la comunicación efectiva y la resolución de problemas para adaptarme rapidamente a todos los desafios.

                </p>
                <div class="iconos">
                  <a href="https://github.com/Nicosu99" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/nicol%C3%A1s-suarez-4869201ba/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <FooterVue />
</template>


<style lang="scss" scoped>


.ppal{
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .--container-- {
    position: relative;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .--container-- {
    flex-direction: column;
  }
}

.containerNombreImagen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: min-content;
  padding: 2px;
  width: 100%;

}

.iconos {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 5px;
  width: 70%;
  align-items: center;
}

.github-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  border: solid 1px var(--border);
}

.linkedin-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  border: solid 1px var(--border);
}

.linkedin-picture:hover{
  border: solid 1px var(--title);

}
.github-picture:hover{
  border: solid 1px var(--title);
}


.github-picture {
  background-image: url('../assets/img/Logo\ GitHub.png');
}

.linkedin-picture {
  background-image: url('../assets/img/Logo\ Linkdin.png');
}
</style>
