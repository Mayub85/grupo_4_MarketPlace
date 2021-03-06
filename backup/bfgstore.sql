-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-02-2021 a las 23:44:36
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bfgstore`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=big5;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'MICROSOFT', NULL, NULL, NULL),
(2, 'SONY', NULL, NULL, NULL),
(3, 'NINTENDO', NULL, NULL, NULL),
(4, 'LOGITECH', NULL, NULL, NULL),
(5, 'RED DRAGON', NULL, NULL, NULL),
(6, 'KINGSTON', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Argentina', NULL, NULL, NULL),
(2, 'Brasil', NULL, NULL, NULL),
(3, 'México', NULL, NULL, NULL),
(4, 'Chile', NULL, NULL, NULL),
(5, 'Perú', NULL, NULL, NULL),
(6, 'Bolivia', NULL, NULL, NULL),
(7, 'Uruguay', NULL, NULL, NULL),
(8, 'Paraguay', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `ShortDescription` text CHARACTER SET utf8 NOT NULL,
  `LargeDescription` longtext CHARACTER SET utf8 DEFAULT NULL,
  `Specs` longtext CHARACTER SET utf8 DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Images` varchar(500) DEFAULT NULL,
  `ProductType` int(11) NOT NULL,
  `ProductState` int(11) DEFAULT NULL,
  `Brand` int(11) DEFAULT NULL,
  `Code` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=big5;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `ShortDescription`, `LargeDescription`, `Specs`, `Price`, `Images`, `ProductType`, `ProductState`, `Brand`, `Code`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Xbox Series X', 'La nueva XBOX SERIES X. Más rápida. Más poderosa.', 'Especificaciones técnicas CPU: 8x Núcleos - 3.8 GHz (3.66 GHz w/ SMT) Zen 2 CPU Personalizada GPU: 12 TFLOPS, 52 CUs - 1.825 GHz RDNA 2 GPU Personalizada Tamaño de la pastilla: 360.45 mm2 Procesador: 7nm Mejorado Memoria: 16 GB GDDR6 w/ 320mb bus Ancho de banda de memoria: 10GB - 560 GB/s, 6GB - 336 GB/s Disco duro: 1 TB NVME SSD Personalizado Rendimiento de I/O: 2.4 GB/s (Raw), 4.8 GB/s (Comprimido con hardware personalizado de descompresión de bloqueo) Almacenamiento ampliable: 1 TB Tarjeta de Expansión Almacenamiento exerno: USB 3.2, permite HDD externo Lector óptico: 4K UHD Blu-Ray Drive Objetivo de rendimiento: 4K - 60 FPS, Up to 120 FPS', '\"Con Wi-Fi: Sí\",\"Tipo de consola: De sobremesa\",\"Incluye controles: Sí\",\"Cantidad de controles incluidos: 1\",\"Conectividad de los controles: Inalámbrico\",\"Tipos de memoria: GDDR6\",\"Resolución máxima de salida de video: 7680 px x 4320 px\",\"Cantidad de núcleos de CPU: 8\",\"Velocidad del procesador: 3.8 GHz\",\"Formatos de juegos: Ultra HD Blu-ray,Blu-ray,DVD,Digital\",\"Con HDMI: Sí\",\"Con USB: Sí\",\"Accesorios incluidos: 1 cable HDMI\",\"Incluye juegos: Sí\",\"Peso: 4.445 kg\",\"Altura x Ancho x Profundidad: 301 mm x 151 mm x 151 mm\"', '99999.99', '[\"sgames1.jpg\"]', 1, 2, 1, 303456, NULL, NULL, NULL),
