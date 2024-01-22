const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifiso",
  "Shailen",
  "Frikkie",
];

names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

const upperCaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(upperCaseProvinces);

const nameLengths = names.map((name) => name.length);
console.log(nameLengths); // [6, 9, 11, 6, 7, 7]

const sortedProvinces = [...provinces].sort();
console.log(sortedProvinces);

const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(filteredProvinces.length); // 3

const hasS = names.map((name) => name.toLowerCase().includes("s"));
console.log(hasS); // [true, true, false, true, true, false]

const nameProvinceMap = names.reduce((obj, name, index) => {
  obj[name] = provinces[index];
  return obj;
}, {});
console.log(nameProvinceMap);
