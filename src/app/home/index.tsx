"use client";
import React, { useState } from "react";
import ResultModal from "./modal";
import Starfield from './background'

const GuessDetails: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      const [ageResponse, genderResponse, countryResponse] = await Promise.all([
        fetch(`https://api.agify.io?name=${name}`),
        fetch(`https://api.genderize.io?name=${name}`),
        fetch(`https://api.nationalize.io?name=${name}`),
      ]);

      const ageData = await ageResponse.json();
      const genderData = await genderResponse.json();
      const countryData = await countryResponse.json();

      setAge(ageData?.age ?? "Unknown");
      setGender(genderData?.gender ?? "Unknown");
      if (countryData.country.length > 0) {
        setCountry(countryData.country[0].country_id);
      } else {
        setCountry("Unknown");
      }
      setModalIsOpen(true); // Open the modal when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    console.log('heeee')
    setModalIsOpen(false)
  }

  return (
    <div className="relative">
      <Starfield
        starCount={ loading ? 2000 : 1000}
        speedFactor={loading ? 1 : 0.05}
        backgroundColor="black"
        modalIsOpen={modalIsOpen}
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 min-h-screen flex items-center justify-center text-white font-serif">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            {"Let's start with your name"}
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500 text-black"
              placeholder="Enter name"
            />
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className={`w-full py-2 rounded-md ${
                name.trim()
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Loading..." : "Guess"}
            </button>
          </form>
          <ResultModal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal()}
            name={name}
            age={age}
            gender={gender}
            country={country}
          />
        </div>
      </div>
    </div>
  );
};

export default GuessDetails;

