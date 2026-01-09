export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  location: string;
  date: string;
  client?: string;
  services: string[];
  images: PortfolioImage[];
  featured: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
}

export interface PortfolioImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isMain: boolean;
  uploadedAt?: string;
  uploadedBy?: string;
}

export type PortfolioCategory = 
  | 'perceelafpaling'
  | 'topografie'
  | 'bouwmeting'
  | 'gps-meting'
  | 'plaatsbeschrijving'
  | '3d-scanning'
  | 'gis-mapping';

export const portfolioCategories: Record<PortfolioCategory, { label: string; description: string }> = {
  'perceelafpaling': {
    label: 'Perceelafpaling',
    description: 'Nauwkeurige afbakening van percelen met officiële grensmarkeringen'
  },
  'topografie': {
    label: 'Topografische Opmeting',
    description: 'Complete terreinopmetingen met hoogtegegevens en terreindetails'
  },
  'bouwmeting': {
    label: 'Bouwmeting',
    description: 'Uitzetting en controle van bouwprojecten'
  },
  'gps-meting': {
    label: 'GPS Metingen',
    description: 'Hoogprecisie GPS-metingen voor exacte plaatsbepaling'
  },
  'plaatsbeschrijving': {
    label: 'Plaatsbeschrijving',
    description: 'Gedetailleerde documentatie van bestaande toestanden'
  },
  '3d-scanning': {
    label: '3D Scanning',
    description: 'Laserscanning voor gedetailleerde 3D-modellen'
  },
  'gis-mapping': {
    label: 'GIS Mapping',
    description: 'Geografische informatiesystemen en digitale kaarten'
  }
};

