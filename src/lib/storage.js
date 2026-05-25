import { formatCurrency } from "@/lib/formatters";

const KEYS = {
  companies: "autobox_companies_v2",
  cars: "autobox_cars_v2",
  reservations: "autobox_reservations_v2",
  selectedCompany: "autobox_selected_company_v2",
};

const uid = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const STATUSES = {
  company: {
    active: "Ativa",
    blocked: "Bloqueada",
    trial: "Teste",
  },
  subscription: {
    active: "Assinatura ativa",
    pending: "Pagamento pendente",
    overdue: "Pagamento atrasado",
    cancelled: "Cancelada",
  },
  car: {
    available: "Disponível",
    reserved: "Reservado",
    maintenance: "Manutenção",
    inactive: "Inativo",
  },
  reservation: {
    pending: "Pendente",
    approved: "Aprovada",
    cancelled: "Cancelada",
    completed: "Concluída",
  },
};

export const statusStyles = {
  active: "bg-green-50 text-green-700 border-green-200",
  trial: "bg-blue-50 text-blue-700 border-blue-200",
  blocked: "bg-red-50 text-red-700 border-red-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  completed: "bg-purple-50 text-purple-700 border-purple-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  available: "bg-green-50 text-green-700 border-green-200",
  reserved: "bg-yellow-50 text-yellow-700 border-yellow-200",
  maintenance: "bg-orange-50 text-orange-700 border-orange-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
};

const seedCompanies = [
  {
    id: "company_alpha",
    slug: "alpha-flex",
    name: "Alpha Flex Locadora",
    legalName: "Alpha Flex Locadora LTDA",
    ownerName: "Marcos Almeida",
    email: "contato@alphaflex.com.br",
    whatsapp: "+55 (11) 98888-1010",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    city: "São Paulo",
    state: "SP",
    status: "active",
    subscriptionStatus: "active",
    planName: "AutoBox Pro",
    planPrice: 97,
    startedAt: "2026-05-01",
    logo: "AF",
    brandColor: "#f5a623",
    publicHeadline: "Aluguel de carros sem enrolação em São Paulo",
    howItWorks:
      "Escolha o veículo, envie sua solicitação de reserva, aguarde nossa confirmação pelo WhatsApp e retire o carro com CNH válida e documentos conferidos.",
    contactText: "Atendimento de segunda a sábado, das 8h às 18h. Confirmação rápida pelo WhatsApp.",
    rules: "Caução conforme categoria, CNH válida, contrato assinado e vistoria na retirada/devolução.",
    packages: [
      { id: "pkg_daily", name: "Diária", description: "Aluguel por diária com retirada e devolução combinadas.", enabled: true },
      { id: "pkg_weekly", name: "Semanal", description: "Condição especial para 7 dias ou mais.", enabled: true },
      { id: "pkg_monthly", name: "Mensal", description: "Plano recorrente para empresas e motoristas.", enabled: true },
      { id: "pkg_km_free", name: "Km livre", description: "Pacote com quilometragem livre em veículos selecionados.", enabled: false },
    ],
  },
  {
    id: "company_serra",
    slug: "serra-motors",
    name: "Serra Motors Rent",
    legalName: "Serra Motors Rent a Car LTDA",
    ownerName: "Camila Rocha",
    email: "reservas@serramotors.com.br",
    whatsapp: "+55 (54) 97777-2020",
    address: "Rua Borges de Medeiros, 455 - Gramado, RS",
    city: "Gramado",
    state: "RS",
    status: "trial",
    subscriptionStatus: "pending",
    planName: "AutoBox Pro",
    planPrice: 97,
    startedAt: "2026-05-18",
    logo: "SM",
    brandColor: "#0d1545",
    publicHeadline: "Frota pronta para turismo e viagens na Serra Gaúcha",
    howItWorks:
      "Faça a pré-reserva pelo site, nossa equipe valida disponibilidade e finaliza o contrato pelo atendimento da locadora.",
    contactText: "Reservas online com retorno em até 30 minutos no horário comercial.",
    rules: "Aceitamos reservas para turismo, eventos e viagens regionais. Consulte regras de caução e seguro.",
    packages: [
      { id: "pkg_daily_serra", name: "Diária", description: "Ideal para turismo local.", enabled: true },
      { id: "pkg_driver", name: "Com motorista", description: "Serviço com motorista sob consulta.", enabled: true },
    ],
  },
];

