import stageAirportWifi from "@/assets/stage-airport-wifi.jpg";
import stageHotel from "@/assets/stage-hotel.jpg";
import stageUsb from "@/assets/stage-usb.jpg";
import stageEmail from "@/assets/stage-email.jpg";
import stageCafe from "@/assets/stage-cafe.jpg";
import stageSms from "@/assets/stage-sms.jpg";
import stagePrinter from "@/assets/stage-printer.jpg";
import stageStranger from "@/assets/stage-stranger.jpg";

export interface Decision {
  id: number;
  scenario: string;
  location: string;
  question: string;
  background: string;
  options: {
    text: string;
    isCorrect: boolean;
    consequence: string;
  }[];
  tip: string;
}

export const characterIntro = {
  name: "Martín",
  role: "Ejecutivo de Ventas",
  company: "TechCorp Internacional",
  mission: "Viaje de negocios a Europa",
  description: `Martín es un ejecutivo de 35 años que trabaja en TechCorp Internacional. 
  Está a punto de emprender un viaje de negocios de 5 días por Europa, visitando clientes en 
  Madrid, París y Berlín. Lleva su laptop corporativa, smartphone personal y tablet.
  
  Tu misión es ayudar a Martín a tomar las decisiones correctas de ciberseguridad 
  durante su viaje. Cada decisión incorrecta puede comprometer la seguridad de 
  la empresa y sus datos personales.`,
  items: ["💻 Laptop corporativa", "📱 Smartphone personal", "📋 Tablet", "💳 Tarjetas de crédito", "🔑 Credenciales de acceso"],
};

