import { Link } from "react-router-dom";
import { Building2, Car, MapPin } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getCarsByCompany, getCompanies } from "@/lib/storage";

export default function CompanyDirectory() {
  const companies = getCompanies();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-widest text-gold">Locadoras no AutoBox</p>
          <h1 className="mt-1 font-playfair text-4xl font-black text-gray-900">Páginas públicas de exemplo</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-500">Cada locadora tem a própria vitrine com frota, contato e formulário de reserva.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => {
            const cars = getCarsByCompany(company.id);
            return (
              <Link key={company.id} to={`/locadora/${company.slug}`} className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-navy text-xl font-black text-white">
                    {company.logoDataUrl ? <img src={company.logoDataUrl} alt={company.name} className="h-full w-full object-cover" /> : company.logo || "AB"}
                  </div>
                  <div>
                    <p className="text-xl font-black text-gray-900">{company.name}</p>
                    <p className="text-sm text-gray-500">/{company.slug}</p>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-gray-500">{company.publicHeadline}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-gray-600">
                  <span className="rounded-full bg-gray-50 px-3 py-1"><MapPin className="mr-1 inline h-4 w-4" />{company.city}/{company.state}</span>
                  <span className="rounded-full bg-gray-50 px-3 py-1"><Car className="mr-1 inline h-4 w-4" />{cars.length} carros</span>
                  <span className="rounded-full bg-gray-50 px-3 py-1"><Building2 className="mr-1 inline h-4 w-4" />{company.planName}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
