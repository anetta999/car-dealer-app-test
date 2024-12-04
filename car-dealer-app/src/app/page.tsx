import FilterForm from "@/components/FilterForm/FilterForm";
import { notFound } from "next/navigation";

interface IVehicle {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface IVehicles {
  Count: string;
  Message: string;
  Results: IVehicle[];
  SearchCriteria: string;
}

const getAllVehicles = async (): Promise<IVehicles> => {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const vehicles = await response.json();
  console.log(vehicles);

  if (!vehicles) notFound();
  return vehicles;
};

export default async function Home() {
  const vehicles = await getAllVehicles();

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <section className="pt-[80px] pb-[80px">
          <div className="mx-auto pl-[15px] pr-[15px] max-w-[1440px]">
            <FilterForm vehicles={vehicles} />
          </div>
        </section>
      </main>
    </div>
  );
}