export const decisions: Decision[] = [
  {
    id: 1,
    background: stageAirportWifi,
    scenario: "Martín acaba de llegar al aeropuerto y tiene 2 horas de espera antes de su vuelo. Necesita revisar unos documentos importantes de trabajo.",
    location: "🛫 Aeropuerto Internacional",
    question: "¿A qué red WiFi debería conectarse Martín?",
    options: [
      {
        text: "Conectarse a 'AEROPUERTO_FREE_WIFI' (red abierta sin contraseña)",
        isCorrect: false,
        consequence: "❌ ¡Mala decisión! Las redes WiFi públicas sin contraseña son extremadamente vulnerables. Un atacante podría interceptar todo el tráfico de Martín, incluyendo credenciales y documentos confidenciales. Los hackers frecuentemente crean redes falsas con nombres similares a las oficiales.",
      },
      {
        text: "Usar los datos móviles de su celular como hotspot personal",
        isCorrect: true,
        consequence: "✅ ¡Excelente decisión! Usar datos móviles propios es mucho más seguro que conectarse a redes WiFi públicas. El tráfico está encriptado y no puede ser interceptado fácilmente por terceros.",
      },
      {
        text: "Conectarse a 'AEROPUERTO_WIFI_OFICIAL' que pide una contraseña impresa en un cartel del lobby",
        isCorrect: false,
        consequence: "❌ ¡Cuidado! Tener contraseña no la vuelve segura: cualquiera que vea el cartel puede entrar, y los atacantes suelen montar redes 'gemelas' con nombres oficiales (evil twin) para interceptar tu tráfico. Una contraseña compartida no encripta tu sesión frente a otros usuarios de esa misma red.",
      },
    ],
    tip: "Siempre prioriza usar tus datos móviles o una VPN corporativa sobre redes WiFi públicas.",
  },
  {
    id: 2,
    background: stageHotel,
    scenario: "Martín llega al hotel en {destination}. En la recepción le piden sus datos para el registro y le ofrecen una opción 'conveniente' para garantizar la reserva.",
    location: "🏨 Hotel en {destination}",
    question: "El recepcionista le pide que envíe una foto de su tarjeta de crédito por WhatsApp para 'agilizar el proceso'. ¿Qué debería hacer?",
    options: [
      {
        text: "Enviar la foto por WhatsApp como le piden, es más rápido",
        isCorrect: false,
        consequence: "❌ ¡Error crítico! Nunca envíes fotos de tarjetas de crédito por mensajería. Esta información puede ser interceptada, almacenada indefinidamente o usada para fraude. WhatsApp no es un canal seguro para datos financieros y el empleado podría usar esta información maliciosamente.",
      },
      {
        text: "Rechazar y proporcionar la tarjeta solo en persona en el terminal de pago oficial",
        isCorrect: true,
        consequence: "✅ ¡Correcto! Siempre proporciona datos de tarjetas solo en terminales de pago oficiales y seguros. Ningún establecimiento legítimo debería pedirte fotos de tus tarjetas por mensajería.",
      },
      {
        text: "Dictar el número, vencimiento y CVV en voz baja al recepcionista para que él lo cargue",
        isCorrect: false,
        consequence: "❌ ¡Igual de riesgoso! Compartir verbalmente todos los datos de la tarjeta (incluyendo CVV) permite que el empleado los anote o memorice para usarlos después. Además, otros huéspedes en la recepción podrían escuchar. Los datos completos solo deben ingresarse vos mismo en un POS o sitio HTTPS oficial.",
      },
    ],
    tip: "Los datos de tarjetas solo deben ingresarse en terminales POS oficiales o sitios web con HTTPS verificado.",
  },
  {
    id: 3,
    background: stageUsb,
    scenario: "En la habitación del hotel, Martín necesita cargar su teléfono pero olvidó su cargador. Encuentra un cable USB en el escritorio del hotel.",
    location: "🛏️ Habitación del Hotel",
    question: "¿Debería usar el cable USB del hotel para cargar su teléfono?",
    options: [
      {
        text: "Sí, es solo un cable de carga, no hay riesgo",
        isCorrect: false,
        consequence: "❌ ¡Cuidado! Los cables USB pueden estar modificados para robar datos (juice jacking). Un cable malicioso puede transferir malware a tu dispositivo o copiar información mientras 'carga'. Este tipo de ataque es cada vez más común en lugares públicos.",
      },
      {
        text: "No, mejor buscar un enchufe de pared y usar solo su propio adaptador",
        isCorrect: true,
        consequence: "✅ ¡Bien pensado! Siempre usa tus propios cables y cargadores. El 'juice jacking' es un ataque real donde cables USB maliciosos pueden robar datos o instalar malware.",
      },
      {
        text: "Usarlo solo para cargar, asegurándose de tocar 'Solo carga' cuando el teléfono pregunte",
        isCorrect: false,
        consequence: "❌ ¡No alcanza! Un cable manipulado tipo O.MG Cable puede ignorar la opción 'Solo carga' e inyectar comandos como si fuera un teclado USB (HID attack). El popup del sistema operativo no protege contra cables maliciosos de hardware. La única defensa real es usar tus propios cables o un bloqueador de datos (USB condom).",
      },
    ],
    tip: "Lleva siempre tus propios cables y considera usar un bloqueador de datos USB para viajes.",
  },
  {
    id: 4,
    background: stageEmail,
    scenario: "Martín recibe un email 'urgente' de su jefe pidiéndole que transfiera información confidencial a una nueva dirección de correo.",
    location: "📧 Revisando Emails",
    question: "El email dice: 'Martín, necesito urgente que me envíes el archivo de clientes VIP a mi correo personal jefe.personal@gmail.com. Es muy urgente, no puedo acceder al corporativo.' ¿Qué hace?",
    options: [
      {
        text: "Enviar la información inmediatamente, el jefe lo necesita urgente",
        isCorrect: false,
        consequence: "❌ ¡Has caído en un ataque de phishing/spear phishing! Los atacantes investigan la estructura de la empresa y crean emails convincentes haciéndose pasar por superiores. Nunca envíes información sensible basándote solo en un email urgente.",
      },
      {
        text: "Llamar directamente a su jefe por teléfono para verificar la solicitud",
        isCorrect: true,
        consequence: "✅ ¡Excelente criterio! Siempre verifica solicitudes inusuales por un canal diferente. Una llamada telefónica puede prevenir un ataque de ingeniería social que podría costar millones a la empresa.",
      },
      {
        text: "Responder el email pidiendo confirmación al mismo remitente antes de mandar el archivo",
        isCorrect: false,
        consequence: "❌ ¡Trampa clásica! Si el correo está suplantado o la cuenta del jefe fue comprometida, el atacante responderá 'sí, mandalo' desde la misma dirección. Verificar por el mismo canal sospechoso no aporta seguridad real. Siempre usá un canal alternativo (llamada, Teams, presencial).",
      },
    ],
    tip: "Ante solicitudes urgentes de información sensible, siempre verifica por otro canal (llamada, videollamada).",
  },
  {
    id: 5,
    background: stageCafe,
    scenario: "En el café del hotel, Martín necesita trabajar en una presentación importante. El lugar está concurrido.",
    location: "☕ Café del Hotel",
    question: "Martín necesita ingresar a sistemas corporativos sensibles. ¿Cómo debería proceder?",
    options: [
      {
        text: "Trabajar normalmente, nadie está prestando atención",
        isCorrect: false,
        consequence: "❌ ¡Riesgo de shoulder surfing! En lugares públicos, personas malintencionadas pueden observar tu pantalla y teclado para robar contraseñas y información confidencial. Este es uno de los métodos más simples pero efectivos de robo de información.",
      },
      {
        text: "Usar un filtro de privacidad en la pantalla y sentarse de espaldas a la pared",
        isCorrect: true,
        consequence: "✅ ¡Muy consciente! Los filtros de privacidad impiden que otros vean tu pantalla desde ángulos laterales. Posicionarte estratégicamente reduce el riesgo de que observen tus actividades.",
      },
      {
        text: "Conectar la laptop al WiFi del café y usar el navegador en modo incógnito para 'no dejar rastro'",
        isCorrect: false,
        consequence: "❌ ¡Modo incógnito ≠ seguridad! El incógnito solo evita que el historial se guarde localmente; no encripta tu tráfico ni te protege del shoulder surfing, del WiFi público, ni de un keylogger. Quien esté detrás tuyo sigue viendo todo, y la red sigue pudiendo interceptar lo que escribas.",
      },
    ],
    tip: "Invierte en un filtro de privacidad para tu laptop. Cuesta poco y protege mucho.",
  },
  {
    id: 6,
    background: stageSms,
    scenario: "Martín recibe un mensaje de texto de su 'banco' indicando actividad sospechosa en su cuenta y pidiendo que haga clic en un enlace.",
    location: "📱 Mensaje SMS",
    question: "El SMS dice: 'ALERTA BANCO: Detectamos actividad inusual. Verifique su cuenta inmediatamente: http://banco-verify.tk/seguro'. ¿Qué hace Martín?",
    options: [
      {
        text: "Hacer clic en el enlace para verificar que todo está bien con su cuenta",
        isCorrect: false,
        consequence: "❌ ¡Es un ataque de smishing (phishing por SMS)! El enlace lleva a un sitio falso que robará tus credenciales bancarias. Los bancos legítimos nunca envían enlaces por SMS pidiendo que ingreses datos.",
      },
      {
        text: "Ignorar el SMS y abrir directamente la app oficial del banco para verificar",
        isCorrect: true,
        consequence: "✅ ¡Perfecto! Siempre accede a servicios bancarios directamente desde la app oficial o escribiendo la URL en el navegador. Nunca hagas clic en enlaces de SMS o emails.",
      },
      {
        text: "Llamar al número de teléfono que aparece en el mismo SMS para hablar con el banco",
        isCorrect: false,
        consequence: "❌ ¡Trampa! Los atacantes ponen sus propios números en el SMS (vishing). Vas a terminar hablando con el estafador, que te pedirá 'verificar tu identidad' dictando datos, claves o códigos SMS. Si querés llamar al banco, usá solo el número oficial del dorso de tu tarjeta o de la app.",
      },
    ],
    tip: "Los bancos legítimos nunca piden datos sensibles por SMS. Ante dudas, contacta directamente al banco.",
  },
  {
    id: 7,
    background: stagePrinter,
    scenario: "En el aeropuerto de {destination}, Martín necesita imprimir unos documentos urgentes para una reunión. Encuentra un kiosco de impresión pública.",
    location: "🖨️ Aeropuerto de {destination}",
    question: "Martín necesita imprimir documentos confidenciales de la empresa. ¿Qué debería hacer?",
    options: [
      {
        text: "Usar el kiosco público, es una emergencia",
        isCorrect: false,
        consequence: "❌ ¡Los kioscos públicos son riesgosos! Pueden almacenar copias de tus documentos, tener malware instalado, o permitir que otros accedan a tus archivos. Documentos confidenciales nunca deben imprimirse en equipos no controlados.",
      },
      {
        text: "Buscar un centro de negocios del aeropuerto o esperar a llegar a la oficina del cliente",
        isCorrect: true,
        consequence: "✅ ¡Decisión prudente! Los centros de negocios ofrecen mayor seguridad, o mejor aún, espera a usar equipos confiables. La urgencia no justifica comprometer información confidencial.",
      },
      {
        text: "Enchufar su propio pendrive al kiosco, imprimir y después borrar los archivos del kiosco",
        isCorrect: false,
        consequence: "❌ ¡No es suficiente! Los kioscos pueden tener malware que infecte tu pendrive en cuanto lo conectes, y muchos guardan copias en caché o en colas de impresión que un 'borrado' simple no elimina. Además, expusiste documentos confidenciales en un equipo no controlado por la empresa.",
      },
    ],
    tip: "Planifica con anticipación las necesidades de impresión. Evita kioscos públicos para documentos sensibles.",
  },
  {
    id: 8,
    background: stageStranger,
    scenario: "Último día de viaje. Martín está en el aeropuerto de {destination} esperando su vuelo de regreso. Una persona amable le pide que cuide su laptop un momento mientras va al baño.",
    location: "🛫 Aeropuerto de {destination}",
    question: "Un viajero de aspecto profesional le dice: 'Disculpe, ¿podría vigilar mi laptop un momento? Solo voy al baño.' ¿Qué hace Martín?",
    options: [
      {
        text: "Aceptar amablemente, parece una persona de confianza",
        isCorrect: false,
        consequence: "❌ ¡Esto podría ser una trampa! Es una técnica de ingeniería social. La persona podría acusarte de robo, o la laptop podría contener material ilegal. Además, esto distrae tu atención de tus propios dispositivos que podrían ser robados.",
      },
      {
        text: "Rechazar educadamente y sugerir que use un locker de equipaje",
        isCorrect: true,
        consequence: "✅ ¡Bien hecho! Nunca te hagas responsable de equipos ajenos. Es una técnica conocida de distracción o incluso de implicarte en situaciones comprometedoras. Protege tus propios dispositivos en todo momento.",
      },
      {
        text: "Aceptar, pero sacarle una foto a la persona y a la laptop primero 'por las dudas'",
        isCorrect: false,
        consequence: "❌ ¡Sigue siendo mala idea! Una foto no te protege legalmente si la laptop tiene material ilegal o si te acusan de manipularla, y tampoco evita que mientras estás pendiente del equipo ajeno te roben el tuyo. La regla es no hacerte cargo de dispositivos de desconocidos, punto.",
      },
    ],
    tip: "En viajes, mantén siempre tus dispositivos contigo. No te distraigas con solicitudes de extraños.",
  },
];