const seedCars = [
  {
    id: "car_hb20",
    companyId: "company_alpha",
    name: "Hyundai HB20 Comfort",
    brand: "Hyundai",
    model: "HB20",
    year: 2025,
    plate: "ABC1D23",
    category: "Hatch",
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    dailyPrice: 129,
    weeklyPrice: 790,
    monthlyPrice: 2750,
    deposit: 900,
    status: "available",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80",
    description: "Hatch econômico para uso urbano, aplicativos e viagens curtas.",
    features: ["Ar-condicionado", "Bluetooth", "Direção elétrica"],
  },
  {
    id: "car_onix",
    companyId: "company_alpha",
    name: "Chevrolet Onix Plus Premier",
    brand: "Chevrolet",
    model: "Onix Plus",
    year: 2024,
    plate: "BOX9A97",
    category: "Sedan",
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    dailyPrice: 159,
    weeklyPrice: 960,
    monthlyPrice: 3300,
    deposit: 1200,
    status: "reserved",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80",
    description: "Sedan confortável com bom porta-malas e pacote completo.",
    features: ["Multimídia", "Câmera de ré", "Controle de estabilidade"],
  },
  {
    id: "car_compass",
    companyId: "company_alpha",
    name: "Jeep Compass Longitude",
    brand: "Jeep",
    model: "Compass",
    year: 2025,
    plate: "JEP2C25",
    category: "SUV",
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    dailyPrice: 289,
    weeklyPrice: 1780,
    monthlyPrice: 6200,
    deposit: 2200,
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=80",
    description: "SUV premium para família, viagens e clientes corporativos.",
    features: ["GPS", "Bancos em couro", "Piloto automático"],
  },
  {
    id: "car_kicks",
    companyId: "company_serra",
    name: "Nissan Kicks Advance",
    brand: "Nissan",
    model: "Kicks",
    year: 2024,
    plate: "SER4R24",
    category: "SUV",
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    dailyPrice: 239,
    weeklyPrice: 1450,
    monthlyPrice: 5200,
    deposit: 1800,
    status: "available",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=80",
    description: "SUV confortável para turismo, casal e família.",
    features: ["Ar digital", "Multimídia", "Assistente de partida"],
  },
];

const seedReservations = [
  {
    id: "res_1001",
    companyId: "company_alpha",
    carId: "car_hb20",
    customerName: "João Pereira",
    phone: "+55 (11) 99999-1212",
    email: "joao@email.com",
    pickupDate: "2026-06-02",
    returnDate: "2026-06-05",
    status: "pending",
    notes: "Retirada no aeroporto de Congonhas.",
    total: 387,
    createdAt: "2026-05-24",
  },
  {
    id: "res_1002",
    companyId: "company_alpha",
    carId: "car_onix",
    customerName: "Fernanda Costa",
    phone: "+55 (11) 97777-4444",
    email: "fernanda@email.com",
    pickupDate: "2026-06-10",
    returnDate: "2026-06-17",
    status: "approved",
    notes: "Cliente pediu bebê conforto.",
    total: 960,
    createdAt: "2026-05-22",
  },
];

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const initAutoBoxData = () => {
  if (!localStorage.getItem(KEYS.companies)) write(KEYS.companies, seedCompanies);
  if (!localStorage.getItem(KEYS.cars)) write(KEYS.cars, seedCars);
  if (!localStorage.getItem(KEYS.reservations)) write(KEYS.reservations, seedReservations);
  if (!localStorage.getItem(KEYS.selectedCompany)) localStorage.setItem(KEYS.selectedCompany, seedCompanies[0].id);
};

export const slugify = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || `locadora-${Date.now()}`;

export const getCompanies = () => {
  initAutoBoxData();
  return read(KEYS.companies, seedCompanies);
};

export const saveCompanies = (companies) => write(KEYS.companies, companies);

export const getSelectedCompanyId = () => {
  initAutoBoxData();
  const stored = localStorage.getItem(KEYS.selectedCompany);
  const companies = getCompanies();
  if (companies.some((c) => c.id === stored)) return stored;
  return companies[0]?.id || null;
};

export const setSelectedCompanyId = (companyId) => {
  localStorage.setItem(KEYS.selectedCompany, companyId);
};

export const getCompanyById = (id) => getCompanies().find((c) => c.id === id) || getCompanies()[0];
export const getCompanyBySlug = (slug) => getCompanies().find((c) => c.slug === slug);

export const createCompany = (payload) => {
  const companies = getCompanies();
  const baseSlug = slugify(payload.name);
  const exists = companies.some((c) => c.slug === baseSlug);
  const company = {
    id: uid("company"),
    slug: exists ? `${baseSlug}-${companies.length + 1}` : baseSlug,
    name: payload.name || "Nova Locadora",
    legalName: payload.legalName || "",
    ownerName: payload.ownerName || "",
    email: payload.email || "",
    whatsapp: payload.whatsapp || "+55 ",
    address: payload.address || "",
    city: payload.city || "",
    state: payload.state || "",
    status: "active",
    subscriptionStatus: "pending",
    planName: "AutoBox Pro",
    planPrice: 97,
    startedAt: new Date().toISOString().slice(0, 10),
    logo: (payload.name || "AB").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    logoDataUrl: "",
    brandColor: "#f5a623",
    publicHeadline: "Aluguel de carros com reserva online",
    howItWorks: "Escolha um carro, envie a solicitação de reserva e aguarde a confirmação da locadora pelo WhatsApp.",
    contactText: "Atendimento via WhatsApp em horário comercial.",
    rules: "Caução, CNH válida e contrato de locação são exigidos conforme política da empresa.",
    packages: [
      { id: uid("pkg"), name: "Diária", description: "Reserva por diária.", enabled: true },
      { id: uid("pkg"), name: "Semanal", description: "Condição especial para 7 dias ou mais.", enabled: true },
    ],
  };
  saveCompanies([company, ...companies]);
  setSelectedCompanyId(company.id);
  return company;
};

