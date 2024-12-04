"use client";

import modelYears from "@/data/modelYears";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

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

interface IFilterFormProps {
  vehicles: IVehicles;
}

interface IFormValues {
  makeId: string;
  makeYear: string;
}

const FilterForm = ({ vehicles }: IFilterFormProps) => {
  const { register, handleSubmit } = useForm<IFormValues>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    router.push(`result/${data.makeId}/${data.makeYear}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-4xl font-semibold mb-[60px]">
          Choose Vehicle Make Name
        </p>
        <div className="mb-[70px] border border-slate-400 p-[10px] w-[370px] bg-white">
          <select {...register("makeId")}>
            {vehicles.Results?.map((vehicle: IVehicle) => {
              return (
                <option key={vehicle?.MakeName} value={vehicle?.MakeId}>
                  {vehicle?.MakeName}
                </option>
              );
            })}
          </select>
        </div>
        <p className="text-4xl font-semibold mb-[60px]">Choose Model Year</p>
        <div className="mb-[70px] border border-slate-400 p-[10px] w-[370px] bg-white">
          <select {...register("makeYear")}>
            {modelYears.map((year) => {
              return <option key={year}>{year}</option>;
            })}
          </select>
        </div>
        <button
          type="submit"
          className="pt-[30px] pb-[30px] pl-[60px] pr-[60px] text-white bg-black border border-black rounded"
        >
          Next
        </button>
      </form>
    </>
  );
};

export default FilterForm;
