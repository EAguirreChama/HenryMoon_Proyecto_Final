# Proyecto_Final
HenryMoon

Integrantes
~ Los 8 de la Daianeta ~

- Aufer Victoriano Contreras Cáceres.
- Camilo Agudelo Betancur.
- Ernesto Aguirre.
- Jairo David Holgado.
- Johan Fajardo.
- José López.
- Lienan Wisner.
- Nicolás Suárez.

COMENATARIOS Y VARIABLES EN INGLÉS

En el presente documento, se detallarán la descripción, objetivos y herramientas que se utilizarán en la realización del pertinente proyecto final, según correspondiera a la última instancia del cursado de la carrera Full Stack Developer, llevado a cabo en el bootcamp de Henry.  

Nombre del proyecto: HenryMoon.

“La luna del planeta Henry”.

El nombre HenryMoon, surge de la idea de complementar el planeta Henry. De hecho, se subdivide en dos palabras específicas: Henry, por ser nuestro lugar de transformación tecnológica y por ser el cuerpo celeste imaginario de contención, y Moon, que en español se traduce como Luna. Este astro ficticio, se concibió como un sitio de escape y distensión, un espacio en el que las preocupaciones de código quedan atrás y se puede disfrutar de paz y tranquilidad. 

La idea detrás de HenryMoon es precisamente esa: salir del planeta para distenderse. Puesto que, en el mundo de la programación, la importancia de la relajación no puede ser subestimada. Aunque es fácil caer en la trampa de pensar que la solución a un problema radica en pasar más tiempo frente a la computadora, esto no siempre es cierto. De hecho, muchos programadores han descubierto que tomarse un tiempo para relajarse y desconectar puede ser la clave para encontrar la solución más efectiva. Por ende, saber hallar un equilibrio saludable entre el trabajo y el descanso, es de suma importancia para dicho rubro. Es por esto que en HenryMoon, estamos comprometidos a ayudar a los nuevos estudiantes a alcanzar ese equilibrio y a convertirse en los programadores más exitosos posibles.

En este sentido, HenryMoon se convierte en un símbolo de la búsqueda de la relajación, unión y paz mental. Es una invitación a dejar atrás las preocupaciones diarias, explorar nuevos horizontes y a sumergirse en un universo en el que todo es posible. En definitiva, HenryMoon es una muestra más de la necesidad que tenemos los seres humanos de encontrar un espacio de comunicación y distensión. 
 
Descripción del proyecto: HenryMoon es una aplicación web que combina características de una plataforma de videojuegos, interacción entre usuarios y soluciones para resolver problemáticas en los ámbitos de SUP y Pair Review en el Bootcamp de Henry. Como estudiantes, identificamos falencias en la toma de asistencia, integración inmediata en los SUP y terciarización de actividades recreativas. Por eso, creamos HenryMoon como una forma de abordar estas cuestiones a través del entretenimiento, elemento clave en la motivación humana.

HenryMoon permite a los usuarios registrarse y loguearse según las circunstancias lo ameriten. Los usuarios pueden interactuar con un bot para realizar consultas en tiempo real y tomar asistencia tanto en el Pair Review como durante los SUP. Esto es de gran ayuda para los TA en el staff de Henry, ya que la centralización de las labores mencionadas impactará directamente en la automatización de tareas correspondientes.

Además, la página cuenta con videojuegos elaborados por el equipo para distenderse luego de largas horas de código. Los usuarios con acceso al panel de administrador pueden cargar juegos, configurar la privacidad de una sala y acceder a los datos de asistencia de los estudiantes.

Es importante destacar que esta descripción es solo un pantallazo del proyecto HenryMoon.
  

Requisitos tech: 

Requisitos tech	¿Cómo lo aplicarán? (Idea boceto)

Deploy=	Para lograr una mayor eficiencia, HenryMoon estará desplegada en dos plataformas diferentes. La base de datos y el Back End se alojarán en Railway, mientras que la parte del Front End se encontrará en Vercel. De esta manera, se garantiza una mayor estabilidad y un mejor rendimiento de la aplicación en su conjunto.
<br>
<br>
Auth de terceros integrada=	Nuestros usuarios tendrán la opción de registrarse e iniciar sesión en la aplicación de manera local o a través de servicios de terceros como Google, Github y Linkedin. Para lograr esta integración, utilizaremos tecnologías que nos permitan ofrecer una experiencia de usuario fluida y segura.
<br>
<br>
Pasarela de pagos =	Las tecnologías a utilizar, serán mercadopago y paypal. Estas herramientas brindarán la capacidad de generar pagos de manera efectiva y segura, para mejorar avatares y/o skins en los distintos videojuegos, que se desarrollen en este proyecto. 
Filtros combinados	En la sección de descripción se mencionó que los usuarios con acceso al panel de administrador podrán añadir juegos. Por esta razón, es importante que los demás usuarios puedan ordenarlos por valoración, nombre y filtrarlos por creadores u otros criterios que se puedan combinar de manera efectiva.
<br>
<br>
Cloudinary/upload/bucket =	La aplicación generará tráfico de imágenes y videos, como en la creación de avatares, perfiles de usuarios o en los juegos mismos, donde se necesitarán imágenes personalizadas. Para manejar esta situación, se utilizará el servicio de gestión de imágenes y videos en la nube, Cloudinary. Esta plataforma permite almacenar, manipular y entregar medios digitales, lo que optimizará, transformará y entregará imágenes en el sitio web. Además, en caso de que debamos utilizar archivos digitales pesados que ralenticen el proceso de carga de la página, se hará uso del formato WebP desarrollado por Google. El cual ofrece una compresión más eficiente que JPEG y PNG, con una calidad de imagen similar.
<br>
<br>
Local storage/persist =	Durante la estadía de los usuarios en nuestra aplicación web, será necesario implementar la persistencia de datos. Esto incluye almacenar sus preferencias, skins de uso diario y configuraciones de juegos utilizadas comúnmente.
<br>
<br>
Reviews/puntuación =	Los usuarios podrán dejar comentarios y puntuar su experiencia en un juego específico. Esta información se utilizará para la herramienta de filtros combinados.
<br>
<br>
Dashboard admin	=HenryMoon contará con un panel de administrador para el rol de TA, desde el cual se podrá acceder a todas las funcionalidades previstas. Estas incluyen la gestión de usuarios, la carga de nuevos juegos y el seguimiento en tiempo real de los datos de asistencia de los estudiantes, entre otras acciones. Este apartado está dirigido especialmente a los miembros del staff de Henry que ocupan el cargo de TA, ya que son las personas que están en contacto directo con los alumnos durante el cursado del bootcamp.
<br>
<br>
Notificaciones (mail/socket.io)=	Al registrarse o darse de baja, el usuario recibirá notificaciones o correos electrónicos informándole sobre sus acciones. También se enviarán notificaciones por correo electrónico después de realizar un pago. Además, se utilizará un chat en tiempo real para resolver dudas, que se implementará mediante Socket.io.
Borrado lógico	En HenryMoon, se utilizará la práctica de desactivar y activar registros y roles. De esta manera, cuando se elimine un usuario, sus registros permanecerán en nuestra base de datos.
<br>
<br>
Ideas extras de funcionalidad (si las hay):