export const updateCompany = (id, patch) => {
  const companies = getCompanies().map((company) =>
    company.id === id ? { ...company, ...patch, slug: patch.slug ? slugify(patch.slug) : patch.name ? slugify(patch.name) : company.slug } : company,
  );
  saveCompanies(companies);
  return companies.find((c) => c.id === id);
};

export const deleteCompany = (id) => {
  saveCompanies(getCompanies().filter((company) => company.id !== id));
  saveCars(getCars().filter((car) => car.companyId !== id));
  saveReservations(getReservations().filter((reservation) => reservation.companyId !== id));
  const next = getCompanies()[0]?.id;
  if (next) setSelectedCompanyId(next);
};

export const getCars = () => {
  initAutoBoxData();
  return read(KEYS.cars, seedCars);
};
export const saveCars = (cars) => write(KEYS.cars, cars);
export const getCarsByCompany = (companyId) => getCars().filter((car) => car.companyId === companyId);
export const getCarById = (id) => getCars().find((car) => car.id === id);

export const createCar = (payload) => {
  const car = {
    id: uid("car"),
    companyId: payload.companyId,
    name: payload.name || "Novo veículo",
    brand: payload.brand || "",
    model: payload.model || "",
    year: Number(payload.year || new Date().getFullYear()),
    plate: payload.plate || "",
    category: payload.category || "Hatch",
    seats: Number(payload.seats || 5),
    transmission: payload.transmission || "Automático",
    fuel: payload.fuel || "Flex",
    dailyPrice: Number(payload.dailyPrice || 0),
    weeklyPrice: Number(payload.weeklyPrice || 0),
    monthlyPrice: Number(payload.monthlyPrice || 0),
    deposit: Number(payload.deposit || 0),
    status: payload.status || "available",
    image: payload.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=80",
    description: payload.description || "Veículo cadastrado no painel da locadora.",
    features: Array.isArray(payload.features) ? payload.features : String(payload.features || "Ar-condicionado, Bluetooth").split(",").map((item) => item.trim()).filter(Boolean),
  };
  saveCars([car, ...getCars()]);
  return car;
};

export const updateCar = (id, patch) => {
  const cars = getCars().map((car) => (car.id === id ? { ...car, ...patch } : car));
  saveCars(cars);
  return cars.find((car) => car.id === id);
};

export const deleteCar = (id) => saveCars(getCars().filter((car) => car.id !== id));

export const getReservations = () => {
  initAutoBoxData();
  return read(KEYS.reservations, seedReservations);
};
export const saveReservations = (reservations) => write(KEYS.reservations, reservations);
export const getReservationsByCompany = (companyId) => getReservations().filter((reservation) => reservation.companyId === companyId);

export const createReservation = (payload) => {
  const car = getCarById(payload.carId);
  const days = Math.max(1, Number(payload.days || 1));
  const total = payload.total || Number(car?.dailyPrice || 0) * days;
  const reservation = {
    id: uid("res"),
    companyId: payload.companyId,
    carId: payload.carId,
    customerName: payload.customerName || "Cliente",
    phone: payload.phone || "+55 ",
    email: payload.email || "",
    pickupDate: payload.pickupDate || "",
    returnDate: payload.returnDate || "",
    status: "pending",
    notes: payload.notes || "",
    total,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  saveReservations([reservation, ...getReservations()]);
  return reservation;
};

export const updateReservation = (id, patch) => {
  const reservations = getReservations().map((reservation) => (reservation.id === id ? { ...reservation, ...patch } : reservation));
  saveReservations(reservations);
  return reservations.find((reservation) => reservation.id === id);
};

export const deleteReservation = (id) => saveReservations(getReservations().filter((reservation) => reservation.id !== id));

export const summarizeCompany = (companyId) => {
  const cars = getCarsByCompany(companyId);
  const reservations = getReservationsByCompany(companyId);
  const revenue = reservations
    .filter((reservation) => ["approved", "completed"].includes(reservation.status))
    .reduce((sum, reservation) => sum + Number(reservation.total || 0), 0);
  return {
    cars: cars.length,
    availableCars: cars.filter((car) => car.status === "available").length,
    reservations: reservations.length,
    pendingReservations: reservations.filter((reservation) => reservation.status === "pending").length,
    revenueLabel: formatCurrency(revenue),
  };
};
