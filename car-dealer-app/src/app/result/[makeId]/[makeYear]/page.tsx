import modelYears from "@/data/modelYears";
import { notFound } from "next/navigation";

interface IVehicle {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface IParam {
  Make_ID: number;
  makeYear: string;
}

export async function generateStaticParams() {
  const vehicleResponse = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
    { cache: "force-cache" }
  );

  const vehicles = await vehicleResponse.json();

  if (!vehicles) return notFound();

  const params = vehicles.Results.flatMap((vehicle: IVehicle) =>
    modelYears.map((year) => ({
      makeId: vehicle.Make_ID,
      makeYear: year,
    }))
  );

  return params.map((param: IParam) => ({
    params: {
      makeId: param.Make_ID?.toString() || "",
      makeYear: param.makeYear,
    },
  }));
}

const getFilteredVehicles = async (makeId: number, makeYear: string) => {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${Number(
      makeId
    )}/modelyear/${makeYear}?format=json`
  );

  const filteredVehicles = await response.json();
  console.log(filteredVehicles);

  if (!filteredVehicles) return notFound();

  return filteredVehicles;
};

const ResultPage = async ({
  params,
}: {
  params: { makeId: string; makeYear: string };
}) => {
  const { makeId, makeYear } = params;
  const makeIdNumber = Number(makeId);

  const filteredVehicles = await getFilteredVehicles(makeIdNumber, makeYear);
  console.log(filteredVehicles);

  return (
    <section className="pt-[80px] pb-[80px]">
      <div className="mx-auto pl-[15px] pr-[15px] max-w-[1440px]">
        <h1 className="text-4xl font-semibold mb-[60px]">Filtered Vehicles</h1>
        <ul>
          {filteredVehicles?.Results?.map((vehicle: IVehicle) => (
            <li key={vehicle.Model_Name}>
              <p>Vehicle Make Name: {vehicle.Make_Name}</p>
              <p>Vehicle Model Name: {vehicle.Model_Name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResultPage;
