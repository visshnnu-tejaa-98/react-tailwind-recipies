import React, { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { featuredData } from "../data/featuredData";
import "../styles/FeaturedRecieps.css";

const FeaturedRecieps = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const getData = async () => {
    let req = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm
    );
    console.log(req);
    let res = await req.json();
    console.log(res);
    setData(res.meals);
    setFilteredData(res.meals);
  };
  useEffect(() => {
    getData();
    console.log(data);
    setFilteredData(featuredData);
  }, []);
  const handleGetData = () => {
    getData();
    setSearchTerm("");
  };
  return (
    <div>
      <SectionHeader title="Featured Recieps" />
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by Recipie"
          className="rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-2 px-2 rounded bg-blue-500 text-white "
          onClick={handleGetData}
        >
          Search
        </button>
      </div>
      <div className="featured-recieps-conatiner flex justify-center mx-[15%]">
        {!filteredData && (
          <div className="flex justify-center m-10">No Data!</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData &&
            filteredData?.map((recipie) => (
              <div className="flex drop-shadow-md card ">
                <div className="thumb-container">
                  <img src={recipie.strMealThumb} className="meal-thumb" />
                </div>
                <div className="bg-white p-2.5 w-[10rem] details-cont relative">
                  <h2 className="text-lg font-semibold">
                    <span>
                      {recipie?.strMeal?.length > 20
                        ? `${recipie.strMeal.slice(0, 20)}...`
                        : recipie.strMeal}
                    </span>
                  </h2>
                  <div className="">
                    {recipie.strTags
                      ?.split(",")
                      .map((tag) =>
                        tag !== "" ? (
                          <span className="tag bg-pink-300 px-1 py-0.5 rounded-full text-black mr-1">
                            {tag}
                          </span>
                        ) : (
                          ""
                        )
                      )}
                  </div>
                  <span className="flex items-center">
                    <span className="text-sm text-slate-400 label">
                      {recipie.strArea}
                    </span>
                  </span>
                  {recipie?.strYoutube && (
                    <button
                      className="text-sm px-1 py-0.5 rounded bg-green-500 text-white flex items-center"
                      onClick={() => (window.location = recipie.strYoutube)}
                    >
                      <span>Watch in Youtube</span>
                      <span className="material-symbols-outlined text-sm pl-2">
                        open_in_new
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecieps;
