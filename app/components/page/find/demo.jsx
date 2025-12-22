"use client";

import React, { useState } from "react";
import axios from "axios";
import PropertySidebarFilter from "@/app/components/page/find/FilterProperties";
import PropertiesItems from "@/app/components/page/find/PropertiesItems";
import LeafletMapInput from "@/app/components/page/find/LeafletMapInput";
import PrimaryButton from "@/app/components/ui/button/Primary";
import FormButton from "@/app/components/ui/button/SubmitButton";
import MarginSection from "@/app/components/sections/MarginSection";

export default function Page() {
  // 🔹 Filter state
  const [filters, setFilters] = useState({
    location: "",
    division_id: "",
    district_id: "",
    sub_district_id: "",
    property_type_id: "",
    category_id: "",
    price_min: "",
    price_max: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    lat: "",
    lng: "",
  });

  // 🔹 Sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔹 Property data & loading state
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Map coordinate change handler
  const handleMapSelect = (lat, lng) => {
    setFilters((prev) => ({ ...prev, lat, lng }));
  };

  const handleFilterSubmit = async () => {};

  return (
    <MarginSection>
      <div className="relative h-screen w-full bg-gray-50 overflow-hidden">
        {/* 🔹 Filter Button (Always Visible) */}
        <div className="my-4 mx-12">
          <PrimaryButton onClick={() => setSidebarOpen(true)}>
            Filter
          </PrimaryButton>
        </div>

        {/* 🔹 Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 bg-white shadow-2xl w-72 md:w-100 h-full px-4 transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2 mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600 hover:text-red-500"
            >
              ✕
            </button>
          </div>

          {/* Filter Form */}
          <div className="flex-1 ">
            <PropertySidebarFilter filters={filters} setFilters={setFilters} setSidebarOpen={setSidebarOpen}  />
          </div>

          {/* Apply Button */}
          <div className="pt-4 border-t">
            <FormButton IsValid={true} onClick={handleFilterSubmit}>
              {loading ? "Filtering..." : "Apply Filters"}
            </FormButton>
          </div>
        </div>

        {/* 🔹 Overlay (when sidebar open) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30"
          ></div>
        )}

        {/* 🔹 Main Content (Map + Property) */}
        <div
          className={`flex flex-col md:flex-row h-full w-full transition-all duration-300 
        ${sidebarOpen ? "blur-sm pointer-events-none" : "blur-0"}`}
        >
          {/* 🔸 Map Section */}
          <div className="w-full md:w-8/12 p-4">
            <div className="bg-white h-full rounded-2xl shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Property Map
              </h2>
              <LeafletMapInput
                register={{
                  latitude: { value: filters.lat },
                  longitude: { value: filters.lng },
                }}
                setValue={(name, value) => {
                  if (name === "latitude") handleMapSelect(value, filters.lng);
                  if (name === "longitude") handleMapSelect(filters.lat, value);
                }}
                errors={{}}
              />
            </div>
          </div>

          {/* 🔸 Properties Section */}
          <div className="w-full md:w-4/12  p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-md p-4 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Properties
              </h2>

              {loading ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  Loading properties...
                </div>
              ) : filteredProperties.length > 0 ? (
                <PropertiesItems properties={filteredProperties} />
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  No properties found. Try adjusting filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptas recusandae molestiae itaque accusamus non, in quidem fugit? Voluptates libero non illo ipsam quod aliquid reprehenderit esse debitis aliquam quos? Deleniti doloribus debitis obcaecati velit aperiam totam rerum ullam nam in repellat! Accusantium omnis ex esse voluptas sunt doloremque architecto inventore optio assumenda sint, error eius laborum dolorum aliquam officiis illum id quisquam tenetur ipsa ut quia quasi totam nemo amet? Molestias velit sunt quasi ipsam, dignissimos aut fugit et omnis laboriosam reiciendis, iste vitae deserunt dolore at similique, praesentium modi commodi ut animi quis tempora. Voluptate error atque repellat ipsa porro optio, nam explicabo rerum dolorem, aperiam magni deserunt reprehenderit, minima dolor rem. Pariatur saepe nihil odio voluptatum delectus dolores totam, natus nemo labore deleniti itaque quasi. Temporibus obcaecati illo distinctio expedita alias? Nemo quo saepe earum atque aliquam commodi tempore, iste voluptatem quos impedit magni amet, sequi consequuntur corrupti libero corporis facere ducimus dolor ipsam cupiditate quaerat. Dolorem amet voluptatem aliquid illum rerum tempora quia cupiditate dignissimos, nobis laboriosam necessitatibus cumque voluptatum explicabo nemo vitae itaque maiores ea reiciendis distinctio ab odio! Earum suscipit ut quis, deserunt molestiae dolorum? Tenetur dolorem harum reprehenderit corrupti ea, quidem fuga minima iste pariatur, enim laudantium. Repellat cum incidunt quam praesentium nihil, delectus dicta quo dolorum perferendis tempora sapiente assumenda iure odio explicabo exercitationem doloremque ipsa. Cumque inventore dolorem ullam reprehenderit et enim libero, distinctio iste dolores nihil molestias facilis ut a, adipisci iure soluta similique ipsa! Accusamus ipsum cupiditate incidunt corrupti nostrum. Corporis placeat fuga sunt similique soluta. Delectus eius nulla voluptate ab culpa repudiandae expedita ad nobis eveniet asperiores, facilis quas repellendus quia? Inventore id iste ut, aliquid repudiandae corporis quis unde tenetur cum quasi quos voluptatum dolorum quod facilis adipisci porro illo excepturi dolor iure maiores expedita beatae culpa et voluptates. Praesentium aut excepturi magnam cumque ut ad reprehenderit, sunt inventore tenetur quam temporibus quo. Deleniti ipsa nemo tenetur sunt iste cum asperiores tempora. Itaque non facilis ea dolores quis beatae doloribus fuga aut neque perferendis similique atque soluta molestias quod esse fugiat consequatur nesciunt dolor necessitatibus temporibus assumenda, deleniti reiciendis earum. Quis maiores ullam, similique rem aut fugit accusamus voluptates velit tempore exercitationem perspiciatis explicabo? Totam harum minima explicabo facere voluptatem delectus aspernatur quidem omnis nulla. Iste, fugiat. Dolor distinctio maiores eos repellat numquam quia consectetur beatae, non, illum ad quae sint natus ducimus reiciendis quidem doloremque. Explicabo numquam architecto optio, at mollitia adipisci qui tempore reiciendis quod incidunt earum labore quam aperiam. Praesentium recusandae necessitatibus, quod, deleniti odio ipsam ipsum iste vel officiis pariatur molestiae atque illo odit dolore tempora exercitationem optio dolores dicta, id assumenda nisi. Quas enim veniam earum maiores corrupti culpa reprehenderit commodi alias placeat dolor quaerat explicabo, consequatur natus. Id, exercitationem voluptate praesentium, consequuntur vitae assumenda iste mollitia facilis totam error neque. Ut alias fuga repellat. Sed deleniti reprehenderit praesentium earum perspiciatis harum? Facere numquam, placeat assumenda cumque nam aperiam modi officia pariatur nihil sunt voluptas adipisci earum neque perferendis illo sequi voluptatum quibusdam dolor velit magni explicabo iusto. Magni reiciendis est architecto suscipit? Deserunt repellendus quibusdam aliquid, molestias officia labore quidem delectus architecto recusandae animi neque totam obcaecati eum sapiente cupiditate enim itaque debitis veritatis. Eligendi ipsa, optio excepturi eius recusandae doloribus autem odio dolorum ipsam a dolores praesentium commodi, debitis pariatur sed accusantium nemo blanditiis quas corrupti illo mollitia itaque. Maxime aut repudiandae placeat, culpa quam nobis eum veniam nesciunt, animi sunt nam? Earum ut nihil corporis in exercitationem excepturi odit cumque, nobis quisquam. Animi amet hic et ullam, quidem illo qui laborum modi excepturi accusantium eveniet, voluptatem, itaque corporis. Rem totam inventore hic tempora ad aut dolores eligendi, assumenda nostrum, ut labore quisquam nobis, recusandae at. Ipsum, aperiam quis molestias similique beatae molestiae, adipisci quo, necessitatibus odio quidem maxime. Odit architecto, animi rem corrupti omnis illo qui debitis? Minima qui provident labore ipsam vitae, accusantium aut excepturi animi perferendis ducimus quibusdam recusandae officiis eos maxime, ullam illo facilis eligendi, at eaque fugiat iure sapiente expedita dolores ab! Culpa autem pariatur explicabo voluptatibus quibusdam unde ipsam libero iure iusto veritatis, tempore numquam voluptatem voluptate non itaque adipisci cupiditate earum consectetur molestiae deleniti totam. Id facere sit, aliquam necessitatibus, quibusdam optio minus quod sapiente consequuntur eius beatae, exercitationem eum molestiae. Nemo a voluptatum eaque, quasi fugiat dolorem perspiciatis! Incidunt aliquid repellendus temporibus reiciendis est consectetur porro veniam eius necessitatibus, neque dolorum rerum cumque! Tempore ipsam neque aut voluptas cum sapiente quas quam doloremque sint omnis. Iure, officia totam accusamus esse quibusdam eos optio saepe, numquam harum eaque adipisci vero nemo quaerat voluptate! Molestiae ea, amet hic dicta omnis odit id excepturi, voluptatem possimus saepe, quis tempora modi maxime laboriosam natus nisi. Voluptatibus, itaque similique repellendus inventore voluptatum voluptates rerum aspernatur. Libero assumenda delectus architecto quo exercitationem necessitatibus temporibus eius, dolor quae obcaecati illo, quas, non labore impedit repellendus! Reprehenderit doloribus ea quam sit! Illo saepe vel sequi, quis suscipit dolorum eius totam dolorem! Modi asperiores libero, ipsa error possimus ad eius autem aperiam maiores in mollitia optio. Veritatis omnis tenetur, possimus officiis vitae dolorem! Perspiciatis corrupti vitae dolore dignissimos fuga sapiente distinctio fugiat suscipit odit iusto repudiandae animi dicta libero nihil, cum temporibus. Quibusdam itaque sit, facere minima totam eum aliquid expedita deserunt rerum quod nulla, doloremque minus assumenda obcaecati nihil? Necessitatibus facilis nobis deleniti reprehenderit cum repellat temporibus sed voluptatem veniam magnam minus veritatis facere, tempore dignissimos commodi quia blanditiis quasi aliquam quis praesentium natus consequuntur corporis. Totam facilis quasi et eum sunt modi veritatis possimus in, ratione, similique molestias laudantium tempore ad omnis accusantium. Id, veritatis, minus eaque molestias rerum repudiandae, numquam natus voluptatum deserunt illum dolores ratione temporibus tenetur iure odio nam? Modi ex commodi vero eos possimus accusamus ipsum, ab dignissimos aliquam autem pariatur laboriosam, nihil eum id sed dolor nisi provident fugit harum iure placeat esse exercitationem magnam reiciendis? Accusamus debitis molestiae ipsa veniam, voluptates possimus dolore veritatis impedit, aperiam odit odio atque error. Velit, minima aliquid pariatur distinctio veritatis cum sit dolores architecto officiis iure ex maxime atque? Voluptatibus, modi nulla asperiores deserunt molestiae eveniet mollitia id ipsum expedita tenetur dignissimos eum porro laudantium aut? Neque nesciunt sapiente quas incidunt similique ad quibusdam nulla fugiat eaque aut vero sunt iusto quis consequatur saepe, illum veniam facere voluptatum a suscipit maxime esse libero! At, ducimus repellendus similique animi sapiente rerum. Incidunt enim id ratione suscipit? Ut incidunt voluptatibus magnam nostrum? Quos delectus expedita nemo, officia corporis suscipit autem unde ex praesentium quae consequuntur quasi adipisci eaque at. Debitis, reprehenderit! Libero optio amet suscipit. Nam, reiciendis exercitationem rem quo tempore eum maiores possimus officia ab inventore? Tempore aliquid fugit iste obcaecati ullam quaerat labore, facere, ab dolorem optio consequuntur eligendi rem ipsam praesentium recusandae placeat sequi ipsa dicta sed fuga quas sint! Maxime, sapiente amet accusantium est rerum nemo ea soluta laboriosam, ut repudiandae necessitatibus doloremque, nostrum minima ab alias quos! Nesciunt quidem iure facere assumenda nam alias nobis praesentium corporis officia corrupti vitae fuga earum omnis, placeat reiciendis, facilis non quaerat eius nulla dolores repudiandae? Aperiam quidem dolorem tempora! Blanditiis repudiandae tempore hic fugiat dolorum quisquam corrupti consequuntur sapiente veritatis ipsa? Iure, cum! Dolorem ut, amet ipsam dignissimos accusantium officiis beatae dolore quos suscipit, autem incidunt minima optio itaque consequuntur, neque eligendi consequatur dolorum! Temporibus placeat eos alias voluptates error, iure aliquid, delectus assumenda nam minus ab pariatur. Libero maxime voluptates repellendus maiores blanditiis, error inventore ut magni eum corporis architecto veniam quisquam consectetur ratione ea? Incidunt illum ea ipsum sapiente omnis non, illo, quasi sunt natus cum, tenetur unde iure nihil nesciunt velit explicabo. Omnis dignissimos molestiae doloribus tempore dolore in dolorum nam qui nobis corporis ullam consequuntur officia reprehenderit error recusandae, corrupti fugit? Molestiae totam nisi maxime quae. Magni, amet doloribus! Recusandae labore cumque mollitia exercitationem porro! Ratione natus numquam qui ullam itaque iste, quia tempore voluptas. Exercitationem, similique excepturi error hic sed asperiores soluta odit. Fugit eveniet, quaerat repellendus pariatur sapiente reprehenderit eos laboriosam in inventore commodi quam molestiae natus quo eligendi magnam alias rerum rem nulla ducimus sequi quod porro eum aperiam. Cupiditate, voluptas asperiores! Laborum numquam reprehenderit deleniti laboriosam perferendis blanditiis repudiandae in, excepturi maiores natus! Explicabo totam at, est sit exercitationem voluptate iste dolorum repudiandae cumque non commodi sed modi mollitia cum enim? Culpa, explicabo! Nostrum, at vel. Earum tempore debitis consequatur aliquam deleniti non tenetur commodi necessitatibus illo ab quaerat saepe ut eos, eligendi adipisci voluptatem suscipit. Sapiente odit molestias at provident, ullam commodi corporis ducimus suscipit tenetur! Sunt nemo atque fugit enim aliquid ea beatae repudiandae quod aperiam error autem laboriosam rerum earum eum, pariatur quidem provident magni laudantium commodi amet tempora obcaecati? Inventore beatae tempore quia minima reprehenderit sit optio doloremque dicta est blanditiis repellendus expedita totam nam sequi quae enim ex aliquid, corporis voluptas ullam molestiae quo aspernatur? Modi repellendus suscipit sint consectetur? Fugit quaerat nostrum sint nemo ducimus. Reiciendis voluptas, officia hic, quisquam maiores at atque qui rerum reprehenderit eligendi cupiditate laboriosam laborum blanditiis dicta obcaecati dignissimos perspiciatis esse debitis? Commodi beatae ut provident repellat error. Nostrum dolorum quia reiciendis velit illum aliquam similique consequuntur dolores neque eligendi numquam unde corrupti et ratione vitae, quidem esse magnam, aliquid cumque alias iusto recusandae eaque natus! Amet alias enim nisi, nihil, vero ipsam quasi ad fugiat dignissimos iure eveniet autem consequatur earum, vitae culpa minus repellendus laborum quaerat? Aut magnam possimus, praesentium recusandae perspiciatis sunt nobis voluptatibus minima sint fugit impedit officiis sapiente dolor officia ipsum inventore atque illo commodi beatae earum vel excepturi nemo! Quam tenetur omnis fugit laboriosam provident voluptates repudiandae libero blanditiis, nesciunt fugiat consectetur voluptatem illum eveniet nobis dicta totam vel distinctio, quisquam quos consequatur facilis adipisci debitis! Unde et eum debitis id, cumque temporibus minima dolores veritatis, sapiente, animi harum quis nihil neque. Deserunt ut consectetur beatae est rerum, eius nisi aspernatur modi dolorem perspiciatis ipsam amet natus praesentium illum molestiae reiciendis sequi sunt velit, atque cum. Aspernatur recusandae laboriosam esse eveniet maiores nam perspiciatis rem, quod reprehenderit aliquam magnam doloribus, est tenetur cum repellat laudantium! Cumque, tenetur. Facilis repellendus aliquam exercitationem similique, ut amet quidem veniam velit. Et assumenda rem illo laboriosam possimus id impedit exercitationem non ipsum illum, explicabo ipsa accusamus. Magnam dolorem ad natus id culpa reprehenderit blanditiis hic officiis. Eos doloremque exercitationem omnis, perspiciatis voluptatem dolor, officia fugiat suscipit rerum nulla velit sit sapiente id ut quas quisquam! Alias assumenda vitae sapiente saepe ullam unde eum animi natus, sint reiciendis, vel tenetur ad repellat quis. Enim quae officiis dicta quos? Impedit, quidem ipsum? Ex aliquam debitis suscipit aspernatur fuga nobis cumque. Quis amet dolore saepe debitis modi doloremque animi exercitationem ipsum esse nam quo, provident fugit eos excepturi dolorum deleniti iste, ratione voluptatibus eveniet architecto cumque deserunt, aspernatur et? Magni ea est commodi et maiores ducimus quisquam esse, nulla in, itaque eligendi? Quos soluta at mollitia animi rem perspiciatis exercitationem officia repellat, quia atque aliquid doloremque magnam aut voluptatum illum minus consequatur? Modi quis sequi id. Unde consectetur exercitationem veniam pariatur, temporibus nesciunt hic harum ipsum repellat saepe tempore accusamus necessitatibus expedita, voluptates repellendus debitis delectus et sapiente. Repellendus autem modi dolores facere atque saepe aliquid deserunt, quae maiores voluptas eveniet molestias nobis, doloribus illum impedit quidem soluta provident, vel quam veritatis nihil consequuntur tempora dicta! Enim natus eveniet porro alias libero quibusdam at nostrum. Itaque earum nam repellendus corporis dolore repudiandae suscipit iste sequi. Velit maiores voluptate in laboriosam placeat voluptates suscipit ex vitae accusamus! Sapiente accusamus a, ab, totam ipsam quia eveniet qui explicabo eius aspernatur voluptas impedit iure officia quo consectetur illo debitis aliquam deserunt nisi optio sequi autem perspiciatis officiis neque? Exercitationem, omnis. Alias iure in delectus eum hic corrupti aut sit esse nemo facilis quae molestias, labore earum totam voluptates enim adipisci similique dolorum aliquam, fuga odio. Error sint nihil repellat quaerat sit quam harum autem, rerum repudiandae voluptatum possimus. Non temporibus pariatur distinctio quod ipsam laudantium, sequi maiores architecto excepturi nostrum, fugiat voluptates animi quos natus? Tempore, corporis repudiandae. Dolorum similique a consequuntur excepturi doloribus quas iste, reiciendis velit neque. Animi, iusto soluta?</p>
      </div>
    </MarginSection>
  );
}