// Default portfolio data with Unsplash images
export const defaultPortfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Perceelafpaling Residentiële Wijk Damme',
    description: 'Volledige afpaling van 12 bouwpercelen in een nieuwe verkaveling. Inclusief plaatsing van grenspalen en opmaak van officiële processen-verbaal voor elke eigenaar.',
    category: 'perceelafpaling',
    location: 'Damme, West-Vlaanderen',
    date: '2024-09',
    client: 'Projectontwikkelaar NV',
    services: ['Perceelafpaling', 'Proces-verbaal', 'Digitale plannen'],
    featured: true,
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
        alt: 'Landmeter aan het werk met meetapparatuur',
        isMain: true
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        alt: 'Bouwterrein met afbakening',
        isMain: false
      }
    ],
    testimonial: {
      quote: 'Zeer professionele aanpak. De afpaling werd snel en nauwkeurig uitgevoerd.',
      author: 'Marc Vandenberghe',
      role: 'Projectmanager'
    }
  },
  {
    id: '2',
    title: 'Topografische Opmeting Natuurgebied',
    description: 'Gedetailleerde topografische opmeting van 15 hectare natuurgebied voor herinrichtingsproject. Inclusief hoogtemodel en vegetatiekartering.',
    category: 'topografie',
    location: 'Knokke-Heist',
    date: '2024-07',
    services: ['Topografische opmeting', '3D terreinmodel', 'Hoogtekaart'],
    featured: true,
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
        alt: 'Topografische meting in natuurgebied',
        isMain: true
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
        alt: 'Drone opname terrein',
        isMain: false
      }
    ]
  },
  {
    id: '3',
    title: 'Bouwmeting Appartementencomplex',
    description: 'Complete bouwmeting voor nieuwbouwproject met 48 appartementen. Uitzetting van funderingen, controle tijdens bouw en as-built opmeting.',
    category: 'bouwmeting',
    location: 'Brugge Centrum',
    date: '2024-05',
    client: 'Bouwbedrijf Claeys',
    services: ['Maatvoering', 'Uitzetting', 'As-built opmeting'],
    featured: true,
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        alt: 'Bouwplaats met meetapparatuur',
        isMain: true
      },
      {
        id: '3-2',
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
        alt: 'Bouwproject in uitvoering',
        isMain: false
      }
    ]
  },
  {
    id: '4',
    title: 'GPS Kadastrale Opmeting Landbouwpercelen',
    description: 'RTK GPS opmeting van 25 landbouwpercelen voor actualisatie kadastrale gegevens. Millimeter-nauwkeurige coördinaatbepaling.',
    category: 'gps-meting',
    location: 'Oostkamp',
    date: '2024-03',
    services: ['GPS meting', 'Kadastrale update', 'Digitale kaarten'],
    featured: false,
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
        alt: 'GPS meting op landbouwgrond',
        isMain: true
      }
    ]
  },
  {
    id: '5',
    title: 'Plaatsbeschrijving Historisch Pand',
    description: 'Gedetailleerde plaatsbeschrijving van beschermd monument voor renovatieproject. Fotodocumentatie en technische opname van alle gevels en interieurs.',
    category: 'plaatsbeschrijving',
    location: 'Brugge',
    date: '2024-01',
    services: ['Plaatsbeschrijving', 'Fotodocumentatie', 'Technisch rapport'],
    featured: false,
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
        alt: 'Historisch gebouw Brugge',
        isMain: true
      }
    ]
  },
  {
    id: '6',
    title: '3D Laserscan Industrieel Complex',
    description: 'Volledige 3D laserscan van industrieel complex voor BIM-model. Point cloud verwerking en as-built documentatie.',
    category: '3d-scanning',
    location: 'Zeebrugge',
    date: '2023-11',
    client: 'Haven Zeebrugge',
    services: ['3D scanning', 'Point cloud', 'BIM model'],
    featured: true,
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
        alt: '3D scan industrieel gebouw',
        isMain: true
      },
      {
        id: '6-2',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        alt: 'Laserscanner in actie',
        isMain: false
      }
    ]
  },
  {
    id: '7',
    title: 'GIS Mapping Gemeentelijk Wegennet',
    description: 'Digitalisering van het volledige gemeentelijke wegennet. Integratie in GIS-systeem met attributendata.',
    category: 'gis-mapping',
    location: 'Gemeente Jabbeke',
    date: '2023-09',
    client: 'Gemeente Jabbeke',
    services: ['GIS mapping', 'Digitalisering', 'Database opbouw'],
    featured: false,
    images: [
      {
        id: '7-1',
        url: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80',
        alt: 'Digitale kaart wegennet',
        isMain: true
      }
    ]
  },
  {
    id: '8',
    title: 'Verkaveling Nieuwbouwproject',
    description: 'Complete landmeetkundige begeleiding van verkaveling met 20 kavels. Van voorontwerp tot definitieve afpaling.',
    category: 'perceelafpaling',
    location: 'Blankenberge',
    date: '2023-06',
    services: ['Verkavelingsplan', 'Afpaling', 'Vergunningsdossier'],
    featured: false,
    images: [
      {
        id: '8-1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        alt: 'Nieuwbouwproject verkaveling',
        isMain: true
      }
    ]
  }
];

// Admin upload zones configuration
export interface UploadZone {
  id: string;
  name: string;
  description: string;
  maxImages: number;
  acceptedTypes: string[];
  maxSizeMB: number;
  location: 'portfolio' | 'homepage' | 'services' | 'team';
}

export const uploadZones: UploadZone[] = [
  {
    id: 'portfolio-projects',
    name: 'Portfolio Projecten',
    description: 'Foto\'s van afgeronde projecten voor de portfolio pagina',
    maxImages: 50,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB: 10,
    location: 'portfolio'
  },
  {
    id: 'homepage-hero',
    name: 'Homepage Hero',
    description: 'Hoofdafbeelding voor de homepage',
    maxImages: 5,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB: 15,
    location: 'homepage'
  },
  {
    id: 'service-images',
    name: 'Diensten Afbeeldingen',
    description: 'Afbeeldingen voor de dienstenpagina\'s',
    maxImages: 20,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB: 10,
    location: 'services'
  },
  {
    id: 'team-photos',
    name: 'Team Foto\'s',
    description: 'Profielfoto\'s van teamleden',
    maxImages: 20,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB: 5,
    location: 'team'
  }
];