Dark Mode.
Diseño responsive.
Un chat general para todos los estudiantes de una cohorte.
Descuentos de skins.
Un apartado de contacto.
Apartado de preguntas frecuentes. 

User Stories:
Deploy:
Como usuario, quiero poder acceder al sitio web de HenryMoon en cualquier momento para obtener información actualizada sobre los servicios y productos ofrecidos.
Como usuario, quiero que la página web de HenryMoon se cargue rápidamente y sea fácil de navegar para una experiencia de usuario óptima.
Como actual TA en el staff de Henry, quiero que el sitio web de HenryMoon se aloje en dos plataformas diferentes para garantizar una mayor eficiencia y un tiempo de actividad óptimo.



Auth de terceros integrada:
Como usuario, quiero poder registrarme y acceder a la aplicación de forma rápida y fácil utilizando mi cuenta de Google, Github o Linkedin para evitar tener que crear una nueva cuenta y recordar otra contraseña.
Como usuario, quiero que mi información personal se mantenga segura y protegida al utilizar una cuenta de terceros para registrarme y acceder a la aplicación.


Pasarela de pagos:
Como usuario, quiero poder comprar mejoras para mi avatar y/o skins en los videojuegos que se desarrollen en el proyecto utilizando MercadoPago o PayPal para una experiencia de compra segura y sin problemas.
Como usuario, quiero que el proceso de compra sea fácil de entender y no requiera demasiados pasos para completar la transacción.


Filtros combinados:
Como usuario, quiero poder ordenar los juegos por valoración y por nombre para encontrar fácilmente los juegos de mi interés.
Como usuario, quiero poder filtrar los juegos por creadores u otros criterios para encontrar juegos que cumplan con mis preferencias y requisitos específicos.
Como usuario, quiero que los criterios de ordenamiento y filtrado puedan combinarse de forma efectiva para obtener resultados precisos y relevantes.
Como actual TA en el staff de Henry, quiero que los estudiantes puedan acceder a una lista completa de juegos y ordenarlos y/o filtrarlos de manera efectiva para mejorar la experiencia del usuario.

Cloudinary/upload/bucket:
Como usuario, quiero poder crear avatares y perfiles personalizados en la aplicación utilizando imágenes y videos de alta calidad.
Como usuario, quiero que el proceso de carga de imágenes y videos sea rápido y eficiente para mejorar la experiencia del usuario al utilizar la aplicación.


Local storage/persist:
Como usuario, quiero que mis preferencias, skins de uso diario y configuraciones de juegos utilizadas comúnmente se almacenen en la aplicación para que pueda acceder a ellas fácilmente.
Como usuario, quiero que mis datos se almacenen de forma segura y protegida para garantizar la privacidad y seguridad de mi información personal.


Reviews/puntuación:
Como usuario, quiero poder dejar mis comentarios y puntuaciones sobre un juego específico para compartir mi experiencia con otros usuarios.
Como usuario, quiero que mis comentarios y puntuaciones sean tomados en cuenta para la herramienta de los filtros combinados para mejorar la experiencia de usuario al utilizar la aplicación.


Dashborad admin:
Como actual TA en el staff de Henry, quiero poder acceder al panel de administrador para gestionar usuarios, cargar nuevos juegos y conocer los datos de asistencia de los estudiantes en tiempo real.
Como actual TA en el staff de Henry, quiero que el panel de administrador sea fácil de usar y que me permita realizar todas las acciones necesarias para el buen funcionamiento del bootcamp.


Notificaciones (mail/socket.io):
Como usuario, quiero recibir notificaciones o correos electrónicos al registrarme y darme de baja en la aplicación para estar informado de mis acciones.
Como usuario, quiero recibir notificaciones o correos electrónicos al realizar un pago en la aplicación para estar informado sobre mi transacción.
Como usuario, quiero poder utilizar un chat de tiempo real para resolver dudas en tiempo real.

Borrado lógico:
Como administrador de la aplicación, quiero poder desactivar y activar registros y/o roles de usuarios para mejorar la gestión de la base de datos.
Como administrador de la aplicación, quiero que los registros de los usuarios se mantengan en la base de datos, aunque sean desactivados para poder acceder a ellos en caso de ser necesario.
