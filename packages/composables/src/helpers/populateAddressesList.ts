// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateAddressesList = (addresses) => {
  const filteredAddresses = [];
  const addressesList = JSON.parse(JSON.stringify(addresses));
  for (const id in addressesList) {
    const address = addressesList[id];
    filteredAddresses.push(address);
  }
  return filteredAddresses;
};

export default populateAddressesList;
