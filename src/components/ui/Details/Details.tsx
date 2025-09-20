import React from "react";
import { ProductType } from "@/types/product.type";
import AddBtn from "@/app/_components/AddBtn/AddBtn";

export default function Details({ data }: { data: ProductType }) {
  return (
    <>
      <div className="container  w-full lg:w-[60%] mx-auto p-4 flex">
        <div className="w-1/4">
          <div className="p-4">
            <img src={data.imageCover} className="w-full" alt="" />
          </div>
        </div>
        <div className="w-3/4">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
            <p>{data.description}</p>
            <p className="text-emerald-500">{data.category.name}</p>
            <div className="flex justify-between w-full my-4">
              <span>{data.price} EGP</span>
              <span className="">
                {data.ratingsAverage}{" "}
                <i className="fas fa-star text-yellow-500"></i>
              </span>
              <AddBtn id={data.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
