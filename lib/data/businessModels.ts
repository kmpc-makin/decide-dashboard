import { BusinessModel, Sector } from '@/types/businessModel';

export const BUSINESS_MODELS: BusinessModel[] = [
  {
    id: 'old-car-batteries-to-new',
    name: 'Old Car Batteries to New Car Batteries',
    description: 'Recycling and refurbishing used automotive batteries into new battery products, reducing waste and resource extraction.',
    sector: 'batteries',
  },
  {
    id: 'second-life-batteries',
    name: 'Giving Car Batteries a Second Life',
    description: 'Repurposing automotive batteries for secondary applications such as energy storage systems and grid support.',
    sector: 'batteries',
  },
  {
    id: 'biomass-energy',
    name: 'Sourcing Energy from Biomass',
    description: 'Converting organic waste and biomass materials into renewable energy through sustainable processing methods.',
    sector: 'energy',
  },
  {
    id: 'tomato-stems-paper',
    name: 'From Tomato Stems to Paper Products',
    description: 'Innovative upcycling of agricultural waste from tomato plants into high-quality paper and packaging materials.',
    sector: 'packaging',
  },
  {
    id: 'resim-packaging',
    name: 'Resim Packaging - Sustainable Plastic Packaging',
    description: 'Developing eco-friendly plastic packaging solutions using recycled materials and sustainable production processes.',
    sector: 'packaging',
  },
  {
    id: 'automotive-textile-insulation',
    name: 'Automotive Textile Waste into High-Quality Insulation',
    description: 'Transforming discarded automotive textiles into premium thermal and acoustic insulation materials for buildings.',
    sector: 'textile',
  },
  {
    id: 'lamon-biodegradable-films',
    name: "Transition to Sustainable Packaging with LAM'ON Biodegradable Films",
    description: 'Revolutionary biodegradable packaging films that replace traditional plastics with environmentally friendly alternatives.',
    sector: 'packaging',
  },
  {
    id: 'biocompost-packaging',
    name: 'Biocompost from Degradable Packaging Material',
    description: 'Creating nutrient-rich biocompost from biodegradable packaging waste, closing the loop in packaging lifecycle.',
    sector: 'packaging',
  },
  {
    id: 'nature-flavor-green',
    name: 'Reducing Food Waste with Nature Flavor Green',
    description: 'Innovative food preservation and processing solutions to minimize waste and extend product shelf life naturally.',
    sector: 'food',
  },
  {
    id: 'easyvegan',
    name: 'easyVEGAN',
    description: 'Plant-based food solutions that reduce environmental impact while providing accessible, sustainable nutrition options.',
    sector: 'food',
  },
  {
    id: 'fahnen-gartner',
    name: 'Fahnen-Gärtner',
    description: 'Sustainable textile production and flag manufacturing using eco-friendly materials and circular economy principles.',
    sector: 'textile',
  },
  {
    id: 'humana-nova',
    name: 'Humana Nova - Creating Value from Waste',
    description: 'Comprehensive textile recycling and upcycling program turning waste textiles into valuable new products and materials.',
    sector: 'textile',
  },
  {
    id: 'ecoplastic-recycling',
    name: 'EcoPlastic Recycling',
    description: 'Advanced plastic recycling facility processing various plastic waste streams into high-quality recycled materials.',
    sector: 'recycling',
  },
  {
    id: 'maicom-textile',
    name: 'MAICOM Sustainable Textile Production',
    description: 'Modern textile manufacturing with focus on sustainable materials, circular processes, and minimal environmental impact.',
    sector: 'textile',
  },
  {
    id: 'renergy-batteries',
    name: 'RENERGY - Recycling of Used Batteries',
    description: 'Specialized battery recycling facility recovering valuable materials from spent batteries for reuse in new products.',
    sector: 'batteries',
  },
  {
    id: 'granum-organic',
    name: 'Granum - Organic Production and Processing',
    description: 'Organic food production and processing using sustainable farming practices and circular agriculture principles.',
    sector: 'food',
  },
  {
    id: 'co2-pyrolysis',
    name: 'Sourcing CO2 - Negative Carbon via Pyrolysis',
    description: 'Carbon-negative technology using pyrolysis to convert organic waste into biochar while sequestering CO2.',
    sector: 'energy',
  },
];

// Helper function to filter business models by sector
export function getBusinessModelsBySector(sector: Sector): BusinessModel[] {
  return BUSINESS_MODELS.filter(model => model.sector === sector);
}

// Helper function to search business models by name
export function searchBusinessModels(query: string): BusinessModel[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return BUSINESS_MODELS;
  
  return BUSINESS_MODELS.filter(model => 
    model.name.toLowerCase().includes(lowerQuery) ||
    model.description.toLowerCase().includes(lowerQuery)
  );
}

// Get a business model by ID
export function getBusinessModelById(id: string): BusinessModel | undefined {
  return BUSINESS_MODELS.find(model => model.id === id);
}
