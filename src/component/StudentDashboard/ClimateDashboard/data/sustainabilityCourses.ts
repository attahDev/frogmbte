import type { SustainabilityCourse } from "../types/sustainability";

export const sustainabilityCourses: SustainabilityCourse[] = [
  {
    slug: "climate-social-justice",
    title: "Climate & Social Justice",
    shortDescription:
      "Understand climate inequality, vulnerable populations and fair climate transitions.",
    fullDescription:
      "Explore how climate change affects people and communities unequally. Learn how climate justice, inclusive decision-making, legal action and community-led solutions can produce fairer climate outcomes.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1600&auto=format&fit=crop",
    duration: "2 weeks",
    contactHours: "8 hours",
    mode: "Hybrid learning",
    level: "Foundation",
    progress: 0,
    certificateAvailable: true,

    learningOutcomes: [
      "Explain climate justice and how it differs from general climate action.",
      "Describe the triple injustice experienced by vulnerable communities.",
      "Identify distributive, procedural and recognition justice.",
      "Explain how intersectionality increases climate vulnerability.",
      "Describe legal pathways for climate justice in Africa.",
      "Design a fair and inclusive Just Transition Action Plan.",
    ],

    lessons: [
      {
        slug: "understanding-climate-justice",
        shortTitle: "Session 1",
        title: "Understanding Climate Justice",
        description:
          "Learn what climate justice means, explore the triple injustice and understand the three dimensions of climate justice.",
        duration: "2 hours",

        learningOutcomes: [
          "Explain climate justice in your own words.",
          "Explain how climate justice differs from general climate action.",
          "Describe the triple injustice.",
          "Identify the three dimensions of climate justice.",
        ],

        sections: [
          {
            id: "core-idea",
            title: "The Core Idea",
            type: "content",
            paragraphs: [
              "Climate justice is not only about protecting the environment. It is also about fairness.",
              "It treats climate change as an ethical, social and political issue that crosses borders and affects some people much more severely than others.",
              "Climate justice connects environmental protection with protecting people who have fewer resources to prepare for and recover from climate damage.",
            ],
          },
          {
            id: "triple-injustice",
            title: "The Triple Injustice",
            type: "content",
            paragraphs: [
              "Many countries and communities contributed very little to climate change but experience some of its most damaging effects.",
            ],
            points: [
              "They are among the least responsible for climate change.",
              "They are often hit hardest by climate impacts.",
              "They have fewer resources to adapt and recover.",
            ],
          },
          {
            id: "africa-example",
            title: "Climate Injustice in Africa",
            type: "example",
            paragraphs: [
              "Africa contributes a relatively small share of global greenhouse-gas emissions but remains one of the regions most vulnerable to climate impacts.",
              "Many African communities face drought, flooding, food insecurity, water shortages and economic pressure while having limited resources for adaptation.",
            ],
          },
          {
            id: "justice-dimensions",
            title: "The Three Dimensions of Climate Justice",
            type: "content",
            points: [
              "Distributive justice: Are the benefits and burdens of climate action shared fairly?",
              "Procedural justice: Do affected people have a meaningful voice in decisions?",
              "Recognition justice: Are the rights, knowledge and lived experiences of marginalised groups acknowledged and respected?",
            ],
          },
          {
            id: "mapping-activity",
            title: "Climate Justice Mapping Exercise",
            type: "activity",
            paragraphs: [
              "Work in small groups to identify an African location that experiences high climate vulnerability despite producing relatively low emissions.",
            ],
            points: [
              "Identify one climate-injustice hotspot.",
              "Describe the climate challenge affecting the location.",
              "Identify who benefits from existing economic activity.",
              "Identify who carries the environmental or social cost.",
              "Suggest one justice-based response.",
            ],
          },
        ],
      },

      {
        slug: "vulnerable-populations",
        shortTitle: "Session 2",
        title: "Vulnerable Populations & Intersectionality",
        description:
          "Explore how climate change affects women, youth, Indigenous peoples, persons with disabilities and low-income communities.",
        duration: "2 hours",

        learningOutcomes: [
          "Identify populations that face greater climate vulnerability.",
          "Explain how overlapping identities increase climate risk.",
          "Apply an intersectional perspective to climate planning.",
          "Describe the significance of the Ogiek case.",
        ],

        sections: [
          {
            id: "women",
            title: "Women and Climate Vulnerability",
            type: "content",
            paragraphs: [
              "Women often depend heavily on natural resources such as farmland, water and firewood for household and economic activities.",
              "When these resources become scarce, women may spend more time collecting them while having fewer financial resources to adapt.",
              "Women also hold valuable local knowledge and should be recognised as climate leaders rather than being treated only as victims.",
            ],
          },
          {
            id: "youth",
            title: "Youth",
            type: "content",
            paragraphs: [
              "Young people will experience the long-term consequences of climate decisions made today.",
              "Across Africa, youth movements have become important voices for climate justice, accountability and international solidarity.",
            ],
          },
          {
            id: "indigenous-peoples",
            title: "Indigenous Peoples",
            type: "content",
            paragraphs: [
              "Indigenous communities may face threats to their land, traditional livelihoods, cultural identity and knowledge systems.",
              "Climate and conservation projects can create additional injustice when communities are displaced or excluded from decisions concerning ancestral land.",
            ],
          },
          {
            id: "disabilities",
            title: "Persons with Disabilities",
            type: "content",
            paragraphs: [
              "People with disabilities may face increased risk during extreme weather, food shortages, water scarcity and forced displacement.",
              "Emergency warnings, evacuation systems and public facilities are not always designed around their needs.",
            ],
          },
          {
            id: "intersectionality",
            title: "Understanding Intersectionality",
            type: "content",
            paragraphs: [
              "Intersectionality explains how different parts of a person's identity and situation overlap.",
              "A rural woman with a disability may experience gender inequality, inaccessible emergency systems, low income and geographical isolation at the same time.",
              "These overlapping barriers can significantly increase climate vulnerability.",
            ],
          },
          {
            id: "ogiek-case",
            title: "Case Study: The Ogiek People and the Mau Forest",
            type: "case-study",
            paragraphs: [
              "The Ogiek are an Indigenous community traditionally connected to Kenya's Mau Forest.",
              "During forest conservation and restoration efforts, members of the community were removed from land they had occupied for generations.",
              "In 2017, the African Court on Human and Peoples' Rights ruled that the rights of the Ogiek people had been violated.",
              "The case is significant because it connects environmental protection with Indigenous land rights, recognition and meaningful participation.",
            ],
          },
          {
            id: "intersectional-story",
            title: "The Intersectional Climate Story",
            type: "activity",
            points: [
              "Choose a fictional climate-vulnerable character.",
              "Identify the climate hazard affecting the person.",
              "Describe the resources available to the person.",
              "Identify the barriers preventing adaptation.",
              "Explain what a fair climate solution would look like.",
            ],
          },
        ],
      },

      {
        slug: "legal-routes-and-policy",
        shortTitle: "Session 3",
        title: "Legal Routes & Policy Frameworks",
        description:
          "Examine national, regional and international pathways for advancing climate justice.",
        duration: "2 hours",

        learningOutcomes: [
          "Identify legal pathways available for climate justice.",
          "Explain the role of climate litigation.",
          "Compare the strengths and limits of legal action.",
          "Describe African climate-litigation examples.",
        ],

        sections: [
          {
            id: "international-court",
            title: "International Court of Justice",
            type: "content",
            paragraphs: [
              "The International Court of Justice can provide advisory opinions on the legal obligations of states regarding climate change.",
              "These opinions can influence international law, national climate policy and future legal cases.",
            ],
          },
          {
            id: "african-court",
            title: "African Court on Human and Peoples’ Rights",
            type: "content",
            paragraphs: [
              "The African Court can examine climate issues through rights protected under the African Charter on Human and Peoples' Rights.",
              "This includes environmental rights and the rights of communities affected by climate-related decisions.",
            ],
          },
          {
            id: "national-courts",
            title: "National Courts",
            type: "content",
            paragraphs: [
              "Communities and civil-society organisations can bring climate-related cases before courts within individual African countries.",
              "These cases may challenge harmful projects, failures to follow environmental procedures or decisions that ignore climate risks.",
            ],
          },
          {
            id: "litigation-examples",
            title: "African Climate Litigation Examples",
            type: "case-study",
            points: [
              "Successful example: The EarthLife Africa case challenged approval processes connected to a coal-fired power project in South Africa.",
              "Unsuccessful example: Litigation concerning the East African Crude Oil Pipeline faced procedural and jurisdictional difficulties.",
              "A case may fail because of legal procedure even when the environmental concern remains important.",
            ],
          },
          {
            id: "mock-tribunal",
            title: "Mock Climate Tribunal",
            type: "activity",
            paragraphs: [
              "A fictional community is challenging government approval of a mining project that could displace residents and destroy a wetland.",
            ],
            points: [
              "Judges review the evidence.",
              "Community representatives describe the expected harm.",
              "Government or corporate representatives present a defence.",
              "Scientists and Indigenous knowledge holders provide expert evidence.",
              "Participants decide whether the project approval was fair and inclusive.",
            ],
          },
        ],
      },

      {
        slug: "just-transition-action-plan",
        shortTitle: "Session 4",
        title: "Designing a Just Climate Action Plan",
        description:
          "Apply climate justice principles to a renewable-energy project and build an inclusive transition plan.",
        duration: "2 hours",

        learningOutcomes: [
          "Apply climate justice principles to a community project.",
          "Design an inclusive stakeholder-engagement strategy.",
          "Identify fair ways of sharing benefits and burdens.",
          "Create an accountability and monitoring plan.",
        ],

        sections: [
          {
            id: "cjifa",
            title: "Climate Justice Impact Fund for Africa",
            type: "content",
            paragraphs: [
              "The Climate Justice Impact Fund for Africa supports grassroots, youth-led, women-led and community-based climate action.",
              "Its purpose is to make climate finance more accessible and place greater decision-making power in African communities.",
            ],
          },
          {
            id: "scenario",
            title: "The Just Transition Challenge",
            type: "case-study",
            paragraphs: [
              "A community of 10,000 people has been selected for a renewable-energy project.",
              "The project may create employment and improve energy access, but it could also displace informal settlers and affect local water access.",
            ],
          },
          {
            id: "four-pillars",
            title: "Four Pillars of a Just Transition Action Plan",
            type: "content",
            points: [
              "Procedural justice: Who makes decisions and how will affected voices be heard?",
              "Distributive justice: Who receives the benefits and who carries the costs?",
              "Recognition justice: Whose rights, knowledge and experiences will be respected?",
              "Accountability: How will the community monitor whether commitments are fulfilled?",
            ],
          },
          {
            id: "project-deliverables",
            title: "Project Deliverables",
            type: "activity",
            points: [
              "A written Just Transition Action Plan.",
              "A stakeholder-engagement strategy.",
              "A benefit-and-burden assessment.",
              "A community accountability system.",
              "A short team presentation.",
            ],
          },
        ],
      },

      {
        slug: "questionnaire",
        shortTitle: "Assessment",
        title: "Climate & Social Justice Questionnaire",
        description:
          "Review the module and demonstrate your understanding of climate justice.",
        duration: "30 minutes",

        learningOutcomes: [
          "Review the main concepts from the module.",
          "Apply climate justice principles to real situations.",
          "Demonstrate readiness for the final project.",
        ],

        sections: [
          {
            id: "questions",
            title: "Module Questions",
            type: "questions",
            points: [
              "Define climate justice in your own words.",
              "Explain the concept of the triple injustice.",
              "Name and describe the three dimensions of climate justice.",
              "Why is Africa highly vulnerable to climate change despite its low emissions?",
              "Describe two climate challenges faced by women.",
              "Explain how intersectionality increases climate vulnerability.",
              "Summarise the Ogiek case and its significance.",
              "Name two legal pathways available for climate justice in Africa.",
              "What is the purpose of the Climate Justice Impact Fund for Africa?",
              "Describe the four pillars of a Just Transition Action Plan.",
              "Give one successful and one unsuccessful climate-litigation example from Africa.",
              "Suggest three ways communities can ensure climate projects are fair and inclusive.",
            ],
          },
        ],
      },
    ],

    finalProject: {
      title: "Just Transition Action Plan",
      description:
        "Design an inclusive climate action plan for a community affected by a new renewable-energy project.",
      deliverables: [
        "Two-page written action plan",
        "Stakeholder-engagement strategy",
        "Benefit-and-burden assessment",
        "Community accountability framework",
        "Ten-minute presentation",
      ],
    },
  },

  {
    slug: "climate-technology-and-data",
    title: "Climate Technology & Data",
    shortDescription:
      "Explore climate data, artificial intelligence, monitoring systems and visual communication.",
    fullDescription:
      "Learn how satellites, sensors, artificial intelligence and community-generated data are used to monitor climate change, predict weather and support local decisions.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    duration: "2 weeks",
    contactHours: "8 hours",
    mode: "Hybrid learning",
    level: "Foundation",
    progress: 0,
    certificateAvailable: true,

    learningOutcomes: [
      "Identify major climate-data sources.",
      "Explain how IoT sensors support climate monitoring.",
      "Compare CNNs and LSTMs in climate applications.",
      "Describe AI-powered weather-forecasting tools.",
      "Create clear climate-data visualisations.",
      "Design a community climate-monitoring system.",
    ],

    lessons: [
      {
        slug: "climate-data-and-monitoring",
        shortTitle: "Session 1",
        title: "Introduction to Climate Data & Monitoring",
        description:
          "Understand where climate data comes from and how monitoring systems collect environmental information.",
        duration: "2 hours",

        learningOutcomes: [
          "Identify major sources of climate data.",
          "Explain how climate-monitoring systems work.",
          "Describe the role of IoT climate sensors.",
          "Explain how AI supports environmental monitoring.",
        ],

        sections: [
          {
            id: "data-sources",
            title: "Major Climate Data Sources",
            type: "content",
            points: [
              "Satellite data",
              "Ground-based weather stations",
              "IoT and smart sensors",
              "Historical climate records",
              "Crowdsourced and citizen-science data",
              "Earth-system models",
            ],
          },
          {
            id: "satellite-data",
            title: "Satellite Data",
            type: "content",
            paragraphs: [
              "Satellites observe the Earth from space and can track changes in forests, vegetation, land use, fires, temperature and cloud cover.",
              "Examples include Landsat, Copernicus Sentinel, NASA MODIS and NOAA weather satellites.",
            ],
          },
          {
            id: "iot-sensors",
            title: "IoT Climate Sensors",
            type: "content",
            paragraphs: [
              "IoT sensors are connected devices that collect environmental information such as temperature, rainfall, soil moisture, air quality and greenhouse-gas emissions.",
              "They can transmit data continuously, making them useful for early warning, local monitoring and real-time decision-making.",
            ],
          },
          {
            id: "ch4net",
            title: "CH4Net",
            type: "example",
            paragraphs: [
              "CH4Net is an artificial-intelligence system designed to detect methane plumes.",
              "It is significant because methane is a powerful greenhouse gas and emissions can be difficult to identify quickly using traditional methods.",
            ],
          },
          {
            id: "global-forest-watch",
            title: "Global Forest Watch",
            type: "example",
            paragraphs: [
              "Global Forest Watch combines satellite imagery, radar observations and machine-learning techniques to identify forest loss and environmental change.",
              "Its tools allow communities, researchers and governments to monitor deforestation more quickly.",
            ],
          },
          {
            id: "data-detective",
            title: "Climate Data Detective",
            type: "activity",
            points: [
              "Choose one African country.",
              "Review tree-cover loss and fire information.",
              "Identify environmental hotspots.",
              "Describe the pattern shown by the data.",
              "Explain how the information could support policy.",
            ],
          },
        ],
      },

      {
        slug: "ai-climate-forecasting",
        shortTitle: "Session 2",
        title: "AI for Climate Forecasting & Prediction",
        description:
          "Explore artificial-intelligence models that improve the speed and usefulness of weather forecasting.",
        duration: "2 hours",

        learningOutcomes: [
          "Compare traditional and AI-based forecasting.",
          "Explain the roles of CNNs and LSTMs.",
          "Identify leading AI weather models.",
          "Explain the purpose of the En-ROADS simulator.",
        ],

        sections: [
          {
            id: "cnn-lstm",
            title: "CNNs and LSTMs",
            type: "content",
            points: [
              "CNNs analyse spatial information such as satellite images.",
              "LSTMs analyse patterns that change over time.",
              "Transformers support large-scale climate and weather forecasting.",
              "Random forests help classify observations and detect anomalies.",
            ],
          },
          {
            id: "pangu-weather",
            title: "Pangu-Weather",
            type: "example",
            paragraphs: [
              "Pangu-Weather uses a three-dimensional transformer architecture to produce fast global weather forecasts.",
              "Its main advantage is its ability to generate forecasts much faster than many traditional numerical systems.",
            ],
          },
          {
            id: "fourcastnet",
            title: "FourCastNet",
            type: "example",
            paragraphs: [
              "FourCastNet produces high-resolution global weather forecasts rapidly.",
              "Its speed makes it useful for running many forecast scenarios and exploring uncertainty.",
            ],
          },
          {
            id: "aon",
            title: "Aon Climate Risk Monitor",
            type: "content",
            paragraphs: [
              "The Aon Climate Risk Monitor combines historical observations, emissions scenarios and climate-model outputs.",
              "It helps organisations and insurers assess climate risk across many locations.",
            ],
          },
          {
            id: "enroads",
            title: "En-ROADS Climate Policy Simulation",
            type: "activity",
            points: [
              "Represent government, business, civil society or scientific stakeholders.",
              "Select different climate policies.",
              "Attempt to keep global warming below 2°C.",
              "Review the impact of each policy choice.",
              "Negotiate a combined climate-policy plan.",
            ],
          },
        ],
      },

      {
        slug: "climate-data-visualisation",
        shortTitle: "Session 3",
        title: "Climate Data Visualisation & Communication",
        description:
          "Learn how to transform climate information into clear, persuasive and accessible visual stories.",
        duration: "2 hours",

        learningOutcomes: [
          "Design a clear climate visualisation.",
          "Choose an appropriate visual format.",
          "Explain why simple visualisations are often persuasive.",
          "Create accessible climate communication.",
        ],

        sections: [
          {
            id: "simple-visuals",
            title: "Why Simple Visualisations Work",
            type: "content",
            paragraphs: [
              "Simple charts reduce mental effort and help audiences understand the main message quickly.",
              "A clear before-and-after comparison may communicate urgency more effectively than a crowded chart containing many scenarios and variables.",
            ],
          },
          {
            id: "visual-story",
            title: "Tell a Story with Data",
            type: "content",
            paragraphs: [
              "Numbers alone may not persuade an audience. A strong climate visualisation should connect the data to a clear human or environmental story.",
              "The title, labels and annotations should explain why the information matters.",
            ],
          },
          {
            id: "tools",
            title: "Climate Visualisation Tools",
            type: "content",
            points: [
              "Datawrapper",
              "Highcharts Dashboards",
              "Google Earth Engine",
              "Microsoft Excel",
              "Google Sheets",
            ],
          },
          {
            id: "accessibility",
            title: "Designing for Accessibility",
            type: "content",
            points: [
              "Use clear labels and titles.",
              "Provide alternative text for important images.",
              "Maintain sufficient contrast.",
              "Avoid depending only on colour.",
              "Use straightforward language and annotations.",
            ],
          },
          {
            id: "data-story-activity",
            title: "Design a Climate Data Story",
            type: "activity",
            points: [
              "Choose a climate dataset.",
              "Create one main chart or map.",
              "Add a clear title and annotation.",
              "Include the data source.",
              "Write a short explanation answering: Why does this matter?",
            ],
          },
        ],
      },

      {
        slug: "community-climate-observatory",
        shortTitle: "Session 4",
        title: "Community Climate Observatory",
        description:
          "Design a low-cost, inclusive and community-owned climate-monitoring system.",
        duration: "2 hours",

        learningOutcomes: [
          "Select suitable climate-monitoring tools.",
          "Develop a community data strategy.",
          "Explain how AI can support local analysis.",
          "Create an inclusive sustainability plan.",
        ],

        sections: [
          {
            id: "collection",
            title: "1. Data Collection Strategy",
            type: "content",
            points: [
              "Identify what should be measured.",
              "Select sensors, satellite tools or mobile applications.",
              "Create a process for verifying data quality.",
              "Make the data accessible to community members.",
            ],
          },
          {
            id: "analysis",
            title: "2. AI and Data Analysis",
            type: "content",
            points: [
              "Weather forecasting",
              "Trend analysis",
              "Anomaly detection",
              "Local training and skills development",
            ],
          },
          {
            id: "communication",
            title: "3. Communication and Action",
            type: "content",
            points: [
              "Create understandable charts and alerts.",
              "Share findings through trusted community channels.",
              "Use data to improve farming and water management.",
              "Use monitoring to support disaster preparedness.",
            ],
          },
          {
            id: "sustainability",
            title: "4. Sustainability Plan",
            type: "content",
            points: [
              "Define maintenance responsibilities.",
              "Plan for equipment repair and replacement.",
              "Identify long-term funding options.",
              "Ensure gender and disability inclusion.",
              "Use communication suitable for different literacy levels.",
            ],
          },
          {
            id: "observatory-project",
            title: "Build Your Observatory Plan",
            type: "activity",
            points: [
              "Choose the environmental data your community needs.",
              "Select appropriate sensors and digital tools.",
              "Explain how the data will be analysed.",
              "Describe how information will be shared.",
              "Create a long-term maintenance plan.",
            ],
          },
        ],
      },

      {
        slug: "questionnaire",
        shortTitle: "Assessment",
        title: "Climate Technology & Data Questionnaire",
        description:
          "Review the module and demonstrate your understanding of climate technology.",
        duration: "30 minutes",

        learningOutcomes: [
          "Review climate-monitoring concepts.",
          "Apply AI and data concepts.",
          "Design a simple community-monitoring proposal.",
        ],

        sections: [
          {
            id: "questions",
            title: "Module Questions",
            type: "questions",
            points: [
              "List four major sources of climate data.",
              "Explain how IoT sensors support climate monitoring.",
              "What is CH4Net and why is it significant?",
              "Compare CNNs and LSTMs in climate applications.",
              "Name two AI weather-forecasting models and one advantage of each.",
              "What is the purpose of the En-ROADS simulator?",
              "Why are simple climate visualisations often more persuasive?",
              "Mention three tools used for climate-data visualisation.",
              "Describe the four components of a Community Climate Observatory.",
              "Design a basic AI-powered climate-monitoring plan for your community.",
              "How does Global Forest Watch use AI?",
              "What role does Aon Climate Risk Monitor play?",
            ],
          },
        ],
      },
    ],

    finalProject: {
      title: "Community Climate Observatory",
      description:
        "Design a low-cost monitoring system that collects, analyses and communicates climate information for a community.",
      deliverables: [
        "Monitoring strategy",
        "Technical documentation",
        "Community-engagement plan",
        "Data-communication approach",
        "Maintenance and sustainability plan",
      ],
    },
  },
];

export function getSustainabilityCourse(courseSlug: string) {
  return sustainabilityCourses.find((course) => course.slug === courseSlug);
}

export function getSustainabilityLesson(
  courseSlug: string,
  lessonSlug: string,
) {
  const course = getSustainabilityCourse(courseSlug);

  if (!course) {
    return null;
  }

  const lesson = course.lessons.find(
    (currentLesson) => currentLesson.slug === lessonSlug,
  );

  if (!lesson) {
    return null;
  }

  return {
    course,
    lesson,
  };
}