(2, 'Xbox Series S', 'Descubre Xbox Series S, rendimiento de próxima generación en nuestra consola Xbox más pequeña jamás creada.', 'Con un nuevo diseño compacto en Robot White, Xbox Series S es la consola Xbox más pequeña jamás creada, concebida para adaptarse fácilmente a tu hogar y estilo de vida. Xbox Series S también es ideal si recién te integras al mundo digital y quieres llevar tus juegos favoritos a todas partes. Xbox Series S incluye nuestro nuevo control inalámbrico de Xbox, también en Robot White. También podrás adquirir este control de manera independiente en Holiday e incluye las mismas funciones que hemos detallado hasta la fecha, con un diseño ergonómico mejorado, un D-pad híbrido, agarre texturizado en los gatillos, botones superiores y diseño de la parte posterior, así como el nuevo botón para Compartir.Xbox Series S ofrece un salto gigantesco en el rendimiento generacionalXbox Series S ofrece la misma velocidad y rendimiento de próxima generación que definen a la consola Xbox Series X. Su CPU es similar y tiene el mismo rendimiento de E/S que Xbox Series X, lo que les facilita a los desarrolladores ofrecer el mismo gran rendimiento, mientras renderiza a una resolución más baja. Xbox Series S ofrece 4 veces la potencia de procesamiento de un Xbox One y admite experiencias de hasta 120 fps, un gameplay más inmersivo y receptivo con soporte para trazado de rayos DirectX acelerado por hardware y sombreado de velocidad variable. Además, Xbox Series S incluye 512 GB de almacenamiento, SSD personalizada y funciona con la Arquitectura de velocidad de Xbox, que ofrece más de 40 veces el ancho de banda de E/S de un Xbox One, lo que se traduce en tiempos de carga más rápidos, velocidades de cuadro más estables y la funcionalidad Quick Resume para varios juegos.También experimentarás el mismo excelente audio en Xbox Series S que en Xbox Series X gracias a la función Spatial Sound, compatible con Dolby Atmos.La principal diferencia entre Xbox Series X y Xbox Series S está en la resolución. Al hablar con nuestros usuarios, descubrimos que muchos de nuestros fans priorizan la velocidad de fotogramas sobre la resolución, por lo que queríamos crear una consola que no requiriera una pantalla 4K. Xbox Series S ofrece aproximadamente un rendimiento de GPU 3 veces superior a Xbox One y fue diseñado para reproducir juegos a 1440p a 60 fps, con soporte para hasta 120 fps. Con la eficiencia superior que nos brinda la arquitectura de gráficos AMD RDNA 2 de próxima generación más los multiplicadores de memoria virtual habilitados a través de la Arquitectura de velocidad de Xbox, Xbox Series S ofrecerá rendimiento y experiencias mucho más allá de las especificaciones básicas. Además, Xbox Series X y Xbox Series S comparten el mismo entorno de desarrollo, herramientas y capacidades, lo que les permitirá a los desarrolladores crear y publicar su contenido en ambas consolas con mayor facilidad, al mismo tiempo que aprovechan las capacidades de hardware únicas de la próxima generación.Acceso a increíbles títulos de nuestros socios y de Xbox Game StudiosCon Xbox Series X y Xbox Series S, podrás disfrutar miles de títulos digitales en cuatro generaciones de juegos y llevar tus accesorios de juego Xbox One contigo. Cuando veas un juego de Xbox compatible en la tienda digital, ya sea de Xbox original, Xbox 360, Xbox One o un título de próxima generación, podrás comprarlo y jugarlo en Xbox Series X o Xbox Series S.Ahora, con Xbox Series S combinado con Xbox Game Pass, nunca había sido tan fácil unirse a la familia Xbox. Con Xbox Game Pass, tendrás acceso instantáneo a la red multijugador en línea y a una biblioteca digital de más de 100 increíbles juegos de alta calidad, incluidos todos los títulos de Xbox Game Studios el mismo día de su lanzamiento. Además, a partir de Holiday, los miembros de Xbox Game Pass Ultimate y PC obtendrán una membresía EA Play sin costo adicional. Esto significa que los miembros de Xbox Game Pass tendrán acceso a más de 60 de los mejores y más grandes títulos de consola y de PC de EA como FIFA 20, Titanfall 2 y Need for Speed ??Heat, así como a títulos de algunas de las franquicias más populares de EA como Battlefield, Mass Effect, Skate y The Sims.Además, los juegos creados para la próxima generación serán optimizados para Xbox Series X y Xbox Series S. Los títulos con soporte para Smart Delivery detectarán automáticamente en qué dispositivo estás jugando, ya sea Xbox Series S, Xbox Series X o Xbox One, para ofrecerte la mejor versión del juego disponible. De esta manera, te garantizamos que solo tendrás que comprar tus juegos favoritos una vez.Al igual que Xbox Series X, Xbox Series S admite una tarjeta de expansión de almacenamiento Seagate, con la que podrás agregar 1TB de almacenamiento adicional con la velocidad y rendimiento completos de la Arquitectura de velocidad de Xbox. Si bien los títulos de Xbox de la generación anterior aún se pueden reproducir directamente desde tus discos duros externos USB 3.1, si quieres recibir todos los beneficios de la Arquitectura de velocidad de Xbox y un rendimiento óptimo, los juegos Optimizados para Xbox Series S y Xbox Series X deberán jugarse desde la SSD interna personalizada o desde una tarjeta de expansión de almacenamiento Seagate.Ya sea que quieras actualizar tu Xbox 360, Xbox One o recién te integres a la familia de Xbox, tenemos dos excelentes consolas de esta generación para elegir: Xbox Series X, la consola más poderosa jamás creada, y Xbox Series S, la consola de próxima generación más pequeña y asequible. En nombre de todo el equipo de Xbox, queremos agradecerte por hacer de Xbox el mejor lugar para jugar', '\"Tipo de consola: De sobremesa\",\"Incluye controles: Sí\",\"Cantidad de controles incluidos: 1\",\"Conectividad de los controles: Inalámbrico\",\"Tipos de memoria: GDDR6\",\"Resolución máxima de salida de video: 7680 px x 4320 px\",\"Cantidad de núcleos de CPU: 8\",\"Velocidad del procesador: 3.8 GHz\",\"Formatos de juegos: Ultra HD Blu-ray,Blu-ray,DVD,Digital\",\"Con HDMI: Sí\",\"Con USB: Sí\",\"Accesorios incluidos: 1 cable HDMI\",\"Peso: 4.445 kg\",\"Altura x Ancho x Profundidad: 301 mm x 151 mm x 151 mm\"', '69999.99', '[\"sgames2.jpg\"]', 1, 2, 1, 12345644, NULL, NULL, NULL),
(3, 'Nintendo Switch', 'Nintendo Switch', 'La nueva edición de la excelente Consola Nintendo Switch Neon 2019 te permitira llevar la diversion a libremente a cualquier lado ya que está diseñada para acompañarte dondequiera que vayas, transformándose de consola para el hogar a consola portátil en un instante. Así tendrás más ocasiones para disfrutar de tus juegos favoritos como más te guste. Esta renovada consola Nintendo Switch 2019 trae consigo montones de caracteristicas nuevas, como por ejemplo su gran batería que, a diferencia de su antecesor, te permite jugar durante 9 horas como máximo, mejorando la duración de la batería casi por el doble que antes. Ademas incluye una mejora en la firmeza y durabilidad de los Joy-con, estan hechos con un material resistente y al tacto se sienten mucho mas cómodos. Cuenta con una arquitectura renovada, almacenamiento renovado y una placa de CPU totalmente actualizada. Todo esto sumado a las caracteristicas usuales que tanto amamos en la versión original. Podes conectar la consola a una TV usando la base de Nintendo Switch que viene incluida para que todo el mundo pueda ver el juego. Hay juegos que no requieren una pantalla grande, pero que, sin embargo, ganan un plus de inmersión al ser jugados en la televisión con amigos, familiares e incluso solo ¿No tienes acceso al televisor? ¡No hay problema! En cualquier momento puedes usar el soporte integrado de Nintendo Switch para jugar en la pantalla de la consola. Solo tienes que pasarle un Joy-Con a un amigo para empezar a jugar al momento. Los nuevos controles Joy-Con te ofrecen total flexibilidad a la hora de jugar. Usa el armazón para controles Joy-Con que se incluye y transforma ambos Joy-Con en un control de estilo tradicional. Según el tipo de juego, podrás usar un Joy-Con en cada mano o compartir uno de ellos con un amigo. ¿Vas a salir? Acopla los controles Joy-Con a la consola Nintendo Switch y llévatela donde quieras. La vibración HD le da más profundidad a los juegos podes sentir la diferencia ya que es una sensación que va más allá de simples vibraciones.', '\"Incluye 2 controles.\\r\",\"Resolución de 1920px x 1080px.\\r\",\"Memoria RAM de 4GB.,Display de 6.2\\r\",\"Tiene pantalla táctil.\\r\",\"Cuenta con:\\r\",\"1 joy-con grip\\r\",\"2 correas para joy-con\\r\",\"1 dock\\r\",\"1 cable hdmi\\r\",\"1 adaptador de corriente.\\r\",\"Zaraza milanesa\"', '75999.99', '[\"sgames3.jpg\"]', 1, 2, 3, 98765432, NULL, NULL, NULL),
(4, 'Playstation 5 Standar', 'La nueva consola de Sony PlayStation.', 'Experimentá una velocidad sorprendente con un SSD de velocidad ultrarrápida, una inmersión más profunda con soporte para respuesta háptica, gatillos adaptables y audio 3D, además de una generación completamente nueva de juegos de PlayStation  Disfrutá de la potencia de una CPU, una GPU y una SSD personalizadas con E/S integradas que redefinirán lo que una consola PlayStation puede hacer. Aprovechá al máximo tus sesiones de juego con tiempos de carga casi instantáneos para los juegos instalados en la PS5. La integración personalizada de los sistemas de la consola PS5 les permite a los creadores obtener datos desde la SSD tan rápido que pueden diseñar juegos de maneras que antes no eran posibles.  Asombrate con los increíbles gráficos y descubre las nuevas funciones de PS5. Sumergite en interesantes mundos con un nuevo nivel de realismo a medida que los rayos de luz se simulan de manera individualizada, lo que crea sombras y reflejos realistas en los juegos de PS5 compatibles. Jugá tus títulos de PS5 favoritos en tu impresionante televisor 4K. Disfrutá de una frecuencia de imagen alta y fluida de hasta 120 fps para los juegos compatibles, con soporte para salida de 120 Hz en pantallas 4K. En televisores HDR, los juegos compatibles con la PS5 se ven en una gama de colores increíblemente intensos y realistas. Las consolas PS5 admiten salida de 8K, para que puedas jugar en tu pantalla con resolución de 4320p.  La PS5 edición digital es una versión completamente digital de la consola PS5 que no trae unidad de disco. Inicia sesión en tu cuenta para PlayStation Network y ve a PlayStation®Store para comprar y descargar juegos. Disfrutá de un catálogo retrocompatible de juegos digitales de PS4 en tu PS5 edición digital. Disfrutá de frecuencias de imágenes más rápidas y fluidas en juegos digitales específicos de PS4 y PS VR. La consola PS5 edición digital les ofrece a los distribuidores de juegos la capacidad de permitirles a los jugadores actualizar las versiones digitales de sus juegos de PS4 a juegos digitales de PS5. Conectá tu PlayStation VR a tu consola PS5 edición digital para disfrutar de los juegos digitales de PS VR compatibles.  El control inalámbrico DualSense para la PS5 ofrece respuesta háptica envolvente, gatillos adaptables dinámicos y un micrófono incorporado, todo integrado en un diseño icónico. Experimentá la respuesta háptica mediante el control inalámbrico DualSense en determinados títulos de PS5 y siente los efectos y el impacto de tus acciones en el juego mediante la respuesta háptica sensorial. Comprendé los gatillos adaptables envolventes, que contienen niveles de resistencia que simulan el impacto físico de las actividades dentro del juego en determinados títulos de PS5.  Transmití entretenimiento en 4K desde tus aplicaciones compatibles favoritas en PS5 con tu televisor 4K. Crea capturas de pantalla y videos de tus juegos. Compartilos con otros jugadores en PlayStation Network o en aplicaciones de redes sociales específicas.', '\"Con Wi-Fi: Sí\\r\",\"Tipo de consola: De sobremesa\\r\",\"Incluye controles: Sí\\r\",\"Cantidad de controles incluidos: 1\\r\",\"Conectividad de los controles: Inalámbrico\\r\",\"Memoria RAM: 16 GB\\r\",\"Tipos de memoria: GDDR6\\r\",\"Resolución máxima de salida de video: 7680 px x 4320 px\\r\",\"CPU: AMD Ryzen\\r\",\"Cantidad de núcleos de CPU: 8\\r\",\"Velocidad del procesador: 3.5 GHz\\r\",\"GPU: AMD Radeon\\r\",\"Formatos de juegos: Digital\\r\",\"Blu-ray\\r\",\"Con HDMI: Sí\\r\",\"Con USB: Sí\\r\",\"Con Bluetooth: Sí\\r\",\"Accesorios incluidos: \\r\",\"1 soporte vertical\\r\",\"1 cable de alimentación AC\\r\",\"1 cable USB\\r\",\"1 cable HDMI\\r\",\"1 manual\\r\",\"Peso: 3.9 kg\\r\",\"Altura x Ancho x Profundidad: 92 mm x 390 mm x 260 mm\\r\",\"zaraza 2\"', '99999.99', '[\"images-1612790415326.jpg\",\"images-1612882432017.jpg\"]', 1, 2, 2, 55555555, NULL, NULL, NULL),
(5, 'Xbox 360', 'Consola de antigua gen', 'Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360. Esta es la descripción larga de la Xbox 360.', '\"Característica 1\\r\",\"Característica 2\\r\",\"Característica 3\\r\",\"Característica 4\\r\",\"Característica 5\\r\"', '44444.00', '[\"games4.jpg\"]', 1, 3, 1, 100788, NULL, NULL, NULL),
(6, 'Playstation 4 Slim', 'Consola de juegos Sony Playstation 4 Slim', 'No solo vas a poder descargar los mejores videojuegos y navegar en la web sin límite, sino que, gracias a su interconectividad global, también vas a tener la posibilidad de competir en línea con tus amigos y con personas de todas partes del mundo disfrutando de aventuras inolvidables.\\r\\n\\r\\nCalidad de otro nivel\\r\\nSe considera que esta consola es la mejor dentro del mercado, dado que presenta una resolución de hasta 4K. Vas a poder reproducir música, ver tus películas y series favoritas a través de las aplicaciones descargables.\\r\\n\\r\\nDiseño innovador\\r\\nNo solo esto, el control DualShock combina funciones revolucionarias y sin precedentes mientras conserva precisión, comodidad y exactitud en cada movimiento.\\r\\n\\r\\nAdaptada a tus necesidades\\r\\nGuardá tus apps, fotos, videos y mucho más en el disco duro, que cuenta con una capacidad de 1 TB. Al contar con un procesador de 8 núcleos y un procesador gráfico, brinda una experiencia dinámica, respuestas ágiles, y transiciones fluidas de imágenes en alta definición. Por otro lado, tiene puerto USB y salida HDMI, que permiten conectar accesorios y cargar la batería de tu control mientras jugás.', '\"Características:\\n\",\"Capacidad 1 TB\\n\",\"Resolución 1080p\\n\",\"Salidas HDMI\\n\",\"Cantidad de joystick 1\\n\",\"Juegos incluídos FIFA 20\\n\",\"Modelo PS4 Slim\\n\",\"Garantía: 1 AÑO directa de fábrica\\n\",\"Se entrega con:\\n\",\"Consola PlayStation 4 1TB\\n\",\"Control DualShock 4\\n\",\"Cable HDMI\\n\",\"Cable de alimentación\\n\",\"Cable USB de carga\\n\",\"FIFA 20 Cupón de contenido adicional de FIFA 20 Ultimate Team \\n\",\"Cupón con suscripción de 14 días a PlayStation®Plus\"', '60000.00', '[\"images-1612791003539.png\"]', 1, 1, 2, 33333333, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `states`
--

CREATE TABLE `states` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=big5;

--
-- Volcado de datos para la tabla `states`
--

INSERT INTO `states` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'OFERTA', NULL, NULL, NULL),
(2, 'NOVEDAD', NULL, NULL, NULL),
(3, 'USADO', NULL, NULL, NULL),
(4, 'DESTACADO', NULL, NULL, NULL),
(5, 'PREVENTA', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types`
--

CREATE TABLE `types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=big5;

--
-- Volcado de datos para la tabla `types`
--

INSERT INTO `types` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'CONSOLA', NULL, NULL, NULL),
(2, 'VIDEOJUEGO', NULL, NULL, NULL),
(3, 'AURICULAR', NULL, NULL, NULL),
(4, 'TARJETA', NULL, NULL, NULL),
(5, 'PERIFERICO', NULL, NULL, NULL),
(6, 'GAMEPAD', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` int(11) NOT NULL DEFAULT 1,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` char(60) COLLATE utf8_bin NOT NULL,
  `name` text COLLATE utf8_bin NOT NULL,
  `lastName` text COLLATE utf8_bin NOT NULL,
  `avatar` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `calleDeEntrega` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `ciudadDeEntrega` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `paisDeEntrega` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cpDeEntrega` int(11) DEFAULT NULL,
  `calleDeEntrega2` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `ciudadDeEntrega2` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `paisDeEntrega2` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cpDeEntrega2` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `type`, `email`, `password`, `name`, `lastName`, `avatar`, `calleDeEntrega`, `ciudadDeEntrega`, `paisDeEntrega`, `cpDeEntrega`, `calleDeEntrega2`, `ciudadDeEntrega2`, `paisDeEntrega2`, `cpDeEntrega2`, `created_at`, `updated_at`, `deleted_at`, `country_id`) VALUES
