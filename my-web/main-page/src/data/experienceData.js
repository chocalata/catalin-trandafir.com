workData = [
  {
    position: 'left',
    company_name: 'NTT Data',
    company_url: 'https://es.nttdata.com/',
    work_description:
      'Java Developer specialized in task automation and system maintenance, contributing within an internal support team. Creator of efficient solutions to streamline processes and enhance system stability through Java development.',
    technologies: [
      {
        name: 'Java'
      }
    ]
  },
  {
    position: 'right',
    company_name: 'PUE',
    company_url: 'https://pue.es/',
    work_description:
      'Full-stack management for internal and external apps, handling system admin and deployments. Building APIs for internal use and integrating external ones, including data processing. Managing and designing databases.',
    technologies: [
      {
        name: 'Docker'
      },
      {
        name: 'Python'
      },
      {
        name: 'Node.js'
      },
      {
        name: 'Express.js'
      },
      {
        name: 'MySQL'
      },
      {
        name: 'Redis'
      },
      {
        name: 'Linux'
      },
      {
        name: 'HTML5'
      }
    ]
  },
  {
    position: 'right',
    company_name: 'I+D+I PUE',
    company_url: 'https://pue.es/',
    work_description:
      "Exploration of new technologies and methodologies to improve internal projects. Participation in the transformation of the company's infrastructure to optimize performance and scalability. Migration of systems and services to AWS infrastructure, ensuring efficiency and security. Implementation and management of Kubernetes clusters to enhance availability and deployment automation. Maintaining a significant portion of the responsibilities from the previous role.",
    technologies: [
      {
        name: 'Kubernetes'
      },
      {
        name: 'AWS'
      },
      {
        name: 'Docker'
      },
      {
        name: 'Python'
      },
      {
        name: 'Node.js'
      },
      {
        name: 'Express.js'
      },
      {
        name: 'MySQL'
      },
      {
        name: 'Redis'
      },
      {
        name: 'Linux'
      },
      {
        name: 'HTML5'
      }
    ]
  }
]

projectData = [
  {
    title: 'Apolo X',
    description:
      "This was my first project. It's a videogame with a single player and local multiplayer mode. Made as a final project for the course with Alberto Gutierro.",
    github: 'https://github.com/Alberto-Gutierro/Catalin_Alberto-Juego_Naves',
    image: '/img/projects/ApoloX.png',
    web: 'https://github.com/Alberto-Gutierro/Catalin_Alberto-Juego_Naves/releases/tag/v1.0',
    technologies: [
      {
        name: 'Java'
      }
    ]
  },
  {
    title: 'Chrono App',
    description:
      'An app to keep track of time with a chronometer, countdown to zero and a way to set a personal interval (workout routines, study session, breathing exersices...).',
    github: 'https://github.com/chocalata/ChronoApp',
    web: 'https://chrono-app.chocalata.dev',
    image: '/img/projects/ChronoApp.png',
    technologies: [
      {
        name: 'Astro'
      },
      {
        name: 'Tailwind'
      },
      {
        name: 'Capacitor'
      }
    ]
  }
]

module.exports = {
  workData,
  projectData
}
