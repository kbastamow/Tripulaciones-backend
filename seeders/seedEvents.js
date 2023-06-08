require("dotenv").config();
const Event = require("../models/Event")

const {dbConnection} = require ("../config/config");

let isConnected = false;

const eventData =
[
    {
      title: "El emprendimiento como salida profesional",
      description: "Una charla de Michael Monroe de la lanzadera sobre su trayectoria profesional en lanzar un startup.",
      date: "2023-06-10T09:00:00",
      categoryIds: ["64805c99a7607c0350631911"]
    },
    {
      title: "Taller de Marketing Digital",
      description: "Aprende las estrategias y herramientas clave para impulsar tu negocio en línea.",
      date: "2023-06-15T15:30:00",
      categoryIds: ["64805c99a7607c035063190c"]
    },
    {
      title: "Feria de Empleo y Networking",
      description: "Un evento para conectar a estudiantes y empresas en busca de talento.",
      date: "2023-06-20T10:00:00",
      categoryIds: ["64805c99a7607c0350631916", "64805c99a7607c035063191b"]
    },
    {
      title: "Visita a una Empresa Líder en el Sector",
      description: "Una oportunidad exclusiva para explorar las instalaciones y conocer el funcionamiento interno de una empresa destacada.",
      date: "2023-06-25T11:00:00",
      categoryIds: ["64805c99a7607c035063190f"]
    },
    {
      title: "Charla sobre Finanzas Personales",
      description: "Descubre cómo administrar tus finanzas de manera efectiva y planificar tu futuro económico.",
      date: "2023-06-30T18:00:00",
      categoryIds: ["64805c99a7607c0350631915"]
    },
        {
          title: "Masterclass: Estrategias de Marketing Digital",
          description: "Aprende las últimas tendencias y mejores prácticas en marketing digital de la mano de expertos en el campo.",
          date: "2023-07-05T14:00:00",
          categoryIds: ["64805c99a7607c035063190c"]
        },
        {
          title: "Workshop: Habilidades de Negociación",
          description: "Desarrolla tus habilidades de negociación y aprende técnicas efectivas para alcanzar acuerdos exitosos.",
          date: "2023-07-10T09:30:00",
          categoryIds: ["64805c99a7607c035063190e"]
        },
        {
          title: "Conferencia: Innovación y Tecnología",
          description: "Explora cómo la innovación y la tecnología están transformando el mundo empresarial y generando nuevas oportunidades.",
          date: "2023-07-15T16:30:00",
          categoryIds: ["64805c99a7607c0350631910"]
        },
        {
          title: "Networking Event: Conecta con Profesionales del Sector",
          description: "Una oportunidad para establecer contactos y ampliar tu red de contactos profesionales en diferentes industrias.",
          date: "2023-07-20T18:00:00",
          categoryIds: ["64805c99a7607c0350631916"]
        },
        {
          title: "Charla: Liderazgo y Gestión de Equipos",
          description: "Descubre las claves para liderar equipos de manera efectiva y potenciar el rendimiento colectivo.",
          date: "2023-07-25T11:30:00",
          categoryIds: ["64805c99a7607c035063190e", "64805c99a7607c0350631919"]
        },
        {
          title: "Panel de Expertos: Emprendimiento en el Ámbito Tecnológico",
          description: "Expertos en emprendimiento tecnológico comparten sus experiencias y consejos para aquellos interesados en iniciar su propio negocio en este campo.",
          date: "2023-07-30T15:00:00",
          categoryIds: ["64805c99a7607c0350631911", "64805c99a7607c0350631912"]
        },
        {
          title: "Visita Empresarial: Industria Alimentaria",
          description: "Descubre el proceso de producción y las operaciones de una empresa líder en el sector de alimentos y bebidas.",
          date: "2023-08-05T10:00:00",
          categoryIds: ["64805c99a7607c0350631910"]
        },
        {
          title: "Conferencia: Desafíos y Oportunidades en la Economía Global",
          description: "Analiza los desafíos actuales y las oportunidades emergentes en la economía global y su impacto en los negocios.",
          date: "2023-08-10T17:00:00",
          categoryIds: ["64805c99a7607c0350631910"]
        },
        {
            title: "Conferencia: El Futuro de las Criptomonedas",
            description: "Explora las últimas tendencias y avances en el mundo de las criptomonedas y su impacto potencial en la industria financiera.",
            date: "2023-08-15T13:30:00",
            categoryIds: ["64805c99a7607c0350631913", "64805c99a7607c0350631910", "64805c99a7607c0350631915"]
          },
          {
            title: "Taller: Construyendo Chatbots con ChatGPT",
            description: "Aprende a aprovechar ChatGPT para construir chatbots inteligentes que puedan mejorar el servicio al cliente y automatizar las interacciones.",
            date: "2023-08-20T10:00:00",
            categoryIds: ["64805c99a7607c0350631910", "64805c99a7607c0350631912", "64805c99a7607c0350631916"]
          },
          {
            title: "Foro de Recursos Humanos: Estrategias para la Adquisición de Talento",
            description: "Descubre las estrategias efectivas para atraer y seleccionar el talento adecuado para tu organización.",
            date: "2023-08-25T15:30:00",
            categoryIds: ["64805c99a7607c035063191a", "64805c99a7607c0350631916", "64805c99a7607c035063190e"]
          },
          {
            title: "Charla: Diseño Centrado en el Usuario",
            description: "Explora los principios y metodologías del diseño centrado en el usuario y cómo aplicarlos para crear productos y experiencias exitosas.",
            date: "2023-09-01T16:00:00",
            categoryIds: ["64805c99a7607c0350631918", "64805c99a7607c0350631910", "64805c99a7607c0350631917"]
          },
          {
            title: "Jornada de Innovación en Recursos Humanos",
            description: "Descubre las últimas tendencias y prácticas innovadoras en la gestión de recursos humanos para impulsar el crecimiento y el compromiso del personal.",
            date: "2023-09-07T11:00:00",
            categoryIds: ["64805c99a7607c035063191a", "64805c99a7607c0350631916", "64805c99a7607c035063190e"]
          },
          {
            title: "Charla: Estrategias de Marketing Digital para Empresas de la Generalitat",
            description: "Descubre las mejores prácticas y estrategias de marketing digital utilizadas por las empresas asociadas a la Generalitat para impulsar su presencia en línea.",
            date: "2023-09-15T14:30:00",
            categoryIds: ["64805c99a7607c0350631915", "64805c99a7607c0350631910", "64805c99a7607c035063190c"]
          },
          {
            title: "Taller: Innovación y Creatividad en Mercadona",
            description: "Aprende cómo Mercadona, una de las principales empresas de distribución, fomenta la innovación y la creatividad en su estrategia de negocio para mantenerse a la vanguardia del mercado.",
            date: "2023-09-20T11:00:00",
            categoryIds: ["64805c99a7607c0350631910", "64805c99a7607c0350631914", "64805c99a7607c0350631918"]
          },
          {
            title: "Conferencia: El Impacto Económico de los Premios Nobel",
            description: "Explora el impacto económico y las implicaciones de los Premios Nobel en el campo de la ciencia y la innovación, y cómo estos reconocimientos influyen en la sociedad y la economía.",
            date: "2023-09-25T16:30:00",
            categoryIds: ["64805c99a7607c0350631915", "64805c99a7607c035063190c", "64805c99a7607c0350631911"]
          },
          {
            title: "Taller: Estrategias de Ventas en la Era de Amazon",
            description: "Descubre las estrategias y mejores prácticas para impulsar las ventas en línea en la era de Amazon, la plataforma de comercio electrónico líder a nivel mundial.",
            date: "2023-10-01T10:00:00",
            categoryIds: ["64805c99a7607c0350631910", "64805c99a7607c0350631915", "64805c99a7607c0350631911"]
          },
          {
            title: "Charla: Liderazgo Transformacional en la Era Digital",
            description: "Explora cómo el liderazgo transformacional puede impulsar el éxito empresarial en la era digital, centrándose en casos de estudio de empresas líderes como Amazon y su enfoque innovador.",
            date: "2023-10-07T15:00:00",
            categoryIds: ["64805c99a7607c035063190e", "64805c99a7607c0350631911", "64805c99a7607c0350631916"]
          }
  ]

  const connectToDatabase = async() => {
    if (isConnected) {
      console.log('Already connected to MongoDB');
      return;
    }
    try {
      dbConnection()
      isConnected = true;
      console.log('seedLanzadera Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}

  const seedEvents = async() => {
    const events = await Event.insertMany(eventData)
    console.log(events)
}


// connectToDatabase()

// seedEvents()