(1, 1, 'llillecrop0@cnbc.com', 'aiQnat7hIU', 'Leora', 'Lillecrop', 'user1.jpeg', '5169 Mallard Crossing', 'Bintulu', 'Malaysia', 97010, '2727 Forster Avenue', 'Santa Monica', 'United States', 90410, NULL, NULL, NULL, 4),
(22, 1, 'tfiggessl@wordpress.com', 'Yq4ybQ0Vte', 'Travis', 'Figgess', 'user2.jpeg', '54459 Lakeland Lane', 'Chorotis', 'Argentina', 3733, '8234 Nobel Terrace', 'Montecarlo', 'Argentina', 3384, NULL, NULL, NULL, 3),
(36, 1, 'phonackz@a8.net', 'i5dPHf', 'Phyllida', 'Honack', 'user3.jpeg', '572 Warrior Parkway', 'Novaya Usman’', 'Russia', 396310, '6 Pierstorff Place', 'Emiliano Zapata', 'Mexico', 82190, NULL, NULL, NULL, 2),
(60, 1, 'cofer1n@naver.com', 'XcCmaJD', 'Carena', 'Ofer', 'user4.jpeg', '544 Dryden Circle', 'Dualing', 'Philippines', 1103, '145 Cordelia Parkway', 'Nong Muang', 'Thailand', 15170, NULL, NULL, NULL, 1),
(62, 0, 'mariano.g.ayub@gmail.com', '$2b$12$t3SUUJmuORlY.LNH.nnDYOtITKwnkUIjXzlCKFnBpwLX8PkFQwk/6', 'Mariano Gabriel', 'Ayub', 'avatar-1613652632038.jpg', '981 Dennis Place', 'CABA', 'Argentina', 1282, '70714 Utah Center', 'Balitoc', 'Philippines', 1111, NULL, NULL, NULL, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `Code_UNIQUE` (`Code`);

--
-- Indices de la tabla `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `states`
--
ALTER TABLE `states`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `types`
--
ALTER TABLE `types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=499;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
